import express from 'express';
import cors from 'cors'; // Iska install hona zaroori hai: npm install cors
import { Client, Databases, Query } from 'node-appwrite';

const app = express();

// 🚨 Sabse important change: CORS ko fully allow kar do
app.use(cors({
    origin: '*', // Ye sabhi domains ko allow karega (Testing ke liye best hai)
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69b9929d0024fe351bc2');

const databases = new Databases(client);

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Nexus Engine Ready on ${PORT}`));
