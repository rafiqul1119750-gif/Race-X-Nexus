import React, { useState, useEffect } from "react";
import { 
  Sparkles, MessageSquare, Share2, ShoppingCart, ArrowLeft, Send, Heart, 
  MessageCircle, Bookmark, PlusSquare, Zap, Wallet, LayoutGrid, User, Settings, 
  ShieldCheck, MoreHorizontal, Image as ImageIcon, Film, Search, Bell, Play, 
  SkipBack, SkipForward, ListMusic, Mic2, Layers, Wand2, Palette, Scissors, 
  Music as MusicIcon, Crown, Stars, Cpu, ShoppingBag, Tag, Star, Globe, Code, 
  Paperclip, Terminal, Pause, X, Users, Tv, Flag, Store, Calendar, 
  HeartHandshakes, Gift, Gem, ShieldAlert, Scale, AlertTriangle, UserX, Share, Lock
} from "lucide-react";

// --- TYPES ---
type ScreenType = "home" | "hub" | "studio" | "magic" | "social" | "shop" | "dashboard" | "music" | "starmaker" | "legal";

export default function Home() {
  const [screen, setScreen] = useState<ScreenType>("home");
  const [gems, setGems] = useState(1250);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);
  const [activeSocialTab, setActiveSocialTab] = useState("feed");
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [chatInput, setChatInput] = useState("");

  // --- 1. SECURITY PROTOCOL (3-BAR TRY RULE) ---
  const triggerSecurityCheck = () => {
    if (isFrozen) return;
    const newCount = failedAttempts + 1;
    setFailedAttempts(newCount);
    if (newCount >= 3) {
      setIsFrozen(true);
      alert("⚠️ CRITICAL: 3 Failed attempts. Account Permanent Freeze triggered.");
    } else {
      alert(`⚠️ Security Warning: ${3 - newCount} attempts left before Freeze!`);
    }
  };

  // --- 2. AUTO SHARE LINK (ANDROID/IOS) ---
  const handleInvite = () => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const link = `https://race-x.app/invite?ref=ADMIN_NEXUS&os=${isIOS ? 'ios' : 'android'}`;
    navigator.clipboard.writeText(link);
    alert("🚀 Smart Link Generated & Copied! 100 💎 Gems reward pending.");
  };

  // --- 3. GIFTING SYSTEM ---
  const handleGift = (amount: number) => {
    if (gems >= amount) {
      setGems(prev => prev - amount);
      alert(`💎 ${amount} Gems Gifted to Creator!`);
    } else {
      alert("❌ Insufficient Gems! Visit Market.");
    }
  };

  return (
    <div className={`min-h-screen ${isFrozen ? 'grayscale brightness-50 pointer-events-none' : ''} bg-[#020202] text-white font-sans overflow-x-hidden`}>
      
      {/* --- PERSISTENT HEADER --- */}
      {screen !== "home" && (
        <div className="fixed top-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-3xl border-b border-white/5 z-[100] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen("hub")} className="p-2.5 rounded-2xl bg-white/5"><ArrowLeft size={20}/></button>
            <h1 className="text-xl font-black italic tracking-tighter bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent underline decoration-blue-500/30">RACE-X</h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-zinc-900 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg shadow-cyan-500/10">
                <Gem size={14} className="text-cyan-400 animate-pulse"/>
                <span className="text-xs font-black italic">{gems}</span>
             </div>
             {isFrozen && <Lock className="text-red-500" size={18}/>}
          </div>
        </div>
      )}

      <div className={screen !== "home" ? "pt-24 pb-44" : ""}>

        {/* --- SCREEN: LEGAL, TERMS & 18+ SAFETY --- */}
        {screen === "legal" && (
          <div className="px-6 space-y-8 animate-in slide-in-from-bottom-10">
             <h2 className="text-3xl font-black italic uppercase">Legal & Safety</h2>
             <div className="space-y-4">
                <SafetyCard icon={<ShieldAlert className="text-red-500"/>} title="18+ & Adult Policy" desc="Strict age-gate active. NSFW content results in immediate IP ban." />
                <SafetyCard icon={<AlertTriangle className="text-yellow-500"/>} title="Copyright Scanner" desc="Pro-active AI scanning for stolen content. 3 strikes = Permanent Deletion." />
                <SafetyCard icon={<UserX className="text-zinc-500"/>} title="Account Lifecycle" desc="30d Inactive: List | 60d: Freeze | 90d: Permanent Delete." />
                <SafetyCard icon={<Scale className="text-blue-500"/>} title="T&C / Privacy" desc="Nexus Decentralized Protocol v4.0. Your data is encrypted." />
             </div>
             <button onClick={triggerSecurityCheck} className="w-full py-4 bg-red-600/10 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase italic">Simulate Security Breach</button>
          </div>
        )}

        {/* --- SCREEN: SOCIAL (FACEBOOK ENGINE + GIFTING) --- */}
        {screen === "social" && (
          <div className="animate-in fade-in">
             <div className="flex justify-around border-b border-white/5 bg-black sticky top-0 z-50 overflow-x-auto no-scrollbar">
                <Tab icon={<LayoutGrid/>} active={activeSocialTab === 'feed'} onClick={() => setActiveSocialTab('feed')} />
                <Tab icon={<Users/>} active={activeSocialTab === 'groups'} onClick={() => setActiveSocialTab('groups')} />
                <Tab icon={<Tv/>} active={activeSocialTab === 'watch'} onClick={() => setActiveSocialTab('watch')} />
                <Tab icon={<Flag/>} active={activeSocialTab === 'pages'} onClick={() => setActiveSocialTab('pages')} />
                <Tab icon={<Bell/>} active={activeSocialTab === 'notif'} onClick={() => setActiveSocialTab('notif')} />
             </div>
             {activeSocialTab === 'feed' && (
               <div className="p-0 space-y-4">
                  <div className="p-4 flex gap-3 items-center bg-zinc-950 border-b border-white/5">
                     <div className="w-10 h-10 rounded-full bg-blue-600 shadow-lg shadow-blue-600/20"></div>
                     <div className="flex-1 bg-zinc-900 rounded-full px-4 py-2 text-xs font-bold text-zinc-600">What's on your mind?</div>
                     <ImageIcon className="text-green-500" size={20}/>
                  </div>
                  <PostCard user="Nexus_Dev" img="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800" onGift={() => handleGift(50)} />
               </div>
             )}
          </div>
        )}

        {/* --- SCREEN: STUDIO (CANVA + TEMPLATES + API) --- */}
        {screen === "studio" && (
          <div className="px-5 space-y-8 animate-in zoom-in-95">
             <div className="bg-zinc-900/60 p-8 rounded-[3rem] border border-cyan-500/20">
                <h2 className="text-xl font-black italic uppercase text-cyan-400 mb-6 flex items-center gap-2"><Sparkles/> AI Config</h2>
                <div className="space-y-3 mb-6">
                   <ApiInput label="OpenAI Endpoint" placeholder="sk-nexus-..." />
                   <ApiInput label="HuggingFace API" placeholder="hf_token_..." />
                </div>
                <div className="grid grid-cols-4 gap-4">
                   <Tool icon={<Layers/>} /> <Tool icon={<Palette/>} /> <Tool icon={<Scissors/>} /> <Tool icon={<Cpu/>} />
                </div>
             </div>
             <div>
                <h3 className="text-xs font-black italic uppercase text-blue-500 mb-4 px-2">Inbuilt Pro Templates</h3>
                <div className="grid grid-cols-2 gap-4">
                   <TemplateCard title="Cyber Viral" img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400" />
                   <TemplateCard title="Hyper-Studio" img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400" />
                </div>
             </div>
          </div>
        )}

        {/* --- SCREEN: MUSIC (VOICE ADS INTEGRATED) --- */}
        {screen === "music" && (
          <div className="px-5 space-y-6 animate-in fade-in">
             <h2 className="text-2xl font-black italic uppercase">Nexus Music</h2>
             <div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 flex items-center justify-between" onClick={() => { setIsAdPlaying(true); setTimeout(() => setIsAdPlaying(false), 5000); }}>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center font-black">RX</div>
                   <div><p className="text-sm font-black italic uppercase">Cyber Synth v4</p><p className="text-[10px] text-zinc-500 uppercase">Voice Ad Active</p></div>
                </div>
                <Play className="text-green-500"/>
             </div>
             {isAdPlaying && (
               <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center gap-3 animate-pulse">
                  <Mic2 size={16} className="text-blue-400"/>
                  <p className="text-[10px] font-black italic text-blue-400 uppercase tracking-widest">Streaming Nexus Voice Ad...</p>
               </div>
             )}
          </div>
        )}

        {/* --- HUB (ENTRY) --- */}
        {screen === "hub" && (
          <div className="p-5 grid grid-cols-1 gap-5 max-w-[500px] mx-auto animate-in slide-in-from-bottom-10">
            <HubBtn title="SOCIAL HUB" sub="FB ENGINE + GIFTING" icon={<Users size={30}/>} color="from-blue-600 to-blue-400" onClick={() => setScreen("social")} />
            <HubBtn title="AI STUDIO" sub="TEMPLATES + API" icon={<Sparkles size={30}/>} color="from-cyan-600 to-indigo-600" onClick={() => setScreen("studio")} />
            <HubBtn title="MAGIC CHAT" sub="GEMINI ULTRA PRO" icon={<MessageSquare size={30}/>} color="from-purple-600 to-pink-600" onClick={() => setScreen("magic")} />
            <div className="grid grid-cols-2 gap-4">
              <HubBtn title="MUSIC" sub="VOICE ADS" icon={<Play/>} color="from-green-600 to-emerald-500" onClick={() => setScreen("music")} />
              <HubBtn title="LEGAL" sub="RULES & 18+" icon={<ShieldCheck/>} color="from-zinc-800 to-zinc-950" onClick={() => setScreen("legal")} />
            </div>
            <div className="bg-gradient-to-r from-indigo-900 to-blue-900 p-8 rounded-[2.5rem] border border-white/10 flex justify-between items-center cursor-pointer active:scale-95 transition" onClick={handleInvite}>
               <div><h2 className="text-xl font-black italic uppercase text-white">Invite Friends</h2><p className="text-[10px] font-bold text-indigo-300 uppercase">Gift 100 💎 Both</p></div>
               <Share className="text-white"/>
            </div>
          </div>
        )}

        {/* --- SCREEN: MAGIC CHAT (GEMINI ULTRA) --- */}
        {screen === "magic" && (
           <div className="px-4 h-[70vh] flex flex-col animate-in fade-in">
              <div className="flex-1 overflow-y-auto space-y-6 pt-4 no-scrollbar">
                 <AiMsg text="Nexus Gemini Ultra Online. All Security Protocols active. 18+ Filter engaged. How can I assist, Admin?" />
              </div>
              <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-2 flex items-center gap-2">
                 <button className="p-3 text-zinc-500"><Paperclip size={20}/></button>
                 <input className="bg-transparent flex-1 outline-none text-sm font-bold" placeholder="Command Nexus..." />
                 <button className="p-3.5 bg-white text-black rounded-full active:scale-90 transition"><Send size={20}/></button>
              </div>
           </div>
        )}

        {/* --- WELCOME SCREEN --- */}
        {screen === "home" && (
          <div className="h-screen flex flex-col items-center justify-center bg-black" onClick={() => setScreen("hub")}>
             <div className="w-36 h-36 bg-blue-600 rounded-[3.5rem] rotate-12 flex items-center justify-center text-6xl font-black italic shadow-[0_0_60px_rgba(37,99,235,0.4)] border-4 border-white/10">RX</div>
             <button className="mt-16 px-20 py-5 bg-white text-black font-black italic rounded-full tracking-[0.3em] uppercase hover:bg-blue-500 hover:text-white transition-all shadow-2xl">Initialize</button>
          </div>
        )}
      </div>

      {/* --- MASTER BOTTOM NAV --- */}
      {screen !== "home" && (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-black/95 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-2 z-[100]">
          <Nav icon={<Share2/>} active={screen === 'social'} onClick={() => setScreen('social')} />
          <Nav icon={<Sparkles/>} active={screen === 'studio'} onClick={() => setScreen('studio')} />
          <Nav icon={<ShieldCheck size={28} className="text-blue-500"/>} active={screen === 'legal'} onClick={() => setScreen('legal')} />
          <Nav icon={<Play/>} active={screen === 'music'} onClick={() => setScreen('music')} />
          <Nav icon={<ShoppingCart/>} active={screen === 'hub'} onClick={() => setScreen('hub')} />
        </div>
      )}
    </div>
  );
}

