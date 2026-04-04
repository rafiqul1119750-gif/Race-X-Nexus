import { Client, Account, Databases, Storage, Users, ID } from 'node-appwrite';

// Render ke Environment Variables se keys uthayi ja rahi hain
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const users = new Users(client);

// Database aur Collection IDs
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!; 
const POSTS_COLLECTION_ID = 'posts';
const COMMENTS_COLLECTION_ID = 'comments';

// --- FUNCTIONS FOR RACE-X FEATURES ---

// 1. Naya Post banane ke liye
export const createPost = async (postData) => {
    try {
        return await databases.createDocument(
            DATABASE_ID,
            POSTS_COLLECTION_ID,
            ID.unique(),
            postData
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

// 2. Naya Comment add karne ke liye
export const addComment = async (commentData) => {
    try {
        return await databases.createDocument(
            DATABASE_ID,
            COMMENTS_COLLECTION_ID,
            ID.unique(),
            commentData
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

// 3. Saare Posts fetch karne ke liye (Feed ke liye)
export const getAllPosts = async () => {
    try {
        return await databases.listDocuments(DATABASE_ID, POSTS_COLLECTION_ID);
    } catch (error) {
        throw new Error(error.message);
    }
};

export default client;
