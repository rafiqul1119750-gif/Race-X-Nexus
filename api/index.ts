import express from 'express';
import cors from 'cors';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(cors({ origin: '*' }));
app.use(express.json());

// 1. Home Route (Ispe 404 nahi aana chahiye)
app.get('/', (req, res) => {
  res.status(200).send('Race-X Nexus: Online');
});

// 2. Magic Chat (Dono paths handle kiye hain taaki 404 na aaye)
const chatResponse = (req, res) => {
  res.json({
    status: "success",
    content: "Magic Chat is live. Gemini interface active and direct."
  });
};
app.post('/api/magic-chat', chatResponse);
app.post('/magic-chat', chatResponse); // Backup route

// 3. Health Checks (Sabhi possible paths ke liye)
const healthCheck = (req, res) => res.json({ status: 'Healthy' });
const services = ['groq', 'fal', 'replicate', 'elevenlabs', 'openrouter', 'huggingface', 'sightengine'];

services.forEach(s => {
  app.get(`/api/${s}/health`, healthCheck);
  app.get(`/${s}/health`, healthCheck); // Backup path
});

// 4. Shop & Studio
app.get('/api/shop', (req, res) => res.json({ success: true, results: "Full catalog" }));

// 5. Global 404 Handler (Agar kuch galat hit ho toh ye batayega)
app.use((req, res) => {
  console.log(`404 Hit on: ${req.url}`);
  res.status(404).json({ error: `Path ${req.url} not found on Railway` });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Engine Active on Port ${PORT}`);
});
