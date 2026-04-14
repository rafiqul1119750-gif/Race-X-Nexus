import express from 'express';
import cors from 'cors';
import { Client, Databases, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Appwrite Setup
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '67c0500e0004f2104a39');

const databases = new Databases(client);

app.get('/api/config', async (req, res) => {
    try {
        const response = await databases.listDocuments(
            'RaceX_Main_DB', 
            'api_configs',
            [Query.limit(1)]
        );

        if (response.documents.length > 0) {
            // TypeScript fix: using 'as any' to access key_value
            const configData = (response.documents[0] as any).key_value;
            res.json({ success: true, data: configData });
        } else {
            res.status(404).json({ success: false, message: "No config found" });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Root route for Vercel health check
app.get('/', (req, res) => {
    res.send("Race-X Nexus API Engine is Online 🚀");
});

export default app;
