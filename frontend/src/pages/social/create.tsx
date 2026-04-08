import { useLocation } from "wouter";
import { ArrowLeft, Camera, Video, Music, Wand2 } from "lucide-react";

export default function CreatePost() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col">
      <div className="flex items-center gap-4 mb-10">
        <ArrowLeft onClick={() => setLocation('/social/feed')} className="text-zinc-500" />
        <h1 className="text-sm font-black italic tracking-[0.2em] uppercase text-cyan-400">Forge New Content</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-6">
        <div className="aspect-square w-full bg-zinc-900/50 border-2 border-dashed border-zinc-700 rounded-[40px] flex flex-col items-center justify-center gap-4 group active:border-cyan-500 transition-colors">
          <Camera size={40} className="text-zinc-600 group-active:text-cyan-400" />
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center px-10">
            Tap to upload from Nexus Gallery or capture live
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="p-6 bg-zinc-900 rounded-[30px] border border-white/5 flex flex-col items-center gap-3">
            <Video className="text-purple-400" />
            <span className="text-[9px] font-black uppercase">Post Reel</span>
          </button>
          <button className="p-6 bg-zinc-900 rounded-[30px] border border-white/5 flex flex-col items-center gap-3">
            <Wand2 className="text-amber-400" />
            <span className="text-[9px] font-black uppercase">AI Studio</span>
          </button>
        </div>
      </div>
    </div>
  );
}
