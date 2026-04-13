import { Router } from "express";
import fetch from "node-fetch";
import { databases } from "../lib/appwrite"; // Make sure your appwrite config is exported
import { Query } from "node-appwrite";

const studioRouter = Router();

// --- 🔐 NEXUS KEY RETRIEVER ---
async function getSecret(serviceName: string): Promise<string | null> {
    try {
        const response = await databases.listDocuments(
            'racex_db', 
            'api_configs', 
            [Query.equal("service_name", serviceName)]
        );
        
        if (response.documents.length > 0) {
            return response.documents[0].key_value;
        }
        // Fallback to Render Env if not in Appwrite
        return process.env[serviceName] || null;
    } catch (error) {
        return process.env[serviceName] || null;
    }
}

// --- 🎬 CINEMA PROTOCOL (Seedance 2.0 via Fal) ---
studioRouter.post("/create-cinema", async (req, res) => {
    const { prompt, imageUrl } = req.body;
    const FAL_KEY = await getSecret("FAL_KEY");

    if (!FAL_KEY) return res.status(500).json({ success: false, message: "FAL_KEY Missing" });

    try {
        const response = await fetch("https://fal.run/fal-ai/seedance/v2/image-to-video", {
            method: "POST",
            headers: {
                "Authorization": `Key ${FAL_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt,
                image_url: imageUrl,
                motion_bucket_id: 127,
                aspect_ratio: "16:9"
            })
        });

        const data = await response.json();
        res.json({ success: true, url: data.video?.url || data.request_id });
    } catch (e: any) {
        res.status(500).json({ success: false, message: e.message });
    }
});

// --- 🎙️ VOICE PROTOCOL (ElevenLabs) ---
studioRouter.post("/create-voice", async (req, res) => {
    const { text, voiceId } = req.body;
    const ELEVEN_KEY = await getSecret("ELEVEN_LABS");

    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId || '21m00Tcm4TbcDqxeJwzx'}`, {
            method: "POST",
            headers: {
                "Accept": "audio/mpeg",
                "Content-Type": "application/json",
                "xi-api-key": ELEVEN_KEY || ""
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_monolingual_v1",
                voice_settings: { stability: 0.5, similarity_boost: 0.5 }
            }),
        });

        const arrayBuffer = await response.arrayBuffer();
        const base64Audio = Buffer.from(arrayBuffer).toString('base64');
        res.json({ success: true, url: `data:audio/mpeg;base64,${base64Audio}` });
    } catch (e: any) {
        res.status(500).json({ success: false, message: e.message });
    }
});

export default studioRouter;
