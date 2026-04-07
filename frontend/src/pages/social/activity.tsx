import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, MessageCircle, UserPlus, Zap, 
  ChevronRight, Bell, Filter, Star 
} from 'lucide-react';

const SocialActivity = () => {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState('All');

  // 🔔 Activity Data Node (Mock data for UI)
  const activities = [
    { id: 1, type: 'gift', user: 'Cyber_Pilot', desc: 'sent you 50 Diamonds', time: '2m ago', icon: Zap, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 2, type: 'like', user: 'Neon_Girl', desc: 'liked your Reel', time: '15m ago', icon: Heart, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 3, type: 'follow', user: 'Nexus_Creator', desc: 'started following you', time: '1h ago', icon: UserPlus, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 4, type: 'comment', user: 'Alpha_Bot', desc: 'commented: "This is Magic! 🔥"', time: '3h ago', icon: MessageCircle, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ];

  const tabs = ['All', 'Gifts', 'Likes', 'Mentions'];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 relative overflow-hidden">
      
      {/* 🟢 Header Node */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Activity</h1>
          <p className="text-[10px] text-zinc-600 font-bold tracking-[0.3em] uppercase mt-1">Nexus Pulse Engine</p>
        </div>
        <button className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
          <Bell className="w-5 h-5 text-cyan-400 animate-pulse" />
        </button>
      </header>

      {/* 🟢 Filter Tabs Node */}
      <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              filter === tab 
              ? 'bg-white text-black' 
              : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🟢 Notification List Node */}
      <div className="space-y-4">
        <AnimatePresence>
          {activities.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={item.id}
              className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl hover:bg-zinc-900/60 transition-all group cursor-pointer"
            >
              {/* Icon Circle */}
              <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center border border-white/5`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <p className="text-[12px] font-medium leading-tight">
                  <span className="font-black italic text-white mr-1 uppercase">{item.user}</span>
                  <span className="text-zinc-400 uppercase text-[10px] tracking-tighter">{item.desc}</span>
                </p>
                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-1 block italic">{item.time}</span>
              </div>

              {/* Action/Preview */}
              {item.type === 'like' || item.type === 'comment' ? (
                <div className="w-10 h-10 bg-zinc-800 rounded-lg overflow-hidden opacity-50">
                   <div className="w-full h-full bg-gradient-to-tr from-cyan-900 to-black" />
                </div>
              ) : (
                <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 🟢 System Status Node (Bottom) */}
      <div className="mt-12 p-6 bg-gradient-to-r from-cyan-500/5 to-transparent border-l-2 border-cyan-500/50 rounded-r-2xl">
         <div className="flex items-center gap-2 mb-1">
           <Star className="w-3 h-3 text-cyan-400 fill-cyan-400" />
           <span className="text-[9px] font-black text-cyan-400 tracking-widest uppercase">Creator Milestone</span>
         </div>
         <p className="text-[10px] text-zinc-500 font-bold leading-relaxed uppercase">
           You are 250 Diamonds away from reaching <span className="text-white">Silver Tier</span>. Keep creating!
         </p>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default SocialActivity;
