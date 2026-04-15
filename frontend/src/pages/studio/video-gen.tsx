import React, { useState } from "react";
import { storage, databases, getNexusKey, ID } from "../../lib/appwrite"; 
import { ArrowLeft, Send, Loader2, X } from "lucide-react";
import { useLocation } from "wouter";

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'FINAL'>('INPUT');
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setStep('PROCESSING');

    try {
      // 1. Railway se Asli Key uthao
      const hfKey = await getNexusKey('HUGGING_FACE');
      
      // 2. Hugging Face ko call karo
      const response = await fetch("https://api-inference.huggingface.co/models/SG161222/RealVisXL_V4.0", {
        method: "POST",
        headers: { Authorization: `Bearer ${hfKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) throw new Error("AI Engine Busy");

      const blob = await response.blob();
      const file = new File([blob], `rx-${Date.now()}.png`, { type: "image/png" });

      // 3. Appwrite Storage mein upload (Bucket ID check kar lena)
      const uploadedFile = await storage.createFile('67c05b8a0024446c6020', ID.unique(), file);
      const fileView = storage.getFileView('67c05b8a0024446c6020', uploadedFile.$id);
      
      setResultUrl(fileView.href);
      setStep('FINAL');
    } catch (error) {
      alert("Nexus Error: " + error.message);
      setStep('INPUT');
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col p-6 font-sans">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/40">
              <div className="w-4 h-4 border-2 border-cyan-400 rounded-sm"></div>
           </div>
           <span className="text-xs font-black tracking-[0.3em] italic uppercase">Protocol: Image</span>
        </div>
        <button onClick={() => setLocation("/studio")} className="p-2 bg-zinc-900 rounded-full"><X size={20}/></button>
      </header>

      {step === 'INPUT' && (
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-[40px] backdrop-blur-xl">
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="Cyberpunk racing car..."
               className="bg-transparent w-full h-32 outline-none text-xl font-medium italic"
             />
             <div className="flex justify-end mt-4">
                <button onClick={generateImage} className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-2 active:scale-90 transition-all">
                   <Send size={18}/> RUN AI
                </button>
             </div>
          </div>
        </div>
      )}

      {step === 'PROCESSING' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 size={40} className="animate-spin text-cyan-400" />
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Synthesizing Reality...</span>
        </div>
      )}

      {step === 'FINAL' && (
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex-1 bg-zinc-900 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
             <img src={resultUrl} className="w-full h-full object-cover" alt="Generated" />
          </div>
          <button onClick={() => setStep('INPUT')} className="w-full bg-zinc-900 py-6 rounded-3xl font-bold uppercase tracking-widest text-xs border border-white/5">New Protocol</button>
        </div>
      )}
    </div>
  );
}
