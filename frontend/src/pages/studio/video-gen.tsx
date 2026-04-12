import React, { useState } from "react";
// Path check kar lena: @/lib/appwrite ya ../../lib/appwrite
import { storage, databases, getNexusKey, ID, NEXUS_ENDPOINTS } from "@/lib/appwrite"; 
import { ArrowLeft, Send, Loader2, Play, CheckCircle2, Download, Edit3 } from "lucide-react";
import { useLocation } from "wouter";

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'FINAL'>('INPUT');
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const generateAndSave = async () => {
    if (!prompt.trim()) return;
    setStep('PROCESSING');

    try {
      const hfKey = await getNexusKey('HUGGING_FACE');
      if (!hfKey) throw new Error("API Key missing in Appwrite");

      const response = await fetch(`${NEXUS_ENDPOINTS.HUGGING_FACE}stabilityai/stable-diffusion-xl-base-1.0`, {
        method: "POST",
        headers: { Authorization: `Bearer ${hfKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) throw new Error("AI Engine Busy");
      
      const blob = await response.blob();
      const file = new File([blob], `race-x-${Date.now()}.png`, { type: "image/png" });

      setIsUploading(true);
      // BUCKET_ID ki jagah apni real ID string dalo
      const uploadedFile = await storage.createFile(
        '6619...your_bucket_id', 
        ID.unique(),
        file
      );

      const fileView = storage.getFileView('6619...your_bucket_id', uploadedFile.$id);
      setResultUrl(fileView.href);
      
      await databases.createDocument('racex_db', 'posts', ID.unique(), {
        content_url: fileView.href,
        prompt: prompt,
        type: 'video_gen',
        created_at: new Date().toISOString()
      });

      setStep('FINAL');
    } catch (error: any) { // Yahan 'any' lagaya taaki build fail na ho
      alert("Nexus Core Error: " + (error.message || "Unknown Error"));
      setStep('INPUT');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col font-sans overflow-hidden">
      <header className="flex justify-between items-center mb-8 shrink-0">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-full active:scale-75 transition-all">
          <ArrowLeft size={20} />
        </button>
        <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase italic">Neural Cinema</span>
        <div className="w-10" />
      </header>

      {step === 'INPUT' && (
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-black italic mb-10 text-center">Vision to <span className="text-purple-500">Reality.</span></h2>
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

      {step === 'PROCESSING' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 size={48} className="text-purple-500 animate-spin mb-4" />
          <p className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">
            {isUploading ? "SYNCING TO CLOUD..." : "SYNTHESIZING..."}
          </p>
        </div>
      )}

      {step === 'FINAL' && (
        <div className="flex-1 flex flex-col">
          <div className="relative aspect-[9/16] max-h-[420px] bg-black rounded-[40px] border border-white/10 overflow-hidden mx-auto w-full">
            <img src={resultUrl} className="w-full h-full object-cover" alt="AI Result" />
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <button onClick={() => window.open(resultUrl, '_blank')} className="w-full bg-zinc-900 py-5 rounded-3xl flex justify-center gap-3">
              <Download size={18} /> <span className="text-[10px] font-black uppercase">Save</span>
            </button>
            <button onClick={() => setLocation("/studio/editor")} className="w-full bg-purple-600 py-5 rounded-3xl flex justify-center gap-3">
               <Edit3 size={18} /> <span className="text-[10px] font-black uppercase">Edit</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
