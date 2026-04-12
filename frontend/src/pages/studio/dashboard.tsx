import React, { useEffect, useState, useRef } from "react";
import { account } from "@/lib/appwrite";
import { ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  // ✅ AAPKA ACTUAL BACKEND URL
  const API_BASE = "https://race-x-nexus.onrender.com"; 

  useEffect(() => {
    account.get().then(setUser).catch(() => console.log("Nexus Offline"));
    // Initial ping to wake up the server when page loads
    fetch(API_BASE).catch(() => console.log("Waking up Nexus..."));
  }, []);

  const executeProtocol = async (endpoint: string, type: 'video' | 'audio' | 'image') => {
    try {
      setLoading(true);
      setStatus("Waking up Neural Core...");
      
      const res = await fetch(`${API_BASE}${endpoint}`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) throw new Error("Server Busy");

      const data = await res.json();
      setStatus("Data Received!");

      if (type === 'image' && data.url) {
        window.open(data.url, "_blank");
      } else if (type === 'audio' && data.url) {
        const audio = new Audio(data.url);
        audio.play();
      } else if (type === 'video' && data.video) {
        setResultVideo(data.video);
      }
    } catch (err) {
      console.error(err);
      setStatus("Nexus Timeout - Retry in 10s");
      alert("Render Server uth raha hai. Ek baar 30 seconds wait karke phir se try karein.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">
      {/* 🌐 HOLOGRAM GRID (No Change) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

      <header className="flex justify-between items-center p-8 z-10 shrink-0">
        <div>
          <p className="text-cyan-400 text-[10px] font-black tracking-[0.5em] animate-pulse uppercase italic">NEURAL CORE ACTIVE</p>
          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent italic">Hi {user?.name?.split(' ')[0] || "Explorer"}</h1>
        </div>
        <div className="w-14 h-14 rounded-full border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.3)] bg-cyan-950/20"><User className="text-cyan-400" size={24} /></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center z-10 px-6 pb-10">
        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          <HoloButton icon={<ImageIcon />} label="IMAGE" onClick={() => executeProtocol('/create-image', 'image')} />
          <HoloButton icon={<Mic />} label="VOICE" onClick={() => executeProtocol('/create-voice', 'audio')} />
          <HoloButton icon={<Piano />} label="MELODY" onClick={() => executeProtocol('/create-melody', 'audio')} />
          <HoloButton icon={<Guitar />} label="MUSIC" onClick={() => executeProtocol('/create-music', 'audio')} />
          <HoloButton icon={<PlaySquare />} label="VIDEO" onClick={() => executeProtocol('/generate-movie', 'video')} />
          <HoloButton icon={<Music />} label="SONG" onClick={() => executeProtocol('/create-song', 'audio')} primary />
        </div>

        {/* DYNAMIC STATUS BOX */}
        {(loading || status) && (
          <div className="mt-10 flex flex-col items-center gap-2">
            <div className="w-20 h-[2px] bg-zinc-800 overflow-hidden"><div className="h-full bg-cyan-400 animate-[shimmer_1.5s_infinite]" style={{width: '40%'}} /></div>
            <p className="text-cyan-400 text-[9px] font-black tracking-widest uppercase italic">{status || "Executing..."}</p>
          </div>
        )}

        {resultVideo && (
          <div className="mt-8 w-full max-w-md animate-in zoom-in-95 duration-500">
             <video src={resultVideo} controls autoPlay className="w-full rounded-xl border border-white/5 shadow-2xl shadow-cyan-500/10" />
             <button onClick={() => window.open(resultVideo)} className="w-full mt-4 bg-white text-black py-4 rounded-xl font-black text-[10px] tracking-widest uppercase active:scale-95 transition-all">📥 Download Production</button>
          </div>
        )}
      </main>

      <style>{` @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } } `}</style>
    </div>
  );
}

function HoloButton({ icon, label, onClick, primary }: any) {
  const ref = useRef<any>(null);
  const handleMove = (e: any) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.transform = `perspective(1000px) rotateX(${-(y - rect.height / 2) / 10}deg) rotateY(${(x - rect.width / 2) / 10}deg) scale(1.05)`;
    ref.current.style.boxShadow = `${x/10}px ${y/10}px 30px rgba(0,255,255,0.2)`;
  };
  const reset = () => { ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"; ref.current.style.boxShadow = "none"; };

  return (
    <button ref={ref} onMouseMove={handleMove} onMouseLeave={reset} onClick={onClick}
      className={`relative p-8 rounded-[35px] border transition-all duration-300 active:scale-90 flex flex-col items-center justify-center
      ${primary ? "bg-blue-600 border-blue-400 shadow-[0_15px_40px_rgba(37,99,235,0.4)]" : "bg-zinc-900/40 border-white/10 backdrop-blur-xl"}`}>
      <div className={`mb-3 ${primary ? 'text-white' : 'text-cyan-400'}`}>{React.cloneElement(icon as React.ReactElement, { size: 28 })}</div>
      <p className="text-[11px] font-black tracking-widest uppercase">{label}</p>
    </button>
  );
}
