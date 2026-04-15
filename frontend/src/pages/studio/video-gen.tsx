import React, { useState } from "react";
import { storage, databases, getNexusKey, ID } from "../../lib/appwrite"; 
import { ArrowLeft, Send, Loader2, X, Download, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'FINAL'>('INPUT');
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");

  const generateMedia = async () => {
    if (!prompt.trim()) return;
    setStep('PROCESSING');
    setError("");

    try {
      // 1. Sync Key from Railway Nexus
      const hfKey = await getNexusKey('HUGGING_FACE');
      if (!hfKey) throw new Error("Nexus Key Sync Failed. Check Railway.");

      // 2. AI Synthesis Call
      const response = await fetch("https://api-inference.huggingface.co/models/SG161222/RealVisXL_V4.0", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${hfKey}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) throw new Error("AI Engine Warming Up... Try Again in 5s");

      const blob = await response.blob();
      const file = new File([blob], `race-x-${Date.now()}.png`, { type: "image/png" });

      // 3. Appwrite Infrastructure Config
      const BUCKET_ID = '67c05b8a0024446c6020';
      const PROJECT_ID = '69b9929d0024fe351bc2';
      
      const uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), file);
      
      // 4. Manual URL Generation (Ensures Visibility)
      const finalUrl = `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${PROJECT_ID}`;
      
      setResultUrl(finalUrl);
      setStep('FINAL');
    } catch (err: any) {
      console.error("Nexus Error:", err);
      setError(err.message);
      setStep('INPUT');
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col p-6 font-sans overflow-hidden">
      {/* Nexus Header */}
      <header className="flex justify-between items-center mb-8 shrink-0">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900/80 rounded-2xl active:scale-75 transition-all border border-white/5">
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
            <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase italic">Nexus Gen-1</span>
            <div className="h-[1px] w-6 bg-purple-500/50 mt-1"></div>
        </div>
        <div className="w-10" />
      </header>

      {/* Main Engine States */}
      {step === 'INPUT' && (
        <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-8">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none mb-2">
              Race<span className="text-purple-500">-X</span> Studio
            </h2>
            <p className="text-zinc-600 text-[10px] font-bold tracking-[0.2em] uppercase">Visual Protocol Initialized</p>
          </div>
          
          <div className="bg-[#0f0f0f] border border-white/5 p-4 rounded-[32px] shadow-2xl focus-within:border-purple-500/30 transition-all">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your vision..."
              className="bg-transparent w-full h-32 p-4 outline-none text-lg font-medium italic resize-none placeholder:text-zinc-800"
            />
            <button 
              onClick={generateMedia}
              className="w-full bg-purple-600 py-5 rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-purple-500/20"
            >
              <Zap size={18} fill="currentColor"/> INITIATE SYNTHESIS
            </button>
          </div>
        </div>
      )}

      {step === 'PROCESSING' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative mb-8">
            <Loader2 size={64} className="text-purple-500 animate-spin opacity-20" />
            <Loader2 size={64} className="text-purple-400 animate-spin absolute top-0 blur-lg" />
          </div>
          <p className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase animate-pulse">Rendering Reality...</p>
        </div>
      )}

      {step === 'FINAL' && (
        <div className="flex-1 flex flex-col animate-in zoom-in fade-in duration-500">
          <div className="flex-1 bg-zinc-900/30 rounded-[40px] overflow-hidden border border-white/5 relative group">
             <img src={resultUrl} className="w-full h-full object-cover" alt="AI Generated" />
             
             <div className="absolute inset-x-6 bottom-6 flex gap-3">
                <button 
                  onClick={() => setStep('INPUT')}
                  className="flex-1 bg-black/40 backdrop-blur-xl border border-white/10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
                >
                  Discard
                </button>
                <button 
                  onClick={() => window.open(resultUrl, '_blank')}
                  className="flex-1 bg-white text-black py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
                >
                  <Download size={14}/> Save Art
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
