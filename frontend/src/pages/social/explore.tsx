import { useLocation } from "wouter";
import { ArrowLeft, Search, Flame, Compass } from "lucide-react";

export default function ExplorePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="flex items-center gap-4 mb-8">
        <ArrowLeft onClick={() => setLocation('/social/feed')} className="text-zinc-500" />
        <h1 className="text-sm font-black italic tracking-[0.2em] uppercase flex items-center gap-2">
          <Compass size={16} className="text-cyan-400" /> Explore Nexus
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative aspect-[3/4] bg-zinc-900 rounded-[30px] overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <Flame size={12} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-tighter">Viral Node {i}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
