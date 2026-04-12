import React, { useEffect, useRef, useState } from "react";
import { 
  Sparkles, Zap, Ghost, Eye, Layers, 
  ChevronRight, Mic, Video, Trash2, ArrowLeft, Type 
} from "lucide-react";
import { useLocation } from "wouter";

let rxCanvas: any = null;

export default function GodModeStudio() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMagicActive, setIsMagicActive] = useState(false);
  const [activeObject, setActiveObject] = useState<any>(null);

  useEffect(() => {
    const init = () => {
      // @ts-ignore
      const f = window.fabric;
      if (!f || rxCanvas) return;

      rxCanvas = new f.Canvas(canvasRef.current, {
        width: 340, height: 560, backgroundColor: "transparent",
        preserveObjectStacking: true,
      });

      rxCanvas.on("selection:created", (e: any) => setActiveObject(e.selected[0]));
      rxCanvas.on("selection:cleared", () => setActiveObject(null));
    };

    if (!(window as any).fabric) {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
      s.onload = init;
      document.body.appendChild(s);
    } else { init(); }

    return () => { if(rxCanvas) { rxCanvas.dispose(); rxCanvas = null; } };
  }, []);

  // --- 🛠️ FUNCTIONS FOR BUTTONS ---

  const addAiText = () => {
    // @ts-ignore
    const text = new window.fabric.Textbox("NEURAL TEXT", {
      left: 70, top: 200, width: 200, fontSize: 32,
      fill: "#00D1FF", fontFamily: "Impact", fontWeight: "bold",
      textAlign: "center", shadow: "0px 0px 15px rgba(0,209,255,0.8)"
    });
    rxCanvas.add(text).setActiveObject(text);
  };

  const deleteSelected = () => {
    if (activeObject) {
      rxCanvas.remove(activeObject);
      rxCanvas.discardActiveObject();
      setActiveObject(null);
    }
  };

  const masterRender = () => {
    const dataURL = rxCanvas.toDataURL({ format: 'png', quality: 1 });
    const link = document.createElement('a');
    link.download = 'RX-Nexus-Master-Render.png';
    link.href = dataURL;
    link.click();
    alert("🚀 Master Rendering Complete! File Saved.");
  };

  const applyMagicFx = () => {
    setIsMagicActive(!isMagicActive);
    if (!isMagicActive) {
      rxCanvas.setBackgroundColor('rgba(6, 182, 212, 0.1)', rxCanvas.renderAll.bind(rxCanvas));
    } else {
      rxCanvas.setBackgroundColor('transparent', rxCanvas.renderAll.bind(rxCanvas));
    }
  };

  return (
    <div className="h-screen w-screen bg-[#020202] text-white flex flex-col overflow-hidden">
      
      {/* 🔮 HEADER */}
      <header className="p-5 flex justify-between items-center bg-zinc-950/50 backdrop-blur-xl border-b border-white/5 z-50">
        <button onClick={() => setLocation("/studio")} className="p-2 bg-zinc-900 rounded-full active:scale-90">
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400">NEURAL ENGINE</span>
        </div>
        <button 
          onClick={masterRender}
          className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black flex items-center gap-2 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          MASTER RENDER <ChevronRight size={14} />
        </button>
      </header>

      {/* 📽️ CANVAS AREA */}
      <main className="flex-1 flex items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-black">
          <canvas ref={canvasRef} />
        </div>

        {/* Floating Delete Button */}
        {activeObject && (
          <button 
            onClick={deleteSelected}
            className="absolute top-10 right-10 p-4 bg-red-600 rounded-full shadow-lg active:scale-75 transition-all"
          >
            <Trash2 size={20} />
          </button>
        )}
      </main>

      {/* 🕹️ DOCK CONTROLS */}
      <div className="bg-zinc-950 p-8 rounded-t-[40px] border-t border-white/10">
        
        {/* Magic Trigger */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <button 
            onClick={applyMagicFx}
            className={`w-20 h-20 rounded-full flex items-center justify-center border-4 border-black shadow-2xl transition-all duration-500 ${isMagicActive ? 'bg-white text-black scale-110' : 'bg-cyan-500 text-black'}`}
          >
            <Sparkles size={24} className={isMagicActive ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
           <ToolItem icon={<Type />} label="AI Text" onClick={addAiText} />
           <ToolItem icon={<Video />} label="Cinema" onClick={() => alert("AI Cinema Node: Upload Video Source")} />
           <ToolItem icon={<Mic />} label="Vocal" onClick={() => setLocation("/studio/voice")} />
           <ToolItem icon={<Zap />} label="Neural FX" onClick={() => alert("Neural Effects Ready")} />
        </div>
      </div>
    </div>
  );
}

function ToolItem({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center group active:scale-90 transition-all">
      <div className="p-4 bg-zinc-900 rounded-[24px] text-zinc-400 group-hover:bg-cyan-500 group-hover:text-black">
        {icon}
      </div>
      <span className="text-[7px] font-black mt-2 tracking-widest uppercase">{label}</span>
    </button>
  );
}
