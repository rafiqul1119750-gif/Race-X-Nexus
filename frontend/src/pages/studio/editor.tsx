import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, Download, Undo2, Redo2, Type, Box, Image as ImageIcon, 
  Music, Sparkles, Trash2, Plus, Wand2, Eraser, X, Home, 
  UploadCloud, Mic2, Play, Film, Layers, Cpu
} from 'lucide-react';

export default function ProEditor() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 1. Script injection logic (GitHub/Mobile ke liye safest)
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // 2. Library load hone ke baad 100ms ka buffer taaki DOM ready ho jaye
      setTimeout(() => {
        // @ts-ignore
        if (window.fabric && canvasRef.current) {
          try {
            // @ts-ignore
            const fCanvas = new window.fabric.Canvas(canvasRef.current, {
              width: 340,
              height: 560,
              backgroundColor: '#ffffff',
              preserveObjectStacking: true,
            });
            setCanvas(fCanvas);
            setIsLoaded(true);
          } catch (err) {
            console.error("Canvas Init Error:", err);
            setError(true);
          }
        }
      }, 100);
    };

    script.onerror = () => setError(true);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col overflow-hidden font-sans">
      
      {/* 🔝 HEADER */}
      <header className="h-14 border-b border-white/5 bg-zinc-900/90 flex items-center justify-between px-4 z-50">
        <button onClick={() => setLocation("/hub")} className="p-2"><Home size={18} /></button>
        <div className="flex items-center gap-2">
           {!isLoaded && !error && <span className="text-[8px] text-cyan-500 animate-pulse tracking-widest uppercase font-black">Booting Engine...</span>}
           {error && <span className="text-[8px] text-red-500 font-black tracking-widest uppercase">Engine Crash - Refresh Page</span>}
           <button className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-lg active:scale-95 transition-all">Export</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* 📂 SIDEBAR */}
        <aside className="w-20 bg-black border-r border-white/5 flex flex-col py-6 items-center gap-8">
           <button className="p-3.5 bg-zinc-900 rounded-2xl text-zinc-500 hover:text-cyan-400 transition-all"><Box size={20}/></button>
           <button className="p-3.5 bg-zinc-900 rounded-2xl text-zinc-500 hover:text-cyan-400 transition-all"><Type size={20}/></button>
           <button onClick={() => setLocation("/studio/voice-lab")} className="p-3.5 bg-zinc-900 rounded-2xl text-zinc-500 hover:text-cyan-400 transition-all"><Mic2 size={20}/></button>
           <div className="mt-auto">
              <button onClick={() => setLocation("/magic/ai-chat")} className="p-4 bg-purple-500/20 rounded-2xl text-purple-400 border border-purple-500/10 shadow-lg shadow-purple-500/20"><Sparkles size={20}/></button>
           </div>
        </aside>

        {/* 🖼️ CANVAS AREA */}
        <main className="flex-1 bg-black relative flex flex-col items-center justify-center p-4">
          
          {/* THE MASTER CANVAS CONTAINER */}
          <div className="relative shadow-[0_0_80px_rgba(0,225,255,0.1)] rounded-xl border-[6px] border-zinc-900 bg-white overflow-hidden active:scale-[0.99] transition-transform">
             <canvas ref={canvasRef} />
             
             {/* LOADING/ERROR OVERLAYS (Black screen ko rokne ke liye) */}
             {!isLoaded && !error && (
               <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-4">
                  <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  <Cpu className="text-cyan-500 animate-pulse" size={20} />
               </div>
             )}
             {error && (
               <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-red-500 font-black text-[10px] uppercase mb-2 underline underline-offset-4">Critical Error</span>
                  <p className="text-zinc-500 text-[8px] font-bold">Network slow hai ya script block ho rahi hai. Kripya refresh karein.</p>
               </div>
             )}
          </div>

          {/* ⚙️ QUICK CONTROLS */}
          <div className="absolute bottom-10 flex items-center gap-6 px-8 py-4 bg-zinc-900/80 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl">
              <button className="text-zinc-500 hover:text-white transition-all"><Layers size={20}/></button>
              <button className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-xl active:scale-75 transition-all">
                <Plus size={30}/>
              </button>
              <button onClick={() => canvas && canvas.remove(...canvas.getActiveObjects())} className="text-red-500/60 hover:text-red-500"><Trash2 size={20}/></button>
          </div>
        </main>
      </div>

      <footer className="h-8 bg-zinc-950 flex items-center justify-center border-t border-white/5">
         <span className="text-[7px] font-black uppercase tracking-[0.5em] text-zinc-600">RX Studio Master Engine</span>
      </footer>
    </div>
  );
}
