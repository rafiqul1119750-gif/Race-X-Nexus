import { Client, Databases } from 'node-appwrite';

async function setup() {
    console.log("🚀 Race-X Database Setup starting...");

    // Environment variables ko clean (trim) kar rahe hain
    const endpoint = (process.env.APPWRITE_ENDPOINT || '').trim();
    const project = (process.env.APPWRITE_PROJECT_ID || '').trim();
    const key = (process.env.APPWRITE_API_KEY || '').trim();

    if (!endpoint || !project || !key) {
        console.error("❌ ERROR: Missing Appwrite Keys in Render Environment Settings!");
        return;
    }

    try {
        const client = new Client()
            .setEndpoint(endpoint)
            .setProject(project)
            .setKey(key);

        const databases = new Databases(client);
        const DB_ID = "racex_db";

        console.log("📡 Connecting to Appwrite at:", endpoint);
        
        // 1. Create Database
        try {
            await databases.create(DB_ID, "RaceX_Main_DB");
            console.log("✅ Database 'RaceX_Main_DB' Created!");
        } catch (e) {
            if (e.code === 409) console.log("ℹ️ Database already exists.");
            else throw e;
        }

        // 2. Create Users Collection
        try {
            await databases.createCollection(DB_ID, 'users', 'Users');
            console.log("✅ Users Collection Ready");
        } catch (e) {
            if (e.code === 409) console.log("ℹ️ Users collection exists.");
        }

        console.log("🏁 RACEX SETUP COMPLETED SUCCESSFULLY!");
    } catch (error) {
        console.error("❌ Setup Error:", error.message);
    }
}

setup();
