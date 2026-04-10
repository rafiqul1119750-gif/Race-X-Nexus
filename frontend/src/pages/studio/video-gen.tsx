import { ArrowLeft, Sparkles, Box, History, RefreshCw, Video, Music, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function CinemaAI() {
  const [, setLocation] = useLocation();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleStartGeneration = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedVideo("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20}/>
        </button>
        <h2 className="text-[10px] font-black italic uppercase tracking-[0.4em] text-cyan-400">RX CINEMA</h2>
        <History size={20} className="text-zinc-700" />
      </header>

      <div className="relative aspect-[9/16] w-full max-w-[280px] mx-auto bg-zinc-900/40 rounded-[45px] border-2 border-white/5 overflow-hidden mb-8 shadow-2xl">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60 backdrop-blur-md">
            <RefreshCw className="animate-spin text-cyan-500 mb-4" size={30} />
            <p className="text-[8px] font-black uppercase tracking-widest text-cyan-500 text-center">Neural Rendering<br/>In Progress</p>
          </div>
        ) : generatedVideo ? (
          <video src={generatedVideo} autoPlay loop muted className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
            <Box size={40} className="mb-4 text-zinc-500" />
            <p className="text-[7px] font-black uppercase tracking-[0.5em]">No Cache</p>
          </div>
        )}
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="ENTER SCENE DESCRIPTION..."
          className="w-full bg-zinc-900/40 border border-white/10 rounded-[30px] p-6 text-xs focus:border-cyan-500 outline-none h-32 resize-none transition-all placeholder:text-zinc-800"
        />
        <button 
          onClick={handleStartGeneration}
          className="w-full py-6 bg-white text-black rounded-[30px] font-black uppercase italic tracking-widest active:scale-95 transition-all"
        >
          {isGenerating ? "Processing..." : "Launch Render"}
        </button>
      </div>
    </div>
  );
}
