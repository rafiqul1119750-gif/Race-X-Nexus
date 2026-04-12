import React, { useEffect, useRef, useState } from "react";
import { 
  Sparkles, Zap, ArrowLeft, Send, Loader2, Video, Mic
} from "lucide-react";
import { useLocation } from "wouter";

// Real AI Generation require API Key (Replace with your own)
const HF_API_KEY = "hf_xxxxxxxxxxxxxxxxxxxxxxxx"; // HuggingFace Key

export default function AutoAiEditor() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<any>(null);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Dynamic Fabric.js Load
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    script.onload = () => {
      if (canvasRef.current && !fabricRef.current) {
        // @ts-ignore
        fabricRef.current = new window.fabric.Canvas(canvasRef.current, {
          width: 340, height: 480, backgroundColor: "transparent",
        });
      }
    };
    document.body.appendChild(script);

    return () => { if (fabricRef.current) fabricRef.current.dispose(); fabricRef.current = null; };
  }, []);

  // --- 🧠 REAL AI API CALL FUNCTIONS ---

  // 1. Scene Generation (Real Function)
  const generateScene = async (p: string) => {
    setProgress(20);
    // Real API Call to HuggingFace (Example: SDXL for image, can be changed to video model)
    const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", {
        method: "POST",
        headers: { Authorization: `Bearer ${HF_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: p }),
    });
    
    if (!response.ok) throw new Error("Scene generation failed");
    
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    
    return new Promise((resolve) => {
        // @ts-ignore
        window.fabric.Image.fromURL(objectURL, (img: any) => {
            img.set({ left: 0, top: 0, selectable: false });
            img.scaleToWidth(340);
            resolve(img);
        });
    });
  };

  // 2. Audio Generation (Simplified for demo)
  const generateAudio = async (p: string) => {
    setProgress(60);
    // In real scenario, connect to an audio gen API like Suno or Bark
    return new Promise((resolve) => {
      setTimeout(() => resolve("audio_url_placeholder"), 2000); 
    });
  };

  // --- 🔥 CORE: AUTO-GENERATION PIPELINE ---
  const processNeuralCommand = async () => {
    if (!prompt.trim() || !fabricRef.current || !HF_API_KEY.includes("hf_")) {
      return alert("Pehle valid API Key daalo aur prompt likho!");
    }
    
    setIsProcessing(true);
    setProgress(10);
    
    try {
      // Step 1: CLEAR Canvas for new creation
      fabricRef.current.clear(); 
      
      // Step 2 & 3: Run Visual & Audio APIs in Parallel (Simulated)
      const [visualLayer] = await Promise.all([
          generateScene(prompt),
          generateAudio(prompt)
      ]);
      
      setProgress(90);
      
      // Step 4: Add Visual Layer to back
      fabricRef.current.add(visualLayer);
      fabricRef.current.sendToBack(visualLayer);
      
      // Step 5: (Optional) Add Title Overlay based on prompt
      // @ts-ignore
      const textLayer = new window.fabric.Textbox(prompt.substring(0,20).toUpperCase(), {
        left: 20, top: 400, width: 300, fontSize: 16,
        fill: "#fff", fontFamily: "Impact", textAlign: "center",
        shadow: "0px 0px 10px rgba(0, 209, 255, 1)",
        backgroundColor: "rgba(0,0,0,0.5)"
      });
      
      fabricRef.current.add(textLayer);
      fabricRef.current.setActiveObject(textLayer); // Set as selected for user edit
      fabricRef.current.renderAll();
      
      setProgress(100);
      setPrompt(""); // Clear input
      
    } catch (error) {
      console.error(error);
      alert("AI Neural Core error, check API Key/Quota.");
    } finally {
      setTimeout(() => setIsProcessing(false), 500); 
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-[#E3E3E3] flex flex-col overflow-hidden font-sans">
      
      {/* 🔮 HEADER: Gemini Minimal Style */}
      <header className="p-4 flex justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/5 z-50">
        <button onClick={() => setLocation("/studio")} className="p-2.5 bg-zinc-900 rounded-full active:scale-75 transition-all">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isProcessing ? 'bg-yellow-500' : 'bg-cyan-500'}`} />
          <h2 className="text-[11px] font-black tracking-[0.4em] text-white uppercase">Neural Production</h2>
        </div>
        <button className="bg-white text-black px-5 py-2 rounded-full text-[11px] font-black transition-all shadow-lg active:scale-95">
          {isProcessing ? `Rendering...` : `EXPORT`}
        </button>
      </header>

      {/* 📽️ PREVIEW AREA: DEVICE FRAME */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] relative">
        <div className="relative rounded-[40px] overflow-hidden bg-[#131314] border border-white/5 shadow-2xl aspect-[3/4.2]">
          <canvas ref={canvasRef} />
          
          {/* AI Processing Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50 p-10">
              <Loader2 className="animate-spin text-cyan-400 mb-6" size={40} />
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 transition-all duration-300" style={{width: `${progress}%`}} />
              </div>
              <span className="text-[9px] font-black tracking-widest text-cyan-500 mt-3 animate-pulse">GENERATING NEURAL SCENE...</span>
            </div>
          )}
        </div>
      </main>

      {/* ⌨️ GEMINI PROMPT INPUT */}
      <div className="px-6 pb-8 pt-2 z-50">
        <div className="max-w-[360px] mx-auto space-y-4 relative">
          
          {/* Floating Action Chips (Optional usage) */}
          <div className="absolute -top-12 left-0 flex gap-2 overflow-x-auto pb-2 no-scrollbar pointer-events-none opacity-40">
            <Chip icon={<Video size={14}/>} label="Auto-Video" active />
            <Chip icon={<Mic size={14}/>} label="Add Voiceover" />
          </div>

          {/* Input Bar */}
          <div className={`relative flex items-center rounded-[28px] p-2 border transition-all shadow-xl ${isProcessing ? 'bg-zinc-900 border-white/5' : 'bg-[#1E1F20] border-white/10 focus-within:border-cyan-500/50'}`}>
            <input 
              disabled={isProcessing}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && processNeuralCommand()}
              placeholder={isProcessing ? "AI Engine is active..." : "Describe your fighting scene..."} 
              className="bg-transparent flex-1 px-4 py-3 text-sm outline-none resize-none placeholder:text-zinc-600 tracking-wider"
            />
            <button 
              onClick={processNeuralCommand}
              disabled={!prompt.trim() || isProcessing}
              className={`p-3.5 rounded-2xl transition-all ${prompt.trim() && !isProcessing ? 'bg-cyan-500 text-black active:scale-90 hover:rotate-3' : 'bg-zinc-800 text-zinc-600'}`}
            >
              {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal Chip Component
function Chip({ icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap border ${active ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-[#1E1F20] border-white/5 text-zinc-300'}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}
