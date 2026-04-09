import { ArrowLeft, Mic2, Volume2, Save, Wand2, AudioLines, Share2 } from "lucide-react";
import { useLocation } from "wouter";

export default function VoiceLab() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans">
      <header className="flex items-center justify-between mb-10">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20}/>
        </button>
        <h2 className="text-sm font-black italic uppercase tracking-[0.3em]">RX Voice Lab</h2>
        <button className="p-3 bg-zinc-900 rounded-2xl border border-white/5 text-zinc-500"><Share2 size={18}/></button>
      </header>

      {/* Visualizer Area */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-[45px] p-10 mb-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="flex items-center gap-1 h-12 mb-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
        <p className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">Neural Voice Ready</p>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="bg-zinc-900 border border-white/10 p-7 rounded-[35px] flex flex-col items-center gap-4 active:bg-white active:text-black transition-all">
          <Mic2 size={24} />
          <span className="text-[8px] font-black uppercase tracking-widest text-center">Clone<br/>My Voice</span>
        </button>
        <button className="bg-zinc-900 border border-white/10 p-7 rounded-[35px] flex flex-col items-center gap-4 active:bg-white active:text-black transition-all">
          <Volume2 size={24} />
          <span className="text-[8px] font-black uppercase tracking-widest text-center">Premium<br/>AI TTS</span>
        </button>
      </div>

      {/* Input Box */}
      <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-[40px]">
        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6">Script for Dubbing</h3>
        <textarea 
          placeholder="Paste your script here..."
          className="w-full bg-transparent border-b border-white/10 pb-6 text-sm focus:border-purple-500 outline-none h-28 resize-none mb-8 transition-all"
        />
        <button className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-[25px] font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all">
           <Wand2 size={18} /> Synthesize Dub
        </button>
      </div>
    </div>
  );
}
