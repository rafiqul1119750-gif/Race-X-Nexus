import { useEffect, useState } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#000] flex flex-col items-center justify-center z-[100]">
      {/* Animated Logo */}
      <div className="relative mb-8">
        <div className="text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse">
          RX
        </div>
        <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full"></div>
      </div>

      <h1 className="text-xl font-bold tracking-widest text-white mb-10">RACE-X NEXUS</h1>

      {/* Neon Progress Bar */}
      <div className="w-64 h-1 bg-zinc-900 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-500 shadow-[0_0_10px_#3b82f6]" 
          style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }}
        ></div>
      </div>
      
      <p className="mt-4 text-[10px] text-zinc-500 uppercase tracking-[0.3em]">Initialising AI Ecosystem...</p>
    </div>
  );
}
