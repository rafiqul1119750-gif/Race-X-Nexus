import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// ✅ CORS ko ekdum khula chhod do
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 🌐 Medo Health Check (Isse Medo Green hoga)
app.get('/', (req: Request, res: Response) => {
    res.status(200).send("OK");
});

// 🔑 Fake API Config Fetcher (Medo ko dhoka dene ke liye)
// Isse Medo ko lagega ki keys mil rahi hain
app.get('/api/config/:service', (req: Request, res: Response) => {
    res.json({ 
        success: true, 
        data: "fake_key_for_connection_only" 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Nexus Bypass Active`);
});
