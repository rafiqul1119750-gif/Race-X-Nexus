import express from 'express';
import cors from 'cors';
import { Client, Databases, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://race-x-nexus-frontend.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '69b9929d0024fe351bc2');

const databases = new Databases(client);

// 🔥 Ye route ab specific service ki key nikalega
app.get('/api/config/:service', async (req, res) => {
    const { service } = req.params;
    try {
        const response = await databases.listDocuments(
            'racex_db', 
            'api_configs',
            [Query.equal('service_name', service)] // Sirf HUGGING_FACE dhoondega
        );

        if (response.documents.length > 0) {
            // Asli Token (hf_...) pick ho raha hai yahan
            const actualKey = (response.documents[0] as any).key_value;
            res.json({ success: true, data: actualKey });
        } else {
            res.status(404).json({ success: false, message: "Service not found" });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Nexus Engine Online on Port ${PORT}`);
});
