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

  // ✅ MEGA HYBRID SEARCH: Pixabay + Jamendo together
  const searchMusic = async (query: string) => {
    setLoading(true);
    try {
      // 1. Fetch from Pixabay (Fast for Lofi/Remixes)
      const pixabayRes = await fetch(
        `https://pixabay.com/api/videos/tracks/?key=43431641-59e21782298642a8b3834a362&q=${encodeURIComponent(query)}&per_page=30`
      );
      const pixabayData = await pixabayRes.json();
      const pixabayFormatted = (pixabayData.hits || []).map((h: any) => ({
        id: `pix-${h.id}`,
        name: h.title?.split('.')[0] || "Neural Track",
        artist_name: h.user || "Indian Artist",
        audio: h.preview_url,
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80"
      }));

      // 2. Fetch from Jamendo (Good for Independent Indian Pop)
      const clientID = "3374dacb3c471aeb8";
      const jamendoRes = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${clientID}&format=json&limit=30&search=${query.replace(" ", "+")}&hasimage=true&audioformat=mp32`
      );
      const jamendoData = await jamendoRes.json();
      const jamendoFormatted = (jamendoData.results || []).map((j: any) => ({
        id: `jam-${j.id}`,
        name: j.name,
        artist_name: j.artist_name,
        audio: j.audio,
        image: j.image
      }));

      // 3. Merge both results
      const combinedTracks = [...pixabayFormatted, ...jamendoFormatted];
      
      if (combinedTracks.length > 0) {
        setTracks(combinedTracks);
        setCurrentTrackIndex(0);
      }
    } catch (e) {
      console.log("Nexus Link Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { searchMusic("Bollywood Hindi Remix"); }, []);

  const languages = ["Hindi", "Punjabi", "Tamil", "Bhojpuri", "Haryanvi"];

  const handleLangChange = (lang: string) => {
    setActiveLang(lang);
    searchMusic(`${lang} Indian Song`);
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

      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-75"><ArrowLeft size={18} /></button>
          <h1 className="text-xl font-black italic uppercase text-green-500 tracking-tighter">RX Music</h1>
        </div>
        <RefreshCw size={20} className={`text-zinc-600 ${loading ? 'animate-spin text-green-500' : ''}`} onClick={() => searchMusic(activeLang)} />
      </header>

      {/* Search Bar */}
      <form onSubmit={(e) => { e.preventDefault(); searchMusic(searchQuery); }} className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search Indian Artists or Songs..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900/80 border border-white/5 rounded-[20px] py-4 px-12 text-sm font-bold focus:border-green-500 outline-none transition-all placeholder:text-zinc-700 shadow-xl"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
      </form>

      {/* Multi-Language Tabs */}
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

      {/* Player Card */}
      {tracks.length > 0 && (
        <div className="relative h-60 rounded-[40px] overflow-hidden border border-white/10 mb-8 bg-zinc-900 shadow-2xl group">
          <img src={currentTrack?.image} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-[1px] group-hover:scale-110 transition-transform duration-700" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black" />
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-2xl font-black italic uppercase leading-none truncate">{currentTrack?.name}</h2>
            <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mt-2">{currentTrack?.artist_name}</p>
          </div>
        </div>
      )}

      {/* Result List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center animate-pulse flex flex-col items-center gap-4">
             <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
             <p className="text-zinc-600 font-black text-[10px] uppercase">Syncing {activeLang} Hits...</p>
          </div>
        ) : (
          tracks.map((track, idx) => (
            <div 
              key={track.id + idx} 
              onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
              className={`flex items-center justify-between p-4 rounded-[25px] border transition-all ${currentTrackIndex === idx ? 'bg-zinc-900 border-green-500 shadow-lg' : 'bg-zinc-900/30 border-white/5'}`}
            >
              <div className="flex items-center gap-4 overflow-hidden text-left">
                <img src={track.image} className="w-12 h-12 rounded-xl object-cover shadow-md" alt="" />
                <div className="truncate">
                  <p className={`text-[11px] font-black uppercase italic truncate ${currentTrackIndex === idx ? 'text-green-500' : 'text-white'}`}>{track.name}</p>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase truncate">{track.artist_name}</p>
                </div>
              </div>
              <div className={currentTrackIndex === idx ? "w-2 h-2 rounded-full bg-green-500 animate-ping" : "w-1 h-1 rounded-full bg-zinc-800"} />
            </div>
          ))
        )}
      </div>

      {/* Floating Controller */}
      <div className="fixed bottom-8 left-6 right-6 z-[100] bg-zinc-900/90 backdrop-blur-3xl border border-white/10 p-5 rounded-[40px] flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4 max-w-[45%] overflow-hidden text-left">
           <img src={currentTrack?.image} className={`w-12 h-12 rounded-2xl object-cover shadow-lg ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`} alt="" />
           <div className="truncate">
              <p className="text-[10px] font-black uppercase italic truncate mb-1">{currentTrack?.name || "Idle"}</p>
              <span className="text-[8px] text-green-500 font-black uppercase tracking-tighter">Nexus {activeLang}</span>
           </div>
        </div>
        <div className="flex items-center gap-7">
          <button onClick={togglePlay} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center active:scale-90 shadow-xl transition-all">
            {isPlaying ? <Pause size={22} fill="black" /> : <Play size={22} fill="black" className="ml-1" />}
          </button>
          <button onClick={() => setLocation("/music/library")} className="p-2 text-zinc-500 active:text-green-500 active:scale-75 transition-all"><ListMusic size={22} /></button>
        </div>
      </div>
    </div>
  );
}
