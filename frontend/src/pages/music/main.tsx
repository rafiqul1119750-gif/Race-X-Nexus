import { ArrowLeft, Play, Pause, SkipForward, SkipBack, ListMusic, Music2, Search, RefreshCw, Volume2, Clock } from "lucide-react";
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

  // ✅ THE SUPREME ENGINE: Multi-Source Search (iTunes + Jamendo + Pixabay + Deezer)
  const fetchAllSources = async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      // 1. iTunes India (For Bollywood/Regional Hits)
      const itunesReq = fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&country=in&media=music&limit=15`).then(res => res.json());
      
      // 2. Jamendo (For Independent Artists)
      const jamReq = fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=3374dacb3c471aeb8&format=json&limit=15&search=${query}`).then(res => res.json());
      
      // 3. Deezer (Global Database)
      const deezerReq = fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=15`).then(res => res.json());

      const [itunes, jam, deezer] = await Promise.allSettled([itunesReq, jamReq, deezerReq]);

      let combined: any[] = [];

      if (itunes.status === 'fulfilled' && itunes.value.results) {
        itunes.value.results.forEach((s: any) => combined.push({
          id: `it-${s.trackId}`, name: s.trackName, artist: s.artistName, audio: s.previewUrl, image: s.artworkUrl100.replace('100x100', '500x500')
        }));
      }

      if (jam.status === 'fulfilled' && jam.value.results) {
        jam.value.results.forEach((j: any) => combined.push({
          id: `jm-${j.id}`, name: j.name, artist: j.artist_name, audio: j.audio, image: j.image || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400"
        }));
      }

      if (deezer.status === 'fulfilled' && deezer.value.data) {
        deezer.value.data.forEach((d: any) => combined.push({
          id: `dz-${d.id}`, name: d.title, artist: d.artist.name, audio: d.preview, image: d.album.cover_big
        }));
      }

      if (combined.length > 0) {
        setTracks(combined);
        setCurrentTrackIndex(0);
        setIsPlaying(false);
      }
    } catch (e) {
      console.log("Nexus Link Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllSources("Trending Bollywood Remix"); }, []);

  // ✅ Audio Controls
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => console.log("Stream Loading..."));
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => setCurrentTrackIndex((p) => (p + 1) % tracks.length);
  const prevTrack = () => setCurrentTrackIndex((p) => (p - 1 + tracks.length) % tracks.length);

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60) || 0;
    const sec = Math.floor(time % 60) || 0;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-60 font-sans overflow-x-hidden">
      <audio 
        ref={audioRef} 
        src={currentTrack?.audio} 
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={nextTrack}
        key={currentTrack?.id}
      />

      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75 border border-white/5"><ArrowLeft size={18} /></button>
          <h1 className="text-xl font-black italic uppercase text-green-500 tracking-tighter">RX Music</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
           <span className="text-[7px] font-black text-green-500 uppercase tracking-widest">Quad-Source Active</span>
        </div>
      </header>

      {/* Search Input - Fixed Enter Key */}
      <form onSubmit={(e) => { e.preventDefault(); fetchAllSources(searchQuery); }} className="relative mb-8">
        <input 
          type="text" 
          placeholder="Search Hindi, Punjabi, Hits..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900/80 border border-white/5 rounded-[25px] py-4 px-12 text-sm font-bold focus:border-green-500 outline-none placeholder:text-zinc-700 shadow-2xl transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
        {loading && <RefreshCw className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-spin" size={16} />}
      </form>

      {/* Big Art Display */}
      {currentTrack && (
        <div className="relative aspect-square rounded-[50px] overflow-hidden border border-white/10 mb-8 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <img src={currentTrack.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
          <div className="absolute bottom-10 left-10 right-10 text-left">
            <h2 className="text-3xl font-black italic uppercase leading-none truncate mb-2">{currentTrack.name}</h2>
            <p className="text-xs font-black text-green-500 uppercase tracking-[0.3em]">{currentTrack.artist}</p>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-10 px-2">
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-green-500 transition-all duration-300 shadow-[0_0_10px_#22c55e]" 
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }} 
          />
        </div>
        <div className="flex justify-between text-[10px] font-black text-zinc-500 font-mono tracking-tighter">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-4 mb-10">
        {tracks.map((t, i) => (
          <div 
            key={t.id + i} 
            onClick={() => { setCurrentTrackIndex(i); setIsPlaying(true); }} 
            className={`flex items-center gap-4 p-4 rounded-[30px] border transition-all ${currentTrackIndex === i ? 'bg-zinc-900 border-green-500 shadow-lg translate-x-2' : 'bg-zinc-900/30 border-white/5'}`}
          >
            <img src={t.image} className="w-12 h-12 rounded-xl object-cover shadow-md" alt="" />
            <div className="flex-1 truncate text-left">
              <p className={`text-[11px] font-black uppercase italic truncate ${currentTrackIndex === i ? 'text-green-500' : 'text-white'}`}>{t.name}</p>
              <p className="text-[9px] font-bold text-zinc-600 uppercase truncate">{t.artist}</p>
            </div>
            {currentTrackIndex === i && <Volume2 size={14} className="text-green-500 animate-bounce" />}
          </div>
        ))}
      </div>

      {/* FLOATING MASTER CONTROLS */}
      <div className="fixed bottom-8 left-6 right-6 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-[45px] p-7 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50">
        <div className="flex items-center justify-between gap-4">
          <button onClick={prevTrack} className="p-3 text-zinc-500 active:text-green-500 active:scale-75 transition-all"><SkipBack size={32} fill="currentColor" /></button>
          
          <button 
            onClick={togglePlay} 
            className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
          >
            {isPlaying ? <Pause size={35} fill="black" /> : <Play size={35} fill="black" className="ml-1" />}
          </button>
          
          <button onClick={nextTrack} className="p-3 text-zinc-500 active:text-green-500 active:scale-75 transition-all"><SkipForward size={32} fill="currentColor" /></button>
        </div>
      </div>
    </div>
  );
}
