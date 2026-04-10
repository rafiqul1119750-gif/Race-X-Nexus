import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Disc, Heart, Search, ListMusic, MoreVertical, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { databases } from "../../lib/appwrite"; 

// ✅ Screenshot ke hisaab se Database ID update ki hai
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

  useEffect(() => {
    const initMusicEngine = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        // ✅ Aapke screenshot mein name 'JAMENDO_MUSIC' hai
        const config = response.documents.find(doc => doc.service_name === 'JAMENDO_MUSIC');
        
        if (config && config.key_value) {
          setMusicApiKey(config.key_value);
          await fetchJamendoTracks(config.key_value);
        } else {
          console.error("API Key not found in Appwrite");
        }
      } catch (error) {
        console.error("Appwrite Link Failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initMusicEngine();
  }, []);

  const fetchJamendoTracks = async (key: string) => {
    setIsLoading(true);
    try {
      // ✅ Parameters ko clean rakha hai taaki fetching block na ho
      const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${key.trim()}&format=json&limit=25&order=popularity_week&hasimage=true&audioformat=mp32`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        setTracks(data.results);
      } else {
        console.warn("No tracks found or API Key invalid");
      }
    } catch (err) {
      console.error("Music Fetch Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Play/Pause logic
  const togglePlay = () => {
    if (!audioRef.current || tracks.length === 0) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Playback failed:", e));
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
      />

      {/* --- HEADER --- */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75 transition-all">
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
            className={`text-zinc-500 cursor-pointer ${isLoading ? 'animate-spin' : ''}`} 
            onClick={() => musicApiKey && fetchJamendoTracks(musicApiKey)}
          />
          <ListMusic size={22} className="text-zinc-500" onClick={() => setLocation("/music/library")} />
        </div>
      </header>

      {/* --- FEATURED DISPLAY --- */}
      <div className="relative h-72 rounded-[45px] overflow-hidden border border-white/10 mb-10 bg-zinc-900 shadow-2xl">
        {currentTrack?.image && (
          <img src={currentTrack.image} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px]" alt="bg" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-10 left-10 right-10 z-20">
          <h2 className="text-4xl font-black italic uppercase leading-none truncate mb-2 drop-shadow-lg">
            {currentTrack?.name || "Initializing..."}
          </h2>
          <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em]">
            {currentTrack?.artist_name || "Scanning Nexus"}
          </p>
        </div>
      </div>

      {/* --- LIST --- */}
      <div className="space-y-4">
        {isLoading && tracks.length === 0 ? (
          <p className="text-center text-zinc-600 text-xs font-black uppercase tracking-widest animate-pulse mt-10">Fetching Neural Tracks...</p>
        ) : tracks.length === 0 ? (
          <p className="text-center text-red-500 text-xs font-black uppercase mt-10">Sync Failed: Check API Key</p>
        ) : (
          tracks.map((track, idx) => (
            <div 
              key={track.id} 
              onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
              className={`flex items-center justify-between p-4 rounded-[25px] border transition-all ${currentTrackIndex === idx ? 'bg-zinc-900 border-green-500' : 'bg-zinc-900/30 border-white/5 hover:bg-zinc-900/50'}`}
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <img src={track.image} className="w-12 h-12 rounded-xl object-cover" alt="art" />
                <div className="truncate">
                  <p className={`text-[11px] font-black uppercase italic truncate ${currentTrackIndex === idx ? 'text-green-500' : ''}`}>{track.name}</p>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase truncate">{track.artist_name}</p>
                </div>
              </div>
              <Heart size={16} className={likedTracks.includes(track.id) ? 'fill-red-500 text-red-500' : 'text-zinc-600'} />
            </div>
          ))
        )}
      </div>

      {/* --- MINI PLAYER --- */}
      <div className="fixed bottom-6 left-6 right-6 z-[100] bg-zinc-900/90 backdrop-blur-3xl border border-white/10 p-4 rounded-[35px] shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-4 max-w-[35%] overflow-hidden">
           <div className={`w-12 h-12 bg-zinc-800 rounded-2xl overflow-hidden flex-shrink-0 ${isPlaying ? 'animate-pulse' : ''}`}>
             {currentTrack?.image && <img src={currentTrack.image} className="w-full h-full object-cover" alt="cover" />}
           </div>
           <div className="truncate">
              <p className="text-[10px] font-black uppercase italic truncate">{currentTrack?.name || "Station Idle"}</p>
              <span className="text-[8px] text-green-500 font-bold uppercase">Streaming Live</span>
           </div>
        </div>

        <div className="flex items-center gap-6">
          <SkipBack onClick={prevTrack} size={20} className="text-zinc-500 active:scale-75 transition-all" />
          <button onClick={togglePlay} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center active:scale-90 shadow-lg">
            {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
          </button>
          <SkipForward onClick={nextTrack} size={20} className="text-zinc-500 active:scale-75 transition-all" />
        </div>
      </div>
    </div>
  );
}
