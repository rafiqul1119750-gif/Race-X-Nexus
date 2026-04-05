import React, { useState, useEffect } from "react";
import { 
  Lock, Shield, Gem, Plus, LayoutGrid, Zap, Music, ShoppingBag, Sparkles, 
  Settings, User, LogOut, ArrowLeft, Mic, Image as ImageIcon, Video, 
  Trash2, Download, CreditCard, Heart, MessageCircle, Share2, Trophy, Crown, 
  Bell, Globe, Tv, ChevronRight, Search, Activity
} from "lucide-react";

/* ---------------- 1. MASTER DATA CONFIG (USER DATA) ---------------- */
// Ye data poore app mein automatically supply hoga
const INITIAL_USER_DATA = {
  id: "RX-9901",
  name: "PRISHA_ADMIN",
  gems: 85400,
  followers: "125K",
  following: "450",
  rank: "OMNIVERSE GOD",
  lang: "en",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(INITIAL_USER_DATA);
  const [currentPage, setCurrentPage] = useState("hub");
  const [history, setHistory] = useState<string[]>(["hub"]);

  // Navigation Logic
  const navigateTo = (page: string) => {
    setHistory([...history, page]);
    setCurrentPage(page);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
    }
  };

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-500/30">
      
      {/* --- DYNAMIC HEADER --- */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-black/60 backdrop-blur-3xl border-b border-white/5 z-[100] flex items-center px-6">
        <div className="w-1/4">
          {currentPage !== "hub" && (
            <button onClick={goBack} className="p-3 bg-white/5 rounded-2xl border border-white/10 active:scale-90 transition-all text-blue-500">
              <ArrowLeft size={20}/>
            </button>
          )}
        </div>
        <div className="w-2/4 text-center">
           <h1 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">Race-X Nexus</h1>
        </div>
        <div className="w-1/4 flex justify-end gap-3">
           <button onClick={() => navigateTo('notifications')} className="relative text-zinc-500">
             <Bell size={20}/>
             <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping" />
           </button>
           <button onClick={() => navigateTo('profile')} className="w-9 h-9 rounded-full border-2 border-blue-600/30 overflow-hidden shadow-lg shadow-blue-600/20">
             <img src={user.avatar} alt="admin" />
           </button>
        </div>
      </header>

      {/* --- PAGE ROUTING ENGINE (AUTO DATA PASSING) --- */}
      <main className="pt-24 pb-32 max-w-[600px] mx-auto px-5">
        {currentPage === "hub" && <HubView navigate={navigateTo} user={user} />}
        {currentPage === "social" && <SocialPage user={user} />}
        {currentPage === "studio" && <StudioPage navigate={navigateTo} />}
        {currentPage === "vault" && <VaultPage user={user} />}
        {currentPage === "shop" && <ShopPage user={user} />}
        {currentPage === "chat" && <ChatPage user={user} />}
        {currentPage === "music" && <MusicPage />}
        {currentPage === "profile" && <ProfilePage user={user} />}
        {currentPage === "settings" && <SettingsPage user={user} navigate={navigateTo} />}
        {currentPage === "god-mode" && <GodModePage user={user} />}
        {currentPage === "voice-lab" && <VoiceLabPage user={user} />}
        {currentPage === "ai-art" && <ArtGenPage user={user} />}
        {currentPage === "notifications" && <NotificationPage />}
      </main>

      {/* --- NAVIGATION BAR --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-black/80 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around z-50">
        <NavIcon icon={<LayoutGrid/>} active={currentPage === 'hub'} onClick={() => navigateTo('hub')} />
        <NavIcon icon={<Zap/>} active={currentPage === 'studio' || currentPage.includes('lab')} onClick={() => navigateTo('studio')} />
        <div onClick={() => navigateTo('social')} className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center -mt-10 shadow-2xl active:scale-90 transition-all border-4 border-black">
          <Plus size={28} className="text-white" />
        </div>
        <NavIcon icon={<Trophy/>} active={currentPage === 'vault'} onClick={() => navigateTo('vault')} />
        <NavIcon icon={<Settings/>} active={currentPage === 'settings' || currentPage === 'god-mode'} onClick={() => navigateTo('settings')} />
      </nav>
    </div>
  );
}

/* ---------------- 2. REAL PAGES WITH AUTO DATA ---------------- */

// HUB
function HubView({ navigate, user }: any) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-10">
      <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between mb-8">
         <div>
           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Node</p>
           <h2 className="text-xl font-black italic uppercase">{user.name}</h2>
         </div>
         <div className="text-right">
           <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Status</p>
           <h2 className="text-sm font-black text-white">{user.rank}</h2>
         </div>
      </div>
      <GlassCard title="RX SOCIAL" sub="Human Feed" icon={<LayoutGrid size={32}/>} color="from-blue-600/40" onClick={() => navigate('social')} />
      <GlassCard title="RX STUDIO" sub="AI Engine" icon={<Zap size={32}/>} color="from-cyan-600/40" onClick={() => navigate('studio')} />
      <GlassCard title="MAGIC CHAT" sub="Gemini Intel" icon={<Sparkles size={32}/>} color="from-indigo-600/40" onClick={() => navigate('chat')} />
      <GlassCard title="RX SHOP" sub="Marketplace" icon={<ShoppingBag size={32}/>} color="from-orange-600/40" onClick={() => navigate('shop')} />
    </div>
  );
}

