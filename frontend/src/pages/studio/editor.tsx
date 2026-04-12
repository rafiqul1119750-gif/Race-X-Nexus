import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Type, Video, Trash2, Wand2, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

let canvasPtr: any = null; // Global pointer to avoid re-init hangs

export default function Editor() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<any>(null);

  useEffect(() => {
    let animId: number;
    const init = () => {
      if (!canvasRef.current || canvasPtr) return;
      // @ts-ignore
      const f = window.fabric;
      canvasPtr = new f.Canvas(canvasRef.current, {
        width: 360, height: 600, backgroundColor: "#000",
        preserveObjectStacking: true, renderOnAddRemove: false
      });

      const loop = () => {
        canvasPtr?.renderAll();
        animId = f.util.requestAnimFrame(loop);
      };
      loop();

      canvasPtr.on("selection:created", (e: any) => setActive(e.selected[0]));
      canvasPtr.on("selection:cleared", () => setActive(null));
    };

    if (!(window as any).fabric) {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
      s.onload = init;
      document.body.appendChild(s);
    } else { init(); }

    return () => {
      if (canvasPtr) {
        // @ts-ignore
        window.fabric.util.cancelAnimFrame(animId);
        canvasPtr.dispose();
        canvasPtr = null;
      }
    };
  }, []);

  const addText = () => {
    // @ts-ignore
    const t = new window.fabric.Textbox("RX TEXT", {
      left: 100, top: 100, fill: "#fff", fontSize: 30, fontFamily: 'Impact'
    });
    canvasPtr?.add(t).setActiveObject(t);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <header className="p-4 bg-zinc-950 flex justify-between items-center border-b border-white/5">
        <button onClick={() => setLocation("/studio")}><ArrowLeft size={20}/></button>
        <span className="text-xs font-black text-cyan-500 italic">RX STUDIO PRO</span>
        <button className="bg-white text-black text-[10px] px-4 py-1 rounded-full font-bold">EXPORT</button>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 relative">
        <div className="rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
          <canvas ref={canvasRef} />
        </div>
        {active && (
          <button onClick={() => { canvasPtr.remove(active); canvasPtr.discardActiveObject(); }} 
            className="absolute top-10 p-3 bg-red-600 rounded-full shadow-lg">
            <Trash2 size={18}/>
          </button>
        )}
      </main>

      <div className="bg-zinc-950 p-6 rounded-t-[40px] border-t border-white/5">
        <div className="flex justify-center -mt-14 mb-6">
          <button onClick={() => setPlaying(!playing)} className="w-14 h-14 bg-cyan-500 text-black rounded-full flex items-center justify-center shadow-xl active:scale-90">
            {playing ? <Pause size={24}/> : <Play size={24} className="ml-1"/>}
          </button>
        </div>
        <div className="flex justify-around items-center max-w-sm mx-auto">
          <button onClick={addText} className="flex flex-col items-center gap-1 opacity-80"><Type size={20}/><span className="text-[8px]">TEXT</span></button>
          <button className="flex flex-col items-center gap-1 opacity-80"><Video size={20}/><span className="text-[8px]">VIDEO</span></button>
          <button className="flex flex-col items-center gap-1 opacity-80"><Wand2 size={20}/><span className="text-[8px]">AI FX</span></button>
        </div>
      </div>
    </div>
  );
}
