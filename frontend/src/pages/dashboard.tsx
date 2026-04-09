import { useState, useEffect } from "react";
import { 
  Users, ShieldAlert, BarChart3, Database, 
  Trash2, CheckCircle, Ban, DollarSign, 
  Settings, Bell, Search, Lock
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'moderation'>('stats');

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      
      {/* --- SIDEBAR NAV --- */}
      <aside className="w-64 border-r border-white/5 bg-black p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-red-500 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.4)]">
            <Lock size={18} className="text-black" />
          </div>
          <h2 className="font-black italic uppercase tracking-tighter text-xl">Nexus Admin</h2>
        </div>

        <nav className="space-y-2">
          <AdminTab active={activeTab === 'stats'} label="Overview" icon={<BarChart3 size={18}/>} onClick={() => setActiveTab('stats')} />
          <AdminTab active={activeTab === 'users'} label="User Management" icon={<Users size={18}/>} onClick={() => setActiveTab('users')} />
          <AdminTab active={activeTab === 'moderation'} label="Content Safety" icon={<ShieldAlert size={18}/>} onClick={() => setActiveTab('moderation')} />
        </nav>

        <div className="mt-auto p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-green-500">All Engines Live</span>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto p-10">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Command Center</h1>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mt-1">Real-time Platform Control</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-zinc-900 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
                <Search size={16} className="text-zinc-500" />
                <input placeholder="Search UID..." className="bg-transparent text-xs font-bold outline-none w-40" />
             </div>
             <button className="p-3 bg-zinc-900 rounded-xl relative"><Bell size={18} /><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-black"/></button>
          </div>
        </header>

        {activeTab === 'stats' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
              <StatBox label="Total Users" value="12,842" change="+14%" icon={<Users className="text-blue-400"/>}/>
              <StatBox label="Gems Distributed" value="450K" change="+8%" icon={<DollarSign className="text-green-400"/>}/>
              <StatBox label="AI Creations" value="89K" change="+22%" icon={<Database className="text-purple-400"/>}/>
              <StatBox label="Safety Reports" value="3" change="-80%" icon={<ShieldAlert className="text-red-400"/>}/>
            </div>

            {/* Growth Chart Placeholder */}
            <div className="h-80 bg-zinc-900/30 rounded-[40px] border border-white/5 p-8 flex flex-col justify-between">
               <h3 className="text-xs font-black uppercase text-zinc-500 tracking-widest">Platform Traffic (24h)</h3>
               <div className="flex items-end gap-2 h-40">
                 {[40, 70, 45, 90, 65, 80, 50, 95, 60].map((h, i) => (
                   <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg opacity-80" />
                 ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'moderation' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <h3 className="text-xs font-black uppercase text-red-500 tracking-widest">Pending Moderation Queue</h3>
            <div className="bg-zinc-900/50 rounded-[35px] border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <tr>
                    <th className="p-5">Content Type</th>
                    <th className="p-5">Creator</th>
                    <th className="p-5">Reason</th>
                    <th className="p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-bold">
                  <ModRow type="AI Image" creator="User_882" reason="Policy Violation" />
                  <ModRow type="Video Feed" creator="Dev_Nexus" reason="Copyright Alert" />
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// --- COMPONENTS ---

function AdminTab({ active, label, icon, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${active ? 'bg-white text-black font-black' : 'text-zinc-500 hover:bg-white/5'}`}
    >
      {icon}
      <span className="text-[10px] uppercase tracking-widest">{label}</span>
    </button>
  );
}

function StatBox({ label, value, change, icon }: any) {
  return (
    <div className="bg-zinc-900/40 p-6 rounded-[35px] border border-white/5 space-y-3">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-black rounded-2xl border border-white/5">{icon}</div>
        <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">{change}</span>
      </div>
      <div>
        <p className="text-2xl font-black italic tracking-tighter">{value}</p>
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}

function ModRow({ type, creator, reason }: any) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      <td className="p-5 uppercase tracking-tighter font-black">{type}</td>
      <td className="p-5 text-zinc-400">{creator}</td>
      <td className="p-5"><span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[9px] uppercase font-black">{reason}</span></td>
      <td className="p-5 text-right space-x-2">
        <button className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500 hover:text-black transition-all"><CheckCircle size={14}/></button>
        <button className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-black transition-all"><Ban size={14}/></button>
        <button className="p-2 bg-zinc-800 text-zinc-500 rounded-lg hover:bg-white hover:text-black transition-all"><Trash2 size={14}/></button>
      </td>
    </tr>
  );
}
