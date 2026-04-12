import React, { useEffect, useState } from "react";
import { storage, databases, account, ID } from "@/lib/appwrite"; // Aapki config file
import { useLocation } from "wouter";
import { User, Gem, CircleDollarSign, LogOut } from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState<any>(null);
  const [stats, setStats] = useState({ gems: 0, revenue: 0 });

  // 🔄 REAL FUNCTION: Fetch User & Stats from Appwrite
  useEffect(() => {
    const initDashboard = async () => {
      try {
        // 1. Get Logged in User
        const user = await account.get();
        setUserData(user);

        // 2. Get Real Stats from racex_db -> user_stats collection
        const res = await databases.getDocument('racex_db', 'user_stats', user.$id);
        setStats({ gems: res.gems, revenue: res.revenue });
      } catch (err) {
        console.log("Appwrite Sync: User not logged in or No stats found");
      }
    };
    initDashboard();
  }, []);

  // 🚀 REAL FUNCTION: Appwrite Logout
  const handleLogout = async () => {
    await account.deleteSession('current');
    setLocation("/auth");
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col p-6 font-sans">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-bold italic">
            Hi <span className="text-blue-500">{userData?.name || 'User'}</span>,
          </h1>
          <p className="text-[9px] text-zinc-500 font-black tracking-[0.3em] uppercase">Race-X Neural Core</p>
        </div>
        
        {/* Real Profile with Logout Option */}
        <button onClick={handleLogout} className="relative group">
          <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 p-0.5 overflow-hidden">
             <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center">
                <User size={20} className="text-zinc-500" />
             </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <LogOut size={10} />
          </div>
        </button>
      </header>

      {/* 📊 REAL STATS (Connected to Appwrite) */}
      <div className="flex gap-4 mb-10">
        <div className="flex-1 bg-zinc-900/50 border border-white/5 p-4 rounded-3xl">
          <Gem className="text-blue-400 mb-2" size={16} />
          <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Gems Balance</p>
          <h4 className="text-lg font-black italic">{stats.gems.toLocaleString()}</h4>
        </div>
        <div className="flex-1 bg-zinc-900/50 border border-white/5 p-4 rounded-3xl">
          <CircleDollarSign className="text-emerald-400 mb-2" size={16} />
          <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Revenue</p>
          <h4 className="text-lg font-black italic">${stats.revenue}</h4>
        </div>
      </div>

      {/* 🛠️ NAVIGATION BUTTONS (Real Routing) */}
      <div className="grid grid-cols-2 gap-4">
        <NavButton label="Video Gen" path="/studio/video" color="border-purple-500/20" />
        <NavButton label="Voice Lab" path="/studio/voice" color="border-pink-500/20" />
        <NavButton label="Pro Editor" path="/studio/editor" color="border-cyan-500/20" />
        <NavButton label="Analytics" path="/studio/analytics" color="border-zinc-500/20" />
      </div>
    </div>
  );
}

function NavButton({ label, path, color }: any) {
  const [, setLocation] = useLocation();
  return (
    <button 
      onClick={() => setLocation(path)}
      className={`h-32 bg-zinc-900/40 border ${color} rounded-[32px] flex flex-col items-center justify-center gap-3 active:scale-95 transition-all`}
    >
      <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
        <Sparkles size={18} className="text-zinc-400" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
