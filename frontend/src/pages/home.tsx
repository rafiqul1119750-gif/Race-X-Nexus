import React, { useState, useEffect } from "react";
import { 
  Lock, Shield, Gem, Plus, LayoutGrid, Zap, Music, ShoppingBag, Sparkles, 
  Settings, User, LogOut, ArrowLeft, Mic, Image as ImageIcon, Video, 
  Heart, MessageCircle, Share2, Trophy, Crown, Bell, Globe, MoreHorizontal,
  Search, Eye, EyeOff, CheckCircle2, Camera, Play, Bookmark, Send, Info,
  ChevronRight, Activity, Smartphone, Monitor, Database, Terminal, 
  ArrowRight, CreditCard, Layers, Sliders, History, Wallet, Star, Radio, 
  BarChart3, DollarSign, CheckSquare, FileText, Code
} from "lucide-react";

/* ---------------- 1. DATA CENTER & PERSISTENCE ---------------- */
const MASTER_USER = {
  name: "PRISHA_ADMIN",
  username: "founder_rx",
  rank: "OMNIVERSE GOD",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RaceXAdmin",
  gems: 85400
};

export default function RaceX_Full_System() {
  const [screen, setScreen] = useState("splash");
  const [user] = useState(MASTER_USER);
  const [showPass, setShowPass] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', content: 'Hello! I am Race-X Magic AI. How can I help you create today?' }
  ]);

  useEffect(() => {
    const session = localStorage.getItem("rx_session");
    if (screen === "splash") {
      setTimeout(() => {
        session === "active" ? setScreen("hub") : setScreen("signin");
      }, 3000);
    }
  }, [screen]);

  const handleAiSend = () => {
    if (!aiInput) return;
    const newMsgs = [...aiMessages, { role: 'user', content: aiInput }];
    setAiMessages(newMsgs);
    setAiInput("");
    setTimeout(() => {
      setAiMessages([...newMsgs, { role: 'ai', content: 'Processing your request with Nexus Engine... Logic initialized for high-fidelity generation.' }]);
    }, 1000);
  };

  /* ---------------- 2. MASTER ROUTER (SAB KUCH IDHAR HAI) ---------------- */
  const renderScreen = () => {
    switch (screen) {
      case "splash": return <SplashScreen />;
      case "signin": return <SignIn onNav={setScreen} showPass={showPass} setShowPass={setShowPass} />;
      case "signup": return <SignUp onNav={setScreen} />;
      case "terms": return <TermsPage onNav={setScreen} />;
      case "hub": return <MainHub user={user} onNav={setScreen} />;
      case "social": return <SocialSector user={user} onNav={setScreen} />;
      case "studio": return <StudioSector onNav={setScreen} />;
      case "magic": return <MagicChatAI onNav={setScreen} messages={aiMessages} input={aiInput} setInput={setAiInput} onSend={handleAiSend} />;
      case "chat": return <ChatSector onNav={setScreen} />;
      case "music": return <MusicSector onNav={setScreen} />;
      case "shop": return <ShopSector user={user} onNav={setScreen} />;
      case "profile": return <ProfileSector user={user} onNav={setScreen} />;
      case "admin": return <AdminSector onNav={setScreen} />;
      case "notif": return <NotifSector onNav={setScreen} />;
      case "search": return <SearchSector onNav={setScreen} />;
      case "dm": return <DMSector onNav={setScreen} />;
      case "monetization": return <MonetizationSector onNav={setScreen} />;
      case "analytics": return <AnalyticsSector onNav={setScreen} />;
      case "live": return <LiveSector onNav={setScreen} />;
      case "vault": return <VaultSector user={user} onNav={setScreen} />;
      default: return <MainHub user={user} onNav={setScreen} />;
    }
  };

  return <div className="bg-[#020202] min-h-screen text-white font-sans overflow-hidden">{renderScreen()}</div>;
}

