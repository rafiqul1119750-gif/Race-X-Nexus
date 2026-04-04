import { Client, Databases } from 'node-appwrite';
import 'dotenv/config';

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || '')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

const databases = new Databases(client);
const DB_ID = "racex_db";

async function setup() {
    try {
        // 1. Create Main Database
        try {
            await databases.create(DB_ID, "RaceX_Main_DB");
            console.log("✅ Database 'RaceX_Main_DB' Created!");
        } catch (e) {
            console.log("ℹ️ Database already exists, skipping...");
        }

        // --- 📱 RX SOCIAL ---
        console.log("⏳ Setting up RX Social...");
        await databases.createCollection(DB_ID, 'users', 'Users');
        await databases.createStringAttribute(DB_ID, 'users', 'name', 100, true);
        await databases.createEmailAttribute(DB_ID, 'users', 'email', true);
        await databases.createStringAttribute(DB_ID, 'users', 'avatar', 500, false);
        await databases.createIntegerAttribute(DB_ID, 'users', 'followers', false, 0);

        await databases.createCollection(DB_ID, 'posts', 'Posts');
        await databases.createStringAttribute(DB_ID, 'posts', 'userId', 50, true);
        await databases.createStringAttribute(DB_ID, 'posts', 'videoUrl', 500, true);
        await databases.createStringAttribute(DB_ID, 'posts', 'caption', 1000, false);
        await databases.createIntegerAttribute(DB_ID, 'posts', 'likes', false, 0);

        // --- 🎨 RX STUDIO ---
        console.log("⏳ Setting up RX Studio...");
        await databases.createCollection(DB_ID, 'projects', 'Projects');
        await databases.createStringAttribute(DB_ID, 'projects', 'userId', 50, true);
        await databases.createStringAttribute(DB_ID, 'projects', 'type', 20, true); // image/video
        await databases.createStringAttribute(DB_ID, 'projects', 'data', 5000, false); // JSON logic

        // --- 🤖 RX MAGIC CHAT ---
        console.log("⏳ Setting up RX Magic Chat...");
        await databases.createCollection(DB_ID, 'messages', 'Messages');
        await databases.createStringAttribute(DB_ID, 'messages', 'senderId', 50, true);
        await databases.createStringAttribute(DB_ID, 'messages', 'receiverId', 50, true);
        await databases.createStringAttribute(DB_ID, 'messages', 'text', 2000, true);

        // --- 🎵 RX MUSIC ---
        console.log("⏳ Setting up RX Music...");
        await databases.createCollection(DB_ID, 'songs', 'Songs');
        await databases.createStringAttribute(DB_ID, 'songs', 'title', 200, true);
        await databases.createStringAttribute(DB_ID, 'songs', 'url', 500, true);
        await databases.createStringAttribute(DB_ID, 'songs', 'artist', 100, false);
        await databases.createStringAttribute(DB_ID, 'songs', 'cover', 500, false);

        // --- 🛒 RX SHOP ---
        console.log("⏳ Setting up RX Shop...");
        await databases.createCollection(DB_ID, 'products', 'Products');
        await databases.createStringAttribute(DB_ID, 'products', 'name', 200, true);
        await databases.createIntegerAttribute(DB_ID, 'products', 'price', true); // In Paisa
        await databases.createStringAttribute(DB_ID, 'products', 'image', 500, true);
        await databases.createIntegerAttribute(DB_ID, 'products', 'stock', false, 100);

        console.log("🚀 ALL COLLECTIONS SYNCED TO RACEX NEXUS!");

    } catch (error: any) {
        console.error("❌ Setup Error:", error.message);
        console.log("Tip: If collection already exists, just ignore the error.");
    }
}

setup();
