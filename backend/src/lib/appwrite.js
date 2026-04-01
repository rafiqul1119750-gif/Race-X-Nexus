import { Client, Account, Databases, Storage } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;