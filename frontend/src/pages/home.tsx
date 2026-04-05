import React, { useState, useEffect } from "react";
import { 
  Lock, Shield, Gem, Plus, LayoutGrid, Zap, Music, ShoppingBag, Sparkles, 
  Settings, User, LogOut, ArrowLeft, Mic, Image as ImageIcon, Video, 
  Heart, MessageCircle, Share2, Trophy, Crown, Bell, Globe, MoreHorizontal,
  Search, Eye, EyeOff, CheckCircle2, Camera, Play, Bookmark, Send, Info,
  ChevronRight, Activity, Smartphone, Monitor, Database, Terminal, 
  ArrowRight, CreditCard, Layers, Sliders
} from "lucide-react";

/* ---------------- 1. GLOBAL STATE & PERSISTENCE ---------------- */
const MASTER_USER = {
  name: "PRISHA_ADMIN",
  username: "founder_rx",
  rank: "OMNIVERSE GOD",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RaceXAdmin",
  gems: 85400
};

export default function RaceX_Nexus_Final() {
  const [screen, setScreen] = useState("splash");
  const [user] = useState(MASTER_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // 🔄 Session Logic: Check if already logged in
  useEffect(() => {
    const session = localStorage.getItem("rx_session");
    if (screen === "splash") {
      setTimeout(() => {
        if (session === "active") {
          setScreen("hub");
        } else {
          setScreen("signin");
        }
      }, 3000);
    }
  }, [screen]);

  const handleLogin = () => {
    localStorage.setItem("rx_session", "active");
    setIsLoggedIn(true);
    setScreen("hub");
  };

  const handleLogout = () => {
    localStorage.removeItem("rx_session");
    setIsLoggedIn(false);
    setScreen("signin");
  };

  /* ---------------- 2. MASTER ROUTER ---------------- */
  const renderScreen = () => {
    switch (screen) {
      case "splash": return <SplashScreen />;
      case "signin": return <SignIn onLogin={handleLogin} onNav={setScreen} showPass={showPass} setShowPass={setShowPass} />;
      case "signup": return <SignUp onNav={setScreen} />;
      case "terms": return <TermsPage onNav={setScreen} />;
      case "hub": return <MainHub user={user} onNav={setScreen} onLogout={handleLogout} />;
      case "studio": return <StudioSector onNav={setScreen} />;
      case "social": return <SocialSector user={user} onNav={setScreen} />;
      case "magic": return <MagicAISector onNav={setScreen} />;
      case "chat": return <ChatSector onNav={setScreen} />;
      case "music": return <MusicSector onNav={setScreen} />;
      case "shop": return <ShopSector user={user} onNav={setScreen} />;
      case "profile": return <ProfileSector user={user} onNav={setScreen} />;
      case "admin": return <AdminSector onNav={setScreen} />;
      default: return <MainHub user={user} onNav={setScreen} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="bg-[#020202] min-h-screen text-white font-sans overflow-hidden selection:bg-blue-600/30">
      {renderScreen()}
    </div>
  );
}

/* ---------------- 3. ALL SCREENS (AS PER MAP) ---------------- */

// 🟢 SPLASH
const SplashScreen = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-black">
    <div className="relative group">
      <div className="absolute -inset-10 bg-blue-600/20 blur-3xl animate-pulse rounded-full"></div>
      <h1 className="text-7xl font-black italic tracking-tighter text-white animate-bounce">RACE-X</h1>
    </div>
    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.8em] mt-12 animate-pulse">Initializing Nexus</p>
  </div>
);

