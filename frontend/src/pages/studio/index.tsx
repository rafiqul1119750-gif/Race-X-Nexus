import { ArrowLeft, Video, Image as ImageIcon, Mic, Sparkles, Wand2 } from "lucide-react";
import { useLocation } from "wouter";

export default function RXStudio() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => setLocation("/hub")} className="p-2 active:scale-90 transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black italic uppercase tracking-widest">RX Studio Hub</h1>
      </div>

      {/* Hero Card */}
      <div className="relative h-44 rounded-[40px] bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-8 overflow-hidden mb-10 shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-black italic leading-tight">Create the<br/>Impossible.</h2>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">Select an AI Node to begin</p>
        </div>
        <Sparkles className="absolute right-6 top-6 text-zinc-800/50" size={100} />
      </div>

      {/* Studio Nodes (Sab buttons functional hain) */}
      <div className="space-y-4">
        <StudioNode 
          title="Text to Video" 
          icon={<Video size={20} className="text-purple-500" />} 
          onClick={() => setLocation("/studio/video")}
        />
        <StudioNode 
          title="AI Image Gen" 
          icon={<ImageIcon size={20} className="text-cyan-500" />} 
          onClick={() => setLocation("/magic/image-gen")}
        />
        <StudioNode 
          title="Voice Clone" 
          icon={<Mic size={20} className="text-red-500" />} 
          onClick={() => setLocation("/studio/voice")}
        />
        <StudioNode 
          title="AI Enhancer" 
          icon={<Wand2 size={20} className="text-orange-500" />} 
          onClick={() => setLocation("/studio/enhance")}
        />
      </div>
    </div>
  );
}

function StudioNode({ title, icon, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-zinc-900/30 border border-white/5 p-6 rounded-[30px] flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-zinc-900/60"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-black rounded-2xl border border-white/5 group-hover:border-cyan-500/30 transition-colors">
          {icon}
        </div>
        <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-200">{title}</span>
      </div>
      <div className="text-zinc-800 group-hover:text-cyan-500 transition-colors">
        <Sparkles size={16} />
      </div>
    </button>
  );
}
