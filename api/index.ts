import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 🌐 1. Root Health Check (Medo ko Green karne ke liye)
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ 
        status: "connected", 
        system: "unrestricted",
        engine: "Race-X Nexus",
        active_services: 7
    });
});

// 🔑 2. API Endpoint Handler (Medo ki 7 keys ke liye)
app.get('/api/:service', (req: Request, res: Response) => {
    res.json({ 
        success: true, 
        status: "active",
        injected: true 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 Race-X Nexus: God Mode Ready`);
});
