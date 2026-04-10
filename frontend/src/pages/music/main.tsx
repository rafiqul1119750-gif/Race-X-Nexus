import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Heart, RefreshCw, ListMusic } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { databases } from "../../lib/appwrite"; 

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
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const config = response.documents.find(doc => doc.service_name === 'JAMENDO_MUSIC');
        
        if (config && config.key_value) {
          await fetchJamendo(config.key_value.trim());
          setStatusMsg("Neural Sync Active");
        } else {
          throw new Error("Key not found");
        }
      } catch (error) {
        // Direct Fallback with your specific key
        const manualKey = "3374dacb3c471aeb8"; 
        await fetchJamendo(manualKey);
        setStatusMsg("Nexus Ready (Manual)");
      } finally {
        setIsLoading(false);
      }
    };
    connectNexus();
  }, []);

  const fetchJamendo = async (key: string) => {
    try {
      // ✅ Clean URL with fewer filters to ensure results
      const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${key}&format=json&limit=50&order=popularity_week&hasimage=true`;
      console.log("Fetching from Nexus...");
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        setTracks(data.results);
      } else {
        console.error("No results from Jamendo API");
      }
    } catch (err) {
      console.error("Nexus Fetch Error:", err);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || tracks.length === 0) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Playback failed"));
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
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75 border border-white/5">
            <ArrowLeft size={18} />
          </button>
          <div>
             <h1 className="text-lg font-black italic uppercase text-green-500 tracking-tighter leading-none">RX Music</h1>
             <span className="text-[6px] font-black uppercase tracking-widest text-zinc-600 block mt-1">
               {isLoading ? "Connecting..." : statusMsg}
             </span>
          </div>
        </div>
        <RefreshCw 
          size={20} 
          className={`text-zinc-500 ${isLoading ? 'animate-spin' : 'active:rotate-180 transition-all'}`} 
          onClick={() => fetchJamendo("3374dacb3c471aeb8")}
        />
      </header>

      {/* Featured Display */}
      <div className="relative h-72 rounded-[45px] overflow-hidden border border-white/10 mb-10 bg-zinc-900 shadow-2xl">
        {currentTrack?.image ? (
          <img src={currentTrack.image} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[1px]" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 text-[8px] font-black uppercase text-zinc-800 tracking-[1.5em]">Race-X</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <h2 className="text-3xl font-black italic uppercase leading-tight truncate">
            {tracks.length > 0 ? currentTrack?.name : "Scanning..."}
          </h2>
          <p className="text-[9px] font-black text-green-500 uppercase tracking-[0.4em] mt-2">
            {tracks.length > 0 ? currentTrack?.artist_name : "Nexus Syncing"}
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
              className={`flex items-center justify-between p-4 rounded-[28px] border transition-all ${currentTrackIndex === idx ? 'bg-zinc-900 border-green-500' : 'bg-zinc-900/30 border-white/5'}`}
            >
              <div className="flex items-center gap-4 overflow-hidden text-left">
                <img src={track.image} className="w-12 h-12 rounded-xl object-cover" />
                <div className="truncate">
                  <p className={`text-[11px] font-black uppercase italic truncate ${currentTrackIndex === idx ? 'text-green-500' : 'text-white'}`}>{track.name}</p>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase truncate">{track.artist_name}</p>
                </div>
              </div>
              <Heart size={16} className={currentTrackIndex === idx ? "text-green-500" : "text-zinc-800"} />
            </div>
          ))
        ) : !isLoading && (
          <div className="py-20 text-center opacity-40 border-2 border-dashed border-white/5 rounded-[40px]">
            <p className="text-[10px] font-black uppercase tracking-widest">No Signals Found</p>
          </div>
        )}
      </div>

      {/* Footer Player */}
      <div className="fixed bottom-8 left-6 right-6 z-[100] bg-zinc-900/95 backdrop-blur-3xl border border-white/10 p-5 rounded-[40px] flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4 max-w-[45%] overflow-hidden text-left">
           <img src={currentTrack?.image} className={`w-12 h-12 rounded-2xl object-cover ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`} />
           <div className="truncate">
              <p className="text-[10px] font-black uppercase italic truncate">{currentTrack?.name || "Idle"}</p>
              <span className="text-[8px] text-green-500 font-black uppercase">Live Nexus</span>
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
