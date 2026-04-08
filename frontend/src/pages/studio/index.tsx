import { useLocation } from "wouter";
import { ArrowLeft, Sparkles, Wand2, Image, Video, Mic } from "lucide-react";

export default function RXStudio() {
  const [, setLocation] = useLocation();

  const tools = [
    { name: 'Text to Video', icon: Video, color: 'text-purple-400' },
    { name: 'AI Image Gen', icon: Image, color: 'text-cyan-400' },
    { name: 'Voice Clone', icon: Mic, color: 'text-red-400' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="flex items-center gap-4 mb-10">
        <ArrowLeft onClick={() => setLocation('/hub')} className="text-zinc-400" />
        <h1 className="text-sm font-black italic tracking-[0.2em] uppercase">RX Studio Hub</h1>
      </div>

      <div className="bg-gradient-to-br from-cyan-600/20 to-purple-600/20 border border-white/10 p-8 rounded-[40px] mb-8 relative overflow-hidden">
        <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-white/5 rotate-12" />
        <h2 className="text-2xl font-black italic mb-2">Create the <br/> Impossible.</h2>
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Select an AI Node to begin</p>
      </div>

      <div className="space-y-4">
        {tools.map(tool => (
          <div key={tool.name} className="flex items-center justify-between p-6 bg-zinc-900/50 border border-white/5 rounded-3xl active:bg-white/5 transition-colors">
            <div className="flex items-center gap-4">
              <tool.icon size={20} className={tool.color} />
              <span className="text-xs font-black uppercase tracking-wider">{tool.name}</span>
            </div>
            <Wand2 size={16} className="text-zinc-600" />
          </div>
        ))}
      </div>
    </div>
  );
}
