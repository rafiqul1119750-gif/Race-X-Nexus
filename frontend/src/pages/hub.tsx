import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Sparkles, Globe, Wand2, MessageSquare, Music, ShoppingBag, Sun, Moon, Gem, User } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function MainHub() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme, diamonds } = useAppContext();

  const modules = [
    { label: 'RX Studio', icon: Sparkles, path: '/studio', color: 'text-cyan-400', border: 'border-cyan-500/40' },
    { label: 'RX Social', icon: Globe, path: '/social/feed', color: 'text-purple-400', border: 'border-purple-500/40' },
    { label: 'RX Magic', icon: Wand2, path: '/magic', color: 'text-amber-400', border: 'border-amber-500/40' },
    { label: 'RX Chat', icon: MessageSquare, path: '/chat', color: 'text-green-400', border: 'border-green-500/40' },
    { label: 'RX Music', icon: Music, path: '/music', color: 'text-red-400', border: 'border-red-500/40' },
    { label: 'RX Shop', icon: ShoppingBag, path: '/shop', color: 'text-pink-400', border: 'border-pink-500/40' },
  ];

  return (
    <div className={`min-h-screen pb-32 px-6 pt-10 transition-all duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-zinc-50 text-black'}`}>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">RACE-X</h1>
          <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full border border-white/10 mt-2">
            <Gem size={12} className="text-cyan-400" />
            <span className="text-[11px] font-black text-white">{diamonds} 💎</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={toggleTheme} className="p-3 bg-zinc-900 rounded-2xl border border-white/20"><Sun size={18} className="text-amber-400" /></button>
          <button onClick={() => setLocation('/profile')} className="p-3 bg-zinc-900 rounded-2xl border border-white/20"><User size={18} className="text-zinc-400" /></button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation(mod.path)}
            className={`aspect-square bg-zinc-900/60 backdrop-blur-2xl border-[1.5px] ${mod.border} rounded-[38px] flex flex-col items-center justify-center gap-4 shadow-2xl`}
          >
            <div className="p-4 rounded-2xl bg-black border border-white/10 shadow-2xl"><mod.icon className={`w-8 h-8 ${mod.color}`} /></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white">{mod.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
