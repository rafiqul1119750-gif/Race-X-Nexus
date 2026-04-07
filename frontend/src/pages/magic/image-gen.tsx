import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Wand2, Zap, Image as ImageIcon, 
  Layers3, Smile, BotMessageSquare, RefreshCw, X
} from 'lucide-react';

const ImageGenerator = () => {
  const [, setLocation] = useLocation();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cyberpunk 2077");
  const [ratio, setRatio] = useState("9:16 (Reel)");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // 🖼️ Generator Config Node from Diagram
  const styles = ["Cyberpunk 2077", "Anime (Jujutsu)", "Vaporwave Neon", "Pixel Art HD", "Photorealistic 8K"];
  const ratios = ["9:16 (Reel)", "1:1 (Post)", "16:9 (Landscape)"];

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    // Simulation logic (replace with real API)
    setTimeout(() => {
      setGeneratedImage(`https://placehold.co/1080x1920/111/00e1ff?text=Generated+${prompt.substring(0, 10)}`);
      setIsGenerating(false);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 pb-24 relative overflow-hidden font-sans">
      
      {/* ✨ Independent Magic Module Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />

      {/* 🟢 Header Node (Direct Hub Connection) */}
      <header className="flex justify-between items-center mb-10 pt-4 z-10 relative">
        <button onClick={() => setLocation('/hub')} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
             <ImageIcon className="w-6 h-6 text-black" />
           </div>
           <div>
              <h1 className="text-xl font-black italic tracking-tighter uppercase">IMAGE <span className="text-cyan-400">GEN</span></h1>
              <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Neural Link v0.9 Beta</p>
           </div>
        </div>
        <button className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-purple-400">
          <BotMessageSquare className="w-5 h-5" />
        </button>
      </header>

      {/* 🟢 Generation Canvas Node */}
      <div className="w-full aspect-[9/16] bg-gradient-to-br from-zinc-900 to-black border-2 border-dashed border-zinc-800 rounded-[32px] mb-8 p-3 flex items-center justify-center relative overflow-hidden z-10 group">
        <AnimatePresence>
          {isGenerating && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/70 backdrop-blur-md">
                <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                <p className="text-[10px] font-black uppercase text-cyan-400 tracking-[0.3em]">PROCESSING MAGIC</p>
            </motion.div>
          )}
        </AnimatePresence>

        {generatedImage ? (
          <img src={generatedImage} alt="Generated Asset" className="w-full h-full object-cover rounded-2xl" />
        ) : (
          <div className="text-center opacity-30 group-hover:opacity-100 transition-opacity">
            <Layers3 className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Wait for Creator Commands...</p>
          </div>
        )}
      </div>

      {/* 🟢 Generation Config Node (Prompt & Tools) */}
      <div className="space-y-5 z-10 relative">
        
        {/* Prompt Input */}
        <div className="relative flex items-start bg-zinc-900 border border-zinc-800 p-4 rounded-3xl focus-within:border-cyan-500/50 transition-all">
          <Wand2 className="w-5 h-5 text-zinc-500 mt-1" />
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="DESCRIBE YOUR CREATION (e.g. Cyberpunk samurai overlooking Tokyo)..." 
            className="flex-1 bg-transparent outline-none text-[11px] font-medium text-white placeholder:text-zinc-700 uppercase tracking-tight h-16 resize-none pr-6"
          />
          {prompt.length > 0 && (
            <button onClick={() => setPrompt("")} className="absolute top-4 right-4 text-zinc-600 hover:text-white"><X className="w-4 h-4"/></button>
          )}
        </div>

        {/* Dynamic Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <Selector title="Visual Style" value={style} items={styles} setValue={setStyle} Icon={Smile}/>
          <Selector title="Aspect Ratio" value={ratio} items={ratios} setValue={setRatio} Icon={Layers3}/>
        </div>
        
        {/* 🚀 Generate Button Node (Direct Diamond Flow) */}
        <motion.button 
          whileTap={{ scale: 0.98 }}
          disabled={isGenerating || !prompt}
          onClick={handleGenerate}
          className={`w-full p-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all ${
            isGenerating || !prompt 
            ? 'bg-zinc-900 text-zinc-700 opacity-50' 
            : 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:bg-cyan-500 hover:text-black'
          }`}
        >
          {isGenerating ? 'GEN-MAGIC-PROCESSING' : 'Generate Asset'}
          <div className="flex items-center gap-1.5 px-3 py-1 border-l border-black/20 group">
             <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
             <span className="text-[10px] font-black">5</span>
          </div>
        </motion.button>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

// --- Helper Select Component ---
interface SelectorProps { title: string; value: string; items: string[]; setValue: (val: string) => void; Icon: any }
const Selector: React.FC<SelectorProps> = ({ title, value, items, setValue, Icon }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-zinc-700 transition-colors">
         <Icon className="w-4 h-4 text-purple-400" />
         <div>
            <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest leading-none">{title}</p>
            <p className="text-[11px] font-bold text-white uppercase tracking-tight leading-none mt-1.5">{value.substring(0, 15)}...</p>
         </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-[-10px] left-0 right-0 translate-y-full bg-zinc-900 border border-zinc-800 rounded-2xl p-2 z-50 shadow-2xl space-y-1">
             {items.map((item) => (
                <button key={item} onClick={() => { setValue(item); setOpen(false); }} className={`w-full text-left px-3 py-2 text-[10px] font-black uppercase rounded-lg ${value === item ? 'bg-purple-500/20 text-purple-400' : 'text-zinc-400 hover:bg-zinc-800'}`}>
                  {item}
                </button>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGenerator;
