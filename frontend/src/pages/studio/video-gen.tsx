import React, { useState } from "react";
import { storage, getNexusKey, ID } from "../../lib/appwrite"; 
import { ArrowLeft, Send, Loader2, X, Download, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'FINAL'>('INPUT');
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const generateMedia = async () => {
    if (!prompt.trim()) return;
    setStep('PROCESSING');

    try {
      // 1. Railway se Key uthao
      const hfKey = await getNexusKey('HUGGING_FACE');
      if (!hfKey) throw new Error("Railway Key Sync Failed");

      // 2. AI Synthesis Call
      const response = await fetch("https://api-inference.huggingface.co/models/SG161222/RealVisXL_V4.0", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${hfKey}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (response.status === 503) throw new Error("AI Engine is Warming Up... Retry in 10s");
      if (!response.ok) throw new Error("Hugging Face rejected request (Check Token Type)");

      const blob = await response.blob();
      const file = new File([blob], `race-x-${Date.now()}.png`, { type: "image/png" });

      // 3. Appwrite Infrastructure (IDs from your screenshots)
      const BUCKET_ID = '67c05b8a0024446c6020';
      const PROJECT_ID = '69b9929d0024fe351bc2';
      
      const uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), file);
      
      // 4. Manual View URL (SDK bypass)
      const finalUrl = `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${PROJECT_ID}`;
      
      setResultUrl(finalUrl);
      setStep('FINAL');
    } catch (err: any) {
      alert("Nexus Notice: " + err.message);
      setStep('INPUT');
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col p-6 font-sans overflow-hidden">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75 transition-all">
          <ArrowLeft size={20} />
        </button>
        <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase italic">Neural Cinema</span>
        <div className="w-10" />
      </header>

      {step === 'INPUT' && (
        <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-8">Race<span className="text-purple-500">-X</span> Studio</h2>
          <div className="bg-[#0f0f0f] border border-white/5 p-4 rounded-[32px] shadow-2xl">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your cinematic vision..."
              className="bg-transparent w-full h-32 p-4 outline-none text-lg font-medium italic resize-none"
            />
            <button onClick={generateMedia} className="w-full bg-purple-600 py-5 rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all">
              <Send size={18}/> RUN ENGINE
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 opacity-30">
            <ShieldCheck size={12}/><span className="text-[8px] font-bold tracking-widest uppercase">Nexus Secure Protocol</span>
          </div>
        </div>
      )}

      {step === 'PROCESSING' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 size={48} className="text-purple-500 animate-spin mb-4" />
          <p className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase animate-pulse">Rendering...</p>
        </div>
      )}

      {step === 'FINAL' && (
        <div className="flex-1 flex flex-col animate-in zoom-in duration-500">
          <div className="flex-1 bg-zinc-900 rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
             <img src={resultUrl} className="w-full h-full object-cover" alt="AI Output" />
          </div>
          <div className="mt-6 flex gap-3">
             <button onClick={() => setStep('INPUT')} className="flex-1 bg-zinc-900 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest">Retry</button>
             <button onClick={() => window.open(resultUrl, '_blank')} className="flex-1 bg-white text-black py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                <Download size={14}/> Save
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
