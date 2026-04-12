import React, { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import {
  ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User, Sparkles
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  useEffect(() => {
    account.get().then(setUser).catch(() => console.log("Nexus Offline"));
  }, []);

  const API = "http://localhost:5000";

  // 🚀 Core API Caller
  const callAPI = async (endpoint: string) => {
    try {
      const res = await fetch(`${API}${endpoint}`, { method: "POST" });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(`API Error (${endpoint}):`, e);
      return null;
    }
  };

  // ===== ALL BUTTON FUNCTIONS =====
  
  const handleImage = async () => {
    const data = await callAPI("/create-image");
    if (data?.url) window.open(data.url, "_blank");
  };

  const handleVoice = async () => {
    const data = await callAPI("/create-voice");
    if (data?.url) new Audio(data.url).play();
  };

  const handleMelody = async () => {
    const data = await callAPI("/create-melody");
    if (data?.url) new Audio(data.url).play();
  };

  const handleMusic = async () => {
    const data = await callAPI("/create-music");
    if (data?.url) new Audio(data.url).play();
  };

  const handleSong = async () => {
    const data = await callAPI("/create-song");
    if (data?.url) new Audio(data.url).play();
  };

  const handleVideo = async () => {
    setLoading(true);
    setResultVideo(null);
    const data = await callAPI("/generate-movie");
    if (data?.video) setResultVideo(data.video);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-[#000000] text-white flex flex-col font-sans overflow-hidden">
      
      {/* 🌌 Background Depth */}
      <div className="absolute top-[-10%] left-[-10%] w-full h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-full h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-20 flex justify-between items-center p-8 pt-12 shrink-0">
        <div>
          <p className="text-[#00f2ff] text-[9px] font-black tracking-[0.5em] uppercase italic opacity-80 animate-pulse">
            NEURAL CORE ACTIVE
          </p>
          <h1 className="text-3xl font-black tracking-tighter mt-1 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Hi {user?.name?.split(' ')[0] || "Explorer"}
          </h1>
        </div>
        <div className="w-14 h-14 rounded-[22px] border border-white/10 bg-zinc-900/50 backdrop-blur-xl flex items-center justify-center shadow-2xl overflow-hidden group">
          <User className="text-zinc-500 group-hover:text-[#00f2ff] transition-colors" size={26} />
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 pb-12 overflow-y-auto">
        <p className="text-zinc-500 text-[10px] font-black tracking-[0.4em] uppercase mb-10 opacity-60">
          SELECT PROTOCOL
        </p>

        <div className="grid grid-cols-2 gap-6 w-full max-w-lg mx-auto">
          <HoloButton icon={<ImageIcon size={28}/>} label="Create Image" sub="Diffusion" onClick={handleImage} />
          <HoloButton icon={<Mic size={28}/>} label="Create Voice" sub="VoiceLab" onClick={handleVoice} />
          <HoloButton icon={<Piano size={28}/>} label="Create Melody" sub="Synth" onClick={handleMelody} />
          <HoloButton icon={<Guitar size={28}/>} label="Create Music" sub="Drum Kit" onClick={handleMusic} />
          <HoloButton icon={<PlaySquare size={28}/>} label="Create Video" sub="Cinema AI" onClick={handleVideo} />
          <HoloButton icon={<Music size={28}/>} label="Create Song" sub="Vocalist" onClick={handleSong} primary />
        </div>

        {/* LOADING & VIDEO RESULT */}
        <div className="mt-8 w-full max-w-md flex flex-col items-center">
          {loading && (
            <div className="flex flex-col items-center gap-3">
               <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00f2ff] animate-[shimmer_1.5s_infinite]" style={{width: '40%'}} />
               </div>
               <p className="text-[9px] font-bold text-[#00f2ff] tracking-widest uppercase italic">🎬 Rendering Movie...</p>
            </div>
          )}

          {resultVideo && (
            <div className="w-full animate-in zoom-in-95 duration-500">
               <div className="relative p-1 rounded-[30px] bg-gradient-to-b from-white/20 to-transparent border border-white/10 overflow-hidden shadow-2xl">
                  <video src={resultVideo} controls className="w-full rounded-[26px]" />
               </div>
               <button 
                  onClick={() => { const a = document.createElement('a'); a.href = resultVideo; a.download="racex.mp4"; a.click(); }}
                  className="w-full mt-4 bg-white text-black py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all"
               >
                  📥 Download Production
               </button>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
      `}</style>
    </div>
  );
}

// ===== FINAL BUTTON COMPONENT =====

function HoloButton({ icon, label, sub, onClick, primary }: any) {
  return (
    <button
      onClick={onClick}
      className={`relative group flex flex-col items-center justify-center p-8 rounded-[40px] border transition-all duration-300 active:scale-90 overflow-hidden
      ${primary
        ? "bg-[#2563eb] border-white/30 shadow-[0_25px_60px_rgba(37,99,235,0.4)]"
        : "bg-zinc-900/40 border-white/5 hover:border-[#00f2ff]/40 shadow-2xl backdrop-blur-xl"
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent ${primary ? 'via-white/40' : 'via-white/10'} to-transparent`} />

      <div className={`mb-4 p-4 rounded-3xl transition-transform duration-500 group-hover:scale-110
        ${primary ? "bg-white/10 shadow-inner" : "bg-white/5 shadow-inner"}`}>
        {React.cloneElement(icon, { 
          className: primary ? "text-white" : "text-zinc-400 group-hover:text-[#00f2ff]",
          strokeWidth: 1.5 
        })}
      </div>

      <div className="text-center">
        <p className={`text-[12px] font-black uppercase tracking-widest ${primary ? "text-white" : "text-zinc-200"}`}>
          {label}
        </p>
        <p className={`text-[8px] font-bold mt-1 tracking-[0.2em] uppercase ${primary ? "text-blue-100/60" : "text-zinc-600 group-hover:text-[#00f2ff]/60"}`}>
          {sub}
        </p>
      </div>

      <div className={`absolute bottom-5 w-1 h-1 rounded-full transition-all ${primary ? 'bg-white/50' : 'bg-transparent group-hover:bg-[#00f2ff]'}`} />
    </button>
  );
}
