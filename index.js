// ... existing setup ...

app.post(['/api/magic-chat', '/api/chat/generate'], async (req, res) => {
    const prompt = req.body.message || req.body.prompt || "Hi";
    
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${OPENROUTER_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                // MEHNGA MODEL: "google/gemini-2.0-flash-001"
                // FREE MODEL (Testing ke liye):
                model: "google/gemini-2.0-flash-lite-preview-0815:free", 
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Connected (Free Mode)";
        res.json({ status: "success", content: reply });

    } catch (err) {
        res.json({ status: "success", content: "Error: Key check karo ya free model busy hai." });
    }
});

// ... rest of the code ...