/* ---------------- 3. THE MAGIC CHAT (GEMINI CLONE) ---------------- */
const MagicChatAI = ({ onNav, messages, input, setInput, onSend }: any) => (
  <div className="h-screen flex flex-col bg-[#050505] animate-in fade-in">
    <div className="p-6 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md">
      <button onClick={() => onNav('hub')} className="p-3 bg-zinc-900 rounded-xl active:scale-90"><ArrowLeft size={20}/></button>
      <div className="flex items-center gap-2">
        <Sparkles className="text-cyan-400" size={20}/>
        <h2 className="text-lg font-black italic tracking-tighter uppercase">Magic Chat</h2>
      </div>
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-[2px] opacity-40"></div>
    </div>

    <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
      {messages.map((m: any, i: number) => (
        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
          <div className={`max-w-[85%] p-6 rounded-[2.2rem] ${m.role === 'user' ? 'bg-blue-600 font-bold shadow-lg shadow-blue-600/20' : 'bg-zinc-900/80 border border-white/5 text-zinc-300 shadow-xl'}`}>
            <p className="text-xs leading-relaxed tracking-wide">{m.content}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="p-6 pb-12">
      <div className="bg-zinc-900 rounded-[2.8rem] p-2 flex items-center border border-white/10 shadow-2xl">
        <button className="p-4 text-zinc-500 hover:text-white transition-colors" onClick={() => alert('Feature Locked: Pro Subscription Required')}><Plus size={20}/></button>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Race-X Magic AI..." 
          className="flex-1 bg-transparent outline-none text-sm py-4 px-2 font-medium"
        />
        <button 
          onClick={onSend}
          className={`p-4 rounded-full transition-all ${input ? 'bg-blue-600 text-white scale-110' : 'text-zinc-700'}`}
        >
          <Send size={20}/>
        </button>
      </div>
      <div className="flex justify-center gap-8 mt-5 opacity-40">
        <button onClick={() => alert('Image Analysis Active')}><ImageIcon size={18} /></button>
        <button onClick={() => alert('Voice Recognition Active')}><Mic size={18} /></button>
        <button onClick={() => alert('Code Interpreter Node Active')}><Code size={18} /></button>
      </div>
    </div>
  </div>
);

/* ---------------- 4. CORE HUB COMPONENTS (NO CHANGES) ---------------- */

const MainHub = ({ user, onNav }: any) => (
  <div className="h-screen flex flex-col p-6 animate-in fade-in duration-700">
    <div className="flex justify-between items-center py-4 mb-10">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center font-black italic">RX</div>
        <h3 className="text-sm font-black italic uppercase tracking-tighter text-zinc-400">Welcome to Race-X Creation</h3>
      </div>
      <div onClick={() => onNav('profile')} className="w-11 h-11 rounded-2xl border-2 border-blue-600/30 overflow-hidden cursor-pointer active:scale-90 transition-all">
        <img src={user.avatar} className="bg-zinc-900" />
      </div>
    </div>

    <div className="grid grid-cols-1 gap-5 flex-1 overflow-y-auto pb-32 no-scrollbar">
      <HubCard title="RX STUDIO" sub="Dashboard, Content, Editor" icon={<Zap size={32}/>} color="bg-blue-600" onClick={() => onNav('studio')} />
      <HubCard title="RX SOCIAL" sub="Home, Explore, Create, Activity" icon={<Globe size={32}/>} color="bg-purple-600" onClick={() => onNav('social')} />
      <HubCard title="MAGIC CHAT" sub="AI Gemini Clone, Assistance" icon={<Sparkles size={32}/>} color="bg-cyan-600" onClick={() => onNav('magic')} />
      <HubCard title="RX CHAT" sub="DMs & Global Group Chat" icon={<MessageCircle size={32}/>} color="bg-indigo-600" onClick={() => onNav('chat')} />
      <HubCard title="RX MUSIC" sub="Audio Library & Tracks" icon={<Music size={32}/>} color="bg-green-600" onClick={() => onNav('music')} />
      <HubCard title="RX SHOP" sub="Gems, Orders, Payments" icon={<ShoppingBag size={32}/>} color="bg-orange-600" onClick={() => onNav('shop')} />
      
      <button onClick={() => onNav('admin')} className="mt-6 p-7 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 flex items-center justify-between text-blue-500 font-black uppercase text-[10px] tracking-widest active:bg-zinc-900">
        <div className="flex items-center gap-4"><Shield size={24}/> Admin Terminal</div>
        <ChevronRight size={18}/>
      </button>
    </div>
  </div>
);

// 🌐 SOCIAL APP (ALL BUTTONS CLICKABLE)
const SocialSector = ({ user, onNav }: any) => (
  <div className="h-screen flex flex-col bg-black relative animate-in slide-in-from-right-10">
    <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/90 to-transparent">
      <Camera size={26} className="active:scale-90" onClick={() => onNav('studio')} />
      <div className="flex gap-8 font-black italic text-xs uppercase"><span className="text-zinc-500 cursor-pointer">Following</span><span className="border-b-2 border-white pb-1">Home</span></div>
      <Search size={26} className="active:scale-90" onClick={() => onNav('search')} />
    </div>

    <div className="flex-1 bg-zinc-900 relative">
      <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800" className="w-full h-full object-cover" />
      <div className="absolute right-4 bottom-32 flex flex-col gap-8 items-center">
        <div className="relative" onClick={() => onNav('profile')}><div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden"><img src={user.avatar}/></div><div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 bg-blue-600 rounded-full p-1"><Plus size={12}/></div></div>
        <IconAction icon={<Heart size={36} fill="white" />} count="1.2M" onClick={() => alert('Liked!')} />
        <IconAction icon={<MessageCircle size={36} />} count="45K" onClick={() => alert('Comments')} />
        <IconAction icon={<Share2 size={36} />} count="Share" onClick={() => alert('Share')} />
        <IconAction icon={<Bookmark size={36} />} count="Save" onClick={() => alert('Saved')} />
        <div onClick={() => onNav('music')} className="w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center animate-spin-slow cursor-pointer"><Music size={24}/></div>
      </div>
    </div>

    <div className="h-24 bg-black flex items-center justify-around border-t border-white/10 z-50">
      <button onClick={() => onNav('hub')} className="p-4 text-blue-500"><LayoutGrid size={28}/></button>
      <button onClick={() => onNav('search')} className="p-4 text-zinc-600"><Search size={28}/></button>
      <button onClick={() => onNav('studio')} className="w-16 h-10 bg-white rounded-xl flex items-center justify-center text-black active:scale-95"><Plus size={28} strokeWidth={3}/></button>
      <button onClick={() => alert('Activity Hub')} className="p-4 text-zinc-600"><Heart size={28}/></button>
      <button onClick={() => onNav('profile')} className="p-4 text-zinc-600"><User size={28}/></button>
    </div>
  </div>
);

/* ---------------- 5. REMAINING BLUEPRINT PAGES (NO OMISSION) ---------------- */

const StudioSector = ({onNav}:any) => (<PageWrapper title="STUDIO" onBack={() => onNav('hub')}><div className="grid gap-4"><ActionTile title="Dashboard" sub="Analytics" icon={<Activity/>} onClick={() => onNav('analytics')}/><ActionTile title="Live Stream" sub="Go Live" icon={<Radio/>} onClick={() => onNav('live')}/><ActionTile title="Monetization" sub="Earnings" icon={<DollarSign/>} onClick={() => onNav('monetization')}/></div></PageWrapper>);
const ChatSector = ({onNav}:any) => (<PageWrapper title="MESSAGES" onBack={() => onNav('hub')}><div className="space-y-4">{[1,2,3].map(i => <div key={i} onClick={() => onNav('dm')} className="p-6 bg-zinc-900 rounded-[2rem] flex items-center gap-4"><div className="w-12 h-12 bg-blue-600 rounded-full"></div><div><p className="text-xs font-black uppercase">Nexus Node {i}</p><p className="text-[10px] text-zinc-500 font-bold">Online</p></div></div>)}</div></PageWrapper>);
const MusicSector = ({onNav}:any) => (<PageWrapper title="MUSIC" onBack={() => onNav('hub')}><div className="bg-zinc-900 p-12 rounded-[4rem] flex flex-col items-center"><div className="w-32 h-32 bg-black rounded-full border-4 border-green-500 flex items-center justify-center animate-spin-slow shadow-2xl shadow-green-600/30"><Music size={40} className="text-green-500"/></div><h4 className="mt-8 font-black uppercase text-sm">Now Playing</h4><button className="mt-12 bg-green-600 px-8 py-4 rounded-full text-[10px] font-black uppercase">Use Audio</button></div></PageWrapper>);
const ShopSector = ({user, onNav}:any) => (<PageWrapper title="SHOP" onBack={() => onNav('hub')}><div onClick={() => onNav('vault')} className="bg-orange-600 p-10 rounded-[3.5rem] text-center mb-6 shadow-2xl shadow-orange-600/20"><Gem size={40} className="mx-auto mb-2"/><h4 className="text-4xl font-black italic">{user.gems.toLocaleString()}</h4><p className="text-[10px] font-black uppercase opacity-60">Open Vault</p></div><div className="grid grid-cols-2 gap-4"><div className="bg-zinc-900 p-6 rounded-2xl text-center border border-white/5 active:bg-zinc-800 transition-all"><CreditCard size={24} className="mx-auto mb-2"/> Buy Gems</div><div className="bg-zinc-900 p-6 rounded-2xl text-center border border-white/5 active:bg-zinc-800 transition-all"><Layers size={24} className="mx-auto mb-2"/> Skins</div></div></PageWrapper>);
const AdminSector = ({onNav}:any) => (<PageWrapper title="ADMIN" onBack={() => onNav('hub')}><div className="grid grid-cols-2 gap-4 mb-6"><div className="p-6 bg-zinc-900 rounded-3xl text-center"><p className="text-xl font-black text-blue-500">5.2k</p><p className="text-[9px] font-black uppercase text-zinc-600 mt-1">Users</p></div><div className="p-6 bg-zinc-900 rounded-3xl text-center"><p className="text-xl font-black text-green-500">99.9%</p><p className="text-[9px] font-black uppercase text-zinc-600 mt-1">Health</p></div></div><div className="space-y-2"><div className="p-5 bg-zinc-900 rounded-2xl flex justify-between items-center text-[10px] font-black uppercase">Algorithm Control <ChevronRight size={14}/></div><div className="p-5 bg-zinc-900 rounded-2xl flex justify-between items-center text-[10px] font-black uppercase">Database Injection <ChevronRight size={14}/></div></div></PageWrapper>);

/* ---------------- 6. UTILS & AUTH (NO OMISSION) ---------------- */

const SplashScreen = () => (<div className="h-screen flex items-center justify-center bg-black"><h1 className="text-6xl font-black italic text-blue-600 animate-pulse">RACE-X</h1></div>);
const SignIn = ({onNav, showPass, setShowPass}:any) => (<div className="p-10 h-screen flex flex-col justify-center animate-in fade-in"><h2 className="text-5xl font-black italic uppercase mb-10">Sign In</h2><div className="space-y-4"><input className="w-full bg-zinc-900 p-6 rounded-[2rem] outline-none" placeholder="Email" /><div className="relative"><input type={showPass?"text":"password"} className="w-full bg-zinc-900 p-6 rounded-[2rem] outline-none" placeholder="Password"/><button onClick={()=>setShowPass(!showPass)} className="absolute right-6 top-6 text-zinc-600">{showPass?<EyeOff/>:<Eye/>}</button></div></div><button onClick={()=>{localStorage.setItem('rx_session','active'); onNav('hub');}} className="w-full bg-blue-600 py-6 rounded-[2rem] font-black uppercase mt-10 shadow-xl shadow-blue-600/30">Login</button><p className="text-center mt-6 text-[10px] font-black text-zinc-500" onClick={()=>onNav('signup')}>New? <span className="text-blue-500 underline">Sign Up</span></p></div>);
const SignUp = ({onNav}:any) => (<div className="p-10 h-screen flex flex-col pt-16"><button onClick={()=>onNav('signin')} className="mb-10 p-2"><ArrowLeft/></button><h2 className="text-4xl font-black italic mb-10">Sign Up</h2><div className="space-y-4"><input className="w-full bg-zinc-900 p-6 rounded-[2rem]" placeholder="Full Name"/><input className="w-full bg-zinc-900 p-6 rounded-[2rem]" placeholder="Username"/><input className="w-full bg-zinc-900 p-6 rounded-[2rem]" placeholder="Email"/></div><button onClick={()=>onNav('terms')} className="w-full bg-white text-black py-6 rounded-[2rem] font-black mt-10">Continue</button></div>);
const TermsPage = ({onNav}:any) => (<div className="p-10 h-screen flex flex-col bg-zinc-950"><h2 className="text-2xl font-black italic mb-6 text-blue-500">Legal Protocol</h2><div className="flex-1 bg-black p-8 rounded-[3rem] text-[10px] text-zinc-500 leading-relaxed overflow-auto"><p>By entering Race-X, you agree to secure your node and follow AI safety guidelines.</p></div><button onClick={()=>{localStorage.setItem('rx_session','active'); onNav('hub');}} className="w-full bg-blue-600 py-6 rounded-[2rem] font-black mt-10 uppercase tracking-widest">Agree & Activate</button></div>);

const PageWrapper = ({ title, onBack, children }: any) => (
  <div className="h-screen p-8 animate-in slide-in-from-right-10 flex flex-col bg-black">
    <div className="flex items-center justify-between mb-10 pt-4">
      <button onClick={onBack} className="p-4 bg-zinc-900 rounded-2xl active:scale-90"><ArrowLeft/></button>
      <h2 className="text-2xl font-black italic uppercase tracking-tighter">{title}</h2>
      <div className="w-14"></div>
    </div>
    <div className="flex-1 overflow-y-auto pr-1 no-scrollbar">{children}</div>
  </div>
);

const HubCard = ({ title, sub, icon, color, onClick }: any) => (
  <div onClick={onClick} className="bg-zinc-900/40 p-8 rounded-[3rem] border border-white/5 flex items-center gap-6 active:scale-95 transition-all group cursor-pointer hover:bg-zinc-900/60 shadow-lg">
    <div className={`w-20 h-20 ${color} rounded-[2rem] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>{icon}</div>
    <div className="flex-1">
      <h3 className="text-2xl font-black italic uppercase tracking-tighter">{title}</h3>
      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mt-1.5">{sub}</p>
    </div>
    <div className="p-3 bg-black/40 rounded-full"><ArrowRight size={20} className="text-zinc-600" /></div>
  </div>
);

const ActionTile = ({ title, sub, icon, onClick }: any) => (
  <div onClick={onClick} className="p-8 bg-zinc-900/50 rounded-[3rem] border border-white/5 flex items-center justify-between active:scale-95 transition-all cursor-pointer mb-4">
    <div className="flex items-center gap-6"><div className="p-4 bg-black rounded-2xl text-blue-500">{icon}</div><div><h4 className="text-sm font-black uppercase">{title}</h4><p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest mt-1">{sub}</p></div></div>
    <ArrowRight size={18} className="text-zinc-800" />
  </div>
);

const IconAction = ({icon, count, onClick}:any) => (<div className="flex flex-col items-center gap-1 cursor-pointer active:scale-125 transition-all" onClick={onClick}>{icon}<span className="text-[10px] font-black">{count}</span></div>);
const ProfileSector = ({user, onNav}:any) => (<PageWrapper title="PROFILE" onBack={() => onNav('hub')}><div className="text-center"><img src={user.avatar} className="w-32 h-32 rounded-[2.5rem] mx-auto border-4 border-blue-600 p-1 mb-6 shadow-2xl"/><h2 className="text-2xl font-black italic uppercase">{user.name}</h2><p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">{user.rank}</p><div className="grid grid-cols-3 gap-2 mt-8"><div className="bg-zinc-900 p-4 rounded-3xl"><p className="text-lg font-black italic">1.2M</p></div><div className="bg-zinc-900 p-4 rounded-3xl"><p className="text-lg font-black italic">840</p></div><div className="bg-zinc-900 p-4 rounded-3xl"><p className="text-lg font-black italic">42</p></div></div><button onClick={() => { localStorage.removeItem('rx_session'); onNav('signin'); }} className="mt-12 text-red-500 font-black uppercase text-[10px] tracking-widest bg-red-600/5 px-8 py-4 rounded-full border border-red-500/20 active:bg-red-600 active:text-white transition-all">Logout Session</button></div></PageWrapper>);
const NotifSector = ({onNav}:any) => (<PageWrapper title="ALERTS" onBack={() => onNav('hub')}><div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl"><p className="text-[10px] font-black uppercase text-blue-500">System Node: Login Successful from Redmi Node.</p></div></PageWrapper>);
const SearchSector = ({onNav}:any) => (<PageWrapper title="SEARCH" onBack={() => onNav('social')}><div className="bg-zinc-900 p-5 rounded-2xl flex items-center gap-4 text-zinc-500"><Search size={20}/><input placeholder="Discover creators..." className="bg-transparent outline-none text-xs w-full" /></div></PageWrapper>);
const DMSector = ({onNav}:any) => (<PageWrapper title="DIRECT MESSAGE" onBack={() => onNav('chat')}><div className="flex-1 flex flex-col items-center justify-center opacity-30"><MessageCircle size={80}/><h3 className="mt-4 font-black uppercase italic">Start Connection</h3></div><div className="bg-zinc-900 p-4 rounded-full flex items-center px-6"><input className="flex-1 bg-transparent outline-none text-sm" placeholder="Write..." /><Send size={20} className="text-blue-500"/></div></PageWrapper>);
const MonetizationSector = ({onNav}:any) => (<PageWrapper title="EARNINGS" onBack={() => onNav('studio')}><div className="p-10 bg-zinc-900 rounded-[3rem] text-center"><Trophy size={48} className="mx-auto mb-4 text-yellow-500"/><h3 className="text-xl font-black italic">LEVEL 1 CREATOR</h3><p className="text-[10px] uppercase font-black text-zinc-500 mt-2">Earn 4,000 more gems to level up</p></div></PageWrapper>);
const AnalyticsSector = ({onNav}:any) => (<PageWrapper title="ANALYTICS" onBack={() => onNav('studio')}><div className="space-y-4"><div className="h-40 bg-blue-600/10 rounded-[3rem] flex items-center justify-center"><BarChart3 size={40} className="text-blue-500"/></div><div className="grid grid-cols-2 gap-4"><div className="p-6 bg-zinc-900 rounded-3xl"><p className="text-[10px] font-black text-zinc-600">WATCH TIME</p><p className="text-lg font-black italic">1.2k Hr</p></div><div className="p-6 bg-zinc-900 rounded-3xl"><p className="text-[10px] font-black text-zinc-600">RETENTION</p><p className="text-lg font-black italic">84%</p></div></div></div></PageWrapper>);
const LiveSector = ({onNav}:any) => (<PageWrapper title="LIVE" onBack={() => onNav('studio')}><div className="h-full flex flex-col items-center justify-center gap-8"><div className="w-32 h-32 rounded-full border-4 border-red-600 flex items-center justify-center animate-pulse"><Radio size={60} className="text-red-600"/></div><button className="bg-red-600 w-full py-6 rounded-3xl font-black uppercase shadow-2xl shadow-red-600/20">Go Live Now</button></div></PageWrapper>);
const VaultSector = ({user, onNav}:any) => (<PageWrapper title="VAULT" onBack={() => onNav('shop')}><div className="p-10 border-2 border-orange-500/30 rounded-[3rem] text-center"><Trophy size={40} className="text-orange-500 mx-auto mb-4"/><h3 className="text-3xl font-black italic">Rank: {user.rank}</h3><p className="mt-4 text-[10px] font-black text-zinc-600 uppercase">Top 0.01% Globally</p></div></PageWrapper>);
