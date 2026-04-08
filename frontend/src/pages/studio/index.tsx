import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image as ImageIcon, Type, Sparkles, Layers, 
  Download, Share2, ArrowLeft, Plus, Wand2, Scissors, Frame
} from "lucide-react";
import { useLocation } from "wouter";

export default function RXStudio() {
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("templates");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGallery = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (entry) => setSelectedImage(entry.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#050505] text-white flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="p-4 flex justify-between items-center bg-black/80 backdrop-blur-2xl border-b border-white/10 z-50">
        <div className="flex items-center gap-4">
          <ArrowLeft onClick={() => setLocation('/hub')} className="text-zinc-400 active:scale-90" />
          <h1 className="text-lg font-black italic tracking-tighter uppercase">RX Studio</h1>
        </div>
        <button className="px-4 py-2 bg-white text-black text-[10px] font-black rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Export
        </button>
      </div>

      {/* CANVAS Area */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full aspect-[9/16] max-h-[70vh] bg-zinc-900 rounded-[30px] shadow-2xl border border-white/5 overflow-hidden relative"
        >
          {selectedImage ? (
            <img src={selectedImage} alt="Edit" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center" onClick={handleGallery}>
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                <Plus size={24} className="text-zinc-500" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">New Project</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* TOOLS MENU (Full Loaded) */}
      <div className="bg-zinc-900/90 backdrop-blur-3xl border-t border-white/10 p-6 pb-10 rounded-t-[40px]">
        <div className="flex justify-between items-center px-2 mb-8 overflow-x-auto gap-8 no-scrollbar">
          {[
            { id: 'templates', icon: Frame, label: 'Templates' },
            { id: 'gallery', icon: ImageIcon, label: 'Gallery', action: handleGallery },
            { id: 'text', icon: Type, label: 'Text' },
            { id: 'filters', icon: Wand2, label: 'AI Filters' },
            { id: 'edit', icon: Scissors, label: 'Tools' }
          ].map((tool) => (
            <button 
              key={tool.id}
              onClick={() => tool.action ? tool.action() : setActiveTab(tool.id)}
              className={`flex flex-col items-center gap-2 min-w-[50px] transition-all ${activeTab === tool.id ? 'text-cyan-400 scale-110' : 'text-zinc-500'}`}
            >
              <tool.icon size={22} />
              <span className="text-[8px] font-black uppercase tracking-widest">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Options Panel */}
        <div className="h-20 flex items-center">
            {activeTab === 'templates' && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-16 h-16 bg-zinc-800 rounded-xl border border-white/5 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-zinc-600">
                    T-{i}
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'filters' && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar w-full">
                {['Neon', 'Glow', 'B&W', 'Vintage', 'HDR'].map(f => (
                  <button key={f} className="px-4 py-2 bg-zinc-800 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {f}
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>

      <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
    </div>
  );
}
