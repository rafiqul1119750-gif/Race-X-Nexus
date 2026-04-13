import React, { useEffect, useState, useRef } from "react";
import { account } from "@/lib/appwrite";
import { ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  // ✅ YOUR OFFICIAL RENDER BACKEND URL
  const API_BASE = "https://race-x-nexus.onrender.com"; 

  useEffect(() => {
    account.get().then(setUser).catch(() => console.log("Nexus Syncing..."));
    
    // ⚡ PRO-ACTIVE WAKEUP: Server ko turant jagane ke liye
    const wakeUp = async () => {
      try {
        await fetch(API_BASE, { mode: 'no-cors' });
        console.log("Nexus Core: Wake-up signal sent.");
      } catch (e) {
        console.log("Nexus Core: Warming up...");
      }
    };
    wakeUp();
  }, []);

  const executeNexusProtocol = async (endpoint: string, type: 'video' | 'audio' | 'image') => {
    try {
      setLoading(true);
      setStatus("Initializing Neural Link...");
      
      const response = await fetch(`${API_BASE}${endpoint}`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Connection Timeout");

      const data = await response.json();
      setStatus("Protocol Success!");

      if (type === 'image' && data.url) {
        window.open(data.url, "_blank");
      } else if (type === 'audio' && data.url) {
        const audio = new Audio(data.url);
        audio.play().catch(() => alert("Tap anywhere on screen to enable audio!"));
      } else if (type === 'video' && data.video) {
        setResultVideo(data.video);
      }
    } catch (err) {
      console.error(err);
      setStatus("Nexus Offline - Retrying...");
      alert("Render Server 'Cold Start' par hai. 30 seconds wait karein aur firse button dabayein.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">
      
      {/* 🌐 DESIGN: HOLOGRAM GRID (EXACT MATCH) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`, 
          backgroundSize: "40px 40px" 
        }} 
      />

      {/* HEADER */}
      <header className="flex justify-between items-center p-8 z-10 shrink-0">
        <div>
          <p className="text-cyan-400 text-[10px] font-black tracking-[0.5em] animate-pulse uppercase italic">
            NEURAL CORE ACTIVE
          </p>
          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent italic mt-1">
            Hi {user?.name?.split(' ')[0] || "User"}
          </h1>
        </div>
        <div className="w-14 h-14 rounded-full border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.2)] bg-zinc-900/50">
          <User className="text-cyan-400" size={24} />
        </div>
      </header>

      {/* MAIN INTERFACE */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 px-6 pb-12 overflow-y-auto">
        
        <p className="text-zinc-600 text-[9px] font-black mb-10 tracking-[0.4em] uppercase opacity-60 italic">
          COMMAND INTERFACE
        </p>

        <div className="grid grid-cols-2 gap-6 w-full max-w-md mx-auto">
          <HoloButton icon={<ImageIcon />} label="IMAGE" onClick={() => executeNexusProtocol('/create-image', 'image')} />
          <HoloButton icon={<Mic />} label="VOICE" onClick={() => executeNexusProtocol('/create-voice', 'audio')} />
          <HoloButton icon={<Piano />} label="MELODY" onClick={() => executeNexusProtocol('/create-melody', 'audio')} />
          <HoloButton icon={<Guitar />} label="MUSIC" onClick={() => executeNexusProtocol('/create-music', 'audio')} />
          <HoloButton icon={<PlaySquare />} label="VIDEO" onClick={() => executeNexusProtocol('/generate-movie', 'video')} />
          <HoloButton icon={<Music />} label="SONG" onClick={() => executeNexusProtocol('/create-song', 'audio')} primary />
        </div>

        {/* FEEDBACK & STATUS */}
        {(loading || status) && (
          <div className="mt-10 flex flex-col items-center gap-2">
            <div className="w-16 h-[1.5px] bg-zinc-800 overflow-hidden">
              <div className="h-full bg-cyan-400 animate-[shimmer_1.5s_infinite]" style={{width: '40%'}} />
            </div>
            <p className="text-cyan-400 text-[9px] font-black tracking-widest uppercase italic animate-pulse">
              {status || "Syncing Neural Data..."}
            </p>
          </div>
        )}

        {/* VIDEO OUTPUT */}
        {resultVideo && (
          <div className="mt-8 w-full max-w-md animate-in zoom-in-95 duration-500">
             <div className="relative p-1 rounded-[30px] bg-gradient-to-b from-cyan-400/20 to-transparent shadow-2xl">
                <video src={resultVideo} controls autoPlay className="w-full rounded-[26px] border border-white/5" />
             </div>
             <button onClick={() => window.open(resultVideo)} className="w-full mt-4 bg-white text-black py-4 rounded-xl font-black text-[10px] tracking-widest uppercase active:scale-95 shadow-white/10 shadow-lg">
                📥 Download Production
             </button>
          </div>
        )}
      </main>

      <style>{` @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } } `}</style>
    </div>
  );
}

// ===== 3D TILT BUTTON (Wahi Screenshot Wala Look) =====
function HoloButton({ icon, label, onClick, primary }: any) {
  const ref = useRef<any>(null);

  const handleMove = (e: any) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Smooth 3D Rotation logic
    const rotX = -(y - rect.height / 2) / 10;
    const rotY = (x - rect.width / 2) / 10;

    ref.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
    ref.current.style.boxShadow = `${x/10}px ${y/10}px 30px rgba(0,255,255,0.2)`;
  };

  const reset = () => {
    ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    ref.current.style.boxShadow = "none";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={`relative p-8 rounded-[35px] border transition-all duration-300 active:scale-90 flex flex-col items-center justify-center overflow-hidden
      ${primary 
        ? "bg-blue-600 border-blue-400 shadow-[0_15px_40px_rgba(37,99,235,0.4)]" 
        : "bg-zinc-900/40 border-white/10 backdrop-blur-xl shadow-2xl"
      }`}
    >
      <div className={`mb-3 ${primary ? 'text-white' : 'text-cyan-400'}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 28 })}
      </div>
      <p className="text-[11px] font-black tracking-widest uppercase italic">
        {label}
      </p>
    </button>
  );
}
