import { useLocation } from "wouter";
import { Sparkles, Globe, Wand2, MessageSquare, Music, ShoppingBag, User, Settings, Bell, Gem } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function MainHub() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();

  const cards = [
    { label: 'RX STUDIO', icon: Sparkles, path: '/studio', color: 'text-cyan-400' },
    { label: 'RX SOCIAL', icon: SocialFeed, path: '/social/feed', color: 'text-purple-400' }, // Seedha Feed par
    { label: 'RX MAGIC', icon: Wand2, path: '/magic', color: 'text-amber-400' },
    { label: 'RX CHAT', icon: MessageSquare, path: '/chat', color: 'text-green-400' },
    { label: 'RX MUSIC', icon: Music, path: '/music', color: 'text-red-400' },
    { label: 'RX SHOP', icon: ShoppingBag, path: '/shop', color: 'text-pink-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-10 font-sans">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <Settings size={22} className="text-zinc-600 active:text-white" />
          <Bell size={22} className="text-zinc-600 active:text-white" />
        </div>
        <div onClick={() => setLocation('/profile')} className="w-10 h-10 rounded-2xl bg-zinc-900 border border-cyan-500/30 flex items-center justify-center">
          <User size={20} className="text-cyan-400" />
        </div>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-black italic tracking-tighter italic">RACE-X</h1>
        <div className="flex items-center gap-2 mt-2">
          <Gem size={14} className="text-cyan-400" />
          <span className="text-xs font-black tracking-widest">{diamonds} 💎 AVAILABLE</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <div key={i} onClick={() => setLocation(card.path)} className="aspect-square bg-zinc-900/40 border border-white/5 rounded-[45px] flex flex-col items-center justify-center gap-4 active:scale-95 transition-all shadow-2xl">
            <div className="p-4 rounded-3xl bg-black border border-white/5">
              <card.icon className={`w-8 h-8 ${card.color}`} />
            </div>
            <span className="text-[9px] font-black tracking-[0.2em] uppercase text-zinc-400">{card.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
