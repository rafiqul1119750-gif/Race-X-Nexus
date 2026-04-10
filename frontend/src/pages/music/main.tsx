import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Heart, RefreshCw, ListMusic } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { databases } from "../../lib/appwrite"; 

// ✅ Screenshot ke exact matching IDs
const DATABASE_ID = 'RaceX_Main_DB'; 
const COLLECTION_ID = 'api_configs';

export default function RXMusic() {
  const [, setLocation] = useLocation();
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("Initializing...");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const connectNexus = async () => {
      setIsLoading(true);
      try {
        // Step 1: Fetch from Appwrite
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const config = response.documents.find(doc => doc.service_name === 'JAMENDO_MUSIC');
        
        if (config && config.key_value) {
          await fetchJamendo(config.key_value);
          setStatusMsg("Neural Sync Active");
        } else {
          throw new Error("Key not found");
        }
      } catch (error) {
        console.error("Appwrite Link Failed, trying manual fallback...");
        // Step 2: Fallback to your manual key from screenshot
        const manualKey = "3374dacb3c471aeb8"; 
        await fetchJamendo(manualKey);
        setStatusMsg("Manual Sync Active");
      } finally {
        setIsLoading(false);
      }
    };
    connectNexus();
  }, []);

  const fetchJamendo = async (key: string) => {
    try {
      const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${key.trim()}&format=json&limit=30&order=popularity_week&hasimage=true`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setTracks(data.results);
      }
    } catch (err) {
      console.error("Jamendo Error:", err);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || tracks.length === 0) return;
    if (isPlaying) { audioRef.current.pause(); } 
    else { audioRef.current.play().catch(() => {}); }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-44 font-sans selection:bg-green-500/30">
      <audio ref={audioRef} src={currentTrack?.audio} onEnded={() => setCurrentTrackIndex(p => p + 1)} autoPlay={isPlaying} key={currentTrack?.id} />

      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75 border border-white/5"><ArrowLeft size={18} /></button>
          <div>
             <h1 className="text-lg font-black italic uppercase text-green-500 tracking-tighter">RX Music</h1>
             <span className={`text-[6px] font-black uppercase tracking-widest ${tracks.length > 0 ? 'text-zinc-600' : 'text-red-500'}`}>
               {isLoading ? "Connecting..." : statusMsg}
             </span>
          </div>
        </div>
        <RefreshCw size={20} className={`text-zinc-500 ${isLoading ? 'animate-spin' : ''}`} />
      </header>

      {/* Featured Cover */}
      <div className="relative h-72 rounded-[45px] overflow-hidden border border-white/10 mb-10 bg-zinc-900 shadow-2xl group">
        {currentTrack?.image ? (
          <img src={currentTrack.image} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[1px] group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-[10px] font-black uppercase text-zinc-800 tracking-[1em]">Race-X</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <h2 className="text-4xl font-black italic uppercase leading-none truncate drop-shadow-2xl">{currentTrack?.name || "Initializing..."}</h2>
          <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em] mt-3">{currentTrack?.artist_name || "Nexus Station"}</p>
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-4">
        {tracks.length === 0 && !isLoading && (
          <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[40px]">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">No Signals Found</p>
          </div>
        )}
        
        {tracks.map((track, idx) => (
          <div 
            key={track.id} 
            onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
            className={`flex items-center justify-between p-4 rounded-[28px] border transition-all duration-300 ${currentTrackIndex === idx ? 'bg-zinc-900 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-zinc-900/30 border-white/5'}`}
          >
            <div className="flex items-center gap-4 overflow-hidden">
              <img src={track.image} className="w-12 h-12 rounded-xl object-cover shadow-lg" />
              <div className="truncate text-left">
                <p className={`text-[11px] font-black uppercase italic truncate ${currentTrackIndex === idx ? 'text-green-500' : ''}`}>{track.name}</p>
                <p className="text-[9px] font-bold text-zinc-600 uppercase">{track.artist_name}</p>
              </div>
            </div>
            <Heart size={16} className="text-zinc-800" />
          </div>
        ))}
      </div>

      {/* Floating Player */}
      <div className="fixed bottom-8 left-6 right-6 z-[100] bg-zinc-900/90 backdrop-blur-3xl border border-white/10 p-5 rounded-[40px] flex items-center justify-between shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-4 max-w-[45%] overflow-hidden">
           <div className={`w-12 h-12 bg-zinc-800 rounded-2xl overflow-hidden shadow-inner flex-shrink-0 ${isPlaying ? 'animate-pulse' : ''}`}>
             {currentTrack?.image && <img src={currentTrack.image} className="w-full h-full object-cover" />}
           </div>
           <div className="truncate">
              <p className="text-[10px] font-black uppercase italic truncate leading-none">{currentTrack?.name || "Idle"}</p>
              <span className="text-[8px] text-green-500 font-black uppercase tracking-tighter">Streaming Nexus</span>
           </div>
        </div>

        <div className="flex items-center gap-7">
          <button onClick={togglePlay} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center active:scale-90 shadow-xl transition-all">
            {isPlaying ? <Pause size={22} fill="black" /> : <Play size={22} fill="black" className="ml-1" />}
          </button>
          <button onClick={() => setCurrentTrackIndex(i => (i + 1) % tracks.length)} className="p-2 text-zinc-500 active:scale-75"><ListMusic size={22} /></button>
        </div>
      </div>
    </div>
  );
}
