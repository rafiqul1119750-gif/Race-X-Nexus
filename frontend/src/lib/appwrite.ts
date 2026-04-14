import { Client, Account, Databases, Storage, Avatars, ID, Query } from 'appwrite';

// 🌐 RACE-X CORE BACKEND CONFIGURATION
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('69b9929d0024fe351bc2'); // Frontend Project ID

// 🟢 Exporting Core Modules
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// 💎 Exporting Utilities
export { ID, Query };

// 🛡️ --- NEXUS API ENGINE HELPER (Railway Version) ---
/**
 * Ab ye function Appwrite ke bajaye aapke Railway server se data fetch karega.
 * Iska fayda ye hai ki aapka backend logic secure rahega.
 */
export const getNexusKey = async (serviceName: string) => {
    try {
        // Railway API Endpoint
        const RAILWAY_NEXUS_URL = "https://race-x-nexus-production.up.railway.app/api/config";
        
        const response = await fetch(RAILWAY_NEXUS_URL);
        const result = await response.json();
        
        if (result.success) {
            console.log(`🛡️ Nexus Sync [${serviceName}]: Success`);
            return result.data; // Yeh aapka "7a762d44" return karega
        }
        
        console.warn(`⚠️ Nexus Warning: API responded but success was false`);
        return null;
    } catch (error) {
        console.error(`❌ Nexus Railway Sync Error [${serviceName}]:`, error);
        return null;
    }
};

// 🚀 --- SERVICE ENDPOINTS CONFIG ---
export const NEXUS_ENDPOINTS = {
    OPEN_ROUTER: "https://openrouter.ai/api/v1/chat/completions",
    HUGGING_FACE: "https://api-inference.huggingface.co/models/",
    ELEVEN_LABS: "https://api.elevenlabs.io/v1/text-to-speech/",
    PEXELS: "https://api.pexels.com/v1/search",
    PIXABAY: "https://pixabay.com/api/",
};

export default client;
