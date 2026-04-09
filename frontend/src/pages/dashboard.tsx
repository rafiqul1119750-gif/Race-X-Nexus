import { useState, useEffect } from "react";
import { 
  Users, ShieldAlert, BarChart3, Database, 
  Settings, Bell, Search, Lock, ShieldCheck, Activity,
  X, Zap, RefreshCw, Power, HardDrive, Globe, ChevronRight,
  UserPlus, ShieldX, Radio
} from "lucide-react";
import { account, databases } from "../lib/appwrite";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'moderation'>('stats');
  
  // Settings & System States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [systemStates, setSystemStates] = useState({
    publicMode: true,
    authLockdown: false,
    maintenance: false
  });

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

  const toggleSystem = (key: keyof typeof systemStates) => {
    setSystemStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 animate-pulse" />
        <Zap className="text-cyan-400 animate-bounce relative z-10" size={40} />
      </div>
      <div className="text-cyan-400 font-black uppercase tracking-[0.5em] text-[10px] mt-6">Decrypting Nexus Admin...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
      
      {/* 1. SIDEBAR */}
      <aside className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-3xl p-8 flex flex-col gap-10 z-20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-600 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            <ShieldCheck size={22} className="text-white" />
          </div>
          <div>
            <h2 className="font-black italic uppercase tracking-tighter text-xl">Nexus</h2>
            <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">Master Node</span>
          </div>
        </div>

        <nav className="space-y-2">
          <AdminTab active={activeTab === 'stats'} label="Analytics" icon={<BarChart3 size={18}/>} onClick={() => setActiveTab('stats')} />
          <AdminTab active={activeTab === 'users'} label="User Base" icon={<Users size={18}/>} onClick={() => setActiveTab('users')} />
          <AdminTab active={activeTab === 'moderation'} label="Safety" icon={<ShieldAlert size={18}/>} onClick={() => setActiveTab('moderation')} />
        </nav>

        <div className="mt-auto space-y-3">
          <button 
            onClick={() => setLocation("/admin/api")}
            className="w-full bg-zinc-900/50 border border-white/5 p-5 rounded-[28px] flex items-center gap-4 hover:bg-cyan-500 hover:text-black transition-all group"
          >
            <Database size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-widest text-left">API Injector</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN PANEL */}
      <main className="flex-1 overflow-y-auto p-12 relative">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter">Command Center</h1>
            <div className="flex items-center gap-4 mt-4">
              <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${systemStates.maintenance ? 'border-red-500/50 bg-red-500/10' : 'border-green-500/50 bg-green-500/10'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${systemStates.maintenance ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`} />
                <span className={`text-[8px] font-black uppercase ${systemStates.maintenance ? 'text-red-500' : 'text-green-500'}`}>
                  {systemStates.maintenance ? 'Maintenance Mode' : 'System Live'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
             <button onClick={() => setIsSettingsOpen(true)} className="p-5 bg-zinc-900/80 rounded-[28px] border border-white/5 hover:border-cyan-500/50 active:scale-90 transition-all">
                <Settings size={22} className="hover:rotate-90 transition-transform duration-500" />
             </button>
             <button className="p-5 bg-zinc-900/80 rounded-[28px] border border-white/5 relative group">
                <Bell size={22} />
                <span className="absolute top-5 right-5 w-2.5 h-2.5 bg-red-600 rounded-full ring-4 ring-black" />
             </button>
          </div>
        </header>

        {activeTab === 'stats' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatBox label="Active Users" value="24.8K" trend="+12%" color="blue" />
              <AdminStatBox label="Nexus Gems" value="1.2M" trend="+5%" color="cyan" />
              <AdminStatBox label="API Health" value="99.9%" trend="Optimal" color="green" />
              <AdminStatBox label="Uptime" value="156d" trend="Stable" color="purple" />
            </div>
            
            <div className="bg-zinc-900/10 rounded-[50px] border border-white/5 p-12 h-80 flex flex-col items-center justify-center text-center">
               <Radio size={40} className="text-zinc-800 mb-6" />
               <p className="text-zinc-600 font-black uppercase tracking-[0.5em] text-[10px]">Neural Analytics Stream Offline</p>
               <span className="text-[8px] font-bold text-zinc-700 uppercase mt-2 italic">Connect Appwrite Logs to Sync Real-time</span>
            </div>
          </div>
        )}
      </main>

      {/* 3. SETTINGS OVERLAY (THE MASTER LIST) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div onClick={() => setIsSettingsOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" />
          
          <div className="relative w-[400px] bg-[#0A0A0A] border-l border-white/10 h-full p-12 shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h3 className="text-2xl font-black italic uppercase tracking-widest text-cyan-400 leading-none">Settings</h3>
                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-2">Core Override Console</p>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="p-4 bg-zinc-900 rounded-2xl hover:bg-white hover:text-black transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-1 h-4 bg-cyan-500 rounded-full" />
                   <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em]">Operations</p>
                </div>
                <div className="space-y-2">
                  <SettingItem icon={<RefreshCw size={18}/>} label="Full System Sync" desc="Re-index all cloud nodes" />
                  <SettingItem icon={<HardDrive size={18}/>} label="CDN Flush" desc="Clear global image cache" />
                  <SettingItem 
                    icon={<Globe size={18}/>} 
                    label="Public Visibility" 
                    desc="App availability on web" 
                    active={systemStates.publicMode}
                    onClick={() => toggleSystem('publicMode')}
                    toggle 
                  />
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-1 h-4 bg-purple-500 rounded-full" />
                   <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em]">Security Engine</p>
                </div>
                <div className="space-y-2">
                  <SettingItem 
                    icon={<Lock size={18}/>} 
                    label="Auth Lockdown" 
                    desc="Stop new user registrations" 
                    active={systemStates.authLockdown}
                    onClick={() => toggleSystem('authLockdown')}
                    toggle 
                  />
                  <SettingItem icon={<UserPlus size={18}/>} label="Invite Only" desc="Require codes for signup" />
                  <SettingItem icon={<ShieldCheck size={18}/>} label="Admin Audit" desc="View 24h security logs" />
                </div>
              </section>

              <div className="pt-10 border-t border-white/5">
                <button 
                  onClick={() => toggleSystem('maintenance')}
                  className={`w-full p-7 rounded-[35px] flex items-center justify-between group transition-all border ${systemStates.maintenance ? 'bg-red-600 border-red-500 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)]' : 'bg-red-600/5 border-red-600/20 text-red-500 hover:bg-red-600 hover:text-white'}`}
                >
                  <div className="flex items-center gap-4">
                    <Power size={22} className={systemStates.maintenance ? 'animate-pulse' : ''} />
                    <div className="text-left">
                      <span className="text-[11px] font-black uppercase tracking-widest block">Maintenance Mode</span>
                      <p className={`text-[8px] font-bold uppercase mt-1 ${systemStates.maintenance ? 'text-white/70' : 'text-red-500/60'}`}>
                        {systemStates.maintenance ? 'System is OFFLINE' : 'System is ONLINE'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- UI COMPONENTS ---
function SettingItem({ icon, label, desc, toggle, active, onClick }: any) {
  return (
    <div onClick={toggle ? onClick : undefined} className="flex items-center justify-between group cursor-pointer p-4 hover:bg-white/[0.02] rounded-[24px] transition-all">
      <div className="flex items-center gap-5">
        <div className={`p-3.5 rounded-2xl transition-all ${active ? 'bg-cyan-500 text-black' : 'bg-zinc-900 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-white'}`}>
          {icon}
        </div>
        <div>
          <p className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-cyan-400' : 'text-zinc-200'}`}>{label}</p>
          <p className="text-[8px] font-bold text-zinc-600 uppercase mt-1">{desc}</p>
        </div>
      </div>
      {toggle && (
        <div className={`w-12 h-6 rounded-full relative transition-all duration-500 border ${active ? 'bg-cyan-500 border-cyan-400' : 'bg-zinc-900 border-white/5'}`}>
          <div className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all duration-500 ${active ? 'right-1 bg-black' : 'left-1 bg-zinc-700'}`} />
        </div>
      )}
    </div>
  );
}

function AdminTab({ active, label, icon, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-5 p-5 rounded-[28px] transition-all duration-300 ${active ? 'bg-white text-black shadow-2xl' : 'text-zinc-600 hover:text-white hover:bg-zinc-900/40'}`}>
      {icon}<span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
    </button>
  );
}

function AdminStatBox({ label, value, trend, color }: any) {
  return (
    <div className="bg-zinc-900/20 p-8 rounded-[45px] border border-white/5 hover:border-cyan-500/20 transition-all group overflow-hidden relative">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-all" />
      <div className="flex justify-between items-center mb-6 relative z-10">
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">{label}</p>
        <span className="text-[8px] font-black text-green-400 bg-green-400/5 px-3 py-1 rounded-full">{trend}</span>
      </div>
      <p className="text-4xl font-black italic tracking-tighter uppercase leading-none relative z-10">{value}</p>
    </div>
  );
}
