import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Sparkles, Play, Zap, Shield, Crown, ChevronRight } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function MainHub() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white pb-24 px-4 pt-6">
      {/* --- TOP BAR --- */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black italic tracking-tighter">RX</h1>
        <div className="bg-zinc-900/50 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-xs font-bold tracking-widest">500 <span className="text-cyan-400">💎</span></span>
        </div>
      </div>

      {/* --- MAIN CARDS (AI STUDIO & REELS) --- */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.div 
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/studio/editor")}
          className="aspect-square bg-zinc-900/40 border border-white/5 rounded-[32px] flex flex-col items-center justify-center gap-4 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="p-4 bg-cyan-500/10 rounded-2xl">
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">AI Studio</span>
        </motion.div>

        <motion.div 
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/social/feed")}
          className="aspect-square bg-zinc-900/40 border border-white/5 rounded-[32px] flex flex-col items-center justify-center gap-4 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="p-4 bg-purple-500/10 rounded-2xl">
            <Play className="w-8 h-8 text-purple-400" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Reels</span>
        </motion.div>
      </div>

      {/* --- FEATURED ASSETS (SLEEK LIST) --- */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Featured Assets</h2>
          <Zap className="w-3 h-3 text-yellow-500" />
        </div>

        {[
          { label: "Neural Voice Pack", icon: Crown, color: "text-amber-400" },
          { label: "Cinematic Filters", icon: Shield, color: "text-blue-400" },
          { label: "8K Export Node", icon: Zap, color: "text-cyan-400" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/30 border border-white/5 p-5 rounded-[24px] flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800/50 rounded-xl flex items-center justify-center">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <div className="h-2 w-24 bg-zinc-800 rounded-full mb-2" />
                <div className="h-2 w-16 bg-zinc-800/50 rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold text-cyan-400">+10 💎</span>
               <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
