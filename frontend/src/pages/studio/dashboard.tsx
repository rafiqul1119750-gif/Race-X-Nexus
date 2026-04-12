import React, { useEffect, useState } from "react";
import { account } from "@/lib/appwrite"; 
import { useLocation } from "wouter";
import { 
  ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User, Sparkles 
} from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    account.get().then(setUserData).catch(() => console.log("Nexus Offline"));
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col font-sans overflow-hidden relative">
      
      {/* 🌌 Background Texture (Carbon Fiber Effect) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#111 1px, transparent 0)`, backgroundSize: '20px 20px' }} />
      
      <header className="relative p-6 flex justify-between items-start z-10 shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase italic animate-pulse">
            Neural Core Active
          </span>
          <h1 className="text-3xl font-black tracking-tighter mt-1 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Hi {userData?.name?.split(' ')[0] || 'Explorer'},
          </h1>
        </div>
        
        {/* Profile Ring (Jaisa image mein hai) */}
        <div className="relative group">
          <div className="w-14 h-14 rounded-full border-[3px] border-cyan-500/40 p-1 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all group-hover:shadow-cyan-500/60">
             <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden border border-white/10">
                <User size={26} className="text-cyan-400" />
             </div>
          </div>
        </div>
      </header>

      <main className="relative flex-1 flex flex-col items-center justify-center p-6 z-10">
        <p className="text-zinc-500 text-[11px] font-black tracking-[0.3em] uppercase mb-8 opacity-60">
          Where should we start?
        </p>
        
        {/* 🛠️ GRID START */}
        <div className="grid grid-cols-2 gap-5 w-full max-w-md">
          <StudioButton 
            icon={<ImageIcon size={22}/>} label="Create Image" sub="STABLE DIFFUSION HD" 
            glowColor="group-hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]"
            onClick={() => setLocation("/studio/video")} 
          />
          <StudioButton 
            icon={<Mic size={22}/>} label="Create Voice" sub="VOICELAB 3.0" 
            glowColor="group-hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]"
          />
          <StudioButton 
            icon={<Piano size={22}/>} label="Create Melody" sub="SYNTH CORE" 
          />
          <StudioButton 
            icon={<Guitar size={22}/>} label="Create Music" sub="DRUM MACHINE" 
          />
          <StudioButton 
            icon={<PlaySquare size={22}/>} label="Create Video" sub="CINEMA AI" 
          />
          
          {/* 🌟 Special Highlighted Button (The "Blue One" from image) */}
          <StudioButton 
            icon={<Music size={22}/>} label="Create Song" sub="VOCALS + VISUALS" 
            isPrimary={true}
          />
        </div>

        {/* 📉 Neural Waveform Footer */}
        <div className="mt-12 w-full max-w-xs h-10 flex items-center justify-center gap-1 opacity-40">
           {[...Array(20)].map((_, i) => (
             <div key={i} className="w-1 bg-cyan-500 rounded-full animate-bounce" 
                  style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }} />
           ))}
        </div>
      </main>
    </div>
  );
}

function StudioButton({ icon, label, sub, onClick, isPrimary = false, glowColor }: any) {
  return (
    <button 
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center p-6 rounded-[28px] border-2 transition-all duration-500 active:scale-95 overflow-hidden
        ${isPrimary 
          ? "bg-blue-600 border-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.4)]" 
          : "bg-[#111]/80 border-white/5 hover:border-cyan-500/50 " + glowColor}`}
    >
      {/* Glossy Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      {/* Icon Wrapper */}
      <div className={`mb-3 p-3 rounded-2xl transition-all duration-300 
        ${isPrimary ? "bg-white/20" : "bg-white/5 group-hover:bg-cyan-500/20 group-hover:scale-110"}`}>
        {React.cloneElement(icon, { 
          className: isPrimary ? "text-white" : "text-zinc-400 group-hover:text-cyan-400",
          strokeWidth: 2.5 
        })}
      </div>
      
      <span className={`text-[11px] font-black uppercase tracking-widest ${isPrimary ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
        {label}
      </span>
      <span className={`text-[7px] font-bold mt-1 tracking-tighter ${isPrimary ? "text-blue-100/60" : "text-zinc-600 group-hover:text-cyan-700"}`}>
        {sub}
      </span>
    </button>
  );
}
