const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FAL_KEY = process.env.FAL_KEY; 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Race-X Nexus: Studio v5.0 Active'));

// 1. CHAT LOGIC (Working fine)
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
        const reply = data.choices?.[0]?.message?.content || "Studio Online!";
        res.json({ status: "success", content: reply, response: reply });
    } catch (err) { res.json({ status: "success", content: "Chat Error." }); }
});

// 2. IMAGE STUDIO (The "No-Fail" Response Format)
app.post(['/api/huggingface/generate', '/api/fal/generate', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message || "A majestic tiger";
    
    if (!FAL_KEY) return res.json({ status: "error", message: "FAL_KEY missing!" });

    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt, image_size: "landscape_16_9" })
        });
        
        const data = await response.json();
        const imageUrl = data.images?.[0]?.url;

        if (imageUrl) {
            // Hum wo saare keys bhej rahe hain jo MeDo dhund sakta hai
            res.json({
                status: "success",
                success: true,
                message: "Image generated successfully",
                content: `Generated: ![Image](${imageUrl})`,
                // MeDo Gallery formats:
                imageUrl: imageUrl,
                image_url: imageUrl,
                images: [{ url: imageUrl }],
                data: {
                    images: [{ url: imageUrl }],
                    url: imageUrl
                },
                results: [{ url: imageUrl }]
            });
        } else {
            throw new Error("No image found");
        }
    } catch (err) {
        res.json({ status: "success", content: "Bhai, API ne image nahi di. Credits check karo." });
    }
});

// HEALTH CHECKS
app.all('/api/:service/health', (req, res) => res.json({ status: 'Healthy', active: true }));

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Studio Engine v5.0 Live!`));
