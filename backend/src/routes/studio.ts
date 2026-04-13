import { Router, Request, Response } from "express";
import { databases } from "../lib/appwrite"; 
import { Query } from "node-appwrite";

const studioRouter = Router();

async function getSecret(serviceName: string): Promise<string | null> {
    try {
        const response = await databases.listDocuments('racex_db', 'api_configs', [
            Query.equal("service_name", serviceName)
        ]);
        if (response.documents && response.documents.length > 0) {
            return response.documents[0].key_value as string;
        }
        return process.env[serviceName] || null;
    } catch (error) {
        return process.env[serviceName] || null;
    }
}

studioRouter.post("/create-image", async (req: Request, res: Response) => {
    const { prompt } = req.body;
    console.log("🚀 Generating Image for:", prompt);
    
    const HF_KEY = await getSecret("HUGGING_FACE");

    if (!HF_KEY) return res.status(500).json({ success: false, message: "HF_KEY Missing in Vault" });

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

        // Agar model load ho raha hai (Status 503), toh user ko batao
        if (response.status === 503) {
            return res.status(503).json({ success: false, message: "Engine Warming Up... Try again in 20 seconds." });
        }

        if (!response.ok) {
            const errData = await response.text();
            console.error("HF Error:", errData);
            throw new Error(`Inference Engine Error: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        if (arrayBuffer.byteLength < 100) {
            throw new Error("Invalid Image Data Received");
        }

        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        const finalUrl = `data:image/jpeg;base64,${base64Image}`;
        
        console.log("✅ Image Generated Successfully");
        res.json({ success: true, url: finalUrl });

    } catch (e: any) {
        console.error("Studio Error:", e.message);
        res.status(500).json({ success: false, message: e.message });
    }
});

export default studioRouter;
