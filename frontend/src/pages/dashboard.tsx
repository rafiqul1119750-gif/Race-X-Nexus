import { useState, useEffect } from "react";
import { 
  Users, ShieldAlert, BarChart3, Database, 
  Trash2, CheckCircle, Ban, DollarSign, 
  Settings, Bell, Search, Lock, ShieldCheck, Activity
} from "lucide-react";
// Import from your backend config
import { account, databases, ID, Query } from "../../lib/appwrite";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'moderation'>('stats');

  // --- SECURITY CHECK: ONLY ADMINS ALLOWED ---
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        // Appwrite Console mein user ko 'admin' label dena hoga
        if (user.labels && user.labels.includes('admin')) {
          setIsAdmin(true);
        } else {
          window.location.href = "/"; // Unauthorized users ko bahar pheko
        }
      } catch (err) {
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 font-black animate-pulse uppercase tracking-[0.5em]">Nexus Authenticating...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
      
      {/* --- SIDEBAR: COMMAND CONTROLS --- */}
      <aside className="w-72 border-r border-white/5 bg-black/50 backdrop-blur-3xl p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-600 rounded-2xl shadow-[0_0_25px_rgba(220,38,38,0.5)]">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-black italic uppercase tracking-tighter text-xl">Nexus Admin</h2>
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
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Project ID</p>
            <p className="text-[10px] font-mono text-cyan-500 truncate">69b9929d0...1bc2</p>
          </div>
          <div className="flex items-center gap-2 py-2 border-t border-white/5">
            <Activity size={12} className="text-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-green-500 uppercase">Cloud Sync: Active</span>
          </div>
        </div>
      </aside>

      {/* --- MAIN DASHBOARD --- */}
      <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Command Center</h1>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-2 flex items-center gap-2">
              <Database size={12}/> Connected to Appwrite Cloud Engine
            </p>
          </div>
          <div className="flex gap-4">
             <button className="p-4 bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition-all border border-white/5"><Settings size={20}/></button>
             <button className="p-4 bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition-all border border-white/5 relative">
                <Bell size={20}/>
                <span className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full ring-4 ring-black" />
             </button>
          </div>
        </header>

        {activeTab === 'stats' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-700">
            {/* Real Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
              <AdminStatBox label="Active Users" value="24.8K" trend="+12%" color="blue" />
              <AdminStatBox label="Nexus Gems" value="1.2M" trend="+5%" color="cyan" />
              <AdminStatBox label="Storage Used" value="850GB" trend="+18%" color="purple" />
              <AdminStatBox label="API Latency" value="42ms" trend="Optimal" color="green" />
            </div>

            {/* Platform Analytics Chart Placeholder */}
            <div className="bg-zinc-900/20 rounded-[45px] border border-white/5 p-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BarChart3 size={200} />
               </div>
               <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em] mb-10">Live Engagement (24h)</h3>
               <div className="flex items-end gap-3 h-48">
                 {[30, 60, 40, 80, 50, 100, 70, 90, 60, 85, 45, 75].map((h, i) => (
                   <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-cyan-900 to-cyan-400 rounded-t-xl opacity-60 hover:opacity-100 transition-all cursor-pointer" />
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* Content Moderation (Safety First) */}
        {activeTab === 'moderation' && (
          <div className="animate-in slide-in-from-right duration-500 space-y-6">
            <div className="flex items-center justify-between bg-red-500/5 p-6 rounded-3xl border border-red-500/20">
              <div>
                <h3 className="font-black italic uppercase text-red-500 tracking-tighter">Safety Enforcement</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Flagged content requires immediate review</p>
              </div>
              <ShieldAlert className="text-red-500" size={32} />
            </div>

            <div className="bg-zinc-900/30 rounded-[40px] border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                  <tr>
                    <th className="p-6">Entity</th>
                    <th className="p-6">Uploader</th>
                    <th className="p-6">Risk Level</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-bold text-zinc-300">
                  <ModerationRow name="Futuristic_City_Gen.png" user="User_992" risk="Medium" />
                  <ModerationRow name="Nexus_Music_Bootleg" user="Creator_X" risk="High" />
                </tbody>
              </table>
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
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-[22px] transition-all duration-300 ${active ? 'bg-white text-black shadow-[0_15px_30px_rgba(255,255,255,0.2)]' : 'text-zinc-600 hover:bg-white/5 hover:text-white'}`}
    >
      {icon}
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
    </button>
  );
}

function AdminStatBox({ label, value, trend, color }: any) {
  const textColor = color === 'blue' ? 'text-blue-400' : color === 'cyan' ? 'text-cyan-400' : color === 'purple' ? 'text-purple-400' : 'text-green-400';
  return (
    <div className="bg-zinc-900/40 p-8 rounded-[40px] border border-white/5 space-y-4 hover:border-white/10 transition-all">
      <div className="flex justify-between items-center">
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{label}</p>
        <span className={`text-[9px] font-black ${textColor} bg-white/5 px-2 py-1 rounded-lg`}>{trend}</span>
      </div>
      <p className="text-3xl font-black italic tracking-tighter uppercase">{value}</p>
    </div>
  );
}

function ModerationRow({ name, user, risk }: any) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
      <td className="p-6 uppercase tracking-tighter">{name}</td>
      <td className="p-6 text-zinc-500">UID: {user}</td>
      <td className="p-6">
        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${risk === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-500'}`}>
          {risk}
        </span>
      </td>
      <td className="p-6 text-right space-x-2">
        <button className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-black transition-all"><CheckCircle size={16}/></button>
        <button className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-black transition-all"><Ban size={16}/></button>
        <button className="p-3 bg-zinc-800 text-zinc-500 rounded-xl hover:bg-white hover:text-black transition-all"><Trash2 size={16}/></button>
      </td>
    </tr>
  );
}
