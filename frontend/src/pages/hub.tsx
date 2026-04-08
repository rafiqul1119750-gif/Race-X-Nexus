import { useLocation } from "wouter";
import { Sparkles, Globe, Wand2, MessageSquare, Music, ShoppingBag, User, Settings, Bell, Gem } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function MainHub() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();

  const cards = [
    { label: 'RX STUDIO', icon: Sparkles, path: '/studio', color: 'text-cyan-400' },
    { label: 'RX SOCIAL', icon: Globe, path: '/social/feed', color: 'text-purple-400' },
    { label: 'RX MAGIC', icon: Wand2, path: '/magic', color: 'text-amber-400' },
    { label: 'RX CHAT', icon: MessageSquare, path: '/chat', color: 'text-green-400' },
    { label: 'RX MUSIC', icon: Music, path: '/music', color: 'text-red-400' },
    { label: 'RX SHOP', icon: ShoppingBag, path: '/shop', color: 'text-pink-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* HUB CONTROLS (Diagram: Settings, Profile, Notif) */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <Settings size={20} className="text-zinc-500" />
          <Bell size={20} className="text-zinc-500" />
        </div>
        <div onClick={() => setLocation('/profile')} className="p-2 bg-zinc-900 rounded-full border border-cyan-500/50">
          <User size={20} className="text-cyan-400" />
        </div>
      </div>

      <h1 className="text-4xl font-black italic mb-2 tracking-tighter">RACE-X</h1>
      <p className="text-[10px] font-bold text-zinc-500 tracking-[0.3em] uppercase mb-10">Central Command Hub</p>

      {/* MODULE CARDS (Diagram: Clickable Cards) */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <div key={i} onClick={() => setLocation(card.path)} className="aspect-square bg-zinc-900/40 border border-white/5 rounded-[40px] flex flex-col items-center justify-center gap-4 active:scale-95 transition-all">
            <card.icon className={`w-10 h-10 ${card.color}`} />
            <span className="text-[9px] font-black tracking-widest uppercase">{card.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
