import { ArrowLeft, Play, Sparkles, Video, History, Box } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function CinemaAI() {
  const [, setLocation] = useLocation();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20}/>
        </button>
        <div className="text-center">
          <h2 className="text-sm font-black italic uppercase tracking-[0.3em] text-cyan-400">RX Cinema AI</h2>
          <p className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest">Neural Render Engine v4.0</p>
        </div>
        <button className="p-3 bg-zinc-900 rounded-2xl border border-white/5 text-zinc-500">
          <History size={20}/>
        </button>
      </header>

      {/* Video Preview Display */}
      <div className="relative aspect-[9/16] w-full max-w-sm mx-auto bg-zinc-900 rounded-[45px] border-2 border-white/5 overflow-hidden mb-10 group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
        
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
             <div className="w-16 h-16 border-t-4 border-cyan-500 border-r-4 border-r-transparent rounded-full animate-spin mb-4" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 animate-pulse">Rendering 8K...</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 z-20">
            <Box size={50} className="mb-4 text-zinc-700" />
            <p className="text-[8px] font-black uppercase tracking-[0.5em]">No Input Detected</p>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="space-y-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-[30px] blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the scene (e.g. A futuristic Indian city in 2077, cinematic lighting, 8K)..."
            className="relative w-full bg-zinc-900/80 border border-white/10 rounded-[30px] p-7 text-sm focus:border-cyan-500/50 outline-none h-40 resize-none transition-all placeholder:text-zinc-700 placeholder:text-[10px] placeholder:font-black placeholder:uppercase"
          />
        </div>

        <button 
          onClick={() => { if(prompt) setIsGenerating(true); }}
          className="w-full py-7 bg-white text-black rounded-[30px] font-black uppercase italic tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
        >
          <Sparkles size={20} fill="black" /> Generate Cinema
        </button>
      </div>
    </div>
  );
}
