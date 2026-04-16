import express, { Request, Response } from 'express';
import cors from 'cors';
import { Client, Databases, Query } from 'node-appwrite';

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69b9929d0024fe351bc2');

const databases = new Databases(client);

// 🌐 Health Check (Isse Medo "Green" hoga)
app.get('/', (req: Request, res: Response) => {
    res.status(200).send("OK");
});

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
