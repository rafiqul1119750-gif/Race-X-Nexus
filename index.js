// ==========================
// 🚀 RACE-X NEXUS PRO SERVER
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
// 🔐 ENV
// ==========================
const ENV = {
    OPENROUTER: process.env.OPENROUTER_API_KEY,
    GROQ: process.env.GROQ_API_KEY,
    FAL: process.env.FAL_KEY,
    ELEVEN: process.env.ELEVENLABS_API_KEY,
    REPLICATE: process.env.REPLICATE_API_TOKEN
};

// ==========================
// ⚙️ UTILS
// ==========================
const TMP = path.join(__dirname, 'tmp');
if (!fs.existsSync(TMP)) fs.mkdirSync(TMP);

const safeJson = async (r) => {
    const text = await r.text();
    try { return JSON.parse(text); }
    catch { return { raw: text }; }
};

const downloadFile = async (url, file) => {
    const r = await fetch(url);
    if (!r.ok) throw new Error("Download failed");
    const buf = await r.arrayBuffer();
    fs.writeFileSync(file, Buffer.from(buf));
};

// ==========================
// 🟢 HEALTH
// ==========================
app.get('/', (req, res) => {
    res.json({ status: "Race-X Nexus PRO Running" });
});

// ==========================
// 🧠 AUTO AI ROUTER
// ==========================
app.post('/api/chat', async (req, res) => {
    const prompt = req.body.message;
    if (!prompt) return res.status(400).json({ error: "Missing message" });

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
            const r = await fetch(p.url, {
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
// 🎨 IMAGE (FAL)
// ==========================
app.post('/api/image', async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const r = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
        method: "POST",
        headers: {
            Authorization: `Key ${ENV.FAL}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
    });

    if (!r.ok) return res.status(500).json({ error: "FAL failed" });

    const d = await r.json();

    if (!d.images?.[0]?.url) {
        return res.status(500).json({ error: "No image returned" });
    }

    res.json({ image: d.images[0].url });
});

// ==========================
// 🎙️ VOICE (ELEVENLABS)
// ==========================
app.post('/api/voice', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Missing text" });

    const voiceId = "EXAVITQu4vr4xnSDxMaL";

    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
            "xi-api-key": ENV.ELEVEN,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    if (!r.ok) return res.status(500).json({ error: "Voice failed" });

    const audio = await r.arrayBuffer();
    res.set("Content-Type", "audio/mpeg");
    res.send(Buffer.from(audio));
});

// ==========================
// 🎬 VIDEO BUILD (FFMPEG)
// ==========================
app.post('/api/video', async (req, res) => {
    const { images } = req.body;
    if (!images || images.length === 0) {
        return res.status(400).json({ error: "No images" });
    }

    const files = [];

    for (let i = 0; i < images.length; i++) {
        const file = path.join(TMP, `img_${i}.jpg`);
        await downloadFile(images[i], file);
        files.push(file);
    }

    const list = path.join(TMP, "list.txt");
    fs.writeFileSync(list, files.map(f => `file '${f}'\nduration 2`).join('\n'));

    const output = path.join(TMP, `video_${Date.now()}.mp4`);

    const ff = spawn('ffmpeg', [
        '-f', 'concat',
        '-safe', '0',
        '-i', list,
        '-vf', 'scale=1280:720',
        '-y',
        output
    ]);

    ff.on('close', () => {
        res.download(output);
    });
});

// ==========================
// 🔄 REPLICATE (REAL JOB)
// ==========================
app.post('/api/replicate', async (req, res) => {
    const { version, input } = req.body;

    if (!version) {
        return res.status(400).json({ error: "Missing model version" });
    }

    const r = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
            Authorization: `Token ${ENV.REPLICATE}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ version, input })
    });

    const d = await safeJson(r);

    if (!r.ok) {
        return res.status(500).json({ error: d });
    }

    res.json(d);
});

// ==========================
app.listen(PORT, () => {
    console.log(`🚀 PRO SERVER RUNNING ON ${PORT}`);
});
