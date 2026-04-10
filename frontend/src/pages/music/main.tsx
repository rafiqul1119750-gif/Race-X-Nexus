import { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, SkipForward, SkipBack, 
  Heart, Share2, ListMusic, Volume2, 
  Search, MoreHorizontal, Flame, Disc, Radio
} from "lucide-react";
import { getNexusKey } from "../../lib/appwrite"; // Path check kar lena bhai

export default function NexusMusicMain() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 JAMENDO SE GAANE FETCH KARNA
  useEffect(() => {
    const syncNexusAudio = async () => {
      try {
        const apiKey = await getNexusKey('JAMENDO_MUSIC');
        if (!apiKey) return;

        const res = await fetch(
          `https://api.jamendo.com/v1.2/tracks/?client_id=${apiKey}&format=json&limit=30&order=popularity_month&include=musicinfo&tags=electronic+lofi`
        );
        const data = await res.json();
        setTracks(data.results);
        if (data.results.length > 0) setCurrentTrack(data.results[0]);
      } catch (err) {
        console.error("Nexus Sync Fail:", err);
      } finally {
        setLoading(false);
      }
    };
    syncNexusAudio();
  }, []);

  // ⏯️ PLAY/PAUSE LOGIC
  const togglePlay = (track?: any) => {
    if (track) {
      if (currentTrack?.id === track.id) {
        isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
        setIsPlaying(!isPlaying);
      } else {
        setCurrentTrack(track);
        setIsPlaying(true);
      }
    } else {
      isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-32 overflow-x-hidden">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={currentTrack?.audio} 
        onPlay={() => setIsPlaying(true)} 
        onPause={() => setIsPlaying(false)}
        autoPlay={isPlaying}
      />

      {/* Header */}
      <header className="p-6 flex justify-between items-center sticky top-0 z-50 bg-black/40 backdrop-blur-3xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
            <Disc className={`text-cyan-400 ${isPlaying ? 'animate-spin-slow' : ''}`} size={20} />
          </div>
          <h1 className="font-black italic uppercase tracking-tighter text-xl">Nexus Audio</h1>
        </div>
      </header>

      {/* Hero Section */}
      <div className="p-6">
        <div className="relative h-64 md:h-80 w-full rounded-[40px] overflow-hidden group">
          <img 
            src={currentTrack?.image || "https://picsum.photos/1200/600?random=102"} 
            className="w-full h-full object-cover transition-all duration-1000 opacity-60" 
            alt="Featured" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
          <div className="absolute bottom-10 left-10">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              {currentTrack ? "Now Playing" : "Loading..."}
            </h2>
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mt-2">
              {currentTrack?.name || "Initializing Nexus Hub"}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Track List */}
      <div className="px-6 mt-12 space-y-8">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Live Sonic Feed</h3>
        <div className="space-y-2">
          {loading ? (
             <div className="text-center py-20 animate-pulse font-black text-zinc-800">SYNCING WITH JAMENDO NODES...</div>
          ) : (
            tracks.map((track, i) => (
              <div 
                key={track.id} 
                onClick={() => togglePlay(track)}
                className={`flex items-center gap-6 p-4 rounded-3xl hover:bg-white/5 transition-all group cursor-pointer ${currentTrack?.id === track.id ? 'bg-white/5 border border-white/10' : ''}`}
              >
                <span className="text-zinc-700 font-black italic w-4">{i + 1}</span>
                <img src={track.image} className="w-12 h-12 rounded-xl border border-white/5" alt="Cover" />
                <div className="flex-1">
                  <h5 className={`font-bold text-sm uppercase tracking-tighter transition-all ${currentTrack?.id === track.id ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`}>
                    {track.name}
                  </h5>
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{track.artist_name}</p>
                </div>
                <div className="flex items-center gap-4">
                   {currentTrack?.id === track.id && isPlaying && <div className="w-1 h-4 bg-cyan-500 animate-bounce" />}
                   <span className="text-[10px] font-black text-zinc-700">{(track.duration / 60).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Master Player Bar */}
      {currentTrack && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl bg-zinc-950/80 backdrop-blur-2xl border border-white/10 p-4 rounded-[32px] shadow-2xl z-[100]">
          <div className="flex items-center gap-4">
            <img src={currentTrack.image} className={`w-14 h-14 rounded-2xl shadow-xl transition-all ${isPlaying ? 'animate-pulse' : ''}`} alt="Cover" />
            <div className="flex-1 min-w-0">
              <h4 className="font-black uppercase italic tracking-tighter truncate text-cyan-400">{currentTrack.name}</h4>
              <p className="text-[10px] font-bold text-zinc-500 uppercase truncate">{currentTrack.artist_name}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button onClick={() => togglePlay()} className="bg-white text-black p-4 rounded-full active:scale-90 transition-all">
                {isPlaying ? <Pause size={20} fill="black"/> : <Play size={20} fill="black"/>}
              </button>
            </div>
          </div>
          
          <div className="absolute -top-[1px] left-8 right-8 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
            <div className={`h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee] ${isPlaying ? 'w-full transition-all duration-[200s]' : 'w-0'}`} />
          </div>
        </div>
      )}
    </div>
  );
}
