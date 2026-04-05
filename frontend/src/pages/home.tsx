import React, { useState, useEffect } from "react";
import { 
  Lock, Shield, Gem, Plus, LayoutGrid, Zap, Music, ShoppingBag, Sparkles, 
  Settings, User, LogOut, ArrowLeft, Mic, Image as ImageIcon, Video, 
  Heart, MessageCircle, Share2, Trophy, Crown, Bell, Globe, MoreHorizontal,
  Search, Eye, EyeOff, CheckCircle2, Camera, Play, Bookmark, Send, Info,
  ChevronRight, Activity, Smartphone, Monitor, Database, Terminal
} from "lucide-react";

/* ---------------- 1. GLOBAL STATE & DATA ---------------- */
const INITIAL_USER = {
  name: "PRISHA_ADMIN",
  username: "founder_rx",
  email: "admin@racex.ai",
  gems: 85400,
  rank: "OMNIVERSE GOD",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RaceXAdmin",
};

export default function RaceX_Complete_Nexus() {
  // Navigation States
  const [screen, setScreen] = useState("splash"); // splash, signin, signup, terms, hub, social, studio, magic, chat, music, shop, profile, admin, notifications
  const [user, setUser] = useState(INITIAL_USER);
  const [showPass, setShowPass] = useState(false);

  // Splash Timer
  useEffect(() => {
    if (screen === "splash") {
      setTimeout(() => setScreen("signin"), 3000);
    }
  }, [screen]);

  /* ---------------- 2. THE MASTER ROUTER (SAB KUCH IDHAR HAI) ---------------- */
  const renderView = () => {
    switch (screen) {
      case "splash": return <SplashScreen />;
      case "signin": return <SignIn onNav={setScreen} showPass={showPass} setShowPass={setShowPass} />;
      case "signup": return <SignUp onNav={setScreen} />;
      case "terms": return <TermsPage onNav={setScreen} />;
      case "hub": return <MainHub user={user} onNav={setScreen} />;
      case "social": return <SocialApp user={user} onNav={setScreen} />;
      case "studio": return <StudioModule onNav={setScreen} />;
      case "magic": return <AIMagicModule user={user} onNav={setScreen} />;
      case "chat": return <ChatSystem onNav={setScreen} />;
      case "music": return <MusicSystem onNav={setScreen} />;
      case "shop": return <ShopSystem user={user} onNav={setScreen} />;
      case "profile": return <ProfileSettings user={user} onNav={setScreen} />;
      case "admin": return <AdminPanel onNav={setScreen} />;
      case "notif": return <Notifications onNav={setScreen} />;
      default: return <MainHub user={user} onNav={setScreen} />;
    }
  };

  return (
    <div className="bg-[#020202] min-h-screen text-white font-sans overflow-hidden">
      {renderView()}
    </div>
  );
}

/* ---------------- 3. ALL PAGES (AS PER YOUR MAP) ---------------- */

// 🟢 SPLASH SCREEN
const SplashScreen = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-black animate-pulse">
    <h1 className="text-7xl font-black italic tracking-tighter text-blue-600">RACE-X</h1>
    <div className="mt-8 w-16 h-1 bg-zinc-900 rounded-full overflow-hidden">
      <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite]"></div>
    </div>
    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em] mt-4">AI FEED ENGINE READY</p>
  </div>
);

// 🔐 AUTH: SIGN IN
const SignIn = ({ onNav, showPass, setShowPass }: any) => (
  <div className="h-screen p-8 flex flex-col justify-center animate-in slide-in-from-bottom-10">
    <h2 className="text-4xl font-black italic uppercase mb-2">Sign In</h2>
    <p className="text-zinc-500 text-xs font-bold mb-10 tracking-widest uppercase">Nexus Authorization Required</p>
    <div className="space-y-4">
      <div className="bg-zinc-900 p-5 rounded-2xl border border-white/5"><input className="w-full bg-transparent outline-none text-sm" placeholder="Email / Phone" /></div>
      <div className="bg-zinc-900 p-5 rounded-2xl border border-white/5 flex items-center">
        <input type={showPass ? "text" : "password"} className="w-full bg-transparent outline-none text-sm" placeholder="Password" />
        <button onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
      </div>
      <p className="text-right text-[10px] font-black text-blue-500 uppercase">Forgot Password?</p>
    </div>
    <button onClick={() => onNav('hub')} className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase mt-10 shadow-lg shadow-blue-600/20 active:scale-95 transition-all">Login</button>
    <p className="text-center mt-8 text-[10px] font-bold text-zinc-500 uppercase">New Here? <span onClick={() => onNav('signup')} className="text-blue-500 cursor-pointer">Create Account</span></p>
  </div>
);

