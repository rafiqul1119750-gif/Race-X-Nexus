import { ArrowLeft, Sparkles, Box, History, RefreshCw, Video } from "lucide-react";
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

  // 🛡️ 1. DYNAMIC API INJECTION (Nexus Link)
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
      alert("⚠️ Engine Error: Injection Hub mein VIDEO_GEN key nahi mili!");
      return;
    }

    setIsGenerating(true);
    
    // 🚀 Yahan aapka Actual API call (Replicate/Runway/Pika) jayega
    // Headers mein 'videoApiKey' use hoga.

    // Simulation for UI feedback
    setTimeout(() => {
      setIsGenerating(false);
      // alert("Video Rendered (Simulated)");
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans selection:bg-cyan-500/30">
      
      {/* HEADER SECTION */}
      <header className="flex items-center justify-between mb-10">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900/80 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20}/>
        </button>
        <div className="text-center">
          <h2 className="text-[10px] font-black italic uppercase tracking-[0.4em] text-cyan-400">RX Video Gen</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className={`w-1 h-1 rounded-full ${videoApiKey ? 'bg-cyan-500 animate-pulse' : 'bg-red-500'}`} />
            <p className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest">
              {videoApiKey ? "Nexus Render Node: Online" : "Nexus Link: Disconnected"}
            </p>
          </div>
        </div>
        <button className="p-3 bg-zinc-900/80 rounded-2xl border border-white/5 text-zinc-500">
          <History size={20}/>
        </button>
      </header>

      {/* 9:16 CINEMATIC PREVIEW */}
      <div className="relative aspect-[9/16] w-full max-w-[320px] mx-auto bg-zinc-900/50 rounded-[50px] border-2 border-white/5 overflow-hidden mb-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10" />
        
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 backdrop-blur-md bg-black/40">
             <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin" />
                <div className="absolute inset-2 border-r-2 border-blue-500 rounded-full animate-[spin_2s_linear_infinite]" />
                <Video size={24} className="absolute inset-0 m-auto text-cyan-500 animate-pulse" />
             </div>
             <p className="text-[9px] font-black uppercase tracking-[0.5em] text-cyan-500 animate-pulse text-center">
               Generating<br/>Neural Frames
             </p>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 z-20">
            <Box size={60} className="mb-6 text-zinc-700" />
            <p className="text-[8px] font-black uppercase tracking-[0.6em]">No Visual Cache</p>
          </div>
        )}

        {/* Floating Detail Overlay */}
        <div className="absolute bottom-10 left-0 right-0 px-8 z-20">
           <div className="h-[1px] w-full bg-white/10 mb-4" />
           <div className="flex justify-between items-center text-[7px] font-black uppercase tracking-widest text-zinc-500">
              <span>Aspect: 9:16</span>
              <span>Codec: H.265</span>
           </div>
        </div>
      </div>

      {/* INPUT CONTROLS */}
      <div className="max-w-md mx-auto space-y-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 to-transparent rounded-[35px] blur opacity-0 group-focus-within:opacity-100 transition-all duration-700" />
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic Indian street with neon lights, cinematic rain, 8k..."
            className="relative w-full bg-zinc-900/60 border border-white/10 rounded-[35px] p-8 text-sm focus:border-cyan-500/40 outline-none h-44 resize-none transition-all placeholder:text-zinc-800 placeholder:text-[9px] placeholder:font-black placeholder:uppercase placeholder:tracking-widest"
          />
        </div>

        <button 
          onClick={handleStartGeneration}
          disabled={isGenerating || !prompt}
          className={`w-full py-8 rounded-[35px] font-black uppercase italic tracking-[0.3em] flex items-center justify-center gap-4 active:scale-95 transition-all shadow-2xl ${
            isGenerating 
            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
            : 'bg-white text-black hover:bg-cyan-500 hover:shadow-cyan-500/20'
          }`}
        >
          {isGenerating ? <RefreshCw className="animate-spin" size={20}/> : <Sparkles size={20} fill={!isGenerating ? "black" : "none"} />}
          {isGenerating ? "Processing Node" : "Launch Engine"}
        </button>
      </div>

      <p className="text-center text-[7px] font-black text-zinc-800 uppercase tracking-[0.5em] mt-10">
        Race-X Visual Lab | All Renders Encrypted
      </p>
    </div>
  );
}
