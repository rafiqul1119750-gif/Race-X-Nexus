import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Disc, Heart, Search, ListMusic, MoreVertical, RefreshCw, Music } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { databases } from "../../lib/appwrite"; 

const DATABASE_ID = 'Race-X-Nexus';
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

  // 🛡️ API Injection & Data Fetching
  useEffect(() => {
    const initMusicEngine = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const config = response.documents.find(doc => doc.service_name === 'RX_MUSIC');
        
        if (config) {
          setMusicApiKey(config.key_value);
          fetchJamendoTracks(config.key_value);
        }
      } catch (error) {
        console.error("Nexus Link Failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initMusicEngine();
  }, []);

  const fetchJamendoTracks = async (key: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${key}&format=jsonpost&limit=15&order=popularity_week&hasimage=true`);
      const data = await res.json();
      if (data.results) setTracks(data.results);
    } catch (err) {
      console.error("Music Fetch Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔊 BACKGROUND & LOCKSCREEN LOGIC (Media Session)
  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.name,
        artist: currentTrack.artist_name,
        album: 'Race-X Nexus',
        artwork: [
          { src: currentTrack.image, sizes: '512x512', type: 'image/jpeg' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', togglePlay);
      navigator.mediaSession.setActionHandler('pause', togglePlay);
      navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
      navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
    }
  }, [currentTrack, isPlaying]);

  // 🎮 Control Logic
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Playback failed:", e));
      // Wake lock logic to keep CPU active if supported
      if ('wakeLock' in navigator) {
        (navigator as any).wakeLock.request('screen').catch(() => {});
      }
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

  const handleLike = (id: string) => {
    setLikedTracks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-40 font-sans selection:bg-green-500/20">
      
      <audio 
        ref={audioRef} 
        src={currentTrack?.audio} 
        onEnded={nextTrack} 
        autoPlay={isPlaying}
        preload="auto"
      />

      {/* --- HEADER --- */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900/80 rounded-2xl active:scale-75 transition-all border border-white/5">
            <ArrowLeft size={18} />
          </button>
          <div className="flex flex-col">
             <h1 className="text-lg font-black italic uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">RX Music</h1>
             <span className="text-[6px] font-black text-zinc-600 uppercase tracking-[0.4em]">
               {isLoading ? "Syncing..." : musicApiKey ? "Neural Engine Active" : "Nexus Link Required"}
             </span>
          </div>
        </div>
        <div className="flex gap-4 text-zinc-400">
          <Search 
            size={22} 
            className="hover:text-green-500 transition-colors cursor-pointer active:scale-90" 
            onClick={() => musicApiKey && fetchJamendoTracks(musicApiKey)}
          />
          <ListMusic size={22} className="hover:text-green-500 transition-colors cursor-pointer" />
        </div>
      </header>

      {/* --- FEATURED BANNER --- */}
      <div className="relative h-64 rounded-[45px] overflow-hidden border border-white/10 mb-10 group bg-gradient-to-br from-zinc-800 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
        <Disc size={180} className={`absolute -right-12 -top-12 text-white/5 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
        
        <div className="absolute bottom-8 left-8 z-20">
          <h2 className="text-4xl font-black italic uppercase leading-none truncate max-w-[250px]">
            {currentTrack?.name || "Ready to Stream"}
          </h2>
          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-2">
            {currentTrack?.artist_name || "Nexus Music Node"}
          </p>
        </div>
      </div>

      {/* --- LIVE MUSIC FEED --- */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-1">Neural Tracks</h3>
          <button onClick={() => musicApiKey && fetchJamendoTracks(musicApiKey)} className="text-[9px] font-bold text-green-500 uppercase flex items-center gap-2">
             <RefreshCw size={10} className={isLoading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
        
        <div className="space-y-4">
          {tracks.map((track, idx) => (
            <div 
              key={track.id} 
              onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
              className={`group flex items-center justify-between p-4 rounded-[25px] border transition-all cursor-pointer ${currentTrackIndex === idx ? 'bg-zinc-900/80 border-green-500/50' : 'bg-zinc-900/30 border-white/5 hover:border-green-500/30'}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl overflow-hidden">
                  <img src={track.image} alt="art" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className={`text-[11px] font-black uppercase italic ${currentTrackIndex === idx ? 'text-green-500' : ''}`}>{track.name}</p>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase">{track.artist_name}</p>
                </div>
              </div>
              <div className="flex gap-4 text-zinc-600 items-center">
                <Heart 
                  size={16} 
                  className={`cursor-pointer transition-all ${likedTracks.includes(track.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  onClick={(e) => { e.stopPropagation(); handleLike(track.id); }}
                />
                <MoreVertical size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FIXED PLAYER --- */}
      <div className="fixed bottom-6 left-6 right-6 z-[100]">
        <div className="bg-zinc-900/90 backdrop-blur-3xl border border-white/10 p-4 rounded-[35px] shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4 max-w-[30%]">
             <div className="w-12 h-12 bg-green-500 rounded-[15px] overflow-hidden flex-shrink-0">
               {currentTrack?.image ? <img src={currentTrack.image} className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`} /> : <Disc size={24} className="m-auto mt-3 text-black" />}
             </div>
             <div className="hidden sm:block truncate">
                <p className="text-[10px] font-black uppercase italic truncate">{currentTrack?.name || "Station Idle"}</p>
                <span className="text-[8px] text-green-500 font-bold uppercase tracking-widest animate-pulse">Live Now</span>
             </div>
          </div>

          <div className="flex items-center gap-6">
            <SkipBack onClick={prevTrack} size={20} className="text-zinc-500 hover:text-white cursor-pointer active:scale-75 transition-all" />
            <button onClick={togglePlay} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg active:scale-90 hover:scale-105 transition-all">
              {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
            </button>
            <SkipForward onClick={nextTrack} size={20} className="text-zinc-500 hover:text-white cursor-pointer active:scale-75 transition-all" />
          </div>

          <div className="hidden md:block">
             <Heart 
               size={20} 
               className={`cursor-pointer ${currentTrack && likedTracks.includes(currentTrack.id) ? 'fill-red-500 text-red-500' : 'text-zinc-600'}`} 
               onClick={() => currentTrack && handleLike(currentTrack.id)}
             />
          </div>
        </div>
      </div>
    </div>
  );
}
