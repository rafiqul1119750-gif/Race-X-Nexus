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

  // ✅ CLICK PE TURANT PLAY HONE WALA LOGIC
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch((e) => console.log("Playback started after interaction"));
    }
  }, [currentTrackIndex, isPlaying]); // Track badalte hi play hoga

  const fetchMusic = async (query: string, currentMode: 'full' | 'clip') => {
    if (!query) return;
    setLoading(true);
    try {
      let formatted: any[] = [];
      if (currentMode === 'full') {
        // 🚀 FULL SONG JUGAD: Direct SoundCloud/Independent Hub
        const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=3374dacb3c471aeb8&format=json&limit=30&search=${encodeURIComponent(query)}&audioformat=mp32`);
        const data = await res.json();
        formatted = (data.results || []).map((j: any) => ({
          id: `f-${j.id}`, name: j.name, artist: j.artist_name, audio: j.audio, image: j.image || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400"
        }));
      } else {
        // ⚡ FAST CLIP: iTunes
        const itRes = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&country=in&media=music&limit=30`);
        const itData = await itRes.json();
        formatted = (itData.results || []).map((s: any) => ({
          id: `c-${s.trackId}`, name: s.trackName, artist: s.artistName, audio: s.previewUrl, image: s.artworkUrl100.replace('100x100', '600x600')
        }));
      }
      setTracks(formatted);
      setCurrentTrackIndex(0);
      setIsPlaying(false);
    } catch (e) {
      console.log("Nexus Sync Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMusic("Indian", mode); }, [mode]);

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true); // ✅ Click karte hi play
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // ✅ AUTO-PLAY NEXT TRACK
  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60) || 0;
    const sec = Math.floor(time % 60) || 0;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-64 font-sans overflow-x-hidden">
      <audio 
        ref={audioRef} 
        src={currentTrack?.audio} 
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)} 
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} 
        onEnded={playNext} // ✅ Automatic Next Play
        key={currentTrack?.id} 
      />

      <header className="mb-6 flex items-center justify-between">
        <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl"><ArrowLeft size={18} /></button>
        <h1 className="text-xl font-black italic uppercase text-green-500 tracking-tighter">RX Nexus</h1>
        <ShieldCheck size={20} className="text-green-500/50" />
      </header>

      {/* Switcher */}
      <div className="flex bg-zinc-900/50 p-1.5 rounded-[22px] mb-8 border border-white/5">
        <button onClick={() => setMode('full')} className={`flex-1 py-3 rounded-[18px] text-[10px] font-black uppercase transition-all ${mode === 'full' ? 'bg-green-500 text-black' : 'text-zinc-500'}`}>Full Music</button>
        <button onClick={() => setMode('clip')} className={`flex-1 py-3 rounded-[18px] text-[10px] font-black uppercase transition-all ${mode === 'clip' ? 'bg-green-500 text-black' : 'text-zinc-500'}`}>Quick Clips</button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); fetchMusic(searchQuery, mode); }} className="relative mb-8">
        <input type="text" placeholder="Search song..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-zinc-900/80 border border-white/5 rounded-[25px] py-4 px-12 text-sm font-bold focus:border-green-500 outline-none" />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
        {loading && <RefreshCw className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-spin" size={16} />}
      </form>

      {currentTrack && (
        <div className="relative aspect-square rounded-[50px] overflow-hidden border border-white/10 mb-8 bg-zinc-900 shadow-2xl">
          <img src={currentTrack.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black" />
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-2xl font-black italic uppercase leading-tight truncate">{currentTrack.name}</h2>
            <p className="text-[10px] font-black text-green-500 uppercase mt-2">{currentTrack.artist}</p>
          </div>
        </div>
      )}

      {/* Seek Bar */}
      <div className="mb-10 px-2">
        <input type="range" min="0" max={duration || 0} value={currentTime} onChange={(e) => { if(audioRef.current) audioRef.current.currentTime = Number(e.target.value); }} className="w-full h-1 bg-zinc-800 rounded-full appearance-none accent-green-500 mb-3" />
        <div className="flex justify-between text-[10px] font-black text-zinc-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Master Player UI */}
      <div className="fixed bottom-10 left-6 right-6 bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-[45px] p-6 shadow-2xl z-50">
        <div className="flex items-center justify-between">
          <button onClick={playPrev} className="text-zinc-500 active:text-green-500"><SkipBack size={32} fill="currentColor" /></button>
          <button onClick={togglePlay} className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center active:scale-90 shadow-xl transition-all">
            {isPlaying ? <Pause size={35} fill="black" /> : <Play size={35} fill="black" className="ml-1" />}
          </button>
          <button onClick={playNext} className="text-zinc-500 active:text-green-500"><SkipForward size={32} fill="currentColor" /></button>
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-4 pb-20">
        {tracks.map((t, i) => (
          <div key={t.id + i} onClick={() => handleTrackSelect(i)} className={`flex items-center gap-4 p-4 rounded-[30px] border transition-all ${currentTrackIndex === i ? 'bg-zinc-900 border-green-500' : 'bg-zinc-900/30 border-white/5'}`}>
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
