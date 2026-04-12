import React, { useEffect, useState } from "react";
import { account } from "@/lib/appwrite"; 
import { useLocation } from "wouter";
import { 
  ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User
} from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    account.get().then(setUserData).catch(() => console.log("Offline"));
  }, []);

  return (
    <div className="h-screen w-screen bg-[#05070a] text-white flex flex-col relative overflow-hidden">
      
      {/* 🔥 DARK STUDIO BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(0,255,255,0.05),transparent_40%)]" />
      
      {/* HEADER */}
      <header className="relative p-6 flex justify-between items-start z-10">
        <div>
          <span className="text-[10px] tracking-[0.4em] text-cyan-400 uppercase animate-pulse">
            Neural Core Active
          </span>
          <h1 className="text-3xl font-black mt-1 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Hi {userData?.name?.split(" ")[0] || "User"},
          </h1>
        </div>

        {/* PROFILE */}
        <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_25px_rgba(0,255,255,0.6)]">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <User className="text-cyan-400" />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center z-10 px-6">
        
        {/* 🔥 CENTER GLASS PANEL */}
        <div className="w-full max-w-3xl backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-3xl p-8 shadow-[0_0_60px_rgba(0,255,255,0.15)]">
          
          <p className="text-center text-zinc-400 text-xs tracking-[0.3em] uppercase mb-8">
            Where should we start?
          </p>

          {/* BUTTON GRID */}
          <div className="grid grid-cols-3 gap-6">

            <StudioBtn icon={<ImageIcon/>} title="Create Image" />
            <StudioBtn icon={<Mic/>} title="Create Voice" />
            <StudioBtn icon={<Piano/>} title="Create Melody" />
            <StudioBtn icon={<Guitar/>} title="Create Music" />
            <StudioBtn icon={<PlaySquare/>} title="Create Video" />
            
            {/* PRIMARY */}
            <StudioBtn icon={<Music/>} title="Create Song" primary />

          </div>

          {/* 🔊 WAVEFORM LINE */}
          <div className="mt-10">
            <svg viewBox="0 0 500 60" className="w-full opacity-60">
              <path 
                d="M0 30 Q50 5 100 30 T200 30 T300 30 T400 30 T500 30" 
                stroke="#22d3ee" 
                strokeWidth="2" 
                fill="none"
              />
            </svg>
          </div>

        </div>
      </main>
    </div>
  );
}

function StudioBtn({ icon, title, primary }: any) {
  return (
    <button
      className={`flex items-center justify-center gap-3 px-5 py-4 rounded-full transition-all duration-300 border
        ${primary 
          ? "bg-blue-600 border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.6)]" 
          : "bg-white/5 border-white/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
        }`}
    >
      {React.cloneElement(icon, {
        className: primary ? "text-white" : "text-cyan-400",
        size: 18
      })}
      <span className="text-xs font-bold tracking-wider">{title}</span>
    </button>
  );
}
