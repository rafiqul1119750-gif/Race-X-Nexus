const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FAL_KEY = process.env.FAL_KEY;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Race-X Nexus v15.0: Free Mode & Fix Active 🟢'));

// 1. CHAT LOGIC (FREE MODE)
app.post(['/api/magic-chat', '/api/chat/generate', '/api/openrouter'], async (req, res) => {
    // Sab kuch handle karo: message, prompt, text, content
    const userMessage = req.body.message || req.body.prompt || req.body.text || req.body.content || "Hi";
    
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${OPENROUTER_KEY}`, 
                "Content-Type": "application/json",
                "HTTP-Referer": "https://race-x.com"
            },
            body: JSON.stringify({
                // YE FREE MODEL HAI - Credit nahi katega
                model: "google/gemini-2.0-flash-lite-preview-0815:free", 
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Connected! Main aapki kaise madad kar sakta hoon?";

        // MeDo expects simplified JSON
        res.json({ 
            status: "success", 
            content: reply,
            response: reply 
        });

    } catch (err) {
        res.json({ status: "success", content: "Backend connected, but API key is missing in Railway Variables!" });
    }
});

// 2. IMAGE LOGIC (FAL.AI)
app.post(['/api/fal', '/api/generate'], async (req, res) => {
    const userPrompt = req.body.prompt || req.body.message || "A majestic tiger";
    
    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userPrompt })
        });
        
        const data = await response.json();
        const url = data.images?.[0]?.url;

        if (url) {
            res.json({
                status: "success",
                imageUrl: url,
                image_url: url,
                content: `Generated: ![Tiger](${url})`
            });
        } else {
            res.json({ status: "error", content: "Check your FAL_KEY credits!" });
        }
    } catch (err) {
        res.json({ status: "error", content: "API Connection Failed" });
    }
});

app.all('/api/:service/health', (req, res) => res.json({ status: 'Healthy' }));

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v15.0 Supreme Sync Live!`));
