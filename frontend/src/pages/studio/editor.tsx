import React, { useEffect, useRef, useState } from "react";
import { 
  Play, Pause, Plus, Type, Image as ImageIcon, 
  Video, Wand2, Music, Trash2, Download, RefreshCcw 
} from "lucide-react";

// --- GLOBAL INSTANCE TO PREVENT MEMORY LEAKS ---
let globalCanvas: any = null;

export default function RXStudioFullPower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeObj, setActiveObj] = useState<any>(null);

  useEffect(() => {
    let animationId: number;

    const initCanvas = () => {
      if (!canvasRef.current || globalCanvas) return;

      // @ts-ignore
      const f = window.fabric;
      
      globalCanvas = new f.Canvas(canvasRef.current, {
        width: 360,
        height: 640,
        backgroundColor: "#000",
        preserveObjectStacking: true,
        renderOnAddRemove: false, // Performance Boost
        selection: true
      });

      // Optimized Animation Loop
      const renderLoop = () => {
        globalCanvas.renderAll();
        animationId = f.util.requestAnimFrame(renderLoop);
      };
      renderLoop();

      setCanvas(globalCanvas);

      // Events
      globalCanvas.on("selection:created", (e: any) => setActiveObj(e.selected[0]));
      globalCanvas.on("selection:cleared", () => setActiveObj(null));
    };

    // Lazy Load Fabric
    // @ts-ignore
    if (!window.fabric) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
      script.async = true;
      script.onload = initCanvas;
      document.body.appendChild(script);
    } else {
      initCanvas();
    }

    // 🔥 THE FIX: Cleanup on Unmount (Hanging prevent karne ke liye)
    return () => {
      if (globalCanvas) {
        // @ts-ignore
        window.fabric.util.cancelAnimFrame(animationId);
        globalCanvas.dispose();
        globalCanvas = null;
        setCanvas(null);
      }
    };
  }, []);

  // --- ACTIONS ---
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;

    setLoading(true);
    const url = URL.createObjectURL(file);
    const videoEl = document.createElement('video');
    videoEl.src = url;
    videoEl.muted = true;
    videoEl.loop = true;
    videoEl.playsInline = true;

    videoEl.onloadeddata = () => {
      videoEl.play();
      // @ts-ignore
      const fabVideo = new window.fabric.Image(videoEl, {
        left: 180, top: 320, originX: 'center', originY: 'center', objectCaching: false,
      });
      fabVideo.scaleToWidth(360);
      canvas.add(fabVideo);
      setLoading(false);
    };
  };

  const addText = () => {
    if (!canvas) return;
    // @ts-ignore
    const text = new window.fabric.Textbox("RX SUPERSTAR", {
      left: 100, top: 100, fontFamily: 'Impact', fill: '#ffffff', fontSize: 40, width: 200
    });
    canvas.add(text).setActiveObject(text);
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden font-sans">
      {/* HEADER */}
      <header className="p-4 flex justify-between items-center bg-zinc-950 border-b border-white/5 z-50">
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-black text-cyan-500 italic">RX STUDIO</span>
          <span className="text-[7px] text-zinc-500 uppercase tracking-widest">Live Engine</span>
        </div>
        <button onClick={() => alert("Rendering 4K Cinema...")} className="bg-white text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase shadow-lg active:scale-90 transition-all">
          FINALIZE
        </button>
      </header>

      {/* CANVAS AREA */}
      <main className="flex-1 flex items-center justify-center p-4 bg-[#080808] relative">
        <div className="relative rounded-[32px] overflow-hidden border-2 border-white/5 shadow-2xl">
          <canvas ref={canvasRef} />
        </div>

        {activeObj && (
          <div className="absolute top-8 bg-zinc-900/90 p-2 rounded-xl border border-white/10 flex gap-4 animate-in fade-in slide-in-from-top-2">
            <button onClick={() => { canvas.remove(activeObj); canvas.discardActiveObject(); }} className="text-red-500"><Trash2 size={20}/></button>
          </div>
        )}
      </main>

      {/* CONTROLS */}
      <div className="bg-zinc-950 rounded-t-[40px] p-6 pb-10 border-t border-white/5">
        <div className="flex justify-center -mt-14 mb-6">
          <button 
            onClick={() => setPlaying(!playing)}
            className="w-16 h-16 bg-cyan-500 text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            {playing ? <Pause fill="black" size={28}/> : <Play fill="black" size={28} className="ml-1"/>}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
          <button onClick={() => videoInputRef.current?.click()} className="flex flex-col items-center gap-2">
            <div className="p-4 bg-zinc-900 rounded-2xl text-zinc-400"><Video size={20}/></div>
            <span className="text-[8px] font-bold text-zinc-500">IMPORT</span>
          </button>
          <button onClick={addText} className="flex flex-col items-center gap-2">
            <div className="p-4 bg-zinc-900 rounded-2xl text-zinc-400"><Type size={20}/></div>
            <span className="text-[8px] font-bold text-zinc-500">TEXT</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="p-4 bg-zinc-900 rounded-2xl text-zinc-400"><Music size={20}/></div>
            <span className="text-[8px] font-bold text-zinc-500">AUDIO</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="p-4 bg-zinc-900 rounded-2xl text-zinc-400"><Wand2 size={20}/></div>
            <span className="text-[8px] font-bold text-zinc-500">AI FX</span>
          </button>
        </div>
      </div>

      <input type="file" ref={videoInputRef} hidden accept="video/*" onChange={handleVideoUpload} />
    </div>
  );
}
