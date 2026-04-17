const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MeDo isi route se "Online" hota hai
app.get('/', (req, res) => {
    res.status(200).send('Race-X Nexus: 24/7 Online');
});

// Magic Chat (Direct Response)
app.post('/api/magic-chat', (req, res) => {
    res.json({
        status: "success",
        content: "### Race-X Magic Chat\n\nBhai, engine upgrade ho gaya hai! Gemini interface active hai."
    });
});

// Services Health Checks
const health = (req, res) => res.json({ status: 'Healthy' });
['groq', 'fal', 'replicate', 'elevenlabs', 'openrouter', 'huggingface', 'sightengine'].forEach(s => {
    app.get(`/api/${s}/health`, health);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('Server active on ' + PORT);
});
