import React, { useEffect, useRef, useState } from "react";
import { 
  ArrowLeft, Send, Loader2, Type, Sparkles, Trash2, Layers 
} from "lucide-react";
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

  // 🔄 INITIALIZATION LOGIC
  useEffect(() => {
    // 1. Appwrite Session Sync
    account.get()
      .then(setUserData)
      .catch(() => console.warn("Guest Mode: No active session"));

    // 2. Fabric.js Loader
    const initFabric = () => {
      // @ts-ignore
      if (window.fabric && canvasRef.current && !fabricRef.current) {
        // @ts-ignore
        fabricRef.current = new window.fabric.Canvas(canvasRef.current, {
          width: 320,
          height: 480,
          backgroundColor: "#111111", // Dark gray taaki black screen na lage
          preserveObjectStacking: true,
        });
        console.log("🚀 Race-X Neural Engine Initialized");
      }
    };

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    script.onload = initFabric;
    document.body.appendChild(script);

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, []);

  // 📤 REAL FUNCTION: Export to Appwrite
  const handleExport = async () => {
    if (!fabricRef.current) return alert("Engine not ready!");
    
    setIsProcessing(true);
    setProgress(20);

    try {
        // Step 1: Canvas to High-Res Image
        const dataURL = fabricRef.current.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2
        });

        const res = await fetch(dataURL);
        const blob = await res.blob();
        const file = new File([blob], `racex_${Date.now()}.png`, { type: "image/png" });

        setProgress(50);

        // Step 2: Upload to Appwrite Storage
        const bucketId = '6619...your_bucket_id'; // 👈 APNA ACTUAL BUCKET ID DALO
        const uploadedFile = await storage.createFile(bucketId, ID.unique(), file);

        // Step 3: Create Database Record
        const fileUrl = storage.getFileView(bucketId, uploadedFile.$id);
        
        await databases.createDocument(
            'racex_db', 
            'posts', 
            ID.unique(),
            {
                content_url: fileUrl.href,
                prompt: prompt || "Neural Design",
                created_at: new Date().toISOString(),
                user_id: userData?.$id || "guest_user"
            }
        );

        setProgress(100);
        alert("Export Successful!");
        setLocation("/studio/analytics");

    } catch (error: any) {
        console.error("Critical Export Error:", error);
        alert("Export Failed: " + (error.message || "Unknown error"));
    } finally {
        setIsProcessing(false);
    }
  };

  // 📝 REAL FUNCTION: Add Text Layer
  const addText = () => {
    if (!fabricRef.current) return;
    // @ts-ignore
    const text = new window.fabric.IText("RACE-X", {
      left: 100,
      top: 150,
      fontSize: 40,
      fill: "#ffffff",
      fontFamily: "Impact",
      stroke: "#00f0ff",
      strokeWidth: 1
    });
    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    fabricRef.current.renderAll();
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col font-sans overflow-hidden">
      
      {/* 🔮 TOP NAVIGATION */}
      <header className="p-4 flex justify-between items-center bg-zinc-900/80 border-b border-white/5 backdrop-blur-md z-50 shrink-0">
        <button onClick={() => setLocation("/studio")} className="p-2.5 bg-zinc-800 rounded-full active:scale-75 transition-all">
          <ArrowLeft size={18} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-black tracking-[0.4em] text-cyan-500 uppercase italic leading-none">Neural Studio</span>
          <div className="h-1 w-8 bg-cyan-500/30 mt-1 rounded-full" />
        </div>
        <button 
          onClick={handleExport}
          disabled={isProcessing}
          className="bg-white text-black px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-white/5 active:scale-90 transition-all"
        >
          {isProcessing ? "Saving..." : "Export"}
        </button>
      </header>

      {/* 📽️ CANVAS VIEWPORT */}
      <main className="flex-1 flex items-center justify-center p-6 relative bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]">
        
        {/* The Frame */}
        <div className="relative border-[6px] border-zinc-900 rounded-[32px] shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden bg-[#111] animate-in zoom-in-95 duration-500">
          <canvas ref={canvasRef} />
          
          {/* Neural Processing Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-10">
               <Loader2 className="animate-spin text-cyan-400 mb-4" size={40} />
               <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 transition-all duration-300" style={{width: `${progress}%`}} />
               </div>
               <p className="text-[8px] font-black tracking-[0.3em] text-cyan-500 mt-4 uppercase animate-pulse">Syncing to Appwrite...</p>
            </div>
          )}
        </div>

        {/* Floating Sidebar Tools */}
        <div className="absolute right-6 flex flex-col gap-4 animate-in slide-in-from-right-4 duration-700">
           <ToolButton icon={<Type size={20}/>} onClick={addText} />
           <ToolButton icon={<Layers size={20}/>} />
           <ToolButton icon={<Trash2 size={20} className="text-red-500"/>} onClick={() => fabricRef.current?.clear()} />
        </div>
      </main>

      {/* ⌨️ COMMAND CENTER */}
      <footer className="p-6 bg-zinc-900/80 border-t border-white/5 backdrop-blur-xl shrink-0">
         <div className="max-w-md mx-auto relative flex items-center bg-black rounded-[24px] border border-white/10 p-1.5 focus-within:border-cyan-500/50 transition-all shadow-2xl">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Inject neural instruction..."
              className="bg-transparent flex-1 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 font-medium"
            />
            <button className="p-3.5 bg-zinc-800 text-cyan-400 rounded-2xl hover:bg-cyan-500 hover:text-black transition-all">
              <Sparkles size={20} fill="currentColor" />
            </button>
         </div>
      </footer>
    </div>
  );
}

// 🛠️ HELPER UI COMPONENT
function ToolButton({ icon, onClick }: { icon: any, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-4 bg-zinc-900/80 border border-white/5 rounded-[22px] shadow-xl hover:bg-zinc-800 active:scale-75 transition-all text-zinc-400 hover:text-white"
    >
      {icon}
    </button>
  );
}
