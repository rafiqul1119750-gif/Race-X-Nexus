import { ArrowLeft, Play, Pause, Heart, RefreshCw, ListMusic, Music2, Search, X } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";

export default function RXMusic() {
  const [, setLocation] = useLocation();
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLang, setActiveLang] = useState("Hindi");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentTrackIndex];

  // ✅ BYPASS ENGINE: Direct Music Repositories (No API Blocking)
  const fetchBypassMusic = async (query: string) => {
    setLoading(true);
    try {
      // Step 1: Using iTunes India as a Global Search (Never Blocked)
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query + " Indian")}&country=in&media=music&limit=50`);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        const formatted = data.results.map((item: any) => ({
          id: item.trackId,
          name: item.trackName,
          artist_name: item.artistName,
          audio: item.previewUrl, // Direct High-Speed Stream
          image: item.artworkUrl100.replace('100x100', '600x600')
        }));
        setTracks(formatted);
        setCurrentTrackIndex(0);
      }
    } catch (e) {
      console.log("Nexus Bypass Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBypassMusic("Top Indian Hits"); }, []);

  const languages = ["Hindi", "Punjabi", "Tamil", "Bhojpuri", "Haryanvi"];

  const handleLangChange = (lang: string) => {
    setActiveLang(lang);
    fetchBypassMusic(lang);
  };

  const togglePlay = () => {
    if (!audioRef.current || tracks.length === 0) return;
    if (isPlaying) { audioRef.current.pause(); } 
    else { audioRef.current.play().catch(() => {}); }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-44 font-sans overflow-x-hidden">
      <audio ref={audioRef} src={currentTrack?.audio} onEnded={() => setCurrentTrackIndex(p => (p + 1) % tracks.length)} key={currentTrack?.id} />

      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-75"><ArrowLeft size={18} /></button>
          <div>
            <h1 className="text-xl font-black italic uppercase text-green-500 tracking-tighter">RX Music</h1>
            <p className="text-[7px] text-zinc-600 font-bold uppercase tracking-widest">Bypass Stream Active</p>
          </div>
        </div>
        <RefreshCw size={18} className={`text-zinc-600 ${loading ? 'animate-spin text-green-500' : ''}`} />
      </header>

      <form onSubmit={(e) => { e.preventDefault(); fetchBypassMusic(searchQuery); }} className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search Indian Pop, Lofi, Folk..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900/80 border border-white/5 rounded-[22px] py-4 px-12 text-sm font-bold focus:border-green-500 outline-none transition-all placeholder:text-zinc-700"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
      </form>

      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLangChange(lang)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap border transition-all ${activeLang === lang ? 'bg-green-500 border-green-500 text-black shadow-[0_0_15px_#22c55e]' : 'bg-zinc-900 border-white/5 text-zinc-500'}`}
          >
            {lang}
          </button>
        ))}
      </div>

      {tracks.length > 0 && (
        <div className="relative h-60 rounded-[40px] overflow-hidden border border-white/10 mb-8 bg-zinc-900 shadow-2xl">
          <img src={currentTrack?.image} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-[1px]" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black" />
          <div className="absolute bottom-8 left-8 right-8 text-left">
            <h2 className="text-2xl font-black italic uppercase leading-none truncate">{currentTrack?.name}</h2>
            <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mt-2">{currentTrack?.artist_name}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center animate-pulse flex flex-col items-center gap-4">
             <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
             <p className="text-zinc-600 font-black text-[10px] uppercase tracking-widest">Bypassing Blocks...</p>
          </div>
        ) : tracks.length > 0 ? (
          tracks.map((track, idx) => (
            <div 
              key={track.id + idx} 
              onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
              className={`flex items-center justify-between p-4 rounded-[25px] border transition-all ${currentTrackIndex === idx ? 'bg-zinc-900 border-green-500' : 'bg-zinc-900/30 border-white/5'}`}
            >
              <div className="flex items-center gap-4 overflow-hidden text-left">
                <img src={track.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                <div className="truncate">
                  <p className={`text-[11px] font-black uppercase italic truncate ${currentTrackIndex === idx ? 'text-green-500' : 'text-white'}`}>{track.name}</p>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase truncate">{track.artist_name}</p>
                </div>
              </div>
              <div className={currentTrackIndex === idx ? "w-2 h-2 rounded-full bg-green-500 animate-ping" : "w-1 h-1 rounded-full bg-zinc-800"} />
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-zinc-800 font-black text-[10px] uppercase">No Hits Found - Check Signal</div>
        )}
      </div>

      <div className="fixed bottom-8 left-6 right-6 z-[100] bg-zinc-900/90 backdrop-blur-3xl border border-white/10 p-5 rounded-[40px] flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4 max-w-[45%] overflow-hidden text-left">
           <img src={currentTrack?.image} className={`w-12 h-12 rounded-2xl object-cover ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`} alt="" />
           <div className="truncate text-left">
              <p className="text-[10px] font-black uppercase italic truncate mb-1 leading-none">{currentTrack?.name || "Idle"}</p>
              <span className="text-[8px] text-green-500 font-black uppercase">Race-X Stream</span>
           </div>
        </div>
        <div className="flex items-center gap-7">
          <button onClick={togglePlay} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center active:scale-90 shadow-xl transition-all">
            {isPlaying ? <Pause size={22} fill="black" /> : <Play size={22} fill="black" className="ml-1" />}
          </button>
          <button onClick={() => setLocation("/music/library")} className="p-2 text-zinc-500 active:text-green-500"><ListMusic size={22} /></button>
        </div>
      </div>
    </div>
  );
}
