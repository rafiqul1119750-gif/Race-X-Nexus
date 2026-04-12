import { storage, databases, ID } from "@/lib/appwrite"; // Aapki config

const handleExport = async () => {
    if (!fabricRef.current) return;
    
    setIsProcessing(true);
    setProgress(10);

    try {
        // 1. Canvas ko Data URL (Image) mein badlo
        const dataURL = fabricRef.current.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2 // High Resolution export
        });

        // 2. Convert DataURL to Blob
        const response = await fetch(dataURL);
        const blob = await response.blob();
        const file = new File([blob], `racex_${Date.now()}.png`, { type: "image/png" });

        setProgress(40);

        // 3. REAL FUNCTION: Upload to Appwrite Storage
        const uploadedFile = await storage.createFile(
            '6619...your_bucket_id', // 👈 Apna Bucket ID yahan dalo
            ID.unique(),
            file
        );

        setProgress(70);

        // 4. REAL FUNCTION: Save Document to racex_db Database
        const fileUrl = storage.getFileView('6619...your_bucket_id', uploadedFile.$id);
        
        await databases.createDocument(
            'racex_db', 
            'posts', // Collection ID for your feed
            ID.unique(),
            {
                content_url: fileUrl.href,
                prompt: prompt,
                created_at: new Date().toISOString(),
                user_id: userData?.$id // Logged in user ID
            }
        );

        setProgress(100);
        alert("Success! Project Exported to Race-X Cloud.");
        setLocation("/studio/analytics"); // Real Redirect

    } catch (error) {
        console.error("Export Failed:", error);
        alert("Export Error: Check Console for details.");
    } finally {
        setIsProcessing(false);
    }
};
