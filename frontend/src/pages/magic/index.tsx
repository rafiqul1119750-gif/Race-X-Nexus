import { ArrowLeft, Disc, Play, SkipForward, SkipBack, Heart, Share2, ListMusic, Volume2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function MusicIndex() {
  const [, setLocation] = useLocation();
  const [playing, setPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col">
      <header className="flex justify-between items-center mb-10">
        <button onClick={() => setLocation("/hub")} className="p-4 bg-zinc-900 rounded-3xl active:scale-75 transition-all"><ArrowLeft size={20}/></button>
        <span className="text-[10px] font-black italic uppercase tracking-[0.4em] text-zinc-500">Global Player</span>
        <button className="p-4 bg-zinc-900 rounded-3xl active:scale-75 transition-all"><ListMusic size={20}/></button>
      </header>

      {/* Player Core */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className={`relative mb-16 p-3 rounded-full border border-white/5 ${playing ? 'animate-spin-slow' : ''}`}>
          <div className="w-72 h-72 rounded-full bg-gradient-to-br from-zinc-800 to-black p-1 shadow-[0_0_60px_rgba(255,255,255,0.05)] overflow-hidden flex items-center justify-center">
            <Disc size={200} className="text-zinc-900 opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full" />
            <div className="absolute w-20 h-20 bg-black rounded-full border-[6px] border-zinc-900 z-10 shadow-inner" />
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Neon Nights</h2>
          <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">Race-X Original Sound</p>
        </div>

        {/* Playback Controls */}
        <div className="w-full max-w-sm px-4">
          <div className="h-1.5 bg-zinc-900 rounded-full mb-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[60%] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>

          <div className="flex items-center justify-between mb-8">
            <button className="text-zinc-600 active:text-white transition-colors"><Heart size={22} /></button>
            <div className="flex items-center gap-10">
              <button className="active:scale-75 transition-all"><SkipBack size={32} /></button>
              <button 
                onClick={() => setPlaying(!playing)}
                className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all"
              >
                {playing ? <div className="flex gap-1.5"><div className="w-2.5 h-8 bg-black rounded-full"/><div className="w-2.5 h-8 bg-black rounded-full"/></div> : <Play size={38} fill="black" />}
              </button>
              <button className="active:scale-75 transition-all"><SkipForward size={32} /></button>
            </div>
            <button className="text-zinc-600 active:text-white transition-colors"><Share2 size={22} /></button>
          </div>
          
          <div className="flex justify-center gap-2 text-zinc-800">
            <Volume2 size={12}/>
            <div className="w-24 h-1 bg-zinc-900 rounded-full self-center">
               <div className="w-1/2 h-full bg-zinc-700 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
