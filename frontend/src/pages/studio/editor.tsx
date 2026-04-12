import React, { useEffect, useRef, useState } from "react";
import { 
  Sparkles, Zap, ArrowLeft, Send, Loader2, ChevronRight, Type, Video, Mic, Layers
} from "lucide-react";
import { useLocation } from "wouter";

export default function GodModeStudio() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<any>(null);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadFabric = () => {
      // @ts-ignore
      if (window.fabric && canvasRef.current && !fabricRef.current) {
        // @ts-ignore
        fabricRef.current = new window.fabric.Canvas(canvasRef.current, {
          width: 340,
          height: 480,
          backgroundColor: "transparent",
        });
      }
    };

    if (!(window as any).fabric) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
      script.async = true;
      script.onload = loadFabric;
      document.body.appendChild(script);
    } else {
      loadFabric();
    }

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, []);

  const handleCommand = () => {
    if (!prompt.trim() || !fabricRef.current) return;
    
    setIsProcessing(true);

    // AI Simulation: Fighting Scene Logic
    setTimeout(() => {
      // @ts-ignore
      const fabric = window.fabric;
      
      // Creating a "Neural Layer" on canvas
      const aiLayer = new fabric.Textbox(prompt.toUpperCase(), {
        left: 20,
        top: 150,
        width: 300,
        fontSize: 22,
        fill: "#00D1FF",
        fontFamily: "Impact",
        textAlign: "center",
        fontWeight: "bold",
        shadow: "0px 0px 25px rgba(0, 209, 255, 1)",
        backgroundColor: "rgba(0,0,0,0.5)"
      });

      fabricRef.current.add(aiLayer);
      fabricRef.current.setActiveObject(aiLayer);
      fabricRef.current.renderAll();
      
      setIsProcessing(false);
      setPrompt(""); 
    }, 1500);
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col overflow-hidden">
      
      {/* 🔮 HEADER */}
      <header className="p-4 flex justify-between items-center bg-black/80 backdrop-blur-2xl border-b border-white/5 z-50">
        <button onClick={() => setLocation("/studio")} className="p-2 bg-zinc-900 rounded-full active:scale-75">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-cyan-400">NEURAL ENGINE</h2>
          <p className="text-[6px] text-zinc-500 font-bold tracking-[0.2em] mt-0.5 animate-pulse italic">STABLE_V1.0_ACTIVE</p>
        </div>
        <button className="bg-white text-black px-4 py-1.5 rounded-full text-[9px] font-black shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          MASTER RENDER
        </button>
      </header>

      {/* 📽️ PRODUCTION VIEWPORT */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]">
        
        <div className="relative rounded-[40px] overflow-hidden border border-cyan-500/20 shadow-[0_0_40px_rgba(0,0,0,1)] bg-black/40 backdrop-blur-md">
          <canvas ref={canvasRef} />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
              <Loader2 className="animate-spin text-cyan-500 mb-2" size={32} />
              <span className="text-[8px] font-black tracking-widest text-cyan-500 animate-pulse">GENERATING SCENE...</span>
            </div>
          )}
        </div>

        {/* ⌨️ COMMAND INPUT */}
        <div className="w-full max-w-[340px] mt-8 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[24px] blur opacity-20" />
          <div className="relative flex items-center bg-zinc-950/90 border border-white/10 rounded-[22px] p-2 pl-5 shadow-2xl">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
              placeholder="COMMAND YOUR AI..." 
              className="bg-transparent flex-1 text-[10px] font-bold outline-none text-white placeholder:text-zinc-800 tracking-wider"
            />
            <button 
              onClick={handleCommand}
              disabled={isProcessing}
              className="p-3.5 bg-cyan-500 rounded-2xl text-black active:scale-90 transition-all shadow-lg hover:rotate-3"
            >
              <Send size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      </main>

      {/* 🕹️ DOCK CONTROLS */}
      <div className="bg-zinc-950 p-8 pt-10 rounded-t-[48px] border-t border-white/10 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <button className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center border-8 border-[#050505] shadow-2xl active:scale-90 transition-all">
            <Sparkles size={28} className="text-black" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <ToolItem icon={<Type size={20}/>} label="TEXT" />
          <ToolItem icon={<Video size={20}/>} label="CINEMA" onClick={() => setLocation("/studio/video")} />
          <ToolItem icon={<Mic size={20}/>} label="VOICE" onClick={() => setLocation("/studio/voice")} />
          <ToolItem icon={<Layers size={20}/>} label="FX" />
        </div>
      </div>
    </div>
  );
}

function ToolItem({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group active:scale-75 transition-all">
      <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl text-zinc-500 group-hover:text-cyan-400 group-hover:border-cyan-500/30">
        {icon}
      </div>
      <span className="text-[7px] font-black text-zinc-600 tracking-widest uppercase">{label}</span>
    </button>
  );
}
