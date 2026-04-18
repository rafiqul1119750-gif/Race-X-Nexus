const express = require('express');
const cors = require('cors');
const https = require('https');
const app = express();

// Railway automatic port
const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

app.use(cors());
app.use(express.json());

// 1. Root Route - Isse Railway ko pata chalta hai ki server Zinda hai
app.get('/', (req, res) => {
    res.status(200).send('Nexus System: Online');
});

// 2. Chat Logic (Standard HTTPS - No external libraries)
app.post(['/api/chat/generate', '/api/magic-chat', '/api/generate'], (req, res) => {
    const userPrompt = req.body.prompt || req.body.message || "Hi";
    console.log("Processing prompt:", userPrompt);

    if (!OPENROUTER_KEY) {
        return res.json({ status: "success", content: "Bhai, API Key missing hai Railway mein!" });
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
            'Content-Type': 'application/json'
        }
    };

    const request = https.request(options, (apiRes) => {
        let body = '';
        apiRes.on('data', (chunk) => body += chunk);
        apiRes.on('end', () => {
            try {
                const data = JSON.parse(body);
                const aiReply = data.choices?.[0]?.message?.content || "OpenRouter Error: Check Balance/Key";
                res.json({ status: "success", content: aiReply, response: aiReply });
            } catch (e) {
                res.json({ status: "success", content: "Format Error" });
            }
        });
    });

    request.on('error', (e) => {
        res.json({ status: "success", content: "API Connection Failed" });
    });

    request.write(postData);
    request.end();
});

// 3. Mandatory Health Checks
app.all(['/api/:service/health', '/api/fal%20ai/health'], (req, res) => {
    res.json({ status: 'Healthy', active: true });
});

// 4. Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Nexus Engine Active on Port ${PORT}`);
});
