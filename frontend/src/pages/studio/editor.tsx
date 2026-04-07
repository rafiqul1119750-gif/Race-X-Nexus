import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Play, Pause, Scissors, 
  Music, Image as ImageIcon, Video, 
  Wand2, Download, Plus, Layers, 
  Type, Trash2, Save, Share2
} from 'lucide-react';

const RaceXEditor = () => {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  // 🎞️ Multi-Media Layers Node (Video, Voice, Image)
  const tracks = [
    { id: 'v1', type: 'video', name: 'Main Scene.mp4', color: 'bg-cyan-500/20', icon: Video },
    { id: 'a1', type: 'voice', name: 'AI Narration.wav', color: 'bg-purple-500/20', icon: Music },
    { id: 'i1', type: 'image', name: 'AI_Overlay.png', color: 'bg-emerald-500/20', icon: ImageIcon },
  ];

  return (
    <div className="h-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">
      
      {/* 🟢 Header: Studio Controls */}
      <header className="p-5 pt-12 bg-zinc-950/90 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between z-30">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation('/hub')} className="p-2 bg-zinc-900 rounded-xl border border-zinc-800">
            <ChevronLeft className="w-5 h-5 text-zinc-400" />
          </button>
          <div>
            <h1 className="text-sm font-black italic uppercase tracking-tighter">NX-STUDIO <span className="text-cyan-400">EDITOR</span></h1>
            <p className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.4em]">Multi-Media Pipeline</p>
          </div>
        </div>
        
        <div className="flex gap-2">
           <button className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-500"><Save className="w-4 h-4" /></button>
           <button className="px-5 py-2 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
             Export <Download className="w-3.5 h-3.5 stroke-[3]" />
           </button>
        </div>
      </header>

      {/* 🟢 Master Preview Monitor */}
      <div className="flex-1 bg-[#050505] flex items-center justify-center p-6 relative group">
        <div className="w-full aspect-[9/16] max-h-[60vh] bg-zinc-900 rounded-[32px] border border-zinc-800 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Layer Compositing Area */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 to-purple-900/10" />
          
          {/* Centered Play Trigger */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all"
          >
            {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white translate-x-1" />}
          </button>
        </div>
      </div>

      {/* 🟢 Unified Timeline Engine (Video + Voice + Image) */}
      <div className="bg-zinc-950 border-t border-white/10 p-5 pb-12 z-30">
        
        {/* Timeline Metadata */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
             <button className="p-2 bg-zinc-900 rounded-lg text-zinc-500 hover:text-white"><Scissors className="w-4 h-4"/></button>
             <button className="p-2 bg-zinc-900 rounded-lg text-zinc-500 hover:text-purple-400"><Wand2 className="w-4 h-4"/></button>
             <button className="p-2 bg-zinc-900 rounded-lg text-zinc-500 hover:text-cyan-400"><Type className="w-4 h-4"/></button>
          </div>
          <div className="text-[10px] font-mono text-zinc-500 font-bold tracking-widest bg-black px-3 py-1 rounded-full border border-zinc-800">
             00:14:02 / 00:30:00
          </div>
        </div>

        {/* 🎞️ Multi-Track Layers Node */}
        <div className="space-y-2 mb-6">
          {tracks.map((track) => (
            <div 
              key={track.id}
              onClick={() => setSelectedLayer(track.id)}
              className={`h-12 w-full rounded-2xl flex items-center px-4 gap-4 transition-all border ${
                selectedLayer === track.id ? 'border-cyan-500/50 bg-zinc-900' : 'border-transparent bg-zinc-900/30'
              }`}
            >
              <track.icon className={`w-4 h-4 ${selectedLayer === track.id ? 'text-white' : 'text-zinc-600'}`} />
              <div className={`flex-1 h-8 rounded-xl ${track.color} relative overflow-hidden border border-white/5`}>
                 {/* Clip Visualizer */}
                 <div className="absolute top-0 left-[20%] w-[60%] h-full bg-white/10 border-x border-white/20" />
              </div>
            </div>
          ))}
        </div>

        {/* Add Asset Entry Node */}
        <div className="grid grid-cols-3 gap-3">
           <button className="flex items-center justify-center gap-2 py-4 bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-800 hover:border-cyan-500/50 transition-all group">
             <Video className="w-3.5 h-3.5 text-zinc-600 group-hover:text-cyan-400" />
             <span className="text-[8px] font-black uppercase text-zinc-600 group-hover:text-white">Add Video</span>
           </button>
           <button className="flex items-center justify-center gap-2 py-4 bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-800 hover:border-purple-500/50 transition-all group">
             <Music className="w-3.5 h-3.5 text-zinc-600 group-hover:text-purple-400" />
             <span className="text-[8px] font-black uppercase text-zinc-600 group-hover:text-white">Add Voice</span>
           </button>
           <button className="flex items-center justify-center gap-2 py-4 bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-800 hover:border-emerald-500/50 transition-all group">
             <ImageIcon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400" />
             <span className="text-[8px] font-black uppercase text-zinc-600 group-hover:text-white">Add Image</span>
           </button>
        </div>
      </div>

      {/* 🔴 Playhead Indicator */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-[2px] h-40 bg-cyan-500 z-40 pointer-events-none">
         <div className="w-3 h-3 bg-cyan-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#00E1FF]" />
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default RaceXEditor;
