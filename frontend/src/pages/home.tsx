import React, { useState, useEffect } from "react";
import { Lock, LogIn, Shield } from "lucide-react";

// --- 1. PREMIUM SPLASH ---
function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 2800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[9999] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative mb-12 group">
        <div className="w-32 h-32 border-[3px] border-blue-500/20 border-t-blue-500 rounded-[2.5rem] animate-spin shadow-[0_0_40px_rgba(37,99,235,0.2)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-400 to-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">X</span>
        </div>
      </div>
      <div className="text-center space-y-2 z-10">
        <h1 className="text-6xl font-black italic tracking-tighter text-white animate-pulse">RACE-X</h1>
        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em]">Omniverse v4.0</p>
      </div>
      <div className="absolute bottom-24 w-72">
        <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
          <div className="h-full bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-300 animate-[progress_2.5s_ease-in-out_forwards]" />
        </div>
      </div>
      <style>{`@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );
}

// --- 2. MAIN HOME COMPONENT ---
function Home() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 gap-6">
      <h2 className="text-4xl font-black italic uppercase">Nexus Entry</h2>
      <p className="text-zinc-500 text-xs tracking-widest uppercase">Splash Screen Tested Successfully 🚀</p>
    </div>
  );
}

// YE LINE SABSE IMPORTANT HAI RENDER KE LIYE
export default Home;
