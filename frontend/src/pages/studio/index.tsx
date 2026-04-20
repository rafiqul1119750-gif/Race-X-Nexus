import React, { useState } from 'react';
import { NexusCore } from '../../lib/nexus-core';

export default function RaceXStudio() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (type: string) => {
    if(!prompt) return alert("Bhai, prompt likho!");
    setLoading(true);
    try {
      if(type === 'IMAGE') {
        const url = await NexusCore.generateArt(prompt);
        setResult(url);
      } else if(type === 'CHAT') {
        const text = await NexusCore.askGemini(prompt);
        setResult(text);
      }
    } catch (e) { alert("Nexus Link Failed!"); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 font-sans selection:bg-[#00F2FF]">
      {/* Top Navigation Like Screenshot */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-black italic text-[#00F2FF] tracking-tighter">RACE-X: THE FUTURE</h1>
        <div className="flex gap-2">
            <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded">API TEST</span>
            <span className="text-[10px] bg-[#00F2FF]/20 text-[#00F2FF] px-2 py-1 rounded">GOD MODE</span>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="w-full aspect-square bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden mb-6 relative shadow-2xl">
        {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
                <div className="w-12 h-12 border-4 border-[#00F2FF] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-[10px] font-bold tracking-[0.5em] text-[#00F2FF]">NEURAL CORE ACTIVE</p>
            </div>
        ) : result && result.startsWith('http') ? (
            <img src={result} className="w-full h-full object-cover" />
        ) : result ? (
            <div className="p-6 text-sm text-gray-300 h-full overflow-auto">{result}</div>
        ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-20">
                <p className="text-[10px] tracking-[0.5em]">AWAITING COMMAND</p>
            </div>
        )}
      </div>

      {/* Input Field */}
      <div className="bg-white/[0.05] border border-white/10 rounded-3xl p-4 mb-6">
        <textarea 
          className="w-full bg-transparent outline-none text-sm h-20 placeholder:opacity-20"
          placeholder="Create cinema..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      {/* Action Grid (From your Screenshot) */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => handleAction('IMAGE')} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-start active:scale-95 transition-all">
            <span className="text-[#00F2FF] text-xs font-black">RX IMAGE</span>
            <span className="text-[8px] opacity-40 uppercase">STABLE DIFFUSION HD</span>
        </button>
        <button onClick={() => handleAction('CHAT')} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-start active:scale-95 transition-all">
            <span className="text-[#00F2FF] text-xs font-black">RX MAGIC CHAT</span>
            <span className="text-[8px] opacity-40 uppercase">GEMINI PRO 1.5</span>
        </button>
        <button className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-start opacity-30">
            <span className="text-[#00F2FF] text-xs font-black">RX MUSIC</span>
            <span className="text-[8px] opacity-40 uppercase">SYNTH CORE</span>
        </button>
        <button className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-start opacity-30">
            <span className="text-[#00F2FF] text-xs font-black">RX VIDEO</span>
            <span className="text-[8px] opacity-40 uppercase">CINEMA AI</span>
        </button>
      </div>

      {/* Social Bar (Bottom Like Screenshot) */}
      <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00F2FF] text-black flex items-center justify-center font-bold">R</div>
            <div>
                <p className="text-[10px] font-bold">RACE-X OFFICIAL</p>
                <p className="text-[8px] text-[#00F2FF]">LEVEL 1002 • 99929 RX</p>
            </div>
        </div>
        <button className="text-[10px] font-bold text-[#00F2FF] uppercase">EXPLORE ⚡</button>
      </div>
    </div>
  );
}
