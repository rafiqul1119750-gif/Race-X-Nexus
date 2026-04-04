import { Client, Databases } from 'node-appwrite';

async function setup() {
    console.log("🚀 Race-X Database Setup starting...");

    const endpoint = process.env.APPWRITE_ENDPOINT;
    const project = process.env.APPWRITE_PROJECT_ID;
    const key = process.env.APPWRITE_API_KEY;

    if (!endpoint || !project || !key) {
        console.error("❌ ERROR: Missing Appwrite Keys in Render Settings!");
        return;
    }

    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(project)
        .setKey(key);

    const databases = new Databases(client);
    const DB_ID = "racex_db";

    try {
        console.log("📡 Connecting to Appwrite...");
        
        try {
            await databases.create(DB_ID, "RaceX_Main_DB");
            console.log("✅ Database Created!");
        } catch (e) {
            if (e.code === 409) console.log("ℹ️ Database exists.");
            else throw e;
        }

        try {
            await databases.createCollection(DB_ID, 'users', 'Users');
            console.log("✅ Users Collection Ready");
        } catch (e) {
            if (e.code === 409) console.log("ℹ️ Users collection exists.");
        }

        console.log("🏁 RACEX SETUP COMPLETED!");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

setup();
