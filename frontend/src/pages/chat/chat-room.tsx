import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, MoreVertical, Send, Mic, 
  Plus, Image as ImageIcon, Smile, Sparkles, ShieldCheck 
} from 'lucide-react';

const ChatRoom = () => {
  const [, setLocation] = useLocation();
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 💬 Diagram Data: Message History
  const [messages] = useState([
    { id: 1, text: "Yo! Did you see the new AI Studio update?", sender: "other", time: "10:00 AM" },
    { id: 2, text: "Yeah, the 3D rendering is lightning fast now. ⚡", sender: "me", time: "10:02 AM" },
    { id: 3, text: "I just earned 200 Diamonds from my last Reel!", sender: "other", time: "10:05 AM" },
  ]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">
      
      {/* 🟢 Header Node (Pilot Info) */}
      <header className="p-5 pt-12 bg-zinc-900/40 backdrop-blur-xl border-b border-zinc-800/50 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation('/social/chat-list')} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-zinc-400" />
          </button>
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-cyan-500/30">
              <img src="https://i.pravatar.cc/150?u=pilot1" alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight italic">Cyber_Pilot</h4>
            <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Active Now</p>
          </div>
        </div>
        <button className="p-2 text-zinc-500"><MoreVertical className="w-5 h-5" /></button>
      </header>

      {/* 🟢 Chat Messages Node */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-[24px] text-[12px] font-medium leading-relaxed tracking-tight ${
              msg.sender === 'me' 
              ? 'bg-white text-black rounded-tr-none shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
              : 'bg-zinc-900 text-zinc-300 rounded-tl-none border border-zinc-800'
            }`}>
              {msg.text}
            </div>
            <span className="text-[8px] font-black text-zinc-600 uppercase mt-2 tracking-widest italic">{msg.time}</span>
          </motion.div>
        ))}
        
        {/* Magic AI Suggestion Node */}
        <div className="flex items-center gap-2 py-4 border-t border-zinc-900 mt-4">
           <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
           <span className="text-[8px] font-black text-purple-400 uppercase tracking-[0.3em]">AI Suggestion: "That's huge! Congrats on the Diamonds!"</span>
        </div>
        
        <div ref={scrollRef} />
      </div>

      {/* 🟢 Input Node (The Control Center) */}
      <div className="p-6 bg-black border-t border-zinc-900 pb-10">
        <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-2 pl-4 rounded-[32px] focus-within:border-cyan-500/50 transition-all">
          <button className="text-zinc-500 hover:text-cyan-400 transition-colors"><Plus className="w-5 h-5" /></button>
          
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="TYPE ENCRYPTED..." 
            className="flex-1 bg-transparent outline-none text-[11px] font-bold text-white placeholder:text-zinc-700 uppercase tracking-wider"
          />

          <AnimatePresence mode="wait">
            {message.length > 0 ? (
              <motion.button 
                key="send"
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="p-3 bg-white text-black rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.div key="tools" className="flex items-center gap-2 pr-2">
                <button className="p-2 text-zinc-500"><ImageIcon className="w-5 h-5" /></button>
                <button className="p-3 bg-cyan-500 text-black rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <Mic className="w-5 h-5 stroke-[2.5]" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Encryption Badge */}
        <div className="flex items-center justify-center gap-2 mt-4 opacity-20">
           <ShieldCheck className="w-3 h-3 text-zinc-500" />
           <span className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.5em]">Quantum Nexus Encryption</span>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ChatRoom;
