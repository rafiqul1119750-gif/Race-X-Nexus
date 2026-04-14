import { Router, Request, Response } from "express";
import { databases } from "../lib/appwrite"; 
import { Query } from "node-appwrite";

const studioRouter = Router();

// ✅ IDs from your Appwrite Screenshots
const DATABASE_ID = 'RaceX_Main_DB'; 
const COLLECTION_ID = 'api_configs';

async function getSecret(serviceName: string): Promise<string | null> {
    try {
        console.log(`📡 Fetching ${serviceName} from ${DATABASE_ID}...`);
        
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("service_name", serviceName)]
        );

        if (response.documents.length > 0) {
            console.log(`✅ Key Found for ${serviceName}`);
            return response.documents[0].key_value as string;
        }
        
        console.error(`⚠️ Key ${serviceName} not found in Collection!`);
        return null;
    } catch (error: any) {
        console.error("❌ Appwrite Query Failed:", error.message);
        return null;
    }
}

studioRouter.post("/create-image", async (req: Request, res: Response) => {
    const { prompt } = req.body;
    const HF_KEY = await getSecret("HUGGING_FACE");

    if (!HF_KEY) {
        return res.status(500).json({ success: false, message: "API Key missing in Nexus Vault" });
    }

    try {
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

        if (response.status === 503) {
            return res.status(503).json({ success: false, message: "AI Engine is warming up... try in 20s" });
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        
        res.json({ 
            success: true, 
            url: `data:image/jpeg;base64,${base64Image}` 
        });

    } catch (e: any) {
        res.status(500).json({ success: false, message: e.message });
    }
});

export default studioRouter;
