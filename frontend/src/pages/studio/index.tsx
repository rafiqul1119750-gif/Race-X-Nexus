import React, { useState } from 'react';
import { NexusCore } from '../../lib/nexus-core';

export default function AiStudio() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      // Step A: Generate Real Image (Hugging Face)
      const blob = await NexusCore.generateArt(prompt);
      
      // Step B: Save to Permanent Cloud (Cloudinary)
      const finalLink = await NexusCore.saveToCloud(blob);
      
      setImage(finalLink);
    } catch (err) {
      alert("Nexus Error: Check API Keys");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] p-6 text-white font-sans">
      <h1 className="text-2xl font-black italic text-[#00F2FF] mb-8">AI STUDIO</h1>
      
      {/* Preview Section */}
      <div className="w-full aspect-square bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative mb-6">
        {image ? (
          <img src={image} className="w-full h-full object-cover" alt="Race-X AI" />
        ) : (
          <div className="h-full flex items-center justify-center opacity-20 text-[10px] tracking-[0.5em]">SYSTEM STANDBY</div>
        )}
        {loading && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-2 border-[#00F2FF] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] text-[#00F2FF] animate-pulse">GENERATING NEURAL ART...</p>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-4">
        <textarea 
          className="w-full bg-transparent outline-none text-sm h-24 placeholder:opacity-30"
          placeholder="Hyper-realistic portrait of a neon samurai..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <button 
        onClick={handleCreate}
        disabled={loading}
        className="w-full py-4 bg-[#00F2FF] text-black font-black rounded-xl uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,242,255,0.2)] disabled:opacity-50"
      >
        {loading ? "PROCESSING..." : "ACTIVATE NEURAL ENGINE"}
      </button>
    </div>
  );
}
