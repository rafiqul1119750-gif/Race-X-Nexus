import { Client, Account, Databases, Storage, Users, ID } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)     // '!' hata diya
    .setProject(process.env.APPWRITE_PROJECT_ID)    // '!' hata diya
    .setKey(process.env.APPWRITE_API_KEY);          // '!' hata diya

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const users = new Users(client);

// Database IDs (Yahan bhi '!' hata diya)
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID; 
const POSTS_COLLECTION_ID = 'posts';
const COMMENTS_COLLECTION_ID = 'comments';

// --- FUNCTIONS ---

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

export const getAllPosts = async () => {
    try {
        return await databases.listDocuments(DATABASE_ID, POSTS_COLLECTION_ID);
    } catch (error) {
        throw new Error(error.message);
    }
};

export default client;
