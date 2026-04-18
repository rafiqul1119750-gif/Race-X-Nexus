const express = require('express');
const cors = require('cors');
const https = require('https'); // Built-in, kabhi crash nahi hoga
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('Race-X Nexus: Always Online'));

// SMART CHAT LOGIC (Using Standard HTTPS)
app.post(['/api/chat/generate', '/api/magic-chat', '/api/generate'], (req, res) => {
    const userPrompt = req.body.prompt || req.body.message || "Hi";

    if (!OPENROUTER_KEY) {
        return res.json({ status: "success", content: "Bhai, API Key Railway Variables mein daalo!" });
    }

    const postData = JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [{ role: "user", content: userPrompt }]
    });

    const options = {
        hostname: 'openrouter.ai',
        path: '/api/v1/chat/completions',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENROUTER_KEY}`,
            'Content-Type': 'application/json',
            'X-Title': 'Race-X Nexus'
        }
    };

    const request = https.request(options, (apiRes) => {
        let body = '';
        apiRes.on('data', (chunk) => body += chunk);
        apiRes.on('end', () => {
            try {
                const data = JSON.parse(body);
                const aiReply = data.choices?.[0]?.message?.content || "OpenRouter Error: Check Credits";
                res.json({ status: "success", success: true, content: aiReply, response: aiReply });
            } catch (e) {
                res.json({ status: "success", content: "Format error from AI" });
            }
        });
    });

    request.on('error', (e) => {
        res.json({ status: "success", content: "Connection Failed" });
    });

    request.write(postData);
    request.end();
});

// HEALTH CHECKS
app.all(['/api/:service/health', '/api/fal%20ai/health'], (req, res) => {
    res.json({ status: 'Healthy', active: true });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Engine live on port ${PORT}`);
});
