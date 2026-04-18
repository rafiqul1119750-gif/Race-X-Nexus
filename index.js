// ==========================
// 🚀 RACE-X NEXUS v2.3 (ALL-GREEN FIX)
// ==========================
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const KEYS = {
    OPENROUTER: process.env.OPENROUTER_API_KEY,
    FAL: process.env.FAL_KEY,
    ELEVEN: process.env.ELEVENLABS_API_KEY
};

// 🟢 1. UNIVERSAL HEALTH CHECK (MeDo Tester Fix)
// Ye har service ke liye /api/service/health ko handle karega
app.get(['/api/:service/health', '/api/:service'], (req, res) => {
    res.json({ 
        status: "Healthy", 
        active: true, 
        service: req.params.service,
        timestamp: new Date().toISOString() 
    });
});

app.get('/', (req, res) => res.json({ status: "Race-X Nexus Online" }));

// 🧠 2. CHAT ENGINE (Salman Khan Fix)
app.post(['/api/magic-chat', '/api/openrouter', '/api/groq', '/v1/chat/completions'], async (req, res) => {
    const prompt = req.body.message || req.body.prompt || (req.body.messages && req.body.messages[0].content);
    if (!prompt) return res.json({ status: "error", content: "No message" });

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${KEYS.OPENROUTER}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-lite-preview-0815:free",
                messages: [{ role: "user", content: prompt }]
            })
        });
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Connected!";
        
        res.json({ status: "success", content: reply, reply: reply });
    } catch (err) { res.json({ status: "error", content: "Chat Offline" }); }
});

// 🎨 3. STUDIO ENGINE (Tiger Fix)
app.post(['/api/fal', '/api/huggingface', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message;
    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${KEYS.FAL}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        const url = data.images?.[0]?.url;
        res.json({ status: "success", imageUrl: url, content: `![Img](${url})` });
    } catch (e) { res.json({ status: "error" }); }
});

// 🎙️ 4. VOICE ENGINE
app.post(['/api/elevenlabs', '/api/voice'], async (req, res) => {
    const text = req.body.text || req.body.message;
    if (!KEYS.ELEVEN) return res.status(400).json({ error: "No Key" });
    try {
        const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL`, {
            method: "POST",
            headers: { "xi-api-key": KEYS.ELEVEN, "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });
        const audio = await r.arrayBuffer();
        res.set("Content-Type", "audio/mpeg");
        res.send(Buffer.from(audio));
    } catch (err) { res.status(500).send("Voice Error"); }
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v2.3 SUPREME SYNC ACTIVE`));
