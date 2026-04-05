import React, { useState, useEffect } from "react";
import { 
  Lock, Shield, Gem, Plus, LayoutGrid, Zap, Music, ShoppingBag, Sparkles, 
  Settings, User, LogOut, ArrowLeft, Mic, Image as ImageIcon, Video, 
  Heart, MessageCircle, Share2, Trophy, Crown, Bell, Globe, MoreHorizontal,
  ChevronRight, Activity, Smartphone, CheckCircle2
} from "lucide-react";

/* ---------------- 1. MASTER CONFIG & DATA ---------------- */
const INITIAL_USER = {
  name: "PRISHA_ADMIN",
  id: "RX-NODE-001",
  gems: 85400,
  rank: "OMNIVERSE GOD",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PrishaAdmin",
  followers: "1.2M",
  bio: "Race-X Founder | Mobile Developer",
  lang: "en"
};

export default function RaceXApp() {
  const [view, setView] = useState("splash");
  const [currentPage, setCurrentPage] = useState("hub");
  const [user, setUser] = useState(INITIAL_USER);

  // Splash Timer
  useEffect(() => {
    const timer = setTimeout(() => setView("app"), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (view === "splash") return <SplashScreen />;

  /* ---------------- 2. PAGE ROUTER (LOGIC) ---------------- */
  const renderContent = () => {
    switch (currentPage) {
      case "social": return <SocialSector user={user} />;
      case "studio": return <StudioSector onNav={setCurrentPage} />;
      case "vault": return <VaultSector user={user} onNav={setCurrentPage} />;
      case "shop": return <ShopSector user={user} />;
      case "chat": return <ChatSector user={user} />;
      case "music": return <MusicSector />;
      case "god-mode": return <GodModeTerminal user={user} />;
      case "profile": return <ProfileSector user={user} />;
      case "settings": return <SettingsSector onNav={setCurrentPage} />;
      case "rewards": return <DailyWeeklyRewards user={user} />;
      case "notifications": return <NotificationSector />;
      default: return <HubSector onNav={setCurrentPage} user={user} />;
    }
  };

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans overflow-x-hidden selection:bg-blue-600/30">
      
      {/* GLOBAL HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-2xl border-b border-white/5 z-[100] flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          {currentPage !== "hub" && (
            <button onClick={() => setCurrentPage("hub")} className="p-2 bg-white/5 rounded-xl border border-white/10 active:scale-90 text-blue-500">
              <ArrowLeft size={18}/>
            </button>
          )}
          <span className="text-xl font-black italic tracking-tighter text-blue-600">RACE-X</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-zinc-900/80 px-3 py-1.5 rounded-full border border-blue-500/20 flex items-center gap-2" onClick={() => setCurrentPage('vault')}>
            <Gem size={14} className="text-blue-400" />
            <span className="text-xs font-black tracking-tighter">{user.gems.toLocaleString()}</span>
          </div>
          <button onClick={() => setCurrentPage("profile")} className="w-10 h-10 rounded-full border-2 border-blue-600/30 p-0.5">
            <img src={user.avatar} className="rounded-full bg-zinc-800" alt="avatar" />
          </button>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="pt-24 pb-36 max-w-[500px] mx-auto px-5">
        {renderContent()}
      </main>

      {/* GLOBAL NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around z-50">
        <NavIcon icon={<LayoutGrid/>} active={currentPage === 'hub'} onClick={() => setCurrentPage('hub')} />
        <NavIcon icon={<Zap/>} active={currentPage === 'studio'} onClick={() => setCurrentPage('studio')} />
        <button onClick={() => setCurrentPage('social')} className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center -mt-12 shadow-[0_15px_40px_rgba(37,99,235,0.3)] active:scale-90 transition-all border-[6px] border-[#030303]">
          <Plus size={32} className="text-white" />
        </button>
        <NavIcon icon={<ShoppingBag/>} active={currentPage === 'shop'} onClick={() => setCurrentPage('shop')} />
        <NavIcon icon={<Settings/>} active={currentPage === 'settings' || currentPage === 'god-mode'} onClick={() => setCurrentPage('settings')} />
      </nav>
    </div>
  );
}

/* ---------------- 3. SUB-COMPONENTS (THE ENTIRE APP) ---------------- */

// 1. SPLASH SCREEN
function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
      <div className="relative">
        <h1 className="text-7xl font-black italic tracking-tighter text-white animate-pulse">RACE-X</h1>
        <div className="absolute -right-4 -top-4 w-8 h-8 bg-blue-600 rounded-lg blur-xl opacity-50 animate-bounce" />
      </div>
      <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em] mt-8">Connecting to Nexus Node...</p>
    </div>
  );
}

// 2. MAIN HUB
function HubSector({ onNav, user }: any) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-10">
      <div className="bg-gradient-to-br from-blue-600/10 to-transparent p-8 rounded-[3rem] border border-white/5 flex items-center justify-between">
         <div>
           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Status</p>
           <h2 className="text-2xl font-black italic uppercase text-white">{user.rank}</h2>
         </div>
         <Trophy size={40} className="text-blue-500/50" />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
         <BigLink title="RX SOCIAL" sub="The Human Network" icon={<LayoutGrid/>} color="blue" onClick={() => onNav('social')} />
         <BigLink title="DAILY REWARDS" sub="Claim Your Gems" icon={<Gem/>} color="orange" onClick={() => onNav('rewards')} />
         <BigLink title="AI STUDIO" sub="Neural Creation Lab" icon={<Zap/>} color="cyan" onClick={() => onNav('studio')} />
         <BigLink title="MAGIC CHAT" sub="Nexus Intel AI" icon={<Sparkles/>} color="indigo" onClick={() => onNav('chat')} />
      </div>
    </div>
  );
}

