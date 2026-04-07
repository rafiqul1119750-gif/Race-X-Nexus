import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Sparkles, Send, Mic, 
  Zap, BrainCircuit, Image as ImageIcon, 
  Languages, Code, Wand2, History
} from 'lucide-react';

const MagicAIChat = () => {
  const [, setLocation] = useLocation();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🧪 AI Chat Data (Independent Module Flow)
  const [messages] = useState([
    { id: 1, text: "NEXUS MAGIC CORE ONLINE. Waiting for creation commands...", sender: "ai", type: "text" },
    { id: 2, text: "I need a high-res script for a 30-second tech review.", sender: "user", type: "text" },
  ]);

  return (
    <div className="h-screen bg-[#020202] text-white flex flex-col relative overflow-hidden font-sans">
      
      {/* ✨ Independent Magic Module Glow */}
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full" />

      {/* 🟢 Header Node (Direct Hub Connection) */}
      <header className="p-6 pt-12 bg-zinc-950/80 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation('/hub')} className="p-2 bg-zinc-900 rounded-xl border border-zinc-800">
            <ChevronLeft className="w-5 h-5 text-zinc-400" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.1)]">
              <BrainCircuit className="w-6 h-6 text-black" />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-tighter">MAGIC <span className="text-purple-500">CORE</span></h4>
              <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Level 4 Neural Link</p>
            </div>
          </div>
        </div>
        <button className="p-2 text-zinc-500 hover:text-white transition-colors">
          <History className="w-5 h-5" />
        </button>
      </header>

      {/* 🟢 AI Workspace Node */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar relative z-10">
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[85%] p-5 rounded-[24px] text-[12px] font-bold tracking-tight leading-relaxed ${
              msg.sender === 'ai' 
              ? 'bg-zinc-900/50 border border-zinc-800 text-zinc-300 rounded-tl-none' 
              : 'bg-white text-black rounded-tr-none'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* 🟢 Magic Tool Grid Node */}
      <div className="px-6 py-4 grid grid-cols-4 gap-2 z-20 bg-black/50 border-t border-white/5">
        {[
          { icon: ImageIcon, label: 'IMG' },
          { icon: Mic, label: 'VOX' },
          { icon: Languages, label: 'TRANSL' },
          { icon: Code, label: 'CODE' }
        ].map((tool, i) => (
          <button key={i} className="flex flex-col items-center gap-2 p-3 bg-zinc-900/30 rounded-2xl border border-zinc-800 hover:border-purple-500 transition-all">
            <tool.icon className="w-4 h-4 text-purple-400" />
            <span className="text-[7px] font-black text-zinc-600 uppercase">{tool.label}</span>
          </button>
        ))}
      </div>

      {/* 🟢 Input Command Node */}
      <div className="p-6 pb-12 bg-black z-20">
        <div className="relative flex items-center bg-zinc-900 border border-zinc-800 p-2 pl-5 rounded-[28px] focus-within:border-white/20 transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="EXECUTE MAGIC COMMAND..." 
            className="flex-1 bg-transparent outline-none text-[11px] font-black text-white placeholder:text-zinc-700 uppercase tracking-widest"
          />
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 border-l border-zinc-800">
              <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
              <span className="text-[8px] font-black text-zinc-500">2</span>
            </div>
            <button className="p-3 bg-white text-black rounded-full hover:bg-purple-500 hover:text-white transition-all">
              <Wand2 className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MagicAIChat;
