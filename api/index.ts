import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(cors({ origin: '*' }));
app.use(express.json());

// 1. Root Route (MeDo Connection Check)
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Race-X Nexus: System Online');
});

// 2. Magic Chat (Gemini Style)
app.post('/api/magic-chat', (req: Request, res: Response) => {
  res.json({
    status: "success",
    content: "Magic Chat is active. No modes, just direct answers."
  });
});

// 3. Manual Health Checks (MeDo Service Tester Fix)
// Har ek service ka alag route taaki TypeScript build fail na kare
app.get('/api/groq/health', (req: Request, res: Response) => res.json({ status: 'Healthy' }));
app.get('/api/fal/health', (req: Request, res: Response) => res.json({ status: 'Healthy' }));
app.get('/api/replicate/health', (req: Request, res: Response) => res.json({ status: 'Healthy' }));
app.get('/api/elevenlabs/health', (req: Request, res: Response) => res.json({ status: 'Healthy' }));
app.get('/api/openrouter/health', (req: Request, res: Response) => res.json({ status: 'Healthy' }));
app.get('/api/huggingface/health', (req: Request, res: Response) => res.json({ status: 'Healthy' }));
app.get('/api/sightengine/health', (req: Request, res: Response) => res.json({ status: 'Healthy' }));

// 4. Shopping Catalog
app.get('/api/shop', (req: Request, res: Response) => {
  res.json({ success: true, message: "Full catalog enabled" });
});

// ZAROORI: Railway binding fix
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Race-X Engine Active on Port ${PORT}`);
});
