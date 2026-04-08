import { useState } from "react";
import { 
  Search, ShoppingBag, Heart, Filter, Star, 
  Zap, ArrowRight, ShieldCheck, Truck, RotateCcw 
} from "lucide-react";
import { useLocation } from "wouter";

export default function ShopMain() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white pb-32 selection:bg-cyan-500">
      
      {/* --- PREMIUM NAVBAR --- */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-3xl border-b border-white/5 p-4">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <ShoppingBag size={18} className="text-black" />
            </div>
            <h1 className="font-black italic uppercase tracking-tighter text-xl">Shop-X</h1>
          </div>
          
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16}/>
            <input 
              placeholder="Search Nexus Inventory..." 
              className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] uppercase font-black outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <Heart size={22} className="text-zinc-400 hover:text-red-500 cursor-pointer transition-all" />
            <div onClick={() => setLocation("/shop/cart")} className="relative cursor-pointer active:scale-90 transition-all">
              <ShoppingBag size={22} className="text-zinc-400" />
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO: FLASH DEALS (Flipkart Style) --- */}
      <section className="p-6">
        <div className="relative h-48 md:h-72 w-full rounded-[40px] overflow-hidden group">
          <img src="https://picsum.photos/1200/500?random=501" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]" alt="Offer" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-y-0 left-10 flex flex-col justify-center space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Zap size={16} fill="currentColor"/>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Flash Sale Live</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">Nexus Tech<br/>Carnival</h2>
            <p className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Up to 70% Off on AI Gear</p>
            <button className="bg-white text-black text-[9px] font-black uppercase px-8 py-3 rounded-full w-fit hover:bg-cyan-400 transition-all active:scale-90">Grab Now</button>
          </div>
        </div>
      </section>

      {/* --- CATEGORIES --- */}
      <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar pb-4">
        {['Mobiles', 'Audio', 'Wearables', 'Gaming', 'AI Home', 'Offers'].map((cat) => (
          <button key={cat} className="flex-shrink-0 px-6 py-3 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
            {cat}
          </button>
        ))}
      </div>

      {/* --- PRODUCT GRID (Amazon Style) --- */}
      <section className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase italic tracking-tighter flex items-center gap-2">
            <Star size={16} className="text-cyan-500" fill="currentColor"/> Curated for You
          </h3>
          <Filter size={18} className="text-zinc-500 cursor-pointer" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProductCard 
            title="Nexus Buds Pro" 
            price="₹4,999" 
            oldPrice="₹8,999" 
            rating="4.8" 
            img="https://picsum.photos/400/400?random=502"
          />
          <ProductCard 
            title="Cyber Watch X" 
            price="₹12,499" 
            oldPrice="₹19,999" 
            rating="4.9" 
            img="https://picsum.photos/400/400?random=503"
          />
          <ProductCard 
            title="Neural Link Pad" 
            price="₹45,000" 
            oldPrice="₹52,000" 
            rating="4.7" 
            img="https://picsum.photos/400/400?random=504"
          />
          <ProductCard 
            title="AI Vision Glass" 
            price="₹8,999" 
            oldPrice="₹15,000" 
            rating="4.5" 
            img="https://picsum.photos/400/400?random=505"
          />
        </div>
      </section>
    </div>
  );
}

// --- PRODUCT CARD COMPONENT ---
function ProductCard({ title, price, oldPrice, rating, img }: any) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] overflow-hidden group hover:border-cyan-500/30 transition-all cursor-pointer">
      <div className="aspect-square relative overflow-hidden bg-zinc-900">
        <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Product" />
        <button className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-zinc-400 hover:text-red-500 transition-all">
          <Heart size={14} />
        </button>
      </div>
      <div className="p-5 space-y-2">
        <div className="flex items-center gap-1 text-[8px] font-black text-zinc-500 uppercase">
          <Star size={10} className="text-cyan-500" fill="currentColor"/> {rating} • Nexus Verified
        </div>
        <h4 className="font-bold text-xs truncate uppercase tracking-tighter">{title}</h4>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-black italic">{price}</span>
          <span className="text-[10px] text-zinc-600 line-through font-bold">{oldPrice}</span>
        </div>
        <button className="w-full py-2.5 mt-2 bg-zinc-800 rounded-xl text-[9px] font-black uppercase tracking-widest group-hover:bg-cyan-500 group-hover:text-black transition-all">Add to Cart</button>
      </div>
    </div>
  );
}
