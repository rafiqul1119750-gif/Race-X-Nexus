import { useState, useEffect } from "react";
import { SplashScreen } from "./SplashScreen";
import { LayoutDashboard, Sparkles, Wallet, Settings, Menu, Bell } from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      {/* 1. Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950/80 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 md:relative ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 h-full flex flex-col">
          {/* Logo Area */}
          <div className="flex items-center gap-3 mb-10">
            <img src="/images/rx-logo.png" alt="RX" className="w-10 h-10 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
            <h1 className="text-xl font-black italic tracking-tighter uppercase">RACE-<span className="text-blue-400">X</span></h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em] mb-4 px-2">Main Menu</p>
            <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active />
            <NavItem icon={<Sparkles size={18}/>} label="AI Studio" />
            <NavItem icon={<Wallet size={18}/>} label="Nexus Wallet" />
            <NavItem icon={<Settings size={18}/>} label="Settings" />
          </nav>

          {/* User Profile Mini */}
          <div className="mt-auto p-4 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[1.5px]">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="rounded-full bg-black" alt="avatar" />
             </div>
             <div>
                <p className="text-xs font-bold uppercase italic">Admin Nexus</p>
                <p className="text-[9px] text-zinc-500 uppercase tracking-tighter">Pro Creator</p>
             </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 hover:bg-white/5 rounded-xl transition-all">
            <Menu size={20} />
          </button>

          <div className="flex-1 md:px-6">
             <div className="max-w-md bg-white/5 border border-white/10 px-4 py-2 rounded-full hidden md:flex items-center gap-3 text-zinc-500 text-sm">
                <span>Search assets, models, prompts...</span>
             </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
               <span className="text-xs font-black italic">1,250</span>
               <span className="text-blue-400 text-[10px]">💎</span>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-full relative">
               <Bell size={20} className="text-zinc-400" />
               <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></div>
            </button>
          </div>
        </header>

        {/* Content Section */}
        <main className="p-6 md:p-10 flex-1 overflow-y-auto">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}>
      <span className={active ? 'text-white' : 'group-hover:text-blue-400'}>{icon}</span>
      <span className="text-sm font-bold uppercase italic tracking-tighter">{label}</span>
    </a>
  );
}
