import { useState, useEffect } from "react";
import { 
  Users, ShieldAlert, BarChart3, Database, 
  Trash2, CheckCircle, Ban, DollarSign, 
  Settings, Bell, Search, Lock, ShieldCheck, Activity
} from "lucide-react";

// ✅ SAHI PATH: Kyunki dashboard.tsx 'pages' folder mein hai, toh lib tak pahunchne ke liye sirf ek bar ../ chahiye
import { account, databases, ID, Query } from "../lib/appwrite";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'moderation'>('stats');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        if (user.labels && user.labels.includes('admin')) {
          setIsAdmin(true);
        } else {
          window.location.href = "/hub"; // Fail hone par Hub par bhejo
        }
      } catch (err) {
        window.location.href = "/auth/signin";
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 font-black animate-pulse uppercase tracking-[0.5em]">
      Nexus Authenticating...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/5 bg-black/50 backdrop-blur-3xl p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-600 rounded-2xl shadow-[0_0_25px_rgba(220,38,38,0.5)]">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-black italic uppercase tracking-tighter text-xl text-white">Nexus Admin</h2>
            <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">Master Access</span>
          </div>
        </div>

        <nav className="space-y-3">
          <AdminTab active={activeTab === 'stats'} label="Platform Stats" icon={<BarChart3 size={18}/>} onClick={() => setActiveTab('stats')} />
          <AdminTab active={activeTab === 'users'} label="User Records" icon={<Users size={18}/>} onClick={() => setActiveTab('users')} />
          <AdminTab active={activeTab === 'moderation'} label="Safety Queue" icon={<ShieldAlert size={18}/>} onClick={() => setActiveTab('moderation')} />
        </nav>

        <div className="mt-auto p-5 bg-zinc-900/30 rounded-3xl border border-white/5 space-y-4">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">System Engine</p>
            <div className="flex items-center gap-2 py-2 border-t border-white/5">
              <Activity size={12} className="text-green-500 animate-pulse" />
              <span className="text-[10px] font-black text-green-500 uppercase">Cloud Sync: Active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Command Center</h1>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-2">
              Connected to Appwrite Cloud Engine
            </p>
          </div>
          <div className="flex gap-4">
             <button className="p-4 bg-zinc-900 rounded-2xl border border-white/5"><Settings size={20}/></button>
             <button className="p-4 bg-zinc-900 rounded-2xl border border-white/5 relative">
                <Bell size={20}/><span className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full ring-4 ring-black" />
             </button>
          </div>
        </header>

        {activeTab === 'stats' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="grid grid-cols-4 gap-6">
              <AdminStatBox label="Active Users" value="24.8K" trend="+12%" color="blue" />
              <AdminStatBox label="Nexus Gems" value="1.2M" trend="+5%" color="cyan" />
              <AdminStatBox label="Storage Used" value="850GB" trend="+18%" color="purple" />
              <AdminStatBox label="API Latency" value="42ms" trend="Optimal" color="green" />
            </div>
            <div className="bg-zinc-900/20 rounded-[45px] border border-white/5 p-10 h-64 flex items-center justify-center">
               <p className="text-zinc-600 font-black uppercase tracking-[0.5em] text-[10px]">Real-time Analytics Feed Active</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function AdminTab({ active, label, icon, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-[22px] transition-all ${active ? 'bg-white text-black shadow-lg' : 'text-zinc-600 hover:text-white'}`}>
      {icon}<span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
    </button>
  );
}

function AdminStatBox({ label, value, trend, color }: any) {
  return (
    <div className="bg-zinc-900/40 p-8 rounded-[40px] border border-white/5 space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{label}</p>
        <span className="text-[9px] font-black text-green-500 bg-white/5 px-2 py-1 rounded-lg">{trend}</span>
      </div>
      <p className="text-3xl font-black italic tracking-tighter uppercase">{value}</p>
    </div>
  );
}
