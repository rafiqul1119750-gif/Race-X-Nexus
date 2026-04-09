import { ArrowLeft, Send, Sparkles, Zap, Shield, Globe } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function NeuralChat() {
  const [, setLocation] = useLocation();
  const [msg, setMsg] = useState("");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-6 font-sans">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/magic")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75 transition-all"><ArrowLeft size={20}/></button>
          <div className="flex items-center gap-2">
             <Sparkles className="text-cyan-400 animate-pulse" size={18} />
             <h1 className="text-lg font-black uppercase italic tracking-tighter text-cyan-400">Neural Chat</h1>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="p-2 bg-zinc-900 rounded-lg text-zinc-500"><Globe size={14}/></div>
           <div className="p-2 bg-zinc-900 rounded-lg text-zinc-500"><Shield size={14}/></div>
        </div>
      </header>

      {/* Chat Display Area */}
      <div className="flex-1 space-y-6 overflow-y-auto pb-10 scrollbar-hide">
        <div className="bg-zinc-900/40 border border-cyan-500/10 p-6 rounded-[35px] rounded-tl-none max-w-[90%]">
          <p className="text-[11px] font-bold text-cyan-100/80 leading-relaxed uppercase tracking-wide">
            Race-X Neural Link Online. <br/>
            I can generate code, scripts, or creative ideas for your studio. <br/>
            How can I help you today?
          </p>
        </div>
      </div>

      {/* Input Bar - Every dot is clickable */}
      <div className="relative mt-auto group">
        <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <input 
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          type="text" 
          placeholder="Command AI Engine..." 
          className="relative w-full bg-zinc-900/80 border border-white/10 rounded-full py-6 px-10 text-sm focus:border-cyan-500/50 outline-none transition-all pr-20 placeholder:text-zinc-700 placeholder:uppercase placeholder:font-black placeholder:text-[10px]" 
        />
        <button 
          onClick={() => { if(msg) { setMsg(""); alert("Processing in Nexus Cloud..."); } }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-cyan-500 p-4 rounded-full text-black hover:bg-cyan-400 active:scale-90 transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
