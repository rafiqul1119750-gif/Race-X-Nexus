const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const FAL_KEY = process.env.FAL_KEY;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Race-X Nexus: v10.0 (Pure List Mode)'));

app.post(['/api/huggingface/generate', '/api/fal/generate', '/api/generate'], async (req, res) => {
    const prompt = req.body.prompt || "A tiger";
    try {
        const response = await fetch("https://fal.run/fal-ai/fast-turbo-diffusion/generate", {
            method: "POST",
            headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });
        
        const data = await response.json();
        const url = data.images?.[0]?.url;

        if (url) {
            // ME-DO SPECIAL: Bahut si galleries sirf direct array (List) accept karti hain
            // Hum ek aisa format bhej rahe hain jisme MeDo ko 'List' milegi
            res.json([
                {
                    "id": "1",
                    "url": url,
                    "image": url,
                    "imageUrl": url,
                    "image_url": url
                }
            ]);
        } else {
            res.status(400).send([]);
        }
    } catch (err) {
        res.status(500).send([]);
    }
});

// Chat logic ko simple rakho
app.post(['/api/chat/generate', '/api/magic-chat'], async (req, res) => {
    res.json({ content: "Studio is ready!" });
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 v10.0 Ready`));
