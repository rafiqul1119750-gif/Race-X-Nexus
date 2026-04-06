import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Standard Appwrite Cloud Endpoint
    .setProject('69b9929d0024fe351bc2'); // 👈 Yahan apni Appwrite Project ID dalein

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export default client;
