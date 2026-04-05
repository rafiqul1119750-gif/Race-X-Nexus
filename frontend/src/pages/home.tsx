import React, { useState, useEffect } from "react";
import { 
  Lock, Shield, Gem, Plus, LayoutGrid, Zap, Music, ShoppingBag, Sparkles, 
  Settings, User, LogOut, ArrowLeft, Mic, Image as ImageIcon, Video, 
  Trash2, Download, CreditCard, Heart, MessageCircle, Share2, Trophy, Crown, 
  Bell, Globe, Tv, MoreHorizontal, ChevronRight, Activity, Smartphone
} from "lucide-react";

/* ---------------- 1. UNIVERSAL DATA BRIDGE ---------------- */
const MASTER_USER = {
  name: "PRISHA_ADMIN",
  id: "RX-NODE-001",
  gems: 85400,
  rank: "OMNIVERSE GOD",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prisha",
  bio: "Building the future of AI Social from a Smartphone.",
  followers: "1.2M",
  following: "150"
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState("hub");
  const [user, setUser] = useState(MASTER_USER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <Splash />;

  /* --- NAVIGATION CONTROLLER --- */
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "social": return <SocialFeed user={user} />;
      case "studio": return <StudioHub navigate={setCurrentPage} />;
      case "vault": return <VaultDashboard user={user} />;
      case "shop": return <NexusShop user={user} />;
      case "chat": return <MagicChat user={user} />;
      case "music": return <MusicPlayer />;
      case "god-mode": return <GodModeTerminal user={user} />;
      case "profile": return <ProfileView user={user} />;
      case "settings": return <SettingsPanel user={user} navigate={setCurrentPage} />;
      case "voice-clone": return <FeaturePage title="Voice Cloning" icon={<Mic size={48}/>} user={user} />;
      case "ai-video": return <FeaturePage title="AI Video Gen" icon={<Video size={48}/>} user={user} />;
      case "notifications": return <NotificationCenter />;
      default: return <HubHome navigate={setCurrentPage} user={user} />;
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-blue-500">
      {/* GLOBAL HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-2xl border-b border-white/5 z-[100] flex items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          {currentPage !== "hub" && (
            <button onClick={() => setCurrentPage('hub')} className="p-2 bg-white/5 rounded-xl border border-white/10 active:scale-90 transition-all">
              <ArrowLeft size={20} className="text-blue-500"/>
            </button>
          )}
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic shadow-[0_0_20px_rgba(37,99,235,0.4)]">X</div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-zinc-900 border border-blue-500/20 px-3 py-1.5 rounded-full flex items-center gap-2">
            <Gem size={14} className="text-blue-400" />
            <span className="text-xs font-black tracking-tighter">{user.gems.toLocaleString()}</span>
          </div>
          <button onClick={() => setCurrentPage('profile')} className="w-10 h-10 rounded-full border-2 border-blue-600/30 p-0.5">
            <img src={user.avatar} className="rounded-full" alt="me" />
          </button>
        </div>
      </header>

      <main className="pt-24 pb-32 max-w-[600px] mx-auto px-5">
        {renderCurrentPage()}
      </main>

      {/* GLOBAL FOOTER NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around z-50">
        <NavBtn icon={<LayoutGrid/>} active={currentPage === 'hub'} onClick={() => setCurrentPage('hub')} />
        <NavBtn icon={<Zap/>} active={currentPage === 'studio'} onClick={() => setCurrentPage('studio')} />
        <button onClick={() => setCurrentPage('social')} className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center -mt-12 shadow-[0_15px_30px_rgba(37,99,235,0.4)] active:scale-90 transition-all border-[6px] border-[#050505]">
          <Plus size={32} />
        </button>
        <NavBtn icon={<ShoppingBag/>} active={currentPage === 'shop'} onClick={() => setCurrentPage('shop')} />
        <NavBtn icon={<Settings/>} active={currentPage === 'settings' || currentPage === 'god-mode'} onClick={() => setCurrentPage('settings')} />
      </nav>
    </div>
  );
}

/* ---------------- 2. COMPONENT SECTORS (FULL FUNCTIONAL) ---------------- */

// --- SOCIAL FEED ---
function SocialFeed({ user }: any) {
  const posts = [
    { id: 1, author: "Cyber_Nexus", content: "Evolution of Race-X is here. 🚀", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" },
    { id: 2, author: "Admin_Prime", content: "New AI Voice nodes deployed.", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800" }
  ];

  return (
    <div className="space-y-6">
       <div className="bg-zinc-900/40 p-4 rounded-3xl border border-white/5 flex gap-4">
          <img src={user.avatar} className="w-10 h-10 rounded-full" />
          <input className="bg-transparent flex-1 text-xs outline-none" placeholder="Draft your thought..." />
       </div>
       {posts.map(p => (
         <div key={p.id} className="bg-zinc-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="p-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black">{p.author[0]}</div>
              <span className="text-[11px] font-black uppercase tracking-tight">{p.author}</span>
            </div>
            <img src={p.img} className="w-full aspect-square object-cover border-y border-white/5" />
            <div className="p-6 flex justify-between">
              <div className="flex gap-6"><Heart size={22}/><MessageCircle size={22}/></div>
              <Share2 size={22} className="text-blue-500" />
            </div>
         </div>
       ))}
    </div>
  );
}

// --- STUDIO HUB ---
function StudioHub({ navigate }: any) {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-black italic uppercase">AI Studio</h2>
       <div className="grid grid-cols-2 gap-4">
          <ToolCard icon={<Mic/>} label="Voice Lab" sub="Clone Voice" onClick={() => navigate('voice-clone')} />
          <ToolCard icon={<Video/>} label="Video Gen" sub="Sora Node" onClick={() => navigate('ai-video')} />
          <ToolCard icon={<ImageIcon/>} label="Image Gen" sub="Flux Gen" onClick={() => navigate('chat')} />
          <ToolCard icon={<Sparkles/>} label="Magic Chat" sub="Gemini API" onClick={() => navigate('chat')} />
       </div>
    </div>
  );
}

// --- VAULT (DIAMOND CONTROL) ---
function VaultDashboard({ user }: any) {
  return (
    <div className="space-y-8 text-center animate-in zoom-in-95">
       <div className="bg-gradient-to-br from-blue-600/20 to-black p-12 rounded-[3.5rem] border border-blue-500/20">
          <Trophy size={50} className="text-blue-500 mx-auto mb-4" />
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Status: {user.rank}</p>
          <h2 className="text-6xl font-black italic my-4 tracking-tighter">{user.gems.toLocaleString()}</h2>
          <p className="text-[11px] font-black text-blue-400 uppercase">Diamonds Secured</p>
       </div>
       <button className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest">Withdraw History (No Cash)</button>
    </div>
  );
}

// --- GOD MODE (THE ULTIMATE CONTROL) ---
function GodModeTerminal({ user }: any) {
  return (
    <div className="space-y-6">
       <div className="bg-red-600/10 border border-red-500/20 p-8 rounded-[3rem] text-center">
          <Lock className="text-red-500 mx-auto mb-4" size={40}/>
          <h3 className="text-2xl font-black italic uppercase text-red-500">Omniverse God Mode</h3>
          <p className="text-[10px] font-bold text-zinc-500 mt-2">ADMIN_ACCESS: {user.id}</p>
       </div>
       <div className="grid gap-3">
          <GodLink icon={<User/>} title="User Node Manager" count="5.2K Active" />
          <GodLink icon={<Gem/>} title="Mint Diamonds" count="UNLIMITED" />
          <GodLink icon={<Zap/>} title="API Keys" count="Groq / OpenRouter" />
          <GodLink icon={<Activity/>} title="Server Health" count="99.9% Uptime" />
       </div>
    </div>
  );
}

/* --- UI HELPERS --- */
function ToolCard({ icon, label, sub, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 active:scale-95 transition-all">
       <div className="text-blue-500">{icon}</div>
       <span className="text-[10px] font-black uppercase">{label}</span>
       <span className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest">{sub}</span>
    </div>
  );
}

function GodLink({ icon, title, count }: any) {
  return (
    <div className="bg-zinc-950 p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between">
       <div className="flex items-center gap-4"><div className="text-red-500">{icon}</div><span className="text-[10px] font-black uppercase">{title}</span></div>
       <span className="text-[8px] font-black text-zinc-600">{count}</span>
    </div>
  );
}

function NavBtn({ icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-4 transition-all ${active ? 'text-blue-500 scale-125' : 'text-zinc-500'}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </button>
  );
}

function Splash() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] text-white">
      <h1 className="text-6xl font-black italic animate-pulse">RACE-X</h1>
      <p className="text-[10px] font-black text-blue-500 tracking-[0.5em] mt-4 uppercase">Initializing Nexus...</p>
    </div>
  );
}

// Baki Sub-Pages placeholder logic
function FeaturePage({title, icon, user}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
       <div className="p-10 bg-white/5 rounded-[3rem] text-blue-500 border border-white/5">{icon}</div>
       <h2 className="text-2xl font-black italic uppercase tracking-tighter">{title}</h2>
       <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Authorized for {user.name}</p>
       <button className="bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase mt-10">Start Creation</button>
    </div>
  );
}

