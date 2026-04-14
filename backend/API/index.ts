import express from "express";
import cors from "cors";
import { Client, Databases, Query } from "node-appwrite";

const app = express();
app.use(cors());
app.use(express.json());

// --- ⚙️ APPWRITE SETUP ---
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67bd97ca000c0f41a8be') // Aapka Project ID
    .setKey('APNI_NAYI_API_KEY_YAHAN_DALO'); // 👈 Nayi key yahan dalo

const databases = new Databases(client);

app.post("/api/studio/create-image", async (req, res) => {
    const { prompt } = req.body;
    
    try {
        console.log("📡 Fetching key from Appwrite...");
        
        const vault = await databases.listDocuments(
            'RaceX_Main_DB', 
            'api_configs', 
            [Query.equal("service_name", "HUGGING_FACE")]
        );

        if (!vault.documents.length) {
            return res.status(404).json({ success: false, message: "Hugging Face Config Not Found" });
        }

        const HF_KEY = vault.documents[0].key_value;

        // --- 🎨 HUGGING FACE CALL ---
        const hfResponse = await fetch(
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

        if (hfResponse.status === 503) {
            return res.status(503).json({ success: false, message: "Model loading... try in 20s" });
        }

        const buffer = await hfResponse.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        
        res.json({ 
            success: true, 
            url: `data:image/jpeg;base64,${base64}` 
        });

    } catch (e) {
        console.error("❌ Error:", e.message);
        res.status(500).json({ success: false, message: e.message });
    }
});

export default app;
