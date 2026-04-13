import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Mic, Music, PlaySquare, Send, X, Edit3, Download, Share2, Loader2, CheckCircle } from "lucide-react";

export default function NexusStudio() {
  // Library-free state management
  const [activeProtocol, setActiveProtocol] = useState<any>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]); 
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  const API_BASE = "https://race-x-nexus.onrender.com/api";

  const handleExecute = async () => {
    if (!prompt) return;
    setLoading(true);
    setResults([]); 
    
    try {
      const res = await fetch(`${API_BASE}${activeProtocol.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, count: 3 })
      });
      const data = await res.json();
      
      // Mocking 3 results from the response for the UI
      const mockResults = [
        { id: 1, url: data.url || data.video || "https://placehold.co/400x400/0891b2/white?text=Nexus+V1" },
        { id: 2, url: data.url || data.video || "https://placehold.co/400x400/0e7490/white?text=Nexus+V2" },
        { id: 3, url: data.url || data.video || "https://placehold.co/400x400/155e75/white?text=Nexus+V3" }
      ];
      setResults(mockResults);
    } catch (err) {
      console.error("Nexus Link Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden italic">
      
      {/* 🌐 Background Design */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, #00ffff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

      <h1 className="text-3xl font-black mb-10 tracking-tighter text-cyan-400 italic">NEXUS STUDIO</h1>

      {/* Grid of Tools */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm z-10">
        <ToolBtn icon={<ImageIcon />} label="IMAGE" onClick={() => setActiveProtocol({id: 'img', label: 'IMAGE', endpoint: '/create-image'})} />
        <ToolBtn icon={<PlaySquare />} label="VIDEO" onClick={() => setActiveProtocol({id: 'vid', label: 'VIDEO', endpoint: '/generate-movie'})} />
        <ToolBtn icon={<Mic />} label="VOICE" onClick={() => setActiveProtocol({id: 'aud', label: 'VOICE', endpoint: '/create-voice'})} />
        <ToolBtn icon={<Music />} label="SONG" onClick={() => setActiveProtocol({id: 'msc', label: 'SONG', endpoint: '/create-song'})} />
      </div>

      <AnimatePresence>
        {activeProtocol && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col p-6">
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-cyan-400 font-black tracking-widest text-sm uppercase italic">Protocol: {activeProtocol.label}</h2>
              <button onClick={() => {setActiveProtocol(null); setResults([]); setPrompt(""); setSelectedResult(null);}} className="p-2 bg-white/5 rounded-full"><X size={20}/></button>
            </div>

            <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
              <div className="relative">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Describe your ${activeProtocol.label.toLowerCase()} idea...`}
                  className="w-full h-32 bg-zinc-900 border border-white/10 rounded-3xl p-6 outline-none focus:border-cyan-500 transition-all italic"
                />
                <button onClick={handleExecute} className="absolute bottom-4 right-4 bg-cyan-500 text-black p-3 rounded-2xl active:scale-95 shadow-lg shadow-cyan-500/20">
                  {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>

              {/* 3 Result Selection */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {results.map((res) => (
                  <div key={res.id} onClick={() => setSelectedResult(res.url)}
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-zinc-800 ${selectedResult === res.url ? 'border-cyan-400 scale-105 shadow-[0_0_15px_rgba(0,255,255,0.3)]' : 'border-transparent opacity-50'}`}>
                    <img src={res.url} alt="Variant" className="w-full h-32 object-cover" />
                    {selectedResult === res.url && <div className="absolute top-2 right-2 bg-cyan-400 rounded-full p-0.5 text-black"><CheckCircle size={14} /></div>}
                  </div>
                ))}
              </div>

              {/* Actions */}
              {selectedResult && (
                <div className="flex justify-between gap-3 mt-8 animate-in slide-in-from-bottom-5">
                  <ActionBtn icon={<Download size={18} />} label="SAVE" color="bg-zinc-800" />
                  {/* Browser-native navigation to avoid react-router-dom error */}
                  <ActionBtn icon={<Edit3 size={18} />} label="EDIT" color="bg-cyan-600" onClick={() => window.location.href = `/editor?source=${encodeURIComponent(selectedResult)}`} />
                  <ActionBtn icon={<Share2 size={18} />} label="PUBLISH" color="bg-blue-600" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToolBtn({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="bg-zinc-900/50 border border-white/5 p-6 rounded-[35px] flex flex-col items-center gap-3 active:scale-95 transition-all backdrop-blur-md">
      <div className="text-cyan-400">{icon}</div>
      <span className="text-[10px] font-black tracking-widest">{label}</span>
    </button>
  );
}

function ActionBtn({ icon, label, color, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex-1 ${color} p-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg`}>
      {icon} <span className="text-[10px] font-black tracking-tighter">{label}</span>
    </button>
  );
}
