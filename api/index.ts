import express from "express";
import cors from "cors";
import { Client, Databases, Query } from "node-appwrite";

const app = express();
app.use(cors());
app.use(express.json());

// --- ⚙️ APPWRITE CONFIG ---
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67bd97ca000c0f41a8be'); 

const databases = new Databases(client);

// --- 🎨 IMAGE ROUTE ---
app.post("/api/studio/create-image", async (req, res) => {
    const { prompt } = req.body;
    
    try {
        // Appwrite se secret uthao
        const vault = await databases.listDocuments(
            'RaceX_Main_DB', 
            'api_configs', 
            [Query.equal("service_name", "HUGGING_FACE")]
        );

        const HF_KEY = vault.documents[0]?.key_value;
        if (!HF_KEY) throw new Error("Vault Key Missing");

        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                method: "POST",
                headers: { "Authorization": `Bearer ${HF_KEY}`, "Content-Type": "application/json" },
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        res.json({ success: true, url: `data:image/jpeg;base64,${base64Image}` });

    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

export default app;
