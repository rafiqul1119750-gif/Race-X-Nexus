// ==========================
// 🚀 RACE-X NEXUS FINAL SERVER
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

const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
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
        return true; // fail-open (optional: change to false)
    }
};

// ==========================
// 🟢 ROOT
// ==========================
app.get('/', (req, res) => {
    res.json({ status: "Race-X Nexus FINAL RUNNING" });
});

// ==========================
// ⚡ HEALTH CHECK (ALL SERVICES)
// ==========================
app.get('/api/:service/health', async (req, res) => {
    const service = req.params.service;

    const services = {
        groq: ["https://api.groq.com/openai/v1/models", { Authorization: `Bearer ${ENV.GROQ}` }],
        openrouter: ["https://openrouter.ai/api/v1/models", { Authorization: `Bearer ${ENV.OPENROUTER}` }],
        huggingface: ["https://api-inference.huggingface.co/models", { Authorization: `Bearer ${ENV.HUGGINGFACE}` }],
        replicate: ["https://api.replicate.com/v1/models", { Authorization: `Token ${ENV.REPLICATE}` }],
        elevenlabs: ["https://api.elevenlabs.io/v1/models", { "xi-api-key": ENV.ELEVEN }],
        fal: ["https://fal.run", {}],
        sightengine: ["https://api.sightengine.com", {}]
    };

    if (!services[service]) {
        return res.status(404).json({ error: "Unknown service" });
    }

    try {
        const [url, headers] = services[service];

        const r = await fetchWithTimeout(url, { headers }, 3000);

        res.json({
            service,
            status: r.ok ? "Healthy" : "Error"
        });

    } catch {
        res.json({
            service,
            status: "Offline"
        });
    }
});

// ==========================
// 🧠 CHAT (AUTO ROUTER)
// ==========================
app.post(['/api/chat', '/api/groq', '/api/openrouter'], async (req, res) => {
    const prompt = req.body.message || req.body.prompt;
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
                return res.json({
                    provider: p.name,
                    reply: d.choices?.[0]?.message?.content
                });
            }
        } catch {}
    }

    res.status(500).json({ error: "All providers failed" });
});

// ==========================
// 🎨 IMAGE (FAL + HF FALLBACK)
// ==========================
app.post(['/api/image', '/api/fal', '/api/huggingface'], async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const allowed = await moderate(prompt);
    if (!allowed) return res.status(403).json({ error: "Blocked by moderation" });

    // TRY FAL
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
            return res.json({ provider: "fal", image: d.images[0].url });
        }
    } catch {}

    // FALLBACK HF
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
            return res.json({
                provider: "huggingface",
                image_base64: Buffer.from(buffer).toString("base64")
            });
        }
    } catch {}

    res.status(500).json({ error: "Image generation failed" });
});

// ==========================
// 🎙️ VOICE (ELEVENLABS)
// ==========================
app.post(['/api/voice', '/api/elevenlabs'], async (req, res) => {
    const text = req.body.text;
    if (!text) return res.status(400).json({ error: "Missing text" });

    const allowed = await moderate(text);
    if (!allowed) return res.status(403).json({ error: "Blocked content" });

    const voiceId = "EXAVITQu4vr4xnSDxMaL";

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
app.post(['/api/replicate'], async (req, res) => {
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

        res.json(d);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
app.listen(PORT, () => {
    console.log(`🚀 FINAL SERVER RUNNING ON ${PORT}`);
});
