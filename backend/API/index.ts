import express from "express";
import cors from "cors";
import { Client, Databases, Query } from "node-appwrite";

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67bd97ca000c0f41a8be'); // Aapka Project ID

const databases = new Databases(client);

app.post("/api/studio/create-image", async (req, res) => {
    const { prompt } = req.body;
    
    try {
        // Appwrite se key fetch karo
        const vault = await databases.listDocuments(
            'RaceX_Main_DB', 
            'api_configs', 
            [Query.equal("service_name", "HUGGING_FACE")]
        );

        if (vault.documents.length === 0) {
            return res.status(404).json({ success: false, message: "Hugging Face key missing in Appwrite!" });
        }

        const HF_KEY = vault.documents[0].key_value;

        // Hugging Face API call
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                method: "POST",
                headers: { 
                    "Authorization": `Bearer ${HF_KEY}`,
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            const err = await response.text();
            return res.status(500).json({ success: false, message: "HF Engine Error: " + err });
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        res.json({ success: true, url: `data:image/jpeg;base64,${base64Image}` });

    } catch (e) {
        res.status(500).json({ success: false, message: "Vercel Backend Error: " + e.message });
    }
});

export default app;
