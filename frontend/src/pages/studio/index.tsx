import React, { useState } from 'react';

export default function AiStudio() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return alert("Bhai, prompt toh likho!");
    setLoading(true);
    
    try {
      // Real API Call (Flux.1 or SDXL model)
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
          headers: { Authorization: "Bearer YOUR_HF_TOKEN_HERE" }, // Yahan apni key daalna
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] p-5 text-white">
      <h2 className="text-[#00F2FF] font-black italic mb-6">AI STUDIO V5</h2>
      
      {/* Real Preview Window */}
      <div className="w-full aspect-square rounded-3xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden mb-6">
        {loading ? (
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00F2FF]"></div>
        ) : image ? (
          <img src={image} className="w-full h-full object-cover" />
        ) : (
          <p className="text-[10px] opacity-40 uppercase tracking-widest">Awaiting Prompt...</p>
        )}
      </div>

      {/* Real Input */}
      <div className="glass-strong p-4 rounded-2xl border border-white/10 mb-4">
        <textarea 
          className="w-full bg-transparent text-sm outline-none resize-none h-20"
          placeholder="Describe your vision (e.g. Cyberpunk city, 8k, neon)..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <button 
        onClick={generateImage}
        disabled={loading}
        className="w-full py-4 bg-[#00F2FF] text-black font-black rounded-xl uppercase tracking-widest active:scale-95 transition-all disabled:opacity-50"
      >
        {loading ? "GENERATING..." : "GENERATE REAL IMAGE"}
      </button>
    </div>
  );
}
