import React, { useEffect, useRef, useState } from "react";
import { 
  Sparkles, Zap, ArrowLeft, Send, Loader2, ChevronRight, Type, Video, Mic, Layers, Plus
} from "lucide-react";
import { useLocation } from "wouter";

// --- IMPORTANT: Adding 'export default' to fix Render Build Error ---
export default function Editor() {
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
          height: 420, // Adjusted for Gemini layout
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
    
    // Neural Logic Simulation
    setTimeout(() => {
      // @ts-ignore
      const fabric = window.fabric;
      const layer = new fabric.Textbox(prompt.toUpperCase(), {
        left: 50, top: 150, width: 240, fontSize: 20,
        fill: "#fff", fontFamily: "sans-serif", textAlign: "center",
        backgroundColor: "rgba(0,209,255,0.1)", padding: 10
      });
      fabricRef.current.add(layer).setActiveObject(layer);
      setIsProcessing(false);
      setPrompt("");
    }, 1500);
  };

  return (
    <div className="h-screen w-screen bg-[#0E0E0E] text-[#E3E3E3] flex flex-col font-sans">
      
      {/* 💎 TOP NAV: Minimal Gemini Style */}
      <header className="p-4 flex justify-between items-center">
        <button onClick={() => setLocation("/studio")} className="p-2 hover:bg-zinc-800 rounded-full transition-all">
          <ArrowLeft size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium tracking-widest uppercase opacity-70">Nexus AI Studio</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-[11px] font-bold transition-all shadow-lg shadow-blue-900/20">
          EXPORT
        </button>
      </header>

      {/* 📽️ PREVIEW AREA (The Canvas) */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-3xl overflow-hidden bg-[#131314] border border-white/5 shadow-2xl">
          <canvas ref={canvasRef} />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Loader2 className="animate-spin text-blue-400" size={32} />
            </div>
          )}
        </div>
      </main>

      {/* ⌨️ THE PROMPT INTERFACE: Gemini-Inspired */}
      <div className="px-6 pb-8 pt-2">
        <div className="max-w-[360px] mx-auto space-y-4">
          
          {/* Action Chips (Separate Buttons) */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <Chip icon={<Video size={14}/>} label="Generate Video" />
            <Chip icon={<Mic size={14}/>} label="Voiceover" />
            <Chip icon={<Plus size={14}/>} label="Add Image" />
          </div>

          {/* Floating Input Bar */}
          <div className="relative flex flex-col bg-[#1E1F20] rounded-[28px] p-2 border border-white/5 focus-within:border-blue-500/50 transition-all shadow-xl">
            <textarea 
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt here..." 
              className="bg-transparent px-4 py-3 text-sm outline-none resize-none placeholder:text-zinc-500"
            />
            <div className="flex justify-between items-center px-2 pb-1">
              <div className="flex gap-1">
                <button className="p-2 text-zinc-400 hover:text-blue-400"><Layers size={18}/></button>
                <button className="p-2 text-zinc-400 hover:text-blue-400"><Zap size={18}/></button>
              </div>
              <button 
                onClick={handleCommand}
                disabled={!prompt.trim() || isProcessing}
                className={`p-3 rounded-2xl transition-all ${prompt.trim() ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-600'}`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Gemini Style Chips
function Chip({ icon, label }: { icon: any, label: string }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-[#1E1F20] border border-white/5 rounded-full whitespace-nowrap hover:bg-zinc-800 transition-all">
      <span className="text-blue-400">{icon}</span>
      <span className="text-[10px] font-medium text-zinc-300">{label}</span>
    </button>
  );
}
