import React, { useState } from 'react';

export default function AiStudio() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("1:1");

  // Real Function: Generate Image
  const handleGenerate = async () => {
    if (!prompt) return alert("Bhai, kuch toh likho!");
    
    setIsGenerating(true);
    // Pollinations AI: Fast, Real, and Free for high-end AI art
    const seed = Math.floor(Math.random() * 1000000);
    const finalUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;
    
    // Simulating a real fetch to ensure the image is ready
    const img = new Image();
    img.src = finalUrl;
    img.onload = () => {
      setImageUrl(finalUrl);
      setIsGenerating(false);
    };
  };

  // Real Function: Download Image
  const downloadImage = async () => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `RaceX_AI_${Date.now()}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#050505] p-5 text-white font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-black italic text-[#00F2FF] tracking-tighter">AI STUDIO V5</h1>
        <div className="px-3 py-1 bg-[#00F2FF]/10 border border-[#00F2FF]/30 rounded-full text-[10px] text-[#00F2FF] font-bold">
          PRO MODE ACTIVE
        </div>
      </div>

      {/* Real Preview Window */}
      <div className="relative w-full aspect-square rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden mb-6 group">
        {imageUrl ? (
          <img src={imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="AI Generated" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-30">
            <span className="text-5xl mb-2">🖼️</span>
            <p className="text-[10px] tracking-[0.3em] uppercase">Ready for Input</p>
          </div>
        )}
        
        {isGenerating && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#00F2FF] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] font-bold tracking-widest animate-pulse text-[#00F2FF]">NEXUS PROCESSING...</p>
          </div>
        )}
      </div>

      {/* Real Controls */}
      <div className="space-y-4">
        <div className="glass-strong p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
          <label className="text-[9px] font-bold text-[#00F2FF] mb-2 block uppercase tracking-widest">Master Prompt</label>
          <textarea 
            className="w-full bg-transparent text-sm outline-none resize-none h-24 placeholder:opacity-20"
            placeholder="Cinematic portrait of a cyborg, neon blue lighting, 8k resolution, highly detailed..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="col-span-2 py-4 bg-[#00F2FF] text-black font-black rounded-xl uppercase tracking-widest active:scale-95 transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
          >
            {isGenerating ? "Processing..." : "Generate Neural Art"}
          </button>
          
          {imageUrl && (
            <button 
              onClick={downloadImage}
              className="col-span-2 py-3 border border-white/10 bg-white/5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              📥 Save to Device
            </button>
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-8 flex justify-around border-t border-white/5 pt-6 opacity-40">
        <div className="text-center">
          <p className="text-[8px] uppercase font-bold mb-1">Model</p>
          <p className="text-[10px] text-[#00F2FF]">FLUX.1</p>
        </div>
        <div className="text-center">
          <p className="text-[8px] uppercase font-bold mb-1">Status</p>
          <p className="text-[10px] text-[#00F2FF]">Optimized</p>
        </div>
      </div>
    </div>
  );
}
