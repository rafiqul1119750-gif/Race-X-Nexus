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
    // 1. Fabric.js ko dynamic load karna zaroori hai
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    script.onload = () => {
      if (canvasRef.current && !fabricRef.current) {
        // @ts-ignore
        fabricRef.current = new window.fabric.Canvas(canvasRef.current, {
          width: 340,
          height: 480,
          backgroundColor: "transparent",
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, []);

  const handleCommand = () => {
    if (!prompt || !fabricRef.current) return;
    
    setIsProcessing(true);

    // AI Processing Simulation (Real Functionality)
    setTimeout(() => {
      // @ts-ignore
      const fabric = window.fabric;
      const neuralText = new fabric.Textbox(prompt.toUpperCase(), {
        left: 20,
        top: 150,
        width: 300,
        fontSize: 24,
        fill: "#00D1FF",
        fontFamily: "Impact",
        textAlign: "center",
        fontWeight: "bold",
        shadow: "0px 0px 20px rgba(0, 209, 255, 0.9)",
      });

      fabricRef.current.add(neuralText);
      fabricRef.current.setActiveObject(neuralText);
      fabricRef.current.renderAll();
      
      setIsProcessing(false);
      setPrompt(""); // Input clear karo
    }, 1000);
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col overflow-hidden font-sans">
      
      {/* 🔮 HEADER */}
      <header className="p-4 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/5 z-50">
        <button onClick={() => setLocation("/studio")} className="p-2 bg-zinc-900 rounded-full active:scale-75 transition-all">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-cyan-400 uppercase">God Mode Enabled</h2>
          <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Neural Link: Active</p>
        </div>
        <button className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black shadow-lg">
          MASTER RENDER
        </button>
      </header>

      {/* 📽️ PRODUCTION VIEWPORT */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
        
        <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-black">
          <canvas ref={canvasRef} />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center">
              <Loader2 className="animate-spin text-cyan-500" size={40} />
            </div>
          )}
        </div>

        {/* ⌨️ COMMAND INPUT */}
        <div className="w-full max-w-[340px] mt-8 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[24px] blur opacity-20" />
          <div className="relative flex items-center bg-zinc-900/90 border border-white/10 rounded-[22px] p-2 pl-5">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="COMMAND YOUR AI..." 
              className="bg-transparent flex-1 text-[10px] font-bold outline-none text-white placeholder:text-zinc-700 tracking-wider"
            />
            <button 
              onClick={handleCommand}
              className="p-3.5 bg-cyan-500 rounded-2xl text-black active:scale-90 transition-all shadow-xl"
            >
              <Send size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      </main>

      {/* 🕹️ CONTROL HUB */}
      <div className="bg-zinc-950 p-8 rounded-t-[48px] border-t border-white/10 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <button className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center border-8 border-[#050505] shadow-2xl">
            <Sparkles size={28} className="text-black" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-4">
          <button className="flex flex-col items-center gap-2"><div className="p-4 bg-zinc-900 rounded-2xl"><Type size={20}/></div><span className="text-[7px] font-black text-zinc-600">TEXT</span></button>
          <button onClick={() => setLocation("/studio/video-gen")} className="flex flex-col items-center gap-2"><div className="p-4 bg-zinc-900 rounded-2xl"><Video size={20}/></div><span className="text-[7px] font-black text-zinc-600">CINEMA</span></button>
          <button onClick={() => setLocation("/studio/voice-lab")} className="flex flex-col items-center gap-2"><div className="p-4 bg-zinc-900 rounded-2xl"><Mic size={20}/></div><span className="text-[7px] font-black text-zinc-600">VOICE</span></button>
          <button className="flex flex-col items-center gap-2"><div className="p-4 bg-zinc-900 rounded-2xl"><Layers size={20}/></div><span className="text-[7px] font-black text-zinc-600">FX</span></button>
        </div>
      </div>
    </div>
  );
}
