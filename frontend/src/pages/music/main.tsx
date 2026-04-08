import { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, 
  Heart, Share2, ListMusic, Volume2, Mic2, Maximize2, 
  Search, MoreHorizontal, Flame, Disc, Radio
} from "lucide-react";

export default function NexusMusicMain() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Celestial Drift",
    artist: "Nexus AI Core",
    duration: "3:45",
    cover: "https://picsum.photos/800/800?random=101"
  });

  // --- PROFESSIONAL FEATURE: DYNAMIC BACKGROUND ---
  return (
    <div className="min-h-screen bg-black text-white pb-32 overflow-x-hidden selection:bg-cyan-500">
      
      {/* Premium Glass Header */}
      <header className="p-6 flex justify-between items-center sticky top-0 z-50 bg-black/40 backdrop-blur-3xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
            <Disc className="text-cyan-400 animate-spin-slow" size={20} />
          </div>
          <h1 className="font-black italic uppercase tracking-tighter text-xl">Nexus Audio</h1>
        </div>
        <div className="flex gap-4">
          <div className="hidden md:flex items-center bg-zinc-900 px-4 py-2 rounded-full border border-white/5">
            <Search size={14} className="text-zinc-500 mr-2"/>
            <input placeholder="Search Universe..." className="bg-transparent text-[10px] uppercase font-black outline-none w-48"/>
          </div>
          <button className="p-3 bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition-all"><Share2 size={18}/></button>
        </div>
      </header>

      {/* Hero: Featured Artist (Spotify Style) */}
      <div className="p-6">
        <div className="relative h-64 md:h-80 w-full rounded-[40px] overflow-hidden group">
          <img src="https://picsum.photos/1200/600?random=102" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60" alt="Featured" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 space-y-2">
            <span className="bg-cyan-500 text-black text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Trending Now</span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Neon Nights</h2>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Global Reach: 1.2M Listeners</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-6 grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <CategoryCard label="AI Generated" icon={<Radio size={16}/>} color="from-purple-500" />
        <CategoryCard label="Daily Mix" icon={<Flame size={16}/>} color="from-cyan-500" />
        <CategoryCard label="Top Charts" icon={<ListMusic size={16}/>} color="from-orange-500" />
        <CategoryCard label="Discover" icon={<SparkleIcon/>} color="from-pink-500" />
      </div>

      {/* Professional Track List */}
      <div className="px-6 mt-12 space-y-8">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Your Sonic Feed</h3>
        <div className="space-y-2">
          {[1,2,3,4,5,6].map(i => (
            <TrackItem key={i} rank={i} title={`Quantum Pulse ${i}`} artist="Circuit Ghost" time="4:12" />
          ))}
        </div>
      </div>

      {/* --- FLOATING PRO PLAYER BAR (REAL FUNCTIONAL UI) --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl bg-zinc-950/80 backdrop-blur-2xl border border-white/10 p-4 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-[100] animate-in slide-in-from-bottom duration-500">
        <div className="flex items-center gap-4">
          <img src={currentTrack.cover} className="w-14 h-14 rounded-2xl shadow-xl active:scale-90 transition-all cursor-pointer" alt="Cover" />
          <div className="flex-1 min-w-0">
            <h4 className="font-black uppercase italic tracking-tighter truncate">{currentTrack.title}</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest truncate">{currentTrack.artist}</p>
          </div>
          
          <div className="hidden md:flex items-center gap-6 px-8">
            <SkipBack className="text-zinc-500 hover:text-white transition-all cursor-pointer" size={20} />
            <button onClick={() => setIsPlaying(!isPlaying)} className="bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-90 transition-all">
              {isPlaying ? <Pause size={20} fill="black"/> : <Play size={20} fill="black"/>}
            </button>
            <SkipForward className="text-zinc-500 hover:text-white transition-all cursor-pointer" size={20} />
          </div>

          <div className="flex items-center gap-4">
            <Heart className="text-zinc-600 hover:text-cyan-400 cursor-pointer active:scale-75 transition-all" size={20} />
            <div className="hidden sm:block"><Volume2 className="text-zinc-600" size={18} /></div>
          </div>
        </div>
        
        {/* Seek Bar (Real Logic Placeholder) */}
        <div className="absolute -top-[1px] left-8 right-8 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee] animate-pulse-slow" />
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function CategoryCard({ label, icon, color }: any) {
  return (
    <div className={`bg-zinc-900/50 p-6 rounded-[32px] border border-white/5 hover:border-white/20 transition-all cursor-pointer group`}>
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} to-black flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );
}

function TrackItem({ rank, title, artist, time }: any) {
  return (
    <div className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white/5 transition-all group cursor-pointer active:scale-[0.98]">
      <span className="text-zinc-700 font-black italic w-4">{rank}</span>
      <img src={`https://picsum.photos/100/100?random=${rank}`} className="w-12 h-12 rounded-xl border border-white/5" alt="Cover" />
      <div className="flex-1">
        <h5 className="font-bold text-sm uppercase tracking-tighter group-hover:text-cyan-400 transition-all">{title}</h5>
        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{artist}</p>
      </div>
      <span className="text-[10px] font-black text-zinc-700 group-hover:text-zinc-400 transition-all">{time}</span>
      <MoreHorizontal className="text-zinc-700 opacity-0 group-hover:opacity-100 transition-all" size={18} />
    </div>
  );
}

function SparkleIcon() {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
}
