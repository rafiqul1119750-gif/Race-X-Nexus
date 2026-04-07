import React, { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Video, Image as ImageIcon, X, 
  Zap, ShieldCheck, Music, Hash, ArrowUpCircle, RefreshCw 
} from 'lucide-react';

const SocialCreate = () => {
  const [, setLocation] = useLocation();
  const [media, setMedia] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState("Idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🧪 AI Scanning Logic (As per Diagram: 18+ & Copyright)
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(URL.createObjectURL(file));
      startAIScan();
    }
  };

  const startAIScan = () => {
    setIsScanning(true);
    setScanStatus("Scanning for 18+ Content...");
    
    setTimeout(() => setScanStatus("Checking Copyright Assets..."), 2000);
    setTimeout(() => {
      setScanStatus("Safety Verified ✅");
      setIsScanning(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 relative overflow-hidden">
      
      {/* 🔴 Header Node */}
      <div className="flex justify-between items-center mb-10">
        <button onClick={() => setLocation('/social')} className="p-2 bg-zinc-900 rounded-full">
          <X className="w-6 h-6 text-zinc-400" />
        </button>
        <h2 className="text-[11px] font-black tracking-[0.4em] uppercase italic text-cyan-400">Studio Mode</h2>
        <div className="w-10" /> 
      </div>

      {!media ? (
        /* 🔵 Initial Capture Node */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center mt-20"
        >
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-[40px] border-2 border-dashed border-zinc-800 flex items-center justify-center group cursor-pointer hover:border-cyan-500 transition-all shadow-[0_0_50px_rgba(6,182,212,0.1)]"
          >
            <PlusIcon className="w-12 h-12 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
          </div>
          <input type="file" ref={fileInputRef} hidden onChange={handleUpload} accept="video/*,image/*" />
          
          <h3 className="mt-8 text-xl font-black italic uppercase tracking-tighter">Initialize Content</h3>
          <p className="text-[10px] text-zinc-500 font-bold mt-2 uppercase tracking-widest text-center">Upload Reels, Shorts or Nexus Magic</p>

          <div className="grid grid-cols-2 gap-4 mt-12 w-full">
            <button className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 flex flex-col items-center gap-3">
              <Camera className="w-6 h-6 text-purple-400" />
              <span className="text-[9px] font-black uppercase tracking-widest">Camera</span>
            </button>
            <button className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 flex flex-col items-center gap-3">
              <Video className="w-6 h-6 text-cyan-400" />
              <span className="text-[9px] font-black uppercase tracking-widest">Reel Mode</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* 🟢 Editor & Scan Node */
        <div className="space-y-6">
          <div className="w-full aspect-[9/16] bg-zinc-900 rounded-[40px] relative overflow-hidden border border-zinc-800">
             {/* Preview Image/Video */}
             <img src={media} alt="Preview" className="w-full h-full object-cover opacity-60" />

             {/* AI Scanning Overlay */}
             <AnimatePresence>
               {isScanning && (
                 <motion.div 
                   initial={{ top: "0%" }}
                   animate={{ top: "100%" }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-20"
                 />
               )}
             </AnimatePresence>
             
             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="text-center">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-2">{scanStatus}</p>
                   {isScanning && <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto" />}
                </div>
             </div>
          </div>

          {/* Form Fields Node */}
          <div className="space-y-3">
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4">
               <Music className="w-5 h-5 text-zinc-500" />
               <input type="text" placeholder="Add Sound Sync..." className="bg-transparent outline-none text-xs font-bold w-full uppercase" />
            </div>
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 flex items-start gap-4">
               <Hash className="w-5 h-5 text-zinc-500 mt-1" />
               <textarea placeholder="Describe your creation..." className="bg-transparent outline-none text-xs font-bold w-full h-20 uppercase resize-none" />
            </div>
          </div>

          {/* Final Action Node */}
          <button 
            disabled={isScanning}
            className={`w-full p-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
              isScanning ? 'bg-zinc-900 text-zinc-700' : 'bg-cyan-500 text-black shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:bg-white'
            }`}
          >
            Post to Nexus <ArrowUpCircle className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Safety Badge Node */}
      <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
        <ShieldCheck className="w-4 h-4 text-cyan-400" />
        <span className="text-[8px] font-bold uppercase tracking-widest">AI Protected Content System</span>
      </div>

    </div>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default SocialCreate;
