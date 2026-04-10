import { ArrowLeft, Play, Pause, Heart, RefreshCw, ListMusic, Music2, Search } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";

// ✅ MEGA DATABASE: Inhe koi block nahi kar sakta
const RX_MEGA_STORAGE = [
  { id: "rx1", name: "Cyber Drift", artist: "Nexus", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "rx2", name: "Neon Horizon", artist: "Race-X", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "rx3", name: "Digital Pulse", artist: "Alpha", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "rx4", name: "Midnight Bass", artist: "Core", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: "rx5", name: "Cloud Runner", artist: "Velocity", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { id: "rx6", name: "Synth Wave", artist: "Retro", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { id: "rx7", name: "Binary Star", artist: "Logic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { id: "rx8", name: "Orbit Echo", artist: "Satellite", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
  { id: "rx9", name: "Deep Signal", artist: "Nexus", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
  { id: "rx10", name: "Final Frontier", artist: "Race-X", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3" }
];

export default function RXMusic() {
  const [, setLocation] = useLocation();
  const [tracks, setTracks] = useState(RX_MEGA_STORAGE);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = tracks[currentTrackIndex];

  // Logic: Background mein 100 aur gaane load karna (Pixabay Bypass)
  const loadMoreSignals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://pixabay.com/api/videos/tracks/?key=43431641-59e21782298642a8b3834a362&q=electronic+techno&per_page=40`);
      const data = await res.json();
      if (data.hits) {
        const apiTracks = data.hits.map((h: any) => ({
          id: h.id.toString(),
          name: h.title || "Neural Signal",
          artist: h.artist || "Producer",
          url: h.preview_url
        }));
        setTracks([...RX_MEGA_STORAGE, ...apiTracks]);
      }
    } catch (e) { console.log("Nexus Link slow, using internal storage."); }
    setLoading(false);
  };

  useEffect(() => { loadMoreSignals(); }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); } 
    else { audioRef.current.play().catch(() => {}); }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-44 font-sans selection:bg-green-500/30">
      <audio ref={audioRef} src={currentTrack.url} onEnded={() => setCurrentTrackIndex(p => (p + 1) % tracks.length)} key={currentTrack.id} />

      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75 border border-white/5"><ArrowLeft size={18} /></button>
          <div>
            <h1 className="text-lg font-black italic uppercase text-green-500 tracking-tighter">RX Music</h1>
            <span className="text-[7px] font-black uppercase text-zinc-500 mt-1 block">{tracks.length} SIGNALS SYNCED</span>
          </div>
        </div>
        <button onClick={loadMoreSignals} className={`p-3 bg-zinc-900 rounded-2xl ${loading ? 'animate-spin' : ''}`}>
          <RefreshCw size={18} className="text-green-500" />
        </button>
      </header>

      {/* Hero Display */}
      <div className="relative h-64 rounded-[40px] overflow-hidden border border-white/10 mb-8 bg-zinc-900 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-black" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-32 h-32 rounded-full border-2 border-green-500/30 flex items-center justify-center ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                <Music2 size={40} className="text-green-500" />
            </div>
        </div>
        <div className="absolute bottom-8 left-8 right-8 text-center">
          <h2 className="text-2xl font-black italic uppercase truncate">{currentTrack.name}</h2>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-3">
        {tracks.map((track, idx) => (
          <div 
            key={track.id + idx} 
            onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
            className={`flex items-center justify-between p-4 rounded-[24px] border transition-all duration-300 ${currentTrackIndex === idx ? 'bg-zinc-900 border-green-500' : 'bg-zinc-900/30 border-white/5'}`}
          >
            <div className="flex items-center gap-4 truncate">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${currentTrackIndex === idx ? 'bg-green-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                <Music2 size={18} />
              </div>
              <div className="truncate text-left">
                <p className={`text-[11px] font-black uppercase italic truncate ${currentTrackIndex === idx ? 'text-green-500' : 'text-white'}`}>{track.name}</p>
                <p className="text-[9px] font-bold text-zinc-600 uppercase">{track.artist}</p>
              </div>
            </div>
            <Heart size={14} className={currentTrackIndex === idx ? "text-green-500" : "text-zinc-800"} />
          </div>
        ))}
      </div>

      {/* Floating Bottom Player */}
      <div className="fixed bottom-8 left-6 right-6 z-[100] bg-zinc-900/95 backdrop-blur-3xl border border-white/10 p-5 rounded-[40px] flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4 max-w-[45%] overflow-hidden text-left">
           <div className={`w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center ${isPlaying ? 'animate-pulse ring-2 ring-green-500/20' : ''}`}>
             <Music2 size={24} className="text-green-500" />
           </div>
           <div className="truncate">
              <p className="text-[10px] font-black uppercase italic truncate leading-none mb-1">{currentTrack.name}</p>
              <span className="text-[8px] text-green-500 font-black uppercase">Race-X Audio</span>
           </div>
        </div>
        <div className="flex items-center gap-7">
          <button onClick={togglePlay} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center active:scale-90 shadow-xl transition-all">
            {isPlaying ? <Pause size={22} fill="black" /> : <Play size={22} fill="black" className="ml-1" />}
          </button>
          <ListMusic size={22} className="text-zinc-500" />
        </div>
      </div>
    </div>
  );
}
