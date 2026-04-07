import { useLocation } from "wouter";
import { ArrowLeft, ShoppingBag, Zap, Crown } from "lucide-react";

export default function ShopMain() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="flex items-center justify-between mb-10">
        <ArrowLeft onClick={() => setLocation("/hub")} className="cursor-pointer" />
        <h1 className="text-xl font-black italic text-pink-500 uppercase tracking-widest">RX SHOP</h1>
        <div className="text-xs font-bold bg-pink-500/10 px-4 py-2 rounded-full">0 CART</div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {[
          { name: "Gold Creator Pack", price: "499 💎", icon: Crown, color: "text-amber-400" },
          { name: "Ad-Free Nexus", price: "199 💎", icon: Zap, color: "text-cyan-400" }
        ].map((item, i) => (
          <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 rounded-[32px] flex items-center justify-between group active:scale-95 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest">{item.name}</h3>
                <p className="text-[10px] text-zinc-500 mt-1">{item.price}</p>
              </div>
            </div>
            <button className="bg-white text-black text-[8px] font-black px-5 py-3 rounded-full uppercase tracking-tighter">Unlock</button>
          </div>
        ))}
      </div>
    </div>
  );
}
