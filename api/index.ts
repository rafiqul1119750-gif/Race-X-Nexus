import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// 🌐 1. Root Handshake
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: "connected", 
    system: "operational",
    engine: "Race-X Nexus" 
  });
});

// 🔑 2. Service Test Fix (TypeScript Error Fixed)
app.get('/api/:service*', (req: any, res: Response) => {
  // Yahan 'any' use karne se TypeScript service* ka error nahi dega
  const servicePath = req.params['service*'] || req.params.service || 'unknown';
  
  res.status(200).json({
    success: true,
    status: "healthy",
    service: servicePath,
    message: "Service is active",
    data: { state: "online" }
  });
});

// 💬 3. Chat Result Handler
app.post('/api/chat', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    content: "Race-X Magic ready.",
    model: "Gemini-Style"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🏎️ Nexus Engine: Build Fixed & Operational`);
});
