import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronLeft, ExternalLink, ShoppingBag, Zap } from 'lucide-react';

const ExternalShop = () => {
  const [, setLocation] = useLocation();

  // 📦 Redirect Logic Node
  const products = [
    { 
      id: 1, 
      name: 'RX-Tech Hoodie', 
      price: '₹1,499', 
      platform: 'Amazon', 
      link: 'https://amazon.in/dp/example',
      img: 'https://placehold.co/400x500/111/00e1ff?text=Amazon+Item' 
    },
    { 
      id: 2, 
      name: 'Cyber Sneakers', 
      price: '₹2,999', 
      platform: 'Flipkart', 
      link: 'https://flipkart.com/example',
      img: 'https://placehold.co/400x500/111/a855f7?text=Flipkart+Item' 
    },
  ];

  const handleRedirect = (url: string) => {
    window.open(url, '_blank'); // 🚀 Redirect to external app/site
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans">
      
      {/* 🟢 Header Node */}
      <header className="flex justify-between items-center mb-10 pt-4">
        <button onClick={() => setLocation('/hub')} className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800">
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <div className="text-center">
           <h1 className="text-sm font-black italic tracking-widest uppercase italic">RX <span className="text-cyan-400">MARKET</span></h1>
           <p className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.4em]">Official Affiliates</p>
        </div>
        <div className="w-10" />
      </header>

      {/* 🟢 Product Grid (With Redirect Buttons) */}
      <div className="grid grid-cols-1 gap-8">
        {products.map((item) => (
          <motion.div 
            key={item.id}
            className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] overflow-hidden"
          >
            <img src={item.img} alt={item.name} className="w-full h-64 object-cover" />
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-black uppercase italic tracking-tighter">{item.name}</h3>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Available on {item.platform}</p>
                </div>
                <div className="text-xl font-black text-white">{item.price}</div>
              </div>

              {/* 🚀 The Redirect Trigger Node */}
              <button 
                onClick={() => handleRedirect(item.link)}
                className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all"
              >
                Buy on {item.platform}
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 💡 Info Note */}
      <p className="mt-10 text-center text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em] px-10">
        You will be redirected to an external partner for secure payment & delivery.
      </p>
    </div>
  );
};

export default ExternalShop;
