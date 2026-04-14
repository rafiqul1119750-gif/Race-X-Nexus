import express from 'express';
import cors from 'cors';
import { Client, Databases, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Appwrite Setup
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '67c0500e0004f2104a39');

const databases = new Databases(client);

// Environment Variables for IDs (Railway se uthayega)
const DATABASE_ID = 'racex_db'; 
const COLLECTION_ID = 'api_configs';

app.get('/api/config', async (req, res) => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID, 
            COLLECTION_ID,
            [Query.limit(1)]
        );

        if (response.documents.length > 0) {
            // TypeScript bypass using 'as any'
            const configData = (response.documents[0] as any).key_value;
            res.json({ success: true, data: configData });
        } else {
            res.status(404).json({ success: false, message: "No documents found in collection" });
        }
    } catch (error: any) {
        res.status(500).json({ 
            success: false, 
            error: error.message,
            tip: "Check if DATABASE_ID and COLLECTION_ID match exactly in Appwrite Console" 
        });
    }
});

app.get('/', (req, res) => {
    res.send("Race-X Nexus API Engine is Online on Railway 🚀");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
