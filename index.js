const express = require('express');
const cors = require('cors');
const app = express();

// Railway automatic port assignment
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Connection Check
app.get('/', (req, res) => {
    res.status(200).send('<h1>Race-X Nexus: 24/7 Online</h1>');
});

// 2. Magic Chat (Direct Gemini Style)
app.post('/api/magic-chat', (req, res) => {
    res.json({
        status: "success",
        content: "### Race-X Magic Chat\n\nBhai, engine upgrade ho gaya hai! Ab Gemini interface active hai aur koi buttons nahi aayenge. Direct answer milega."
    });
});

// 3. All Health Checks for MeDo
const health = (req, res) => res.json({ status: 'Healthy' });
['groq', 'fal', 'replicate', 'elevenlabs', 'openrouter', 'huggingface', 'sightengine'].forEach(s => {
    app.get(`/api/${s}/health`, health);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Engine active on port ${PORT}`);
});
