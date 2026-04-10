import { ArrowLeft, Gem, Zap, ShoppingBag, ChevronRight, Sparkles, ExternalLink, TicketPercent, ShieldCheck, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { databases } from "../../lib/appwrite"; // ✅ Nexus Link

// ✅ Nexus Database Config
const DATABASE_ID = 'Race-X-Nexus';
const COLLECTION_ID = 'shopping_inventory';

export default function RXShopping() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [diamonds, setDiamonds] = useState(2850);

  // 🛡️ Simulated API Logic (Isko aap Appwrite se connect kar sakte ho)
  const [products, setProducts] = useState([
    { id: 1, name: "Premium Wireless Buds", price: "₹1,499", oldPrice: "₹4,999", store: "Flipkart", discount: "70% OFF", link: "https://flipkart.com", unlockCost: 500 },
    { id: 2, name: "RGB Gaming Mouse", price: "₹899", oldPrice: "₹2,500", store: "Amazon", discount: "65% OFF", link: "https://amazon.in", unlockCost: 300 },
    { id: 3, name: "Oversized Streetwear Tee", price: "₹499", oldPrice: "₹1,200", store: "Meesho", discount: "60% OFF", link: "https://meesho.com", unlockCost: 200 },
    { id: 4, name: "Smart Watch Ultra", price: "₹2,999", oldPrice: "₹9,999", store: "Amazon", discount: "70% OFF", link: "https://amazon.in", unlockCost: 800 },
  ]);

  // 🤖 FUNCTION: Handle Diamond Deduction for Coupon
  const unlockCoupon = (id: number, cost: number) => {
    if (diamonds >= cost) {
      setDiamonds(prev => prev - cost);
      alert("Nexus Code Unlocked! Check your rewards tab.");
    } else {
      alert("Insufficient Diamonds! Watch ads or refer friends to earn.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-32 font-sans selection:bg-orange-500/20">
      
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-8">
        <button 
          onClick={() => setLocation("/hub")} 
          className="p-4 bg-zinc-900/80 rounded-2xl active:scale-75 transition-all border border-white/5 shadow-2xl"
        >
          <ArrowLeft size={18}/>
        </button>
        
        <div className="bg-zinc-900/50 border border-white/10 px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
          <Gem size={16} className="text-cyan-400" fill="currentColor" />
          <span className="text-sm font-black italic tracking-widest">{diamonds.toLocaleString()}</span>
        </div>
      </header>

      {/* --- ⚡ FLASHING DISCOUNT BANNER --- */}
      <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 p-[2px] rounded-[45px] mb-10 overflow-hidden group">
        <div className="bg-black/90 backdrop-blur-3xl p-8 rounded-[43px] relative overflow-hidden">
          {/* Animated Glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-orange-500/10 animate-pulse" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <TicketPercent size={18} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Exclusive Deal</span>
            </div>
            <h2 className="text-4xl font-black italic uppercase leading-[0.9] tracking-tighter group-hover:scale-105 transition-transform">GET UPTO <br/> <span className="text-orange-500">70% DISCOUNT</span></h2>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-4 max-w-[200px]">Use RX Diamonds to unlock secret promo codes for Flipkart & Amazon.</p>
            
            <button className="mt-6 flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase italic active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
              Redeem Coupons <ChevronRight size={14} />
            </button>
          </div>
          <ShoppingBag size={180} className="absolute right-[-40px] bottom-[-40px] text-white opacity-5 rotate-12 pointer-events-none" />
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="mb-8 px-1">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Trending Deals</h3>
          {loading && <RefreshCw size={14} className="animate-spin text-zinc-700" />}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {products.map((item) => (
            <div key={item.id} className="bg-zinc-900/40 border border-white/5 rounded-[40px] p-4 flex flex-col group hover:border-orange-500/20 transition-all">
              
              {/* Product Image Placeholder */}
              <div className="aspect-square bg-zinc-800 rounded-[30px] mb-4 relative overflow-hidden flex items-center justify-center shadow-inner">
                 <Sparkles className="absolute top-3 right-3 text-orange-500/30" size={16} />
                 <span className="text-[10px] font-black text-zinc-700 uppercase italic">RX Preview</span>
                 
                 {/* Discount Tag */}
                 <div className="absolute bottom-3 left-3 bg-orange-500 text-black px-2 py-1 rounded-lg text-[8px] font-black italic uppercase shadow-lg">
                   {item.discount}
                 </div>
              </div>

              {/* Product Info */}
              <div className="px-2 mb-4">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{item.store}</p>
                  <ShieldCheck size={10} className="text-emerald-500" />
                </div>
                <h4 className="text-[11px] font-black uppercase truncate italic text-white/90">{item.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-black text-white">{item.price}</span>
                  <span className="text-[9px] text-zinc-600 line-through font-bold">{item.oldPrice}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mt-auto">
                <button 
                  onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
                  className="w-full py-3 bg-white text-black rounded-[20px] text-[9px] font-black uppercase italic flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-zinc-200"
                >
                  Buy on {item.store} <ExternalLink size={12} />
                </button>
                <button 
                  onClick={() => unlockCoupon(item.id, item.unlockCost)}
                  className="w-full py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-[18px] text-[8px] font-black uppercase tracking-tighter flex items-center justify-center gap-2 active:bg-cyan-500/20 transition-all"
                >
                  <Gem size={10} fill="currentColor" /> Unlock Code ({item.unlockCost} 💎)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- NO CASH POLICY FOOTER --- */}
      <div className="p-6 bg-zinc-900/80 border border-white/10 rounded-[35px] flex items-center gap-4 shadow-2xl backdrop-blur-md">
        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/20">
          <ShieldCheck size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Safe Gateway Protocol</p>
          <p className="text-[8px] font-bold text-zinc-500 uppercase mt-1 leading-relaxed">
            Direct store redirection enabled. No in-app payments. Zero risk.
          </p>
        </div>
      </div>

    </div>
  );
}
