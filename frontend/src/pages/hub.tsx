import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Sparkles, Globe, Wand2, MessageSquare, Music, ShoppingBag, Sun, Moon } from "lucide-react";
// DHAYAN SE: Ab hum useAppContext use kar rahe hain
import { useAppContext } from "../context/AppContext"; 

export default function MainHub() {
  const [, setLocation] = useLocation();
  // Humne context se theme functions nikaal liye
  const { theme, setTheme, toggleTheme } = useAppContext();

  const modules = [
    { label: 'RX Studio', icon: Sparkles, path: '/studio', color: 'text-cyan-500' },
    { label: 'RX Social', icon: Globe, path: '/social/feed', color: 'text-purple-500' },
    { label: 'RX Magic', icon: Wand2, path: '/magic', color: 'text-amber-500' },
    { label: 'RX Chat', icon: MessageSquare, path: '/chat', color: 'text-green-500' },
    { label: 'RX Music', icon: Music, path: '/music', color: 'text-red-500' },
    { label: 'RX Shop', icon: ShoppingBag, path: '/shop', color: 'text-pink-500' },
  ];

  return (
    <div className={`min-h-screen pb-24 px-6 pt-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">RACE-X</h1>
          <p className="text-[10px] opacity-50 font-bold tracking-[0.3em] uppercase">Nexus Hub v1.0</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={toggleTheme}
            className="p-3 bg-zinc-900/10 dark:bg-zinc-800 rounded-2xl border border-border"
          >
            {theme === "dark" ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-600" />}
          </button>
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 overflow-hidden" />
        </div>
      </div>

      {/* MODULE GRID */}
      <div className="grid grid-cols-2 gap-5">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation(mod.path)}
            className="aspect-square bg-zinc-900/5 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-[35px] flex flex-col items-center justify-center gap-4 shadow-sm"
          >
            <div className={`p-4 rounded-2xl bg-white dark:bg-zinc-800/50 shadow-inner`}>
              <mod.icon className={`w-8 h-8 ${mod.color}`} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest">{mod.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
