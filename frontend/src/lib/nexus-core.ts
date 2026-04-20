// frontend/src/lib/nexus-core.ts

// 1. Gemini Brain (Magic Chat Logic)
export const getGeminiResponse = async (userPrompt: string) => {
  const apiKey = import.meta.env.VITE_GEMINI_KEY;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userPrompt }] }]
    })
  });
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};

// 2. Hugging Face Image Generation (Studio Logic)
export const generateImage = async (prompt: string) => {
  const token = import.meta.env.VITE_HF_TOKEN;
  const res = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell", {
    headers: { Authorization: `Bearer ${token}` },
    method: "POST",
    body: JSON.stringify({ inputs: prompt }),
  });
  return await res.blob();
};

// 3. Cloudinary Save (Storage Logic)
export const uploadToCloud = async (blob: Blob) => {
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
  
  const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  return data.secure_url; // Ye link social hub ke database mein jayega
};
