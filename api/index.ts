import express, { Request, Response } from 'express';
import cors from 'cors';
import { Client, Databases, Query } from 'node-appwrite';

const app = express();

// ✅ CORS Setup
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ✅ Appwrite Setup with Type Safety
const client = new Client();

// Environment variables use karna best hai, par agar direct daal rahe ho toh as string define karo
const endpoint = 'https://cloud.appwrite.io/v1';
const projectId = '69b9929d0024fe351bc2';

client
    .setEndpoint(endpoint)
    .setProject(projectId);

const databases = new Databases(client);

// 🌐 Health Check
app.get('/', (req: Request, res: Response) => {
    res.json({ 
        status: "Active", 
        engine: "Race-X Nexus",
        timestamp: new Date().toISOString()
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
            const data = response.documents[0] as any;
            res.json({ success: true, data: data.key_value });
        } else {
            res.status(404).json({ success: false, message: "Service not found" });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🚀 Start Engine
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Nexus Engine Running on Port ${PORT}`);
});
