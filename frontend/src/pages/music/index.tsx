import { ArrowLeft, Play, SkipBack, SkipForward, Disc } from "lucide-react";
import { useLocation } from "wouter";

export default function MusicIndex() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setLocation("/hub")} className="p-2"><ArrowLeft /></button>
        <h1 className="text-xl font-black italic uppercase tracking-widest">Nexus Beats</h1>
      </div>

      <div className="relative h-64 rounded-[45px] overflow-hidden border border-white/10 mb-10 group">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
        <Disc size={150} className="absolute -right-10 -top-10 text-zinc-800 animate-spin-slow" />
        <div className="absolute bottom-8 left-8 z-20">
          <h2 className="text-4xl font-black italic uppercase leading-none">Cyberpunk<br/>Radio</h2>
          <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mt-2">Now Streaming AI Music</p>
        </div>
      </div>

      <div className="bg-zinc-900/40 p-8 rounded-[40px] border border-white/5 flex items-center justify-around">
        <SkipBack size={24} className="text-zinc-600" />
        <button className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center">
          <Play size={24} />
        </button>
        <SkipForward size={24} className="text-zinc-600" />
      </div>
    </div>
  );
}
