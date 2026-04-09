import { LayoutGrid, Users, Sparkles, Music, ShoppingBag, Settings, Bell, Search, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function MainHub() {
  const [, setLocation] = useLocation();

  const menuItems = [
    { title: "Social", icon: <Users />, path: "/social", color: "from-cyan-500 to-blue-600", tag: "Hot" },
    { title: "Studio", icon: <LayoutGrid />, path: "/studio", color: "from-purple-500 to-pink-600", tag: "Pro" },
    { title: "Magic", icon: <Sparkles />, path: "/magic", color: "from-yellow-400 to-orange-500", tag: "AI" },
    { title: "Music", icon: <Music />, path: "/music", color: "from-pink-500 to-rose-600", tag: "New" },
    { title: "Shop", icon: <ShoppingBag />, path: "/shop", color: "from-emerald-400 to-cyan-500", tag: "Vault" },
    { title: "Settings", icon: <Settings />, path: "/settings", color: "from-zinc-600 to-zinc-800", tag: "" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 selection:bg-cyan-500/30 overflow-hidden">
      {/* Header with Live Status */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none">Race-X</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">Public Node: Online</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setLocation("/social/search")} className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 active:scale-90 transition-all"><Search size={20} /></button>
          <button onClick={() => setLocation("/social/activity")} className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 active:scale-90 transition-all relative">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-cyan-500 rounded-full border-2 border-black" />
          </button>
        </div>
      </header>

      {/* Main Grid: Fully Clickable */}
      <div className="grid grid-cols-2 gap-5">
        {menuItems.map((item) => (
          <button 
            key={item.title}
            onClick={() => setLocation(item.path)}
            className="group relative bg-zinc-900/20 border border-white/10 p-8 rounded-[45px] flex flex-col items-center gap-4 active:scale-95 transition-all duration-300 hover:border-cyan-500/30 overflow-hidden"
          >
            {item.tag && <span className="absolute top-4 right-6 text-[7px] font-black uppercase tracking-widest text-cyan-400 opacity-50">{item.tag}</span>}
            <div className={`p-5 bg-black rounded-3xl shadow-2xl group-hover:shadow-cyan-500/20 transition-all border border-white/5`}>{item.icon}</div>
            <span className="text-xs font-black uppercase tracking-widest italic group-hover:text-cyan-400 transition-colors">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Joining Banner for New Users */}
      <div className="mt-10 p-6 rounded-[40px] bg-gradient-to-r from-zinc-900 to-black border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400"><Zap size={20}/></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest">Joining Race-X</p>
            <p className="text-[8px] text-zinc-500 uppercase">Connect with 1M creators</p>
          </div>
        </div>
        <button onClick={() => setLocation("/auth/signup")} className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-black uppercase italic">Join Now</button>
      </div>
    </div>
  );
}
