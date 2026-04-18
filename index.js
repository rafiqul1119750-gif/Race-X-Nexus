const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FAL_KEY = process.env.FAL_KEY;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Race-X Studio v9.0: Direct Data Mode'));

// 1. CHAT LOGIC
app.post(['/api/chat/generate', '/api/magic-chat'], async (req, res) => {
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
        // MeDo might need the answer directly in 'content'
        res.json({ content: data.choices?.[0]?.message?.content || "Online" });
    } catch (err) { res.json({ content: "Chat Error" }); }
});

// 2. IMAGE STUDIO (Direct Root Response)
app.post(['/api/huggingface/generate', '/api/fal/generate', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message || "A tiger";
    
    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt, image_size: "landscape_16_9" })
        });
        
        const data = await response.json();
        const finalUrl = data.images?.[0]?.url;

        if (finalUrl) {
            // EKDOM DIRECT RESPONSE - No nested objects
            res.json({
                url: finalUrl,
                imageUrl: finalUrl,
                image_url: finalUrl,
                status: "success"
            });
        } else {
            res.json({ error: "Failed to generate" });
        }
    } catch (err) {
        res.json({ error: "API Error" });
    }
});

app.all('/api/:service/health', (req, res) => res.json({ status: 'Healthy' }));

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v9.0 Direct Engine Live!`));
