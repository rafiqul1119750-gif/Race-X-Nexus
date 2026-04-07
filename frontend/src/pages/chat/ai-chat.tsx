import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Sparkles, Send, Mic, 
  Zap, BrainCircuit, Image as ImageIcon, 
  Languages, Code, Wand2 
} from 'lucide-react';

const MagicAIChat = () => {
  const [, setLocation] = useLocation();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🧪 AI Chat History Node
  const [messages] = useState([
    { id: 1, text: "System Online. I am the Race-X Magic Core. How can I assist your creation today?", sender: "ai", type: "text" },
    { id: 2, text: "Generate a cyberpunk sunset for my next Reel background.", sender: "user", type: "text" },
    { id: 3, text: "Processing Magic Render...", sender: "ai", type: "action" },
  ]);

  const magicTools = [
    { name: 'Image Gen', icon: ImageIcon, color: 'text-cyan-400' },
    { name: 'Voice Synth', icon: Mic, color: 'text-purple-400' },
    { name: 'Translate', icon: Languages, color: 'text-emerald-400' },
    { name: 'Script AI', icon: Code, color: 'text-orange-400' },
  ];

  return (
    <div className="h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden font-sans">
      
      {/* ✨ Cinematic Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" />

      {/* 🟢 Header Node (Magic Core Info) */}
      <header className="p-6 pt-12 bg-black/40 backdrop-blur-2xl border-b border-zinc-800/50 flex items-center gap-4 z-20">
        <button onClick={() => setLocation('/hub')} className="p-2 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-tighter italic">Magic <span className="text-cyan-400">Core AI</span></h4>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
              <p className="text-[8px] font-black text-cyan-500 uppercase tracking-widest">Neural Link Active</p>
            </div>
          </div>
        </div>
      </header>

      {/* 🟢 AI Conversation Node */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar relative z-10">
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, x: msg.sender === 'ai' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            key={msg.id}
            className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[85%] p-5 rounded-[28px] text-[12px] font-bold leading-relaxed tracking-tight ${
              msg.sender === 'ai' 
              ? 'bg-zinc-900/50 border border-purple-500/20 text-zinc-200 rounded-tl-none backdrop-blur-md' 
              : 'bg-white text-black rounded-tr-none shadow-[0_0_25px_rgba(255,255,255,0.1)]'
            }`}>
              {msg.type === 'action' && <Sparkles className="w-4 h-4 mb-2 text-purple-400 animate-spin" />}
              {msg.text}
            </div>
          </motion.div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* 🟢 Magic Quick Tools (Horizontal Scroller) */}
      <div className="px-6 py-2 flex gap-3 overflow-x-auto hide-scrollbar z-20">
        {magicTools.map((tool) => (
          <button key={tool.name} className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl whitespace-nowrap group hover:border-cyan-500/50 transition-all">
            <tool.icon className={`w-3.5 h-3.5 ${tool.color}`} />
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">{tool.name}</span>
          </button>
        ))}
      </div>

      {/* 🟢 AI Input Node (The Command Center) */}
      <div className="p-6 pb-10 bg-black/80 backdrop-blur-xl z-20">
        <div className="flex flex-col gap-4">
          
          {/* Diamond Cost Indicator */}
          <div className="flex items-center gap-2 px-3">
            <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em]">Cost: 2 Diamonds / Query</span>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 p-2 pl-5 rounded-[32px] shadow-2xl focus-within:border-purple-500/50 transition-all">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="COMMAND THE MAGIC CORE..." 
              className="flex-1 bg-transparent outline-none text-[11px] font-black text-white placeholder:text-zinc-700 uppercase tracking-widest"
            />
            
            <button className="p-3 bg-gradient-to-tr from-purple-600 to-cyan-500 text-white rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95 transition-all">
              {input.length > 0 ? <Send className="w-4 h-4" /> : <Wand2 className="w-4 h-4 animate-pulse" />}
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
