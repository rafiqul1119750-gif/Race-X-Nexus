// ==========================
// 🚀 RACE-X NEXUS FINAL SERVER (V2 - UPDATED)
// ==========================
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ==========================
// 🔐 ENV CONFIG
// ==========================
const ENV = {
    GROQ: process.env.GROQ_API_KEY,
    OPENROUTER: process.env.OPENROUTER_API_KEY,
    FAL: process.env.FAL_KEY,
    HUGGINGFACE: process.env.HUGGINGFACE_API_KEY,
    REPLICATE: process.env.REPLICATE_API_TOKEN,
    ELEVEN: process.env.ELEVENLABS_API_KEY,
    SIGHT_USER: process.env.SIGHTENGINE_USER,
    SIGHT_SECRET: process.env.SIGHTENGINE_SECRET
};

// ==========================
// ⚙️ UTILS
// ==========================
const TMP = path.join(__dirname, 'tmp');
if (!fs.existsSync(TMP)) fs.mkdirSync(TMP);

const fetchWithTimeout = async (url, options = {}, timeout = 15000) => { // Timeout badha diya 15s tak
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return res;
    } catch (err) {
        clearTimeout(id);
        throw new Error("Request timeout");
    }
};

const safeJson = async (res) => {
    const text = await res.text();
    try { return JSON.parse(text); }
    catch { return { raw: text }; }
};

// ==========================
// 🛡️ MODERATION (SIGHTENGINE)
// ==========================
const moderate = async (text) => {
    if (!ENV.SIGHT_USER || !ENV.SIGHT_SECRET) return true;

    const url = `https://api.sightengine.com/1.0/text/check.json?text=${encodeURIComponent(text)}&models=profanity&api_user=${ENV.SIGHT_USER}&api_secret=${ENV.SIGHT_SECRET}`;

    try {
        const r = await fetchWithTimeout(url);
        const d = await r.json();
        if (d.profanity?.matches?.length > 0) return false;
        return true;
    } catch {
        return true; 
    }
};

// ==========================
// 🟢 ROOT & GLOBAL HEALTH
// ==========================
app.get('/', (req, res) => {
    res.json({ status: "Race-X Nexus FINAL RUNNING", version: "2.0" });
});

// MeDo App ke liye catch-all health check
app.all(['/api/:service/health', '/api/:service'], (req, res, next) => {
    if (req.method === 'GET') {
        return res.json({ status: "Healthy", active: true, service: req.params.service });
    }
    next();
});

// ==========================
// 🧠 CHAT (AUTO ROUTER + MEDO COMPATIBLE)
// ==========================
app.post(['/api/chat', '/api/groq', '/api/openrouter', '/api/magic-chat', '/api/chat/generate'], async (req, res) => {
    const prompt = req.body.message || req.body.prompt || req.body.content;
    if (!prompt) return res.status(400).json({ error: "Missing message" });

    const allowed = await moderate(prompt);
    if (!allowed) return res.status(403).json({ error: "Content blocked" });

    const providers = [
        {
            name: "groq",
            url: "https://api.groq.com/openai/v1/chat/completions",
            key: ENV.GROQ,
            model: "llama3-70b-8192"
        },
        {
            name: "openrouter",
            url: "https://openrouter.ai/api/v1/chat/completions",
            key: ENV.OPENROUTER,
            model: "google/gemini-2.0-flash-lite-preview-0815:free"
        }
    ];

    for (let p of providers) {
        if (!p.key) continue; // Skip if key is missing
        try {
            const r = await fetchWithTimeout(p.url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${p.key}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: p.model,
                    messages: [{ role: "user", content: prompt }]
                })
            });

            if (r.ok) {
                const d = await r.json();
                const reply = d.choices?.[0]?.message?.content;
                return res.json({
                    status: "success",
                    provider: p.name,
                    reply: reply,
                    content: reply, // MeDo Compatibility
                    response: reply // MeDo Compatibility
                });
            }
        } catch (e) { console.log(`Provider ${p.name} failed, trying next...`); }
    }

    res.status(500).json({ status: "error", error: "All chat providers failed" });
});

// ==========================
// 🎨 IMAGE (FAL + HF FALLBACK + MEDO COMPATIBLE)
// ==========================
app.post(['/api/image', '/api/fal', '/api/huggingface', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const allowed = await moderate(prompt);
    if (!allowed) return res.status(403).json({ error: "Blocked by moderation" });

    // TRY FAL
    if (ENV.FAL) {
        try {
            const r = await fetchWithTimeout("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
                method: "POST",
                headers: {
                    Authorization: `Key ${ENV.FAL}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt })
            });

            const d = await r.json();
            if (d.images?.[0]?.url) {
                const url = d.images[0].url;
                return res.json({ 
                    status: "success",
                    provider: "fal", 
                    image: url,
                    imageUrl: url, // MeDo Compatibility
                    image_url: url, // MeDo Compatibility
                    content: `![Image](${url})` 
                });
            }
        } catch {}
    }

    // FALLBACK HF
    if (ENV.HUGGINGFACE) {
        try {
            const r = await fetchWithTimeout(
                "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${ENV.HUGGINGFACE}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ inputs: prompt })
                }
            );

            if (r.ok) {
                const buffer = await r.arrayBuffer();
                const base64 = Buffer.from(buffer).toString("base64");
                return res.json({
                    status: "success",
                    provider: "huggingface",
                    image_base64: base64,
                    imageUrl: `data:image/png;base64,${base64}` // Send as data URL
                });
            }
        } catch {}
    }

    res.status(500).json({ status: "error", error: "Image generation failed" });
});

// ==========================
// 🎙️ VOICE (ELEVENLABS)
// ==========================
app.post(['/api/voice', '/api/elevenlabs'], async (req, res) => {
    const text = req.body.text || req.body.message;
    if (!text) return res.status(400).json({ error: "Missing text" });

    const allowed = await moderate(text);
    if (!allowed) return res.status(403).json({ error: "Blocked content" });

    const voiceId = req.body.voiceId || "EXAVITQu4vr4xnSDxMaL";

    try {
        const r = await fetchWithTimeout(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                method: "POST",
                headers: {
                    "xi-api-key": ENV.ELEVEN,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text })
            }
        );

        if (!r.ok) {
            const err = await safeJson(r);
            return res.status(500).json(err);
        }

        const audio = await r.arrayBuffer();
        res.set("Content-Type", "audio/mpeg");
        res.send(Buffer.from(audio));

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
// 🔄 REPLICATE (JOB CREATE)
// ==========================
app.post(['/api/replicate', '/api/video'], async (req, res) => {
    const { version, input } = req.body;

    if (!version) {
        return res.status(400).json({ error: "Missing model version" });
    }

    try {
        const r = await fetchWithTimeout(
            "https://api.replicate.com/v1/predictions",
            {
                method: "POST",
                headers: {
                    Authorization: `Token ${ENV.REPLICATE}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ version, input })
            }
        );

        const d = await safeJson(r);
        if (!r.ok) return res.status(500).json(d);

        res.json({ ...d, status: "success" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
app.listen(PORT, () => {
    console.log(`🚀 FINAL SERVER RUNNING ON ${PORT}`);
});
