import React from "react";
import { 
  ArrowLeft, BarChart3, TrendingUp, Users, 
  Gem, CircleDollarSign, Eye, ArrowUpRight, 
  Calendar, Zap, Activity
} from "lucide-react";
import { useLocation } from "wouter";

export default function Analytics() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col p-6 font-sans overflow-y-auto no-scrollbar">
      
      {/* 🔮 HEADER */}
      <header className="flex justify-between items-center mb-8 shrink-0">
        <button 
          onClick={() => setLocation("/studio")} 
          className="p-3 bg-zinc-900 rounded-full active:scale-75 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase italic">Neural Insights</span>
        <button className="p-3 bg-zinc-900/50 rounded-full">
          <Calendar size={18} className="text-zinc-400" />
        </button>
      </header>

      {/* 💎 MAIN BALANCE CARDS */}
      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-600/20 to-zinc-900 border border-blue-500/20 rounded-[32px] p-5">
          <div className="flex justify-between items-start mb-4">
            <Gem className="text-blue-400" size={20} />
            <span className="text-[8px] font-black bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Gems Earned</p>
          <h3 className="text-2xl font-black italic tracking-tighter mt-1">12,840</h3>
        </div>

        <div className="bg-gradient-to-br from-emerald-600/20 to-zinc-900 border border-emerald-500/20 rounded-[32px] p-5">
          <div className="flex justify-between items-start mb-4">
            <CircleDollarSign className="text-emerald-400" size={20} />
            <span className="text-[8px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">Live</span>
          </div>
          <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Revenue</p>
          <h3 className="text-2xl font-black italic tracking-tighter mt-1">$420.50</h3>
        </div>
      </section>

      {/* 📈 PERFORMANCE GRAPH (SIMULATED) */}
      <section className="bg-zinc-900/40 border border-white/5 rounded-[40px] p-6 mb-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Content Reach</p>
            <h4 className="text-xl font-bold">84.2K <span className="text-xs text-emerald-500 font-normal ml-2">▲ 24%</span></h4>
          </div>
          <Activity className="text-zinc-700" size={24} />
        </div>
        
        {/* Simple Simulated Bar Chart */}
        <div className="flex items-end justify-between h-32 gap-2">
          {[40, 70, 45, 90, 65, 80, 50, 95, 60].map((h, i) => (
            <div 
              key={i} 
              style={{ height: `${h}%` }} 
              className={`flex-1 rounded-t-full ${i === 7 ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-zinc-800'}`}
            />
          ))}
        </div>
      </section>

      {/* 🚀 QUICK STATS LIST */}
      <section className="space-y-3">
        <h5 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 mb-4">Neural Metrics</h5>
        
        <StatRow icon={<Eye size={16}/>} label="Total Views" value="1.2M" trend="up" />
        <StatRow icon={<Users size={16}/>} label="Followers" value="+4,204" trend="up" />
        <StatRow icon={<Zap size={16}/>} label="AI Power Used" value="84%" trend="down" />
      </section>

      {/* 🏁 BOTTOM CTA */}
      <button className="mt-8 mb-4 w-full bg-white text-black py-5 rounded-[28px] font-black text-[11px] tracking-widest uppercase flex items-center justify-center gap-2 active:scale-95 transition-all">
        Download Full Report
        <ArrowUpRight size={16} />
      </button>

    </div>
  );
}

// --- Helper Components ---

function StatRow({ icon, label, value, trend }: any) {
  return (
    <div className="bg-zinc-900/60 border border-white/5 p-5 rounded-3xl flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-black rounded-2xl text-zinc-400">
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold text-white">{label}</p>
          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Global Rank: #42</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-black italic">{value}</p>
        <p className={`text-[8px] font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-zinc-500'}`}>
          {trend === 'up' ? '▲ GAINING' : '▼ STABLE'}
        </p>
      </div>
    </div>
  );
}
