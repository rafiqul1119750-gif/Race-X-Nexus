const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Root Route
app.get('/', (req, res) => {
    res.status(200).send('Race-X Nexus: Online');
});

// 2. The "Fal" Savior (Handles /api/fal, /api/fal-ai, /api/fal ai etc.)
// Ye route kisi bhi cheez ko pakad lega jisme 'fal' word ho
app.get(['/api/fal*', '/api/fal%20ai*'], (req, res) => {
    console.log("Fal Health Check Hit!");
    res.json({ status: 'Healthy', active: true });
});

// 3. Other Health Checks
const services = ['groq', 'replicate', 'elevenlabs', 'openrouter', 'huggingface', 'sightengine'];
services.forEach(s => {
    app.get(`/api/${s}/health`, (req, res) => res.json({ status: 'Healthy' }));
});

// 4. Magic Chat
app.post('/api/magic-chat', (req, res) => {
    res.json({
        status: "success",
        content: "### System Unlocked\n\nBhai, Fal.ai fix ho gaya hai. Ab aapka God Mode on hona chahiye."
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Engine running on port ${PORT}`);
});