function ProfileView({user}:any){ return <div className="text-center space-y-6"><img src={user.avatar} className="w-32 h-32 rounded-full mx-auto border-4 border-blue-600"/><h2 className="text-2xl font-black italic uppercase">@{user.name}</h2><p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{user.bio}</p></div> }
function NexusShop({user}:any){ return <div className="space-y-6"><div className="bg-orange-500/10 border border-orange-500/20 p-8 rounded-[3rem] text-center"><ShoppingBag className="text-orange-500 mx-auto mb-4" size={48}/><h3 className="text-xl font-black italic">Nexus Market</h3><p className="text-[10px] font-bold text-zinc-500 mt-2 uppercase">Balance: {user.gems} Gems</p></div></div> }
function SettingsPanel({user, navigate}:any){ return <div className="space-y-4"><h3 className="text-xl font-black uppercase mb-6 italic tracking-tighter">Nexus Settings</h3><button onClick={() => navigate('god-mode')} className="w-full bg-red-600/10 border border-red-500/20 p-6 rounded-[2rem] flex items-center justify-between text-red-500"><span className="text-xs font-black uppercase">Omniverse God Mode</span><Lock size={20}/></button></div> }
function MagicChat({user}:any){ return <div className="p-8 bg-indigo-600/10 rounded-[3rem] text-center border border-indigo-500/20"><Sparkles className="text-indigo-400 mx-auto mb-4" size={48}/><h3 className="text-xl font-black italic uppercase">Magic Chat</h3><p className="text-[10px] font-bold text-zinc-500 mt-2 uppercase">Connected as {user.name}</p></div> }
function MusicPlayer(){ return <div className="text-center pt-20"><Music size={60} className="mx-auto text-green-500 mb-6"/><h3 className="text-3xl font-black italic uppercase">Radio RX</h3></div> }
function NotificationCenter(){ return <div className="space-y-4"><h3 className="text-xl font-black italic uppercase mb-6">Alerts</h3><div className="bg-zinc-900 p-5 rounded-2xl border border-white/5 text-[10px] font-bold text-zinc-400">System core stabilized. Welcome, Founder.</div></div> }
