import { useState } from "react";
import { Zap, Sparkles, Users, Music, ShoppingBag, Gem, ShieldCheck, ChevronRight, LayoutGrid } from "lucide-react";
import { useLocation } from "wouter";

export default function MainHub() {
  const [, setLocation] = useLocation();

  // Updated Cards with RX Branding & Correct Paths
  const hubCards = [
    { title: "RX STUDIO", desc: "Cinema AI & Voice Lab", icon: <Zap className="text-black" />, color: "bg-cyan-400", path: "/studio" },
    { title: "RX MAGIC CHAT", desc: "Neural AI Assistant", icon: <Sparkles className="text-yellow-400" />, color: "bg-zinc-900", path: "/magic/ai-chat" },
    { title: "RX SOCIAL", desc: "Creator Community", icon: <Users className="text-white" />, color: "bg-purple-600", path: "/social" },
    { title: "RX MUSIC", desc: "Spotify Engine", icon: <Music className="text-white" />, color: "bg-zinc-800", path: "/music" },
    { title: "RX SHOPPING", desc: "70% Off Coupons", icon: <ShoppingBag className="text-cyan-400" />, color: "bg-black", border: "border-cyan-500", path: "/shop" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-10 font-sans selection:bg-cyan-500/20">
      
      {/* Header with RX Logo & Platform Name */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div 
            onClick={() => setLocation("/profile")} 
            className="w-12 h-12 rounded-full bg-black border-2 border-zinc-700 flex items-center justify-center font-black text-xs text-zinc-400 tracking-tighter shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer active:scale-90 transition-all"
          >
            RX
          </div>
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-600 leading-none">Race-X Hub</h1>
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-2">The Ultimate Creator Protocol</p>
          </div>
        </div>
        <div className="flex gap-3">
          {/* ✅ Fixed: Now redirects to Admin API / Injection Hub */}
          <button 
            onClick={() => setLocation("/admin/api")} 
            className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-90 hover:bg-zinc-800 transition-all shadow-lg"
          >
            <LayoutGrid size={20} className="text-cyan-400" />
          </button>
        </div>
      </header>

      {/* --- DIAMOND RELATED SECTION --- */}
      <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-cyan-500/20 rounded-[45px] p-8 mb-10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-30 blur-2xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-cyan-400 leading-none">Welcome Gift</h2>
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-3">Special Revolution Bonus Active</p>
            <div className="mt-6 flex items-center gap-3 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
               <ShieldCheck size={14} className="text-cyan-400"/>
               <span className="text-[9px] font-black uppercase tracking-wider text-cyan-400">Node Sync Complete</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 p-6 bg-black rounded-[35px] border border-white/5 shadow-2xl transition-transform group-hover:scale-105 duration-500">
            <Gem size={70} className="text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"/>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest leading-none italic">Multiplier</span>
                <p className="text-6xl font-black italic uppercase text-white tracking-tighter leading-none">10x</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 5 TILED CARDS (RX BRANDED) --- */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500"><Gem size={12} className="text-cyan-500"/> Platform Nodes</h3>
          <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">v4.0 Protocol</span>
        </div>
        
        <div className="space-y-4">
          {hubCards.map((card) => (
            <button 
              key={card.title} 
              onClick={() => setLocation(card.path)}
              className={`w-full ${card.color} ${card.border ? `border-2 ${card.border} shadow-[0_0_20px_rgba(6,182,212,0.15)]` : 'border border-white/5'} rounded-[35px] p-6 flex items-center justify-between active:scale-[0.97] transition-all group`}
            >
              <div className="flex items-center gap-5">
                <div className={`p-4 ${card.title === "RX STUDIO" ? "bg-black" : "bg-black/40"} rounded-[20px] shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <div className="text-left">
                  <span className={`block text-[13px] font-black italic uppercase tracking-widest ${card.color === "bg-cyan-400" ? "text-black" : "text-white"}`}>{card.title}</span>
                  <p className={`text-[8px] font-black uppercase tracking-tighter opacity-60 ${card.color === "bg-cyan-400" ? "text-black" : "text-zinc-400"}`}>{card.desc}</p>
                </div>
              </div>
              <div className={`p-2 rounded-full ${card.color === "bg-cyan-400" ? "bg-black/10" : "bg-white/5"}`}>
                <ChevronRight size={16} className={card.color === "bg-cyan-400" ? "text-black" : "text-zinc-600"} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Join Revolution Footer Bar */}
      <div className="p-8 rounded-[45px] bg-white text-black flex items-center justify-between shadow-[0_20px_50px_rgba(255,255,255,0.05)] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="relative z-10">
          <p className="text-[11px] font-black uppercase tracking-widest">Global Revolution</p>
          <p className="text-[9px] font-bold text-zinc-500 uppercase mt-1 italic">Join 100K+ Race-X Creators</p>
        </div>
        <button 
          onClick={() => setLocation("/auth/signup")} 
          className="relative z-10 bg-black text-white px-8 py-3 rounded-full font-black text-[10px] uppercase italic active:scale-95 transition-all shadow-xl"
        >
          Join Now
        </button>
      </div>

    </div>
  );
}
