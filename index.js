const express = require('express');
const cors = require('cors');
const https = require('https');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

app.use(cors());
app.use(express.json());

// Railway Health Check (Must be 200 OK)
app.get('/', (req, res) => res.status(200).send('Nexus Ready'));

// Chat Endpoints
app.post(['/api/chat/generate', '/api/magic-chat', '/api/generate'], (req, res) => {
    const userPrompt = req.body.prompt || req.body.message || "Hi";
    
    if (!OPENROUTER_KEY) {
        return res.json({ status: "success", content: "Key missing in Railway Variables!" });
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
        apiRes.on('data', (d) => body += d);
        apiRes.on('end', () => {
            try {
                const data = JSON.parse(body);
                const reply = data.choices?.[0]?.message?.content || "API Error";
                res.json({ status: "success", content: reply, response: reply });
            } catch (e) { res.json({ status: "success", content: "Format error" }); }
        });
    });

    request.on('error', (e) => res.json({ status: "success", content: "Retry please" }));
    request.write(postData);
    request.end();
});

// All Health Checks
app.all('/api/:service/health', (req, res) => res.json({ status: 'Healthy', active: true }));

app.listen(PORT, '0.0.0.0', () => console.log(`Live on ${PORT}`));
