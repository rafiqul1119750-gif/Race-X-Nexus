const { Client, Databases } = require('node-appwrite');

async function setup() {
    console.log("🚀 Race-X Database Sync starting...");
    
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT.trim())
        .setProject(process.env.APPWRITE_PROJECT_ID.trim())
        .setKey(process.env.APPWRITE_API_KEY.trim());

    const databases = new Databases(client);
    const DB_ID = process.env.APPWRITE_DATABASE_ID || 'racex_db';

    try {
        // Database check karein
        await databases.get(DB_ID);
        console.log("ℹ️ Database already exists. Skipping creation.");
    } catch (e) {
        if (e.code === 404) {
            try {
                await databases.create(DB_ID, "RaceX_Main_DB");
                console.log("✅ Database Created!");
            } catch (err) {
                console.error("❌ Database creation failed (Limit reached?).");
            }
        } else {
            console.error("❌ Appwrite Error:", e.message);
        }
    }
    console.log("🏁 Setup process finished.");
}

setup();
