import { ShoppingBag, Gem, Zap, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function ShopIndex() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between mb-10">
        <button onClick={() => setLocation("/hub")} className="p-2"><ArrowLeft /></button>
        <h1 className="text-xl font-black italic uppercase tracking-widest text-cyan-400">Gems Store</h1>
        <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full border border-cyan-500/20">
          <Gem size={14} className="text-cyan-400" />
          <span className="text-xs font-black">450</span>
        </div>
      </div>

      <div className="space-y-4">
        <ShopItem title="100 Diamonds" price="₹80" icon={<Zap className="text-yellow-400" />} />
        <ShopItem title="500 Diamonds" price="₹400" icon={<Zap className="text-cyan-400" />} />
        <ShopItem title="Unlimited AI" price="₹1200/mo" icon={<Sparkles className="text-purple-500" />} />
      </div>
    </div>
  );
}

function ShopItem({ title, price, icon }: any) {
  return (
    <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-[35px] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-black rounded-2xl">{icon}</div>
        <span className="text-sm font-black uppercase">{title}</span>
      </div>
      <button className="bg-white text-black px-6 py-2 rounded-full font-black text-xs uppercase italic">Buy</button>
    </div>
  );
}
