import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, ShoppingCart, Search, 
  Filter, Zap, Star, Tag, Package
} from 'lucide-react';

const ProductGrid = () => {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");

  // 📦 Product Data Node (Physical + Digital Assets)
  const products = [
    { id: 1, name: 'RX-Neon Hoodie', price: '450', type: 'Physical', img: 'https://placehold.co/400x500/111/00e1ff?text=RX+Hoodie' },
    { id: 2, name: 'AI Prompt Pack', price: '120', type: 'Digital', img: 'https://placehold.co/400x500/111/a855f7?text=AI+Prompts' },
    { id: 3, name: 'Cyber Sneakers', price: '890', type: 'Physical', img: 'https://placehold.co/400x500/111/00e1ff?text=RX+Kicks' },
    { id: 4, name: 'Premium Voice Kit', price: '200', type: 'Digital', img: 'https://placehold.co/400x500/111/a855f7?text=Voice+Pack' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans overflow-x-hidden">
      
      {/* 🟢 Header Node (Direct Hub Connection) */}
      <header className="flex justify-between items-center mb-8 pt-4">
        <button onClick={() => setLocation('/hub')} className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800">
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <div className="text-center">
           <h1 className="text-sm font-black italic tracking-widest uppercase italic">RX <span className="text-cyan-400">SHOP</span></h1>
           <p className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.4em]">Official Merch & Assets</p>
        </div>
        <button onClick={() => setLocation('/shop/cart')} className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 relative">
          <ShoppingCart className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-[8px] font-black rounded-full flex items-center justify-center border-2 border-black">2</span>
        </button>
      </header>

      {/* 🔍 Search & Filter Node */}
      <div className="flex gap-3 mb-8">
         <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center px-4 gap-3 focus-within:border-cyan-500/50 transition-all">
            <Search className="w-4 h-4 text-zinc-600" />
            <input type="text" placeholder="SEARCH GEAR..." className="bg-transparent outline-none py-4 text-[10px] font-black uppercase tracking-widest w-full" />
         </div>
         <button className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800"><Filter className="w-5 h-5 text-zinc-500" /></button>
      </div>

      {/* 🟢 Category Tabs Node */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar mb-8">
        {["All", "Apparel", "AI Assets", "Equipment", "Collectibles"].map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
              activeCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-600 border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🟢 Product Grid Node */}
      <div className="grid grid-cols-2 gap-5">
        {products.map((item) => (
          <motion.div 
            key={item.id}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <div className="aspect-[4/5] bg-zinc-900 rounded-[28px] overflow-hidden border border-zinc-800 relative mb-3">
               <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                  <p className="text-[7px] font-black uppercase tracking-widest text-zinc-400">{item.type}</p>
               </div>
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-tight mb-1 truncate">{item.name}</h3>
            <div className="flex items-center gap-1.5">
               <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
               <span className="text-[12px] font-black">{item.price}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ProductGrid;
