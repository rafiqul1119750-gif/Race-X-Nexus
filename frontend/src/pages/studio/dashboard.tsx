import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Mic, Music, PlaySquare, Send, X, Edit3, Download, Share2, Loader2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Editor page par bhejne ke liye

export default function NexusStudio() {
  const navigate = useNavigate();
  const [activeProtocol, setActiveProtocol] = useState<any>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]); // 3 Results store karne ke liye
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  const API_BASE = "https://race-x-nexus.onrender.com/api";

  const handleExecute = async () => {
    if (!prompt) return;
    setLoading(true);
    setResults([]); // Purane results saaf karein
    
    try {
      // Backend call - Hume 3 results chahiye
      const res = await fetch(`${API_BASE}${activeProtocol.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, count: 3 })
      });
      const data = await res.json();
      
      // Simulation: Agar backend 1 de raha hai toh hum 3 generate kar rahe hain testing ke liye
      const mockResults = [
        { id: 1, url: data.url || "https://placehold.co/400x400/0891b2/white?text=Variant+1" },
        { id: 2, url: data.url || "https://placehold.co/400x400/0e7490/white?text=Variant+2" },
        { id: 3, url: data.url || "https://placehold.co/400x400/155e75/white?text=Variant+3" }
      ];
      setResults(mockResults);
    } catch (err) {
      alert("Nexus Link Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden italic">
      
      {/* 🌐 Background Design */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, #00ffff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

      <h1 className="text-3xl font-black mb-10 tracking-tighter italic text-cyan-400">NEXUS STUDIO</h1>

      {/* Protocol Selection */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <ProtocolBtn icon={<ImageIcon />} label="IMAGE" onClick={() => setActiveProtocol({id: 'img', label: 'IMAGE', endpoint: '/create-image'})} />
        <ProtocolBtn icon={<PlaySquare />} label="VIDEO" onClick={() => setActiveProtocol({id: 'vid', label: 'VIDEO', endpoint: '/generate-movie'})} />
        <ProtocolBtn icon={<Mic />} label="VOICE" onClick={() => setActiveProtocol({id: 'aud', label: 'VOICE', endpoint: '/create-voice'})} />
        <ProtocolBtn icon={<Music />} label="SONG" onClick={() => setActiveProtocol({id: 'msc', label: 'SONG', endpoint: '/create-song'})} />
      </div>

      {/* 💬 MAIN HUB: Chat & Results Overlay */}
      <AnimatePresence>
        {activeProtocol && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col p-6">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-cyan-400 font-black tracking-widest text-sm uppercase italic">Protocol: {activeProtocol.label}</h2>
              <button onClick={() => {setActiveProtocol(null); setResults([]); setPrompt("");}} className="p-2 bg-white/5 rounded-full"><X size={20}/></button>
            </div>

            {/* Prompt Box */}
            <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
              <div className="relative">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Type your ${activeProtocol.label} prompt here...`}
                  className="w-full h-32 bg-zinc-900 border border-white/10 rounded-3xl p-6 outline-none focus:border-cyan-500 transition-all italic"
                />
                <button onClick={handleExecute} className="absolute bottom-4 right-4 bg-cyan-500 text-black p-3 rounded-2xl active:scale-95">
                  {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>

              {/* 3 Results Display */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {results.map((res) => (
                  <div key={res.id} onClick={() => setSelectedResult(res.url)}
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${selectedResult === res.url ? 'border-cyan-400 scale-105' : 'border-transparent opacity-60'}`}>
                    <img src={res.url} alt="Result" className="w-full h-32 object-cover" />
                    {selectedResult === res.url && <CheckCircle className="absolute top-2 right-2 text-cyan-400" size={16} />}
                  </div>
                ))}
              </div>

              {/* Action Bar (Jab user ek select kar le) */}
              {selectedResult && (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-between gap-3 mt-8">
                  <ActionBtn icon={<Download />} label="SAVE" color="bg-zinc-800" />
                  <ActionBtn icon={<Edit3 />} label="EDIT" color="bg-cyan-600" onClick={() => navigate('/editor', { state: { source: selectedResult } })} />
                  <ActionBtn icon={<Share2 />} label="PUBLISH" color="bg-blue-600" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable Components
function ProtocolBtn({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="bg-zinc-900 border border-white/5 p-6 rounded-[30px] flex flex-col items-center gap-3 hover:border-cyan-500/50 transition-all active:scale-95">
      <div className="text-cyan-400">{icon}</div>
      <span className="text-[10px] font-black tracking-widest">{label}</span>
    </button>
  );
}

function ActionBtn({ icon, label, color, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex-1 ${color} p-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all`}>
      {icon} <span className="text-[10px] font-black">{label}</span>
    </button>
  );
}
