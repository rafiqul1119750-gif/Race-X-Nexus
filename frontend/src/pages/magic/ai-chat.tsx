import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export default function NeuralChat() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-6">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => setLocation("/magic")} className="p-2"><ArrowLeft /></button>
        <div className="flex items-center gap-2">
          <Sparkles className="text-cyan-400" size={18} />
          <h1 className="text-lg font-black uppercase italic">Neural AI</h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center items-center text-zinc-700">
        <Sparkles size={60} className="mb-4 opacity-10" />
        <p className="text-[10px] uppercase font-black tracking-[0.4em]">Initialize Neural Link...</p>
      </div>

      <div className="relative mt-auto">
        <input 
          type="text" 
          placeholder="Ask Race-X AI..." 
          className="w-full bg-zinc-900 border border-white/5 rounded-full py-5 px-8 text-sm focus:outline-none focus:border-cyan-500/50" 
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-cyan-500 p-3 rounded-full text-black">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