// 🔐 AUTH: SIGN UP & TERMS
const SignUp = ({ onNav }: any) => (
  <div className="h-screen p-8 flex flex-col pt-20 animate-in slide-in-from-right-10">
    <button onClick={() => onNav('signin')} className="mb-8"><ArrowLeft/></button>
    <h2 className="text-3xl font-black italic uppercase mb-8">Create Account</h2>
    <div className="space-y-4">
      {['Name', 'Username', 'Email', 'Password'].map(p => <input key={p} className="w-full bg-zinc-900 p-5 rounded-2xl border border-white/5 outline-none" placeholder={p} />)}
      <div className="w-full bg-zinc-900 p-8 rounded-2xl border-2 border-dashed border-white/10 text-center"><ImageIcon size={32} className="mx-auto text-zinc-700"/><p className="text-[8px] font-black uppercase mt-2">Upload Profile Image</p></div>
    </div>
    <button onClick={() => onNav('terms')} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase mt-10">Continue</button>
  </div>
);

const TermsPage = ({ onNav }: any) => (
  <div className="h-screen p-8 flex flex-col bg-zinc-950">
    <h2 className="text-2xl font-black italic uppercase mb-6 text-blue-500">Terms & Rules</h2>
    <div className="flex-1 overflow-y-auto bg-black p-6 rounded-3xl border border-white/5 text-[10px] text-zinc-500 space-y-4">
      <p className="text-white font-bold uppercase">1. AI Content Policy</p>
      <p>Race-X uses advanced AI Injection for real-time feed processing. Do not misuse studio tools.</p>
      <p className="text-white font-bold uppercase">2. Privacy</p>
      <p>Your node data is encrypted. We don't share your private voice clones.</p>
    </div>
    <div className="mt-8 flex flex-col gap-4">
      <div className="flex items-center gap-3"><input type="checkbox" className="w-5 h-5 rounded bg-zinc-900" /><span className="text-[10px] font-black uppercase">I Agree to Terms</span></div>
      <button onClick={() => onNav('hub')} className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase shadow-xl">Agree & Create Account</button>
    </div>
  </div>
);

// 🏠 RX MAIN HUB
const MainHub = ({ user, onNav }: any) => (
  <div className="p-6 h-screen flex flex-col overflow-y-auto pb-32 animate-in fade-in duration-700">
    <div className="flex justify-between items-center mb-10 pt-4">
      <div onClick={() => onNav('profile')} className="w-12 h-12 rounded-2xl border border-white/10 overflow-hidden bg-zinc-900"><img src={user.avatar} alt="p" /></div>
      <div className="flex gap-4">
        <button onClick={() => onNav('notif')} className="p-3 bg-zinc-900 rounded-xl relative"><Bell size={20} /><div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-ping"></div></button>
        <button onClick={() => onNav('admin')} className="p-3 bg-blue-600/10 text-blue-500 rounded-xl border border-blue-500/20"><Shield size={20}/></button>
      </div>
    </div>
    
    <div className="mb-10">
      <h1 className="text-5xl font-black italic tracking-tighter text-white">RX HUB</h1>
      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mt-1 italic">Authorized Admin: {user.name}</p>
    </div>

    <div className="grid grid-cols-1 gap-4">
      <HubCard title="RX STUDIO" sub="Creator Engine" icon={<Zap/>} color="from-blue-600/20" onClick={() => onNav('studio')} />
      <HubCard title="RX SOCIAL" sub="Infinite AI Feed" icon={<Globe/>} color="from-purple-600/20" onClick={() => onNav('social')} />
      <HubCard title="RX MAGIC" sub="AI Chat & Tools" icon={<Sparkles/>} color="from-cyan-600/20" onClick={() => onNav('magic')} />
      
      <div className="grid grid-cols-2 gap-4">
        <SmallHubCard title="MESSAGES" icon={<MessageCircle/>} onClick={() => onNav('chat')} />
        <SmallHubCard title="MUSIC" icon={<Music/>} onClick={() => onNav('music')} />
        <SmallHubCard title="SHOP" icon={<ShoppingBag/>} onClick={() => onNav('shop')} />
        <SmallHubCard title="SETTINGS" icon={<Settings/>} onClick={() => onNav('profile')} />
      </div>
    </div>
    <button onClick={() => onNav('signin')} className="mt-10 w-full py-5 flex items-center justify-center gap-3 bg-red-600/10 text-red-500 rounded-3xl border border-red-500/20 font-black uppercase text-[10px] tracking-widest"><LogOut size={16}/> Terminate Session</button>
  </div>
);

