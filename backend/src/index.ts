import express from "express";
import cors from "cors";
import { Client, Databases, Query } from "node-appwrite";

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67bd97ca000c0f41a8be'); 

const databases = new Databases(client);

app.post("/api/studio/create-image", async (req, res) => {
    const { prompt } = req.body;
    
    try {
        // 1. Appwrite se Hugging Face Key uthao
        const vault = await databases.listDocuments(
            'RaceX_Main_DB', 
            'api_configs', 
            [Query.equal("service_name", "HUGGING_FACE")]
        );

        const HF_KEY = vault.documents[0]?.key_value;
        if (!HF_KEY) return res.status(500).json({ success: false, message: "API Key not found in Appwrite" });

        // 2. Hugging Face ko Call karo
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

        // 3. Check if response is an image
        if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            const base64Image = Buffer.from(arrayBuffer).toString('base64');
            return res.json({ success: true, url: `data:image/jpeg;base64,${base64Image}` });
        } else {
            const errorData = await response.json();
            return res.status(500).json({ success: false, message: errorData.error || "HF Engine Busy" });
        }

    } catch (e) {
        res.status(500).json({ success: false, message: "Nexus Core Error: " + e.message });
    }
});

export default app;
