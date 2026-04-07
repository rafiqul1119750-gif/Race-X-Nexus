import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, BarChart3, TrendingUp, 
  DollarSign, Users, PlayCircle, 
  Zap, ArrowUpRight, Wallet, PieChart
} from 'lucide-react';

const StudioAnalytics = () => {
  const [, setLocation] = useLocation();

  // 📊 Mock Data based on RX Monetization Logic
  const stats = [
    { label: 'Total Diamonds', value: '12.5K', icon: Zap, color: 'text-cyan-400' },
    { label: 'Ad Revenue', value: '$450.20', icon: DollarSign, color: 'text-emerald-400' },
    { label: 'Reach', value: '85K', icon: Users, color: 'text-purple-400' },
    { label: 'Watch Time', value: '1.2K hrs', icon: PlayCircle, color: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans overflow-x-hidden">
      
      {/* 🟢 Header Node (Back to Hub) */}
      <header className="flex justify-between items-center mb-10 pt-4">
        <button onClick={() => setLocation('/hub')} className="p-3 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <h1 className="text-sm font-black italic tracking-widest uppercase">Creator <span className="text-cyan-400">Insights</span></h1>
        <button className="p-3 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-zinc-400">
          <Wallet className="w-5 h-5" />
        </button>
      </header>

      {/* 🟢 Earnings Overview Card */}
      <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-6 rounded-[32px] mb-8 relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-4 opacity-10">
            <BarChart3 className="w-24 h-24" />
         </div>
         <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2">Estimated Revenue</p>
         <h2 className="text-4xl font-black italic tracking-tighter mb-4">$1,240.00</h2>
         <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 w-fit px-3 py-1 rounded-full border border-emerald-500/20">
            <TrendingUp className="w-3 h-3" />
            <span className="text-[10px] font-black">+12.5% THIS MONTH</span>
         </div>
      </div>

      {/* 🟢 Stats Grid Node */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-950 border border-zinc-900 p-5 rounded-[28px] hover:border-zinc-700 transition-all">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
            <h4 className="text-xl font-black tracking-tight leading-none">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* 🟢 Performance Graph Node (Mock Visual) */}
      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-[32px]">
        <div className="flex justify-between items-end mb-6">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Growth Engine</h3>
           <PieChart className="w-4 h-4 text-zinc-600" />
        </div>
        
        {/* Mock Bar Chart Nodes */}
        <div className="flex items-end justify-between h-32 gap-2">
           {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
             <div key={i} className="flex-1 bg-zinc-800/50 rounded-t-lg relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className={`absolute bottom-0 left-0 right-0 rounded-t-lg ${i === 3 ? 'bg-cyan-500 shadow-[0_0_15px_#00E1FF]' : 'bg-zinc-700 group-hover:bg-zinc-600'}`}
                />
             </div>
           ))}
        </div>
        <div className="flex justify-between mt-4 px-1">
           {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <span key={d} className="text-[8px] font-black text-zinc-600">{d}</span>)}
        </div>
      </div>

      {/* 🟢 Monetization Status Node */}
      <div className="mt-8 p-5 bg-gradient-to-r from-purple-900/20 to-transparent border-l-4 border-purple-500 rounded-r-2xl flex items-center justify-between">
         <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">Ad-Injection Status</p>
            <p className="text-[11px] font-bold text-zinc-400 mt-1">Ready for Diamond Payout</p>
         </div>
         <ArrowUpRight className="w-5 h-5 text-purple-500" />
      </div>

    </div>
  );
};

export default StudioAnalytics;
