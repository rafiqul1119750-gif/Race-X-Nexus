import { useLocation } from "wouter";
import { ArrowLeft, Settings, Gem, User, Shield, LogOut, Grid, Play } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function UserProfile() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-20">
      <div className="flex justify-between items-center mb-10">
        <ArrowLeft onClick={() => setLocation('/social/feed')} className="active:scale-75" />
        <h2 className="text-[10px] font-black tracking-widest uppercase">Nexus Profile</h2>
        <Settings size={20} className="text-zinc-500" />
      </div>

      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-[30px] border-2 border-cyan-400 p-1 mb-4 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
          <div className="w-full h-full bg-zinc-900 rounded-[24px] flex items-center justify-center text-zinc-700">
            <User size={40} />
          </div>
        </div>
        <h1 className="text-xl font-black italic tracking-tighter">RACE-X CREATOR</h1>
        
        {/* CLICKABLE STATS */}
        <div className="flex gap-10 mt-8">
          <div className="text-center" onClick={() => setLocation('/social/feed')}>
            <p className="text-lg font-black">12</p>
            <p className="text-[8px] text-zinc-500 font-black uppercase">Posts</p>
          </div>
          <div className="text-center" onClick={() => setLocation('/social/followers')}>
            <p className="text-lg font-black">8.4K</p>
            <p className="text-[8px] text-zinc-500 font-black uppercase">Followers</p>
          </div>
          <div className="text-center" onClick={() => setLocation('/social/following')}>
            <p className="text-lg font-black">152</p>
            <p className="text-[8px] text-zinc-500 font-black uppercase">Following</p>
          </div>
        </div>

        <button className="w-full mt-10 py-4 bg-cyan-500 text-black font-black uppercase text-[10px] rounded-2xl shadow-lg active:scale-95">
          Edit Profile
        </button>
      </div>

      {/* TABS (Insta Style) */}
      <div className="flex border-t border-white/10 mt-12">
        <div className="flex-1 py-4 flex justify-center border-b border-white"><Grid size={20} /></div>
        <div className="flex-1 py-4 flex justify-center text-zinc-600"><Play size={20} /></div>
      </div>
      
      <div className="grid grid-cols-3 gap-1 mt-1">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="aspect-square bg-zinc-900 border border-white/5"></div>
        ))}
      </div>
    </div>
  );
}
