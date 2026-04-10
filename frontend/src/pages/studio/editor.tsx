import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Music, Scissors, Sparkles, Type, X, Search, Volume2, Plus, Play, Pause } from 'lucide-react';

export default function ProEditor() {
  const [, setLocation] = useLocation();
  const [showMusic, setShowMusic] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const musicTracks = [
    { id: 1, title: "Race-X Phonk", artist: "Nexus Node", time: "0:30" },
    { id: 2, title: "Viral Flow", artist: "Indian Remix", time: "0:15" },
    { id: 3, title: "Cyber Beats", artist: "Studio AI", time: "1:00" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col font-sans select-none">
      
      {/* Top Header */}
      <header className="flex items-center justify-between p-6 z-40">
        <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 bg-zinc-900 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/5">Draft</button>
          <button className="px-6 py-2.5 bg-cyan-500 rounded-full text-[9px] font-black uppercase tracking-widest text-black shadow-lg shadow-cyan-500/20">Save</button>
        </div>
      </header>

      {/* Preview Canvas */}
      <main className="flex-1 relative flex items-center justify-center p-4">
        <div className="aspect-[9/16] h-[70vh] bg-zinc-900/40 rounded-[45px] border-2 border-white/5 overflow-hidden shadow-2xl relative">
          
          {/* Left Sidebar (Action Buttons) */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
             <ToolBtn icon={<Sparkles size={18}/>} label="AI Video" color="text-cyan-400" onClick={() => setLocation("/studio/video-gen")} />
             <ToolBtn icon={<Scissors size={18}/>} label="Trim" color="text-yellow-400" onClick={() => {}} />
             <ToolBtn icon={<Type size={18}/>} label="Text" color="text-white" onClick={() => {}} />
          </div>

          {/* Right Sidebar (Action Buttons) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
             <ToolBtn icon={<Music size={18}/>} label="Music" color="text-pink-500" onClick={() => setShowMusic(true)} />
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-5 italic font-black text-[10px] tracking-[1em] -rotate-90">Studio View</div>
        </div>
      </main>

      {/* Control Footer */}
      <footer className="p-10 flex flex-col items-center gap-6">
        <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black active:scale-90 transition-all">
          {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
        </button>
        <div className="w-full max-w-sm h-1 bg-zinc-900 rounded-full relative overflow-hidden">
           <div className="absolute h-full bg-cyan-500 w-1/3 shadow-[0_0_10px_#00e1ff]" />
        </div>
      </footer>

      {/* Music Drawer (Facebook Style) */}
      {showMusic && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMusic(false)} />
          <div className="relative bg-zinc-900 rounded-t-[50px] h-[75vh] border-t border-white/10 flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto mt-4 mb-2" />
            <div className="p-8 flex items-center justify-between">
               <h3 className="text-sm font-black italic uppercase tracking-widest">Audio Library</h3>
               <button onClick={() => setShowMusic(false)} className="p-2 bg-white/5 rounded-full"><X size={18}/></button>
            </div>
            <div className="px-8 pb-4">
               <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                 <input type="text" placeholder="SEARCH TRACKS..." className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[9px] font-black outline-none focus:border-cyan-500/30 transition-all" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto px-8 pb-20 space-y-3">
              {musicTracks.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-4 bg-white/5 rounded-3xl border border-transparent active:border-cyan-500/40">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-zinc-600"><Volume2 size={16}/></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest">{t.title}</p>
                        <p className="text-[8px] font-bold text-zinc-600 uppercase italic">{t.artist} • {t.time}</p>
                      </div>
                   </div>
                   <button className="p-3 bg-white text-black rounded-full active:scale-75 transition-all"><Plus size={16}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolBtn({ icon, label, color, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 group active:scale-75 transition-all">
      <div className={`p-4 bg-black/80 backdrop-blur-xl rounded-[22px] border border-white/5 ${color} shadow-2xl group-hover:border-white/20`}>{icon}</div>
      <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500">{label}</span>
    </button>
  );
}
