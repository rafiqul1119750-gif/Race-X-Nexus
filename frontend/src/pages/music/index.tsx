import { ArrowLeft, Play, SkipBack, SkipForward, Disc, Heart, Search, ListMusic, MoreVertical } from "lucide-react";
import { useLocation } from "wouter";

export default function RXMusic() {
  const [, setLocation] = useLocation();

  // Simulated Playlist Data
  const playlists = [
    { name: "Cyberpunk Radio", author: "RX Neural", color: "from-cyan-500" },
    { name: "Bollywood Lofi", author: "Race-X Vibes", color: "from-purple-600" },
    { name: "Hardstyle AI", author: "Techno Node", color: "from-red-500" },
    { name: "Peaceful Zen", author: "Spirit AI", color: "from-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-32 font-sans selection:bg-green-500/20">
      
      {/* --- HEADER --- */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900/80 rounded-2xl active:scale-75 transition-all border border-white/5">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-black italic uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">RX Music</h1>
        </div>
        <div className="flex gap-4 text-zinc-400">
          <Search size={22} />
          <ListMusic size={22} />
        </div>
      </header>

      {/* --- FEATURED BANNER --- */}
      <div className="relative h-64 rounded-[45px] overflow-hidden border border-white/10 mb-10 group bg-gradient-to-br from-zinc-800 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
        <Disc size={180} className="absolute -right-12 -top-12 text-white/5 animate-[spin_8s_linear_infinite]" />
        
        <div className="absolute bottom-8 left-8 z-20">
          <span className="text-[8px] font-black bg-green-500 text-black px-3 py-1 rounded-full uppercase tracking-widest">Featured</span>
          <h2 className="text-4xl font-black italic uppercase leading-none mt-3">Cyberpunk<br/>Radio</h2>
          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-2">Streaming 24/7 AI-Generated Beats</p>
        </div>
      </div>

      {/* --- TRENDING PLAYLISTS (Horizontal Scroll) --- */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-1">Trending Playlists</h3>
          <span className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">View All</span>
        </div>
        
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
          {playlists.map((pl, i) => (
            <div key={i} className="min-w-[160px] group cursor-pointer">
              <div className={`aspect-square bg-gradient-to-br ${pl.color} to-black/80 rounded-[35px] mb-4 relative overflow-hidden shadow-2xl`}>
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                 <Play className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0" fill="white" size={24} />
              </div>
              <p className="text-xs font-black uppercase tracking-wider truncate">{pl.name}</p>
              <p className="text-[9px] font-bold text-zinc-600 uppercase mt-1 tracking-tighter">{pl.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- RECENTLY PLAYED LIST --- */}
      <section>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-1 mb-6">Recently Played</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((track) => (
            <div key={track} className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-[25px] border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center font-black text-[10px] text-zinc-600">RX</div>
                <div>
                  <p className="text-[11px] font-black uppercase italic">Neural Track 0{track}</p>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">AI Artist • 3:45</p>
                </div>
              </div>
              <div className="flex gap-4 text-zinc-600">
                <Heart size={16} />
                <MoreVertical size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 🎵 FIXED PLAYER (SPOTIFY STYLE) --- */}
      <div className="fixed bottom-6 left-6 right-6 z-[100]">
        <div className="bg-zinc-900/95 backdrop-blur-3xl border border-white/10 p-4 rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
               <div className="w-12 h-12 bg-green-500 rounded-[15px] flex items-center justify-center animate-pulse">
                 <Disc size={24} className="text-black animate-[spin_3s_linear_infinite]" />
               </div>
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-black uppercase italic leading-none mb-1">Cyberpunk Radio</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <p className="text-[8px] font-bold text-green-500 uppercase tracking-widest">Live Now</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 px-4">
            <SkipBack size={20} className="text-zinc-500 hover:text-white transition-colors" fill="currentColor" />
            <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all">
              <Play size={20} fill="black" className="ml-1" />
            </button>
            <SkipForward size={20} className="text-zinc-500 hover:text-white transition-colors" fill="currentColor" />
          </div>

          <div className="hidden md:block">
             <Heart size={20} className="text-zinc-600" />
          </div>
        </div>
      </div>

    </div>
  );
}
