import React, { useState } from "react";
import { storage, databases, getNexusKey, ID, NEXUS_ENDPOINTS } from "../../lib/appwrite"; 
import { ArrowLeft, Send, Loader2, Download, RefreshCw, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'FINAL'>('INPUT');
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // 🛡️ CONFIGURATION
  const APPWRITE_CONFIG = {
    BUCKET_ID: "67c05b8a0024446c6020", 
    DATABASE_ID: "racex_db",
    COLLECTION_ID: "posts"
  };

  const generateAndSave = async () => {
    if (!prompt.trim()) return;
    setStep('PROCESSING');

    try {
      // 1. Fetch Valid Key from Railway
      const hfKey = await getNexusKey('HUGGING_FACE');
      if (!hfKey) throw new Error("Nexus Key Sync Failed");

      // 2. AI Synthesis
      const response = await fetch(`${NEXUS_ENDPOINTS.HUGGING_FACE}SG161222/RealVisXL_V4.0`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${hfKey}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Neural Engine Busy");
      }
      
      const blob = await response.blob();
      const file = new File([blob], `rx-${Date.now()}.png`, { type: "image/png" });

      setIsUploading(true);

      // 3. Sync to Appwrite Storage
      const uploadedFile = await storage.createFile(
        APPWRITE_CONFIG.BUCKET_ID, 
        ID.unique(),
        file
      );

      // 4. Generate Public View URL
      const fileView = storage.getFileView(APPWRITE_CONFIG.BUCKET_ID, uploadedFile.$id);
      setResultUrl(fileView.href);
      
      // 5. Save Record to Database
      await databases.createDocument(
        APPWRITE_CONFIG.DATABASE_ID, 
        APPWRITE_CONFIG.COLLECTION_ID, 
        ID.unique(), 
        {
          content_url: fileView.href,
          prompt: prompt,
          type: 'image_gen',
          created_at: new Date().toISOString()
        }
      );

      setStep('FINAL');
    } catch (error: any) {
      console.error("Critical Nexus Error:", error);
      alert("❌ " + (error.message || "Synthesis Failed"));
      setStep('INPUT');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col font-sans overflow-hidden p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 shrink-0">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-full active:scale-75 transition-all border border-white/5">
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase italic">Neural Cinema</span>
          <div className="h-[1px] w-8 bg-purple-500/30 mt-1"></div>
        </div>
        <div className="w-10" />
      </header>

      {/* State: INPUT */}
      {step === 'INPUT' && (
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-black italic mb-2 text-center tracking-tighter uppercase">
            Race<span className="text-purple-500">-X</span> Studio
          </h2>
          <p className="text-zinc-500 text-[10px] text-center mb-10 tracking-[0.2em] uppercase font-bold">Protocol: Image Synthesis</p>
          
          <div className="bg-[#111] border border-white/5 rounded-[32px] p-2 flex items-center shadow-2xl focus-within:border-purple-500/50 transition-all duration-500">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your vision..."
              className="bg-transparent flex-1 px-5 py-4 text-sm outline-none placeholder:text-zinc-700"
            />
            <button 
              onClick={generateAndSave} 
              disabled={!prompt.trim()}
              className="p-4 bg-purple-600 rounded-2xl active:scale-90 transition-all disabled:opacity-30 shadow-lg shadow-purple-500/20"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* State: PROCESSING */}
      {step === 'PROCESSING' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative mb-8">
            <Loader2 size={80} className="text-purple-500 animate-spin opacity-10" />
            <Loader2 size={80} className="text-purple-500 animate-spin absolute top-0 blur-md opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-[10px] font-black tracking-[0.5em] text-purple-500 animate-pulse uppercase">
            {isUploading ? "Syncing Nexus..." : "Rendering Reality..."}
          </p>
        </div>
      )}

      {/* State: FINAL */}
      {step === 'FINAL' && (
        <div className="flex-1 flex flex-col animate-in fade-in zoom-in duration-700">
          <div className="relative aspect-[9/16] max-h-[460px] bg-[#0a0a0a] rounded-[40px] border border-white/10 overflow-hidden mx-auto w-full shadow-[0_0_100px_rgba(168,85,247,0.1)]">
            <img 
              src={resultUrl} 
              className="w-full h-full object-cover" 
              alt="AI Output" 
              loading="lazy"
            />
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
               <span className="text-[8px] font-bold tracking-widest text-white/70 uppercase">Nexus Gen-1</span>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col gap-3">
            <button 
              onClick={() => window.open(resultUrl, '_blank')} 
              className="w-full bg-zinc-900 border border-white/5 py-5 rounded-3xl flex justify-center items-center gap-3 active:scale-95 transition-all active:bg-zinc-800"
            >
              <Download size={18} className="text-purple-500" /> 
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Export Art</span>
            </button>
            
            <button 
              onClick={() => setStep('INPUT')} 
              className="w-full bg-white text-black py-5 rounded-3xl flex justify-center items-center gap-3 active:scale-95 transition-all shadow-xl"
            >
               <RefreshCw size={18} /> 
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Protocol</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
