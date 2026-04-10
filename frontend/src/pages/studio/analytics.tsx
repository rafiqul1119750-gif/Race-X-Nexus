import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, BarChart3, TrendingUp, 
  DollarSign, Users, PlayCircle, 
  Zap, ArrowUpRight, Wallet, PieChart, 
  Gem, RefreshCw, Activity
} from 'lucide-react';

const StudioAnalytics = () => {
  const [, setLocation] = useLocation();

  // 📊 Mock Data integrated with RX Monetization Logic
  const stats = [
    { label: 'Total Diamonds', value: '12,500', icon: Zap, color: 'text-cyan-400', glow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]' },
    { label: 'Uncut Gems', value: '8,420', icon: Gem, color: 'text-pink-400', glow: 'shadow-[0_0_15px_rgba(244,114,182,0.3)]' },
    { label: 'Global Reach', value: '85.2K', icon: Users, color: 'text-purple-400', glow: '' },
    { label: 'Watch Time', value: '1.2K hrs', icon: PlayCircle, color: 'text-orange-400', glow: '' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* 🟢 Header Node */}
      <header className="flex justify-between items-center mb-10 pt-4">
        <button onClick={() => setLocation('/studio')} className="p-3 bg-zinc-900/50 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <div className="text-center">
          <h1 className="text-[10px] font-black italic tracking-[0.4em] uppercase text-white">RX <span className="text-cyan-400">Insights</span></h1>
          <div className="flex items-center justify-center gap-1 mt-1">
             <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
             <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Nexus Sync: 100%</span>
          </div>
        </div>
        <button className="p-3 bg-zinc-900/50 rounded-2xl border border-white/5 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <Wallet className="w-5 h-5" />
        </button>
      </header>

      {/* 🟢 Main Revenue Node */}
      <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[40px] mb-8 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity className="w-32 h-32" />
         </div>
         <div className="relative z-10">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2">Estimated Payout</p>
            <h2 className="text-5xl font-black italic tracking-tighter mb-4">$1,240<span className="text-zinc-700 text-3xl">.00</span></h2>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-[9px] font-black uppercase">+12.5%</span>
               </div>
               <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">Node: Active</span>
            </div>
         </div>
      </div>

      {/* 🟢 Grid Stats (With Glow) */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-zinc-900/20 border border-white/5 p-6 rounded-[35px] hover:border-white/10 transition-all ${stat.glow}`}>
            <stat.icon className={`w-5 h-5 ${stat.color} mb-4`} />
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 leading-none">{stat.label}</p>
            <h4 className="text-xl font-black tracking-tighter leading-none">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* 🟢 Conversion Progress (Gems to Diamonds) */}
      <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-[35px] mb-8">
         <div className="flex justify-between items-center mb-4">
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Conversion Progress</p>
            <RefreshCw className="w-3 h-3 text-zinc-600 animate-spin-slow" />
         </div>
         <div className="h-2 w-full bg-zinc-800/50 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '84.2%' }}
               className="h-full bg-gradient-to-r from-pink-500 to-cyan-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]"
            />
         </div>
         <div className="flex justify-between mt-3">
            <span className="text-[8px] font-black text-zinc-600 uppercase">8,420 Gems</span>
            <span className="text-[8px] font-black text-zinc-600 uppercase">Goal: 10,000</span>
         </div>
      </div>

      {/* 🟢 Growth Chart Node */}
      <div className="bg-zinc-950 border border-white/5 p-8 rounded-[40px]">
        <div className="flex justify-between items-center mb-8">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Growth Engine</h3>
           <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
           </div>
        </div>
        
        <div className="flex items-end justify-between h-32 gap-3">
           {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
             <div key={i} className="flex-1 bg-zinc-900/50 rounded-2xl relative overflow-hidden group cursor-pointer">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className={`absolute bottom-0 left-0 right-0 rounded-2xl transition-all duration-500 ${i === 3 ? 'bg-cyan-500 shadow-[0_0_20px_#00E1FF]' : 'bg-zinc-800 group-hover:bg-zinc-700'}`}
                />
             </div>
           ))}
        </div>
        <div className="flex justify-between mt-6 px-1">
           {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => <span key={d} className="text-[8px] font-black text-zinc-700 tracking-tighter">{d}</span>)}
        </div>
      </div>

      {/* 🟢 Footer Info */}
      <div className="mt-8 text-center">
         <p className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.6em]">
            Race-X Neural Engine | Protocol v4.0
         </p>
      </div>

    </div>
  );
};

export default StudioAnalytics;
