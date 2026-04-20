// frontend/src/pages/splash.tsx
export default function Splash() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-64 h-64 bg-[#00F2FF] opacity-10 blur-[120px] rounded-full"></div>
      
      {/* Logo Section */}
      <div className="relative z-10 animate-pulse">
        <h1 className="text-6xl font-black italic tracking-tighter text-white">
          RACE<span className="text-[#00F2FF]">-</span>X
        </h1>
        <p className="text-[10px] text-center tracking-[0.5em] text-[#00F2FF] font-bold uppercase opacity-80">
          Nexus Intelligence
        </p>
      </div>

      {/* Loading Bar */}
      <div className="absolute bottom-20 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#00F2FF] w-1/2 animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
}
