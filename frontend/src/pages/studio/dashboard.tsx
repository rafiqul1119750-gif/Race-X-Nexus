import React, { useState, useRef } from "react";
import { ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User } from "lucide-react";

export default function StudioDashboard() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  // 🔗 Connection to Render Backend
  const API_BASE = "https://race-x-nexus.onrender.com/api"; 

  const executeNexus = async (endpoint: string, type: 'video' | 'audio' | 'image') => {
    try {
      setLoading(true);
      setStatus("Nexus: Connecting...");
      
      const res = await fetch(`${API_BASE}${endpoint}`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) throw new Error(`Nexus Error: ${res.status}`);

      const data = await res.json();
      setStatus("Protocol Success!");

      if (type === 'image' && data.url) window.open(data.url, "_blank");
      else if (type === 'audio' && data.url) new Audio(data.url).play();
      else if (type === 'video' && data.video) setResultVideo(data.video);
      
    } catch (err: any) {
      console.error(err);
      setStatus("Nexus: Link Failed");
      alert("Backend is waking up. Please wait 30 seconds and try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col relative overflow-hidden font-sans italic">
      {/* Hologram Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`, backgroundSize: "45px 45px" }} />

      <header className="flex justify-between items-center p-8 z-10 shrink-0">
        <div>
          <p className="text-cyan-400 text-[10px] font-black tracking-[0.5em] animate-pulse">CORE ACTIVE</p>
          <h1 className="text-3xl font-black bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent">Race-X Studio</h1>
        </div>
        <div className="w-12 h-12 rounded-full border border-cyan-400/30 flex items-center justify-center bg-zinc-900"><User className="text-cyan-400" /></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center z-10 px-6 pb-12">
        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          <HoloBtn icon={<ImageIcon />} label="IMAGE" onClick={() => executeNexus('/create-image', 'image')} />
          <HoloBtn icon={<Mic />} label="VOICE" onClick={() => executeNexus('/create-voice', 'audio')} />
          <HoloBtn icon={<Piano />} label="MELODY" onClick={() => executeNexus('/create-melody', 'audio')} />
          <HoloBtn icon={<Guitar />} label="MUSIC" onClick={() => executeNexus('/create-music', 'audio')} />
          <HoloBtn icon={<PlaySquare />} label="VIDEO" onClick={() => executeNexus('/generate-movie', 'video')} />
          <HoloBtn icon={<Music />} label="SONG" onClick={() => executeNexus('/create-song', 'audio')} primary />
        </div>

        {status && <p className="mt-8 text-cyan-400 text-[10px] font-black tracking-widest uppercase animate-pulse">{status}</p>}

        {resultVideo && (
          <div className="mt-6 w-full max-w-md animate-in zoom-in-95">
             <video src={resultVideo} controls autoPlay className="w-full rounded-[30px] border border-white/5 shadow-2xl" />
          </div>
        )}
      </main>
    </div>
  );
}

function HoloBtn({ icon, label, onClick, primary }: any) {
  const ref = useRef<any>(null);
  const handleMove = (e: any) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.transform = `perspective(1000px) rotateX(${-(y - rect.height / 2) / 10}deg) rotateY(${(x - rect.width / 2) / 10}deg) scale(1.05)`;
  };
  const reset = () => { ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"; };

  return (
    <button ref={ref} onMouseMove={handleMove} onMouseLeave={reset} onClick={onClick}
      className={`relative p-8 rounded-[35px] border transition-all duration-300 active:scale-90 flex flex-col items-center justify-center
      ${primary ? "bg-blue-600 border-blue-400" : "bg-zinc-900/40 border-white/10 backdrop-blur-xl"}`}>
      <div className={`mb-3 ${primary ? 'text-white' : 'text-cyan-400'}`}>{React.cloneElement(icon, { size: 28 })}</div>
      <p className="text-[11px] font-black tracking-widest uppercase">{label}</p>
    </button>
  );
}
