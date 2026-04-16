import express from 'express';
import cors from 'cors'; 
import { Client, Databases, Query } from 'node-appwrite';

const app = express();

// ✅ Nexus Bridge: Allowing Medo.dev to talk to Railway
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ✅ Appwrite Configuration
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69b9929d0024fe351bc2'); // Aapki Project ID

const databases = new Databases(client);

// 🌐 Health Check Route (Isse Medo "Connected" dikhayega)
app.get('/', (req, res) => {
    res.json({ 
        status: "Active", 
        engine: "Race-X Nexus", 
        message: "Neural Core is Online" 
    });
});

// 🔑 API Config Fetcher
app.get('/api/config/:service', async (req, res) => {
    const { service } = req.params;
    try {
        const response = await databases.listDocuments(
            'racex_db', 
            'api_configs',
            [Query.equal('service_name', service)]
        );

        if (response.documents.length > 0) {
            const actualKey = (response.documents[0] as any).key_value;
            res.json({ success: true, data: actualKey });
        } else {
            res.status(404).json({ success: false, message: "Service not found" });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🚀 Start Engine
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Race-X Nexus Engine Running on Port ${PORT}`);
});
