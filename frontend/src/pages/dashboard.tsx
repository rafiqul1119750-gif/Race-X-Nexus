import { useState, useEffect } from "react";
import { 
  Users, ShieldAlert, BarChart3, Database, 
  Settings, Bell, Search, Lock, ShieldCheck, Activity,
  X, Zap, RefreshCw, Power, HardDrive, Globe, ChevronRight
} from "lucide-react";
import { account, databases } from "../lib/appwrite";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'moderation'>('stats');
  
  // Settings Menu State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        if (user.labels && user.labels.includes('admin')) {
          setIsAdmin(true);
        } else {
          window.location.href = "/hub";
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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <Zap className="text-cyan-400 animate-bounce mb-4" size={40} />
      <div className="text-cyan-400 font-black uppercase tracking-[0.5em] text-xs">Nexus Link Initializing...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
      
      {/* 1. SIDEBAR (Master Navigation) */}
      <aside className="w-72 border-r border-white/5 bg-black/50 backdrop-blur-3xl p-8 flex flex-col gap-10 z-20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-600 rounded-[20px] shadow-[0_0_30px_rgba(220,38,38,0.3)]">
            <ShieldCheck size={22} className="text-white" />
          </div>
          <div>
            <h2 className="font-black italic uppercase tracking-tighter text-xl leading-none">Nexus</h2>
            <span className="text-[8px] font-black text-red-500 uppercase tracking-[0.2em]">Master Admin</span>
          </div>
        </div>

        <nav className="space-y-2">
          <AdminTab active={activeTab === 'stats'} label="Platform Stats" icon={<BarChart3 size={18}/>} onClick={() => setActiveTab('stats')} />
          <AdminTab active={activeTab === 'users'} label="User Records" icon={<Users size={18}/>} onClick={() => setActiveTab('users')} />
          <AdminTab active={activeTab === 'moderation'} label="Safety Queue" icon={<ShieldAlert size={18}/>} onClick={() => setActiveTab('moderation')} />
        </nav>

        <div className="mt-auto">
          <button 
            onClick={() => setLocation("/admin/api")}
            className="w-full bg-zinc-900/50 border border-white/5 p-5 rounded-[30px] flex items-center gap-4 hover:bg-cyan-500 hover:text-black transition-all group"
          >
            <Database size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-widest">API Injector</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-12 relative">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Command Center</h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Appwrite Engine v4.2 Connected</p>
            </div>
          </div>
          
          <div className="flex gap-4">
             {/* SETTINGS TRIGGER */}
             <button 
               onClick={() => setIsSettingsOpen(true)}
               className="p-5 bg-zinc-900/80 rounded-[25px] border border-white/5 hover:border-cyan-500/50 active:scale-90 transition-all group"
             >
                <Settings size={22} className="group-hover:rotate-90 transition-transform duration-500" />
             </button>
             <button className="p-5 bg-zinc-900/80 rounded-[25px] border border-white/5 relative">
                <Bell size={22}/><span className="absolute top-5 right-5 w-2.5 h-2.5 bg-red-600 rounded-full ring-4 ring-black" />
             </button>
          </div>
        </header>

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom duration-700">
            <AdminStatBox label="Daily Active" value="24.8K" trend="+12%" color="blue" />
            <AdminStatBox label="Nexus Gems" value="1.2M" trend="+5%" color="cyan" />
            <AdminStatBox label="API Health" value="99.9%" trend="Optimal" color="green" />
            <AdminStatBox label="Reports" value="14" trend="-2%" color="red" />
          </div>
        )}
      </main>

      {/* 3. SETTINGS OVERLAY MENU (THE LIST) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div onClick={() => setIsSettingsOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" />
          
          {/* Drawer Content */}
          <div className="relative w-96 bg-[#0A0A0A] border-l border-white/10 h-full p-10 shadow-2xl animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-xl font-black italic uppercase tracking-widest text-cyan-400">Master Config</h3>
              <button onClick={() => setIsSettingsOpen(false)} className="p-3 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-8">
              <section>
                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-6">Core Operations</p>
                <div className="space-y-4">
                  <SettingItem icon={<RefreshCw size={16}/>} label="Full System Sync" desc="Re-index all Appwrite docs" />
                  <SettingItem icon={<HardDrive size={16}/>} label="Storage Flush" desc="Clear temp CDN cache" />
                  <SettingItem icon={<Globe size={16}/>} label="Public Mode" desc="Toggle app visibility" toggle />
                </div>
              </section>

              <section>
                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-6">Security Engine</p>
                <div className="space-y-4">
                  <SettingItem icon={<Lock size={16}/>} label="Auth Lockdown" desc="Disable new signups" toggle />
                  <SettingItem icon={<ShieldCheck size={16}/>} label="Admin Audit" desc="View access logs" />
                </div>
              </section>

              <div className="pt-10 mt-10 border-t border-white/5">
                <button className="w-full p-6 bg-red-600/10 border border-red-600/20 rounded-[30px] flex items-center justify-between group hover:bg-red-600 transition-all">
                  <div className="flex items-center gap-4 text-red-500 group-hover:text-white">
                    <Power size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Maintenance Mode</span>
                  </div>
                  <ChevronRight size={16} className="text-red-500 group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---
function SettingItem({ icon, label, desc, toggle }: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer p-2">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-zinc-900 rounded-2xl group-hover:bg-cyan-500 group-hover:text-black transition-all">{icon}</div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest">{label}</p>
          <p className="text-[8px] font-bold text-zinc-600 uppercase">{desc}</p>
        </div>
      </div>
      {toggle ? (
        <div className="w-10 h-5 bg-zinc-800 rounded-full relative border border-white/5">
          <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-500 rounded-full" />
        </div>
      ) : (
        <ChevronRight size={14} className="text-zinc-800" />
      )}
    </div>
  );
}

function AdminTab({ active, label, icon, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-5 rounded-[25px] transition-all duration-300 ${active ? 'bg-white text-black shadow-2xl' : 'text-zinc-600 hover:text-white hover:bg-zinc-900/50'}`}>
      {icon}<span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
    </button>
  );
}

function AdminStatBox({ label, value, trend, color }: any) {
  return (
    <div className="bg-zinc-900/20 p-8 rounded-[45px] border border-white/5 hover:border-white/10 transition-all">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">{label}</p>
        <span className="text-[8px] font-black text-green-500 bg-green-500/5 px-3 py-1 rounded-full">{trend}</span>
      </div>
      <p className="text-4xl font-black italic tracking-tighter uppercase leading-none">{value}</p>
    </div>
  );
}
