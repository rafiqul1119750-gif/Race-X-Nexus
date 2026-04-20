// RACE-X TRIPLE-API ENGINE (REAL & NO DUMMY)
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const HF_MODEL_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";

export const NexusCore = {
  // 1. GEMINI: Real AI Logic & Chat
  async askGemini(prompt: string) {
    const key = import.meta.env.VITE_GEMINI_KEY;
    const response = await fetch(`${GEMINI_URL}?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: `You are Race-X AI, a futuristic intelligence. ${prompt}` }] 
        }]
      })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  },

  // 2. HUGGING FACE: Real AI Image Generation
  async generateArt(prompt: string) {
    const token = import.meta.env.VITE_HF_TOKEN;
    const response = await fetch(HF_MODEL_URL, {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    });
    if (!response.ok) throw new Error("HF Engine Failed");
    return await response.blob();
  },

  // 3. CLOUDINARY: Real Lifetime Storage
  async saveToCloud(blob: Blob) {
    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
    const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
    
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", preset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    return data.secure_url; // Returns the permanent image link
  }
};
