import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Zap, Play, Music, ShoppingBag, 
  Wallet, Trophy, Bell, Settings 
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import AdBanner from '../components/AdBanner';

const MainHub = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white pb-32 overflow-x-hidden">
      
      {/* 🟢 Header Node (Logo & Wallet) */}
      <header className="flex justify-between items-center p-6 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* 🖼️ Logo Import from Public */}
          <img src="/images/rx-logo.png" alt="RX Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(0,225,255,0.5)]" />
          <div>
            <h1 className="text-lg font-black italic tracking-tighter leading-none">RACE-X</h1>
            <span className="text-[8px] text-cyan-400 font-bold uppercase tracking-[0.3em]">Nexus v1.0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-zinc-900 px-3 py-1.5 rounded-2xl border border-white/5 flex items-center gap-2">
            <Wallet className="w-3 h-3 text-yellow-500" />
            <span className="text-xs font-black italic">1.2K</span>
          </div>
          <Bell className="w-5 h-5 text-zinc-500" />
        </div>
      </header>

      {/* 🟢 Hero Banner Node (Public Image Import) */}
      <section className="px-6 py-4">
        <div 
          className="relative h-48 rounded-[40px] overflow-hidden border border-white/10 flex items-center px-8"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.8), transparent), url('/images/hero-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 max-w-[200px]">
            <h2 className="text-2xl font-black italic leading-none tracking-tighter uppercase mb-2">
              Welcome to <span className="text-cyan-400">Race-X</span> Creative World
            </h2>
            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Unleash the Power of AI</p>
          </div>
          {/* Neon Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
      </section>

      {/* 🟢 Module Grid (The Nexus) */}
      <div className="grid grid-cols-2 gap-4 px-6 mt-6">
        {/* Studio Card */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation('/studio/editor')}
          className="bg-zinc-900/50 p-6 rounded-[32px] border border-white/5 flex flex-col items-center gap-3"
        >
          <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shadow-neon-blue">
            <Zap className="w-6 h-6 fill-black" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">AI Studio</span>
        </motion.div>

        {/* Social Card */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation('/social/feed')}
          className="bg-zinc-900/50 p-6 rounded-[32px] border border-white/5 flex flex-col items-center gap-3"
        >
          <div className="w-12 h-12 bg-cyan-500 text-black rounded-2xl flex items-center justify-center">
            <Play className="w-6 h-6 fill-black" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Explore</span>
        </motion.div>
      </div>

      {/* 🟢 Ad Engine Injection */}
      <div className="px-6 mt-8">
        <AdBanner />
      </div>

      {/* 🟢 Secondary Actions */}
      <div className="px-6 mt-8 space-y-4">
         <div className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3">
               <Music className="w-5 h-5 text-purple-500" />
               <span className="text-[10px] font-black uppercase tracking-widest">Audio Library</span>
            </div>
            <button onClick={() => setLocation('/music/library')} className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Open</button>
         </div>
         <div className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3">
               <ShoppingBag className="w-5 h-5 text-pink-500" />
               <span className="text-[10px] font-black uppercase tracking-widest">RX Shop</span>
            </div>
            <button onClick={() => setLocation('/shop/products')} className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Visit</button>
         </div>
      </div>

      {/* 🟢 Navigation Node */}
      <BottomNav />
    </div>
  );
};

export default MainHub;