// --- SHARED COMPONENTS ---
function SafetyCard({ icon, title, desc }: any) {
  return (
    <div className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-white/5 flex gap-4 items-start">
       <div className="p-3 bg-black/40 rounded-2xl">{icon}</div>
       <div><h3 className="text-sm font-black italic uppercase text-white">{title}</h3><p className="text-[10px] font-bold text-zinc-500 mt-1 leading-relaxed">{desc}</p></div>
    </div>
  );
}

function PostCard({ user, img, onGift }: any) {
  return (
    <div className="bg-zinc-950/50 border-y border-white/5">
      <div className="flex justify-between p-4 items-center">
        <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-600"></div><span className="text-xs font-black italic uppercase">{user}</span></div>
        <MoreHorizontal size={18} className="text-zinc-700" />
      </div>
      <img src={img} className="w-full aspect-square object-cover" />
      <div className="p-6 flex justify-between items-center">
         <div className="flex gap-6"><Heart size={24}/><MessageCircle size={24}/><Share2 size={24}/></div>
         <button onClick={onGift} className="bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-2.5 rounded-full text-black font-black italic text-[10px] active:scale-95 shadow-lg shadow-orange-500/20 flex items-center gap-2"><Gift size={16}/> GIFT DIAMOND</button>
      </div>
    </div>
  );
}

