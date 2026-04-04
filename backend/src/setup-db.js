// Isse use karo taaki agar endpoint galat ho toh crash na ho
try {
    const client = new Client()
        .setEndpoint(endpoint.trim()) // .trim() space hata dega
        .setProject(project.trim())
        .setKey(key.trim());
    
    const databases = new Databases(client);
    // ... baaki code same rahega
} catch (e) {
    console.log("❌ Setup Client Error:", e.message);
}
