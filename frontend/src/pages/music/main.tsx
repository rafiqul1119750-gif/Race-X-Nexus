import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Disc, Heart, Search, ListMusic, MoreVertical, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { databases } from "../../lib/appwrite"; 

// ✅ Correct Database & Collection IDs as per your screenshot
const DATABASE_ID = 'RaceX_Main_DB'; 
const COLLECTION_ID = 'api_configs';

export default function RXMusic() {
  const [, setLocation] = useLocation();
  const [musicApiKey, setMusicApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedTracks, setLikedTracks] = useState<string[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentTrackIndex];

  // 🛡️ Neural Engine Initialization
  useEffect(() => {
    const initMusicEngine = async () => {
      setIsLoading(true);
      try {
        console.log("Connecting to Nexus...");
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        
        // Match exactly with 'JAMENDO_MUSIC' from your database
        const config = response.documents.find(doc => doc.service_name === 'JAMENDO_MUSIC');
        
        if (config && config.key_value) {
          console.log("Nexus Link Established!");
          setMusicApiKey(config.key_value);
          fetchJamendoTracks(config.key_value);
        } else {
          console.error("Config document not found");
        }
      } catch (error) {
        console.error("Nexus Connection Failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initMusicEngine();
  }, []);

  const fetchJamendoTracks = async (key: string) => {
    try {
      // Clean request format for Jamendo
      const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${key.trim()}&format=json&limit=15&order=popularity_week&hasimage=true`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setTracks(data.results);
      }
    } catch (err) {
      console.error("Jamendo Fetch Error:", err);
    }
  };

  // Playback Control logic
  const togglePlay = () => {
    if (!audioRef.current || tracks.length === 0) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Nexus Playback Error:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-40 font-sans">
      <audio 
        ref={audioRef} 
        src={currentTrack?.audio} 
        onEnded={nextTrack} 
        autoPlay={isPlaying}
        key={currentTrack?.id} // Forces audio tag to reload on track change
      />

      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75 transition-all border border-white/5">
            <ArrowLeft size={18} />
          </button>
          <div>
             <h1 className="text-lg font-black italic uppercase text-green-500">RX Music</h1>
             <span className="text-[6px] font-black text-zinc-600 uppercase tracking-widest">
               {isLoading ? "Syncing..." : musicApiKey ? "Neural Engine Active" : "Nexus Link Missing"}
             </span>
          </div>
        </div>
        <div className="flex gap-4">
          <RefreshCw 
            size={20} 
            className={`text-zinc-500 ${isLoading ? 'animate-spin' : ''}`} 
            onClick={() => musicApiKey && fetchJamendoTracks(musicApiKey)} 
          />
          <ListMusic size={22} className="text-zinc-500" />
        </div>
      </header>

      {/* Main Player Display */}
      <div className="relative h-72 rounded-[45px] overflow-hidden border border-white/10 mb-10 bg-zinc-900 group shadow-2xl">
        {currentTrack?.image && (
          <img src={currentTrack.image} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="absolute bottom-10 left-10">
          <h2 className="text-4xl font-black italic uppercase leading-none truncate max-w-[250px]">
            {currentTrack?.name || "Initializing..."}
          </h2>
          <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em] mt-3">
            {currentTrack?.artist_name || "Scanning Nexus"}
          </p>
        </div>
      </div>

      {/* Track List Section */}
      <div className="space-y-4">
        {tracks.length === 0 && !isLoading && (
          <div className="text-center py-10">
            <p className="text-red-500 text-[10px] font-black uppercase mb-2">Sync Failed: Check API Key</p>
            <span className="text-zinc-600 text-[8px] uppercase tracking-widest">Check Appwrite Collection 'api_configs'</span>
          </div>
        )}
        
        {tracks.map((track, idx) => (
          <div 
            key={track.id} 
            onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
            className={`flex items-center justify-between p-4 rounded-[25px] border transition-all ${currentTrackIndex === idx ? 'bg-zinc-900 border-green-500' : 'bg-zinc-900/30 border-white/5'}`}
          >
            <div className="flex items-center gap-4 overflow-hidden">
              <img src={track.image} className="w-12 h-12 rounded-xl object-cover" />
              <div className="truncate">
                <p className={`text-[11px] font-black uppercase italic ${currentTrackIndex === idx ? 'text-green-500' : ''}`}>{track.name}</p>
                <p className="text-[9px] font-bold text-zinc-600 uppercase">{track.artist_name}</p>
              </div>
            </div>
            <Heart size={16} className={likedTracks.includes(track.id) ? 'fill-red-500 text-red-500' : 'text-zinc-600'} />
          </div>
        ))}
      </div>

      {/* Fixed Bottom Player */}
      <div className="fixed bottom-6 left-6 right-6 z-[100] bg-zinc-900/95 backdrop-blur-2xl border border-white/10 p-4 rounded-[35px] flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4 max-w-[40%] overflow-hidden">
           <img 
            src={currentTrack?.image} 
            className={`w-12 h-12 rounded-2xl object-cover ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`} 
           />
           <div className="truncate">
              <p className="text-[10px] font-black uppercase italic truncate">{currentTrack?.name || "Station Idle"}</p>
              <span className="text-[8px] text-green-500 font-black uppercase">Live Nexus</span>
           </div>
        </div>

        <div className="flex items-center gap-6">
          <SkipBack onClick={prevTrack} size={20} className="text-zinc-500 hover:text-white" />
          <button onClick={togglePlay} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center active:scale-90 shadow-xl transition-all">
            {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
          </button>
          <SkipForward onClick={nextTrack} size={20} className="text-zinc-500 hover:text-white" />
        </div>
      </div>
    </div>
  );
}
