import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ImageIcon, PlaySquare, Music, Film, Plus, Camera, 
  Image as GalleryIcon, FileText, HardDrive, Notebook, 
  Send, X, Loader2, CheckCircle, Edit3, Download, Share2 
} from "lucide-react";

export default function NexusStudio() {
  const [activeProtocol, setActiveProtocol] = useState<any>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  const protocols = [
    { id: 'img', label: 'IMAGE', icon: <ImageIcon />, endpoint: '/create-image' },
    { id: 'vid', label: 'VIDEO', icon: <PlaySquare />, endpoint: '/generate-movie' },
    { id: 'msc', label: 'MP3 SONG', icon: <Music />, endpoint: '/create-song' },
    { id: 'cnm', label: 'CINEMA', icon: <Film />, endpoint: '/create-cinema' }
  ];

  const handleExecute = async () => {
    if (!prompt) return;
    setLoading(true);
    setResults([]);
    
    // Yahan backend call ka logic aayega, abhi ke liye test variants:
    setTimeout(() => {
      setResults([
        { id: 1, url: `https://placehold.co/600x600/0891b2/white?text=${activeProtocol.label}+Variant+1` },
        { id: 2, url: `https://placehold.co/600x600/0e7490/white?text=${activeProtocol.label}+Variant+2` },
        { id: 3, url: `https://placehold.co/600x600/155e75/white?text=${activeProtocol.label}+Variant+3` }
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden italic">
      
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-transparent to-transparent" />

      <h1 className="text-4xl font-black mb-12 tracking-tighter text-cyan-400 italic">NEXUS STUDIO</h1>

      {/* Main Grid: 4 Pillars of Cinema */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-lg z-10">
        {protocols.map((p) => (
          <button 
            key={p.id}
            onClick={() => setActiveProtocol(p)}
            className="bg-zinc-900/80 border border-white/5 p-10 rounded-[45px] flex flex-col items-center gap-4 hover:border-cyan-500/40 hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl"
          >
            <div className="text-cyan-400 scale-150">{p.icon}</div>
            <span className="text-[10px] font-black tracking-[0.3em] mt-2">{p.label}</span>
          </button>
        ))}
      </div>

      {/* 🚀 AI Interaction Overlay (ChatGPT/Gemini Style) */}
      <AnimatePresence>
        {activeProtocol && (
          <motion.div 
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }} 
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-black flex flex-col p-6 overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 px-2">
              <div className="flex items-center gap-4">
                <div className="text-cyan-400 p-2 bg-white/5 rounded-2xl">{activeProtocol.icon}</div>
                <h2 className="font-black tracking-widest text-sm uppercase italic">Protocol: {activeProtocol.label}</h2>
              </div>
              <button 
                onClick={() => {setActiveProtocol(null); setResults([]); setPrompt(""); setSelectedResult(null);}} 
                className="p-3 bg-white/5 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-all"
              >
                <X size={24}/>
              </button>
            </div>

            {/* Chat & Creation Workspace */}
            <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto space-y-8 pb-36 px-2">
              
              {/* Typing Box */}
              <div className="bg-zinc-900/60 border border-white/10 rounded-[40px] p-5 relative group focus-within:border-cyan-500/50 transition-all shadow-2xl">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Type your ${activeProtocol.label.toLowerCase()} idea here...`}
                  className="w-full h-36 bg-transparent p-4 outline-none resize-none italic text-xl placeholder:text-zinc-700"
                />
                
                <div className="flex items-center justify-between mt-4 px-2">
                  {/* Attachment Section (+) Menu */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowAttachments(!showAttachments)}
                      className={`p-4 rounded-full transition-all ${showAttachments ? 'bg-cyan-500 text-black rotate-45' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
                    >
                      <Plus size={24} />
                    </button>

                    <AnimatePresence>
                      {showAttachments && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8, y: 10 }} 
                          animate={{ opacity: 1, scale: 1, y: -15 }} 
                          exit={{ opacity: 0, scale: 0.8, y: 10 }} 
                          className="absolute bottom-full left-0 mb-4 flex flex-col gap-2 bg-zinc-900 border border-white/10 p-3 rounded-[30px] shadow-2xl w-48"
                        >
                          <AttachmentBtn icon={<Camera size={18}/>} label="Camera" />
                          <AttachmentBtn icon={<GalleryIcon size={18}/>} label="Gallery" />
                          <AttachmentBtn icon={<FileText size={18}/>} label="Files" />
                          <AttachmentBtn icon={<HardDrive size={18}/>} label="Cloud Drive" />
                          <AttachmentBtn icon={<Notebook size={18}/>} label="Rx Notebook" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Generate Button */}
                  <button 
                    onClick={handleExecute} 
                    disabled={loading || !prompt}
                    className="bg-white text-black px-8 py-4 rounded-[30px] font-black flex items-center gap-3 active:scale-95 disabled:opacity-20 transition-all hover:bg-cyan-400"
                  >
                    {loading ? <Loader2 className="animate-spin" size={24}/> : <><Send size={22}/> RUN AI</>}
                  </button>
                </div>
              </div>

              {/* AI Results Display */}
              {results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-10">
                  {results.map((res) => (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      key={res.id} 
                      onClick={() => setSelectedResult(res.url)}
                      className={`relative rounded-[35px] overflow-hidden border-2 transition-all cursor-pointer aspect-square bg-zinc-900 shadow-xl ${selectedResult === res.url ? 'border-cyan-400 ring-4 ring-cyan-500/20' : 'border-transparent opacity-50'}`}
                    >
                      <img src={res.url} alt="AI Result" className="w-full h-full object-cover" />
                      {selectedResult === res.url && (
                        <div className="absolute inset-0 bg-cyan-400/20 flex items-center justify-center backdrop-blur-sm">
                          <CheckCircle className="text-white drop-shadow-lg" size={48}/>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Creation Final Actions */}
              {selectedResult && (
                <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex gap-4">
                  <ActionBtn icon={<Download />} label="SAVE TO VAULT" color="bg-zinc-900" />
                  <ActionBtn icon={<Edit3 />} label="OPEN IN EDITOR" color="bg-cyan-600" onClick={() => window.location.href=`/editor?src=${encodeURIComponent(selectedResult)}`} />
                  <ActionBtn icon={<Share2 />} label="PUBLISH TO FEED" color="bg-blue-600" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-Component: Attachment Buttons
function AttachmentBtn({ icon, label }: any) {
  return (
    <button className="flex items-center gap-4 w-full px-4 py-3 hover:bg-white/5 rounded-2xl transition-all text-[11px] font-black tracking-widest text-zinc-400 hover:text-cyan-400 uppercase">
      {icon} <span>{label}</span>
    </button>
  );
}

// Sub-Component: Action Buttons
function ActionBtn({ icon, label, color, onClick }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`flex-1 ${color} p-6 rounded-[35px] flex items-center justify-center gap-4 active:scale-95 transition-all shadow-2xl border border-white/5`}
    >
      {icon} <span className="text-[10px] font-black tracking-[0.2em]">{label}</span>
    </button>
  );
}