// STUDIO (WITH SUB-BUTTONS TO SUB-PAGES)
function StudioPage({ navigate }: any) {
  return (
    <div className="space-y-6 animate-in fade-in">
       <h3 className="text-2xl font-black italic uppercase">AI Studio</h3>
       <div className="grid grid-cols-2 gap-4">
          <button onClick={() => navigate('voice-lab')} className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center gap-3">
             <Mic className="text-blue-500" size={32}/>
             <span className="text-[10px] font-black uppercase">Voice Lab</span>
          </button>
          <button onClick={() => navigate('ai-art')} className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center gap-3">
             <ImageIcon className="text-cyan-500" size={32}/>
             <span className="text-[10px] font-black uppercase">Art Gen</span>
          </button>
       </div>
    </div>
  );
}

// PROFILE (AUTO-LOADS USER DATA)
function ProfilePage({ user }: any) {
  return (
    <div className="text-center space-y-8 animate-in zoom-in-95">
       <div className="relative inline-block">
          <img src={user.avatar} className="w-32 h-32 rounded-full border-4 border-blue-600 p-1 bg-zinc-900" alt="profile"/>
          <div className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-4 border-black shadow-lg"><Crown size={16}/></div>
       </div>
       <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">@{user.name}</h2>
          <p className="text-[10px] font-bold text-zinc-500 uppercase mt-1 tracking-[0.3em]">Nexus ID: {user.id}</p>
       </div>
       <div className="flex justify-around bg-zinc-900/50 p-6 rounded-[2.5rem] border border-white/5">
          <div className="text-center">
             <p className="text-xl font-black">{user.followers}</p>
             <p className="text-[8px] font-black text-zinc-600 uppercase">Followers</p>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="text-center">
             <p className="text-xl font-black">{user.gems.toLocaleString()}</p>
             <p className="text-[8px] font-black text-zinc-600 uppercase">Diamonds</p>
          </div>
       </div>
    </div>
  );
}

// GOD MODE (MASTER SETTINGS)
function GodModePage({ user }: any) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-10">
       <div className="bg-red-600/10 border border-red-500/20 p-8 rounded-[3rem] text-center">
          <Lock className="text-red-500 mx-auto mb-3" size={40}/>
          <h3 className="text-2xl font-black italic uppercase text-red-500 tracking-tighter">Master Terminal</h3>
          <p className="text-[9px] font-black text-zinc-500 uppercase mt-2 italic">Controlling {user.id} Node</p>
       </div>
       <div className="grid grid-cols-1 gap-3">
          <GodTile icon={<User/>} label="Users Database" sub="5,240 Total Nodes" />
          <GodTile icon={<Gem/>} label="Diamond Minting" sub="Current: 10M in Supply" />
          <GodTile icon={<Zap/>} label="API Rotator" sub="Groq, 11-Labs, Flux" />
          <GodTile icon={<Activity/>} label="Server Pulse" sub="Render.com: 99% Uptime" />
       </div>
    </div>
  );
}

// VOICE LAB (SUB-PAGE)
function VoiceLabPage({ user }: any) {
  return (
    <div className="space-y-8 animate-in fade-in">
       <div className="p-8 bg-blue-600/10 rounded-[3rem] border border-blue-500/20 text-center">
          <Mic className="text-blue-500 mx-auto mb-4" size={48}/>
          <h3 className="text-xl font-black italic uppercase">AI Voice Lab</h3>
          <p className="text-[10px] font-bold text-zinc-500 mt-2">Node Admin: {user.name}</p>
       </div>
       <div className="bg-zinc-900 border border-white/5 p-6 rounded-3xl space-y-4">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Tap to Clone Awaaz</p>
          <button className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-widest active:scale-95 shadow-xl transition-all">Start Recording</button>
       </div>
    </div>
  );
}

/* ---------------- 3. SMALL COMPONENTS ---------------- */

function Splash({ onDone }: any) {
  useEffect(() => { setTimeout(onDone, 2500); }, []);
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] text-white">
      <h1 className="text-6xl font-black italic tracking-tighter animate-pulse">RACE-X</h1>
      <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mt-4">Connecting All Nodes</p>
    </div>
  );
}

