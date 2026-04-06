import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music as MusicIcon, Play, Pause, SkipForward, SkipBack, ListMusic, Sparkles, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Slider from '@/components/ui/slider'; // Custom Slider component

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const playlist = [
    { id: 1, title: "Neon Dreams", artist: "Race-X AI", duration: "2:45" },
    { id: 2, title: "Bollywood Lo-Fi", artist: "Nexus Gen", duration: "3:12" },
    { id: 3, title: "Dhaka Beats", artist: "Studio AI", duration: "1:58" },
  ];

  return (
    <div className="space-y-8 pb-32">
      {/* --- AI Music Generator Header --- */}
      <section className="bg-gradient-to-br from-blue-600/20 to-emerald-600/20 p-6 rounded-[2.5rem] border border-white/10 text-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Sparkles className="text-emerald-400 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black">AI Music Studio</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Create Beats with Prompt</p>
          <Button className="mt-6 bg-emerald-500 text-black hover:bg-emerald-400 font-black rounded-2xl px-8 shadow-xl shadow-emerald-500/20">
            Generate Track
          </Button>
        </div>
        <MusicIcon className="absolute -left-4 -bottom-4 w-32 h-32 text-white/5 -rotate-12" />
      </section>

      {/* --- Now Playing (The Visualizer Feel) --- */}
      <Card className="p-6 bg-secondary/20 border-white/10 backdrop-blur-3xl rounded-[2rem]">
        <div className="flex flex-col items-center">
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-40 h-40 bg-gradient-to-tr from-primary to-blue-500 rounded-full flex items-center justify-center p-1 mb-6 shadow-[0_0_40px_rgba(var(--primary),0.3)]"
          >
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center border-4 border-black">
              <MusicIcon size={48} className="text-primary opacity-50" />
            </div>
          </motion.div>
          
          <h3 className="text-xl font-black tracking-tight">{playlist[currentTrack].title}</h3>
          <p className="text-sm text-gray-500 font-bold">{playlist[currentTrack].artist}</p>
        </div>

        {/* --- Controls --- */}
        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold text-gray-600">0:45</span>
             <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-primary shadow-[0_0_10px_#fff]"></div>
             </div>
             <span className="text-[10px] font-bold text-gray-600">{playlist[currentTrack].duration}</span>
          </div>

          <div className="flex justify-center items-center gap-8">
            <button className="text-gray-400 hover:text-white active:scale-90 transition-transform"><SkipBack size={28} /></button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-gray-400 hover:text-white active:scale-90 transition-transform"><SkipForward size={28} /></button>
          </div>
        </div>
      </Card>

      {/* --- Playlist --- */}
      <section className="space-y-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <ListMusic size={16} /> My Library
        </h4>
        <div className="space-y-2">
          {playlist.map((track, idx) => (
            <div 
              key={track.id}
              onClick={() => setCurrentTrack(idx)}
              className={`p-4 rounded-2xl flex items-center justify-between border transition-all ${currentTrack === idx ? 'bg-primary/10 border-primary/30' : 'bg-secondary/10 border-transparent hover:bg-secondary/20'}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <MusicIcon size={18} className={currentTrack === idx ? 'text-primary' : 'text-gray-500'} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${currentTrack === idx ? 'text-primary' : 'text-white'}`}>{track.title}</p>
                  <p className="text-[10px] text-gray-500">{track.artist}</p>
                </div>
              </div>
              <p className="text-[10px] font-bold text-gray-600">{track.duration}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Music;