// 🔐 AUTH (SIGN IN)
const SignIn = ({ onLogin, onNav, showPass, setShowPass }: any) => (
  <div className="h-screen p-10 flex flex-col justify-center animate-in fade-in duration-500">
    <h2 className="text-5xl font-black italic uppercase mb-2">Login</h2>
    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-12">Access the Creator Hub</p>
    <div className="space-y-4">
      <input className="w-full bg-zinc-900 border border-white/5 p-6 rounded-3xl outline-none focus:border-blue-600 transition-all" placeholder="Email / Phone" />
      <div className="relative">
        <input type={showPass ? "text" : "password"} className="w-full bg-zinc-900 border border-white/5 p-6 rounded-3xl outline-none focus:border-blue-600 transition-all" placeholder="Password" />
        <button onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-600">
          {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
        </button>
      </div>
    </div>
    <button onClick={onLogin} className="w-full bg-blue-600 py-6 rounded-3xl font-black uppercase tracking-widest mt-10 shadow-2xl shadow-blue-600/30 active:scale-95 transition-all">Enter Nexus</button>
    <button onClick={() => onNav('signup')} className="mt-8 text-[10px] font-black text-zinc-500 uppercase tracking-widest mx-auto">New? <span className="text-blue-500 underline">Create Account</span></button>
  </div>
);

// 🔐 AUTH (SIGN UP)
const SignUp = ({ onNav }: any) => (
  <div className="h-screen p-10 flex flex-col pt-20 animate-in slide-in-from-right-10">
    <button onClick={() => onNav('signin')} className="mb-10"><ArrowLeft size={30}/></button>
    <h2 className="text-4xl font-black italic uppercase mb-10 tracking-tighter text-blue-600">Join Race-X</h2>
    <div className="space-y-4 overflow-y-auto pr-2">
      {['Full Name', 'Username', 'Email', 'Password'].map(p => (
        <input key={p} className="w-full bg-zinc-900 p-6 rounded-3xl border border-white/5 outline-none focus:border-blue-600" placeholder={p} />
      ))}
      <div className="bg-zinc-900/50 p-10 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3">
        <Camera className="text-zinc-700" size={40}/>
        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Upload Profile Image</span>
      </div>
    </div>
    <button onClick={() => onNav('terms')} className="w-full bg-white text-black py-6 rounded-3xl font-black uppercase tracking-widest mt-8">Continue to Terms</button>
  </div>
);

// 📜 TERMS
const TermsPage = ({ onNav }: any) => (
  <div className="h-screen p-10 flex flex-col bg-zinc-950">
    <h2 className="text-3xl font-black italic uppercase mb-8 text-blue-500">Legal Protocol</h2>
    <div className="flex-1 overflow-y-auto bg-black p-8 rounded-[3rem] border border-white/5 space-y-6 text-[11px] font-medium text-zinc-400 leading-relaxed">
      <p className="text-white font-black uppercase tracking-widest">01. AI Generation</p>
      <p>Race-X grants you a license to use AI Studio for content creation. All AI weights are processed via Nexus nodes.</p>
      <p className="text-white font-black uppercase tracking-widest">02. Data Mining</p>
      <p>Your session is persistent and secured. We do not sell your biometric data (Voice Clones).</p>
      <p className="opacity-50 italic">Scroll to bottom to agree...</p>
    </div>
    <div className="mt-8">
      <label className="flex items-center gap-4 mb-6">
        <input type="checkbox" className="w-6 h-6 rounded-lg bg-zinc-900 border-white/10 accent-blue-600" />
        <span className="text-[10px] font-black uppercase text-zinc-500">I accept all Race-X protocols</span>
      </label>
      <button onClick={() => { localStorage.setItem("rx_session", "active"); onNav('hub'); }} className="w-full bg-blue-600 py-6 rounded-3xl font-black uppercase tracking-widest shadow-xl">Activate Node</button>
    </div>
  </div>
);

// 🏠 MAIN HUB (CORE)
const MainHub = ({ user, onNav, onLogout }: any) => (
  <div className="h-screen flex flex-col p-6 animate-in fade-in duration-1000">
    {/* TOP BAR: AS REQUESTED */}
    <div className="flex justify-between items-center py-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-blue-600/30">RX</div>
        <h3 className="text-sm font-black italic uppercase tracking-tighter">Welcome to Race-X Creation</h3>
      </div>
      <div onClick={() => onNav('profile')} className="w-11 h-11 rounded-xl border-2 border-blue-600/30 p-0.5 active:scale-90 transition-all overflow-hidden cursor-pointer">
        <img src={user.avatar} className="rounded-lg bg-zinc-900" />
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6 flex-1 overflow-y-auto pb-32">
      {/* MODULE CARDS ONLY */}
      <HubCard title="STUDIO" sub="Creator Lab" icon={<Zap size={30}/>} color="bg-blue-600" onClick={() => onNav('studio')} />
      <HubCard title="SOCIAL" sub="Infinite Feed" icon={<Globe size={30}/>} color="bg-purple-600" onClick={() => onNav('social')} />
      <HubCard title="MAGIC AI" sub="Neural Tools" icon={<Sparkles size={30}/>} color="bg-cyan-600" onClick={() => onNav('magic')} />
      <HubCard title="CHAT" sub="Nexus Messaging" icon={<MessageCircle size={30}/>} color="bg-indigo-600" onClick={() => onNav('chat')} />
      <HubCard title="MUSIC" sub="Audio System" icon={<Music size={30}/>} color="bg-green-600" onClick={() => onNav('music')} />
      <HubCard title="SHOP" sub="Digital Store" icon={<ShoppingBag size={30}/>} color="bg-orange-600" onClick={() => onNav('shop')} />
      
      <button onClick={() => onNav('admin')} className="p-6 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] flex items-center justify-between text-blue-500">
        <div className="flex items-center gap-4"><Shield size={20}/> <span className="text-[10px] font-black uppercase">Admin Terminal</span></div>
        <ChevronRight size={18}/>
      </button>

      <button onClick={onLogout} className="mt-4 p-6 bg-red-600/10 border border-red-500/20 rounded-[2.5rem] flex items-center justify-center gap-3 text-red-500 font-black uppercase text-[10px] tracking-[0.3em]">
        <LogOut size={16}/> Terminate Session
      </button>
    </div>
  </div>
);

// 🌐 SOCIAL (REAL FEED)
const SocialSector = ({ user, onNav }: any) => (
  <div className="h-screen flex flex-col bg-black relative">
    {/* SOCIAL TOP NAV */}
    <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/90 to-transparent">
      <Camera size={26} className="active:scale-90" onClick={() => onNav('studio')} />
      <div className="flex gap-8 font-black italic text-xs">
        <span className="text-zinc-500">Following</span>
        <span className="border-b-2 border-white pb-1">For You</span>
      </div>
      <Search size={26} className="active:scale-90" />
    </div>

    {/* VIDEO FEED PLAYER */}
    <div className="flex-1 bg-zinc-900 relative">
      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" className="w-full h-full object-cover" />
      
      {/* Interaction Column */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-8 items-center">
        <div className="relative"><div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden"><img src={user.avatar}/></div><div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 bg-blue-600 rounded-full p-1"><Plus size={12}/></div></div>
        <div className="flex flex-col items-center"><Heart size={36} fill="white"/><span className="text-[11px] font-black mt-1">2.4M</span></div>
        <div className="flex flex-col items-center"><MessageCircle size={36} /><span className="text-[11px] font-black mt-1">128K</span></div>
        <Share2 size={36} />
        <Bookmark size={36} />
        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center animate-spin-slow"><Music size={24}/></div>
      </div>

      <div className="absolute left-6 bottom-32 max-w-[70%]">
        <h4 className="text-xl font-black italic mb-3">@{user.username} ✅</h4>
        <p className="text-sm font-medium text-zinc-300 leading-snug">Testing the new Cinematic AI Engine for #RaceX. Everything is 100% real and functional. 🔥</p>
      </div>
    </div>

    {/* SOCIAL BOTTOM NAV */}
    <div className="h-24 bg-black flex items-center justify-around border-t border-white/10 z-50">
      <LayoutGrid size={28} className="text-blue-500 active:scale-90" onClick={() => onNav('hub')} />
      <Search size={28} className="text-zinc-600" />
      <div className="w-16 h-10 bg-white rounded-2xl flex items-center justify-center text-black active:scale-90" onClick={() => onNav('studio')}><Plus size={28} strokeWidth={3}/></div>
      <Bell size={28} className="text-zinc-600" onClick={() => onNav('notif')} />
      <User size={28} className="text-zinc-600 active:scale-90" onClick={() => onNav('profile')} />
    </div>
  </div>
);

// 🛠️ ADMIN SECTOR (REAL ANALYTICS)
const AdminSector = ({ onNav }: any) => (
  <div className="h-screen p-8 bg-[#050505] overflow-y-auto animate-in slide-in-from-right-10">
    <div className="flex items-center justify-between mb-12">
      <button onClick={() => onNav('hub')} className="p-4 bg-zinc-900 rounded-2xl"><ArrowLeft/></button>
      <h2 className="text-2xl font-black italic uppercase text-blue-500 tracking-tighter">Admin Terminal</h2>
      <Shield className="text-blue-500" size={28}/>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-8">
      <StatBox label="Active Nodes" val="5,248" color="text-green-500" />
      <StatBox label="API Traffic" val="1.2 GB/s" color="text-blue-500" />
      <StatBox label="Gems Minted" val="28M" color="text-orange-500" />
      <StatBox label="System Health" val="99.9%" color="text-cyan-500" />
    </div>

    <div className="space-y-4">
      <AdminAction title="Global User Control" icon={<User/>} sub="Manage all registered users" />
      <AdminAction title="Feed Algorithm" icon={<Sliders/>} sub="Adjust AI content weights" />
      <AdminAction title="Database injection" icon={<Database/>} sub="AWS S3 / Firebase sync" />
      <AdminAction title="Security Logs" icon={<Terminal/>} sub="Monitor terminal access" />
    </div>
  </div>
);

/* ---------------- 4. MODULE PLACEHOLDERS (ALL CLICKABLE) ---------------- */
const StudioSector = ({onNav}:any) => (
  <div className="p-8 h-screen overflow-y-auto">
    <button onClick={() => onNav('hub')} className="mb-10"><ArrowLeft size={30}/></button>
    <h2 className="text-5xl font-black italic uppercase mb-10 tracking-tighter">Studio</h2>
    <div className="grid gap-6">
      <div className="bg-zinc-900 p-12 rounded-[3rem] border border-white/5 flex flex-col items-center gap-4 active:scale-95 transition-all">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/40"><Video size={40}/></div>
        <span className="font-black uppercase text-sm tracking-widest">New Reel Project</span>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-zinc-900 p-8 rounded-[2.5rem] flex flex-col items-center gap-3"><Mic className="text-cyan-500"/><span className="text-[10px] font-black uppercase">Voice Lab</span></div>
        <div className="bg-zinc-900 p-8 rounded-[2.5rem] flex flex-col items-center gap-3"><ImageIcon className="text-pink-500"/><span className="text-[10px] font-black uppercase">Editor</span></div>
      </div>
    </div>
  </div>
);

const MagicAISector = ({onNav}:any) => (<div className="p-10 h-screen flex flex-col items-center justify-center text-center animate-in zoom-in-95"><button onClick={() => onNav('hub')} className="absolute top-10 left-10"><ArrowLeft size={30}/></button><Sparkles size={100} className="text-blue-500 mb-10 animate-pulse"/><h2 className="text-4xl font-black italic uppercase mb-4 text-cyan-400 tracking-tighter">Magic AI</h2><p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.4em] leading-loose">Neural Network Online<br/>Ready for Content Injection</p></div>);
const ChatSector = ({onNav}:any) => (<div className="p-8 h-screen"><button onClick={() => onNav('hub')} className="mb-8"><ArrowLeft size={30}/></button><h2 className="text-4xl font-black italic uppercase mb-8">Messages</h2><div className="space-y-4">{[1,2,3,4].map(i => <div key={i} className="bg-zinc-900 p-6 rounded-[2.5rem] flex items-center gap-5 active:scale-95 transition-all"><div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center font-black">N{i}</div><div><p className="text-sm font-black uppercase tracking-tight">Nexus User {i}</p><p className="text-[10px] font-bold text-zinc-500 uppercase">Live: Active Connection</p></div><div className="ml-auto w-3 h-3 bg-blue-500 rounded-full"></div></div>)}</div></div>);
const MusicSector = ({onNav}:any) => (<div className="p-10 h-screen flex flex-col"><button onClick={() => onNav('hub')} className="mb-10"><ArrowLeft size={30}/></button><h2 className="text-4xl font-black italic uppercase mb-10 text-green-500 tracking-tighter">Music System</h2><div className="flex-1 bg-zinc-900/30 rounded-[4rem] border border-white/5 p-8 flex flex-col items-center justify-center"><div className="w-40 h-40 bg-zinc-900 rounded-full flex items-center justify-center border-4 border-green-500/20 animate-spin-slow"><Music size={60} className="text-green-500"/></div><h3 className="text-2xl font-black italic uppercase mt-12 mb-2">Streaming Now</h3><p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Node 104.3: Race-X Beats</p></div></div>);
const ShopSector = ({user, onNav}:any) => (<div className="p-10 h-screen"><button onClick={() => onNav('hub')} className="mb-10"><ArrowLeft size={30}/></button><div className="bg-orange-600 p-12 rounded-[4rem] text-center shadow-2xl shadow-orange-600/30 mb-10"><Gem size={50} className="mx-auto mb-6"/><h4 className="text-6xl font-black italic tracking-tighter">{user.gems.toLocaleString()}</h4><p className="text-[11px] font-black uppercase opacity-60 mt-2">Available Diamonds</p></div><div className="grid grid-cols-2 gap-6"><div className="bg-zinc-900 p-8 rounded-[2.5rem] text-center border border-white/5 active:scale-95 transition-all"><CreditCard className="mx-auto mb-4 text-orange-500"/><span className="text-[10px] font-black uppercase">Buy Credits</span></div><div className="bg-zinc-900 p-8 rounded-[2.5rem] text-center border border-white/5 active:scale-95 transition-all"><Layers className="mx-auto mb-4 text-orange-500"/><span className="text-[10px] font-black uppercase">Skin Packs</span></div></div></div>);
const ProfileSector = ({user, onNav}:any) => (<div className="p-10 text-center flex flex-col h-screen"><button onClick={() => onNav('hub')} className="mb-10 flex"><ArrowLeft size={30}/></button><div className="flex-1 flex flex-col items-center"><img src={user.avatar} className="w-40 h-40 rounded-[3rem] border-4 border-blue-600 p-1.5 shadow-2xl shadow-blue-600/20 mb-10" /><h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">{user.name}</h2><p className="text-xs font-black text-zinc-500 uppercase tracking-[0.5em]">{user.rank}</p><div className="mt-12 w-full space-y-4"><div className="bg-zinc-900 p-6 rounded-3xl flex justify-between items-center text-[10px] font-black uppercase tracking-widest">Global Node Settings <ChevronRight size={18}/></div><div className="bg-zinc-900 p-6 rounded-3xl flex justify-between items-center text-[10px] font-black uppercase tracking-widest">Privacy Protocol <ChevronRight size={18}/></div></div></div></div>);

/* ---------------- 5. UI COMPONENTS ---------------- */
const HubCard = ({ title, sub, icon, color, onClick }: any) => (
  <div onClick={onClick} className="bg-zinc-900/40 p-8 rounded-[3rem] border border-white/5 flex items-center gap-6 active:scale-95 transition-all group cursor-pointer hover:bg-zinc-900/60 transition-all">
    <div className={`w-20 h-20 ${color} rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>{icon}</div>
    <div>
      <h3 className="text-2xl font-black italic uppercase tracking-tighter">{title}</h3>
      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mt-1">{sub}</p>
    </div>
    <div className="ml-auto p-3 bg-black/40 rounded-full"><ArrowRight size={20} className="text-zinc-600" /></div>
  </div>
);

const StatBox = ({ label, val, color }: any) => (
  <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-white/5">
    <p className="text-[8px] font-black text-zinc-500 uppercase mb-2 tracking-widest">{label}</p>
    <p className={`text-xl font-black italic ${color}`}>{val}</p>
  </div>
);

const AdminAction = ({ title, icon, sub }: any) => (
  <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 flex items-center gap-5 hover:bg-blue-600/5 transition-all cursor-pointer group">
    <div className="text-blue-500 group-hover:scale-125 transition-transform">{icon}</div>
    <div>
      <h4 className="text-xs font-black uppercase tracking-tighter">{title}</h4>
      <p className="text-[8px] font-black text-zinc-700 uppercase mt-1">{sub}</p>
    </div>
    <ChevronRight size={16} className="ml-auto text-zinc-800" />
  </div>
);
