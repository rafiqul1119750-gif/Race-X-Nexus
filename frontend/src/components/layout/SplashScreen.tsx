import { useEffect, useState } from "react";

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [fade, setFade] = useState("opacity-0 scale-90");

  useEffect(() => {
    setTimeout(() => setFade("opacity-100 scale-100"), 100);
    const timer = setTimeout(() => {
      setFade("opacity-0 scale-110 blur-xl");
      setTimeout(onFinish, 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center transition-all duration-700">
      <div className="absolute w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full"></div>
      <div className={`transition-all duration-1000 ease-out ${fade} text-center`}>
        {/* Main Neon RX Logo */}
        <div className="w-40 h-40 relative mx-auto mb-6">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
          <img 
            src="/images/rx-logo.png" 
            alt="RX Logo" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(0,212,255,0.8)]"
          />
        </div>
        <h1 className="text-white font-black italic tracking-tighter text-4xl uppercase">
          RACE-<span className="text-blue-400">X</span>
        </h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] mt-2">The Future of Creation</p>
        
        {/* Loader Line */}
        <div className="mt-12 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden mx-auto border border-white/5">
          <div className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full animate-nexus-loader"></div>
        </div>
      </div>
    </div>
  );
}
