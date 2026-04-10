import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, Download, Undo2, Redo2, Type, Box, Image as ImageIcon, 
  Music, Sparkles, Trash2, Layers, Plus, Wand2, Eraser, X, Bold, AlignCenter
} from 'lucide-react';

export default function ProEditor() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  useEffect(() => {
    // 1. Script load ho rahi hai ya nahi check karo
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // 2. Library load hone ke baad canvas initialize karo
      // @ts-ignore
      if (window.fabric && canvasRef.current) {
        // @ts-ignore
        const fCanvas = new window.fabric.Canvas(canvasRef.current, {
          width: 320,
          height: 580,
          backgroundColor: '#ffffff',
          preserveObjectStacking: true,
        });
        setCanvas(fCanvas);
        setIsLoaded(true);
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // --- Real Functions ---
  const addText = () => {
    // @ts-ignore
    if (canvas && window.fabric) {
      // @ts-ignore
      const text = new window.fabric.IText('Tap to Edit', {
        left: 50, top: 50, fontSize: 25, fill: '#333'
      });
      canvas.add(text).setActiveObject(text);
    }
  };

  const addRect = () => {
    // @ts-ignore
    if (canvas && window.fabric) {
      // @ts-ignore
      const rect = new window.fabric.Rect({
        left: 100, top: 100, fill: '#00e1ff', width: 80, height: 80, rx: 8, ry: 8
      });
      canvas.add(rect).setActiveObject(rect);
    }
  };

  const deleteEl = () => {
    if (canvas) {
      const active = canvas.getActiveObjects();
      canvas.remove(...active);
      canvas.discardActiveObject().renderAll();
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col overflow-hidden font-sans">
      
      {/* HEADER */}
      <header className="h-14 border-b border-white/5 bg-zinc-900/90 flex items-center justify-between px-4 z-50">
        <button onClick={() => setLocation("/hub")} className="p-2"><ArrowLeft size={18} /></button>
        <div className="flex gap-2">
           {!isLoaded && <span className="text-[8px] text-cyan-500 animate-pulse">BOOTING ENGINE...</span>}
           <button onClick={() => canvas && canvas.toDataURL() && window.open(canvas.toDataURL())} className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Export</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT TOOLS */}
        <aside className="w-16 bg-black border-r border-white/5 flex flex-col py-6 items-center gap-8">
           <button onClick={addRect} className="p-3 text-zinc-500 hover:text-cyan-400"><Box size={20}/></button>
           <button onClick={addText} className="p-3 text-zinc-500 hover:text-cyan-400"><Type size={20}/></button>
           <button onClick={() => setShowMusic(true)} className="p-3 text-zinc-500 hover:text-pink-500"><Music size={20}/></button>
        </aside>

        {/* CANVAS AREA */}
        <main className="flex-1 bg-black relative flex flex-col items-center justify-center p-4">
          
          {/* Selected Tool Overlay */}
          <div className="absolute top-4 bg-zinc-900 border border-white/10 rounded-xl px-4 py-1.5 flex gap-4 z-20">
             <button className="text-zinc-400"><Bold size={14}/></button>
             <button className="text-zinc-400"><AlignCenter size={14}/></button>
             <button onClick={deleteEl} className="text-red-500"><Trash2 size={14}/></button>
          </div>

          {/* ASLI CANVAS CONTAINER */}
          <div className="relative shadow-2xl rounded-lg border-4 border-zinc-800 bg-white overflow-hidden">
             <canvas ref={canvasRef} />
             {!isLoaded && (
               <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
               </div>
             )}
          </div>

          {/* QUICK ADD BUTTON */}
          <button onClick={addText} className="absolute bottom-6 w-12 h-12 bg-cyan-500 text-black rounded-full flex items-center justify-center shadow-lg active:scale-75 transition-all">
             <Plus size={24}/>
          </button>
        </main>

        {/* AI PANEL */}
        <aside className="w-14 bg-black border-l border-white/5 flex flex-col py-6 items-center gap-6">
           <button className="p-3 text-purple-400 bg-purple-500/10 rounded-xl"><Wand2 size={18}/></button>
           <button className="p-3 text-zinc-600"><Eraser size={18}/></button>
        </aside>
      </div>

      {/* MUSIC DRAWER */}
      {showMusic && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowMusic(false)} />
          <div className="relative w-72 bg-zinc-900 h-full p-6 animate-in slide-in-from-right">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-[10px] font-black tracking-widest uppercase">Audio</h3>
                <button onClick={() => setShowMusic(false)}><X size={18}/></button>
             </div>
             <div className="bg-black/50 p-4 rounded-xl text-[9px] font-bold">Track_01.mp3</div>
          </div>
        </div>
      )}
    </div>
  );
}
