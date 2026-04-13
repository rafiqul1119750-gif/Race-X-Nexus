import { Client, Account, Databases, Storage, Users, ID } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || '')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const users = new Users(client);

export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || 'racex_db'; 
export const POSTS_COLLECTION_ID = 'posts';
export const COMMENTS_COLLECTION_ID = 'comments';

// --- FUNCTIONS ---

export const createPost = async (postData) => {
    try {
        return await databases.createDocument(DATABASE_ID, POSTS_COLLECTION_ID, ID.unique(), postData);
    } catch (error) {
        throw error;
    }
};

// 🌟 Ye missing tha, ab add kar diya hai
export const addComment = async (commentData) => {
    try {
        return await databases.createDocument(DATABASE_ID, COMMENTS_COLLECTION_ID, ID.unique(), commentData);
    } catch (error) {
        throw error;
    }
};

export const getAllPosts = async () => {
    try {
        return await databases.listDocuments(DATABASE_ID, POSTS_COLLECTION_ID);
    } catch (error) {
        throw error;
    }
};

export default client;
