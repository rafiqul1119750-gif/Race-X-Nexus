import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Sparkles, Globe, Wand2, MessageSquare, Music, ShoppingBag, Zap, Crown } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function MainHub() {
  const [, setLocation] = useLocation();

  const modules = [
    { id: 'studio', label: 'RX Studio', icon: <Sparkles />, path: '/studio', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 'social', label: 'RX Social', icon: <Globe />, path: '/social/feed', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 'magic', label: 'RX Magic', icon: <Wand2 />, path: '/magic', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 'chat', label: 'RX Chat', icon: <MessageSquare />, path: '/chat', color: 'text-green-400', bg: 'bg-green-500/10' },
    { id: 'music', label: 'RX Music', icon: <Music />, path: '/music', color: 'text-red-400', bg: 'bg-red-500/10' },
    { id: 'shop', label: 'RX Shop', icon: <ShoppingBag />, path: '/shop', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24 px-4 pt-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 px-2">
        <h1 className="text-2xl font-black italic tracking-tighter">RACE-X</h1>
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900 border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest">500💎</span>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-zinc-800" />
        </div>
      </div>

      {/* 📦 MODULE GRID (Fully Clickable) */}
      <div className="grid grid-cols-2 gap-4">
        {modules.map((mod) => (
          <motion.div
            key={mod.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation(mod.path)}
            className="aspect-square bg-zinc-900/40 border border-white/5 rounded-[32px] flex flex-col items-center justify-center gap-4 relative overflow-hidden active:bg-zinc-800 transition-colors"
          >
            <div className={`p-4 ${mod.bg} rounded-2xl`}>
              {/* Clone element to apply color to lucide icons */}
              {Object.cloneElement(mod.icon as React.ReactElement, { className: `w-8 h-8 ${mod.color}` })}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{mod.label}</span>
          </motion.div>
        ))}
      </div>

      {/* QUICK STATS CARD */}
      <div className="mt-8 bg-zinc-900/30 border border-white/5 p-6 rounded-[32px] flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
            <Zap className="text-cyan-400 w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">System Status</p>
            <p className="text-xs font-bold text-white">NEXUS_ONLINE_V1</p>
          </div>
        </div>
        <Crown className="w-5 h-5 text-amber-500" />
      </div>

      <BottomNav />
    </div>
  );
}