// 3. SOCIAL SECTOR
function SocialSector({ user }: any) {
  const feed = [
    { id: 1, user: "Cyber_X", body: "Race-X UI is literally from the future! 🚀", img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600", likes: "12K" },
    { id: 2, user: "Nexus_Admin", body: "Check out the new God Mode dashboard.", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600", likes: "85K" }
  ];
  return (
    <div className="space-y-6 animate-in fade-in">
       <div className="flex gap-4 p-5 bg-zinc-900/30 rounded-[2.5rem] border border-white/5 items-center">
          <img src={user.avatar} className="w-10 h-10 rounded-full" />
          <span className="text-zinc-500 text-xs font-bold uppercase">Update the Feed...</span>
          <Plus size={20} className="ml-auto text-blue-500" />
       </div>
       {feed.map(post => (
         <div key={post.id} className="bg-zinc-900/20 border border-white/5 rounded-[3rem] overflow-hidden">
            <div className="p-5 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black">{post.user[0]}</div>
                  <span className="text-[11px] font-black uppercase tracking-tight">{post.user}</span>
               </div>
               <MoreHorizontal size={20} className="text-zinc-700" />
            </div>
            <img src={post.img} className="w-full aspect-square object-cover" />
            <div className="p-6 flex justify-between">
               <div className="flex gap-8"><Heart size={24} className="text-zinc-500"/><MessageCircle size={24} className="text-zinc-500"/></div>
               <Share2 size={24} className="text-blue-500" />
            </div>
         </div>
       ))}
    </div>
  );
}

// 4. DAILY/WEEKLY REWARDS (THE NEW PART)
function DailyWeeklyRewards({ user }: any) {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-10">
       <div className="bg-blue-600/10 p-8 rounded-[3rem] border border-blue-500/20 text-center">
          <Trophy size={40} className="text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-black italic uppercase">Nexus Rewards</h3>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">Active Node: {user.name}</p>
       </div>
       
       <div className="grid grid-cols-4 gap-3 bg-zinc-900/40 p-6 rounded-[2.5rem] border border-white/5">
          {[1,2,3,4,5,6,7].map(d => (
            <div key={d} className={`aspect-square rounded-2xl flex flex-col items-center justify-center border ${d <= 3 ? 'bg-blue-600 border-blue-400' : 'bg-black border-white/10 opacity-40'}`}>
               <Gem size={12} />
               <span className="text-[9px] font-black mt-1">D{d}</span>
            </div>
          ))}
       </div>

       <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 px-2">Weekly Missions</h4>
          <div className="bg-zinc-900 border border-white/5 p-6 rounded-3xl flex justify-between items-center">
             <div>
                <p className="text-xs font-black uppercase">Social Star</p>
                <p className="text-[8px] font-bold text-zinc-500 uppercase mt-1">Get 50 likes on posts</p>
             </div>
             <div className="text-right text-[10px] font-black text-blue-500">12/50</div>
          </div>
       </div>
    </div>
  );
}

// 5. VAULT SECTOR
function VaultSector({ user, onNav }: any) {
  return (
    <div className="text-center space-y-8 animate-in zoom-in-95">
       <div className="bg-gradient-to-b from-zinc-900 to-black p-12 rounded-[4rem] border border-white/10">
          <Gem size={60} className="text-blue-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h2 className="text-6xl font-black italic tracking-tighter">{user.gems.toLocaleString()}</h2>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mt-4">Total Diamonds Secured</p>
       </div>
       <button onClick={() => onNav('rewards')} className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Claim Daily Bonus</button>
    </div>
  );
}

// 6. GOD MODE TERMINAL
function GodModeTerminal({ user }: any) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-10">
       <div className="bg-red-600/10 border border-red-500/20 p-8 rounded-[3rem] text-center">
          <Lock className="text-red-500 mx-auto mb-4" size={40}/>
          <h3 className="text-2xl font-black italic uppercase text-red-500">Omniverse God Mode</h3>
          <p className="text-[9px] font-bold text-zinc-500 mt-2 uppercase">Kernel: {user.id}</p>
       </div>
       <div className="grid gap-3">
          <GodTile icon={<User/>} title="User Node Manager" sub="5.2K Active Nodes" />
          <GodTile icon={<Gem/>} title="Mint Diamonds" sub="Global Supply Control" />
          <GodTile icon={<Activity/>} title="Server Health" sub="Render.com: 99.9% Uptime" />
          <GodTile icon={<Smartphone/>} title="Hardware List" sub="Redmi, Vivo, Samsung" />
       </div>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function BigLink({ title, sub, icon, color, onClick }: any) {
  const colors: any = {
    blue: "text-blue-500", orange: "text-orange-500", cyan: "text-cyan-500", indigo: "text-indigo-500"
  };
  return (
    <div onClick={onClick} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[3rem] flex items-center gap-6 active:scale-95 transition-all hover:bg-white/5 cursor-pointer">
       <div className={`p-4 bg-black rounded-2xl border border-white/5 ${colors[color]}`}>{icon}</div>
       <div>
          <h4 className="text-lg font-black italic uppercase tracking-tighter text-white">{title}</h4>
          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mt-1">{sub}</p>
       </div>
    </div>
  );
}

function NavIcon({ icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-4 transition-all ${active ? 'text-blue-500 scale-125' : 'text-zinc-600'}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </button>
  );
}

function GodTile({ icon, title, sub }: any) {
  return (
    <div className="bg-zinc-950 p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-5 hover:bg-red-500/5 transition cursor-pointer">
       <div className="text-red-500">{icon}</div>
       <div>
         <p className="text-xs font-black uppercase tracking-tight">{title}</p>
         <p className="text-[8px] font-bold text-zinc-700 uppercase mt-1">{sub}</p>
       </div>
       <ChevronRight size={16} className="ml-auto text-zinc-800" />
    </div>
  );
}

// Baki placeholder components (Settings, Studio etc.)
function StudioSector({onNav}:any){ return <div className="space-y-6"><h3 className="text-2xl font-black italic uppercase">AI Studio</h3><div className="grid grid-cols-2 gap-4"><div onClick={() => onNav('chat')} className="bg-zinc-900 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 border border-white/5 active:scale-95"><Mic className="text-blue-500" size={32}/><span className="text-[10px] font-black uppercase">Voice Clone</span></div><div onClick={() => onNav('chat')} className="bg-zinc-900 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 border border-white/5 active:scale-95"><Video className="text-cyan-500" size={32}/><span className="text-[10px] font-black uppercase">Video Gen</span></div></div></div> }
function ShopSector({user}:any){ return <div className="p-8 bg-orange-600/5 border border-orange-500/10 rounded-[3rem] text-center"><ShoppingBag size={48} className="text-orange-500 mx-auto mb-4"/><h3 className="text-xl font-black italic uppercase">Nexus Shop</h3><p className="text-[10px] font-black text-zinc-600 uppercase mt-2">Balance: {user.gems}</p></div> }
function SettingsSector({onNav}:any){ return <div className="space-y-4"><h3 className="text-xl font-black italic uppercase mb-6">Settings</h3><button onClick={() => onNav('god-mode')} className="w-full bg-red-600/5 border border-red-500/20 p-6 rounded-[2rem] flex justify-between items-center text-red-500"><span className="text-xs font-black uppercase tracking-widest">God Mode Access</span><Lock size={18}/></button></div> }
function ChatSector({user}:any){ return <div className="p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-[3rem] text-center"><Sparkles size={48} className="text-indigo-500 mx-auto mb-4"/><h3 className="text-xl font-black italic uppercase">Magic Chat</h3><p className="text-[10px] font-black text-zinc-600 uppercase mt-2">Connecting Node {user.id}...</p></div> }
function ProfileSector({user}:any){ return <div className="text-center pt-10 animate-in zoom-in-95"><img src={user.avatar} className="w-32 h-32 rounded-full mx-auto border-4 border-blue-600 mb-6"/><h2 className="text-3xl font-black italic uppercase tracking-tighter">{user.name}</h2><p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">{user.rank}</p></div> }
function MusicSector(){ return <div className="text-center pt-20"><Music size={64} className="text-green-500 mx-auto mb-6"/><h3 className="text-2xl font-black italic uppercase">Radio RX</h3></div> }
function NotificationSector(){ return <div className="space-y-4"><h3 className="text-xl font-black italic uppercase mb-6 text-zinc-600">Active Node Notifications</h3><div className="p-6 bg-zinc-900 rounded-3xl border border-white/5 flex items-center gap-4"><CheckCircle2 className="text-blue-500"/><p className="text-[10px] font-black text-zinc-500 uppercase">System Core Update v4.0 Successful</p></div></div> }
