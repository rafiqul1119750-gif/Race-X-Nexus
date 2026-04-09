import { ArrowLeft, Mic2, Volume2, Save, Wand2 } from "lucide-react";
import { useLocation } from "wouter";

export default function VoiceLab() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans">
      <header className="flex items-center gap-4 mb-10">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5"><ArrowLeft size={20}/></button>
        <h2 className="text-lg font-black italic uppercase tracking-widest">Voice Lab</h2>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <button className="bg-zinc-900/50 border border-white/5 p-8 rounded-[40px] flex flex-col items-center gap-3">
          <Mic2 className="text-purple-500" size={30} />
          <span className="text-[10px] font-black uppercase tracking-widest">Clone Voice</span>
        </button>
        <button className="bg-zinc-900/50 border border-white/5 p-8 rounded-[40px] flex flex-col items-center gap-3">
          <Volume2 className="text-cyan-500" size={30} />
          <span className="text-[10px] font-black uppercase tracking-widest">AI TTS</span>
        </button>
      </div>

      <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-[40px]">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6">Text to Dub</h3>
        <textarea 
          placeholder="Enter text to convert into cloned voice..."
          className="w-full bg-transparent border-b border-white/10 pb-4 text-sm focus:border-purple-500 outline-none h-24 resize-none mb-6"
        />
        <button className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-2">
           <Wand2 size={16} /> Synthesize Voice
        </button>
      </div>
    </div>
  );
}
