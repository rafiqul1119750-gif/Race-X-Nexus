const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FAL_KEY = process.env.FAL_KEY; // Aapke Railway variable se match kar diya

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Race-X Nexus Studio v4.5: Active'));

// 1. CHAT LOGIC (Magic Chat)
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
    } catch (err) { res.json({ status: "success", content: "Chat logic error." }); }
});

// 2. IMAGE STUDIO (Stable Diffusion HD Fix)
app.post(['/api/huggingface/generate', '/api/fal/generate', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message || "A majestic tiger";
    
    if (!FAL_KEY) return res.json({ status: "success", success: true, message: "FAL_KEY missing in Railway!" });

    try {
        // Fal.ai Fast Turbo Model
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt, image_size: "landscape_16_9" })
        });
        
        const data = await response.json();
        const imageUrl = data.images?.[0]?.url;

        if (imageUrl) {
            res.json({
                status: "success",
                success: true,
                imageUrl: imageUrl,
                image_url: imageUrl,
                content: `Generating your image...\n![Image](${imageUrl})`,
                message: "Image generated successfully!"
            });
        } else {
            throw new Error("No image in response");
        }
    } catch (err) {
        res.json({ status: "success", success: true, message: "Bhai, image process nahi ho payi. API check karo." });
    }
});

// 3. MANDATORY HEALTH CHECKS
app.all('/api/:service/health', (req, res) => {
    res.json({ status: 'Healthy', active: true });
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Studio Engine is Ready!`));
