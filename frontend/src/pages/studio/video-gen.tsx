import { ArrowLeft, Sparkles, Box, History, RefreshCw, Video, Music, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { databases } from "../../lib/appwrite"; 

const DATABASE_ID = 'Race-X-Nexus';
const COLLECTION_ID = 'api_configs';

export default function CinemaAI() {
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
        console.warn("Nexus Offline Mode");
      }
    };
    fetchKey();
  }, []);

  const handleStartGeneration = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedVideo("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20}/>
        </button>
        <div className="text-center">
          <h2 className="text-[10px] font-black italic uppercase tracking-[0.4em] text-cyan-400">RX CINEMA</h2>
          <p className="text-[7px] font-bold text-zinc-600 mt-1 uppercase tracking-widest">
            {videoApiKey ? "LINK: SECURE" : "LINK: OFFLINE"}
          </p>
        </div>
        <History size={20} className="text-zinc-700" />
      </header>

      {/* Preview Card */}
      <div className="relative aspect-[9/16] w-full max-w-[280px] mx-auto bg-zinc-900/40 rounded-[45px] border-2 border-white/5 overflow-hidden mb-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80 backdrop-blur-sm">
            <RefreshCw className="animate-spin text-cyan-500 mb-4" size={32} />
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-cyan-500">Neural Syncing...</p>
          </div>
        ) : generatedVideo ? (
          <video src={generatedVideo} autoPlay loop muted className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
            <Box size={40} className="mb-4 text-zinc-500" />
            <p className="text-[7px] font-black uppercase tracking-[0.5em]">Studio Buffer Empty</p>
          </div>
        )}
      </div>

      {/* Sound Engine Link */}
      <button 
        onClick={() => setLocation("/studio/editor")}
        className="w-full max-w-[280px] mx-auto mb-10 py-5 bg-zinc-900/60 border border-white/5 rounded-3xl flex items-center justify-center gap-4 active:scale-95 transition-all group"
      >
        <Music size={16} className="text-pink-500 group-hover:animate-pulse" />
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300">Open Sound Engine</span>
        <ChevronRight size={14} className="text-zinc-700" />
      </button>

      {/* Logic Box */}
      <div className="space-y-4 max-w-md mx-auto px-2">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="DESCRIBE CINEMATIC ACTION..."
          className="w-full bg-zinc-900/40 border border-white/10 rounded-[35px] p-8 text-xs focus:border-cyan-500/50 outline-none h-36 resize-none transition-all placeholder:text-zinc-800"
        />
        <button 
          onClick={handleStartGeneration}
          disabled={isGenerating || !prompt}
          className={`w-full py-7 rounded-[35px] font-black uppercase italic tracking-[0.3em] transition-all shadow-xl ${
            isGenerating ? 'bg-zinc-800 text-zinc-600' : 'bg-white text-black hover:bg-cyan-500'
          }`}
        >
          {isGenerating ? "Engaging Node..." : "Launch Engine"}
        </button>
      </div>
    </div>
  );
}
