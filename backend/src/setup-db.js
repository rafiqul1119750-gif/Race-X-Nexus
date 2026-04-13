import { Client, Databases } from 'node-appwrite';

async function setup() {
    console.log("🚀 Race-X Database Sync starting...");
    
    // Check if env variables exist
    if (!process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_API_KEY) {
        console.error("❌ Missing Appwrite Environment Variables!");
        return;
    }

    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT.trim())
        .setProject(process.env.APPWRITE_PROJECT_ID.trim())
        .setKey(process.env.APPWRITE_API_KEY.trim());

    const databases = new Databases(client);
    const DB_ID = process.env.APPWRITE_DATABASE_ID || 'racex_db';

    try {
        // Database check karein agar pehle se hai
        await databases.get(DB_ID);
        console.log("ℹ️ Database already exists. Skipping creation to avoid limit error.");
    } catch (e) {
        // Agar 404 hai matlab database nahi hai, tabhi banao
        if (e.code === 404 || e.message.includes('not found')) {
            try {
                await databases.create(DB_ID, "RaceX_Main_DB");
                console.log("✅ Database Created successfully!");
            } catch (err) {
                console.error("❌ Database creation failed: Plan limit reached or permissions issue.");
            }
        } else {
            console.error("❌ Appwrite Error:", e.message);
        }
    }
    console.log("🏁 Setup process finished. Starting Server...");
}

setup();
