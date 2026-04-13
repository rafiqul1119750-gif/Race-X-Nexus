const executeNexusEngine = async (type: string, prompt: string, extraData?: any) => {
    setLoading(true);
    let endpoint = "/api/studio/create-image"; // default
    
    if (type === "vid") endpoint = "/api/studio/create-cinema";
    if (type === "voc") endpoint = "/api/studio/create-voice";

    try {
        const response = await fetch(`https://race-x-nexus-1.onrender.com${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                prompt: prompt, 
                text: prompt, // for voice
                imageUrl: extraData?.imageUrl || "" 
            })
        });

        const result = await response.json();
        if (result.success) {
            setVariants((prev) => ({ ...prev, variant1: result.url }));
        } else {
            alert("Engine Error: " + result.message);
        }
    } catch (error) {
        console.error("Nexus Link Broken");
        alert("Connection Lost to Nexus Core");
    } finally {
        setLoading(false);
    }
};
