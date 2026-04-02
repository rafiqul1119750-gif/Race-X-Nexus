import { useEffect, useState } from "react";

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [fade, setFade] = useState("opacity-0 scale-90");

  useEffect(() => {
    // Start animation
    const timer1 = setTimeout(() => setFade("opacity-100 scale-100"), 100);
    // Finish splash after 2.5s
    const timer2 = setTimeout(() => {
      setFade("opacity-0 scale-110 blur-xl");
      setTimeout(onFinish, 600);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center transition-all duration-700">
      {/* Background Neon Aura */}
      <div className="absolute w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
      
      <div className={`transition-all duration-1000 ease-out ${fade} text-center px-6`}>
        {/* RX NEON LOGO */}
        <div className="w-32 h-32 md:w-40 md:h-40 relative mx-auto mb-8">
          <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full"></div>
          <img 
            src="/images/rx-logo.png" 
            alt="RX" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(0,212,255,0.6)]"
          />
        </div>

        {/* Branding Text */}
        <h1 className="text-white font-black italic tracking-tighter text-4xl md:text-5xl uppercase">
          RACE-<span className="text-blue-400">X</span>
        </h1>
        <p className="text-[9px] text-zinc-500 uppercase tracking-[0.5em] mt-3 font-bold">
          The Future of Creation
        </p>
        
        {/* Modern Loader */}
        <div className="mt-16 w-40 h-[1.5px] bg-white/5 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full animate-nexus-loader"></div>
        </div>
      </div>

      {/* Engine Info */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <span className="text-[7px] text-zinc-700 font-black tracking-[0.3em] uppercase">Nexus Engine v2.0.4</span>
        <div className="h-1 w-1 bg-blue-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );
}
