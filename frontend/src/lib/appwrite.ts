export const getNexusKey = async (serviceName: string) => {
    try {
        // Service name (HUGGING_FACE) URL ke end mein jayega
        const RAILWAY_URL = `https://race-x-nexus-production.up.railway.app/api/config/${serviceName}`;
        
        const response = await fetch(RAILWAY_URL);
        const result = await response.json();
        
        if (result.success) {
            console.log(`🚀 Nexus Sync: ${serviceName} Active`);
            return result.data; // Ab hf_... wala token return hoga
        }
        return null;
    } catch (error) {
        console.error("❌ Nexus Sync Failed:", error);
        return null;
    }
};
