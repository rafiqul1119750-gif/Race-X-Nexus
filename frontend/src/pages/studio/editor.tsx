import React, { useEffect, useRef, useState } from "react";
import { 
  Sparkles, Zap, Ghost, Eye, Layers, 
  ChevronRight, Mic, Video, Trash2, Maximize2 
} from "lucide-react";
import { useLocation } from "wouter";

let rxCanvas: any = null;

export default function GodModeStudio() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMagicActive, setIsMagicActive] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  useEffect(() => {
    if (rxCanvas) return;
    const init = () => {
      // @ts-ignore
      const f = window.fabric;
      rxCanvas = new f.Canvas(canvasRef.current, {
        width: 340, height: 560, backgroundColor: "transparent",
        preserveObjectStacking: true, selectionColor: 'rgba(6, 182, 212, 0.3)',
        selectionLineWidth: 2
      });

      // Cinematic Glow Effect on Objects
      rxCanvas.on("after:render", () => {
        rxCanvas.contextContainer.shadowBlur = 20;
        rxCanvas.contextContainer.shadowColor = "rgba(6, 182, 212, 0.5)";
      });
    };

    if (!(window as any).fabric) {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
      s.onload = init;
      document.body.appendChild(s);
    } else { init(); }

    return () => { if(rxCanvas) { rxCanvas.dispose(); rxCanvas = null; } };
  }, []);

  return (
    <div className="h-screen w-screen bg-[#020202] text-white flex flex-col font-sans overflow-hidden">
      
      {/* 🔮 NEURAL HEADER */}
      <header className="p-5 flex justify-between items-center bg-gradient-to-b from-zinc-900/50 to-transparent backdrop-blur-xl border-b border-white/5 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.6)]">
            <Zap size={18} fill="black" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-widest text-white italic">NEURAL ENGINE v3</span>
            <span className="text-[7px] text-cyan-400 font-bold uppercase tracking-[0.3em]">Status: God Mode</span>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-zinc-900 border border-white/10 px-4 py-2 rounded-2xl text-[10px] font-black group hover:bg-white hover:text-black transition-all">
          MASTER RENDER <ChevronRight size={14} />
        </button>
      </header>

      {/* 📽️ THE CINEMATIC VOID */}
      <main className="flex-1 flex items-center justify-center p-6 relative">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 blur-[120px] pointer-events-none">
          <div className="w-80 h-80 bg-cyan-600 rounded-full" />
        </div>

        {/* The Main Screen */}
        <div className="relative z-10 rounded-[40px] border-[6px] border-zinc-900 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden bg-black ring-1 ring-white/10 group">
          <canvas ref={canvasRef} />
          
          {/* AI Helper Overlay */}
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-[8px] font-mono text-cyan-500 mb-1 tracking-widest">NEURAL FEEDBACK:</p>
            <p className="text-[9px] text-zinc-300 italic">"Lighting looks flat. Add AI Rim Light?"</p>
          </div>
        </div>

        {/* Side Floating Icons (The "Impossible" Controls) */}
        <div className="absolute right-6 flex flex-col gap-4">
          <ControlIcon icon={<Ghost />} label="Spirit" color="text-purple-400" />
          <ControlIcon icon={<Eye />} label="Focus" color="text-yellow-400" />
          <ControlIcon icon={<Layers />} label="Nodes" color="text-cyan-400" />
        </div>
      </main>

      {/* 🕹️ THE MAGIC DOCK */}
      <div className="relative bg-zinc-950/80 backdrop-blur-2xl p-8 rounded-t-[50px] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
        
        {/* Central Neural Trigger */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <button 
            onClick={() => setIsMagicActive(!isMagicActive)}
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 border-black shadow-2xl transition-all duration-700 ${isMagicActive ? 'bg-white text-black rotate-180' : 'bg-cyan-500 text-black'}`}
          >
            <Sparkles size={28} className={isMagicActive ? 'animate-bounce' : 'animate-pulse'} />
            <span className="text-[8px] font-black mt-1">MAGIC</span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8">
           <ToolItem icon={<Video />} label="Cinema" onClick={() => {}} />
           <ToolItem icon={<Mic />} label="Vocal" onClick={() => {}} />
           <ToolItem icon={<Zap />} label="FX" onClick={() => {}} />
           <ToolItem icon={<Trash2 />} label="Purge" onClick={() => {}} />
        </div>

        {/* The Impossible Scroller (Timeline replacement) */}
        <div className="mt-8 overflow-hidden relative">
          <div className="flex gap-2 animate-scroll-text whitespace-nowrap opacity-20 font-mono text-[10px] tracking-[0.5em] uppercase italic">
            Frame Syncing ... Neural Mapping ... Emotion Detection ... RTX Rendering ...
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlIcon({ icon, label, color }: any) {
  return (
    <button className={`w-12 h-12 bg-black/50 backdrop-blur-lg border border-white/5 rounded-2xl flex flex-col items-center justify-center transition-all hover:border-cyan-500/50 hover:scale-110 active:scale-90 shadow-2xl ${color}`}>
      {icon}
      <span className="text-[6px] font-black mt-1 uppercase tracking-tighter opacity-50">{label}</span>
    </button>
  );
}

function ToolItem({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center group">
      <div className="p-4 bg-zinc-900/50 rounded-[28px] text-zinc-500 border border-white/5 group-hover:bg-white group-hover:text-black group-hover:rounded-2xl transition-all duration-500">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <span className="text-[8px] font-black text-zinc-600 mt-3 uppercase tracking-widest group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}
