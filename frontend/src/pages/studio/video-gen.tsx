import React, { useState } from "react";
import { storage, getNexusKey, ID } from "../../lib/appwrite"; 
import { ArrowLeft, Send, Loader2, Download, ShieldCheck, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'FINAL'>('INPUT');
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loadingStatus, setLoadingStatus] = useState("Initializing...");

  const generateMedia = async () => {
    if (!prompt.trim()) return;
    setStep('PROCESSING');
    setLoadingStatus("Syncing Nexus Key...");

    try {
      // 1. Get the NEW Write Token from Railway
      const hfKey = await getNexusKey('HUGGING_FACE');
      if (!hfKey) throw new Error("Railway Connection Failed");

      setLoadingStatus("AI Engine: Rendering Vision...");

      // 2. Call Hugging Face Inference
      const response = await fetch("https://api-inference.huggingface.co/models/SG161222/RealVisXL_V4.0", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${hfKey}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (response.status === 503) {
        throw new Error("Model is loading. Please try again in 15 seconds.");
      }

      if (!response.ok) {
        throw new Error("AI Engine rejected the token. Check Appwrite configs.");
      }

      const blob = await response.blob();
      const file = new File([blob], `race-x-${Date.now()}.png`, { type: "image/png" });

      setLoadingStatus("Syncing to Race-X Storage...");

      // 3. Infrastructure IDs
      const BUCKET_ID = '67c05b8a0024446c6020';
      const PROJECT_ID = '69b9929d0024fe351bc2';
      
      const uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), file);
      
      // 4. Force Public View URL
      const finalUrl = `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${PROJECT_ID}`;
      
      setResultUrl(finalUrl);
      setStep('FINAL');
    } catch (err: any) {
      alert("⚠️ Race-X System Notice: " + err.message);
      setStep('INPUT');
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col p-6 font-sans overflow-hidden">
      {/* Cinematic Header */}
      <header className="flex justify-between items-center mb-8 shrink-0">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900/80 rounded-2xl active:scale-75 transition-all border border-white/5">
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
            <span className="text-[10px] font-black tracking-[0.5em] text-purple-500 uppercase italic">Neural Cinema</span>
            <div className="h-[1px] w-6 bg-purple-500/50 mt-1"></div>
        </div>
        <div className="w-10" />
      </header>

      {/* State: Input Prompt */}
      {step === 'INPUT' && (
        <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="mb-10">
            <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.85] mb-4">
              Race<span className="text-purple-500">-X</span><br/>Studio
            </h2>
            <div className="flex items-center gap-2 text-zinc-600">
                <ShieldCheck size={14} className="text-purple-900" />
                <span className="text-[9px] font-bold tracking-widest uppercase">Gen-1 Write Protocol Active</span>
            </div>
          </div>
          
          <div className="bg-[#0f0f0f] border border-white/5 p-5 rounded-[40px] shadow-2xl focus-within:border-purple-500/30 transition-all duration-500">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your cinematic masterpiece..."
              className="bg-transparent w-full h-36 p-2 outline-none text-lg font-medium italic resize-none placeholder:text-zinc-800"
            />
            <button 
              onClick={generateMedia}
              className="w-full bg-purple-600 hover:bg-purple-500 py-5 rounded-3xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-purple-500/20 mt-2"
            >
              <Send size={18} fill="currentColor"/> START SYNTHESIS
            </button>
          </div>
        </div>
      )}

      {/* State: Processing */}
      {step === 'PROCESSING' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative mb-10">
            <Loader2 size={80} className="text-purple-500 animate-spin opacity-10" />
            <Loader2 size={80} className="text-purple-400 animate-spin absolute top-0 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
          <p className="text-[11px] font-black tracking-[0.6em] text-zinc-400 uppercase animate-pulse text-center">
            {loadingStatus}
          </p>
        </div>
      )}

      {/* State: Final Output */}
      {step === 'FINAL' && (
        <div className="flex-1 flex flex-col animate-in zoom-in fade-in duration-700">
          <div className="flex-1 bg-zinc-900/20 rounded-[48px] overflow-hidden border border-white/5 relative group shadow-2xl shadow-purple-500/5">
             <img 
               src={resultUrl} 
               className="w-full h-full object-cover" 
               alt="AI Generated Output" 
             />
             
             <div className="absolute inset-x-8 bottom-8 flex gap-4">
                <button 
                  onClick={() => setStep('INPUT')}
                  className="flex-1 bg-black/40 backdrop-blur-2xl border border-white/10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest active:scale-90 transition-all"
                >
                  Discard
                </button>
                <button 
                  onClick={() => window.open(resultUrl, '_blank')}
                  className="flex-1 bg-white text-black py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-90 transition-all shadow-2xl"
                >
                  <Download size={16}/> Export
                </button>
             </div>
          </div>
          <p className="text-center mt-6 text-[9px] text-zinc-700 font-bold uppercase tracking-[0.3em]">
             Stored in Race-X Nexus Cloud
          </p>
        </div>
      )}
    </div>
  );
}
