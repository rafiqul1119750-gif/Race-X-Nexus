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
    { label: 'RX Studio', icon: Sparkles, path: '/studio', color: 'text-cyan-400' },
    { label: 'RX Social', icon: Globe, path: '/social/feed', color: 'text-purple-400' },
    { label: 'RX Magic', icon: Wand2, path: '/magic', color: 'text-amber-400' },
    { label: 'RX Chat', icon: MessageSquare, path: '/chat', color: 'text-green-400' },
    { label: 'RX Music', icon: Music, path: '/music', color: 'text-red-400' },
    { label: 'RX Shop', icon: ShoppingBag, path: '/shop', color: 'text-pink-400' },
  ];

  const handleInvite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Race-X',
        text: 'Join me on Race-X and get 10 Diamonds instantly!',
        url: window.location.origin,
      });
    } else {
      alert("Referral Link Copied!");
    }
  };

  return (
    <div className={`min-h-screen pb-32 px-6 pt-10 transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-zinc-50 text-black'}`}>
      
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">RACE-X</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full font-bold tracking-widest uppercase">Nexus Hub</span>
            <div className="flex items-center gap-1 bg-zinc-900/50 px-2 py-0.5 rounded-full border border-white/5">
              <Gem size={10} className="text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-bold">{diamonds}</span>
            </div>
          </div>
        </div>
        <button onClick={toggleTheme} className="p-3 bg-zinc-900/40 rounded-2xl border border-white/5 shadow-xl">
          {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
        </button>
      </div>

      {/* MODULE GRID */}
      <div className="grid grid-cols-2 gap-4">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation(mod.path)}
            className="aspect-square bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[32px] flex flex-col items-center justify-center gap-4 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-active:opacity-100 transition-opacity" />
            <div className="p-4 rounded-2xl bg-zinc-800/50 shadow-inner relative z-10">
              <mod.icon className={`w-8 h-8 ${mod.color}`} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] relative z-10">{mod.label}</span>
          </motion.div>
        ))}
      </div>

      {/* 💎 PREMIUM INVITE SECTION (Niche wala hissa) */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-8 relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[35px] blur opacity-20" />
        <div className="relative bg-zinc-900/80 border border-white/10 p-6 rounded-[32px] overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <h3 className="text-sm font-black italic uppercase tracking-wider text-white">Expand Your Circle</h3>
              <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">
                Invite friends to the Nexus. Get <span className="text-cyan-400 font-bold">5 Diamonds</span> for every successful entry.
              </p>
              <button 
                onClick={handleInvite}
                className="mt-4 flex items-center gap-2 bg-white text-black text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest hover:bg-cyan-400 transition-colors"
              >
                <Share2 size={12} /> Invite Now
              </button>
            </div>
            <div className="relative">
              {/* ✨ Shining Diamond Effect */}
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  filter: ["drop-shadow(0 0 5px #22d3ee)", "drop-shadow(0 0 20px #22d3ee)", "drop-shadow(0 0 5px #22d3ee)"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Gem size={45} className="text-cyan-400 fill-cyan-400/20" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
