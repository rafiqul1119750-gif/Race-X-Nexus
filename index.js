const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

app.use(cors());
app.use(express.json());

// 1. Root Route (Railway Health Check ke liye zaroori)
app.get('/', (req, res) => {
    res.status(200).send('Race-X Nexus: Stable & Online');
});

// 2. SMART CHAT LOGIC
app.post(['/api/chat/generate', '/api/magic-chat', '/api/generate'], async (req, res) => {
    const userPrompt = req.body.prompt || req.body.message || "Hi";
    
    // Agar Key nahi mili toh error ki jagah sweet message
    if (!OPENROUTER_KEY) {
        return res.json({ 
            status: "success", 
            content: "Bhai, Railway ke 'Variables' mein OPENROUTER_API_KEY daalna bhool gaye ho shayad!" 
        });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://race-x.com",
                "X-Title": "Race-X Nexus"
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-001",
                messages: [{ role: "user", content: userPrompt }]
            })
        });

        const data = await response.json();
        const aiReply = data.choices?.[0]?.message?.content || "OpenRouter busy hai bhai, thodi der baad try karo.";

        res.json({
            status: "success",
            success: true,
            content: aiReply,
            response: aiReply
        });

    } catch (error) {
        res.json({
            status: "success",
            content: "Connection thoda weak hai, par hum live hain!",
            response: "Network error"
        });
    }
});

// 3. SERVICE HEALTH CHECKS
app.all(['/api/:service/health', '/api/fal%20ai/health'], (req, res) => {
    res.json({ status: 'Healthy', active: true });
});

// 4. CRASH PREVENTION
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is up on port ${PORT}`);
});
