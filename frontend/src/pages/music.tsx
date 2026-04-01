import { Play, Pause, Music as MusicIcon, Bot, Heart, MoreHorizontal } from "lucide-react";
import { useGetMusicTracks } from "@workspace/api-client-react";
import { useAppContext } from "@/context/AppContext";

export default function Music() {
  const { data, isLoading } = useGetMusicTracks();
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useAppContext();

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(157,78,221,0.5)]"></div>
      </div>
    );
  }

  const tracks = data?.tracks || [];

  const handlePlayToggle = (track: any) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-end mb-8 glass-panel-purple p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=800&fit=crop')] bg-cover opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-0" />
        
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl shadow-[0_10px_40px_rgba(157,78,221,0.4)] z-10 border border-secondary/30 bg-secondary/20 flex items-center justify-center overflow-hidden">
          <MusicIcon className="w-16 h-16 text-secondary" />
        </div>
        <div className="z-10 flex-1">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">Featured Playlist</span>
          <h1 className="text-4xl md:text-5xl font-display font-black text-glow-purple text-white mb-2">Cyber Beats V.2</h1>
          <p className="text-white/70 text-sm">Curated AI-generated tracks for your next stream. Royalty free.</p>
          <div className="flex gap-4 mt-4">
            <button className="px-6 py-2 bg-secondary text-white font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(157,78,221,0.5)] btn-ripple">
              Play All
            </button>
            <button className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors btn-ripple">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 p-4 border-b border-white/5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <div className="w-8 text-center">#</div>
          <div>Title</div>
          <div className="hidden sm:block text-right pr-4">Plays</div>
          <div className="w-16 text-right">Time</div>
        </div>

        <div className="flex flex-col">
          {tracks.map((track, i) => {
            const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;
            
            return (
              <div 
                key={track.id} 
                onClick={() => handlePlayToggle(track)}
                className={`grid grid-cols-[auto_1fr_auto_auto] gap-4 p-3 items-center border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group ${currentTrack?.id === track.id ? 'bg-secondary/10' : ''}`}
              >
                <div className="w-8 text-center text-sm text-muted-foreground group-hover:text-white">
                  {isThisTrackPlaying ? (
                    <div className="flex gap-1 justify-center h-4 items-end">
                      <div className="w-1 bg-secondary animate-[bounce_1s_infinite]" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 bg-secondary animate-[bounce_1s_infinite]" style={{ animationDelay: '200ms' }} />
                      <div className="w-1 bg-secondary animate-[bounce_1s_infinite]" style={{ animationDelay: '400ms' }} />
                    </div>
                  ) : (
                    <span className="group-hover:hidden">{i + 1}</span>
                  )}
                  <Play className={`w-4 h-4 text-white hidden ${!isThisTrackPlaying ? 'group-hover:block mx-auto' : ''}`} />
                </div>
                
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                    <img src={track.coverUrl || "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=100&fit=crop"} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-bold truncate ${currentTrack?.id === track.id ? 'text-secondary text-glow-purple' : 'text-white'}`}>{track.title}</p>
                    <div className="flex items-center gap-2">
                      {track.isAiGenerated && (
                         <span className="text-[8px] bg-primary/20 text-primary border border-primary/30 px-1 rounded flex items-center gap-0.5"><Bot className="w-2 h-2" /> AI</span>
                      )}
                      <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block text-xs text-muted-foreground text-right pr-4">
                  {(track.plays / 1000).toFixed(1)}k
                </div>

                <div className="w-16 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                  <span>{formatDuration(track.duration)}</span>
                  <button className="opacity-0 group-hover:opacity-100 hover:text-white p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
