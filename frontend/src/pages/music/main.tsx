import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Heart, Search, ListMusic, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { databases } from "../../lib/appwrite"; 

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
      setIsLoading(true);
      try {
        // Appwrite connection test
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const config = response.documents.find(doc => doc.service_name === 'JAMENDO_MUSIC');
        
        if (config && config.key_value) {
          setMusicApiKey(config.key_value);
          await fetchJamendoTracks(config.key_value);
        } else {
          // Fallback: Agar Appwrite fail ho, toh direct key try karo (Aapki screenshot wali key)
          const fallbackKey = "3374dacb3c471aeb8"; // From your Appwrite Row 1
          setMusicApiKey(fallbackKey);
          await fetchJamendoTracks(fallbackKey);
        }
      } catch (error) {
        console.error("Nexus Link Error - Using Manual Sync");
        const manualKey = "3374dacb3c471aeb8"; 
        setMusicApiKey(manualKey);
        await fetchJamendoTracks(manualKey);
      } finally {
        setIsLoading(false);
      }
    };
    initMusicEngine();
  }, []);

  const fetchJamendoTracks = async (key: string) => {
    try {
      const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${key.trim()}&format=json&limit=20&order=popularity_week&hasimage=true`);
      const data = await res.json();
      if (data.results) setTracks(data.results);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); } 
    else { audioRef.current.play().catch(() => {}); }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-40 font-sans">
      <audio ref={audioRef} src={currentTrack?.audio} onEnded={nextTrack} autoPlay={isPlaying} key={currentTrack?.id} />

      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75"><ArrowLeft size={18} /></button>
          <div>
             <h1 className="text-lg font-black italic uppercase text-green-500 tracking-tighter">RX Music</h1>
             <span className="text-[6px] font-black text-zinc-600 uppercase">
               {musicApiKey ? "Neural Sync Active" : "Nexus Link Missing"}
             </span>
          </div>
        </div>
        <div className="flex gap-4">
          <RefreshCw size={20} className={`text-zinc-500 ${isLoading ? 'animate-spin' : ''}`} onClick={() => musicApiKey && fetchJamendoTracks(musicApiKey)} />
          <ListMusic size={22} className="text-zinc-500" />
        </div>
      </header>

      {/* Track Display */}
      <div className="relative h-72 rounded-[45px] overflow-hidden border border-white/10 mb-10 bg-zinc-900">
        <img src={currentTrack?.image} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black" />
        <div className="absolute bottom-10 left-10">
          <h2 className="text-3xl font-black italic uppercase truncate max-w-[250px]">{currentTrack?.name || "Initializing..."}</h2>
          <p className="text-[10px] font-black text-green-500 uppercase mt-2">{currentTrack?.artist_name || "Nexus Ready"}</p>
        </div>
      </div>

      {/* Music List */}
      <div className="space-y-4">
        {tracks.map((track, idx) => (
          <div key={track.id} onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }} className={`flex items-center justify-between p-4 rounded-[25px] border ${currentTrackIndex === idx ? 'bg-zinc-900 border-green-500' : 'bg-zinc-900/30 border-white/5'}`}>
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

      {/* Footer Player */}
      <div className="fixed bottom-6 left-6 right-6 bg-zinc-900/90 backdrop-blur-2xl p-4 rounded-[35px] border border-white/10 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4 max-w-[40%] truncate">
           <img src={currentTrack?.image} className={`w-12 h-12 rounded-2xl ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`} />
           <div className="truncate"><p className="text-[10px] font-black uppercase italic truncate">{currentTrack?.name || "Station Idle"}</p></div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={togglePlay} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center active:scale-90 transition-all">
            {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
          </button>
          <SkipForward onClick={nextTrack} size={20} className="text-zinc-500" />
        </div>
      </div>
    </div>
  );
}
