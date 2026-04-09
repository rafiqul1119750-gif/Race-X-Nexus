import { ArrowLeft, Video, Mic, Sparkles, BarChart2, Wand2, Scissors, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function StudioIndex() {
  const [, setLocation] = useLocation();

  const tools = [
    { name: "Cinema AI", icon: <Video className="text-purple-500" />, path: "/studio/editor", desc: "Text to 4K Video" },
    { name: "Voice Lab", icon: <Mic className="text-red-500" />, path: "/studio/voice", desc: "Cloning & Dubbing" },
    { name: "Magic Fix", icon: <Wand2 className="text-cyan-500" />, path: "/studio/enhance", desc: "Photo Restoration" },
    { name: "Creator Stats", icon: <BarChart2 className="text-yellow-500" />, path: "/studio/analytics", desc: "Engagement Data" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans overflow-hidden">
      <header className="flex items-center gap-4 mb-10">
        <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900/80 rounded-2xl active:scale-75 transition-all border border-white/5">
          <ArrowLeft size={24} className="text-purple-400" />
        </button>
        <h1 className="text-xl font-black italic uppercase tracking-[0.2em]">RX Studio</h1>
      </header>

      {/* Featured Tool - Cinema AI */}
      <div 
        onClick={() => setLocation("/studio/editor")}
        className="relative h-56 rounded-[50px] bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/20 p-8 mb-8 cursor-pointer active:scale-[0.98] transition-all group overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={12} className="text-purple-400 fill-purple-400" />
            <span className="text-[8px] font-black uppercase tracking-widest">Production Mode</span>
          </div>
          <h2 className="text-4xl font-black italic uppercase leading-none mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">Cinema<br/>Engine</h2>
          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Start generating AI movies</p>
        </div>
        <Video className="absolute right-[-20px] bottom-[-20px] text-purple-500/10 group-hover:rotate-12 transition-transform" size={180} />
      </div>

      {/* Tools List */}
      <div className="space-y-4">
        {tools.map((tool) => (
          <button 
            key={tool.name} 
            onClick={() => setLocation(tool.path)}
            className="w-full bg-zinc-900/20 border border-white/5 p-6 rounded-[35px] flex items-center justify-between active:scale-[0.97] transition-all hover:bg-zinc-900/40 group"
          >
            <div className="flex items-center gap-5">
              <div className="p-4 bg-black rounded-[22px] border border-white/5 group-hover:border-purple-500/30 transition-colors">{tool.icon}</div>
              <div className="text-left">
                <span className="block text-xs font-black uppercase tracking-widest">{tool.name}</span>
                <span className="text-[9px] font-bold text-zinc-600 uppercase mt-1">{tool.desc}</span>
              </div>
            </div>
            <Scissors size={14} className="text-zinc-700" />
          </button>
        ))}
      </div>
    </div>
  );
}
