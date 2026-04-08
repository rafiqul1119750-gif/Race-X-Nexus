import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image as ImageIcon, Type, Sparkles, Layers, Download, 
  ArrowLeft, Plus, Wand2, Music, Mic2, Volume2, X 
} from "lucide-react";
import { useLocation } from "wouter";

export default function RXStudio() {
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Asset Data ---
  const musicList = ["Cyberpunk Drift", "Neon Nights", "Hyper-drive", "Lo-Fi Nexus", "Bass Cannon"];
  const sfxList = ["Whoosh 1", "Glitch Hit", "Retro Ping", "Cinematic Rise", "Metal Clang"];
  const voiceStyles = ["AI Male (Bold)", "AI Female (Soft)", "Robotic", "Anime Narrator"];

  const handleGallery = () => fileInputRef.current?.click();

  return (
    <div className="fixed inset-0 bg-[#050505] text-white flex flex-col overflow-hidden font-sans">
      
      {/* 🔝 TOP HEADER */}
      <div className="p-4 flex justify-between items-center bg-black/80 backdrop-blur-2xl border-b border-white/10 z-50">
        <div className="flex items-center gap-4">
          <ArrowLeft onClick={() => setLocation('/hub')} className="text-zinc-400 active:scale-75" />
          <h1 className="text-lg font-black italic tracking-tighter uppercase">RX Studio</h1>
        </div>
        <button className="px-5 py-2 bg-white text-black text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Export
        </button>
      </div>

      {/* 🖼️ MAIN CANVAS (Preview Area) */}
      <div className="flex-1 flex items-center justify-center p-6 relative bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]">
        <motion.div 
          className="w-full aspect-[9/16] max-h-[65vh] bg-zinc-900 rounded-[35px] shadow-2xl border border-white/5 overflow-hidden relative"
        >
          {selectedImage ? (
            <img src={selectedImage} alt="Canvas" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center" onClick={handleGallery}>
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                <Plus size={24} className="text-zinc-500" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Start Project</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* 🛠️ DYNAMIC ASSET DRAWER (The "Dedicated Place") */}
      <AnimatePresence>
        {activeDrawer && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed inset-x-0 bottom-0 bg-zinc-900/95 backdrop-blur-3xl border-t border-white/10 rounded-t-[40px] z-[60] p-6 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">{activeDrawer} Library</h2>
              <button onClick={() => setActiveDrawer(null)} className="p-2 bg-white/5 rounded-full"><X size={16}/></button>
            </div>

            <div className="max-h-[30vh] overflow-y-auto pr-2 space-y-3 no-scrollbar">
              {/* Conditional Lists based on activeDrawer */}
              {activeDrawer === 'Text' && (
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Type anything (Hindi, English, etc.)..." 
                    className="w-full bg-black border border-white/10 p-4 rounded-2xl text-sm focus:border-cyan-500 outline-none"
                  />
                  <div className="flex gap-2 flex-wrap">
                    {['Modern', 'Neon', 'Hindi Regular', 'Bangla Bold'].map(f => (
                      <button key={f} className="px-4 py-2 bg-zinc-800 rounded-lg text-[10px] font-bold">{f}</button>
                    ))}
                  </div>
                </div>
              )}

              {activeDrawer === 'Music' && musicList.map(song => (
                <div key={song} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 active:bg-cyan-500/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg"><Music size={14} className="text-cyan-400"/></div>
                    <span className="text-xs font-bold">{song}</span>
                  </div>
                  <Plus size={16} className="text-zinc-500"/>
                </div>
              ))}

              {activeDrawer === 'SFX' && sfxList.map(fx => (
                <div key={fx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Volume2 size={14} className="text-purple-400"/>
                    <span className="text-xs font-bold">{fx}</span>
                  </div>
                  <Plus size={16} className="text-zinc-500"/>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎮 BOTTOM NAVIGATION TOOLBAR */}
      <div className="bg-black/90 backdrop-blur-3xl border-t border-white/10 p-4 pb-8 flex justify-between items-center px-8 z-50">
        {[
          { id: 'Text', icon: Type, label: 'Text' },
          { id: 'Music', icon: Music, label: 'Songs' },
          { id: 'SFX', icon: Volume2, label: 'SFX' },
          { id: 'Voice', icon: Mic2, label: 'AI Voice' },
          { id: 'Visuals', icon: ImageIcon, label: 'Assets', action: handleGallery }
        ].map((tool) => (
          <button 
            key={tool.id}
            onClick={() => tool.action ? tool.action() : setActiveDrawer(tool.id)}
            className="flex flex-col items-center gap-1.5 transition-all active:scale-75"
          >
            <div className={`p-3 rounded-2xl ${activeDrawer === tool.id ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-zinc-900 text-zinc-400'}`}>
              <tool.icon size={20} />
            </div>
            <span className="text-[7px] font-black uppercase tracking-widest">{tool.label}</span>
          </button>
        ))}
      </div>

      <input type="file" ref={fileInputRef} onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (entry) => setSelectedImage(entry.target?.result as string);
          reader.readAsDataURL(file);
        }
      }} accept="image/*" className="hidden" />
    </div>
  );
}
