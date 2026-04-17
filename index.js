const express = require('express');
const cors = require('cors');
const axios = require('axios'); // API calls ke liye zaroori hai
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY; // Railway se uthayega

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('Race-X Brain: Online'));

// REAL CHAT LOGIC (OpenRouter Integration)
app.post(['/api/chat/generate', '/api/magic-chat', '/api/generate'], async (req, res) => {
    const userPrompt = req.body.prompt || req.body.message || "Hi";
    console.log(`User Asked: ${userPrompt}`);

    try {
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "google/gemini-2.0-flash-001", // Best & Fast model
            messages: [{ role: "user", content: userPrompt }]
        }, {
            headers: {
                "Authorization": `Bearer ${OPENROUTER_KEY}`,
                "Content-Type": "application/json"
            }
        });

        const aiReply = response.data.choices[0].message.content;

        res.json({
            status: "success",
            success: true,
            content: aiReply,
            response: aiReply,
            data: { text: aiReply }
        });

    } catch (error) {
        console.error("OpenRouter Error:", error.response?.data || error.message);
        res.json({
            status: "success",
            content: "Bhai, connection toh hai par API Key check karo Railway mein. Response nahi aa raha.",
            response: "API Error check logs."
        });
    }
});

// Health Checks for MeDo
app.all(['/api/:service/health', '/api/fal%20ai/health'], (req, res) => {
    res.json({ status: 'Healthy', active: true });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Smart Engine running on port ${PORT}`);
});
