import { Router, Request, Response } from "express";
import { databases } from "../lib/appwrite"; 
import { Query } from "node-appwrite";

const studioRouter = Router();

// --- 🔐 NEXUS DATABASE PROTECTOR ---
async function getSecret(serviceName: string): Promise<string | null> {
    try {
        console.log(`🔍 Searching for Key: ${serviceName}...`);
        
        // Note: Check if Database ID is 'racex_db' and Collection ID is 'api_configs'
        const response = await databases.listDocuments(
            'racex_db', 
            'api_configs', 
            [Query.equal("service_name", serviceName)]
        );

        if (response.documents && response.documents.length > 0) {
            console.log(`✅ Key found in Database for: ${serviceName}`);
            return response.documents[0].key_value as string;
        }

        console.log(`⚠️ Key not in DB, checking Environment Variables...`);
        return process.env[serviceName] || null;
    } catch (error: any) {
        console.error(`❌ Appwrite Database Error: ${error.message}`);
        return process.env[serviceName] || null;
    }
}

// --- 🎨 IMAGE GENERATION ---
studioRouter.post("/create-image", async (req: Request, res: Response) => {
    const { prompt } = req.body;
    
    // Exact match for Attribute in Appwrite (Must be HUGGING_FACE)
    const HF_KEY = await getSecret("HUGGING_FACE");

    if (!HF_KEY) {
        return res.status(500).json({ 
            success: false, 
            message: "Nexus Vault Failure: HUGGING_FACE key missing in Appwrite." 
        });
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
            return res.status(503).json({ success: false, message: "Engine Warming Up... Try again in 20s." });
        }

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(`HF Error ${response.status}: ${errorMsg}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        
        res.json({ success: true, url: `data:image/jpeg;base64,${base64Image}` });
    } catch (e: any) {
        console.error("Studio Logic Error:", e.message);
        res.status(500).json({ success: false, message: e.message });
    }
});

export default studioRouter;
