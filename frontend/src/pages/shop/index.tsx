import { ArrowLeft, Gem, Zap, ShoppingBag, ShieldCheck, ChevronRight, CreditCard, Sparkles, Trophy } from "lucide-react";
import { useLocation } from "wouter";

export default function ShopIndex() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans selection:bg-cyan-500/20">
      
      {/* 1. Header with Currency Nodes */}
      <header className="flex justify-between items-center mb-10">
        <button 
          onClick={() => setLocation("/hub")} 
          className="p-4 bg-zinc-900/80 backdrop-blur-xl rounded-2xl active:scale-75 transition-all border border-white/5"
        >
          <ArrowLeft size={20}/>
        </button>
        
        <div className="flex gap-3">
          <div className="bg-zinc-900 border border-white/10 px-5 py-2.5 rounded-2xl flex items-center gap-2">
            <Gem size={14} className="text-cyan-400" fill="currentColor" />
            <span className="text-xs font-black italic tracking-widest leading-none">450</span>
          </div>
          <div className="bg-cyan-500 text-black px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Zap size={14} fill="black" />
            <span className="text-xs font-black italic tracking-widest leading-none">1.2K</span>
          </div>
        </div>
      </header>

      {/* 2. Main Title */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-4 bg-cyan-400 rounded-full" />
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Nexus Marketplace</span>
        </div>
        <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">RX SHOPPING</h2>
      </div>

      {/* 3. Featured: Creator Pass (The Big Deal) */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-700 to-cyan-500 p-1 rounded-[45px] mb-8 group active:scale-[0.98] transition-all cursor-pointer shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
        <div className="bg-black/20 backdrop-blur-3xl p-8 rounded-[44px] relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/10">
              <Trophy size={14} className="text-yellow-400" />
              <span className="text-[9px] font-black uppercase tracking-widest">Most Popular</span>
            </div>
            <h3 className="text-3xl font-black italic uppercase mb-2 tracking-tighter">CREATOR PASS</h3>
            <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest mb-8 leading-relaxed max-w-[200px]">
              Unlock All RX Gemini Nodes & 10x Diamond Multiplier Lifetime.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-[22px] text-[11px] font-black uppercase italic tracking-widest hover:scale-105 transition-all">
                INJECT ₹1200
              </button>
              <div className="text-[10px] font-black text-white/40 line-through tracking-widest">₹4500</div>
            </div>
          </div>
          <ShieldCheck size={180} className="absolute right-[-40px] bottom-[-40px] text-white opacity-10 rotate-12" />
        </div>
      </div>

      {/* 4. Gem Packs (No Cash - Only Digital Nodes) */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-6 px-2">Currency Nodes</h4>
        
        <ShopTile 
          title="Starter Node" 
          amount="100 Gems" 
          price="₹80" 
          icon={<Zap className="text-yellow-400" />} 
          color="cyan"
        />
        <ShopTile 
          title="Engine Pack" 
          amount="500 Gems + 50 Bonus" 
          price="₹350" 
          icon={<Gem className="text-cyan-400" />} 
          color="cyan"
          popular
        />
        <ShopTile 
          title="Master Engine" 
          amount="2500 Gems" 
          price="₹1500" 
          icon={<Sparkles className="text-purple-400" />} 
          color="purple"
        />
      </div>

      {/* 5. Info Bar (No Cash Policy) */}
      <div className="mt-12 p-6 bg-zinc-900/30 border border-white/5 rounded-[35px] flex items-center gap-4">
        <div className="p-3 bg-red-500/10 rounded-2xl text-red-500">
           <CreditCard size={20} />
        </div>
        <div>
          <p className="text-[9px] font-black text-white uppercase tracking-widest leading-none">Safe Gateway Active</p>
          <p className="text-[8px] font-bold text-zinc-600 uppercase mt-1">No Physical Cash Transactions Supported</p>
        </div>
      </div>
    </div>
  );
}

// --- REUSABLE SHOP TILE ---
function ShopTile({ title, amount, price, icon, color, popular }: any) {
  return (
    <button className="w-full bg-[#0A0A0A] border border-white/5 p-6 rounded-[35px] flex items-center justify-between active:scale-[0.98] transition-all group hover:border-cyan-500/30">
      <div className="flex items-center gap-5">
        <div className="p-4 bg-zinc-900 rounded-[22px] border border-white/5 shadow-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <h4 className="text-[11px] font-black italic uppercase tracking-widest text-zinc-200">{title}</h4>
            {popular && <span className="text-[7px] bg-cyan-500 text-black px-2 py-0.5 rounded-full font-black uppercase">Best</span>}
          </div>
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mt-1">{amount}</p>
        </div>
      </div>
      <div className="bg-zinc-900 border border-white/5 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-500 px-6 py-3 rounded-[20px] transition-all">
        <span className="text-[10px] font-black uppercase italic tracking-widest">{price}</span>
      </div>
    </button>
  );
}
