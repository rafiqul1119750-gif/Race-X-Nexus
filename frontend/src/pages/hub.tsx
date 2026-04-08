import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { 
  Sparkles, Globe, Wand2, MessageSquare, 
  Music, ShoppingBag, Sun, Moon, Share2, Gem 
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function MainHub() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme, diamonds } = useAppContext();

  const modules = [
    { 
      label: 'RX Studio', icon: Sparkles, path: '/studio', 
      color: 'text-cyan-400', shadow: 'shadow-cyan-500/20', 
      bg: 'from-cyan-500/10 to-transparent', border: 'border-cyan-500/30' 
    },
    { 
      label: 'RX Social', icon: Globe, path: '/social/feed', 
      color: 'text-purple-400', shadow: 'shadow-purple-500/20', 
      bg: 'from-purple-500/10 to-transparent', border: 'border-purple-500/30' 
    },
    { 
      label: 'RX Magic', icon: Wand2, path: '/magic', 
      color: 'text-amber-400', shadow: 'shadow-amber-500/20', 
      bg: 'from-amber-500/10 to-transparent', border: 'border-amber-500/30' 
    },
    { 
      label: 'RX Chat', icon: MessageSquare, path: '/chat', 
      color: 'text-green-400', shadow: 'shadow-green-500/20', 
      bg: 'from-green-500/10 to-transparent', border: 'border-green-500/30' 
    },
    { 
      label: 'RX Music', icon: Music, path: '/music', 
      color: 'text-red-400', shadow: 'shadow-red-500/20', 
      bg: 'from-red-500/10 to-transparent', border: 'border-red-500/30' 
    },
    { 
      label: 'RX Shop', icon: ShoppingBag, path: '/shop', 
      color: 'text-pink-400', shadow: 'shadow-pink-500/20', 
      bg: 'from-pink-500/10 to-transparent', border: 'border-pink-500/30' 
    },
  ];

  const handleInvite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Race-X',
        text: 'Join me on Race-X and get 10 Diamonds instantly!',
        url: window.location.origin,
      });
    }
  };

  return (
    <div className={`min-h-screen pb-32 px-6 pt-10 transition-all duration-500 ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-zinc-50 text-black'}`}>
      
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">RACE-X</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full border border-white/5 shadow-lg">
              <Gem size={12} className="text-cyan-400 animate-pulse" />
              <span className="text-[11px] font-black tracking-tight">{diamonds} 💎</span>
            </div>
          </div>
        </div>
        <button onClick={toggleTheme} className="p-3 bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl">
          {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
        </button>
      </div>

      {/* MODULE GRID - COLOURFUL CARDS */}
      <div className="grid grid-cols-2 gap-4">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.92 }}
            onClick={() => setLocation(mod.path)}
            className={`aspect-square bg-gradient-to-br ${mod.bg} bg-zinc-900/40 backdrop-blur-xl border-t ${mod.border} rounded-[38px] flex flex-col items-center justify-center gap-4 relative overflow-hidden shadow-2xl ${mod.shadow}`}
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            
            <div className={`p-4 rounded-2xl bg-zinc-800/80 border border-white/5 shadow-xl relative z-10`}>
              <mod.icon className={`w-8 h-8 ${mod.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] relative z-10 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {mod.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 💎 INVITE SECTION */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
        <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-white/10 p-6 rounded-[35px] relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <h3 className="text-xs font-black italic uppercase tracking-widest text-cyan-400">Expand the Nexus</h3>
              <p className="text-[10px] text-zinc-400 mt-1">Invite friends & earn <span className="text-white font-bold">5 Diamonds</span></p>
              <button onClick={handleInvite} className="mt-4 bg-white text-black text-[9px] font-black px-5 py-2.5 rounded-full uppercase tracking-widest">
                Invite Now
              </button>
            </div>
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
              <Gem size={42} className="text-cyan-400 drop-shadow-[0_0_15px_#22d3ee]" />
            </motion.div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
