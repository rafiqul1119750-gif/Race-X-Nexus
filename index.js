const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FAL_KEY = process.env.FAL_API_KEY;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Race-X Studio: Image Formatting Fix Active'));

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

// 2. IMAGE STUDIO (Format Fix for MeDo Gallery)
app.post(['/api/huggingface/generate', '/api/fal/generate', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message || "A tiger";
    
    if (!FAL_KEY) return res.json({ status: "success", success: true, message: "Add FAL_API_KEY in Railway!" });

    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt, image_size: "landscape_16_9" })
        });
        const data = await response.json();
        const rawUrl = data.images?.[0]?.url;

        if (rawUrl) {
            // MeDo ko specific formats chahiye gallery mein dikhane ke liye
            res.json({
                status: "success",
                success: true,
                imageUrl: rawUrl, // Direct URL gallery ke liye
                image_url: rawUrl, // Backup format
                content: `Generating image...\n![Tiger](${rawUrl})`, // Markdown to display in chat
                data: {
                    imageUrl: rawUrl,
                    message: "Generation successful"
                },
                // MeDo some formatting uses this structure
                response: {
                    imageUrl: rawUrl
                }
            });
        } else {
            throw new Error("No image URL");
        }
    } catch (err) {
        res.json({ status: "success", content: "Bhai, image generate toh hui par format reject ho gaya." });
    }
});

// MANDATORY HEALTH CHECKS
app.all('/api/:service/health', (req, res) => {
    res.json({ status: 'Healthy', active: true });
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Final Image Studio Engine!`));
