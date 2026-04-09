import { ArrowLeft, Video, Image as ImageIcon, Mic, Sparkles, Wand2 } from "lucide-react";
import { useLocation } from "wouter";

// ✅ 'export default' hona zaroori hai Render build pass karne ke liye
export default function RXStudio() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans selection:bg-cyan-500/30">
      
      {/* Header with working Back Button */}
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => setLocation("/hub")} 
          className="p-2 active:scale-75 transition-all bg-zinc-900/50 rounded-xl border border-white/5"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black italic uppercase tracking-widest text-white">RX Studio Hub</h1>
      </div>

      {/* Hero Card */}
      <div className="relative h-44 rounded-[40px] bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-8 overflow-hidden mb-10 shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-black italic leading-tight text-white">Create the<br/>Impossible.</h2>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2 italic">Select an AI Node to begin</p>
        </div>
        <Sparkles className="absolute right-6 top-6 text-zinc-800/40" size={100} />
      </div>

      {/* Studio Nodes - Sare Buttons Functional */}
      <div className="space-y-4">
        {/* 1. Text to Video */}
        <StudioNode 
          title="Text to Video" 
          icon={<Video size={20} className="text-purple-500" />} 
          onClick={() => setLocation("/studio/editor")}
        />

        {/* 2. AI Image Gen (Connecting to Magic folder) */}
        <StudioNode 
          title="AI Image Gen" 
          icon={<ImageIcon size={20} className="text-cyan-500" />} 
          onClick={() => setLocation("/magic/image-gen")}
        />

        {/* 3. Voice Clone */}
        <StudioNode 
          title="Voice Clone" 
          icon={<Mic size={20} className="text-red-500" />} 
          onClick={() => setLocation("/studio/voice")}
        />

        {/* 4. AI Enhancer (Magic Wand functionality) */}
        <StudioNode 
          title="AI Enhancer" 
          icon={<Wand2 size={20} className="text-orange-500" />} 
          onClick={() => setLocation("/studio/enhance")}
        />

        {/* 5. Analytics (As per your screenshot) */}
        <StudioNode 
          title="Analytics" 
          icon={<Sparkles size={20} className="text-yellow-500" />} 
          onClick={() => setLocation("/studio/analytics")}
        />
      </div>
    </div>
  );
}

// Reusable Node Component (Bina kuch kate)
function StudioNode({ title, icon, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-zinc-900/30 border border-white/5 p-6 rounded-[30px] flex items-center justify-between group active:scale-[0.97] transition-all hover:bg-zinc-800/20"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-black rounded-2xl border border-white/5 group-hover:border-purple-500/50 transition-colors">
          {icon}
        </div>
        <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-200">{title}</span>
      </div>
      <Sparkles size={16} className="text-zinc-800 group-hover:text-purple-500 transition-colors" />
    </button>
  );
}
