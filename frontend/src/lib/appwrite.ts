import { Client, Account, Databases, Storage, Avatars, ID, Query } from 'appwrite';

// 🌐 RACE-X CORE BACKEND CONFIGURATION
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Standard Appwrite Cloud Endpoint
    .setProject('69b9929d0024fe351bc2'); // Aapki Verified Project ID

// 🟢 Exporting Core Modules for Auth, DB, and Media
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// 💎 Exporting Utilities for Creating Unique IDs & Searching Data
export { ID, Query };

export default client;
