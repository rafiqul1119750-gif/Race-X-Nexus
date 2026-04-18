// ==========================
// 🚀 RACE-X NEXUS v2.2 (404 FIX)
// ==========================
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Env Keys
const KEYS = {
    OPENROUTER: process.env.OPENROUTER_API_KEY,
    FAL: process.env.FAL_KEY
};

// 🟢 Global Route: Agar app kisi bhi galat URL par aaye, ye use handle kar lega
app.get('*', (req, res, next) => {
    if (req.path === '/') return res.json({ status: "Race-X Nexus Online" });
    next();
});

// 🧠 CHAT ENGINE (SAB RAASTE EK SAATH)
// Maine yahan /v1/chat/completions bhi add kar diya hai kyunki kuch apps wahi dhoondti hain
app.post(['/api/magic-chat', '/api/chat', '/api/openrouter', '/v1/chat/completions', '/api/chat/generate'], async (req, res) => {
    const prompt = req.body.message || req.body.prompt || (req.body.messages && req.body.messages[0].content);
    
    if (!prompt) return res.json({ status: "error", content: "No prompt received" });

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${KEYS.OPENROUTER}`, 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-lite-preview-0815:free",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Connected!";

        // Sab formats mein response bhejo taaki MeDo khush ho jaye
        res.json({ 
            status: "success", 
            content: reply, 
            reply: reply,
            choices: [{ message: { content: reply } }] 
        });

    } catch (err) {
        res.json({ status: "error", content: "OpenRouter connection failed" });
    }
});

// 🎨 IMAGE ENGINE (404 FIX)
app.post(['/api/fal', '/api/image', '/api/generate'], async (req, res) => {
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

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v2.2 RUNNING ON ${PORT}`));
