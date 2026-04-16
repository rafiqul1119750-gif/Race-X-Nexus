import express, { Request, Response } from 'express';
import cors from 'cors';
import { Client, Databases, Query } from 'node-appwrite';

const app = express();

// ✅ Sabse asaan CORS: Sabko allow karo
app.use(cors());
app.use(express.json());

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69b9929d0024fe351bc2'); // Aapki Project ID

const databases = new Databases(client);

// 🌐 Public Health Check (Medo isse dekh kar "Green" ho jayega)
app.get('/', (req: Request, res: Response) => {
    res.status(200).send("OK"); 
});

// 🔑 Data Fetcher
app.get('/api/config/:service', async (req: Request, res: Response) => {
    const { service } = req.params;
    try {
        const response = await databases.listDocuments('racex_db', 'api_configs', [Query.equal('service_name', service)]);
        if (response.documents.length > 0) {
            res.json({ success: true, data: (response.documents[0] as any).key_value });
        } else {
            res.status(404).json({ success: false });
        }
    } catch (error: any) {
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Nexus Ready`);
});
