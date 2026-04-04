import React, { useState, useEffect, useRef } from "react";
import {
  Zap, Sparkles, Globe, Library, Plus, Gem,
  LayoutGrid, Video, Users, MessageSquare, Music, ShoppingBag,
  Settings, Heart, MessageCircle, Send, Play, Disc, ArrowLeft, Bell, Crown, Pause, Activity, ShoppingCart, X, Eye, EyeOff
} from "lucide-react";
// Appwrite Imports
import { account, ID } from "@/lib/appwrite";

/* ================= HELPERS ================= */
const Store = {
  get: (k: string, d: any) => JSON.parse(localStorage.getItem(k) || JSON.stringify(d)),
  set: (k: string, v: any) => localStorage.setItem(k, JSON.stringify(v)),
  clear: () => localStorage.clear()
};

/* ================= SPLASH ================= */
function Splash({ onDone }: any) {
  useEffect(() => { const t = setTimeout(onDone, 1800); return () => clearTimeout(t); }, []);
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.4)] animate-pulse">
        <span className="text-4xl font-black italic text-white tracking-tighter">RX</span>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <h2 className="text-zinc-500 font-black tracking-[0.4em] text-[10px] uppercase">Race-X Nexus</h2>
        <div className="w-32 h-1 bg-zinc-900 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 animate-[loading_1.8s_ease-in-out]" style={{width: '100%'}}/>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN MASTER APP ================= */
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("hub");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Auth States
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // App States
  const [reels, setReels] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [likedReels, setLikedReels] = useState<number[]>([]);
  const [showNotify, setShowNotify] = useState(false);
  const [serverLoad, setServerLoad] = useState(32);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- Real Auth Session Check ---
  useEffect(() => {
    const checkSession = async () => {
      try {
        const activeUser = await account.get();
        setUser({ name: activeUser.name, email: activeUser.email, gems: 7500 });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();

    // Data Seed
    setReels(Array.from({ length: 10 }, (_, i) => ({
      id: i, url: "https://www.w3schools.com/html/mov_bbb.mp4",
      caption: `Trending AI Content #${i + 1} #RaceX`, likes: Math.floor(Math.random() * 500) + "K"
    })));
    setSongs(Array.from({ length: 8 }, (_, i) => ({
      id: i, title: `RX Track ${i + 1}`, artist: "AI Beats",
      url: "https://www.w3schools.com/html/horse.mp3",
      cover: `https://picsum.photos/seed/song${i}/200/200`
    })));
  }, []);

  // --- Handlers ---
  const handleAuth = async () => {
    if (!email || !password) return alert("Fill all fields, Bhai!");
    try {
      if (isLogin) {
        await account.createEmailPasswordSession(email, password);
      } else {
        await account.create(ID.unique(), email, password, "RX-User");
        await account.createEmailPasswordSession(email, password);
      }
      const activeUser = await account.get();
      setUser({ name: activeUser.name, email: activeUser.email, gems: 7500 });
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  const handleLogout = async () => {
    await account.deleteSession('current');
    setUser(null);
    Store.clear();
  };

  const toggleLike = (id: number) => {
    setLikedReels(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const sendChat = () => {
    if (!inputMsg) return;
    const newMsgs = [...messages, { role: "user", text: inputMsg }];
    setMessages(newMsgs); setInputMsg("");
    setTimeout(() => {
      setMessages([...newMsgs, { role: "ai", text: "RX-Nexus connected. Systems stable. ⚡" }]);
    }, 1000);
  };

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;

  // --- AUTH SCREEN (When no user is logged in) ---
  if (!user) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-8 font-sans">
        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] mx-auto mb-6 flex items-center justify-center font-black text-3xl shadow-[0_0_40px_rgba(37,99,235,0.3)]">RX</div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase">{isLogin ? "Enter the Nexus" : "Join the Nexus"}</h1>
        </div>
        <div className="w-full space-y-4 max-w-sm">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="EMAIL" className="w-full bg-zinc-900 border border-white/5 p-5 rounded-2xl text-center font-bold tracking-widest focus:border-blue-600 transition-all outline-none" />
          <div className="relative">
            <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="PASSWORD" className="w-full bg-zinc-900 border border-white/5 p-5 rounded-2xl text-center font-bold tracking-widest focus:border-blue-600 transition-all outline-none" />
            <button onClick={() => setShowPass(!showPass)} className="absolute right-5 top-5 text-zinc-500">
              {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>
          </div>
          <button onClick={handleAuth} className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg active:scale-95 transition">
            {isLogin ? "Authorize" : "Create Account"}
          </button>
          <p className="text-center text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-4">
            {isLogin ? "Need access?" : "Already verified?"} 
            <span onClick={() => setIsLogin(!isLogin)} className="text-blue-500 ml-2 cursor-pointer underline">
              {isLogin ? "Join Now" : "Login"}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // --- LOGGED IN CONTENT ---
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-600/30 overflow-hidden">
      
      {/* NOTIFICATION OVERLAY */}
      {showNotify && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[6000] p-8 animate-in fade-in zoom-in-95">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black italic uppercase text-blue-500">Alerts</h2>
            <X onClick={() => setShowNotify(false)} className="text-zinc-500 cursor-pointer" />
          </div>
          <div className="space-y-4">
            <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
              <p className="text-[10px] font-black text-blue-500 uppercase mb-1">System Update</p>
              <p className="text-sm font-bold">Race-X Kernel v4.2.0 Live on Render.</p>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 p-6 pt-12 bg-black/80 backdrop-blur-2xl border-b border-white/5 z-[4000] flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab("hub")}>
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg active:scale-90 transition">
            <Crown size={20} className="fill-white"/>
          </div>
          <div>
            <h2 className="text-lg font-black italic text-blue-500 uppercase tracking-tighter leading-none">{activeTab}</h2>
            <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mt-1">{user.name} • Online</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-end mr-2">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-tighter">{user.gems} GEMS</span>
            <div className="w-12 h-[2px] bg-zinc-800 mt-1 rounded-full overflow-hidden">
               <div className="h-full bg-cyan-400" style={{width: '70%'}}/>
            </div>
          </div>
          <Bell onClick={() => setShowNotify(true)} size={22} className="text-zinc-500 cursor-pointer" />
          <Settings onClick={handleLogout} size={22} className="text-zinc-500 hover:text-red-500 cursor-pointer transition" />
        </div>
      </header>

      {/* CONTENT ENGINE */}
      <main className={`pt-32 pb-44 ${activeTab === 'social' ? 'px-0' : 'px-6'} max-w-[600px] mx-auto h-screen overflow-y-auto scrollbar-hide`}>

        {/* HUB */}
        {activeTab === "hub" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-[2.8rem] bg-gradient-to-br from-blue-900/30 via-zinc-950 to-black p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Activity size={80} className="text-blue-500"/>
               </div>
               <h1 className="text-4xl font-black italic uppercase leading-[0.9] tracking-tighter mb-4">THE <br /> <span className="text-blue-600">NEXUS</span></h1>
               <div className="flex gap-4 mt-8">
                  <button onClick={() => setActiveTab("infra")} className="bg-white/10 px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">Infra Status</button>
               </div>
            </div>
            <HubCard title="RX Social" color="bg-indigo-600" icon={<Video size={35}/>} onClick={() => setActiveTab("social")} />
            <HubCard title="RX Music" color="bg-sky-500" icon={<Music size={35}/>} onClick={() => setActiveTab("music")} />
            <HubCard title="RX Chat" color="bg-zinc-800 border-2 border-blue-600/30" icon={<MessageSquare size={35} className="text-blue-500"/>} onClick={() => setActiveTab("chat")} />
            <HubCard title="RX Studio" color="bg-cyan-400 text-black" icon={<Zap size={35} className="fill-black"/>} onClick={() => setActiveTab("studio")} />
            <HubCard title="RX Shop" color="bg-orange-500" icon={<ShoppingBag size={35}/>} onClick={() => setActiveTab("shop")} />
          </div>
        )}

        {/* SOCIAL (Reels) */}
        {activeTab === "social" && (
          <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
            {reels.map((r) => (
              <div key={r.id} className="h-[78vh] w-full snap-start relative bg-zinc-900 mb-4 rounded-[3rem] overflow-hidden border border-white/5">
                <video src={r.url} autoPlay muted loop className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-12 left-8 right-20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white/20 flex items-center justify-center font-black text-[10px]">RX</div>
                    <span className="font-black italic text-white uppercase text-xs tracking-widest">RX_Universe</span>
                  </div>
                  <p className="text-sm font-bold text-white/90 leading-relaxed mb-6">{r.caption}</p>
                </div>
                {/* Sidebar */}
                <div className="absolute bottom-16 right-6 flex flex-col gap-8 items-center">
                   <div onClick={() => toggleLike(r.id)} className="flex flex-col items-center gap-1 cursor-pointer">
                      <Heart size={32} className={`${likedReels.includes(r.id) ? 'fill-red-500 text-red-500' : 'text-white'} transition-all`} />
                      <span className="text-[10px] font-black uppercase">{r.likes}</span>
                   </div>
                   <MessageCircle size={32} className="text-white" />
                   <Send size={32} className="text-white cursor-pointer" />
                   <div className="w-12 h-12 rounded-full border-4 border-zinc-800 flex items-center justify-center bg-black overflow-hidden animate-spin-slow">
                      <Disc size={24} className="text-blue-500" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CHAT (AI) */}
        {activeTab === "chat" && (
          <div className="h-[72vh] flex flex-col bg-zinc-950 rounded-[3rem] border border-white/5 overflow-hidden">
             <div className="p-6 border-b border-white/5 bg-zinc-900/20 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">RX-AI Online</span>
             </div>
             <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[85%] p-5 rounded-[2rem] text-[13px] font-bold leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-zinc-800 text-zinc-200 rounded-tl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
             </div>
             <div className="p-6 bg-zinc-900/40 backdrop-blur-xl border-t border-white/5 flex gap-3">
                <input value={inputMsg} onChange={e => setInputMsg(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendChat()} placeholder="Sync with AI..." className="flex-1 bg-zinc-900 p-5 rounded-full text-sm font-bold border border-white/5 outline-none focus:border-blue-600 transition-all" />
                <button onClick={sendChat} className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center active:scale-90 transition"><Send size={20}/></button>
             </div>
          </div>
        )}

        {/* MUSIC */}
        {activeTab === "music" && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-black italic uppercase text-blue-500 mb-8 tracking-tighter">The Audio Vault</h2>
            {songs.map((s) => (
              <div key={s.id} onClick={() => {
                setPlayingId(s.id);
                if (audioRef.current) {
                  audioRef.current.src = s.url;
                  audioRef.current.play();
                }
              }} 
              className={`p-6 rounded-[2.5rem] border transition-all cursor-pointer flex items-center justify-between ${playingId === s.id ? 'bg-blue-600 border-transparent shadow-2xl scale-[1.02]' : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900'}`}>
                <div className="flex items-center gap-5">
                  <img src={s.cover} className={`w-16 h-16 rounded-2xl object-cover shadow-lg ${playingId === s.id ? 'animate-pulse' : ''}`} alt="cover" />
                  <div>
                    <h3 className="font-black italic text-sm uppercase tracking-tight">{s.title}</h3>
                    <p className={`text-[10px] font-black uppercase ${playingId === s.id ? 'text-white/70' : 'text-zinc-500'}`}>{s.artist}</p>
                  </div>
                </div>
                {playingId === s.id ? <Pause size={24} /> : <Play size={24} className="text-zinc-600 fill-zinc-600" />}
              </div>
            ))}
            <audio ref={audioRef} className="hidden" onEnded={() => setPlayingId(null)} />
          </div>
        )}

      </main>

      {/* FOOTER NAV */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-zinc-900/90 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-4 z-[5000]">
        <NavIcon label="Hub" icon={<LayoutGrid size={22}/>} active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
        <NavIcon label="Social" icon={<Video size={22}/>} active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <NavIcon label="Chat" icon={<MessageSquare size={22}/>} active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <NavIcon label="Music" icon={<Music size={22}/>} active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <NavIcon label="Shop" icon={<ShoppingBag size={22}/>} active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function HubCard({ title, color, icon, onClick }: any) {
  return (
    <div onClick={onClick} className={`${color} rounded-[2.5rem] p-10 flex justify-between items-center active:scale-[0.98] transition-all cursor-pointer shadow-xl relative overflow-hidden group`}>
      <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none relative z-10">{title}</h2>
      <div className="relative z-10">{icon}</div>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-2 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-500'}`}>
      <div className={`transition-all duration-300 ${active ? 'bg-blue-600/10 p-3 rounded-2xl border border-blue-600/20' : 'p-1'}`}>{icon}</div>
      <span className="text-[8px] font-black uppercase tracking-[0.1em]">{label}</span>
    </button>
  );
}
