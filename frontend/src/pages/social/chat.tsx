import { Send, Diamond, Plus, Image as ImageIcon, Mic } from "lucide-react";
import { useState } from "react";

export default function NexusChat() {
  const [msg, setMsg] = useState("");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-white/5 flex items-center gap-4 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 p-[1px]">
          <div className="w-full h-full bg-black rounded-[15px] overflow-hidden" />
        </div>
        <div>
          <h3 className="text-sm font-black italic uppercase">Nexus_User_88</h3>
          <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Online</p>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="bg-zinc-900/50 p-4 rounded-[20px] rounded-tl-none max-w-[80%] border border-white/5">
          <p className="text-xs text-zinc-300">Bhai, aapka naya AI video aag lga rha hai! 🔥</p>
        </div>
        
        {/* Diamond Gift Message */}
        <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-[25px] flex items-center gap-4 self-center mx-auto">
          <Diamond className="text-cyan-400 animate-bounce" size={20} />
          <p className="text-[10px] font-black italic uppercase">Sent 10 Diamonds as a Gift</p>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-zinc-950 border-t border-white/5 pb-10">
        <div className="flex items-center gap-3 bg-zinc-900 rounded-[30px] px-4 py-2">
          <button className="p-2 text-zinc-500 hover:text-cyan-400 transition-colors">
             <Plus size={20} />
          </button>
          <input 
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="TYPE PROTOCOL..." 
            className="flex-1 bg-transparent border-none outline-none text-xs font-bold uppercase tracking-widest p-3"
          />
          <button className="p-3 bg-cyan-500 rounded-2xl text-black active:scale-90 transition-all">
            <Send size={18} fill="black" />
          </button>
          {/* Diamond Gift Button */}
          <button className="p-3 bg-zinc-800 rounded-2xl text-cyan-400 hover:bg-zinc-700 transition-all">
            <Diamond size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
