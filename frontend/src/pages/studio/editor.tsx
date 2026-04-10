import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, Download, Undo2, Redo2, Type, Box, Image as ImageIcon, 
  Music, Sparkles, Trash2, Layers, RotateCw, Plus, Wand2, Eraser,
  AlignLeft, AlignCenter, AlignRight, Bold, X, Search
} from 'lucide-react';

export default function ProEditor() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [showMusic, setShowMusic] = useState(false);

  // --- 🛠️ REAL ENGINE LOADER (Bina Terminal Ke) ---
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      const fabric = window.fabric;
      const c = new fabric.Canvas(canvasRef.current, {
        width: 350,
        height: 600,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true,
      });
      setCanvas(c);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // --- ⚡ REAL FUNCTIONS (Asli kaam karne wale) ---
  const addText = () => {
    if (!canvas) return;
    // @ts-ignore
    const text = new window.fabric.IText('Race-X Text', {
      left: 100,
      top: 100,
      fontFamily: 'sans-serif',
      fontSize: 28,
      fill: '#000000',
    });
    canvas.add(text).setActiveObject(text);
  };

  const addRect = () => {
    if (!canvas) return;
    // @ts-ignore
    const rect = new window.fabric.Rect({
      left: 100,
      top: 100,
      fill: '#00e1ff',
      width: 100,
      height: 100,
      rx: 10, ry: 10 // Rounded corners
    });
    canvas.add(rect).setActiveObject(rect);
  };

  const deleteSelected = () => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    canvas.discardActiveObject();
    canvas.remove(...activeObjects);
  };

  const exportAsImage = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({ format: 'png', quality: 1 });
    const link = document.createElement('a');
    link.download = 'RaceX_Design.png';
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden font-sans select-none">
      
      {/* 🔝 1. TOP BAR (Real Controls) */}
      <header className="h-14 border-b border-white/5 bg-zinc-900/90 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <button onClick={() => setLocation("/hub")} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <button className="p-2 opacity-50"><Undo2 size={16} /></button>
          <button className="p-2 opacity-50"><Redo2 size={16} /></button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={exportAsImage} className="bg-cyan-500 text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest active:scale-95 shadow-lg shadow-cyan-500/20">
            Export
          </button>
          <button className="p-2.5 bg-zinc-800 rounded-full"><Download size={16}/></button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* 📂 2. LEFT SIDEBAR (Main Tools Panel) */}
        <aside className="w-20 bg-black border-r border-white/5 flex flex-col py-6 items-center gap-8 z-40">
           <SidebarTool icon={<Box size={20}/>} label="Shapes" onClick={addRect} />
           <SidebarTool icon={<Type size={20}/>} label="Text" onClick={addText} />
           <SidebarTool icon={<ImageIcon size={20}/>} label="Upload" onClick={() => {}} />
           <SidebarTool icon={<Music size={20}/>} label="Audio" onClick={() => setShowMusic(true)} />
           <div className="mt-auto">
             <SidebarTool icon={<Sparkles size={20}/>} label="Magic" onClick={() => {}} special />
           </div>
        </aside>

        {/* 🖼️ 3 & 4. CANVAS AREA (Real Interactivity) */}
        <div className="flex-1 bg-[#050505] relative flex flex-col items-center justify-center p-6 overflow-hidden">
          
          {/* 🧰 Editor Toolbar (Selected Element Controls) */}
          <div className="absolute top-6 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-6 shadow-2xl z-50">
              <button className="p-2 hover:text-cyan-400 transition-colors"><Bold size={16}/></button>
              <button className="p-2 hover:text-cyan-400 transition-colors"><AlignCenter size={16}/></button>
              <div className="h-4 w-[1px] bg-white/10" />
              <button onClick={deleteSelected} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={16}/></button>
          </div>

          {/* THE REAL DESIGN CANVAS */}
          <div className="relative shadow-[0_0_100px_rgba(0,225,255,0.15)] rounded-xl border-8 border-zinc-900 overflow-hidden bg-white">
            <canvas ref={canvasRef} />
          </div>

          {/* ⚙️ 5. BOTTOM QUICK CONTROLS */}
          <div className="absolute bottom-8 flex items-center gap-5 bg-zinc-900/90 px-8 py-4 rounded-[40px] border border-white/10 backdrop-blur-3xl shadow-2xl">
              <button onClick={addText} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center active:scale-75 transition-all shadow-xl">
                 <Plus size={24}/>
              </button>
              <div className="h-8 w-[1px] bg-white/5 mx-2" />
              <button className="p-3 text-zinc-500 hover:text-white"><Layers size={22}/></button>
              <button onClick={deleteSelected} className="p-3 text-red-500/60"><Trash size={22}/></button>
          </div>
        </div>

        {/* 🧠 Pro-Level Features (Floating AI Panel) */}
        <div className="w-16 bg-black border-l border-white/5 flex flex-col items-center py-10 gap-8">
           <button className="p-3.5 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/20 hover:bg-purple-500 hover:text-white transition-all">
             <Wand2 size={20}/>
           </button>
           <button className="p-3.5 text-zinc-600 hover:text-white"><Eraser size={20}/></button>
        </div>
      </div>

      {/* 🎵 Real Music Drawer (Slide-in) */}
      {showMusic && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowMusic(false)} />
          <div className="relative w-full max-w-sm bg-zinc-950 h-full border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-500 shadow-2xl">
             <div className="p-8 flex items-center justify-between border-b border-white/5">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">Music Library</h3>
                <button onClick={() => setShowMusic(false)} className="p-2 bg-white/5 rounded-full"><X size={18}/></button>
             </div>
             <div className="p-6 space-y-4 overflow-y-auto">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white/5 p-5 rounded-[25px] border border-transparent hover:border-cyan-500/30 flex items-center justify-between transition-all group active:scale-95">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center border border-white/5 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                          <Plus size={16}/>
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest">Nexus_Track_0{i}.wav</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarTool({ icon, label, onClick, special }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group active:scale-75 transition-all">
      <div className={`p-4 rounded-2xl transition-all ${special ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-zinc-900 text-zinc-500 hover:bg-white/5 hover:text-white'}`}>
        {icon}
      </div>
      <span className="text-[7px] font-black uppercase tracking-[0.15em] opacity-40 group-hover:opacity-100">{label}</span>
    </button>
  );
}
