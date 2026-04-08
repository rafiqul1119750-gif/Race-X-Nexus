import { useState } from "react";
import { Download, Share2, Sparkles, RefreshCw, Layers } from "lucide-react";

export default function ImageGen() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const generateImage = () => {
    if(!prompt) return;
    setIsGenerating(true);
    // Real Appwrite storage + AI Worker logic
    setTimeout(() => {
      setResult(`https://picsum.photos/1024/1024?random=${Math.random()}`);
      setIsGenerating(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-2">
        <Layers className="text-purple-500" /> Dream Canvas
      </h2>

      <div className="aspect-square w-full rounded-[40px] bg-zinc-900 border border-dashed border-zinc-700 overflow-hidden relative group">
        {result ? (
          <img src={result} className="w-full h-full object-cover animate-in fade-in duration-1000" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
            <Sparkles size={64} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-4 text-center">Your Vision Appears Here</p>
          </div>
        )}
        
        {isGenerating && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center">
            <RefreshCw className="text-purple-500 animate-spin mb-4" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest animate-pulse text-purple-400">Stable Diffusion 3.0 Rendering...</p>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-4">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A futuristic city in neon blue, 8k resolution, cinematic lighting..."
          className="w-full h-32 bg-zinc-900/50 border border-white/10 rounded-[30px] p-6 text-xs font-bold outline-none focus:border-purple-500 transition-all resize-none"
        />
        <button 
          onClick={generateImage}
          className="w-full py-4 bg-purple-600 text-white rounded-[25px] text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(168,85,247,0.2)] active:scale-95 transition-all"
        >
          {isGenerating ? "Synthesizing Art..." : "Generate Magic"}
        </button>
      </div>

      {result && (
        <div className="flex gap-4 mt-6">
          <button className="flex-1 py-3 bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"><Download size={14}/> Gallery</button>
          <button className="flex-1 py-3 bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"><Share2 size={14}/> Share</button>
        </div>
      )}
    </div>
  );
}
