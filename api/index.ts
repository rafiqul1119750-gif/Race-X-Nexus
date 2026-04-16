import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Client, Databases, Query } from 'node-appwrite';

const app = express();

// 🚀 BRAHMASTRA CORS: Sab kuch allow kar do
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
}));

// Manual Headers (Just in case)
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // OPTIONS request ke liye turant 200 OK bhejo (Handshake fix)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69b9929d0024fe351bc2');

const databases = new Databases(client);

// 🌐 Medo Health Check Route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ status: "Active" });
});

app.get('/api/config/:service', async (req: Request, res: Response) => {
    const { service } = req.params;
    try {
        const response = await databases.listDocuments('racex_db', 'api_configs', [Query.equal('service_name', service)]);
        if (response.documents.length > 0) {
            res.json({ success: true, data: (response.documents[0] as any).key_value });
        } else {
            res.status(404).json({ success: false, message: "Not found" });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Nexus Live on ${PORT}`);
});
