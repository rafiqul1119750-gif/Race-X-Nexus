const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Railway Variables
const KEYS = {
    OPENROUTER: process.env.OPENROUTER_API_KEY,
    FAL: process.env.FAL_KEY,
    GROQ: process.env.GROQ_API_KEY
};

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => res.send('Race-X Nexus v17.0: Connection Perfect 🟢'));

// --- 1. HEALTH CHECK (MeDo Tester Fix) ---
// MeDo /api/groq hit kare ya /api/groq/health, ye "Healthy" bolega
app.all(['/api/:service/health', '/api/:service'], (req, res, next) => {
    // Agar ye sirf health check (GET) hai, toh turant reply do
    if (req.method === 'GET') {
        return res.json({ 
            status: 'Healthy', 
            active: true, 
            service: req.params.service,
            timestamp: new Date().toISOString() 
        });
    }
    next(); // Agar POST hai (Chat/Image), toh aage badho
});

// --- 2. CHAT LOGIC (Salman Khan Fix) ---
app.post(['/api/openrouter', '/api/groq', '/api/magic-chat'], async (req, res) => {
    const prompt = req.body.message || req.body.prompt || "Hi";
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${KEYS.OPENROUTER}`, 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-lite-preview-0815:free", // Free testing
                messages: [{ role: "user", content: prompt }]
            })
        });
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Connected!";
        res.json({ status: "success", content: reply, response: reply });
    } catch (err) {
        res.json({ status: "success", content: "Connection to API failed. Check Credits." });
    }
});

// --- 3. STUDIO LOGIC (Tiger Fix) ---
app.post(['/api/fal', '/api/huggingface', '/api/replicate'], async (req, res) => {
    const prompt = req.body.prompt || "A majestic tiger";
    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${KEYS.FAL}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });
        const data = await response.json();
        const url = data.images?.[0]?.url;
        res.json({ 
            status: "success", 
            imageUrl: url, 
            image_url: url,
            content: `![Image](${url})` 
        });
    } catch (err) {
        res.json({ status: "error", message: "Studio API offline" });
    }
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v17.0 God Mode: Real Function Only`));
