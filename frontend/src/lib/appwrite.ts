export const getNexusKey = async (serviceName: string) => {
    try {
        const RAILWAY_URL = `https://race-x-nexus-production.up.railway.app/api/config/${serviceName}?t=${Date.now()}`;
        const response = await fetch(RAILWAY_URL);
        const result = await response.json();
        
        if (result.success) {
            console.log(`🚀 Nexus Sync: ${serviceName} Active`);
            return result.data; 
        }
        return null;
    } catch (error) {
        console.error("❌ Nexus Sync Failed:", error);
        return null;
    }
};
