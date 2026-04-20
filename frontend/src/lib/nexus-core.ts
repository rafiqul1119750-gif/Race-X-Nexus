export const NexusCore = {
  // Real Gemini Chat
  async askGemini(prompt: string) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      return data.candidates[0].content.parts[0].text;
    } catch (e) { return "Nexus Connection Error."; }
  },

  // Real Image Gen + Cloud Storage
  async generateAndSave(prompt: string) {
    // 1. Generate via Hugging Face
    const hfRes = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell", {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}` },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    });
    const blob = await hfRes.blob();

    // 2. Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, {
      method: "POST",
      body: formData
    });
    const cloudData = await cloudRes.json();
    return cloudData.secure_url;
  }
};
