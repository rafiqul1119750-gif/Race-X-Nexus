// ==========================
// 🚀 RACE-X NEXUS CRASH-FREE SERVER
// ==========================
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🔐 ENV CONFIG
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

// ⚙️ UTILS
const TMP = path.join(__dirname, 'tmp');
if (!fs.existsSync(TMP)) fs.mkdirSync(TMP);

// Native Fetch with Timeout (No external node-fetch needed)
const fetchWithTimeout = async (url, options = {}, timeout = 15000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return res;
    } catch (err) {
        clearTimeout(id);
        throw err;
    }
};

// 🟢 ROOT & HEALTH
app.get('/', (req, res) => res.json({ status: "Race-X Nexus ONLINE", version: "2.1" }));

app.all(['/api/:service/health', '/api/:service'], (req, res, next) => {
    if (req.method === 'GET') {
        return res.json({ status: "Healthy", active: true, service: req.params.service });
    }
    next();
});

// 🧠 CHAT ENGINE
app.post(['/api/chat', '/api/groq', '/api/openrouter', '/api/magic-chat'], async (req, res) => {
    const prompt = req.body.message || req.body.prompt || req.body.content;
    if (!prompt) return res.status(400).json({ error: "No prompt" });

    const providers = [
        { name: "groq", url: "https://api.groq.com/openai/v1/chat/completions", key: ENV.GROQ, model: "llama3-70b-8192" },
        { name: "openrouter", url: "https://openrouter.ai/api/v1/chat/completions", key: ENV.OPENROUTER, model: "google/gemini-2.0-flash-lite-preview-0815:free" }
    ];

    for (let p of providers) {
        if (!p.key) continue;
        try {
            const r = await fetchWithTimeout(p.url, {
                method: "POST",
                headers: { Authorization: `Bearer ${p.key}`, "Content-Type": "application/json" },
                body: JSON.stringify({ model: p.model, messages: [{ role: "user", content: prompt }] })
            });
            if (r.ok) {
                const d = await r.json();
                const reply = d.choices?.[0]?.message?.content;
                return res.json({ status: "success", reply, content: reply, response: reply });
            }
        } catch (e) { console.error(`Provider ${p.name} failed`); }
    }
    res.status(500).json({ status: "error", error: "All providers failed" });
});

// 🎨 IMAGE ENGINE
app.post(['/api/image', '/api/fal', '/api/huggingface', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message;
    if (!prompt) return res.status(400).json({ error: "No prompt" });

    if (ENV.FAL) {
        try {
            const r = await fetchWithTimeout("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
                method: "POST",
                headers: { Authorization: `Key ${ENV.FAL}`, "Content-Type": "application/json" },
                body: JSON.stringify({ prompt })
            });
            const d = await r.json();
            if (d.images?.[0]?.url) {
                return res.json({ status: "success", imageUrl: d.images[0].url, content: `![Img](${d.images[0].url})` });
            }
        } catch (e) { console.error("Fal failed"); }
    }
    res.status(500).json({ status: "error", error: "Image failed" });
});

// 🎙️ VOICE
app.post(['/api/voice', '/api/elevenlabs'], async (req, res) => {
    const text = req.body.text || req.body.message;
    if (!text || !ENV.ELEVEN) return res.status(400).json({ error: "Missing data" });
    try {
        const r = await fetchWithTimeout(`https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL`, {
            method: "POST",
            headers: { "xi-api-key": ENV.ELEVEN, "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });
        const audio = await r.arrayBuffer();
        res.set("Content-Type", "audio/mpeg");
        res.send(Buffer.from(audio));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v2.1 RUNNING ON ${PORT}`));
