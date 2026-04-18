const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FAL_KEY = process.env.FAL_KEY;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Race-X Nexus v7.0: Gallery Force Mode'));

// 1. CHAT (Working fine)
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
        res.json({ status: "success", content: data.choices?.[0]?.message?.content });
    } catch (err) { res.json({ status: "error" }); }
});

// 2. IMAGE STUDIO (Force Gallery Format)
app.post(['/api/huggingface/generate', '/api/fal/generate', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message || "A tiger";
    
    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt, image_size: "landscape_16_9" })
        });
        
        const data = await response.json();
        const imageUrl = data.images?.[0]?.url;

        if (imageUrl) {
            // ME-DO GALLERY MASTER FORMAT
            // Hum saare possible formats ek saath bhej rahe hain
            res.json({
                status: "success",
                success: true,
                message: "Generated",
                imageUrl: imageUrl, 
                image_url: imageUrl,
                // Array formats
                images: [imageUrl],
                results: [{ url: imageUrl }],
                // Data wrapper format (Most common)
                data: {
                    images: [{ url: imageUrl }],
                    image_url: imageUrl,
                    url: imageUrl
                },
                // Markdown content (Backup for chat)
                content: `![Image](${imageUrl})`
            });
        } else {
            res.json({ status: "error", message: "No image" });
        }
    } catch (err) {
        res.json({ status: "error", message: "API Failed" });
    }
});

app.all('/api/:service/health', (req, res) => res.json({ status: 'Healthy', active: true }));

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v7.0 Gallery Force Live!`));
