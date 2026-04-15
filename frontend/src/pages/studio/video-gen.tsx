import React, { useState } from "react";
// Path check kar lena: agar folder structure alag hai toh ../../ use karein
import { storage, databases, getNexusKey, ID, NEXUS_ENDPOINTS } from "../../lib/appwrite"; 
import { ArrowLeft, Send, Loader2, Download, RefreshCw, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'FINAL'>('INPUT');
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // 🛡️ --- CONFIGURATION (Inhe apne Appwrite Console se match karein) ---
  const APPWRITE_CONFIG = {
    BUCKET_ID: "67c05b8a0024446c6020", // 👈 Yahan apni Storage Bucket ID dalein
    DATABASE_ID: "racex_db",
    COLLECTION_ID: "posts"
  };

  const generateAndSave = async () => {
    if (!prompt.trim()) return;
    setStep('PROCESSING');

    try {
      // 1. Fetch Hugging Face Key from Railway Nexus
      const hfKey = await getNexusKey('HUGGING_FACE');
      if (!hfKey) throw new Error("Nexus Key Sync Failed");

      // 2. AI Synthesis (Cinematic Model)
      const response = await fetch(`${NEXUS_ENDPOINTS.HUGGING_FACE}SG161222/RealVisXL_V4.0`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${hfKey}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) throw new Error("Neural Engine Busy (Hugging Face)");
      
      const blob = await response.blob();
      const file = new File([blob], `rx-${Date.now()}.png`, { type: "image/png" });

      setIsUploading(true);

      // 3. Sync to Appwrite Storage
      const uploadedFile = await storage.createFile(
        APPWRITE_CONFIG.BUCKET_ID, 
        ID.unique(),
        file
      );

      // View URL Generate karein
      const fileView = storage.getFileView(APPWRITE_CONFIG.BUCKET_ID, uploadedFile.$id);
      setResultUrl(fileView.href);
      
      // 4. Register in Database
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
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-full active:scale-75 transition-all">
          <ArrowLeft size={20} />
        </button>
        <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase italic">Neural Cinema</span>
        <div className="w-10" />
      </header>

      {/* State: INPUT */}
      {step === 'INPUT' && (
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-black italic mb-10 text-center tracking-tighter">
            Vision to <span className="text-purple-500">Reality.</span>
          </h2>
          <div className="bg-[#111] border border-white/5 rounded-[32px] p-2 flex items-center shadow-2xl focus-within:border-purple-500/50 transition-all">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your scene..."
              className="bg-transparent flex-1 px-5 py-4 text-sm outline-none placeholder:text-zinc-600"
            />
            <button 
              onClick={generateAndSave} 
              disabled={!prompt.trim()}
              className="p-4 bg-purple-600 rounded-2xl active:scale-90 transition-all disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="mt-6 text-[9px] text-center text-zinc-500 tracking-widest uppercase">Powered by Nexus Engine</p>
        </div>
      )}

      {/* State: PROCESSING */}
      {step === 'PROCESSING' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative">
            <Loader2 size={60} className="text-purple-500 animate-spin mb-4 opacity-20" />
            <Loader2 size={60} className="text-purple-400 animate-spin mb-4 absolute top-0 blur-sm" />
          </div>
          <p className="text-[10px] font-black tracking-[0.3em] text-purple-500 animate-pulse">
            {isUploading ? "SAVING TO NEURAL CLOUD..." : "SYNTHESIZING REALITY..."}
          </p>
        </div>
      )}

      {/* State: FINAL */}
      {step === 'FINAL' && (
        <div className="flex-1 flex flex-col">
          <div className="relative aspect-[9/16] max-h-[440px] bg-[#111] rounded-[40px] border border-white/10 overflow-hidden mx-auto w-full shadow-[0_0_80px_rgba(168,85,247,0.15)]">
            <img src={resultUrl} className="w-full h-full object-cover" alt="AI Generated" />
          </div>
          
          <div className="mt-8 flex flex-col gap-3">
            <button 
              onClick={() => window.open(resultUrl, '_blank')} 
              className="w-full bg-zinc-900 border border-white/5 py-5 rounded-3xl flex justify-center items-center gap-3 active:scale-95 transition-all"
            >
              <Download size={18} className="text-purple-500" /> 
              <span className="text-[10px] font-black uppercase tracking-widest">Download Art</span>
            </button>
            
            <button 
              onClick={() => setStep('INPUT')} 
              className="w-full bg-purple-600 py-5 rounded-3xl flex justify-center items-center gap-3 active:scale-95 transition-all shadow-lg shadow-purple-900/20"
            >
               <RefreshCw size={18} /> 
               <span className="text-[10px] font-black uppercase tracking-widest">Generate New</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
