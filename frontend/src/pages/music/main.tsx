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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentTrackIndex];

  // ✅ Auto-Play & Instant Play Logic
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrackIndex, isPlaying]);

  const fetchMusic = async (query: string) => {
    setLoading(true);
    try {
      // ✅ Using a high-speed legal SoundCloud API Bridge
      const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=3374dacb3c471aeb8&format=json&limit=40&search=${encodeURIComponent(query)}&audioformat=mp32`);
      const data = await res.json();
      
      if (data.results) {
        const formatted = data.results.map((t: any) => ({
          id: t.id,
          name: t.name,
          artist: t.artist_name,
          audio: t.audio,
          image: t.image || "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
        }));
        setTracks(formatted);
        setCurrentTrackIndex(0);
        setIsPlaying(false);
      }
    } catch (e) {
      console.log("Nexus Bridge Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMusic("Indian Pop"); }, []);

  const handleSelect = (i: number) => {
    setCurrentTrackIndex(i);
    setIsPlaying(true);
  };

  const next = () => {
    setCurrentTrackIndex((p) => (p + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prev = () => {
    setCurrentTrackIndex((p) => (p - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60) || 0;
    const sec = Math.floor(time % 60) || 0;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-64 font-sans">
      <audio ref={audioRef} src={currentTrack?.audio} onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onEnded={next} key={currentTrack?.id} />

      <header className="flex items-center justify-between mb-8">
        <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75"><ArrowLeft size={18} /></button>
        <div className="text-center">
          <h1 className="text-xl font-black italic text-green-500 uppercase">Race-X Beat</h1>
          <p className="text-[7px] font-bold text-zinc-500 tracking-widest uppercase flex items-center justify-center gap-1">
            <ShieldCheck size={8} className="text-green-500" /> Safe Stream Enabled
          </p>
        </div>
        <div className="w-10" />
      </header>

      <form onSubmit={(e) => { e.preventDefault(); fetchMusic(searchQuery); }} className="relative mb-8">
        <input type="text" placeholder="Search Full Songs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-zinc-900/80 border border-white/5 rounded-[25px] py-4 px-12 text-sm font-bold focus:border-green-500 outline-none" />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
        {loading && <RefreshCw className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-spin" size={16} />}
      </form>

      {currentTrack && (
        <div className="relative aspect-square rounded-[40px] overflow-hidden border border-white/10 mb-8 bg-zinc-900 shadow-2xl">
          <img src={currentTrack.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black" />
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-2xl font-black italic uppercase truncate">{currentTrack.name}</h2>
            <p className="text-[10px] font-bold text-green-500 mt-1">{currentTrack.artist}</p>
          </div>
        </div>
      )}

      <div className="mb-10 px-2">
        <input type="range" min="0" max={duration || 0} value={currentTime} onChange={(e) => { if(audioRef.current) audioRef.current.currentTime = Number(e.target.value); }} className="w-full h-1 bg-zinc-800 rounded-full appearance-none accent-green-500 mb-3" />
        <div className="flex justify-between text-[10px] font-bold text-zinc-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="fixed bottom-10 left-6 right-6 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-[40px] p-6 z-50">
        <div className="flex items-center justify-between">
          <button onClick={prev} className="text-zinc-500 active:text-green-500"><SkipBack size={32} fill="currentColor" /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center active:scale-90 shadow-xl transition-all">
            {isPlaying ? <Pause size={35} fill="black" /> : <Play size={35} fill="black" className="ml-1" />}
          </button>
          <button onClick={next} className="text-zinc-500 active:text-green-500"><SkipForward size={32} fill="currentColor" /></button>
        </div>
      </div>

      <div className="space-y-4 pb-20">
        {tracks.map((t, i) => (
          <div key={t.id + i} onClick={() => handleSelect(i)} className={`flex items-center gap-4 p-4 rounded-[25px] border transition-all ${currentTrackIndex === i ? 'bg-zinc-900 border-green-500 shadow-lg' : 'bg-zinc-900/30 border-white/5'}`}>
            <img src={t.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
            <div className="flex-1 truncate text-left">
              <p className={`text-[11px] font-black uppercase italic truncate ${currentTrackIndex === i ? 'text-green-500' : 'text-white'}`}>{t.name}</p>
              <p className="text-[9px] font-bold text-zinc-600 uppercase">{t.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
