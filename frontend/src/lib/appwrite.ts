import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('YOUR_PROJECT_ID'); // <--- Yahan apni Project ID dalo

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID } from 'appwrite';
