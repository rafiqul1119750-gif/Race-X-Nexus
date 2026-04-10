import { Client, Account, Databases, Storage, Avatars, ID, Query } from 'appwrite';

// 🌐 RACE-X CORE BACKEND CONFIGURATION
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Standard Appwrite Cloud Endpoint
    .setProject('69b9929d0024fe351bc2'); // Aapki Verified Project ID

// 🟢 Exporting Core Modules for Auth, DB, and Media
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// 💎 Exporting Utilities for Creating Unique IDs & Searching Data
export { ID, Query };

// 🛡️ --- NEXUS API ENGINE HELPER ---
// Ye function aapki saved API keys ko databases se nikalega
export const getNexusKey = async (serviceName: string) => {
    try {
        const response = await databases.listDocuments(
            'Race-X-Nexus', // Database ID
            'api_configs',  // Collection ID
            [Query.equal('service_name', serviceName)]
        );
        return response.documents[0]?.key_value || null;
    } catch (error) {
        console.error(`Nexus Error [${serviceName}]:`, error);
        return null;
    }
};

// 🚀 --- SERVICE ENDPOINTS CONFIG ---
// Inka use aap fetch requests mein karenge
export const NEXUS_ENDPOINTS = {
    OPEN_ROUTER: "https://openrouter.ai/api/v1/chat/completions",
    HUGGING_FACE: "https://api-inference.huggingface.co/models/",
    ELEVEN_LABS: "https://api.elevenlabs.io/v1/text-to-speech/",
    PEXELS: "https://api.pexels.com/v1/search",
    PIXABAY: "https://pixabay.com/api/",
};

export default client;
