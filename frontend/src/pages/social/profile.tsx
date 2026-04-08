import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowLeft, Settings, Edit3, Bookmark, Gem, Shield, LogOut, User } from "lucide-react";
import { useAppContext } from "../../context/AppContext"; 

export default function Profile() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();

  return (
    <div className="min-h-screen bg-black text-white pb-10 font-sans">
      {/* HEADER */}
      <div className="p-6 flex justify-between items-center bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5">
        <ArrowLeft onClick={() => setLocation('/social/feed')} className="text-zinc-400 active:scale-75 cursor-pointer" />
        <h2 className="text-xs font-black italic tracking-[0.2em] uppercase">My Nexus Profile</h2>
        <Settings size={20} className="text-zinc-400" />
      </div>

      <div className="flex flex-col items-center mt-10 px-6">
        <div className="w-28 h-28 rounded-[40px] bg-gradient-to-tr from-cyan-500 to-purple-600 p-1 mb-4 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
          <div className="w-full h-full rounded-[38px] border-4 border-black overflow-hidden bg-zinc-800 flex items-center justify-center">
            <User size={50} className="text-zinc-600" />
          </div>
        </div>
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">Race-X Elite</h1>
        
        <div className="mt-6 flex items-center gap-2 bg-zinc-900/80 px-5 py-2.5 rounded-2xl border border-white/10 shadow-xl">
          <Gem size={14} className="text-cyan-400 animate-pulse" />
          <span className="text-xs font-black tracking-widest">{diamonds} DIAMONDS</span>
        </div>

        <div className="flex justify-between w-full mt-10 px-4">
          {[{ label: 'Posts', value: '0' }, { label: 'Followers', value: '10' }, { label: 'Following', value: '25' }].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-black italic">{s.value}</p>
              <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 w-full mt-10">
          <button className="flex-1 py-4 bg-white text-black text-[10px] font-black uppercase rounded-[20px] flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <Edit3 size={14} /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
