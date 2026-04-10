import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Search, RefreshCw, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";

export default function RXMusic() {
  const [, setLocation] = useLocation();
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mode, setMode] = useState<'full' | 'clip'>('full');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentTrackIndex];

  // ✅ SAFE ENGINE: Sirf wahi sources jo "Creative Commons" allow karte hain
  const fetchSafeMusic = async (query: string, currentMode: 'full' | 'clip') => {
    setLoading(true);
    try {
      let combined: any[] = [];
      
      // Jamendo API - Indian independent artists (No Copyright Claims)
      const jamRes = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=3374dacb3c471aeb8&format=json&limit=25&search=${encodeURIComponent(query)}&tags=indian&audioformat=mp32`);
      const jamData = await jamRes.json();
      
      if (jamData.results) {
        const formattedJam = jamData.results.map((j: any) => ({
          id: `safe-jm-${j.id}`,
          name: j.name,
          artist: j.artist_name,
          audio: j.audio,
          image: j.image || "https://images.unsplash.com/photo-1514525253361-bee8718a74a2?w=400",
          isFull: true
        }));
        combined = [...combined, ...formattedJam];
      }

      // Free Music Archive (FMA) ya Pixabay Backup (Royalty Free)
      const pixRes = await fetch(`https://pixabay.com/api/videos/tracks/?key=43431641-59e21782298642a8b3834a362&q=${encodeURIComponent(query + " bollywood")}&per_page=15`);
      const pixData = await pixRes.json();

      if (pixData.hits) {
        const formattedPix = pixData.hits.map((p: any) => ({
          id: `safe-px-${p.id}`,
          name: p.title || "Indian Rhythm",
          artist: p.user || "Nexus Beats",
          audio: p.preview_url,
          image: "https://images.unsplash.com/photo-1459749411177-042180ce6742?w=400",
          isFull: false
        }));
        combined = [...combined, ...formattedPix];
      }

      setTracks(combined);
      setCurrentTrackIndex(0);
    } catch (e) {
      console.log("Safe Stream Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSafeMusic("Indian", mode); }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60) || 0;
    const sec = Math.floor(time % 60) || 0;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-64 font-sans overflow-x-hidden">
      <audio ref={audioRef} src={currentTrack?.audio} onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onEnded={() => setCurrentTrackIndex(p => (p+1)%tracks.length)} key={currentTrack?.id} />

      <header className="mb-6 flex items-center justify-between">
        <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75"><ArrowLeft size={18} /></button>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-black italic uppercase text-green-500 tracking-tighter">RX Music</h1>
          <div className="flex items-center gap-1 text-[8px] text-green-400 font-bold uppercase tracking-widest mt-1">
            <ShieldCheck size={10} /> 100% Royalty Free
          </div>
        </div>
        <div className="w-8" />
      </header>

      {/* Search Bar - No Enter Fix Needed, Form handles it */}
      <form onSubmit={(e) => { e.preventDefault(); fetchSafeMusic(searchQuery, mode); }} className="relative mb-8">
        <input type="text" placeholder="Search Safe Indian Music..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-zinc-900/80 border border-white/5 rounded-[25px] py-4 px-12 text-sm font-bold focus:border-green-500 outline-none" />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
        {loading && <RefreshCw className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-spin" size={16} />}
      </form>

      {/* Display Card */}
      {currentTrack && (
        <div className="relative aspect-square rounded-[50px] overflow-hidden border border-white/10 mb-8 bg-zinc-900 shadow-2xl">
          <img src={currentTrack.image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-2xl font-black italic uppercase truncate leading-none">{currentTrack.name}</h2>
            <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mt-2">By {currentTrack.artist}</p>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="mb-10 px-2">
        <input type="range" min="0" max={duration || 0} value={currentTime} onChange={(e) => { if(audioRef.current) audioRef.current.currentTime = Number(e.target.value); }} className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none accent-green-500 mb-3" />
        <div className="flex justify-between text-[10px] font-black text-zinc-500 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {tracks.map((t, i) => (
          <div key={t.id} onClick={() => { setCurrentTrackIndex(i); setIsPlaying(true); }} className={`flex items-center gap-4 p-4 rounded-[30px] border transition-all ${currentTrackIndex === i ? 'bg-zinc-900 border-green-500 shadow-lg' : 'bg-zinc-900/30 border-white/5'}`}>
            <img src={t.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
            <div className="flex-1 truncate text-left">
              <p className={`text-[11px] font-black uppercase italic truncate ${currentTrackIndex === i ? 'text-green-500' : 'text-white'}`}>{t.name}</p>
              <p className="text-[9px] font-bold text-zinc-600 uppercase truncate">{t.artist}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controller */}
      <div className="fixed bottom-10 left-6 right-6 bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-[45px] p-6 shadow-2xl z-50">
        <div className="flex items-center justify-between">
          <button onClick={() => setCurrentTrackIndex(p => (p - 1 + tracks.length) % tracks.length)} className="text-zinc-500 p-2"><SkipBack size={32} fill="currentColor" /></button>
          <button onClick={togglePlay} className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center active:scale-90 transition-all">
            {isPlaying ? <Pause size={35} fill="black" /> : <Play size={35} fill="black" className="ml-1" />}
          </button>
          <button onClick={() => setCurrentTrackIndex(p => (p + 1) % tracks.length)} className="text-zinc-500 p-2"><SkipForward size={32} fill="currentColor" /></button>
        </div>
      </div>
    </div>
  );
}
