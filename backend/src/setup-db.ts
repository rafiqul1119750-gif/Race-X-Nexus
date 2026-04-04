import { Client, Databases } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);
const DB_ID = "racex_db";

async function createCollections() {
    try {
        // 1. Database banana
        await databases.create(DB_ID, "RaceX_Main_DB");
        console.log("✅ Database Created");

        // 2. USERS Collection
        await databases.createCollection(DB_ID, 'users', 'Users');
        await databases.createStringAttribute(DB_ID, 'users', 'name', 100, true);
        await databases.createEmailAttribute(DB_ID, 'users', 'email', true);
        await databases.createStringAttribute(DB_ID, 'users', 'avatar', 500, false);
        console.log("✅ Users Collection Ready");

        // 3. POSTS (Reels) Collection
        await databases.createCollection(DB_ID, 'posts', 'Posts');
        await databases.createStringAttribute(DB_ID, 'posts', 'userId', 50, true);
        await databases.createStringAttribute(DB_ID, 'posts', 'videoUrl', 500, true);
        await databases.createStringAttribute(DB_ID, 'posts', 'caption', 1000, false);
        console.log("✅ Posts Collection Ready");

        console.log("🚀 Race-X Nexus Database is fully Synced!");
    } catch (error: any) {
        console.log("❌ Error:", error.message);
    }
}

createCollections();
