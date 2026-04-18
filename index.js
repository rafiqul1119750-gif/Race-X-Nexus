const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FAL_KEY = process.env.FAL_KEY;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Race-X Nexus v6.0: Pure Data Mode'));

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
        res.json({
            status: "success",
            content: data.choices?.[0]?.message?.content || "Connected"
        });
    } catch (err) { res.json({ status: "error", content: "Chat Error" }); }
});

// 2. IMAGE STUDIO (The "Gallery-First" Format)
app.post(['/api/huggingface/generate', '/api/fal/generate', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message || "A tiger";
    
    if (!FAL_KEY) return res.json({ status: "error", message: "FAL_KEY missing" });

    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt, image_size: "landscape_16_9" })
        });
        
        const data = await response.json();
        const imageUrl = data.images?.[0]?.url;

        if (imageUrl) {
            // MeDo ko sirf ye 3 cheezein chahiye gallery populate karne ke liye
            res.json({
                success: true,
                status: "success",
                image_url: imageUrl,
                imageUrl: imageUrl,
                images: [imageUrl], // Simple array format
                data: [imageUrl]    // Alternative array format
            });
        } else {
            throw new Error("No URL");
        }
    } catch (err) {
        res.json({ status: "error", message: "Generation failed" });
    }
});

app.all('/api/:service/health', (req, res) => res.json({ status: 'Healthy', active: true }));

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v6.0 Pure Data Engine Live!`));
