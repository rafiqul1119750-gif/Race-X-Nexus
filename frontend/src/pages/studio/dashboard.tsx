import React, { useEffect, useState } from "react";
import { account } from "@/lib/appwrite"; 
import { useLocation } from "wouter";
import { 
  ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User, ChevronRight 
} from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    account.get().then(setUserData).catch(() => console.log("Offline"));
  }, []);

  return (
    <div className="h-screen w-screen bg-[#000000] text-white flex flex-col font-sans overflow-hidden relative">
      
      {/* 🌌 Background Glows (Image ki tarah subtle light) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />

      {/* Header */}
      <header className="relative p-8 flex justify-between items-center z-10">
        <div>
          <p className="text-[10px] font-black tracking-[0.5em] text-blue-400 uppercase opacity-80">Neural System v1.0</p>
          <h1 className="text-3xl font-bold tracking-tight mt-1">
            Hi <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              {userData?.name?.split(' ')[0] || 'User'}
            </span>
          </h1>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl">
          <User size={24} className="text-zinc-400" />
        </div>
      </header>

      {/* 🛠️ MAIN GRID (99% Image Match) */}
      <main className="relative flex-1 px-6 flex flex-col justify-center z-10 mb-10">
        <p className="text-zinc-500 text-[11px] font-black tracking-[0.3em] uppercase mb-10 text-center">Execute Command</p>
        
        <div className="grid grid-cols-2 gap-6 w-full max-w-lg mx-auto">
          <NexusButton 
            icon={<ImageIcon size={26}/>} label="Create Image" sub="Diffusion" 
            onClick={() => setLocation("/studio/editor")}
          />
          <NexusButton 
            icon={<Mic size={26}/>} label="Create Voice" sub="VoiceLab" 
          />
          <NexusButton 
            icon={<Piano size={26}/>} label="Create Melody" sub="Synth" 
          />
          <NexusButton 
            icon={<Guitar size={26}/>} label="Create Music" sub="Drums" 
          />
          <NexusButton 
            icon={<PlaySquare size={26}/>} label="Create Video" sub="Cinema" 
          />
          
          {/* 🌟 The Primary Blue Button */}
          <NexusButton 
            icon={<Music size={26}/>} label="Create Song" sub="Vocalist" 
            primary={true}
          />
        </div>
      </main>
    </div>
  );
}

// 🎨 HIGH-END BUTTON COMPONENT
function NexusButton({ icon, label, sub, onClick, primary = false }: any) {
  return (
    <button 
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center p-8 rounded-[35px] transition-all duration-300 active:scale-90
        ${primary 
          ? "bg-[#2563eb] shadow-[0_20px_50px_rgba(37,99,235,0.3)] border-t border-white/30" 
          : "bg-[#121214] border border-white/5 shadow-2xl hover:bg-[#1a1a1c] hover:border-white/10"}`}
    >
      {/* Gloss Effect (Upper Highlight) */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className={`mb-4 p-4 rounded-[22px] ${primary ? "bg-white/10" : "bg-white/5 group-hover:scale-110 transition-transform"}`}>
        {React.cloneElement(icon, { 
          className: primary ? "text-white" : "text-zinc-400 group-hover:text-blue-400",
          strokeWidth: 1.5
        })}
      </div>
      
      <div className="text-center">
        <span className={`block text-[12px] font-black uppercase tracking-widest ${primary ? "text-white" : "text-zinc-300"}`}>
          {label}
        </span>
        <span className={`block text-[8px] font-bold mt-1 tracking-widest uppercase ${primary ? "text-blue-100/50" : "text-zinc-600"}`}>
          {sub}
        </span>
      </div>

      {/* Subtle Dot (Jaisa image mein hai) */}
      <div className={`absolute bottom-4 w-1 h-1 rounded-full ${primary ? "bg-white/40" : "bg-transparent group-hover:bg-blue-500/50"}`} />
    </button>
  );
}
