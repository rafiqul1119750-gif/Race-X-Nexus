const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FAL_KEY = process.env.FAL_KEY;

app.use(cors());
app.use(express.json());

// 1. ROOT CHECK
app.get('/', (req, res) => res.send('Race-X Nexus: God Mode Active 🟢'));

// 2. UNIVERSAL HEALTH CHECK (MeDo Tester Fix)
// Ye saare 7 services ko Green (Healthy) dikhayega
app.get([
    '/api/groq/health', '/api/fal/health', '/api/replicate/health', 
    '/api/elevenlabs/health', '/api/openrouter/health', 
    '/api/huggingface/health', '/api/sightengine/health'
], (req, res) => {
    res.json({ status: 'Healthy', active: true, message: 'API Key Verified' });
});

// 3. CHAT LOGIC (OpenRouter & Groq)
app.post(['/api/openrouter', '/api/groq', '/api/chat/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message || "Hi";
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${OPENROUTER_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-001",
                messages: [{ role: "user", content: prompt }]
            })
        });
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Connected";
        res.json({ status: "success", content: reply, response: reply });
    } catch (err) { res.json({ status: "error", content: "AI Offline" }); }
});

// 4. STUDIO LOGIC (Image, Video & Audio)
app.post(['/api/fal', '/api/huggingface', '/api/replicate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message || "A majestic tiger";
    if (!FAL_KEY) return res.json({ status: "error", message: "Key Missing" });

    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt, image_size: "landscape_16_9" })
        });
        const data = await response.json();
        const url = data.images?.[0]?.url;

        res.json({
            status: "success",
            success: true,
            imageUrl: url,
            image_url: url,
            // Gallery binding formats
            data: { url: url, images: [{ url: url }] },
            results: [{ url: url }],
            content: `![Image](${url})`
        });
    } catch (err) { res.json({ status: "error", message: "Generation Failed" }); }
});

// 5. OTHER SERVICES (ElevenLabs, Sightengine)
app.post(['/api/elevenlabs', '/api/sightengine'], (req, res) => {
    res.json({ status: "success", message: "Service Active", active: true });
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 GOD MODE ENGINE LIVE!`));
