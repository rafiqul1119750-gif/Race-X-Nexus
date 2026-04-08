import { useLocation } from "wouter";
import { ArrowLeft, Settings, Edit3, Gem, User, Shield, LogOut } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function UserProfile() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-10">
        <ArrowLeft onClick={() => setLocation('/social/feed')} />
        <h2 className="text-xs font-black tracking-widest uppercase">Nexus Profile</h2>
        <Settings size={20} />
      </div>

      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-3xl bg-zinc-800 border-2 border-cyan-400 mb-4 flex items-center justify-center">
          <User size={40} className="text-zinc-600" />
        </div>
        <h1 className="text-xl font-black italic">RACE-X CREATOR</h1>
        <div className="mt-4 bg-zinc-900 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
          <Gem size={14} className="text-cyan-400" />
          <span className="text-xs font-black">{diamonds} 💎</span>
        </div>

        <div className="flex gap-10 mt-10">
          <div className="text-center"><p className="font-black">1.2K</p><p className="text-[8px] text-zinc-500 uppercase">Followers</p></div>
          <div className="text-center"><p className="font-black">450</p><p className="text-[8px] text-zinc-500 uppercase">Following</p></div>
        </div>

        <button className="w-full mt-10 py-4 bg-white text-black font-black uppercase text-[10px] rounded-2xl">Edit Profile</button>
      </div>

      <div className="mt-12 space-y-4">
        <div className="p-5 bg-zinc-900 rounded-2xl flex items-center gap-4 border border-white/5"><Shield size={18} /><span className="text-xs font-bold uppercase">Privacy Settings</span></div>
        <div className="p-5 bg-zinc-900 rounded-2xl flex items-center gap-4 border border-white/5 text-red-500"><LogOut size={18} /><span className="text-xs font-bold uppercase">Logout Node</span></div>
      </div>
    </div>
  );
}
