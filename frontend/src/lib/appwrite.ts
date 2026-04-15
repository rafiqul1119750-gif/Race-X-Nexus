import { Client, Account, Databases, Storage, Avatars, ID, Query } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('69b9929d0024fe351bc2');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export { ID, Query };

// 🛡️ --- NEXUS RAILWAY CONNECTION ---
export const getNexusKey = async (serviceName: string) => {
    try {
        // Direct Railway Link
        const RAILWAY_URL = "https://race-x-nexus-production.up.railway.app/api/config";
        
        const response = await fetch(RAILWAY_URL);
        const result = await response.json();
        
        if (result.success) {
            console.log("🚀 Nexus Connected via Railway");
            return result.data;
        }
        return null;
    } catch (error) {
        console.error("❌ Nexus Connection Failed:", error);
        return null;
    }
};

export default client;
