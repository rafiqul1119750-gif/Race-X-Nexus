const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Railway Variables
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FAL_KEY = process.env.FAL_KEY;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Race-X Nexus v13.0: Absolute Connection Active'));

// 1. HEALTH CHECK
app.all('/api/:service/health', (req, res) => res.json({ status: 'Healthy' }));

// 2. MAGIC CHAT FIX (Handling every possible field name)
app.post(['/api/magic-chat', '/api/chat/generate', '/api/openrouter'], async (req, res) => {
    const prompt = req.body.message || req.body.prompt || req.body.content || "Hi";
    
    if (!OPENROUTER_KEY) {
        return res.json({ status: "success", content: "Error: Railway mein OPENROUTER_API_KEY nahi mili!" });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${OPENROUTER_KEY}`, 
                "Content-Type": "application/json",
                "HTTP-Referer": "https://race-x.com"
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-001", 
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        
        // Agar OpenRouter error de (like Insufficient Credits)
        if (data.error) {
            return res.json({ status: "success", content: `OpenRouter Error: ${data.error.message}` });
        }

        const reply = data.choices?.[0]?.message?.content || "No response from AI.";
        res.json({ status: "success", content: reply, response: reply });

    } catch (err) {
        res.json({ status: "success", content: "Backend is online, but API connection failed." });
    }
});

// 3. IMAGE STUDIO FIX
app.post(['/api/fal', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message || "A tiger";
    if (!FAL_KEY) return res.json({ status: "success", content: "Error: FAL_KEY missing in Railway!" });

    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });
        const data = await response.json();
        const url = data.images?.[0]?.url;
        res.json({ status: "success", imageUrl: url, content: `![Image](${url})` });
    } catch (err) { res.json({ status: "error" }); }
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v13.0 Ultimate Sync Live!`));
