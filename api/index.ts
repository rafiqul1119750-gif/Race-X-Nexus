import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// 🔓 CRITICAL: Ye Medo ko Railway se baat karne ki permission dega
app.use(cors({
    origin: '*', // Har jagah se connection allow karein
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 🌐 Health Check (For Medo Status)
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ 
        status: "connected", 
        system: "operational",
        engine: "Race-X Nexus" 
    });
});

// 🔑 7-AI Service Handler
app.get('/api/:service*', (req: Request, res: Response) => {
    res.status(200).json({ 
        success: true, 
        status: "healthy",
        injected: true
    });
});

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🏎️ Nexus Engine: CORS Fixed & Online`);
});
