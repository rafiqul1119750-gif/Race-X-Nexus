import React, { useState } from 'react';
import { NexusCore } from '../../lib/nexus-core';

export default function AiStudio() {
  const [prompt, setPrompt] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if(!prompt) return;
    setLoading(true);
    try {
      const url = await NexusCore.generateAndSave(prompt);
      setImg(url);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] p-6 text-white font-sans">
      <h1 className="text-xl font-black italic text-[#00F2FF] mb-6 tracking-tighter text-center">RACE-X STUDIO</h1>
      <div className="w-full aspect-square bg-white/[0.03] rounded-[2rem] border border-white/10 mb-6 flex items-center justify-center overflow-hidden">
        {loading ? <div className="animate-spin h-10 w-10 border-4 border-[#00F2FF] border-t-transparent rounded-full"></div> : 
         img ? <img src={img} className="w-full h-full object-cover" /> : <p className="opacity-20 text-[10px] tracking-[0.5em]">SYSTEM IDLE</p>}
      </div>
      <div className="bg-white/[0.05] p-4 rounded-2xl border border-white/10 mb-4">
        <textarea className="w-full bg-transparent outline-none text-sm h-20" placeholder="Enter Vision..." value={prompt} onChange={e => setPrompt(e.target.value)} />
      </div>
      <button onClick={handleGenerate} className="w-full py-4 bg-[#00F2FF] text-black font-black rounded-xl shadow-[0_0_20px_#00F2FF44]">GENERATE & CLOUD SAVE</button>
    </div>
  );
}
