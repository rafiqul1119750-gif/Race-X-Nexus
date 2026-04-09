import { ArrowLeft, Gem, Zap, ShoppingBag, ChevronRight, Sparkles, ExternalLink, TicketPercent, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";

export default function RXShopping() {
  const [, setLocation] = useLocation();

  // Simulated Affiliate Products
  const products = [
    { id: 1, name: "Premium Wireless Buds", price: "₹1,499", oldPrice: "₹4,999", store: "Flipkart", discount: "70% OFF", link: "https://flipkart.com" },
    { id: 2, name: "RGB Gaming Mouse", price: "₹899", oldPrice: "₹2,500", store: "Amazon", discount: "65% OFF", link: "https://amazon.in" },
    { id: 3, name: "Oversized Streetwear Tee", price: "₹499", oldPrice: "₹1,200", store: "Meesho", discount: "60% OFF", link: "https://meesho.com" },
    { id: 4, name: "Smart Watch Ultra", price: "₹2,999", oldPrice: "₹9,999", store: "Amazon", discount: "70% OFF", link: "https://amazon.in" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-32 font-sans selection:bg-orange-500/20">
      
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-8">
        <button 
          onClick={() => setLocation("/hub")} 
          className="p-4 bg-zinc-900/80 rounded-2xl active:scale-75 transition-all border border-white/5"
        >
          <ArrowLeft size={18}/>
        </button>
        
        <div className="bg-zinc-900/50 border border-white/10 px-5 py-2.5 rounded-2xl flex items-center gap-3">
          <Gem size={16} className="text-cyan-400" fill="currentColor" />
          <span className="text-sm font-black italic tracking-widest">2,850</span>
        </div>
      </header>

      {/* --- ⚡ FLASHING DISCOUNT BANNER --- */}
      <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 p-[2px] rounded-[45px] mb-10 overflow-hidden animate-pulse">
        <div className="bg-black/90 backdrop-blur-3xl p-8 rounded-[43px] relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <TicketPercent size={18} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Exclusive Deal</span>
            </div>
            <h2 className="text-4xl font-black italic uppercase leading-[0.9] tracking-tighter">GET UPTO <br/> <span className="text-orange-500">70% DISCOUNT</span></h2>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-4 max-w-[200px]">Use RX Diamonds to unlock secret promo codes for Flipkart & Amazon.</p>
            
            <button className="mt-6 flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase italic active:scale-95 transition-all">
              Redeem Coupons <ChevronRight size={14} />
            </button>
          </div>
          <ShoppingBag size={180} className="absolute right-[-40px] bottom-[-40px] text-white opacity-5 rotate-12" />
        </div>
      </div>

      {/* --- PRODUCT GRID (Flipkart/Amazon Clone) --- */}
      <div className="mb-8 px-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-6">Trending Deals</h3>
        <div className="grid grid-cols-2 gap-4">
          {products.map((item) => (
            <div key={item.id} className="bg-zinc-900/40 border border-white/5 rounded-[40px] p-4 flex flex-col group">
              {/* Product Image Placeholder */}
              <div className="aspect-square bg-zinc-800 rounded-[30px] mb-4 relative overflow-hidden flex items-center justify-center">
                 <Sparkles className="absolute top-3 right-3 text-orange-500/30" size={16} />
                 <span className="text-[10px] font-black text-zinc-700 uppercase italic">RX Preview</span>
                 {/* Discount Tag */}
                 <div className="absolute bottom-3 left-3 bg-orange-500 text-black px-2 py-1 rounded-lg text-[8px] font-black italic uppercase">
                   {item.discount}
                 </div>
              </div>

              {/* Product Info */}
              <div className="px-2 mb-4">
                <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">{item.store}</p>
                <h4 className="text-[11px] font-black uppercase truncate italic text-white/90">{item.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-black text-white">{item.price}</span>
                  <span className="text-[9px] text-zinc-600 line-through font-bold">{item.oldPrice}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mt-auto">
                <button 
                  onClick={() => window.open(item.link, '_blank')}
                  className="w-full py-3 bg-white text-black rounded-[20px] text-[9px] font-black uppercase italic flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  Buy on {item.store} <ExternalLink size={12} />
                </button>
                <button className="w-full py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-[18px] text-[8px] font-black uppercase tracking-tighter flex items-center justify-center gap-2">
                  <Gem size={10} fill="currentColor" /> Unlock Code (500 💎)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- NO CASH POLICY FOOTER --- */}
      <div className="p-6 bg-zinc-900/80 border border-white/10 rounded-[35px] flex items-center gap-4 shadow-2xl">
        <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 shrink-0">
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
