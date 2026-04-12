import React, { useState } from "react";
import { storage, databases, getNexusKey, ID, NEXUS_ENDPOINTS } from "@/lib/appwrite";
import { ArrowLeft, Send, Loader2, Play, CheckCircle2, Download, Edit3 } from "lucide-react";
import { useLocation } from "wouter";

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'FINAL'>('INPUT');
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // 🧠 REAL FUNCTION: API Call to HuggingFace & Save to Appwrite
  const generateAndSave = async () => {
    if (!prompt.trim()) return;
    setStep('PROCESSING');

    try {
      // 1. Fetch Key from Appwrite 'api_configs'
      const hfKey = await getNexusKey('HUGGING_FACE');
      if (!hfKey) throw new Error("API Key missing in Appwrite");

      // 2. Direct API Call to AI Model (Using SDXL for instant visual feedback)
      const response = await fetch(`${NEXUS_ENDPOINTS.HUGGING_FACE}stabilityai/stable-diffusion-xl-base-1.0`, {
        method: "POST",
        headers: { Authorization: `Bearer ${hfKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) throw new Error("AI Engine Busy");
      
      const blob = await response.blob();
      const file = new File([blob], `race-x-${Date.now()}.png`, { type: "image/png" });

      // 3. Upload Result to Appwrite Storage
      setIsUploading(true);
      const uploadedFile = await storage.createFile(
        '6619...your_bucket_id', // 👈 Apna Bucket ID yahan dalo
        ID.unique(),
        file
      );

      // 4. Get Public URL & Save to Database
      const fileView = storage.getFileView('6619...your_bucket_id', uploadedFile.$id);
      setResultUrl(fileView.href);
      
      await databases.createDocument('racex_db', 'posts', ID.unique(), {
        content_url: fileView.href,
        prompt: prompt,
        type: 'video_gen',
        created_at: new Date().toISOString()
      });

      setStep('FINAL');
    } catch (error) {
      alert("Nexus Core Error: " + error.message);
      setStep('INPUT');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white p-6 flex flex-col font-sans overflow-hidden">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-full active:scale-75 transition-all">
          <ArrowLeft size={20} />
        </button>
        <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase italic">Neural Cinema</span>
        <div className="w-10" />
      </header>

      {/* STEP 1: PROMPT */}
      {step === 'INPUT' && (
        <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-3xl font-black italic mb-10 text-center">Vision to <span className="text-purple-500 text-glow">Reality.</span></h2>
          <div className="bg-[#111] border border-white/5 rounded-[32px] p-2 flex items-center shadow-2xl">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your scene..."
              className="bg-transparent flex-1 px-5 py-4 text-sm outline-none"
            />
            <button onClick={generateAndSave} className="p-4 bg-purple-600 rounded-2xl active:scale-90 transition-all">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PROCESSING */}
      {step === 'PROCESSING' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 animate-pulse" />
            <Loader2 size={48} className="text-purple-500 animate-spin relative z-10" />
          </div>
          <p className="text-[10px] font-black tracking-[0.3em] text-zinc-500 animate-pulse uppercase">
            {isUploading ? "SYNCING TO APPWRITE CLOUD..." : "SYNTHESIZING NEURAL FRAMES..."}
          </p>
        </div>
      )}

      {/* STEP 3: FINAL PREVIEW */}
      {step === 'FINAL' && (
        <div className="flex-1 flex flex-col animate-in zoom-in-95">
          <div className="relative aspect-[9/16] max-h-[420px] bg-black rounded-[40px] border border-white/10 overflow-hidden mx-auto w-full shadow-2xl">
            <img src={resultUrl} className="w-full h-full object-cover" alt="AI Result" />
            <div className="absolute bottom-6 left-6 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-purple-400" />
              <span className="text-[9px] font-black text-white/60 uppercase">Cloud Sync Ready</span>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <button onClick={() => window.open(resultUrl, '_blank')} className="w-full bg-zinc-900 py-5 rounded-3xl flex items-center justify-center gap-3 active:scale-95 transition-all">
              <Download size={18} /> <span className="text-[10px] font-black tracking-widest uppercase">Save to Device</span>
            </button>
            <button onClick={() => setLocation("/studio/editor")} className="w-full bg-purple-600 py-5 rounded-3xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl">
               <Edit3 size={18} /> <span className="text-[10px] font-black tracking-widest uppercase">Edit in Pro Studio</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
