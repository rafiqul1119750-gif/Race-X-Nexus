import { useLocation } from "wouter";
import { ArrowLeft, Play, Music as MusicIcon, Heart, SkipForward } from "lucide-react";

export default function MusicPlayer() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black p-8 flex flex-col items-center">
      <div className="w-full flex justify-between mb-12">
        <ArrowLeft onClick={() => setLocation("/hub")} className="cursor-pointer" />
        <span className="text-[10px] font-black tracking-[0.4em] text-red-500 uppercase">RX Music</span>
        <Heart className="w-5 h-5" />
      </div>

      <div className="w-64 aspect-square bg-gradient-to-br from-red-600/20 to-zinc-900 rounded-[40px] border border-white/5 shadow-2xl flex items-center justify-center mb-12">
        <MusicIcon className="w-20 h-20 text-red-500 animate-pulse" />
      </div>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-black italic tracking-tighter">Nexus Beats v1</h2>
        <p className="text-[10px] text-zinc-500 mt-2 uppercase tracking-widest font-bold">Race-X Original Audio</p>
      </div>

      <div className="flex items-center gap-10">
        <SkipForward className="w-6 h-6 rotate-180 opacity-50" />
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <Play className="text-black fill-black w-8 h-8 ml-1" />
        </div>
        <SkipForward className="w-6 h-6" />
      </div>
    </div>
  );
}
