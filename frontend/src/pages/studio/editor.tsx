import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, Music, Scissors, Sparkles, Type, 
  Sticker, Play, Pause, Save, X, Search, Volume2, Plus, Layers
} from 'lucide-react';

export default function ProEditor() {
  const [, setLocation] = useLocation();
  const [showMusic, setShowMusic] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock Music Data for Drawer
  const musicLibrary = [
    { id: 1, title: "Race-X Main Theme", artist: "Nexus Node", dur: "0:30" },
    { id: 2, title: "Cyberpunk Drift", artist: "Studio AI", dur: "0:15" },
    { id: 3, title: "Indian Viral Bass", artist: "Phonk Gen", dur: "1:00" },
    { id: 4, title: "Cinematic Mood", artist: "Director Cut", dur: "0:45" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col font-sans select-none">
      
      {/* --- TOP BAR (Standard Pro App Layout) --- */}
      <header className="flex items-center justify-between p-6 z-40">
        <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900/90 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 bg-zinc-900 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest">Draft</button>
          <button className="px-6 py-2.5 bg-white rounded-full text-[9px] font-black uppercase tracking-widest text-black shadow-xl">Export</button>
        </div>
      </header>

      {/* --- MAIN EDITING CANVAS --- */}
      <main className="flex-1 relative flex items-center justify-center p-4">
        <div className="aspect-[9/16] h-[72vh] bg-zinc-900/40 rounded-[45px] border-2 border-white/5 overflow-hidden shadow-2xl relative group">
          
          {/* Action Tools (Right Sidebar) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
             <EditBtn icon={<Music size={18}/>} label="Audio" color="text-pink-500" onClick={() => setShowMusic(true)} />
             <EditBtn icon={<Sparkles size={18}/>} label="AI Gen" color="text-cyan-400" onClick={() => setLocation("/magic/video-gen")} />
             <EditBtn icon={<Type size={18}/>} label="Text" color="text-purple-400" onClick={() => {}} />
             <EditBtn icon={<Scissors size={18}/>} label="Split" color="text-yellow-500" onClick={() => {}} />
             <EditBtn icon={<Layers size={18}/>} label="Overlay" color="text-green-500" onClick={() => {}} />
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-10">
             <p className="text-[10px] font-black uppercase tracking-[0.8em] -rotate-90">Studio Viewport</p>
          </div>
        </div>
      </main>

      {/* --- TIMELINE / FOOTER CONTROLS --- */}
      <footer className="p-10 flex flex-col items-center gap-6 bg-gradient-to-t from-black to-transparent">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black active:scale-90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
        </button>
        
        {/* Playback Seek Bar */}
        <div className="w-full max-w-sm h-1 bg-zinc-900 rounded-full relative">
           <div className="absolute inset-y-0 left-0 w-1/4 bg-cyan-500 shadow-[0_0_10px_#00e1ff]" />
        </div>
      </footer>

      {/* --- 🎵 FACEBOOK STYLE MUSIC DRAWER --- */}
      {showMusic && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowMusic(false)} />
          
          <div className="relative bg-zinc-900 rounded-t-[50px] h-[75vh] border-t border-white/10 flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto mt-4 mb-2" />
            
            <div className="p-8 flex items-center justify-between">
               <h3 className="text-sm font-black italic uppercase tracking-widest text-white">Audio Engine</h3>
               <button onClick={() => setShowMusic(false)} className="p-2 bg-white/5 rounded-full text-zinc-400"><X size={20}/></button>
            </div>

            <div className="px-8 pb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                <input 
                  type="text" 
                  placeholder="SEARCH SOUNDS..." 
                  className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[9px] font-black tracking-widest outline-none focus:border-pink-500/30 transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-8 space-y-4 pb-20">
              {musicLibrary.map((song) => (
                <div key={song.id} className="flex items-center justify-between p-5 bg-white/5 rounded-[30px] border border-transparent active:border-pink-500/40 transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/5">
                         <Volume2 size={16} className="text-zinc-600 group-active:text-pink-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-1">{song.title}</p>
                        <p className="text-[8px] font-bold text-zinc-600 uppercase italic">{song.artist} • {song.dur}</p>
                      </div>
                   </div>
                   <button className="p-3 bg-white text-black rounded-full active:scale-75 transition-all">
                      <Plus size={16} />
                   </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Side Action Button Component
function EditBtn({ icon, label, color, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 group active:scale-75 transition-all">
      <div className={`p-4 bg-black/80 backdrop-blur-xl rounded-[22px] border border-white/5 ${color} shadow-2xl group-hover:border-white/20`}>
        {icon}
      </div>
      <span className="text-[7px] font-black uppercase tracking-widest text-zinc-600">{label}</span>
    </button>
  );
}
