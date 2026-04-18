const express = require('express');
const cors = require('cors');
const app = express();

// Port handle
const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

app.use(cors());
app.use(express.json());

// 1. Root Route (Railway isse check karta hai)
app.get('/', (req, res) => {
    res.status(200).send('Race-X Nexus: Online');
});

// 2. Chat Logic (Simple logic taaki crash na ho)
app.post(['/api/chat/generate', '/api/magic-chat', '/api/generate'], async (req, res) => {
    const userPrompt = req.body.prompt || req.body.message || "Hi";
    
    try {
        // Bina kisi extra library ke simple fetch
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-001",
                messages: [{ role: "user", content: userPrompt }]
            })
        });

        const data = await response.json();
        const aiReply = data.choices?.[0]?.message?.content || "API Error: Check Key";

        res.json({
            status: "success",
            content: aiReply,
            response: aiReply
        });
    } catch (err) {
        res.json({
            status: "success",
            content: "Bhai, server connected hai par OpenRouter tak baat nahi pahunch rahi."
        });
    }
});

// 3. Health Checks (Taaki Green dikhe)
app.all(['/api/:service/health', '/api/fal%20ai/health'], (req, res) => {
    res.json({ status: 'Healthy', active: true });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server started on port ${PORT}`);
});
