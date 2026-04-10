import { Client, Account, Databases, Storage, Avatars, ID, Query } from 'appwrite';

// 🌐 RACE-X CORE BACKEND CONFIGURATION
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('69b9929d0024fe351bc2'); // Project ID ekdum sahi hai

// 🟢 Exporting Core Modules
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// 💎 Exporting Utilities
export { ID, Query };

// 🛡️ --- NEXUS API ENGINE HELPER ---
// Is function ko dhyan se dekho, yahan 'racex_db' kar diya hai
export const getNexusKey = async (serviceName: string) => {
    try {
        const response = await databases.listDocuments(
            'racex_db',     // ✅ Updated Database ID (Console se matching)
            'api_configs',  // Collection ID
            [Query.equal('service_name', serviceName)]
        );
        
        if (response.documents.length > 0) {
            return response.documents[0].key_value;
        }
        return null;
    } catch (error) {
        console.error(`Nexus Sync Error [${serviceName}]:`, error);
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
