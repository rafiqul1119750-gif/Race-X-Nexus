import React, { useEffect, useRef, useState } from "react";
import { 
  ArrowLeft, Send, Loader2, Layers, Type, Music, Maximize, Sparkles, Trash2 
} from "lucide-react";
import { useLocation } from "wouter";
// 🟢 Appwrite Imports
import { storage, databases, ID, account } from "@/lib/appwrite";

export default function Editor() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<any>(null);
  
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check User Session
    account.get().then(setUserData).catch(() => console.log("No Session"));

    // Fabric.js Load
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    script.onload = () => {
      if (canvasRef.current && !fabricRef.current) {
        // @ts-ignore
        fabricRef.current = new window.fabric.Canvas(canvasRef.current, {
          width: 320,
          height: 460,
          backgroundColor: "#000",
        });
      }
    };
    document.body.appendChild(script);
    return () => { if (fabricRef.current) fabricRef.current.dispose(); fabricRef.current = null; };
  }, []);

  // 🔥 REAL FUNCTION: Export to Appwrite
  const handleExport = async () => {
    if (!fabricRef.current) return;
    
    setIsProcessing(true);
    setProgress(10);

    try {
        // 1. Canvas to Blob
        const dataURL = fabricRef.current.toDataURL({ format: 'png', quality: 1, multiplier: 2 });
        const res = await fetch(dataURL);
        const blob = await res.blob();
        const file = new File([blob], `racex_${Date.now()}.png`, { type: "image/png" });

        setProgress(40);

        // 2. Appwrite Storage Upload
        const bucketId = 'your_bucket_id'; // 👈 APNA BUCKET ID YAHAN DALO
        const uploadedFile = await storage.createFile(bucketId, ID.unique(), file);

        setProgress(70);

        // 3. Appwrite Database Entry
        const fileUrl = storage.getFileView(bucketId, uploadedFile.$id);
        
        await databases.createDocument(
            'racex_db', 
            'posts', 
            ID.unique(),
            {
                content_url: fileUrl.href,
                prompt: prompt || "Neural Creation",
                created_at: new Date().toISOString(),
                user_id: userData?.$id || "guest"
            }
        );

        setProgress(100);
        alert("Success! Exported to Cloud.");
        setLocation("/studio/analytics");

    } catch (error: any) {
        console.error("Export Failed:", error);
        alert("Export Error: " + (error.message || "Check Console"));
    } finally {
        setIsProcessing(false);
    }
  };

  const addText = () => {
    // @ts-ignore
    const text = new window.fabric.IText("TAP TO EDIT", {
      left: 50, top: 100, fontSize: 22, fill: "#fff", fontFamily: "Impact"
    });
    fabricRef.current.add(text);
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col overflow-hidden font-sans">
      <header className="p-4 flex justify-between items-center bg-black/80 border-b border-white/5 z-50">
        <button onClick={() => setLocation("/studio")} className="p-2.5 bg-zinc-900 rounded-full"><ArrowLeft size={18} /></button>
        <span className="text-[10px] font-black tracking-[0.3em] text-cyan-500 uppercase">Pro Editor</span>
        <button 
          onClick={handleExport}
          disabled={isProcessing}
          className="bg-white text-black px-6 py-2 rounded-xl text-[11px] font-black uppercase"
        >
          {isProcessing ? "Saving..." : "Export"}
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative bg-[#0a0a0a]">
        <div className="relative rounded-[32px] overflow-hidden border-4 border-zinc-900 shadow-2xl bg-black">
          <canvas ref={canvasRef} />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 z-50">
               <Loader2 className="animate-spin text-cyan-400 mb-4" size={32} />
               <p className="text-[8px] font-black tracking-widest text-cyan-500 uppercase text-center">Neural Sync: {progress}%</p>
            </div>
          )}
        </div>

        {/* Floating Tools */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
           <button onClick={addText} className="p-4 bg-zinc-900 border border-white/5 rounded-2xl"><Type size={18}/></button>
           <button onClick={() => fabricRef.current.clear()} className="p-4 bg-red-500/10 text-red-500 rounded-2xl"><Trash2 size={18}/></button>
        </div>
      </main>

      <footer className="p-6 bg-zinc-900/50 border-t border-white/5">
         <div className="relative flex items-center bg-[#131314] rounded-2xl border border-white/10 p-1">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe visual change..."
              className="bg-transparent flex-1 px-4 py-3 text-sm outline-none"
            />
            <button className="p-3 bg-cyan-600 rounded-xl"><Sparkles size={18}/></button>
         </div>
      </footer>
    </div>
  );
}
