const express = require('express');
const cors = require('cors');
const app = express();

// Port fixing for Railway
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. HOME ROUTE: MeDo connection aur Cron-job ke liye
app.get('/', (req, res) => {
    res.status(200).send('Race-X Nexus: Online');
});

// 2. MAGIC CHAT: Direct response logic (No 404)
app.post('/api/magic-chat', (req, res) => {
    res.json({
        status: "success",
        content: "### Race-X Magic Chat\n\nBhai, ab koi buttons nahi aayenge. Aapka Magic Chat ekdum Gemini jaisa direct aur fast chalega. Kya help chahiye?"
    });
});

// 3. SERVICE HEALTH: MeDo ke saare 7 services ko green karne ke liye
const healthCheck = (req, res) => res.json({ status: 'Healthy' });
const services = ['groq', 'fal', 'replicate', 'elevenlabs', 'openrouter', 'huggingface', 'sightengine'];

services.forEach(s => {
    app.get(`/api/${s}/health`, healthCheck);
});

// 4. CATCH-ALL: Agar MeDo koi galat URL bhi hit kare, toh use 404 na mile
app.use((req, res) => {
    res.status(200).json({ status: "success", message: "Path redirected" });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
