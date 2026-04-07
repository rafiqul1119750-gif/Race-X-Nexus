import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Sparkles, Globe, Wand2, MessageSquare, Music, ShoppingBag, Zap } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function MainHub() {
  const [, setLocation] = useLocation();

  const modules = [
    { label: 'RX Studio', icon: <Sparkles className="w-8 h-8 text-cyan-400" />, path: '/studio', bg: 'bg-cyan-500/10' },
    { label: 'RX Social', icon: <Globe className="w-8 h-8 text-purple-400" />, path: '/social/feed', bg: 'bg-purple-500/10' },
    { label: 'RX Magic', icon: <Wand2 className="w-8 h-8 text-amber-400" />, path: '/magic', bg: 'bg-amber-500/10' },
    { label: 'RX Chat', icon: <MessageSquare className="w-8 h-8 text-green-400" />, path: '/chat', bg: 'bg-green-500/10' },
    { label: 'RX Music', icon: <Music className="w-8 h-8 text-red-400" />, path: '/music', bg: 'bg-red-500/10' },
    { label: 'RX Shop', icon: <ShoppingBag className="w-8 h-8 text-pink-400" />, path: '/shop', bg: 'bg-pink-500/10' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24 px-4 pt-8">
      <div className="flex justify-between items-center mb-10 px-2">
        <h1 className="text-2xl font-black italic tracking-tighter">RACE-X</h1>
        <div className="bg-zinc-900 border border-white/5 px-4 py-2 rounded-2xl text-[10px] font-bold tracking-widest">
          500 <span className="text-cyan-400">💎</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation(mod.path)}
            className="aspect-square bg-zinc-900/40 border border-white/5 rounded-[32px] flex flex-col items-center justify-center gap-4 active:bg-zinc-800 transition-all"
          >
            <div className={`p-4 ${mod.bg} rounded-2xl`}>{mod.icon}</div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{mod.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-zinc-900/30 border border-white/5 p-6 rounded-[32px] flex items-center gap-4">
        <Zap className="text-cyan-400" />
        <span className="text-[10px] font-black uppercase tracking-widest">System Online // Node 01</span>
      </div>

      <BottomNav />
    </div>
  );
}
