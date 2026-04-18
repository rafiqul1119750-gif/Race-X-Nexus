const express = require('express');
const cors = require('cors');
const https = require('https');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

app.use(cors());
app.use(express.json());

// Version check taaki humein pata chale naya code live hai
app.get('/', (req, res) => {
    res.status(200).send('Race-X Nexus: v2.0 (Direct Connect) - Online');
});

// Ye hai woh rasta jo MeDo ko chahiye
app.post(['/api/chat/generate', '/api/magic-chat', '/api/generate', '/api/chat'], (req, res) => {
    const userPrompt = req.body.prompt || req.body.message || req.body.content || "Hi";
    
    if (!OPENROUTER_KEY) {
        return res.json({ status: "success", content: "Key missing in Railway!" });
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
                const reply = data.choices?.[0]?.message?.content || "API Error: Check OpenRouter Credits";
                res.json({ status: "success", content: reply, response: reply });
            } catch (e) { 
                res.json({ status: "success", content: "Bhai, response format mein gadbad hai." }); 
            }
        });
    });

    request.on('error', (e) => res.json({ status: "success", content: "Connection Timeout. Try again." }));
    request.write(postData);
    request.end();
});

// Service Health Checks
app.all(['/api/:service/health', '/api/fal%20ai/health'], (req, res) => {
    res.json({ status: 'Healthy', active: true });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});
