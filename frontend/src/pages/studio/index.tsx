import { ArrowLeft, Video, Image as ImageIcon, Mic, Sparkles, BarChart2 } from "lucide-react";
import { useLocation } from "wouter";

export default function StudioIndex() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => setLocation("/hub")} className="p-2 active:scale-75 transition-all"><ArrowLeft size={24} /></button>
        <h1 className="text-xl font-black italic uppercase tracking-widest">RX Studio Hub</h1>
      </div>

      <div className="relative h-44 rounded-[40px] bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-8 overflow-hidden mb-10">
        <div className="relative z-10">
          <h2 className="text-3xl font-black italic leading-tight">Create the<br/>Impossible.</h2>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">Select an AI Node to begin</p>
        </div>
        <Sparkles className="absolute right-6 top-6 text-zinc-800/40" size={100} />
      </div>

      <div className="space-y-4">
        <StudioNode title="Text to Video" icon={<Video size={20} className="text-purple-500" />} onClick={() => setLocation("/studio/editor")} />
        <StudioNode title="AI Image Gen" icon={<ImageIcon size={20} className="text-cyan-500" />} onClick={() => setLocation("/magic/image-gen")} />
        <StudioNode title="Voice Clone" icon={<Mic size={20} className="text-red-500" />} onClick={() => setLocation("/studio/voice")} />
        <StudioNode title="Analytics" icon={<BarChart2 size={20} className="text-yellow-500" />} onClick={() => setLocation("/studio/analytics")} />
      </div>
    </div>
  );
}

function StudioNode({ title, icon, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full bg-zinc-900/30 border border-white/5 p-6 rounded-[30px] flex items-center justify-between active:scale-[0.97] transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-black rounded-2xl border border-white/5">{icon}</div>
        <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-200">{title}</span>
      </div>
      <Sparkles size={16} className="text-zinc-800" />
    </button>
  );
}
