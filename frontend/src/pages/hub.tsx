import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Globe, Sparkles, Video, MessageCircle, 
  Music, ShoppingBag, User, Settings, Bell, Zap
} from 'lucide-react';

const RXMainHub = () => {
  const [, setLocation] = useLocation();

  // 🟢 Diagram Modules Node
  const modules = [
    { id: 'social', name: 'Social App', icon: Globe, color: 'from-cyan-500/20', path: '/social' },
    { id: 'magic', name: 'Magic AI', icon: Sparkles, color: 'from-purple-500/20', path: '/magic' },
    { id: 'studio', name: 'Studio', icon: Video, color: 'from-blue-500/20', path: '/studio' },
    { id: 'chat', name: 'Nexus Chat', icon: MessageCircle, color: 'from-emerald-500/20', path: '/chat' },
    { id: 'music', name: 'Sound Sync', icon: Music, color: 'from-pink-500/20', path: '/music' },
    { id: 'shop', name: 'Marketplace', icon: ShoppingBag, color: 'from-orange-500/20', path: '/shop' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 relative overflow-hidden">
      
      {/* Background Animated Energy Field */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/20 blur-[150px] rounded-full" />
      </div>

      {/* 🏠 Top Bar Node (Profile & Notifs) */}
      <header className="flex justify-between items-center mb-10 pt-4 relative z-10">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-cyan-500 tracking-[0.4em] uppercase italic">System Online</h2>
          <h1 className="text-2xl font-black tracking-tighter italic">RACE-X <span className="text-zinc-600">NEXUS</span></h1>
        </div>
        <div className="flex gap-4">
          <button className="p-3 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-cyan-500/50 transition-all">
            <Bell className="w-5 h-5 text-zinc-400" />
          </button>
          <button className="p-3 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-cyan-500/50 transition-all">
            <User className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
      </header>

      {/* 🏠 Quick Action / Featured Node */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-40 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-[32px] mb-8 p-6 relative overflow-hidden flex items-center justify-between group cursor-pointer"
      >
        <div className="z-10">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span className="text-[9px] font-black tracking-widest text-cyan-400">DAILY QUEST</span>
          </div>
          <h3 className="text-xl font-black uppercase italic">Earn 500 Diamonds</h3>
          <p className="text-[10px] text-zinc-500 font-bold mt-1">POST 3 REELS TO UNLOCK REWARDS</p>
        </div>
        <div className="relative z-10 p-4 bg-cyan-500 rounded-2xl text-black">
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </div>
        {/* Glow behind */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all" />
      </motion.div>

      {/* 🏠 Grid Navigation Node (The 6 Modules) */}
      <div className="grid grid-cols-2 gap-4 relative z-10">
        {modules.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setLocation(item.path)}
            className={`aspect-square bg-gradient-to-b ${item.color} to-zinc-950 border border-zinc-800/50 rounded-[32px] p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all active:scale-95 cursor-pointer group`}
          >
            <div className="w-12 h-12 bg-black/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-wider">{item.name}</h4>
              <p className="text-[8px] text-zinc-600 font-bold mt-1 uppercase">Enter Module</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🏠 Bottom Quick Tools Node */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-2 rounded-3xl flex justify-around items-center z-50">
        <button className="p-4 text-cyan-400"><Globe className="w-6 h-6" /></button>
        <div className="w-[1px] h-6 bg-zinc-800" />
        <button className="p-4 text-zinc-600 hover:text-white transition-colors"><Settings className="w-6 h-6" /></button>
      </div>

    </div>
  );
};

// Helper Component
const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default RXMainHub;
