import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image as ImageIcon, Type, Sparkles, Layers, 
  Download, Share2, ArrowLeft, Plus, Palette, Wand2 
} from "lucide-react";
import { useLocation } from "wouter";

export default function RXStudio() {
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("templates");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Functions ---
  const handleGalleryAccess = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (entry) => setSelectedImage(entry.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const templates = [
    { id: 1, name: 'Cyberpunk', style: 'bg-gradient-to-br from-blue-600 to-purple-700' },
    { id: 2, name: 'Minimal', style: 'bg-zinc-200' },
    { id: 3, name: 'Gold Rush', style: 'bg-gradient-to-tr from-yellow-500 to-orange-600' },
    { id: 4, name: 'Deep Space', style: 'bg-zinc-900' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* 🔝 HEADER */}
      <div className="p-5 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <ArrowLeft onClick={() => setLocation('/hub')} className="text-zinc-400 cursor-pointer" />
          <h1 className="text-xl font-black italic tracking-tighter uppercase">RX Studio <span className="text-cyan-400 text-[10px] ml-2 px-2 py-0.5 bg-cyan-500/10 rounded-full not-italic">Pro</span></h1>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-zinc-900 rounded-xl"><Share2 size={18} /></button>
          <button className="px-4 py-2 bg-cyan-500 text-black text-xs font-black rounded-xl uppercase tracking-widest flex items-center gap-2">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* 🖼️ CANVAS AREA (The Workspace) */}
      <div className="flex-1 p-6 flex items-center justify-center relative overflow-hidden">
        <motion.div 
          layoutId="canvas"
          className="w-full aspect-[4/5] max-w-sm bg-zinc-900 rounded-[40px] shadow-2xl border border-white/10 overflow-hidden relative"
        >
          {!selectedImage ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-4 border border-white/5 shadow-inner">
                <Plus size={32} className="text-zinc-500" />
              </div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Start a new creation</p>
              <button 
                onClick={handleGalleryAccess}
                className="mt-4 px-6 py-3 bg-white text-black text-[10px] font-black rounded-full uppercase tracking-tighter"
              >
                Pick from Gallery
              </button>
            </div>
          ) : (
            <img src={selectedImage} alt="Canvas" className="w-full h-full object-cover" />
          )}

          {/* Floating AI Tooltip */}
          <div className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
            <Wand2 size={16} className="text-amber-400" />
          </div>
        </motion.div>
      </div>

      {/* 🛠️ TOOLBAR (Loaded with Functions) */}
      <div className="bg-zinc-900/80 backdrop-blur-3xl border-t border-white/10 rounded-t-[40px] p-6">
        <div className="flex justify-around mb-6">
          <button onClick={() => setActiveTab('templates')} className={`flex flex-col items-center gap-1 ${activeTab === 'templates' ? 'text-cyan-400' : 'text-zinc-500'}`}>
            <Layers size={20} /><span className="text-[8px] uppercase font-bold tracking-widest">Templates</span>
          </button>
          <button onClick={handleGalleryAccess} className="flex flex-col items-center gap-1 text-zinc-500">
            <ImageIcon size={20} /><span className="text-[8px] uppercase font-bold tracking-widest">Gallery</span>
          </button>
          <button onClick={() => setActiveTab('text')} className={`flex flex-col items-center gap-1 ${activeTab === 'text' ? 'text-cyan-400' : 'text-zinc-500'}`}>
            <Type size={20} /><span className="text-[8px] uppercase font-bold tracking-widest">Text</span>
          </button>
          <button onClick={() => setActiveTab('ai')} className={`flex flex-col items-center gap-1 ${activeTab === 'ai' ? 'text-amber-400' : 'text-zinc-500'}`}>
            <Sparkles size={20} /><span className="text-[8px] uppercase font-bold tracking-widest">AI Filters</span>
          </button>
        </div>

        {/* Dynamic Options Panel */}
        <AnimatePresence mode="wait">
          {activeTab === 'templates' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {templates.map(tmp => (
                <div key={tmp.id} className={`flex-shrink-0 w-20 h-24 rounded-2xl ${tmp.style} border border-white/10 flex items-end p-2`}>
                  <span className="text-[8px] font-black uppercase text-white/70">{tmp.name}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-3">
              {['HDR', 'Glossy', 'Neon', 'Retro'].map(filter => (
                <button key={filter} className="p-3 bg-zinc-800 rounded-2xl border border-white/5 text-[9px] font-bold uppercase">
                  {filter}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden Gallery Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
}
