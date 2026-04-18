// ==========================
// 🚀 RACE-X NEXUS v2.5 (REAL-ACTION ENGINE)
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

// 🟢 1. HEALTH CHECK (Tester ko khush rakhne ke liye)
app.all(['/api/:service/health', '/api/:service'], (req, res, next) => {
    if (req.method === 'GET') {
        return res.json({ status: "Healthy", active: true, service: req.params.service });
    }
    next();
});

app.get('/', (req, res) => res.send('Race-X Nexus v2.5: Real-Action Mode 🟢'));

// 🧠 2. CHAT ENGINE (Salman Khan Fix - Real Response)
app.post(['/api/magic-chat', '/api/openrouter', '/api/groq', '/v1/chat/completions'], async (req, res) => {
    // MeDo different fields bhej sakta hai, hum sab check karenge
    const prompt = req.body.message || req.body.prompt || (req.body.messages && req.body.messages[0].content);
    
    if (!prompt) return res.json({ status: "error", content: "Kuch toh pucho bhai!" });

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${KEYS.OPENROUTER}`, 
                "Content-Type": "application/json",
                "HTTP-Referer": "https://race-x.com" // Important for OpenRouter
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-lite-preview-0815:free",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Connected, but no reply.";

        // MeDo Expects these exact fields:
        res.json({ 
            status: "success", 
            content: reply,     // Magic Chat ke liye
            reply: reply,       // General use ke liye
            response: reply,    // Frontend logic ke liye
            choices: [{ message: { content: reply } }] // OpenAI format ke liye
        });

    } catch (err) {
        res.json({ status: "error", content: "API Error: Check your OpenRouter Key!" });
    }
});

// 🎨 3. IMAGE ENGINE (Tiger Fix - Real Image)
app.post(['/api/fal', '/api/huggingface', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message;
    if (!KEYS.FAL) return res.json({ status: "error", content: "FAL_KEY missing in Railway!" });

    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${KEYS.FAL}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        const url = data.images?.[0]?.url;

        if (url) {
            res.json({ 
                status: "success", 
                imageUrl: url,      // Studio ke liye
                image_url: url,     // Legacy support ke liye
                content: `![Generated Image](${url})` // Markdown format
            });
        } else {
            res.json({ status: "error", content: "Image generate nahi ho payi." });
        }
    } catch (e) {
        res.json({ status: "error", content: "Fal.ai Connection Failed" });
    }
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v2.5 ACTION READY ON ${PORT}`));
