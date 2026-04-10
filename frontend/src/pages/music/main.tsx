import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Heart, RefreshCw, ListMusic, Music2 } from "lucide-react";
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
      // ✅ Using Pixabay API (No complex Key required, fast response)
      const res = await fetch(`https://pixabay.com/api/videos/tracks/?key=43431641-59e21782298642a8b3834a362&q=lofi+electronic&per_page=30`);
      const data = await res.json();
      
      if (data.hits && data.hits.length > 0) {
        // Mapping Pixabay data to our UI format
        const formattedTracks = data.hits.map((item: any) => ({
          id: item.id,
          name: item.title || "Neural Track",
          artist_name: item.artist || "Unknown Producer",
          audio: item.preview_url,
          image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&q=80" // Placeholder art
        }));
        setTracks(formattedTracks);
      } else {
        // Final Hardcoded Fallback (In case API fails)
        setTracks([{
          id: "fallback1",
          name: "Deep Space Echo",
          artist_name: "Nexus Core",
          audio: "https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73456.mp3",
          image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80"
        }]);
      }
    } catch (err) {
      console.error("Music Fetch Error:", err);
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
      audioRef.current.play().catch(e => console.log("Play blocked"));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-44 font-sans">
      <audio 
        ref={audioRef} 
        src={currentTrack?.audio} 
        onEnded={() => setCurrentTrackIndex(p => (p + 1) % tracks.length)} 
        autoPlay={isPlaying} 
        key={currentTrack?.id} 
      />

      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-75">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-black italic uppercase text-green-500 tracking-tighter leading-none">RX Music</h1>
        </div>
        <button onClick={fetchMusic} className={`p-3 bg-zinc-900 rounded-2xl ${isLoading ? 'animate-spin' : ''}`}>
          <RefreshCw size={18} className="text-green-500" />
        </button>
      </header>

      {/* Hero Section */}
      <div className="relative h-72 rounded-[45px] overflow-hidden border border-white/10 mb-10 bg-zinc-900 shadow-2xl">
        <img src={currentTrack?.image} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[1px]" alt="cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black" />
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <h2 className="text-3xl font-black italic uppercase leading-tight truncate">
            {tracks.length > 0 ? currentTrack?.name : "Syncing..."}
          </h2>
          <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em] mt-2">
            {tracks.length > 0 ? currentTrack?.artist_name : "Nexus Link"}
          </p>
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-4">
        {tracks.length > 0 ? (
          tracks.map((track, idx) => (
            <div 
              key={track.id} 
              onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
              className={`flex items-center justify-between p-4 rounded-[28px] border transition-all ${currentTrackIndex === idx ? 'bg-zinc-900 border-green-500 shadow-lg' : 'bg-zinc-900/30 border-white/5'}`}
            >
              <div className="flex items-center gap-4 overflow-hidden text-left">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <Music2 size={20} className={currentTrackIndex === idx ? "text-green-500" : "text-zinc-600"} />
                </div>
                <div className="truncate">
                  <p className={`text-[11px] font-black uppercase italic truncate ${currentTrackIndex === idx ? 'text-green-500' : 'text-white'}`}>{track.name}</p>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase">{track.artist_name}</p>
                </div>
              </div>
              <Heart size={16} className={currentTrackIndex === idx ? "text-green-500" : "text-zinc-800"} />
            </div>
          ))
        ) : (
          <div className="py-20 text-center opacity-30 italic font-black text-[10px] uppercase tracking-widest">Searching Deep Space...</div>
        )}
      </div>

      {/* Player Bar */}
      <div className="fixed bottom-8 left-6 right-6 z-[100] bg-zinc-900/95 backdrop-blur-3xl border border-white/10 p-5 rounded-[40px] flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4 max-w-[45%] overflow-hidden text-left">
           <div className={`w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
             <Music2 size={24} className="text-green-500" />
           </div>
           <div className="truncate">
              <p className="text-[10px] font-black uppercase italic truncate leading-none mb-1">{currentTrack?.name || "Ready"}</p>
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
