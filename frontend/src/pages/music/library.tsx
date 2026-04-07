import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Play, Pause, Search, 
  Music2, Disc3, TrendingUp, Heart, 
  Plus, MoreVertical, Headphones
} from 'lucide-react';

const MusicLibrary = () => {
  const [, setLocation] = useLocation();
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);

  // 🎵 Audio Library Node (Trending & Library)
  const tracks = [
    { id: 1, title: 'Quantum Drift', artist: 'Cyber-X', duration: '2:45', plays: '1.2M' },
    { id: 2, title: 'Neon Pulse', artist: 'Nexus Beats', duration: '3:12', plays: '850K' },
    { id: 3, title: 'AI Dreams', artist: 'Magic Synth', duration: '2:10', plays: '2.5M' },
    { id: 4, title: 'Race-X Anthem', artist: 'Official RX', duration: '3:50', plays: '5M' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans overflow-x-hidden">
      
      {/* ✨ Top Glow Layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

      {/* 🟢 Header Node (Direct Hub Connection) */}
      <header className="flex justify-between items-center mb-10 pt-4 relative z-10">
        <button onClick={() => setLocation('/hub')} className="p-3 bg-zinc-900/80 rounded-2xl border border-zinc-800">
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <div className="text-center">
           <h1 className="text-sm font-black italic tracking-widest uppercase">RX <span className="text-purple-500">MUSIC</span></h1>
           <p className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.4em]">Audio Library v2.0</p>
        </div>
        <button className="p-3 bg-zinc-900/80 rounded-2xl border border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400" />
        </button>
      </header>

      {/* 🟢 Trending Hero Node */}
      <div className="mb-10 relative group">
         <div className="bg-gradient-to-br from-purple-600 to-cyan-500 p-8 rounded-[40px] flex flex-col justify-end h-56 shadow-[0_20px_50px_rgba(168,85,247,0.3)]">
            <TrendingUp className="w-10 h-10 text-white/50 absolute top-6 right-8" />
            <h2 className="text-3xl font-black italic tracking-tighter leading-none mb-2 uppercase">Trending <br/> Audio</h2>
            <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Featured in 50K+ Reels</p>
         </div>
      </div>

      {/* 🟢 Audio Library List Node */}
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Most Used Tracks</h3>
           <Headphones className="w-4 h-4 text-zinc-700" />
        </div>

        {tracks.map((track) => (
          <motion.div 
            key={track.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentTrack(track.id)}
            className={`flex items-center gap-4 p-4 rounded-3xl border transition-all ${
              currentTrack === track.id ? 'bg-zinc-900 border-purple-500/50 shadow-xl' : 'bg-zinc-900/30 border-white/5'
            }`}
          >
            <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center relative overflow-hidden group">
               <Disc3 className={`w-8 h-8 text-zinc-600 ${currentTrack === track.id ? 'animate-spin' : ''}`} />
               {currentTrack === track.id && (
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="flex gap-0.5 items-end h-4">
                       {[...Array(4)].map((_, i) => (
                         <motion.div key={i} animate={{ height: [4, 16, 8, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }} className="w-1 bg-purple-500 rounded-full" />
                       ))}
                    </div>
                 </div>
               )}
            </div>

            <div className="flex-1">
               <h4 className="text-[12px] font-black uppercase tracking-tight truncate">{track.title}</h4>
               <p className="text-[9px] font-bold text-zinc-500 uppercase mt-0.5">{track.artist}</p>
            </div>

            <div className="text-right flex items-center gap-3">
               <div className="hidden sm:block">
                  <p className="text-[8px] font-black text-zinc-700 uppercase">{track.plays} USES</p>
               </div>
               <button className="p-2 text-zinc-600 hover:text-white">
                  <Heart className="w-4 h-4" />
               </button>
               <button className="p-2 bg-zinc-800 rounded-xl">
                  <Plus className="w-4 h-4 text-cyan-400" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔴 Mini Player Node (Diagram: Play Music) */}
      {currentTrack && (
        <motion.div 
          initial={{ y: 100 }} 
          animate={{ y: 0 }} 
          className="fixed bottom-24 left-6 right-6 bg-white text-black p-4 rounded-[28px] shadow-[0_10px_40px_rgba(255,255,255,0.2)] flex items-center justify-between z-50"
        >
          <div className="flex items-center gap-4 flex-1">
             <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Music2 className="w-5 h-5 text-white" />
             </div>
             <div>
                <h5 className="text-[10px] font-black uppercase tracking-tighter truncate w-32">Now Playing...</h5>
                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest leading-none mt-1">Use in Reel</p>
             </div>
          </div>
          <div className="flex items-center gap-4 pr-2">
             <button onClick={() => setCurrentTrack(null)} className="p-2"><Pause className="w-6 h-6 fill-black" /></button>
             <button className="px-4 py-2 bg-black text-white rounded-xl text-[8px] font-black uppercase tracking-widest">Apply</button>
          </div>
        </motion.div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MusicLibrary;
