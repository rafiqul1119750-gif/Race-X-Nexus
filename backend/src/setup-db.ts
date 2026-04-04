import { Client, Databases } from 'node-appwrite';
import 'dotenv/config';

// 1. Environment Variables Check (Safety Guard)
const ENDPOINT = process.env.APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY;

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
    console.error("❌ ERROR: Appwrite Keys are missing in Render Environment Settings!");
    console.log("Make sure you have: APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, and APPWRITE_API_KEY");
    process.exit(1); 
}

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);
const DB_ID = "racex_db";

async function setup() {
    console.log("🚀 Race-X Nexus: Starting Database Infrastructure Setup...");

    try {
        // --- CREATE DATABASE ---
        try {
            await databases.create(DB_ID, "RaceX_Main_DB");
            console.log("✅ Database 'RaceX_Main_DB' Created!");
        } catch (e) {
            console.log("ℹ️ Database already exists, moving to collections...");
        }

        // --- RX SOCIAL: USERS ---
        console.log("⏳ Setting up Users...");
        try {
            await databases.createCollection(DB_ID, 'users', 'Users');
            await databases.createStringAttribute(DB_ID, 'users', 'name', 100, true);
            await databases.createEmailAttribute(DB_ID, 'users', 'email', true);
            await databases.createStringAttribute(DB_ID, 'users', 'avatar', 500, false);
            console.log("✅ Users Collection Ready");
        } catch (e) { console.log("ℹ️ Users collection exists."); }

        // --- RX SOCIAL: POSTS ---
        console.log("⏳ Setting up Posts...");
        try {
            await databases.createCollection(DB_ID, 'posts', 'Posts');
            await databases.createStringAttribute(DB_ID, 'posts', 'userId', 50, true);
            await databases.createStringAttribute(DB_ID, 'posts', 'videoUrl', 500, true);
            await databases.createIntegerAttribute(DB_ID, 'posts', 'likes', false, 0);
            console.log("✅ Posts Collection Ready");
        } catch (e) { console.log("ℹ️ Posts collection exists."); }

        // --- RX MUSIC ---
        console.log("⏳ Setting up Music...");
        try {
            await databases.createCollection(DB_ID, 'songs', 'Songs');
            await databases.createStringAttribute(DB_ID, 'songs', 'title', 200, true);
            await databases.createStringAttribute(DB_ID, 'songs', 'url', 500, true);
            console.log("✅ Music Collection Ready");
        } catch (e) { console.log("ℹ️ Music collection exists."); }

        console.log("🏁 RACEX NEXUS DATABASE IS FULLY SYNCED!");

    } catch (error: any) {
        console.error("❌ Critical Setup Error:", error.message);
    }
}

setup();
