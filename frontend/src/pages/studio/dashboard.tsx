import React, { useEffect, useState, useRef } from "react";
import { account } from "@/lib/appwrite";
import {
  ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  useEffect(() => {
    account.get().then(setUser).catch(() => console.log("Guest Mode"));
  }, []);

  const API = "http://localhost:5000";

  // ===== REAL CORE ENGINE (No Dummies) =====
  const executeTask = async (endpoint: string, type: 'video' | 'audio' | 'image') => {
    try {
      if (type === 'video') setLoading(true);
      
      const res = await fetch(`${API}${endpoint}`, { method: "POST" });
      const data = await res.json();

      if (!data.url && !data.video) throw new Error("Invalid API Response");

      if (type === 'image') {
        window.open(data.url, "_blank");
      } else if (type === 'audio') {
        const audio = new Audio(data.url);
        await audio.play();
      } else if (type === 'video') {
        setResultVideo(data.video);
      }
    } catch (err) {
      alert(`Nexus Error: ${endpoint} failed. Check backend connection.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* 🌐 HOLOGRAM GRID (Keep Design Same) */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* HEADER */}
      <header className="flex justify-between items-center p-6 z-10">
        <div>
          <p className="text-cyan-400 text-xs tracking-widest animate-pulse font-black">
            NEURAL CORE ACTIVE
          </p>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Hi {user?.name || "Explorer"}
          </h1>
        </div>
        <div className="w-14 h-14 rounded-full border border-cyan-400 flex items-center justify-center shadow-[0_0_20px_cyan]">
          <User className="text-cyan-400" />
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 px-4">
        <p className="text-zinc-500 text-[10px] mb-8 tracking-[0.4em] font-black uppercase">
          WHERE SHOULD WE START?
        </p>

        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          {/* Linked to Real Endpoints */}
          <HoloButton icon={<ImageIcon />} label="IMAGE" onClick={() => executeTask('/create-image', 'image')}/>
          <HoloButton icon={<Mic />} label="VOICE" onClick={() => executeTask('/create-voice', 'audio')}/>
          <HoloButton icon={<Piano />} label="MELODY" onClick={() => executeTask('/create-melody', 'audio')}/>
          <HoloButton icon={<Guitar />} label="MUSIC" onClick={() => executeTask('/create-music', 'audio')}/>
          <HoloButton icon={<PlaySquare />} label="VIDEO" onClick={() => executeTask('/generate-movie', 'video')}/>
          <HoloButton icon={<Music />} label="SONG" onClick={() => executeTask('/create-song', 'audio')} primary/>
        </div>

        {/* REAL LOADING FEEDBACK */}
        {loading && (
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 animate-[shimmer_1.5s_infinite]" style={{width: '40%'}} />
            </div>
            <p className="text-cyan-400 text-[10px] font-black tracking-widest animate-pulse">
              ⚡ RENDERING CINEMATIC OUTPUT...
            </p>
          </div>
        )}

        {/* REAL VIDEO OUTPUT SECTION */}
        {resultVideo && (
          <div className="mt-6 w-full max-w-md animate-in fade-in zoom-in duration-500">
            <div className="relative p-1 rounded-2xl bg-gradient-to-b from-cyan-400/20 to-transparent shadow-2xl">
              <video src={resultVideo} controls className="w-full rounded-xl" autoPlay />
            </div>
            <button
              onClick={() => {
                const a = document.createElement("a");
                a.href = resultVideo;
                a.download = `race-x-${Date.now()}.mp4`;
                a.click();
              }}
              className="mt-4 w-full bg-white text-black py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-cyan-400 active:scale-95 transition-all"
            >
              📥 Download Movie
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

// ===== 3D HOLOGRAM BUTTON (Kept Design Same) =====
function HoloButton({ icon, label, onClick, primary }: any) {
  const ref = useRef<any>(null);

  const handleMove = (e: any) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = -(y - rect.height / 2) / 8;
    const rotateY = (x - rect.width / 2) / 8;

    ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    ref.current.style.boxShadow = `${x/8}px ${y/8}px 40px rgba(0,255,255,0.35), 0 0 25px rgba(0,255,255,0.2)`;
  };

  const reset = () => {
    ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    ref.current.style.boxShadow = "0 0 20px rgba(0,255,255,0.2)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={`relative p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 active:scale-95 overflow-hidden
      ${primary
        ? "bg-blue-500/20 border-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.5)]"
        : "bg-cyan-500/5 border-cyan-400/20"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 hover:opacity-100 transition duration-300"/>
      <div className="mb-2 flex justify-center text-cyan-400">{icon}</div>
      <p className="text-[10px] font-black text-center tracking-widest">{label}</p>
    </button>
  );
}
