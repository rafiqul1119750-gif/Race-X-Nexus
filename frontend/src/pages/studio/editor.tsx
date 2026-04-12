import React, { useEffect, useRef, useState } from "react";
import { 
  Sparkles, Zap, ArrowLeft, Send, Loader2, Video, Mic, 
  Layers, Play, Download, Trash2, Maximize, Type, Music
} from "lucide-react";
import { useLocation } from "wouter";

// --- ⚙️ PRODUCTION CONFIG ---
const HF_API_KEY = "hf_xxxxxxxxxxxxxxxxxxxxxxxx"; // Bhai, yahan apni key zarur dalna

export default function NeuralEditor() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<any>(null);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'VISUAL' | 'AUDIO' | 'LAYERS'>('VISUAL');

  useEffect(() => {
    // Fabric.js Engine Initialization
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    script.onload = () => {
      if (canvasRef.current && !fabricRef.current) {
        // @ts-ignore
        fabricRef.current = new window.fabric.Canvas(canvasRef.current, {
          width: 320,
          height: 460,
          backgroundColor: "#000",
          preserveObjectStacking: true,
        });
      }
    };
    document.body.appendChild(script);
    return () => { if (fabricRef.current) fabricRef.current.dispose(); fabricRef.current = null; };
  }, []);

  // --- 🧠 NEURAL CORE FUNCTIONS ---

  const generateNeuralAsset = async () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setProgress(20);

    try {
      // 1. AI Scene Generation (HuggingFace)
      const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", {
        method: "POST",
        headers: { Authorization: `Bearer ${HF_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) throw new Error("API Error");
      setProgress(70);

      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);

      // 2. Add as Neural Layer to Fabric
      // @ts-ignore
      window.fabric.Image.fromURL(imgUrl, (img: any) => {
        img.set({ left: 0, top: 0, selectable: true });
        img.scaleToWidth(320);
        fabricRef.current.add(img);
        fabricRef.current.setActiveObject(img);
        fabricRef.current.renderAll();
        setProgress(100);
        setIsProcessing(false);
      });

    } catch (err) {
      alert("Neural Core Error: Check API Key");
      setIsProcessing(false);
    }
  };

  const addTextLayer = () => {
    // @ts-ignore
    const text = new window.fabric.IText("NEW TEXT", {
      left: 50, top: 100, fontSize: 24, fill: "#fff", fontFamily: "Impact"
    });
    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
  };

  const deleteSelected = () => {
    const active = fabricRef.current.getActiveObject();
    if (active) fabricRef.current.remove(active);
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col font-sans overflow-hidden">
      
      {/* 🔮 TOP PRO BAR */}
      <header className="p-4 flex justify-between items-center bg-black/80 backdrop-blur-xl border-b border-white/5 z-50">
        <button onClick={() => setLocation("/studio")} className="p-2.5 bg-zinc-900 rounded-full active:scale-75 transition-all">
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-3">
           <span className="text-[10px] font-black tracking-[0.3em] text-cyan-500 uppercase">Pro Studio Mode</span>
        </div>
        <div className="flex gap-2">
           <button onClick={deleteSelected} className="p-2.5 bg-red-500/10 text-red-500 rounded-xl"><Trash2 size={16}/></button>
           <button className="bg-white text-black px-5 py-2 rounded-xl text-[11px] font-black uppercase shadow-lg shadow-white/5">Export</button>
        </div>
      </header>

      {/* 📽️ CANVAS & TOOLS AREA */}
      <main className="flex-1 flex flex-col items-center justify-center relative p-4 bg-[radial-gradient(circle_at_center,_#111_0%,_#050505_100%)]">
        
        {/* Fabric Device Frame */}
        <div className="relative rounded-[32px] overflow-hidden border-4 border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] aspect-[9/13] bg-black">
          <canvas ref={canvasRef} />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 z-50">
               <Loader2 className="animate-spin text-cyan-400 mb-4" size={32} />
               <div className="w-full h-1 bg-zinc-800 rounded-full"><div className="h-full bg-cyan-500 transition-all" style={{width:`${progress}%`}}/></div>
               <p className="text-[8px] font-black tracking-widest text-cyan-500 mt-3 uppercase">Neural Rendering...</p>
            </div>
          )}
        </div>

        {/* 🛠️ SIDEBAR TOOLS (Vertical) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
           <ToolBtn icon={<Type size={18}/>} onClick={addTextLayer} />
           <ToolBtn icon={<Music size={18}/>} />
           <ToolBtn icon={<Layers size={18}/>} />
           <ToolBtn icon={<Maximize size={18}/>} />
        </div>
      </main>

      {/* ⌨️ COMMAND CENTER (The Input Area) */}
      <section className="bg-zinc-900/50 backdrop-blur-3xl border-t border-white/5 p-6 pb-10">
        <div className="max-w-md mx-auto">
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            <TabBtn label="Visuals" active={activeTab === 'VISUAL'} onClick={() => setActiveTab('VISUAL')} />
            <TabBtn label="Audio FX" active={activeTab === 'AUDIO'} onClick={() => setActiveTab('AUDIO')} />
            <TabBtn label="Layers" active={activeTab === 'LAYERS'} onClick={() => setActiveTab('LAYERS')} />
          </div>

          <div className="relative flex items-center bg-[#131314] rounded-3xl border border-white/10 p-2 pl-6 focus-within:border-cyan-500/50 transition-all shadow-2xl">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Inject new neural layer..."
              className="bg-transparent flex-1 py-3 text-sm outline-none placeholder:text-zinc-600"
            />
            <button 
              onClick={generateNeuralAsset}
              disabled={isProcessing}
              className="p-4 bg-cyan-600 rounded-2xl active:scale-90 transition-all shadow-lg shadow-cyan-900/20"
            >
              <Sparkles size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- HELPER UI ---
function ToolBtn({ icon, onClick }: any) {
  return (
    <button onClick={onClick} className="p-4 bg-zinc-900/80 border border-white/5 rounded-2xl active:scale-90 transition-all hover:bg-zinc-800">
      {icon}
    </button>
  );
}

function TabBtn({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-cyan-500 text-black' : 'bg-white/5 text-zinc-500'}`}
    >
      {label}
    </button>
  );
}
