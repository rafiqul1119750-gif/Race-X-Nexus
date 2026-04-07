import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Search, Edit3, ChevronLeft, 
  Circle, Sparkles, Camera, ShieldCheck 
} from 'lucide-react';

const ChatList = () => {
  const [, setLocation] = useLocation();

  // 💬 Diagram Data: List of Conversations
  const chats = [
    { id: 1, name: 'Cyber_Pilot', msg: 'AI Render looks insane! 🚀', time: '2m', unread: 2, online: true, isMagic: false },
    { id: 2, name: 'Race-X Magic', msg: 'Your 500 Diamonds are credited.', time: '1h', unread: 0, online: true, isMagic: true },
    { id: 3, name: 'Neon_Vibes', msg: 'Sent a voice note 🎙️', time: '5h', unread: 1, online: false, isMagic: false },
    { id: 4, name: 'Studio_Master', msg: 'Project exported successfully.', time: 'Yesterday', unread: 0, online: false, isMagic: false },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 relative overflow-hidden font-sans">
      
      {/* 🟢 Header Node (Back & New Message) */}
      <header className="flex justify-between items-center mb-8 pt-4 relative z-10">
        <button onClick={() => setLocation('/social')} className="p-3 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <h1 className="text-xl font-black italic tracking-tighter uppercase">Nexus <span className="text-cyan-400">Chat</span></h1>
        <button className="p-3 bg-cyan-500 rounded-2xl text-black shadow-[0_0_20px_#06b6d466]">
          <Edit3 className="w-5 h-5 stroke-[3]" />
        </button>
      </header>

      {/* 🟢 Search Node */}
      <div className="relative mb-8 z-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
        <input 
          type="text" 
          placeholder="SEARCH ENCRYPTED NODES..." 
          className="w-full bg-zinc-900/30 border border-zinc-800/50 p-4 pl-12 rounded-2xl focus:border-cyan-500/50 outline-none text-[10px] font-black tracking-[0.2em] uppercase transition-all"
        />
      </div>

      {/* 🟢 Active Pilots Node (Story Style) */}
      <div className="flex gap-4 overflow-x-auto mb-10 hide-scrollbar z-10 relative">
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="w-16 h-16 rounded-[24px] border-2 border-dashed border-zinc-800 flex items-center justify-center bg-zinc-900/20 group hover:border-cyan-500 transition-colors cursor-pointer">
             <Camera className="w-6 h-6 text-zinc-700 group-hover:text-cyan-400" />
          </div>
          <span className="text-[8px] font-black text-zinc-600 uppercase">Status</span>
        </div>
        
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 relative flex-shrink-0">
            <div className="w-16 h-16 rounded-[24px] bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-lg shadow-cyan-500/5">
              <div className="w-full h-full bg-black rounded-[22px] overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=pilot${i}`} alt="user" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-4 border-black rounded-full" />
            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter italic">Pilot_{i+1}</span>
          </div>
        ))}
      </div>

      {/* 🟢 Conversations List Node */}
      <div className="space-y-3 relative z-10">
        {chats.map((chat) => (
          <motion.div 
            whileTap={{ scale: 0.98 }}
            key={chat.id}
            onClick={() => setLocation(`/social/chat/${chat.id}`)}
            className="flex items-center gap-4 p-4 bg-zinc-900/10 border border-zinc-900 rounded-[28px] hover:bg-zinc-900/40 hover:border-zinc-800 transition-all cursor-pointer group"
          >
            {/* Avatar Logic */}
            <div className="relative">
              <div className={`w-14 h-14 rounded-[22px] overflow-hidden border-2 ${chat.isMagic ? 'border-purple-500 shadow-[0_0_15px_#a855f744]' : 'border-zinc-800/50'}`}>
                <img src={`https://i.pravatar.cc/150?u=${chat.id * 10}`} alt="avatar" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
              </div>
              {chat.online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-black rounded-full shadow-lg shadow-emerald-500/20" />
              )}
            </div>

            {/* Message Preview */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h4 className={`text-sm font-black uppercase tracking-tight italic ${chat.isMagic ? 'text-purple-400' : 'text-white'}`}>
                  {chat.isMagic && <Sparkles className="inline w-3 h-3 mr-1 animate-pulse" />}
                  {chat.name}
                </h4>
                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{chat.time}</span>
              </div>
              <p className={`text-[11px] truncate uppercase tracking-tighter italic ${chat.unread > 0 ? 'text-cyan-400 font-black' : 'text-zinc-500 font-medium'}`}>
                {chat.msg}
              </p>
            </div>

            {/* Unread Counter Node */}
            {chat.unread > 0 && (
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_#ffffff33]">
                <span className="text-[10px] font-black text-black leading-none">{chat.unread}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 🟢 Security Footer */}
      <div className="mt-12 text-center flex flex-col items-center gap-3 opacity-20 group hover:opacity-100 transition-opacity">
         <ShieldCheck className="w-8 h-8 text-zinc-600 group-hover:text-cyan-500 transition-colors" />
         <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-500">End-to-End Quantum Encryption</p>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ChatList;
