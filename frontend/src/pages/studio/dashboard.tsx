import React, { useEffect, useState } from "react";
import { storage, databases, account } from "@/lib/appwrite"; 
import { useLocation } from "wouter";
import { User, Gem, CircleDollarSign, LogOut, Sparkles } from "lucide-react"; // 👈 Sparkles add kiya

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState<any>(null);
  const [stats, setStats] = useState({ gems: 0, revenue: 0 });
  const [loading, setLoading] = useState(true); // Loading state add ki

  useEffect(() => {
    const initDashboard = async () => {
      try {
        // 1. Get Logged in User
        const user = await account.get();
        setUserData(user);

        // 2. Get Real Stats
        // Tip: Ensure collection 'user_stats' exists in 'racex_db'
        const res = await databases.getDocument('racex_db', 'user_stats', user.$id);
        setStats({ gems: res.gems || 0, revenue: res.revenue || 0 });
      } catch (err) {
        console.error("Appwrite Dashboard Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    initDashboard();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setLocation("/auth");
    } catch (e) {
      setLocation("/auth");
    }
  };

  if (loading) return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col p-6 font-sans overflow-y-auto">
      <header className="flex justify-between items-center mb-8 shrink-0">
        <div>
          <h1 className="text-xl font-bold italic">
            Hi <span className="text-blue-500">{userData?.name || 'User'}</span>,
          </h1>
          <p className="text-[9px] text-zinc-500 font-black tracking-[0.3em] uppercase">Race-X Neural Core</p>
        </div>
        
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

      {/* Stats Cards */}
      <div className="flex gap-4 mb-10 shrink-0">
        <div className="flex-1 bg-zinc-900/50 border border-white/5 p-4 rounded-3xl shadow-xl">
          <Gem className="text-blue-400 mb-2" size={16} />
          <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Gems Balance</p>
          <h4 className="text-lg font-black italic">{stats.gems.toLocaleString()}</h4>
        </div>
        <div className="flex-1 bg-zinc-900/50 border border-white/5 p-4 rounded-3xl shadow-xl">
          <CircleDollarSign className="text-emerald-400 mb-2" size={16} />
          <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Revenue</p>
          <h4 className="text-lg font-black italic">${stats.revenue}</h4>
        </div>
      </div>

      {/* Nav Grid */}
      <div className="grid grid-cols-2 gap-4 pb-10">
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
      className={`h-32 bg-zinc-900/40 border ${color} rounded-[32px] flex flex-col items-center justify-center gap-3 active:scale-95 transition-all hover:bg-zinc-800/60`}
    >
      <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
        <Sparkles size={18} className="text-zinc-400" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
