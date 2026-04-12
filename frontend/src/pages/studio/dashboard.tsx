import React, { useEffect, useState } from "react";
import { account } from "@/lib/appwrite"; 
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
    <div className="fixed inset-0 bg-black text-white flex flex-col font-sans overflow-hidden">
      
      {/* 🌌 Background Elements for Depth */}
      <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full" />

      {/* 🔮 Header Section */}
      <header className="relative z-20 flex justify-between items-center p-8 pt-10 shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase italic">Neural Core Active</span>
          <h1 className="text-3xl font-black tracking-tighter mt-1 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Hi {userData?.name?.split(' ')[0] || 'Explorer'},
          </h1>
        </div>
        <div className="w-16 h-16 rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md flex items-center justify-center shadow-2xl overflow-hidden">
           <User size={28} className="text-zinc-500" />
        </div>
      </header>

      {/* 🚀 Central Command Grid (Matches Image Layout) */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <p className="text-zinc-500 text-[11px] font-black tracking-[0.4em] uppercase mb-10 opacity-60">System Ready: Select Protocol</p>
        
        <div className="grid grid-cols-2 gap-6 w-full max-w-lg mx-auto">
          <StudioButton 
            icon={<ImageIcon size={28}/>} label="Create Image" sub="STABLE DIFFUSION" 
            onClick={() => setLocation("/studio/editor")}
          />
          <StudioButton 
            icon={<Mic size={28}/>} label="Create Voice" sub="VOICE CLONE" 
            onClick={() => setLocation("/studio/voice")}
          />
          <StudioButton 
            icon={<Piano size={28}/>} label="Create Melody" sub="NEURAL SYNTH" 
          />
          <StudioButton 
            icon={<Guitar size={28}/>} label="Create Music" sub="DRUM KIT" 
          />
          <StudioButton 
            icon={<PlaySquare size={28}/>} label="Create Video" sub="CINEMA AI" 
          />
          
          {/* 🌟 The Highlighted Blue Button from Image */}
          <StudioButton 
            icon={<Music size={28}/>} label="Create Song" sub="FULL PRODUCTION" 
            highlight={true}
          />
        </div>
      </main>

      {/* 📉 Visualizer Footer */}
      <footer className="relative z-20 h-20 flex items-center justify-center px-8 opacity-20">
         <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      </footer>
    </div>
  );
}

// 🎨 HIGH-END BUTTON COMPONENT
function StudioButton({ icon, label, sub, onClick, highlight = false }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center p-8 rounded-[40px] border transition-all duration-500 active:scale-90 group
        ${highlight 
          ? "bg-[#2563eb] border-white/30 shadow-[0_25px_60px_rgba(37,99,235,0.4)]" 
          : "bg-zinc-900/40 border-white/5 backdrop-blur-xl hover:border-cyan-500/30 shadow-2xl"}`}
    >
      {/* Bezel Light Effect */}
      <div className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent ${highlight ? 'via-white/40' : 'via-white/10'} to-transparent`} />
      
      {/* Icon Area */}
      <div className={`mb-4 p-4 rounded-3xl transition-transform duration-500 group-hover:scale-110
        ${highlight ? "bg-white/15 shadow-inner" : "bg-white/5 shadow-inner"}`}>
        {React.cloneElement(icon, { 
          className: highlight ? "text-white" : "text-zinc-400 group-hover:text-cyan-400",
          strokeWidth: 1.5
        })}
      </div>
      
      <div className="text-center">
        <p className={`text-[12px] font-black uppercase tracking-[0.1em] ${highlight ? "text-white" : "text-zinc-200"}`}>
          {label}
        </p>
        <p className={`text-[8px] font-bold mt-1 tracking-widest uppercase ${highlight ? "text-blue-100/60" : "text-zinc-600 group-hover:text-cyan-800"}`}>
          {sub}
        </p>
      </div>

      {/* Decorative Dot */}
      <div className={`absolute bottom-5 w-1 h-1 rounded-full ${highlight ? 'bg-white/50' : 'bg-transparent group-hover:bg-cyan-500'}`} />
    </button>
  );
}
