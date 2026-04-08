import { useLocation } from "wouter";
import { ArrowLeft, Settings, Edit3, Gem, User, Shield, LogOut } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function UserProfile() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <ArrowLeft onClick={() => setLocation('/social/feed')} className="cursor-pointer active:scale-75" />
        <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400">Nexus Node</h2>
        <Settings size={20} className="text-zinc-400" />
      </div>

      {/* PROFILE CARD */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-[30px] bg-zinc-900 border-2 border-cyan-400 mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">
          <User size={40} className="text-zinc-700" />
        </div>
        <h1 className="text-xl font-black italic tracking-tighter uppercase">Race-X Elite</h1>
        <div className="mt-4 bg-zinc-900/80 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
          <Gem size={14} className="text-cyan-400 animate-pulse" />
          <span className="text-xs font-black tracking-widest">{diamonds} 💎</span>
        </div>

        {/* STATS */}
        <div className="flex gap-12 mt-10">
          <div className="text-center"><p className="text-lg font-black italic">0</p><p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Posts</p></div>
          <div className="text-center"><p className="text-lg font-black italic">10</p><p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Followers</p></div>
          <div className="text-center"><p className="text-lg font-black italic">25</p><p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Following</p></div>
        </div>

        <button className="w-full mt-10 py-4 bg-white text-black font-black uppercase text-[10px] rounded-2xl active:scale-95 transition-transform shadow-xl">
          Edit Interface
        </button>
      </div>

      {/* QUICK LINKS */}
      <div className="mt-12 space-y-3">
        <div className="p-5 bg-zinc-900/50 rounded-2xl flex items-center gap-4 border border-white/5 active:bg-zinc-800 cursor-pointer">
           <Shield size={18} className="text-zinc-500" />
           <span className="text-[10px] font-black uppercase tracking-wider">Privacy & Security</span>
        </div>
        <div onClick={() => setLocation('/hub')} className="p-5 bg-zinc-900/50 rounded-2xl flex items-center gap-4 border border-white/5 active:bg-zinc-800 cursor-pointer">
           <LogOut size={18} className="text-red-500" />
           <span className="text-[10px] font-black uppercase tracking-wider text-red-500">Disconnect (Back to Hub)</span>
        </div>
      </div>
    </div>
  );
}
