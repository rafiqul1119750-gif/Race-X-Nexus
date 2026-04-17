import express from 'express';
import cors from 'cors';

const app = express();
// Railway hamesha PORT environment variable deta hai, 0.0.0.0 par bind karna zaroori hai
const PORT = process.env.PORT || 3000;

// CORS ko poori tarah open kar do taaki MeDo connect ho sake
app.use(cors({ origin: '*' })); 
app.use(express.json());

// 1. Home Route (Cron-job aur MeDo connection check ke liye)
app.get('/', (req, res) => {
  res.status(200).send('Race-X Backend is Live');
});

// 2. Magic Chat API
app.post('/api/magic-chat', (req, res) => {
  const { prompt } = req.body;
  res.json({
    status: "success",
    content: `### Result for "${prompt}"\n\nGemini-style direct response active.`
  });
});

// ZAROORI: 0.0.0.0 par listen karna Railway ke liye compulsory hai
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Race-X Engine Active on Port ${PORT}`);
});
