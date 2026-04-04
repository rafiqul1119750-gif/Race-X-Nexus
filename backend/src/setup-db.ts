// Render par jo naam hain unhe yahan dalo
const client = new Client()
    .setEndpoint(process.env.APP_ENDPOINT || '') // Aapka jo bhi Render par name hai
    .setProject(process.env.APP_PROJECT_ID || '')
    .setKey(process.env.API_KEY || ''); 
