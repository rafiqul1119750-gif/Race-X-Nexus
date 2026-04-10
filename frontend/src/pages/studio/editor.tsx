import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Home, FileVideo, ImageIcon, Type, Sparkles, Plus, Trash2, 
  Layers, Music, MoveUp, MoveDown, X, RefreshCcw
} from 'lucide-react';

export default function VideoScreenStudio() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!canvasRef.current) return;
      // @ts-ignore
      const fCanvas = new window.fabric.Canvas(canvasRef.current, {
        width: 360, height: 620, backgroundColor: '#000',
        preserveObjectStacking: true,
      });
      setCanvas(fCanvas);

      // 🔥 CRITICAL: Yeh loop video ko frame-by-frame screen pe dikhayega
      // @ts-ignore
      window.fabric.util.requestAnimFrame(function render() {
        fCanvas.renderAll();
        // @ts-ignore
        window.fabric.util.requestAnimFrame(render);
      });

      fCanvas.on('selection:created', (e: any) => setActiveLayer(e.selected[0]));
      fCanvas.on('selection:cleared', () => setActiveLayer(null));
    };
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  // --- 🎥 VIDEO LOADING POWER ---
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;

    setLoading(true); // Loader chalu karo
    const url = URL.createObjectURL(file);
    const videoEl = document.createElement('video');
    
    videoEl.src = url;
    videoEl.muted = true;
    videoEl.loop = true;
    videoEl.playsInline = true;
    videoEl.crossOrigin = "anonymous";

    // Jab video ka data load ho jaye
    videoEl.onloadeddata = () => {
      videoEl.play(); // Background mein play karo
      
      // @ts-ignore
      const fabricVideo = new window.fabric.Image(videoEl, {
        left: 180,
        top: 310,
        originX: 'center',
        originY: 'center',
        objectCaching: false, // Important: Iske bina video update nahi hogi
      });

      fabricVideo.scaleToWidth(300);
      canvas.add(fabricVideo);
      canvas.setActiveObject(fabricVideo);
      canvas.renderAll();
      setLoading(false); // Loader band
    };

    // Error handling
    videoEl.onerror = () => {
      alert("Video load nahi ho payi!");
      setLoading(false);
    };
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">
      <header className="h-14 border-b border-white/5 bg-zinc-950 flex items-center justify-between px-4">
        <button onClick={() => setLocation("/hub")} className="p-2 bg-zinc-900 rounded-lg text-cyan-400"><Home size={18}/></button>
        <span className="text-[10px] font-black text-cyan-500">RX EDITOR PRO</span>
        <button onClick={() => canvas && window.open(canvas.toDataURL())} className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black">SAVE</button>
      </header>

      <div className="flex-1 flex relative">
        {/* Sidebar */}
        <aside className="w-20 bg-black border-r border-white/5 flex flex-col py-6 items-center gap-8">
           <button onClick={() => videoInputRef.current?.click()} className="flex flex-col items-center gap-2">
              <div className="p-4 bg-zinc-900 rounded-2xl text-cyan-500 shadow-lg shadow-cyan-500/10"><FileVideo/></div>
              <span className="text-[7px] font-black uppercase tracking-widest">Video</span>
           </button>
           <button onClick={() => {}} className="flex flex-col items-center gap-2">
              <div className="p-4 bg-zinc-900 rounded-2xl text-zinc-500"><Type/></div>
              <span className="text-[7px] font-black uppercase tracking-widest">Text</span>
           </button>
        </aside>

        {/* Editor Screen */}
        <main className="flex-1 flex flex-col items-center justify-center p-2 relative bg-[#050505]">
           {loading && (
             <div className="absolute z-50 flex flex-col items-center gap-2">
                <RefreshCcw className="animate-spin text-cyan-500" />
                <span className="text-[8px] font-bold text-cyan-500 uppercase tracking-widest">Processing Video...</span>
             </div>
           )}

           <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-black shadow-2xl">
              <canvas ref={canvasRef} />
           </div>

           {/* Controls */}
           {activeLayer && (
             <div className="absolute bottom-24 bg-zinc-900 border border-white/10 p-2 rounded-2xl flex items-center gap-4">
                <button onClick={() => canvas.bringForward(activeLayer)} className="p-2 text-cyan-400"><MoveUp size={18}/></button>
                <button onClick={() => { canvas.remove(activeLayer); setActiveLayer(null); }} className="p-2 text-red-500"><Trash2 size={18}/></button>
             </div>
           )}

           <button onClick={() => videoInputRef.current?.click()} className="absolute bottom-6 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl active:scale-75 transition-all">
              <Plus size={35}/>
           </button>
        </main>
      </div>

      <input type="file" ref={videoInputRef} hidden accept="video/*" onChange={handleVideoUpload} />
    </div>
  );
}