function ApiInput({ label, placeholder }: any) {
  return (
    <div className="space-y-1.5">
       <p className="text-[8px] font-black text-zinc-500 uppercase px-2">{label}</p>
       <input className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-cyan-500" placeholder={placeholder} />
    </div>
  );
}

function TemplateCard({ title, img }: any) {
  return (
    <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 active:scale-95 transition-all group" onClick={() => alert(`Template ${title} Active`)}>
       <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
       <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black to-transparent">
          <p className="text-[10px] font-black italic uppercase text-white">{title}</p>
          <div className="flex items-center gap-1 mt-1"><Crown size={10} className="text-yellow-400"/><span className="text-[8px] font-bold text-yellow-400 uppercase">PRO</span></div>
       </div>
    </div>
  );
}

function HubBtn({ title, sub, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className={`relative p-8 rounded-[2.5rem] bg-gradient-to-br ${color} active:scale-95 transition-all cursor-pointer border border-white/5 shadow-2xl`}>
      <div className="relative z-10 flex flex-col gap-4">
        <div className="p-3 bg-black/20 w-fit rounded-2xl backdrop-blur-md">{icon}</div>
        <div><h2 className="text-2xl font-black italic uppercase tracking-tighter">{title}</h2><p className="text-[10px] font-black text-white/60 uppercase tracking-widest">{sub}</p></div>
      </div>
    </div>
  );
}

function AiMsg({ text }: any) {
  return (
    <div className="flex gap-4 animate-in slide-in-from-left-5">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20"><Stars size={16}/></div>
      <div className="p-4 rounded-[1.8rem] rounded-tl-none bg-zinc-900/60 border border-white/5 text-sm font-bold italic leading-relaxed text-zinc-200 max-w-[85%]">{text}</div>
    </div>
  );
}

function Tab({ icon, active, onClick }: any) {
  return <button onClick={onClick} className={`flex-1 py-4 flex justify-center transition-all ${active ? 'text-blue-500 border-b-2 border-blue-500' : 'text-zinc-600'}`}>{icon}</button>;
}

function Tool({ icon }: any) {
  return <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-cyan-400 active:scale-90 transition cursor-pointer flex justify-center items-center">{icon}</div>;
}

function Nav({ icon, active, onClick, className }: any) {
  return <button onClick={onClick} className={`transition-all duration-300 ${active ? 'text-blue-500 scale-125' : 'text-zinc-600 opacity-60'} ${className}`}>{icon}</button>;
}
