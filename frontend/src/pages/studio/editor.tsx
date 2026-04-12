import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send, Loader2, Type, Sparkles, Trash2, Layers } from "lucide-react";
import { useLocation } from "wouter";
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
    account.get().then(setUserData).catch(() => console.warn("Guest session"));

    // 🛡️ SAFETY CHECK: Interval to force initialization if CDN is slow
    const checkFabric = setInterval(() => {
      // @ts-ignore
      if (window.fabric && canvasRef.current && !fabricRef.current) {
        // @ts-ignore
        fabricRef.current = new window.fabric.Canvas(canvasRef.current, {
          width: 320,
          height: 480,
          backgroundColor: "#111111", // Greyish background for visibility
        });
        console.log("✅ Fabric Engine Live!");
        clearInterval(checkFabric);
      }
    }, 500);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      clearInterval(checkFabric);
      if (fabricRef.current) fabricRef.current.dispose();
    };
  }, []);

  // 📤 REAL FUNCTION: Export logic
  const handleExport = async () => {
    if (!fabricRef.current) return alert("System not ready");
    setIsProcessing(true);
    setProgress(20);

    try {
        const dataURL = fabricRef.current.toDataURL({ format: 'png', multiplier: 2 });
        const res = await fetch(dataURL);
        const blob = await res.blob();
        const file = new File([blob], `racex_${Date.now()}.png`, { type: "image/png" });

        const bucketId = 'your_bucket_id'; // 👈 Replace this!
        const uploadedFile = await storage.createFile(bucketId, ID.unique(), file);
        const fileUrl = storage.getFileView(bucketId, uploadedFile.$id);
        
        await databases.createDocument('racex_db', 'posts', ID.unique(), {
            content_url: fileUrl.href,
            prompt: prompt || "Neural Design",
            created_at: new Date().toISOString(),
            user_id: userData?.$id || "guest"
        });

        setProgress(100);
        setLocation("/studio/analytics");
    } catch (error: any) {
        alert("Error: " + error.message);
    } finally {
        setIsProcessing(false);
    }
  };

  const addText = () => {
    if (!fabricRef.current) return;
    // @ts-ignore
    const text = new window.fabric.IText("RACE-X", {
      left: 100, top: 150, fontSize: 40, fill: "#ffffff", fontFamily: "Impact"
    });
    fabricRef.current.add(text);
    fabricRef.current.renderAll();
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col font-sans overflow-hidden">
      <header className="p-4 flex justify-between items-center bg-zinc-900/90 border-b border-white/5 z-50">
        <button onClick={() => setLocation("/studio")} className="p-2 bg-zinc-800 rounded-full"><ArrowLeft size={18} /></button>
        <span className="text-[10px] font-black tracking-widest text-cyan-500 uppercase">Pro Studio</span>
        <button onClick={handleExport} className="bg-white text-black px-4 py-1.5 rounded-lg text-[10px] font-black uppercase">Export</button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative">
        <div className="relative border-4 border-zinc-800 rounded-[32px] overflow-hidden shadow-2xl">
          {/* ⚠️ CRITICAL: Canvas must have a ref and be inside a container */}
          <canvas ref={canvasRef} />
          
          {isProcessing && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
               <Loader2 className="animate-spin text-cyan-400 mb-2" />
               <p className="text-[8px] font-bold text-cyan-500">SAVING {progress}%</p>
            </div>
          )}
        </div>

        <div className="absolute right-6 flex flex-col gap-4">
           <button onClick={addText} className="p-4 bg-zinc-900 border border-white/10 rounded-2xl"><Type size={20}/></button>
           <button onClick={() => fabricRef.current?.clear()} className="p-4 bg-zinc-900 border border-white/10 rounded-2xl text-red-500"><Trash2 size={20}/></button>
        </div>
      </main>

      <footer className="p-6 bg-zinc-900/90 border-t border-white/5">
         <div className="flex items-center bg-black rounded-2xl border border-white/10 p-1">
            <input 
              value={prompt} onChange={(e) => setPrompt(e.target.value)}
              placeholder="Inject neural prompt..."
              className="bg-transparent flex-1 px-4 py-3 text-sm outline-none"
            />
            <button className="p-3 bg-zinc-800 text-cyan-400 rounded-xl"><Sparkles size={18}/></button>
         </div>
      </footer>
    </div>
  );
}
