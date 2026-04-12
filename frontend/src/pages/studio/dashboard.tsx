import React, { useEffect, useState, useRef } from "react";
import { account } from "@/lib/appwrite";
import {
  ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  // ✅ CONSTANT: AAPKA REAL RENDER BACKEND
  const API_BASE = "https://race-x-nexus.onrender.com"; 

  useEffect(() => {
    account.get().then(setUser).catch(() => console.log("Nexus Offline Mode"));
  }, []);

  // ===== REAL ENGINE: HAR ICON KO FUNCTIONAL KARNE KE LIYE =====
  const executeProtocol = async (endpoint: string, type: 'video' | 'audio' | 'image') => {
    try {
      if (type === 'video') {
        setLoading(true);
        setResultVideo(null);
      }
      
      const res = await fetch(`${API_BASE}${endpoint}`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      
      if (!res.ok) throw new Error("Backend Wake-up Required");
      
      const data = await res.json();

      if (type === 'image' && data.url) {
        window.open(data.url, "_blank");
      } else if (type === 'audio' && data.url) {
        const audio = new Audio(data.url);
        await audio.play();
      } else if (type === 'video' && data.video) {
        setResultVideo(data.video);
      }
    } catch (err) {
      console.error("Nexus Link Error:", err);
      alert("Nexus Warning: Backend so raha hai (Render Sleep). 30 seconds rukk kar firse button dabayein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">

      {/* 🌐 HOLOGRAM GRID (Design Same) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* HEADER */}
      <header className="flex justify-between items-center p-8 z-10 shrink-0">
        <div>
          <p className="text-cyan-400 text-[10px] font-black tracking-[0.5em] animate-pulse uppercase italic">
            NEURAL CORE ACTIVE
          </p>
          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Hi {user?.name?.split(' ')[0] || "Explorer"}
          </h1>
        </div>

        <div className="w-14 h-14 rounded-full border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.3)] bg-cyan-950/20">
          <User className="text-cyan-400" size={24} />
        </div>
      </header>

      {/* MAIN COMMAND CENTER */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 px-6 overflow-y-auto pb-10">

        <p className="text-zinc-500 text-[10px] font-black mb-10 tracking-[0.4em] uppercase opacity-60">
          SELECT PROTOCOL
        </p>

        <div className="grid grid-cols-2 gap-6 w-full max-w-md mx-auto">
          <HoloButton 
            icon={<ImageIcon size={26}/>} label="IMAGE" 
            onClick={() => executeProtocol('/create-image', 'image')}
          />
          <HoloButton 
            icon={<Mic size={26}/>} label="VOICE" 
            onClick={() => executeProtocol('/create-voice', 'audio')}
          />
          <HoloButton 
            icon={<Piano size={26}/>} label="MELODY" 
            onClick={() => executeProtocol('/create-melody', 'audio')}
          />
          <HoloButton 
            icon={<Guitar size={26}/>} label="MUSIC" 
            onClick={() => executeProtocol('/create-music', 'audio')}
          />
          <HoloButton 
            icon={<PlaySquare size={26}/>} label="VIDEO" 
            onClick={() => executeProtocol('/generate-movie', 'video')}
          />
          <HoloButton 
            icon={<Music size={26}/>} label="SONG" 
            onClick={() => executeProtocol('/create-song', 'audio')} 
            primary
          />
        </div>

        {/* REAL LOADING INDICATOR */}
        {loading && (
          <div className="mt-10 flex flex-col items-center gap-3">
             <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 animate-[shimmer_1.5s_infinite]" style={{width: '40%'}} />
             </div>
             <p className="text-cyan-400 text-[10px] font-black tracking-[0.3em] animate-pulse uppercase">
                ⚡ RENDERING CINEMATIC OUTPUT...
             </p>
          </div>
        )}

        {/* REAL VIDEO OUTPUT */}
        {resultVideo && (
          <div className="mt-8 w-full max-w-md animate-in fade-in zoom-in duration-500">
            <div className="relative p-1 rounded-2xl bg-gradient-to-b from-cyan-400/30 to-transparent shadow-2xl">
               <video src={resultVideo} controls autoPlay className="w-full rounded-xl border border-white/5 shadow-2xl" />
            </div>
            <button
              onClick={() => window.open(resultVideo, '_blank')}
              className="mt-4 w-full bg-white text-black py-4 rounded-xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all shadow-white/10 shadow-lg"
            >
              📥 Download Production
            </button>
          </div>
        )}

      </main>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
      `}</style>

    </div>
  );
}

// ===== 3D HOLOGRAM BUTTON (No Design Change) =====
function HoloButton({ icon, label, onClick, primary }: any) {
  const ref = useRef<any>(null);

  const handleMove = (e: any) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = -(y - rect.height / 2) / 8;
    const rotateY = (x - rect.width / 2) / 8;

    ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    ref.current.style.boxShadow = `${x/8}px ${y/8}px 40px rgba(0,255,255,0.3), 0 0 25px rgba(0,255,255,0.1)`;
  };

  const reset = () => {
    ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    ref.current.style.boxShadow = "0 0 20px rgba(0,255,255,0.15)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={`relative p-7 rounded-[30px] border backdrop-blur-xl transition-all duration-300 active:scale-95 overflow-hidden flex flex-col items-center justify-center
      ${primary
        ? "bg-blue-600/20 border-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
        : "bg-cyan-500/5 border-cyan-400/20"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 hover:opacity-100 transition duration-300 pointer-events-none"/>
      
      <div className={`mb-3 transition-transform duration-300 group-hover:scale-110 ${primary ? 'text-white' : 'text-cyan-400'}`}>
        {icon}
      </div>

      <p className="text-[11px] font-black text-center tracking-[0.2em] uppercase">
        {label}
      </p>
    </button>
  );
}
