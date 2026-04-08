import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { 
  Sparkles, Globe, Wand2, MessageSquare, 
  Music, ShoppingBag, Sun, Moon, Share2, Gem, User 
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

// 🚨 YAHAN "default" ADD KIYA HAI - ISSE BUILD PASS HOGI
export default function MainHub() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme, diamonds } = useAppContext();

  const modules = [
    { 
      label: 'RX Studio', icon: Sparkles, action: () => setLocation('/studio'),
      color: 'text-cyan-400', shadow: 'shadow-cyan-500/20', 
      bg: 'from-cyan-500/10 to-transparent', border: 'border-cyan-500/40' 
    },
    { 
      label: 'RX Social', icon: Globe, action: () => setLocation('/social/feed'),
      color: 'text-purple-400', shadow: 'shadow-purple-500/20', 
      bg: 'from-purple-500/10 to-transparent', border: 'border-purple-500/40' 
    },
    { 
      label: 'RX Magic', icon: Wand2, action: () => setLocation('/magic'),
      color: 'text-amber-400', shadow: 'shadow-amber-500/20', 
      bg: 'from-amber-500/10 to-transparent', border: 'border-amber-500/40' 
    },
    { 
      label: 'RX Chat', icon: MessageSquare, action: () => setLocation('/chat'),
      color: 'text-green-400', shadow: 'shadow-green-500/20', 
      bg: 'from-green-500/10 to-transparent', border: 'border-green-500/40' 
    },
    { 
      label: 'RX Music', icon: Music, action: () => setLocation('/music'),
      color: 'text-red-400', shadow: 'shadow-red-500/20', 
      bg: 'from-red-500/10 to-transparent', border: 'border-red-500/40' 
    },
    { 
      label: 'RX Shop', icon: ShoppingBag, action: () => setLocation('/shop'),
      color: 'text-pink-400', shadow: 'shadow-pink-500/20', 
      bg: 'from-pink-500/10 to-transparent', border: 'border-pink-500/40' 
    },
  ];

  const handleInvite = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Race-X Nexus',
          text: 'Join Race-X and claim 10 Diamonds! 💎',
          url: window.location.origin
        });
      }
    } catch (err) { console.log("Share failed"); }
  };

  return (
    <div className={`min-h-screen pb-32 px-6 pt-10 transition-all duration-500 ${theme === 'dark' ? 'bg-[#000000] text-white' : 'bg-zinc-50 text-black'}`}>
      
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">RACE-X</h1>
          <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full border border-white/10 mt-2">
            <Gem size={12} className="text-cyan-400 animate-pulse" />
            <span className="text-[11px] font-black">{diamonds} 💎</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={toggleTheme} className="p-3 bg-zinc-900 rounded-2xl border border-white/20 shadow-2xl">
            {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>
          <button onClick={() => setLocation('/profile')} className="p-3 bg-zinc-900 rounded-2xl border border-white/20 shadow-2xl">
            <User size={18} className="text-zinc-400" />
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.92 }}
            onClick={mod.action}
            className={`aspect-square bg-gradient-to-br ${mod.bg} bg-zinc-900/60 backdrop-blur-2xl border-[1.5px] ${mod.border} rounded-[38px] flex flex-col items-center justify-center gap-4 relative overflow-hidden shadow-2xl`}
          >
            <div className="p-4 rounded-2xl bg-black border border-white/10 shadow-2xl relative z-10">
              <mod.icon className={`w-8 h-8 ${mod.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{mod.label}</span>
          </motion.div>
        ))}
      </div>

      {/* INVITE CARD */}
      <div className="mt-8 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-white/20 p-6 rounded-[35px] relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex-1">
            <h3 className="text-xs font-black italic uppercase text-cyan-400">Expand the Circle</h3>
            <p className="text-[10px] text-zinc-400 mt-1">Invite friends & earn 5 💎</p>
            <button onClick={handleInvite} className="mt-4 bg-white text-black text-[9px] font-black px-5 py-2.5 rounded-full uppercase">Invite Now</button>
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
            <Gem size={42} className="text-cyan-400 drop-shadow-[0_0_15px_#22d3ee]" />
          </motion.div>
        </div>
      </div>

    </div>
  );
}
