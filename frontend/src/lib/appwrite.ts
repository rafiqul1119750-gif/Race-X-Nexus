export const getNexusKey = async (serviceName: string) => {
    try {
        // Cache bust karne ke liye timestamp add kiya hai
        const RAILWAY_URL = `https://race-x-nexus-production.up.railway.app/api/config/${serviceName}?t=${Date.now()}`;
        
        const response = await fetch(RAILWAY_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors' // CORS issues se bachne ke liye
        });

        if (!response.ok) {
            console.error(`❌ Railway Error: ${response.status}`);
            return null;
        }

        const result = await response.json();
        
        if (result.success && result.data) {
            console.log(`🚀 Nexus Sync: ${serviceName} Connection Established`);
            return result.data; 
        }
        
        console.warn(`⚠️ Nexus Warning: Service ${serviceName} found but no data.`);
        return null;
    } catch (error) {
        console.error("❌ Nexus Critical Failure:", error);
        return null;
    }
};
