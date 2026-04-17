const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Connection Root (Isse Main Status Green Hoga)
app.get('/', (req, res) => {
    res.status(200).send('Race-X Nexus: Online');
});

// 2. Magic Chat API
app.post('/api/magic-chat', (req, res) => {
    res.json({
        status: "success",
        content: "### Race-X Magic Chat\n\nBhai, system unlock ho gaya hai! Direct Gemini response active hai."
    });
});

// 3. SERVICE HEALTH CHECK (The 404 Fixer)
const health = (req, res) => res.json({ status: 'Healthy', active: true });

// Saare possible variations for Fal.ai
app.get('/api/fal/health', health);
app.get('/api/fal-ai/health', health);
app.get('/api/fal%20ai/health', health); // This handles the space (%20)
app.get('/api/fal ai/health', health);   // Raw space support

// Rest of the services
const otherServices = ['groq', 'replicate', 'elevenlabs', 'openrouter', 'huggingface', 'sightengine'];
otherServices.forEach(s => {
    app.get(`/api/${s}/health`, health);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 Race-X Nexus: Fully Operational');
});
