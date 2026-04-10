import { useState, useEffect } from "react";
import { 
  Search, ShoppingBag, Heart, Filter, Star, 
  Zap, ArrowRight, ShieldCheck, Truck, RotateCcw, RefreshCw
} from "lucide-react";
import { useLocation } from "wouter";
import { databases } from "../../lib/appwrite"; // ✅ Nexus Connection

// ✅ Nexus Config
const DATABASE_ID = 'Race-X-Nexus';
const COLLECTION_ID = 'api_configs';

export default function ShopMain() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🛡️ 1. NEXUS ENGINE SYNC (Fetch Products/API)
  useEffect(() => {
    const syncShopEngine = async () => {
      try {
        // Yahan aap FakeStore API ya apni custom Appwrite collection use kar sakte hain
        const res = await fetch('https://fakestoreapi.com/products?limit=8');
        const data = await res.json();
        
        // Transform data to fit RX-Style
        const rxProducts = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          price: `₹${(p.price * 80).toLocaleString()}`, // INR conversion
          oldPrice: `₹${(p.price * 120).toLocaleString()}`,
          rating: p.rating.rate,
          img: p.image
        }));
        
        setProducts(rxProducts);
      } catch (err) {
        console.error("Nexus Shop Link Failed");
      } finally {
        setIsLoading(false);
      }
    };
    syncShopEngine();
  }, []);

  // 🛒 2. CART LOGIC
  const addToCart = () => {
    setCartCount(prev => prev + 1);
    // Future: Add to Appwrite 'cart' collection
  };

  // 🔍 3. SEARCH FILTER
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pb-32 selection:bg-cyan-500">
      
      {/* --- PREMIUM NAVBAR --- */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-3xl border-b border-white/5 p-4">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setLocation("/shop")}>
            <div className="p-2 bg-cyan-500 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <ShoppingBag size={18} className="text-black" />
            </div>
            <h1 className="font-black italic uppercase tracking-tighter text-xl">Shop-X</h1>
          </div>
          
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16}/>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Nexus Inventory..." 
              className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] uppercase font-black outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <Heart size={22} className="text-zinc-400 hover:text-red-500 cursor-pointer transition-all" />
            <div onClick={() => setLocation("/shop/cart")} className="relative cursor-pointer active:scale-90 transition-all">
              <ShoppingBag size={22} className="text-zinc-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO: FLASH DEALS --- */}
      <section className="p-6">
        <div className="relative h-48 md:h-72 w-full rounded-[40px] overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]" alt="Offer" />
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

      {/* --- PRODUCT GRID --- */}
      <section className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase italic tracking-tighter flex items-center gap-2">
            <Star size={16} className="text-cyan-500" fill="currentColor"/> 
            {searchQuery ? `Search Results: ${searchQuery}` : "Curated for You"}
          </h3>
          <Filter size={18} className="text-zinc-500 cursor-pointer" />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <RefreshCw className="animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Syncing Inventory...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((p) => (
              <ProductCard 
                key={p.id}
                title={p.title} 
                price={p.price} 
                oldPrice={p.oldPrice} 
                rating={p.rating} 
                img={p.img}
                onAdd={addToCart}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// --- PRODUCT CARD COMPONENT (Functional) ---
function ProductCard({ title, price, oldPrice, rating, img, onAdd }: any) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] overflow-hidden group hover:border-cyan-500/30 transition-all cursor-pointer flex flex-col h-full">
      <div className="aspect-square relative overflow-hidden bg-zinc-900">
        <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 p-4" alt="Product" />
        <button className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-zinc-400 hover:text-red-500 transition-all">
          <Heart size={14} />
        </button>
      </div>
      <div className="p-5 space-y-2 flex-1 flex flex-col">
        <div className="flex items-center gap-1 text-[8px] font-black text-zinc-500 uppercase">
          <Star size={10} className="text-cyan-500" fill="currentColor"/> {rating} • Nexus Verified
        </div>
        <h4 className="font-bold text-[10px] uppercase tracking-tighter line-clamp-2 h-8">{title}</h4>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-black italic text-cyan-400">{price}</span>
            <span className="text-[10px] text-zinc-600 line-through font-bold">{oldPrice}</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            className="w-full py-2.5 mt-2 bg-zinc-800 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
