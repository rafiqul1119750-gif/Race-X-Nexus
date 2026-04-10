import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, Download, Undo2, Redo2, Type, Box, Image as ImageIcon, 
  Music, Sparkles, Trash2, Layers, Plus, Wand2, Eraser, X, Bold, 
  AlignCenter, Home, LayoutTemplate, UploadCloud, Video, Palette, 
  Grid, Maximize, Share2, Search, RotateCw, Copy, Trash, AlignLeft, AlignRight,
  ChevronRight, GripVertical
} from 'lucide-react';

export default function ProEditor() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('elements');
  const [showMusic, setShowMusic] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      if (window.fabric && canvasRef.current) {
        // @ts-ignore
        const fCanvas = new window.fabric.Canvas(canvasRef.current, {
          width: 340,
          height: 550,
          backgroundColor: '#ffffff',
          preserveObjectStacking: true,
        });
        setCanvas(fCanvas);
        setIsLoaded(true);
      }
    };
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  // --- 🛠️ REAL ACTIONS ---
  const addText = () => {
    if (canvas) {
      // @ts-ignore
      const text = new window.fabric.IText('Double Tap to Edit', { left: 50, top: 100, fontSize: 24, fill: '#000' });
      canvas.add(text).setActiveObject(text);
    }
  };

  const addRect = () => {
    if (canvas) {
      // @ts-ignore
      const rect = new window.fabric.Rect({ left: 100, top: 100, fill: '#00e1ff', width: 100, height: 100, rx: 10, ry: 10 });
      canvas.add(rect).setActiveObject(rect);
    }
  };

  const deleteEl = () => { if (canvas) { canvas.remove(...canvas.getActiveObjects()); canvas.discardActiveObject().renderAll(); } };
  
  const duplicateEl = () => {
    if (canvas) {
      canvas.getActiveObject().clone((cloned: any) => {
        cloned.set({ left: cloned.left + 20, top: cloned.top + 20 });
        canvas.add(cloned).setActiveObject(cloned);
      });
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0A0A0A] text-white flex flex-col overflow-hidden font-sans select-none">
      
      {/* 🔝 1. TOP BAR (Header Controls) */}
      <header className="h-14 border-b border-white/5 bg-zinc-900/95 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <button onClick={() => setLocation("/hub")} className="p-2 hover:bg-white/5 rounded-lg"><Home size={18} /></button>
          <div className="h-4 w-[1px] bg-white/10 mx-1" />
          <button className="p-2 opacity-60"><Undo2 size={16} /></button>
          <button className="p-2 opacity-60"><Redo2 size={16} /></button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-cyan-400"><Maximize size={18}/></button>
          <button onClick={() => canvas && window.open(canvas.toDataURL())} className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg active:scale-95">
             <Download size={14} className="inline mr-1"/> Export
          </button>
          <button className="p-2 bg-zinc-800 rounded-full"><Share2 size={16}/></button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* 📂 2. LEFT SIDEBAR (The Full List) */}
        <aside className="w-16 bg-black border-r border-white/5 flex flex-col py-4 items-center gap-5 overflow-y-auto no-scrollbar">
           <SidebarIcon icon={<LayoutTemplate size={20}/>} label="Design" active={activeTab === 'design'} onClick={() => setActiveTab('design')} />
           <SidebarIcon icon={<Box size={20}/>} label="Elements" active={activeTab === 'elements'} onClick={() => setActiveTab('elements')} />
           <SidebarIcon icon={<Type size={20}/>} label="Text" active={activeTab === 'text'} onClick={() => { setActiveTab('text'); addText(); }} />
           <SidebarIcon icon={<UploadCloud size={20}/>} label="Uploads" active={activeTab === 'uploads'} onClick={() => setActiveTab('uploads')} />
           <SidebarIcon icon={<ImageIcon size={20}/>} label="Photos" active={activeTab === 'photos'} onClick={() => setActiveTab('photos')} />
           <SidebarIcon icon={<Video size={20}/>} label="Videos" active={activeTab === 'videos'} onClick={() => setActiveTab('videos')} />
           <SidebarIcon icon={<Music size={20}/>} label="Audio" active={activeTab === 'audio'} onClick={() => setShowMusic(true)} />
           <SidebarIcon icon={<Palette size={20}/>} label="Styles" active={activeTab === 'styles'} onClick={() => setActiveTab('styles')} />
           <div className="mt-auto pt-4 border-t border-white/5">
              <SidebarIcon icon={<Sparkles size={20}/>} label="Magic" onClick={() => {}} special />
           </div>
        </aside>

        {/* 🛠️ 3. EDITOR TOOLBAR (Top of Canvas) */}
        <div className="flex-1 bg-[#050505] relative flex flex-col items-center justify-center p-4">
          
          {/* Dynamic Tools - Shows when element is selected */}
          <div className="absolute top-4 bg-zinc-900/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-4 shadow-2xl z-40">
              <button className="p-1.5 hover:bg-white/5 rounded"><Bold size={16}/></button>
              <button className="p-1.5 hover:bg-white/5 rounded"><AlignCenter size={16}/></button>
              <div className="h-4 w-[1px] bg-white/10" />
              <button className="p-1.5 hover:bg-white/5 rounded text-cyan-400"><Layers size={16}/></button>
              <button className="p-1.5 hover:bg-white/5 rounded text-purple-400"><Sparkles size={16}/></button>
              <button onClick={deleteEl} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded"><Trash2 size={16}/></button>
          </div>

          {/* 🖼️ 4. CANVAS AREA */}
          <div className="relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-zinc-800 rounded-lg overflow-hidden bg-white">
             <canvas ref={canvasRef} />
             {!isLoaded && (
               <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
               </div>
             )}
          </div>

          {/* ⚙️ 5. BOTTOM QUICK CONTROLS */}
          <div className="absolute bottom-6 flex items-center gap-4 px-6 py-3 bg-zinc-900/80 backdrop-blur-xl rounded-[30px] border border-white/10">
              <button onClick={duplicateEl} className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
                <Copy size={18}/>
                <span className="text-[7px] font-bold uppercase">Duplicate</span>
              </button>
              <div className="h-8 w-[1px] bg-white/5" />
              <button onClick={addRect} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-xl active:scale-75 transition-all">
                <Plus size={24}/>
              </button>
              <div className="h-8 w-[1px] bg-white/5" />
              <button onClick={deleteEl} className="flex flex-col items-center gap-1 text-red-500/70 hover:text-red-500 transition-colors">
                <Trash size={18}/>
                <span className="text-[7px] font-bold uppercase">Delete</span>
              </button>
          </div>
        </div>

        {/* 🧠 BRAIN FEATURES (Magic Right Sidebar) */}
        <aside className="w-14 border-l border-white/5 bg-black flex flex-col items-center py-8 gap-8">
           <button title="Magic Eraser" className="p-3 bg-purple-500/10 text-purple-400 rounded-xl hover:bg-purple-500 hover:text-white transition-all"><Eraser size={20}/></button>
           <button title="Magic Edit" className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-white transition-all"><Wand2 size={20}/></button>
           <button title="BG Remover" className="p-3 text-zinc-600 hover:text-white"><Grid size={20}/></button>
        </aside>
      </div>

      {/* ⏱️ TIMELINE FOOTER */}
      <footer className="h-12 border-t border-white/5 bg-zinc-900 px-6 flex items-center gap-4">
         <button className="text-zinc-500"><RotateCw size={14}/></button>
         <div className="flex-1 h-1 bg-black rounded-full overflow-hidden">
            <div className="w-1/4 h-full bg-cyan-500" />
         </div>
         <span className="text-[9px] font-mono text-zinc-500 tracking-tighter">00:01 / 00:05</span>
      </footer>
    </div>
  );
}

function SidebarIcon({ icon, label, active, onClick, special }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 group active:scale-75 transition-all ${active ? 'text-cyan-400' : 'text-zinc-500'}`}>
      <div className={`p-2.5 rounded-xl transition-all ${active ? 'bg-cyan-500/10' : 'hover:bg-white/5'} ${special ? 'bg-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : ''}`}>
        {icon}
      </div>
      <span className="text-[6px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
