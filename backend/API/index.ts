import express from "express";
import cors from "cors";
import { Client, Databases, Query } from "node-appwrite";

const app = express();

// ✅ CORS: Sabhi requests ko allow karega
app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ APPWRITE CONFIG
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67bd97ca000c0f41a8be') 
    .setKey('Standard_e4cea083349878408b90d8bdcaec7312d7d6ddd89df9c81137aaa9b2b0f1510bd07239c41797768683f3396a05f18c33acd96c74e3ac5e5c79beb4c536f3e8fd010d2a32b0faf3831b41690087e750fe70c8d1c0da277b745b0d17111b6d4f7ca3d534f9571c3aed8f1affc6ead9d49542bb87ff16679968dc39950c9b5a58fe');

const databases = new Databases(client);

// Test Route
app.get("/", (req, res) => res.send("Nexus Engine is Online"));

// ✅ GENERATION ENDPOINT
app.post("/api/studio/create-image", async (req, res) => {
    const { prompt } = req.body;
    
    try {
        const vault = await databases.listDocuments(
            'RaceX_Main_DB', 
            'api_configs', 
            [Query.equal("service_name", "HUGGING_FACE")]
        );

        if (!vault.documents.length) {
            return res.status(404).json({ success: false, message: "HF Key Not Found" });
        }

        const HF_KEY = vault.documents[0].key_value;

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
            return res.status(503).json({ success: false, message: "Engine Warming Up... Wait 15s" });
        }

        const buffer = await hfResponse.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        
        res.json({ 
            success: true, 
            url: `data:image/jpeg;base64,${base64}` 
        });

    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

export default app;
