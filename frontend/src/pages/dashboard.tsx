import { useState } from "react";
import { Zap, Image as ImageIcon, Film, Mic, Sparkles, Send, History, Shield, Terminal, Layers, Cpu } from "lucide-react";
import { useLocation } from "wouter";

// ✅ EXACT MATCH WITH YOUR VERCEL BACKEND DOMAIN
const NEXUS_BACKEND = "https://race-x-nexus-backend.vercel.app"; 

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("image");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState({ variant1: null as string | null });

  const executeNexusEngine = async () => {
    if (!prompt.trim()) return alert("Please enter a prompt!");
    
    setLoading(true);
    setVariants({ variant1: null });

    try {
      const response = await fetch(`${NEXUS_BACKEND}/api/studio/create-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() })
      });

      const result = await response.json();

      if (result.success) {
        setVariants({ variant1: result.url });
      } else {
        alert("Nexus Error: " + (result.message || "Failed to generate"));
      }
    } catch (error) {
      alert("Nexus Link Broken! Check if Backend is live.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans italic selection:bg-cyan-500/30">
      
      {/* NAV */}
      <nav className="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#050505]/95 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <Zap size={20} className="text-black fill-black" />
          </div>
          <div>
            <h1 className="text-lg font-black uppercase tracking-tighter">Race-X Studio</h1>
            <p className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest animate-pulse">Vercel Core Active</p>
          </div>
        </div>
        <button onClick={() => setLocation("/api-manager")} className="p-3 bg-zinc-900 rounded-xl border border-white/5">
          <Cpu size={18} className="text-zinc-400" />
        </button>
      </nav>

      {/* MAIN */}
      <main className="p-6 max-w-5xl mx-auto space-y-8 pb-32">
        <div className="flex gap-2 p-1.5 bg-zinc-900/50 rounded-2xl border border-white/5">
          <button className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'image' ? 'bg-white text-black' : 'text-zinc-500'}`} onClick={() => setActiveTab('image')}>
            <ImageIcon size={14} className="inline mr-2"/> Visual-X
          </button>
          <button className="px-6 py-3 rounded-xl text-[10px] font-black uppercase text-zinc-500">
            <Film size={14} className="inline mr-2"/> Cinema-V2
          </button>
        </div>

        <div className="relative group">
          <textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            placeholder="Summon your imagination..." 
            className="w-full bg-zinc-900/40 border-2 border-white/5 rounded-[32px] p-8 text-xl min-h-[220px] outline-none focus:border-cyan-500/40 transition-all" 
          />
          <button 
            onClick={executeNexusEngine} 
            disabled={loading} 
            className="absolute bottom-6 right-6 p-6 bg-cyan-500 text-black rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-90 transition-all disabled:opacity-50"
          >
            {loading ? <Terminal className="animate-spin" size={24}/> : <Send size={24}/>}
          </button>
        </div>

        <div className="aspect-[4/5] bg-zinc-900/30 border border-white/5 rounded-[40px] overflow-hidden relative shadow-2xl">
          {!variants.variant1 && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-800">
               <Layers size={48} className="mb-4 opacity-10" />
               <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Nexus Engine Ready</p>
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md">
              <div className="w-14 h-14 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin mb-4" />
              <p className="text-cyan-500 font-black uppercase text-[10px] tracking-widest">Processing Core...</p>
            </div>
          )}
          {variants.variant1 && <img src={variants.variant1} className="w-full h-full object-cover transition-opacity duration-500" alt="Generated" />}
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-md bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-[35px] p-4 flex justify-around items-center shadow-2xl z-50">
        <button onClick={() => setLocation("/")} className="p-4 text-zinc-600 hover:text-white transition-all"><History size={20}/></button>
        <button onClick={() => setLocation("/dashboard")} className="p-4 text-cyan-500 scale-125"><Sparkles size={24} fill="currentColor"/></button>
        <button onClick={() => setLocation("/profile")} className="p-4 text-zinc-600 hover:text-white transition-all"><Shield size={20}/></button>
      </div>
    </div>
  );
}
