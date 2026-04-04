import { Client, Databases } from 'node-appwrite';

async function setup() {
    console.log("🚀 Race-X Database Setup starting...");

    // 1. Debugging: Check if Env Vars are actually loading
    const endpoint = process.env.APPWRITE_ENDPOINT;
    const project = process.env.APPWRITE_PROJECT_ID;
    const key = process.env.APPWRITE_API_KEY;

    if (!endpoint || !project || !key) {
        console.error("❌ ERROR: Missing Appwrite Configuration!");
        console.log("Check Render Env Settings for: APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY");
        return; // Stop here instead of crashing
    }

    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(project)
        .setKey(key);

    const databases = new Databases(client);
    const DB_ID = "racex_db";

    try {
        console.log("📡 Connecting to Appwrite at:", endpoint);
        
        // Create Database
        try {
            await databases.create(DB_ID, "RaceX_Main_DB");
            console.log("✅ Database 'RaceX_Main_DB' Created!");
        } catch (e: any) {
            if (e.code === 409) console.log("ℹ️ Database already exists.");
            else throw e;
        }

        // Create Users Collection
        try {
            await databases.createCollection(DB_ID, 'users', 'Users');
            console.log("✅ Users Collection Ready");
        } catch (e: any) {
            if (e.code === 409) console.log("ℹ️ Users collection exists.");
            else throw e;
        }

        console.log("🏁 RACEX SETUP COMPLETED SUCCESSFULLY!");

    } catch (error: any) {
        console.error("❌ Appwrite Error:", error.message);
        console.error("Error Code:", error.code);
    }
}

setup();
