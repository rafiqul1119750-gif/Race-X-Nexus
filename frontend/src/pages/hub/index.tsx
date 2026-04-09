import { useState } from "react";
import { Zap, Sparkles, Users, Mic, ShoppingBag, Gem, ShieldCheck, ChevronRight, LayoutGrid } from "lucide-react";
import { useLocation } from "wouter";

export default function MainHub() {
  const [, setLocation] = useLocation();

  // Cards configuration from screenshot logic
  const hubCards = [
    { title: "STUDIO", icon: <Zap className="text-black" />, color: "bg-cyan-400", path: "/studio" },
    { title: "MAGIC", icon: <Sparkles className="text-yellow-400" />, color: "bg-zinc-900", path: "/magic" },
    { title: "SOCIAL", icon: <Users className="text-white" />, color: "bg-purple-600", path: "/social" },
    { title: "MEDIA LIBRARY", icon: <Mic className="text-white" />, color: "bg-zinc-800", path: "/music" },
    { title: "MARKETPLACE", icon: <ShoppingBag className="text-cyan-400" />, color: "bg-black", border: "border-cyan-500", path: "/shop" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans selection:bg-cyan-500/20">
      
      {/* Header with RX Logo & Platform Name */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-black border-2 border-zinc-700 flex items-center justify-center font-black text-xs text-zinc-500 tracking-tighter">RX</div>
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 leading-none">Race-X Hub</h1>
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-2">Connect & Create Together</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="p-3 bg-zinc-900 rounded-2xl border border-white/5"><LayoutGrid size={20} className="text-zinc-500" /></div>
        </div>
      </header>

      {/* --- DIAMOND RELATED SECTION (High Priority from Screenshot) --- */}
      <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-cyan-500/20 rounded-[45px] p-8 mb-10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-30 blur-2xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-cyan-400 leading-none">Welcome Gift</h2>
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-3">Special Creator Revolution Bonus</p>
            <div className="mt-6 flex items-center gap-3 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
               <ShieldCheck size={16} className="text-cyan-400"/>
               <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">Core Node propagation Active</span>
            </div>
          </div>
          
          {/* Diamond & 10x multiplier */}
          <div className="flex items-center gap-6 p-6 bg-black rounded-[35px] border border-white/5 shadow-2xl scale-110 md:scale-100">
            <Gem size={80} className="text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"/>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest leading-none">MULTYPLIER</span>
                <p className="text-6xl font-black italic uppercase text-white tracking-tighter leading-none">10x</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 5 TILED CARDS (Design & Colors from Screenshots) --- */}
      <section className="mb-12">
        <h3 className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-6 px-1"><Gem size={12}/> Platform Nodes</h3>
        <div className="space-y-4">
          {hubCards.map((card, index) => (
            <button 
              key={card.title} 
              onClick={() => setLocation(card.path)}
              className={`w-full ${card.color} ${card.border ? `border-2 ${card.border}` : ''} rounded-[30px] p-6 flex items-center justify-between active:scale-[0.98] hover:border-cyan-500/30 transition-all shadow-xl`}
            >
              <div className="flex items-center gap-5">
                <div className={`p-4 ${card.title === "STUDIO" ? "bg-black" : "bg-black/50"} rounded-2xl shadow-inner`}>{card.icon}</div>
                <div className="text-left">
                  <span className={`block text-sm font-black italic uppercase tracking-widest ${card.color === "bg-white" || card.title === "STUDIO" ? "text-black" : "text-white"}`}>{card.title}</span>
                  {card.title === "MARKETPLACE" && <span className="text-[8px] font-bold text-cyan-600 uppercase tracking-tighter">Millions of Assets</span>}
                </div>
              </div>
              <ChevronRight size={18} className={card.color === "bg-cyan-400" ? "text-black" : "text-zinc-600"} />
            </button>
          ))}
        </div>
      </section>

      {/* Join Revolution Bar */}
      <div className="p-6 rounded-[40px] bg-white text-black flex items-center justify-between shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest">Start your journey with Race-X</p>
          <p className="text-[9px] text-zinc-700 uppercase">Join the creator revolution</p>
        </div>
        <button onClick={() => setLocation("/auth/signup")} className="bg-black text-white px-5 py-2 rounded-full font-black text-[10px] uppercase italic active:scale-95 transition-all">Join Now</button>
      </div>

    </div>
  );
}
