import { ArrowLeft, Gem, Zap, ShoppingBag, ShieldCheck, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

export default function ShopIndex() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans">
      <header className="flex justify-between items-center mb-10">
        <button onClick={() => setLocation("/hub")} className="p-4 bg-zinc-900 rounded-2xl active:scale-75 transition-all border border-white/5"><ArrowLeft size={20}/></button>
        <div className="bg-cyan-500 text-black px-5 py-2 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <Gem size={14} fill="black" />
          <span className="text-xs font-black italic tracking-widest leading-none">450</span>
        </div>
      </header>

      <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-10">Gems</h2>

      <div className="space-y-4">
        <ShopTile title="Starter Kit" amount="100 Gems" price="₹80" icon={<Zap className="text-yellow-400" />} />
        <ShopTile title="Power User" amount="500 Gems" price="₹350" icon={<Gem className="text-cyan-400" />} />
        <div className="bg-gradient-to-br from-purple-600 to-blue-700 p-8 rounded-[45px] mt-6 relative overflow-hidden group active:scale-95 transition-all cursor-pointer">
          <div className="relative z-10">
            <h3 className="text-2xl font-black italic uppercase mb-2">Creator Pass</h3>
            <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest mb-6">Lifetime Access to All AI Nodes</p>
            <button className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase italic">Buy ₹1200</button>
          </div>
          <ShieldCheck size={120} className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity" />
        </div>
      </div>
    </div>
  );
}

function ShopTile({ title, amount, price, icon }: any) {
  return (
    <button className="w-full bg-zinc-900/30 border border-white/5 p-6 rounded-[35px] flex items-center justify-between active:scale-[0.98] transition-all group">
      <div className="flex items-center gap-5">
        <div className="p-4 bg-black rounded-2xl border border-white/5 shadow-xl">{icon}</div>
        <div className="text-left">
          <h4 className="text-sm font-black italic uppercase tracking-widest">{title}</h4>
          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mt-1">{amount}</p>
        </div>
      </div>
      <div className="bg-zinc-800 group-hover:bg-white group-hover:text-black px-5 py-2 rounded-full transition-all">
        <span className="text-[10px] font-black uppercase italic tracking-widest">{price}</span>
      </div>
    </button>
  );
}
