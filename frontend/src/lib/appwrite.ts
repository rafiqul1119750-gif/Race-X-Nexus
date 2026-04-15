// Is function ko apne lib/appwrite.ts mein replace karein
export const getNexusKey = async (serviceName: string) => {
    try {
        // Backend se specific service mang rahe hain
        const RAILWAY_URL = `https://race-x-nexus-production.up.railway.app/api/config/${serviceName}`;
        
        const response = await fetch(RAILWAY_URL);
        const result = await response.json();
        
        if (result.success) {
            console.log(`🚀 Nexus Sync: ${serviceName} Active`);
            return result.data; // Ye ab hf_... wala token dega
        }
        return null;
    } catch (error) {
        console.error("❌ Nexus Sync Failed:", error);
        return null;
    }
};
