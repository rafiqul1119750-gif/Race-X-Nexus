import { ArrowLeft, Music, Sparkles, Timer, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";

export default function RXMusic() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col p-6 font-sans overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between mb-20">
        <button 
          onClick={() => setLocation("/hub")} 
          className="p-3 bg-zinc-900/50 border border-white/5 rounded-2xl active:scale-75 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
          <ShieldCheck size={10} className="text-green-500" />
          <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Nexus Verified</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center relative">
        {/* Animated Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full animate-pulse" />
        
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-zinc-800 to-black rounded-[35px] flex items-center justify-center mb-8 border border-white/10 shadow-2xl rotate-3">
             <Music size={40} className="text-green-500 animate-bounce" />
          </div>
          <Sparkles className="absolute -top-4 -right-4 text-yellow-500 animate-spin-slow" size={24} />
        </div>

        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4 leading-none">
          RX <span className="text-green-500">Music</span>
        </h1>
        
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-12 max-w-[200px] leading-relaxed">
          Evolving the way you experience sound.
        </p>

        {/* Coming Soon Badge */}
        <div className="bg-zinc-900/80 border border-white/5 backdrop-blur-xl px-8 py-5 rounded-[30px] shadow-2xl">
          <div className="flex items-center gap-3 justify-center mb-2">
            <Timer size={14} className="text-green-500" />
            <span className="text-[12px] font-black uppercase italic tracking-widest">Coming Soon</span>
          </div>
          <p className="text-[8px] font-bold text-zinc-600 uppercase">Upgrading to High-Speed Safe Servers</p>
        </div>
      </div>

      {/* Footer Hint */}
      <footer className="mt-auto text-center pb-10">
        <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">
          Go to <span className="text-white">Studio</span> to use clips for posts
        </p>
      </footer>
    </div>
  );
}
