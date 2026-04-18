const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🔑 API Keys from Railway Variables
const KEYS = {
    GEMINI: process.env.GOOGLE_API_KEY,
    HF: process.env.HUGGINGFACE_API_KEY
};

// 🟢 1. GLOBAL HEALTH CHECK (Fixes 404 Errors)
app.all(['/api/:service/health', '/api/:service'], (req, res, next) => {
    if (req.method === 'GET') return res.status(200).json({ status: "Online", engine: "Race-X Core" });
    next();
});

// 🧠 2. THE BRAIN (Writer/Director Logic - Using Gemini)
app.post(['/api/chat', '/api/magic-chat'], async (req, res) => {
    const prompt = req.body.message || req.body.prompt;
    if (!prompt) return res.status(400).json({ error: "No input provided" });

    try {
        // Primary: Google Gemini (High Speed & Zero Cost)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${KEYS.GEMINI}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        res.json({ status: "success", type: "text", content: reply });

    } catch (err) {
        // Fallback: HuggingFace (If Gemini fails)
        try {
            const hfRes = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-11B-Vision-Instruct", {
                method: "POST",
                headers: { "Authorization": `Bearer ${KEYS.HF}`, "Content-Type": "application/json" },
                body: JSON.stringify({ inputs: prompt })
            });
            const hfData = await hfRes.json();
            res.json({ status: "success", type: "text", content: hfData[0]?.generated_text || hfData.generated_text });
        } catch (e) {
            res.status(500).json({ status: "error", content: "All engines busy. Try later." });
        }
    }
});

// 🎨 3. THE STUDIO (Actor/Visuals Logic - Using Pollinations)
app.post(['/api/generate', '/api/fal'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message;
    if (!prompt) return res.status(400).json({ error: "No prompt" });

    // Pollinations: No Key, No Limit, Real AI Image
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&seed=${Date.now()}`;
    
    // Yahan hum real response bhej rahe hain
    res.json({ 
        status: "success", 
        type: "image",
        imageUrl: imageUrl,
        content: `![Race-X Generation](${imageUrl})`
    });
});

// 🎙️ 4. THE AUDIO LAB (Singer/Voice Logic - Using HF)
app.post('/api/voice', async (req, res) => {
    const text = req.body.text;
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/facebook/mms-tts-hin", {
            method: "POST",
            headers: { "Authorization": `Bearer ${KEYS.HF}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: text })
        });
        const audioBuffer = await response.arrayBuffer();
        res.set('Content-Type', 'audio/mpeg');
        res.send(Buffer.from(audioBuffer));
    } catch (e) {
        res.status(500).json({ error: "Audio Engine busy" });
    }
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 RACE-X PRODUCTION ENGINE LIVE ON ${PORT}`));
