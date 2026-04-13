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
    const HF_KEY = await getSecret("HUGGING_FACE");

    if (!HF_KEY) return res.status(500).json({ success: false, message: "HF_KEY Missing" });

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5", {
            method: "POST",
            headers: { "Authorization": `Bearer ${HF_KEY}` },
            body: JSON.stringify({ inputs: prompt }),
        });
        
        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        res.json({ success: true, url: `data:image/jpeg;base64,${base64Image}` });
    } catch (e: any) {
        res.status(500).json({ success: false, message: e.message });
    }
});

export default studioRouter;
