import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Heart, RefreshCw, ListMusic, WifiOff } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";

export default function RXMusic() {
  const [, setLocation] = useLocation();
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentTrackIndex];

  const fetchMusic = async () => {
    setIsLoading(true);
    try {
      // ✅ Jamendo API with explicit parameters to avoid browser block
      const clientID = "3374dacb3c471aeb8"; 
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${clientID}&format=json&limit=30&order=popularity_week&hasimage=true&audioformat=mp32`,
        { method: 'GET', mode: 'cors' }
      );
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setTracks(data.results);
      } else {
        console.error("No results from API");
      }
    } catch (err) {
      console.error("Nexus Connection Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || tracks.length === 0) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Play blocked by browser"));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-44 font-sans overflow-x-hidden">
      <audio 
        ref={audioRef} 
        src={currentTrack?.audio} 
        onEnded={() => setCurrentTrackIndex(p => (p + 1) % tracks.length)} 
        autoPlay={isPlaying} 
        key={currentTrack?.id || 'none'} 
      />

      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-black italic uppercase text-green-500 tracking-tighter">RX Music</h1>
        </div>
        <button onClick={fetchMusic} className={`p-3 bg-zinc-900 rounded-2xl ${isLoading ? 'animate-spin' : ''}`}>
          <RefreshCw size={18} className="text-green-500" />
        </button>
      </header>

      {/* Featured Display */}
      <div className="relative h-72 rounded-[45px] overflow-hidden border border-white/10 mb-10 bg-zinc-900 shadow-2xl">
        {currentTrack?.image && (
          <img src={currentTrack.image} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[1px]" alt="cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black" />
        <div className="absolute bottom-10 left-10 right-10">
          <h2 className="text-3xl font-black italic uppercase leading-tight truncate">
            {tracks.length > 0 ? currentTrack?.name : "Scanning..."}
          </h2>
          <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em] mt-2">
            {tracks.length > 0 ? currentTrack?.artist_name : "Nexus Offline"}
          </p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {tracks.length > 0 ? (
          tracks.map((track, idx) => (
            <div 
              key={track.id} 
              onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
              className={`flex items-center justify-between p-4 rounded-[28px] border transition-all ${currentTrackIndex === idx ? 'bg-zinc-900 border-green-500' : 'bg-zinc-900/30 border-white/5'}`}
            >
              <div className="flex items-center gap-4 overflow-hidden text-left">
                <img src={track.image} className="w-12 h-12 rounded-xl object-cover" alt="thumb" />
                <div className="truncate">
                  <p className={`text-[11px] font-black uppercase italic truncate ${currentTrackIndex === idx ? 'text-green-500' : 'text-white'}`}>{track.name}</p>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase">{track.artist_name}</p>
                </div>
              </div>
              <Heart size={16} className={currentTrackIndex === idx ? "text-green-500" : "text-zinc-800"} />
            </div>
          ))
        ) : (
          <div className="py-20 text-center flex flex-col items-center border-2 border-dashed border-white/5 rounded-[40px]">
             <WifiOff size={30} className="text-zinc-800 mb-4" />
             <p className="text-[10px] font-black uppercase text-zinc-600 mb-6">No Signals Detected</p>
             <button onClick={fetchMusic} className="px-8 py-3 bg-green-500 text-black text-[10px] font-black uppercase rounded-full shadow-lg shadow-green-500/20 active:scale-95">
               Force Re-Sync
             </button>
          </div>
        )}
      </div>

      {/* Floating Player */}
      <div className="fixed bottom-8 left-6 right-6 z-[100] bg-zinc-900/95 backdrop-blur-3xl border border-white/10 p-5 rounded-[40px] flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4 max-w-[45%] overflow-hidden text-left">
           <img src={currentTrack?.image} className={`w-12 h-12 rounded-2xl object-cover ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`} alt="player" />
           <div className="truncate">
              <p className="text-[10px] font-black uppercase italic truncate leading-none mb-1">{currentTrack?.name || "Idle"}</p>
              <span className="text-[8px] text-green-500 font-black uppercase">Race-X Station</span>
           </div>
        </div>
        <div className="flex items-center gap-7">
          <button onClick={togglePlay} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center active:scale-90 shadow-xl">
            {isPlaying ? <Pause size={22} fill="black" /> : <Play size={22} fill="black" className="ml-1" />}
          </button>
          <ListMusic size={22} className="text-zinc-500" />
        </div>
      </div>
    </div>
  );
}
