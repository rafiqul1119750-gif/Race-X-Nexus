import { useState, useEffect, useRef } from "react";
import { 
  Zap, Image as ImageIcon, Film, Mic, Sparkles, 
  Send, History, Shield, LogOut, ChevronRight, 
  Terminal, Layers, Play, Download, Trash2, Cpu
} from "lucide-react";
import { useLocation } from "wouter";

// ✅ EXACT BACKEND URL
const NEXUS_BACKEND = "https://race-x-nexus.onrender.com";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("image");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState({
    variant1: null as string | null,
    variant2: null as string | null,
  });

  const executeNexusEngine = async () => {
    if (!prompt) return alert("System Error: Prompt is empty!");
    
    setLoading(true);
    setVariants({ variant1: null, variant2: null });

    // Endpoint selection logic
    const endpoint = activeTab === "cinema" ? "/api/studio/create-cinema" : 
                     activeTab === "voice" ? "/api/studio/create-voice" : 
                     "/api/studio/create-image";

    const bodyData = activeTab === "voice" ? { text: prompt } : { prompt };
    if (activeTab === "cinema") (bodyData as any).imageUrl = variants.variant1 || "";

    try {
      console.log(`📡 Requesting: ${NEXUS_BACKEND}${endpoint}`);
      
      const response = await fetch(`${NEXUS_BACKEND}${endpoint}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(bodyData)
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setVariants((prev) => ({ ...prev, variant1: result.url }));
      } else {
        alert("Nexus Engine Error: " + result.message);
      }
    } catch (error: any) {
      console.error("🔥 Connection Error:", error);
      alert("Link Broken: Backend se response nahi mil raha. Check Render Logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans italic selection:bg-cyan-500/30">
      <nav className="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Zap size={20} className="text-black fill-black" />
          </div>
          <div>
            <h1 className="text-lg font-black uppercase tracking-tighter">Race-X Studio</h1>
            <p className="text-[8px] font-bold text-cyan-500 uppercase tracking-widest opacity-80">God Mode Active</p>
          </div>
        </div>
        <button onClick={() => setLocation("/api-manager")} className="p-3 bg-zinc-900 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-all">
          <Cpu size={18} className="text-zinc-400" />
        </button>
      </nav>

      <main className="p-6 max-w-5xl mx-auto space-y-8 pb-32">
        <div className="flex gap-2 p-1.5 bg-zinc-900/50 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
          {[
            { id: "image", icon: <ImageIcon size={14}/>, label: "Visual-X" },
            { id: "cinema", icon: <Film size={14}/>, label: "Cinema-V2" },
            { id: "voice", icon: <Mic size={14}/>, label: "Voice-X" }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-white"}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="relative group">
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={activeTab === "voice" ? "Type text to speak..." : "Describe your imagination..."} className="w-full bg-zinc-900/30 border-2 border-white/5 rounded-[32px] p-8 pt-10 text-xl font-medium outline-none focus:border-cyan-500/50 transition-all min-h-[200px] resize-none placeholder:text-zinc-800" />
          <button onClick={executeNexusEngine} disabled={loading} className="absolute bottom-6 right-6 p-6 bg-cyan-500 text-black rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-90 transition-all disabled:opacity-50">
            {loading ? <Terminal className="animate-spin" size={24}/> : <Send size={24}/>}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-[4/5] bg-zinc-900/20 border border-white/5 rounded-[40px] overflow-hidden relative group">
            {!variants.variant1 && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-800">
                <Layers size={48} className="mb-4 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Node Variant 01</p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
                <p className="text-[10px] font-black uppercase text-cyan-500 animate-pulse">Processing Core...</p>
              </div>
            )}
            {variants.variant1 && (
              <>
                {activeTab === "voice" ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-zinc-900">
                     <Mic size={40} className="text-cyan-500 mb-6" />
                     <audio controls src={variants.variant1} className="w-full" />
                  </div>
                ) : activeTab === "cinema" ? (
                   <video src={variants.variant1} autoPlay loop muted className="w-full h-full object-cover" />
                ) : (
                   <img src={variants.variant1} alt="AI" className="w-full h-full object-cover" />
                )}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all">
                  <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white hover:text-black">
                    <Download size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="aspect-[4/5] bg-zinc-900/20 border border-white/5 rounded-[40px] hidden md:flex flex-col items-center justify-center text-zinc-800">
             <Sparkles size={48} className="mb-4 opacity-20" />
             <p className="text-[10px] font-black uppercase tracking-[0.3em]">Node Variant 02</p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-4 flex justify-around items-center shadow-2xl z-50">
        <button onClick={() => setLocation("/")} className="p-4 text-zinc-500 hover:text-white"><History size={20}/></button>
        <button onClick={() => setLocation("/dashboard")} className="p-4 text-cyan-500"><Sparkles size={24} fill="currentColor"/></button>
        <button onClick={() => setLocation("/profile")} className="p-4 text-zinc-500 hover:text-white"><Shield size={20}/></button>
      </div>
    </div>
  );
}
