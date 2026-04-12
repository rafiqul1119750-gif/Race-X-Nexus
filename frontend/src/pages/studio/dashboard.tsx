import React, { useEffect, useState } from "react";
import { account, databases } from "@/lib/appwrite"; 
import { useLocation } from "wouter";
import { 
  Image as ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User 
} from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    account.get().then(setUserData).catch(() => console.log("Nexus Core Offline"));
  }, []);

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col p-6 font-sans overflow-hidden">
      {/* 🔮 Top Bar - User Profile */}
      <header className="flex justify-between items-center mb-10 shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase italic">Neural Core Active</span>
          <h1 className="text-xl font-black tracking-tight">Hi {userData?.name || 'Explorer'},</h1>
        </div>
        <div className="w-14 h-14 rounded-full border-2 border-cyan-500/50 p-1 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
           <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
              <User size={24} className="text-cyan-500" />
           </div>
        </div>
      </header>

      {/* 🌌 Central Menu Grid (Jaisa Image Mein Hai) */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 max-w-xl mx-auto w-full">
        <p className="text-zinc-500 text-[11px] font-bold tracking-widest uppercase mb-4">Where should we start?</p>
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <StudioButton 
            icon={<ImageIcon size={20}/>} label="Create Image" sub="STABLE DIFFUSION HD" 
            onClick={() => setLocation("/studio/video")} // Map to your path
          />
          <StudioButton 
            icon={<Mic size={20}/>} label="Create Voice" sub="VOICELAB 3.0" 
            onClick={() => setLocation("/studio/voice")}
          />
          <StudioButton 
            icon={<Piano size={20}/>} label="Create Melody" sub="SYNTH CORE" 
          />
          <StudioButton 
            icon={<Guitar size={20}/>} label="Create Music" sub="DRUM MACHINE" 
          />
          <StudioButton 
            icon={<PlaySquare size={20}/>} label="Create Video" sub="CINEMA AI" 
            onClick={() => setLocation("/studio/video")}
          />
          <StudioButton 
            icon={<Music size={20}/>} label="Create Song" sub="VOCALS + VISUALS" 
            highlight={true}
          />
        </div>
      </div>

      {/* 📈 Waveform Visualizer (Fake) */}
      <div className="h-12 w-full flex items-center justify-center mt-10 opacity-40">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-6 bg-cyan-500/20 blur-xl rounded-full" />
        </div>
      </div>
    </div>
  );
}

// 🎨 Styled Button Component
function StudioButton({ icon, label, sub, onClick, highlight = false }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 group overflow-hidden
        ${highlight 
          ? "bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
          : "bg-zinc-900/40 border-white/5 hover:border-cyan-500/50 hover:bg-zinc-800/60"}`}
    >
      {/* Glossy Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className={`p-3 rounded-xl ${highlight ? "bg-blue-500" : "bg-white/5 group-hover:bg-cyan-500/20"} transition-colors`}>
        {React.cloneElement(icon, { className: highlight ? "text-white" : "text-zinc-400 group-hover:text-cyan-400" })}
      </div>
      
      <div className="text-center">
        <p className="text-[10px] font-black uppercase tracking-widest">{label}</p>
        <p className={`text-[7px] font-bold mt-1 tracking-tighter ${highlight ? "text-blue-300" : "text-zinc-600"}`}>{sub}</p>
      </div>
    </button>
  );
}
