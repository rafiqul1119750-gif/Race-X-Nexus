import { Play, Diamond, SkipForward } from "lucide-react";
import { useState } from "react";

export function AdCard({ onComplete }: { onComplete: () => void }) {
  const [timer, setTimer] = useState(5); // 5 sec skippable timer

  return (
    <div className="w-full h-[400px] bg-zinc-900 rounded-[40px] border-2 border-cyan-500/20 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
      
      <Diamond size={48} className="text-cyan-400 animate-pulse mb-4" />
      <h3 className="text-lg font-black italic uppercase tracking-tighter">Sponsor Protocol</h3>
      <p className="text-[10px] text-zinc-500 font-bold uppercase mt-2">Watch to earn 1 Diamond</p>

      <div className="mt-8 flex gap-4">
        <button className="px-8 py-3 bg-white text-black font-black rounded-2xl flex items-center gap-2">
          <Play size={16} fill="black" /> WATCH AD
        </button>
      </div>

      <div className="absolute bottom-6 right-6">
        <button className="text-[10px] font-black text-zinc-600 uppercase flex items-center gap-2">
          Skip in {timer}s <SkipForward size={12} />
        </button>
      </div>
    </div>
  );
}
