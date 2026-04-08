import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Sparkles, Globe, Wand2, MessageSquare, Gem, User, Sun } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function MainHub() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();

  const modules = [
    { label: 'RX Studio', icon: Sparkles, path: '/studio', color: 'text-cyan-400' },
    { label: 'RX Social', icon: Globe, path: '/social/feed', color: 'text-purple-400' },
    { label: 'RX Magic', icon: Wand2, path: '/magic', color: 'text-amber-400' },
    { label: 'RX Chat', icon: MessageSquare, path: '/chat', color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">RACE-X</h1>
          <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full border border-white/10 mt-2 w-fit">
            <Gem size={12} className="text-cyan-400" />
            <span className="text-[11px] font-black">{diamonds} 💎</span>
          </div>
        </div>
        <button onClick={() => setLocation('/profile')} className="p-3 bg-zinc-900 rounded-2xl border border-white/20">
          <User size={20} className="text-zinc-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modules.map((mod, i) => (
          <div
            key={i}
            onClick={() => setLocation(mod.path)}
            className="aspect-square bg-zinc-900/60 border border-white/5 rounded-[38px] flex flex-col items-center justify-center gap-4 active:scale-95 transition-transform cursor-pointer"
          >
            <div className="p-4 rounded-2xl bg-black border border-white/10"><mod.icon className={`w-8 h-8 ${mod.color}`} /></div>
            <span className="text-[10px] font-black uppercase tracking-widest">{mod.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
