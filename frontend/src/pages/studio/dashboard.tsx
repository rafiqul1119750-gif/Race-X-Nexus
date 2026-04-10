import { useLocation } from "wouter";
import { 
  ArrowLeft, LayoutDashboard, BarChart3, Video, Settings, 
  Zap, Sparkles, Mic2, Plus, Play, ChevronRight, Activity 
} from "lucide-react";

export default function StudioDashboard() {
  const [, setLocation] = useLocation();

  // Mock stats - in real app fetch from Appwrite
  const stats = [
    { label: "Total Views", value: "24.8K", color: "bg-cyan-500", width: "w-2/3" },
    { label: "Earnings", value: "₹4,250", color: "bg-emerald-500", width: "w-1/3" }
  ];

  const quickActions = [
    { name: "Cinema AI", icon: <Play fill="currentColor" />, path: "/magic/video-gen", color: "text-blue-400" },
    { name: "Voice Lab", icon: <Mic2 />, path: "/studio/voice-lab", color: "text-purple-400" },
    { name: "Magic Fix", icon: <Sparkles />, path: "/magic/image-gen", color: "text-yellow-400" },
    { name: "Settings", icon: <Settings />, path: "/studio/setup", color: "text-zinc-400" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans selection:bg-cyan-500/30">
      
      {/* --- HEADER --- */}
      <header className="flex items-center justify-between mb-10">
        <button 
          onClick={() => setLocation("/hub")} 
          className="p-4 bg-zinc-900/80 rounded-2xl border border-white/5 active:scale-75 transition-all shadow-2xl"
        >
          <ArrowLeft size={20}/>
        </button>
        <div className="text-right">
          <h1 className="text-xl font-black italic uppercase tracking-tighter text-white">Creator <span className="text-cyan-400">Hub</span></h1>
          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">Protocol v4.0 Active</p>
        </div>
      </header>

      {/* --- ANALYTICS CARD --- */}
      <section className="space-y-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color}/10 blur-[50px] rounded-full`} />
            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-black tracking-tighter italic">{stat.value}</h2>
              <Activity size={20} className="text-zinc-700 mb-2" />
            </div>
            <div className="h-1.5 w-full bg-zinc-800/50 mt-6 rounded-full overflow-hidden">
              <div className={`h-full ${stat.color} ${stat.width} rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]`} />
            </div>
          </div>
        ))}
      </section>

      {/* --- QUICK ACTION GRID --- */}
      <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em] mb-6 px-2">Nexus Engines</h3>
      <div className="grid grid-cols-2 gap-4 mb-10">
        {quickActions.map((action) => (
          <button 
            key={action.name}
            onClick={() => setLocation(action.path)}
            className="bg-zinc-900/40 border border-white/5 p-6 rounded-[35px] flex flex-col items-center gap-4 active:scale-95 transition-all hover:border-white/10 group"
          >
            <div className={`p-4 bg-black rounded-2xl border border-white/5 group-hover:scale-110 transition-transform ${action.color}`}>
              {action.icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest leading-none">{action.name}</span>
          </button>
        ))}
      </div>

      {/* --- CREATE NEW BUTTON (FLOATING FEEL) --- */}
      <button 
        onClick={() => setLocation("/studio/editor")}
        className="w-full bg-white text-black py-8 rounded-[40px] flex items-center justify-center gap-4 group active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        <div className="p-2 bg-black text-white rounded-full group-hover:rotate-90 transition-transform duration-500">
          <Plus size={20} />
        </div>
        <span className="text-xs font-black uppercase italic tracking-widest">Open Studio Editor</span>
      </button>

      {/* --- FOOTER DECOR --- */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-full border border-white/5">
          <Zap size={10} className="text-cyan-400 animate-pulse" />
          <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Nexus Core Node Z-11 Connected</span>
        </div>
      </div>

    </div>
  );
}
