import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Zap, Play, LayoutGrid, Wallet, Sparkles } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function MainHub() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* --- HEADER / WALLET SECTION --- */}
      <header className="p-6 flex justify-between items-center sticky top-0 bg-black/50 backdrop-blur-md z-10">
        <div className="font-cyber text-xl tracking-tighter text-neon">RX</div>
        <div 
          onClick={() => setLocation("/wallet")}
          className="glass-card px-4 py-2 rounded-full flex items-center gap-2 border-cyan-500/30"
        >
          <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_cyan]" />
          <span className="text-xs font-black tracking-widest">500💎</span>
        </div>
      </header>

      {/* --- HERO BANNER --- */}
      <div className="px-6 mt-4">
        <div className="relative h-48 rounded-3xl overflow-hidden border border-white/10">
          <img 
            src="/images/hero-bg.png" 
            className="w-full h-full object-cover opacity-60"
            alt="Race-X Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h2 className="text-2xl font-black italic uppercase leading-none">Create with AI</h2>
            <p className="text-[10px] text-cyan-400 font-bold tracking-widest mt-1">GENERATE • EDIT • EARN</p>
          </div>
        </div>
      </div>

      {/* --- CORE NODES (Quick Actions) --- */}
      <div className="grid grid-cols-2 gap-4 px-6 mt-8">
        {/* Studio Card */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/studio/editor")}
          className="glass-card p-6 rounded-3xl flex flex-col items-center gap-4 border-white/5"
        >
          <div className="p-4 bg-cyan-500/10 rounded-2xl">
            <Sparkles className="text-cyan-400 w-8 h-8" />
          </div>
          <span className="text-[10px] font-black tracking-widest uppercase">AI Studio</span>
        </motion.div>

        {/* Social Card */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/social/feed")}
          className="glass-card p-6 rounded-3xl flex flex-col items-center gap-4 border-white/5"
        >
          <div className="p-4 bg-purple-500/10 rounded-2xl">
            <Play className="text-purple-400 w-8 h-8" />
          </div>
          <span className="text-[10px] font-black tracking-widest uppercase">Reels</span>
        </motion.div>
      </div>

      {/* --- RECENT ACTIVITY SECTION --- */}
      <div className="px-6 mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">Featured Assets</h3>
          <Zap className="w-4 h-4 text-yellow-400" />
        </div>
        
        {/* Dummy Asset Rows */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="glass-card p-4 rounded-2xl mb-3 flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl overflow-hidden border border-white/5" />
            <div className="flex-1">
              <div className="h-2 w-24 bg-zinc-800 rounded-full mb-2" />
              <div className="h-2 w-12 bg-zinc-900 rounded-full" />
            </div>
            <div className="text-[10px] font-bold text-cyan-400 tracking-widest">+10💎</div>
          </div>
        ))}
      </div>

      {/* --- BOTTOM NAVIGATION --- */}
      <BottomNav />
    </div>
  );
}
