import { ArrowLeft, Play, Sparkles, Video, History } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function CinemaAI() {
  const [, setLocation] = useLocation();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateVideo = () => {
    if(!prompt) return;
    setIsGenerating(true);
    // Yahan video generation logic aayega
    setTimeout(() => setIsGenerating(false), 5000); 
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans">
      <header className="flex items-center justify-between mb-10">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5"><ArrowLeft size={20}/></button>
        <h2 className="text-lg font-black italic uppercase tracking-widest text-cyan-400">Cinema AI</h2>
        <button className="p-3 bg-zinc-900 rounded-2xl border border-white/5 text-zinc-500"><History size={20}/></button>
      </header>

      <div className="aspect-video w-full bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col items-center justify-center relative overflow-hidden mb-10">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">Rendering Frame 24/120...</p>
          </div>
        ) : (
          <div className="text-center opacity-20">
            <Video size={60} className="mx-auto mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">AI Engine Idle</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your cinematic masterpiece..."
          className="w-full bg-zinc-900 border border-white/10 rounded-[30px] p-6 text-sm focus:border-cyan-500 outline-none h-32 resize-none"
        />
        <button 
          onClick={generateVideo}
          className="w-full py-6 bg-cyan-500 text-black rounded-[30px] font-black uppercase italic tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]"
        >
          <Sparkles size={20} /> Generate Video
        </button>
      </div>
    </div>
  );
}