function GlassCard({ title, sub, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className="relative group cursor-pointer overflow-hidden rounded-[2.8rem] border border-white/10 bg-zinc-900/30 p-10 transition-all hover:translate-y-[-5px] active:scale-95 shadow-2xl">
      <div className={`absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br ${color} to-transparent blur-[80px] opacity-20`} />
      <div className="flex items-center gap-8 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white">{icon}</div>
        <div>
          <h3 className="text-2xl font-black italic uppercase text-white tracking-tight">{title}</h3>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-1">{sub}</p>
        </div>
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

function GodTile({ icon, label, sub }: any) {
  return (
    <div className="bg-zinc-950 p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-5 hover:bg-red-500/5 transition cursor-pointer">
       <div className="text-red-500">{icon}</div>
       <div>
         <p className="text-xs font-black uppercase tracking-tight">{label}</p>
         <p className="text-[8px] font-bold text-zinc-700 uppercase mt-1">{sub}</p>
       </div>
    </div>
  );
}

// Baki pages (Shop, Settings, Notifications) ke liye bhi isi tarah functions add kar diye hain.
function SocialPage({user}:any){ return <div className="text-center pt-20"><Trophy size={40} className="mx-auto text-zinc-800 mb-4"/><h3 className="text-xl font-black uppercase">Coming Soon</h3><p className="text-[10px] font-black text-zinc-600 uppercase mt-2 tracking-widest italic">{user.name}'s Social Sector</p></div> }
function SettingsPage({user, navigate}:any){ return <div className="space-y-4"><h3 className="text-xl font-black uppercase mb-6 italic">Configuration</h3><div className="bg-zinc-900 p-6 rounded-3xl flex items-center gap-4"><img src={user.avatar} className="w-12 h-12 rounded-full"/><div className="text-xs font-black">{user.name}</div></div><button onClick={() => navigate('god-mode')} className="w-full bg-red-600/10 border border-red-500/20 p-5 rounded-2xl flex items-center justify-between text-red-500"><span className="text-[10px] font-black uppercase">Omniverse God Mode</span><Lock size={16}/></button></div> }
function VaultPage({user}:any){ return <div className="text-center p-12 bg-zinc-900 rounded-[4rem] border border-white/5"><Gem size={60} className="text-blue-500 mx-auto mb-6"/><h2 className="text-5xl font-black italic mb-2">{user.gems.toLocaleString()}</h2><p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Diamonds Secured</p></div> }
function ChatPage({user}:any){ return <div className="p-8 bg-indigo-600/10 rounded-[3rem] text-center border border-indigo-500/20"><Sparkles className="text-indigo-400 mx-auto mb-4" size={48}/><h3 className="text-xl font-black italic">Magic Chat</h3><p className="text-[10px] font-bold text-zinc-500 mt-2 uppercase">Ready for {user.name}...</p></div> }
function NotificationPage(){ return <div className="space-y-4"><h3 className="text-xl font-black italic uppercase mb-6">Alerts</h3>{[1,2,3].map(i => <div key={i} className="bg-zinc-900 p-5 rounded-2xl border border-white/5 flex items-center gap-4"><Bell size={16} className="text-blue-500"/><p className="text-[10px] font-bold text-zinc-400">Node Update #{i}: System core stabilized.</p></div>)}</div> }
function MusicPage(){ return <div className="text-center pt-20"><Music size={60} className="mx-auto text-green-500 mb-6 animate-bounce"/><h3 className="text-3xl font-black italic uppercase">Radio RX</h3><p className="text-[10px] font-black text-zinc-600 uppercase mt-4 tracking-widest">Atmospheric Beats Loading...</p></div> }
function ShopPage({user}:any){ return <div className="space-y-6"><div className="bg-orange-500/10 border border-orange-500/20 p-8 rounded-[3rem] text-center"><ShoppingBag className="text-orange-500 mx-auto mb-4" size={48}/><h3 className="text-xl font-black italic">Nexus Market</h3><p className="text-[10px] font-bold text-zinc-500 mt-2">Balance: {user.gems} Gems</p></div><div className="grid grid-cols-1 gap-4"><div className="bg-zinc-900 p-5 rounded-2xl border border-white/5 flex justify-between items-center"><span className="text-[10px] font-black uppercase">Premium Skin Pack</span><button className="bg-white text-black px-4 py-2 rounded-xl text-[9px] font-black uppercase">5K Gems</button></div></div></div> }
function ArtGenPage({user}:any){ return <div className="p-8 bg-cyan-600/10 rounded-[3rem] border border-cyan-500/20 text-center"><ImageIcon className="text-cyan-400 mx-auto mb-4" size={48}/><h3 className="text-xl font-black italic uppercase tracking-tighter">AI Art Engine</h3><p className="text-[10px] font-bold text-zinc-500 mt-2">Visualizing for {user.name}</p></div> }
