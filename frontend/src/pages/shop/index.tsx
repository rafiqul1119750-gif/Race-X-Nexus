import { Gem, Zap, Sparkles, ArrowLeft, ShoppingBag } from "lucide-react";
import { useLocation } from "wouter";

export default function ShopIndex() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="flex items-center justify-between mb-10">
        <button onClick={() => setLocation("/hub")} className="p-2 active:scale-75 transition-all"><ArrowLeft /></button>
        <h1 className="text-xl font-black italic uppercase tracking-widest text-cyan-400">RX Shop</h1>
        <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full border border-cyan-500/20">
          <Gem size={14} className="text-cyan-400" />
          <span className="text-xs font-black tracking-widest">450</span>
        </div>
      </div>

      <div className="space-y-4">
        <ShopItem title="Starter Gems" amount="100" price="₹80" icon={<Zap className="text-yellow-400" />} />
        <ShopItem title="Pro Diamonds" amount="500" price="₹400" icon={<Zap className="text-cyan-400" />} />
        <ShopItem title="Creative Pass" amount="Monthly" price="₹1200" icon={<Sparkles className="text-purple-500" />} />
      </div>
    </div>
  );
}

function ShopItem({ title, amount, price, icon }: any) {
  return (
    <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-[35px] flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-black rounded-2xl">{icon}</div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-tighter">{title}</h4>
          <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{amount} Units</p>
        </div>
      </div>
      <button className="bg-white text-black px-6 py-2 rounded-full font-black text-[10px] uppercase italic active:scale-90 transition-all">{price}</button>
    </div>
  );
}