// 🌐 RX SOCIAL (REELS/VIDEO FOCUS)
const SocialApp = ({ user, onNav }: any) => (
  <div className="h-screen flex flex-col bg-black relative">
    {/* TOP SOCIAL NAV */}
    <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
      <Camera size={24} className="text-white" />
      <div className="flex gap-6 font-black italic uppercase text-xs tracking-widest"><span className="text-zinc-500">Following</span><span className="border-b-2 border-white pb-1">For You</span></div>
      <Search size={24} className="text-white" />
    </div>

    {/* VIDEO FEED PLAYER (MOCK) */}
    <div className="flex-1 bg-zinc-900 relative">
      <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800" className="w-full h-full object-cover" alt="vid" />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><Play size={64} className="text-white/50 opacity-0 group-hover:opacity-100" /></div>
      
      {/* Interaction Icons */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center"><div className="w-12 h-12 rounded-full border-2 border-white mb-2 overflow-hidden bg-black"><img src={user.avatar} /></div><Plus size={16} className="bg-blue-600 rounded-full -mt-4 z-10"/></div>
        <div className="flex flex-col items-center"><Heart size={32} fill="white" className="text-white" /> <span className="text-[10px] font-black mt-1">1.2M</span></div>
        <div className="flex flex-col items-center" onClick={() => alert('Comments Open')}><MessageCircle size={32} /> <span className="text-[10px] font-black mt-1">45K</span></div>
        <Share2 size={32} />
        <Bookmark size={32} />
        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center animate-spin-slow"><Music size={18}/></div>
      </div>

      <div className="absolute left-4 bottom-32 max-w-[70%]">
        <h4 className="font-black italic text-lg mb-2">@{user.username} ✅</h4>
        <p className="text-xs font-medium text-zinc-300">Infinite AI Feed Engine testing... The future is here. #RaceX #Nexus #AI</p>
      </div>
    </div>

    {/* BOTTOM NAV SOCIAL */}
    <div className="h-20 bg-black flex items-center justify-around border-t border-white/5 z-50">
      <button onClick={() => onNav('hub')}><LayoutGrid size={24} className="text-blue-500"/></button>
      <Search size={24} className="text-zinc-500" />
      <div className="w-14 h-9 bg-white rounded-xl flex items-center justify-center text-black font-black"><Plus size={24}/></div>
      <Heart size={24} className="text-zinc-500" />
      <button onClick={() => onNav('profile')}><User size={24} className="text-zinc-500"/></button>
    </div>
  </div>
);

// 🔐 ADMIN PANEL (GOD CONTROL)
const AdminPanel = ({ onNav }: any) => (
  <div className="h-screen p-8 bg-[#050505] overflow-y-auto animate-in slide-in-from-right-10">
    <button onClick={() => onNav('hub')} className="mb-8 p-3 bg-zinc-900 rounded-xl"><ArrowLeft/></button>
    <div className="flex items-center gap-4 mb-10"><Shield size={32} className="text-blue-500"/><h2 className="text-3xl font-black italic uppercase">Admin Node</h2></div>
    
    <div className="grid gap-4">
      <AdminTile title="USER CONTROL" icon={<User/>} sub="5,240 Nodes Active" />
      <AdminTile title="CONTENT MODERATION" icon={<Monitor/>} sub="Real-time Feed Filter" />
      <AdminTile title="ALGORITHM INJECTION" icon={<Terminal/>} sub="Boost Trending Nodes" />
      <AdminTile title="API KEY STORAGE" icon={<Database/>} sub="AWS S3 Connected" />
      <AdminTile title="SYSTEM ANALYTICS" icon={<Activity/>} sub="Uptime: 99.9%" />
    </div>
  </div>
);

/* ---------------- 4. HELPERS & MODULE PLACEHOLDERS ---------------- */

const HubCard = ({ title, sub, icon, color, onClick }: any) => (
  <div onClick={onClick} className={`relative overflow-hidden bg-zinc-900/50 border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-6 active:scale-95 transition-all cursor-pointer group`}>
    <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${color} blur-[60px] opacity-20`}></div>
    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">{icon}</div>
    <div>
      <h3 className="text-xl font-black italic uppercase tracking-tighter">{title}</h3>
      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mt-1">{sub}</p>
    </div>
  </div>
);

const SmallHubCard = ({ title, icon, onClick }: any) => (
  <div onClick={onClick} className="bg-zinc-900/30 border border-white/5 p-6 rounded-[2rem] flex flex-col items-center gap-3 active:scale-95 transition-all cursor-pointer">
    <div className="text-blue-500">{icon}</div>
    <span className="text-[9px] font-black uppercase tracking-widest">{title}</span>
  </div>
);

const AdminTile = ({ title, icon, sub }: any) => (
  <div className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5 flex items-center gap-4 hover:bg-blue-600/10 transition-all cursor-pointer group">
    <div className="text-blue-500">{icon}</div>
    <div className="flex-1">
      <h4 className="text-xs font-black uppercase tracking-widest">{title}</h4>
      <p className="text-[8px] font-bold text-zinc-600 uppercase mt-1">{sub}</p>
    </div>
    <ChevronRight size={16} className="text-zinc-800 group-hover:text-white" />
  </div>
);

// PLACEHOLDER SCREENS
const StudioModule = ({onNav}:any) => (<div className="p-10"><button onClick={() => onNav('hub')}><ArrowLeft/></button><h1 className="text-4xl font-black italic uppercase mt-10">Creator Studio</h1><div className="mt-10 grid gap-6"><div className="p-10 bg-zinc-900 rounded-[3rem] text-center border-2 border-dashed border-white/5"><Plus size={48} className="mx-auto text-zinc-700"/><p className="mt-4 font-black uppercase text-xs">New Project</p></div><div className="p-8 bg-zinc-900 rounded-[2rem] flex justify-between items-center"><span>Analytics</span><Activity size={20}/></div></div></div>);
const AIMagicModule = ({onNav}:any) => (<div className="p-10 h-screen flex flex-col"><button onClick={() => onNav('hub')}><ArrowLeft/></button><div className="flex-1 flex flex-col items-center justify-center text-center"><Sparkles size={64} className="text-cyan-400 mb-8"/><h2 className="text-3xl font-black italic uppercase">RX MAGIC AI</h2><p className="text-[10px] text-zinc-500 uppercase mt-4 tracking-widest">Image Gen • Code Assistant • Voice Clone</p></div></div>);
const ChatSystem = ({onNav}:any) => (<div className="p-8"><button onClick={() => onNav('hub')} className="mb-8"><ArrowLeft/></button><h2 className="text-2xl font-black italic uppercase mb-6">Chat List</h2><div className="space-y-4">{[1,2,3].map(i => <div key={i} className="bg-zinc-900 p-5 rounded-3xl flex items-center gap-4"><div className="w-12 h-12 bg-blue-600 rounded-full"></div><div><p className="text-xs font-black">NODE_USER_{i}</p><p className="text-[10px] text-zinc-500">Seen 2m ago</p></div></div>)}</div></div>);
const MusicSystem = ({onNav}:any) => (<div className="p-10 text-center pt-32"><button onClick={() => onNav('hub')} className="mb-20 flex"><ArrowLeft/></button><Music size={80} className="text-green-500 mx-auto mb-8 animate-bounce"/><h2 className="text-4xl font-black italic uppercase">Radio RX</h2><p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] mt-4">Streaming Realtime Audio</p></div>);
const ShopSystem = ({user, onNav}:any) => (<div className="p-8"><button onClick={() => onNav('hub')} className="mb-8"><ArrowLeft/></button><h2 className="text-4xl font-black italic uppercase mb-10">RX Shop</h2><div className="bg-blue-600 p-8 rounded-[3rem] text-center mb-10"><Gem size={40} className="mx-auto mb-4"/><h4 className="text-3xl font-black italic">{user.gems.toLocaleString()}</h4><p className="text-[10px] font-black uppercase opacity-60">Diamond Balance</p></div><div className="grid grid-cols-2 gap-4"><div className="bg-zinc-900 p-6 rounded-3xl text-center border border-white/5">Skin Packs</div><div className="bg-zinc-900 p-6 rounded-3xl text-center border border-white/5">API Credits</div></div></div>);
const ProfileSettings = ({user, onNav}:any) => (<div className="p-10 text-center"><button onClick={() => onNav('hub')} className="flex mb-10"><ArrowLeft/></button><img src={user.avatar} className="w-32 h-32 rounded-full mx-auto border-4 border-blue-600 mb-6 p-1"/><h2 className="text-3xl font-black italic uppercase">{user.name}</h2><p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-10">{user.rank}</p><div className="space-y-3"><div className="bg-zinc-900 p-5 rounded-2xl flex justify-between items-center text-xs font-black uppercase">Edit Node Profile<ChevronRight size={16}/></div><div className="bg-zinc-900 p-5 rounded-2xl flex justify-between items-center text-xs font-black uppercase">Privacy & Safety<ChevronRight size={16}/></div></div><button onClick={() => onNav('signin')} className="mt-12 text-red-500 font-black uppercase text-[10px] tracking-widest">Logout</button></div>);
const Notifications = ({onNav}:any) => (<div className="p-10"><button onClick={() => onNav('hub')}><ArrowLeft/></button><h1 className="text-2xl font-black italic uppercase mt-8 mb-8">Alerts</h1><div className="space-y-4"><div className="bg-blue-600/10 p-5 rounded-3xl border border-blue-500/20"><p className="text-[10px] font-black uppercase">System Core Update v5.1 Successful</p></div><div className="bg-zinc-900 p-5 rounded-3xl border border-white/5"><p className="text-[10px] font-black uppercase text-zinc-500">Security Node: Login from New IP</p></div></div></div>);
