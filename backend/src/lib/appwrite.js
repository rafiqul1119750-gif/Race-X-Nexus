import { Client, Account, Databases, Storage, Users } from 'node-appwrite';

// Yahan '!' ka matlab hai ki hum TypeScript ko bata rahe hain ki 
// ye variables Render ke dashboard se pakka milenge.
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

// Ye modules aapke poore backend mein export honge
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const users = new Users(client); // <--- Ye God Mode/Admin ke liye sabse zaroori hai

export default client;
