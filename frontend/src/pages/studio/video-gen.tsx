import { ArrowLeft, Sparkles, Box, History, RefreshCw, Video, Music, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { databases } from "../../lib/appwrite"; 

const DATABASE_ID = 'Race-X-Nexus';
const COLLECTION_ID = 'api_configs';

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoApiKey, setVideoApiKey] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const config = response.documents.find(doc => doc.service_name === 'VIDEO_GEN');
        if (config) setVideoApiKey(config.key_value);
      } catch (error) {
        console.warn("Nexus Disconnected - Offline Mode");
      }
    };
    fetchKey();
  }, []);

  const handleStartGeneration = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    // Simulation logic
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedVideo("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans overflow-y-auto">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20}/>
        </button>
        <div className="text-center">
          <h2 className="text-[10px] font-black italic uppercase tracking-[0.4em] text-cyan-400">CINEMA AI</h2>
          <p className="text-[7px] font-bold text-zinc-600 uppercase mt-1">
            {videoApiKey ? "NODE: ACTIVE" : "NODE: OFFLINE"}
          </p>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* 9:16 Preview Card */}
      <div className="relative aspect-[9/16] w-full max-w-[280px] mx-auto bg-zinc-900/40 rounded-[45px] border-2 border-white/5 overflow-hidden mb-6 shadow-2xl">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60 backdrop-blur-md">
            <RefreshCw className="animate-spin text-cyan-500 mb-4" size={30} />
            <p className="text-[8px] font-black uppercase tracking-widest text-cyan-500">Rendering Visuals...</p>
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

      {/* Add Music Quick Link */}
      <button 
        onClick={() => setLocation("/studio/editor")}
        className="w-full max-w-[280px] mx-auto mb-8 py-4 bg-zinc-900/60 border border-white/5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
      >
        <Music size={14} className="text-pink-500" />
        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Add Music Engine</span>
        <ChevronRight size={12} className="text-zinc-700" />
      </button>

      {/* Controls */}
      <div className="space-y-4 max-w-md mx-auto">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="DESCRIBE YOUR CINEMATIC SCENE..."
          className="w-full bg-zinc-900/40 border border-white/10 rounded-[30px] p-6 text-xs focus:border-cyan-500 outline-none h-32 resize-none transition-all placeholder:text-zinc-800 placeholder:font-black"
        />
        <button 
          onClick={handleStartGeneration}
          disabled={isGenerating || !prompt}
          className="w-full py-6 bg-white text-black rounded-[30px] font-black uppercase italic tracking-widest active:scale-95 transition-all shadow-xl"
        >
          {isGenerating ? "Processing..." : "Launch Render"}
        </button>
      </div>
    </div>
  );
}
