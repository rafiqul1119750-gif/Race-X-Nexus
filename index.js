const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FAL_KEY = process.env.FAL_KEY; 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Race-X Studio v8.0: Ultra Compatibility Mode'));

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
        res.json({ status: "success", content: data.choices?.[0]?.message?.content });
    } catch (err) { res.json({ status: "error" }); }
});

// 2. IMAGE STUDIO (The "No-Reject" Format)
app.post(['/api/huggingface/generate', '/api/fal/generate', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || req.body.message || "A tiger";
    
    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt, image_size: "landscape_16_9" })
        });
        
        const data = await response.json();
        let imageUrl = data.images?.[0]?.url;

        if (imageUrl) {
            // TRICK: Agar URL ke end mein .jpg nahi hai, toh MeDo gallery nahi dikhayegi
            // Hum query parameter add karke use ullu banayenge
            const fakeUrl = `${imageUrl}?ext=.jpg`;

            res.json({
                status: "success",
                success: true,
                // MeDo demands these specific fields:
                imageUrl: fakeUrl,
                image_url: fakeUrl,
                url: fakeUrl,
                // Array format that most gallery widgets use
                images: [fakeUrl],
                data: [{ url: fakeUrl }],
                results: [{ url: fakeUrl }],
                // Chat bubbles display
                content: `Image Generated: ![Tiger](${fakeUrl})`
            });
        } else {
            res.json({ status: "error", message: "No Image" });
        }
    } catch (err) {
        res.json({ status: "error", message: "Build Fail" });
    }
});

app.all('/api/:service/health', (req, res) => res.json({ status: 'Healthy', active: true }));

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v8.0 Ultra Engine Live!`));
