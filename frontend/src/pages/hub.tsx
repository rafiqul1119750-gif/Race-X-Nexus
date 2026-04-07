import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Sparkles, Globe, Wand2, MessageSquare, Music, ShoppingBag, Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import BottomNav from "../components/BottomNav";

export default function MainHub() {
  const [, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();

  const modules = [
    { label: 'RX Studio', icon: Sparkles, path: '/studio', color: 'text-cyan-500' },
    { label: 'RX Social', icon: Globe, path: '/social/feed', color: 'text-purple-500' },
    { label: 'RX Magic', icon: Wand2, path: '/magic', color: 'text-amber-500' },
    { label: 'RX Chat', icon: MessageSquare, path: '/chat', color: 'text-green-500' },
    { label: 'RX Music', icon: Music, path: '/music', color: 'text-red-500' },
    { label: 'RX Shop', icon: ShoppingBag, path: '/shop', color: 'text-pink-500' },
  ];

  return (
    <div className="min-h-screen pb-24 px-6 pt-10">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">RACE-X</h1>
          <p className="text-[10px] opacity-50 font-bold tracking-[0.3em] uppercase">Nexus Hub v1.0</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 bg-secondary rounded-2xl border border-border"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-border overflow-hidden" />
        </div>
      </div>

      {/* MODULE GRID */}
      <div className="grid grid-cols-2 gap-5">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation(mod.path)}
            className="aspect-square bg-secondary/50 border border-border rounded-[35px] flex flex-col items-center justify-center gap-4 shadow-sm"
          >
            <div className={`p-4 rounded-2xl bg-background/50 shadow-inner`}>
              <mod.icon className={`w-8 h-8 ${mod.color}`} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest">{mod.label}</span>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
