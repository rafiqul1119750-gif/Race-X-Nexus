import { LayoutGrid, Users, Sparkles, Music, ShoppingBag, Settings } from "lucide-react";
import { useLocation } from "wouter";

export default function MainHub() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">Race-X Hub</h1>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.4)]" />
      </header>

      <div className="grid grid-cols-2 gap-4">
        <HubCard title="Social" icon={<Users className="text-cyan-400" />} onClick={() => setLocation("/social")} />
        <HubCard title="Studio" icon={<LayoutGrid className="text-purple-500" />} onClick={() => setLocation("/studio")} />
        <HubCard title="Magic" icon={<Sparkles className="text-yellow-400" />} onClick={() => setLocation("/magic")} />
        <HubCard title="Music" icon={<Music className="text-pink-500" />} onClick={() => setLocation("/music")} />
        <HubCard title="Shop" icon={<ShoppingBag className="text-green-400" />} onClick={() => setLocation("/shop")} />
        <HubCard title="Settings" icon={<Settings className="text-zinc-500" />} onClick={() => setLocation("/settings")} />
      </div>
    </div>
  );
}

function HubCard({ title, icon, onClick }: any) {
  return (
    <button onClick={onClick} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[40px] flex flex-col items-center gap-4 active:scale-95 transition-all">
      <div className="p-4 bg-black rounded-2xl shadow-inner">{icon}</div>
      <span className="text-xs font-black uppercase tracking-widest">{title}</span>
    </button>
  );
}
