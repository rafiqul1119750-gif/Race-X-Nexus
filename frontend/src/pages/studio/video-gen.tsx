import React, { useState } from "react";
import { storage, databases, getNexusKey, ID } from "../../lib/appwrite"; 
import { ArrowLeft, Send, Loader2, X, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'FINAL'>('INPUT');
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setStep('PROCESSING');
    setError("");

    try {
      // 1. Get Key from Railway
      const hfKey = await getNexusKey('HUGGING_FACE');
      if (!hfKey) throw new Error("Railway backend se key nahi mili");

      // 2. Call Hugging Face
      const response = await fetch("https://api-inference.huggingface.co/models/SG161222/RealVisXL_V4.0", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${hfKey}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) throw new Error("Hugging Face Engine Busy (Check your key)");

      const blob = await response.blob();
      const file = new File([blob], `rx-${Date.now()}.png`, { type: "image/png" });

      // 3. Upload to Appwrite
      const BUCKET_ID = '67c05b8a0024446c6020';
      const uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), file);
      
      // 4. Manual URL Construct (Taki SDK ka wait na karna pade)
      const projectID = '69b9929d0024fe351bc2';
      const finalUrl = `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${projectID}`;
      
      setResultUrl(finalUrl);
      setStep('FINAL');
    } catch (err: any) {
      console.error("Nexus Error:", err);
      setError(err.message);
      setStep('INPUT');
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col p-6 font-sans overflow-hidden">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/40">
              <div className="w-4 h-4 border-2 border-purple-400 rounded-sm"></div>
           </div>
           <span className="text-[10px] font-black tracking-[0.3em] uppercase italic">Race-X Nexus</span>
        </div>
        <button onClick={() => setLocation("/studio")} className="p-2 bg-zinc-900 rounded-full active:scale-75"><X size={20}/></button>
      </header>

      {step === 'INPUT' && (
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div className="bg-[#111] border border-white/5 p-6 rounded-[32px] shadow-2xl">
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="Enter visual prompt..."
               className="bg-transparent w-full h-24 outline-none text-lg font-medium italic resize-none"
             />
             <button 
                onClick={generateImage} 
                className="w-full bg-purple-600 text-white py-5 rounded-2xl font-black mt-4 flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-purple-500/20"
             >
                <Send size={18}/> INITIATE SYNTHESIS
             </button>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest justify-center">
              <AlertTriangle size={12}/> {error}
            </div>
          )}
        </div>
      )}

      {step === 'PROCESSING' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 size={48} className="animate-spin text-purple-500 blur-[1px]" />
          <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase animate-pulse">Rendering Reality...</span>
        </div>
      )}

      {step === 'FINAL' && (
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex-1 bg-[#111] rounded-[40px] overflow-hidden border border-white/10 relative shadow-2xl shadow-purple-500/10">
             <img 
               src={resultUrl} 
               key={resultUrl}
               className="w-full h-full object-cover" 
               alt="Generated" 
               onLoad={() => console.log("Image Loaded Successfully")}
             />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep('INPUT')} className="flex-1 bg-zinc-900 py-5 rounded-3xl font-black uppercase tracking-widest text-[10px] border border-white/5">Retry Protocol</button>
            <button onClick={() => window.open(resultUrl, '_blank')} className="flex-1 bg-white text-black py-5 rounded-3xl font-black uppercase tracking-widest text-[10px]">Export</button>
          </div>
        </div>
      )}
    </div>
  );
}
