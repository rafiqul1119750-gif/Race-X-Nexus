import { ArrowLeft, Sparkles, Box, History, RefreshCw, Video, Music, SendHorizontal, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { databases } from "../../lib/appwrite"; 

// ✅ Nexus Live Config
const DATABASE_ID = 'Race-X-Nexus';
const COLLECTION_ID = 'api_configs';

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoApiKey, setVideoApiKey] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  // 🛡️ 1. DYNAMIC API INJECTION
  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const config = response.documents.find(doc => doc.service_name === 'VIDEO_GEN');
        if (config) setVideoApiKey(config.key_value);
      } catch (error) {
        console.error("Nexus Video Engine Link Error:", error);
      }
    };
    fetchKey();
  }, []);

  const handleStartGeneration = async () => {
    if (!prompt) return;
    if (!videoApiKey) {
      alert("⚠️ Engine Offline: Inject VIDEO_GEN key first!");
      return;
    }
    setIsGenerating(true);
    setGeneratedVideo(null);

    // Simulation for UI logic
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedVideo("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
    }, 6000);
  };

  const syncToStudio = () => {
    if (generatedVideo) {
      localStorage.setItem("rx_studio_buffer", generatedVideo);
      setLocation("/studio/editor");
    } else {
      // Agar video nahi bhi bani, tab bhi user Music check karne ja sakta hai
      setLocation("/studio/editor");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans selection:bg-cyan-500/30">
      
      {/* HEADER SECTION */}
      <header className="flex items-center justify-between mb-10">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900/80 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20}/>
        </button>
        <div className="text-center">
          <h2 className="text-[10px] font-black italic uppercase tracking-[0.4em] text-cyan-400 leading-none">RX Video Gen</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className={`w-1 h-1 rounded-full ${videoApiKey ? 'bg-cyan-500 animate-pulse' : 'bg-red-500'}`} />
            <p className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest">
              {videoApiKey ? "Nexus Render Node: Online" : "Nexus Link: Offline"}
            </p>
          </div>
        </div>
        <button className="p-3 bg-zinc-900/80 rounded-2xl border border-white/5 text-zinc-500">
          <History size={20}/>
        </button>
      </header>

      {/* 9:16 CINEMATIC PREVIEW */}
      <div className="relative aspect-[9/16] w-full max-w-[300px] mx-auto bg-zinc-900/30 rounded-[50px] border-2 border-white/5 overflow-hidden mb-6 shadow-2xl group">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 backdrop-blur-md bg-black/40">
             <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin" />
                <Video size={20} className="absolute inset-0 m-auto text-cyan-500 animate-pulse" />
             </div>
             <p className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-500 animate-pulse">Rendering...</p>
          </div>
        ) : generatedVideo ? (
          <video src={generatedVideo} autoPlay loop muted className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
            <Box size={50} className="mb-4 text-zinc-700" />
            <p className="text-[7px] font-black uppercase tracking-[0.6em]">No Visual Cache</p>
          </div>
        )}
      </div>

      {/* 🎵 QUICK MUSIC ACCESS BUTTON (YEH NAHI THA PEHLE) */}
      <div className="max-w-[300px] mx-auto mb-10">
        <button 
          onClick={syncToStudio}
          className="w-full py-4 bg-zinc-900/80 border border-white/5 rounded-[25px] flex items-center justify-center gap-3 active:scale-95 transition-all group hover:border-pink-500/50"
        >
          <Music size={16} className="text-pink-500 group-hover:animate-bounce" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Add Background Music</span>
          <ChevronRight size={14} className="text-zinc-600" />
        </button>
      </div>

      {/* INPUT CONTROLS */}
      <div className="max-w-md mx-auto space-y-6">
        <div className="relative">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic scene with cinematic lighting..."
            className="w-full bg-zinc-900/60 border border-white/10 rounded-[35px] p-8 text-sm focus:border-cyan-500/40 outline-none h-40 resize-none transition-all placeholder:text-zinc-800 placeholder:text-[9px] placeholder:font-black placeholder:uppercase"
          />
        </div>

        <button 
          onClick={handleStartGeneration}
          disabled={isGenerating || !prompt}
          className={`w-full py-7 rounded-[35px] font-black uppercase italic tracking-[0.3em] flex items-center justify-center gap-4 active:scale-95 transition-all shadow-2xl ${
            isGenerating ? 'bg-zinc-800 text-zinc-600' : 'bg-white text-black hover:bg-cyan-500'
          }`}
        >
          {isGenerating ? <RefreshCw className="animate-spin" size={20}/> : <Sparkles size={20} fill="black" />}
          {isGenerating ? "Engaging Node" : "Launch Engine"}
        </button>
      </div>

      <p className="text-center text-[7px] font-black text-zinc-800 uppercase tracking-[0.5em] mt-10">
        Race-X Visual Lab | v4.0 Active
      </p>
    </div>
  );
}
