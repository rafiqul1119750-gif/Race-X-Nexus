import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Client, Databases, Query } from 'node-appwrite';

const app = express();

// ✅ Ultimate CORS Fix: Sabhi origins aur headers ko allow karein
app.use(cors()); 
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());

// ✅ Appwrite Connection
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69b9929d0024fe351bc2');

const databases = new Databases(client);

// 🌐 Medo-Friendly Health Check
app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ 
        status: "Active", 
        engine: "Race-X Nexus",
        handshake: true 
    });
});

// 🔑 API Config Fetcher
app.get('/api/config/:service', async (req: Request, res: Response) => {
    const { service } = req.params;
    try {
        const response = await databases.listDocuments(
            'racex_db', 
            'api_configs',
            [Query.equal('service_name', service)]
        );

        if (response.documents.length > 0) {
            const doc: any = response.documents[0];
            res.json({ success: true, data: doc.key_value });
        } else {
            res.status(404).json({ success: false, message: "Service not found" });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🚀 Start Engine
const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 Nexus Engine Running on Port ${PORT}`);
});
