import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 🌐 1. Main Root Check (Already Working)
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ 
        status: "connected", 
        system: "unrestricted",
        engine: "Race-X Nexus" 
    });
});

// 🔑 2. Unified Service & Health Handler
// Ye handle karega: /api/groq, /api/groq/health, /api/fal/health, etc.
app.get('/api/:service*', (req: Request, res: Response) => {
    const serviceName = req.params.service;
    
    // Medo ko "Healthy" response bhejo
    res.json({ 
        success: true, 
        status: "healthy",
        service: serviceName,
        message: "Nexus Bridge Active",
        injected: true
    });
});

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 God Mode Fully Operational`);
});
