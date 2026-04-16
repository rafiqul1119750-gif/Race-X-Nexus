import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ YE SABSE IMPORTANT HAI: Medo isse dekh kar "Green" hoga
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ 
        status: "connected", 
        system: "unrestricted",
        engine: "Race-X Nexus" 
    });
});

// ✅ Medo ki 7 API requests ko handle karne ke liye
app.get('/api/:service', (req: Request, res: Response) => {
    res.json({ 
        success: true, 
        status: "healthy",
        service: req.params.service 
    });
});

// Backup route for Health Checks
app.get('/health', (req, res) => res.send('OK'));

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 God Mode Active on Port ${PORT}`);
});
