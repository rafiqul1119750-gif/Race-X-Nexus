import React, { useEffect, useRef, useState } from "react";
import { 
  Sparkles, Zap, Eye, Layers, 
  ChevronRight, Mic, Video, Trash2, ArrowLeft, Type, Send 
} from "lucide-react";
import { useLocation } from "wouter";

// Global variable to keep track of the fabric canvas instance
let rxCanvas: any = null;

export default function GodModeStudio() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMagicActive, setIsMagicActive] = useState(false);
  const [activeObject, setActiveObject] = useState<any>(null);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const initCanvas = () => {
      // @ts-ignore
      const fabric = window.fabric;
      if (!fabric || rxCanvas) return;

      rxCanvas = new fabric.Canvas(canvasRef.current, {
        width: 340,
        height: 520,
        backgroundColor: "transparent",
        preserveObjectStacking: true,
      });

      // Selection Events
      rxCanvas.on("selection:created", (e: any) => setActiveObject(e.selected[0]));
      rxCanvas.on("selection:updated", (e: any) => setActiveObject(e.selected[0]));
      rxCanvas.on("selection:cleared", () => setActiveObject(null));
    };

    // Load Fabric.js if not present
    if (!(window as any).fabric) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
      script.onload = initCanvas;
      document.body.appendChild(script);
    } else {
      initCanvas();
    }

    return () => {
      if (rxCanvas) {
        rxCanvas.dispose();
        rxCanvas = null;
      }
    };
  }, []);

  // --- 🔥 CORE ENGINE FUNCTIONS ---

  const handleAiGeneration = () => {
    if (!prompt.trim()) return alert("Pehle prompt toh likho bhai!");
    
    // @ts-ignore
    const fabric = window.fabric;
    const aiText = new fabric.Textbox(prompt.toUpperCase(), {
      left: 50,
      top: 200,
      width: 250,
      fontSize: 28,
      fill: "#00D1FF",
      fontFamily: "Impact",
      textAlign: "center",
      fontWeight: "bold",
      shadow: "0px 0px 15px rgba(0,209,255,0.7)"
    });

    rxCanvas.add(aiText).setActiveObject(aiText);
    setPrompt(""); // Clear input
  };

  const deleteSelected = () => {
    if (activeObject) {
      rxCanvas.remove(activeObject);
      rxCanvas.discardActiveObject();
      setActiveObject(null);
    }
  };

  const toggleMagic = () => {
    setIsMagicActive(!isMagicActive);
    if (!isMagicActive) {
      rxCanvas.setBackgroundColor('rgba(0, 209, 255, 0.05)', rxCanvas.renderAll.bind(rxCanvas));
    } else {
      rxCanvas.setBackgroundColor('transparent', rxCanvas.renderAll.bind(rxCanvas));
    }
  };

  const masterRender = () => {
    const dataURL = rxCanvas.toDataURL({ format: 'png', quality: 1 });
    const link = document.createElement('a');
    link.download = `RX-NEXUS-RENDER-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    alert("🚀 MASTER RENDER: Your project has been exported to gallery!");
  };

  return (
    <div className="h-screen w-screen bg-[#020202] text-white flex flex-col overflow-hidden font-sans">
      
      {/* 🔮 TOP NAVIGATION */}
      <header className="p-4 flex justify-between items-center bg-zinc-950/80 backdrop-blur-2xl border-b border-white/5 z-50">
        <button onClick={() => setLocation("/studio")} className="p-2.5 bg-zinc-900 rounded-full active:scale-90 transition-transform">
          <ArrowLeft size={18} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-cyan-400">GOD MODE ENABLED</h2>
          <div className="flex items-center gap-1 mt-0.5">
             <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
             <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-widest">Neural Link Active</span>
          </div>
        </div>
        <button 
          onClick={masterRender}
          className="bg-white text-black px-4 py-2 rounded-full text-[9px] font-black flex items-center gap-1 shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95 transition-all"
        >
          MASTER RENDER <ChevronRight size={14} />
        </button>
      </header>

      {/* 📽️ PRODUCTION CANVAS */}
      <main className="flex-1 flex flex-col items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] px-4">
        
        {/* The Viewport */}
        <div className={`relative rounded-[40px] overflow-hidden border transition-all duration-700 shadow-2xl bg-black ${isMagicActive ? 'border-cyan-500/50 shadow-cyan-500/20' : 'border-white/10'}`}>
          <canvas ref={canvasRef} />
          
          {/* Active Overlay for Magic Mode */}
          {isMagicActive && <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-cyan-500/5 to-transparent animate-pulse" />}
        </div>

        {/* ⌨️ NEURAL PROMPT INPUT */}
        <div className="w-full max-w-[340px] mt-8 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[24px] blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-zinc-900/90 border border-white/10 rounded-[22px] p-2 pl-5 backdrop-blur-md">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiGeneration()}
              placeholder="COMMAND YOUR AI..." 
              className="bg-transparent flex-1 text-[10px] font-bold outline-none text-white placeholder:text-zinc-600 tracking-[0.1em]"
            />
            <button 
              onClick={handleAiGeneration}
              className="p-3.5 bg-cyan-500 rounded-2xl text-black active:scale-90 transition-all shadow-lg hover:rotate-12"
            >
              <Send size={16} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Floating Delete */}
        {activeObject && (
          <button 
            onClick={deleteSelected}
            className="absolute top-10 right-10 p-4 bg-red-600/20 border border-red-600/40 text-red-500 rounded-full backdrop-blur-xl animate-in zoom-in"
          >
            <Trash2 size={22} />
          </button>
        )}
      </main>

      {/* 🕹️ CONTROL HUB */}
      <div className="bg-zinc-950 p-8 pt-10 rounded-t-[48px] border-t border-white/10 relative">
        
        {/* CENTRAL TRIGGER */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <button 
            onClick={toggleMagic}
            className={`w-20 h-20 rounded-full flex items-center justify-center border-8 border-[#020202] shadow-2xl transition-all duration-500 ${isMagicActive ? 'bg-white text-black scale-110 rotate-180' : 'bg-cyan-500 text-black'}`}
          >
            <Sparkles size={26} className={isMagicActive ? 'animate-pulse' : ''} />
          </button>
        </div>

        {/* TOOLS GRID */}
        <div className="grid grid-cols-4 gap-6">
           <Tool icon={<Type size={22}/>} label="AI TEXT" onClick={handleAiGeneration} />
           <Tool icon={<Video size={22}/>} label="CINEMA" onClick={() => setLocation("/studio/video")} />
           <Tool icon={<Mic size={22}/>} label="VOCAL" onClick={() => setLocation("/studio/voice")} />
           <Tool icon={<Layers size={22}/>} label="FX" onClick={() => alert("Neural FX Layer Added")} />
        </div>
      </div>
    </div>
  );
}

function Tool({ icon, label, onClick }: { icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className="flex flex-col items-center gap-3 group active:scale-90 transition-all"
    >
      <div className="w-14 h-14 bg-zinc-900 border border-white/5 rounded-[22px] flex items-center justify-center text-zinc-500 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all shadow-xl">
        {icon}
      </div>
      <span className="text-[8px] font-black text-zinc-600 tracking-[0.2em] group-hover:text-white transition-colors uppercase">{label}</span>
    </button>
  );
}
