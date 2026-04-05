import React, { useState, useEffect, useRef } from "react";
import {
  Zap, Sparkles, Plus, Gem, LayoutGrid, Video, MessageSquare, Music, ShoppingBag,
  Settings, Heart, MessageCircle, Send, Play, X, Image as ImageIcon, 
  Search, MoreHorizontal, Share2, Bell, Crown, ShoppingCart, User, 
  Mic, Music2, Scissors, Wand2, Star, Filter, CreditCard, Package, 
  Truck, ExternalLink, Smile, Camera, Globe, Bookmark, History, 
  Flame, Menu, MoreVertical, ChevronRight, Layers, Volume2, Home as HomeIcon,
  Download, ListMusic, Disc, Radio, Repeat, Shuffle, SkipBack, SkipForward,
  MapPin, CheckCircle, Gift, CreditCard as CardIcon, Lock, Shield, LogIn, LogOut
} from "lucide-react";

// --- 1. REAL SPLASH COMPONENT ---
function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
      <div className="relative mb-8">
        <div className="w-28 h-28 border-[6px] border-blue-500/10 border-t-blue-600 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-black italic text-blue-500">X</div>
      </div>
      <h1 className="text-5xl font-black italic tracking-tighter text-white mb-2 animate-pulse">RACE-X</h1>
      <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.6em]">Neural Link v4.0</p>
      <div className="absolute bottom-20 w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 animate-[progress_2.5s_linear]" style={{ width: '100%' }} />
      </div>
      <style>{`@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );
}

// --- 2. AUTH SCREEN (ADMIN + USER LOGIN) ---
function AuthScreen({ onLogin }: any) {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-10 gap-6">
      <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center mb-4 shadow-[0_0_50px_rgba(37,99,235,0.3)] rotate-12">
        <Lock className="text-white" size={44} />
      </div>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">Race-X Nexus</h2>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Accessing Omniverse Nodes</p>
      </div>
      
      <button onClick={() => onLogin("user")} className="w-full max-w-sm bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
        <LogIn size={20}/> User Portal
      </button>
      
      <button onClick={() => onLogin("admin")} className="w-full max-w-sm bg-zinc-900 text-red-500 border border-red-500/30 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-500/10 transition-all">
        <Shield size={20}/> Admin Control
      </button>
    </div>
  );
}

// --- 3. MAIN OMNIVERSE APP ---
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<"user" | "admin" | null>(null);
  const [activeTab, setActiveTab] = useState("hub");
  const [userLink, setUserLink] = useState("");
  
  // Data States
  const [posts, setPosts] = useState<any[]>([]);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [music, setMusic] = useState<any[]>([]);
  const [shop, setShop] = useState<any[]>([]);
  
  const [postContent, setPostContent] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [config, setConfig] = useState({ API: "https://race-x-nexus.onrender.com/api" });

  useEffect(() => {
    const id = localStorage.getItem("rx_user_id") || Math.random().toString(36).substr(2, 9);
    localStorage.setItem("rx_user_id", id);
    setUserLink(`${window.location.origin}/user/${id}`);
  }, []);

  const handleLogin = (selectedRole: "user" | "admin") => {
    setUser({ id: 'rx_01', name: selectedRole === 'admin' ? 'Race-X Admin' : 'Nexus Explorer', gems: 7500 });
    setRole(selectedRole);
  };

  const logout = () => { setUser(null); setRole(null); setActiveTab("hub"); };

  // Fetch Logic
  useEffect(() => {
    if (user && role === "user") {
      fetch(`${config.API}/social/feed`).then(r => r.json()).then(d => setPosts(d.posts || [])).catch(() => {});
      fetch(`${config.API}/music`).then(r => r.json()).then(d => setMusic(d.music || [])).catch(() => {});
      fetch(`${config.API}/shop`).then(r => r.json()).then(d => setShop(d.products || [])).catch(() => {});
    }
  }, [user, role, config]);

  const handlePostSubmit = () => {
    if (!postContent) return;
    const newPost = { id: Date.now(), user_name: user.name, content: postContent, timestamp: new Date().toISOString() };
    setPosts([newPost, ...posts]);
    setPostContent("");
    setIsPostModalOpen(false);
  };

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;
  if (!user) return <AuthScreen onLogin={handleLogin} />;

  // --- ADMIN PORTAL VIEW ---
  if (role === "admin") {
    return (
      <div className="min-h-screen bg-black text-white p-6 font-sans">
        <header className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
          <h1 className="text-2xl font-black italic flex items-center gap-3 text-red-500">
            <Shield size={32}/> ADMIN CONTROL
          </h1>
          <button onClick={logout} className="p-3 bg-zinc-900 rounded-full"><LogOut/></button>
        </header>

        <div className="space-y-8 max-w-lg mx-auto">
          <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Shareable User Link</label>
            <div className="flex gap-2 mt-2">
              <input readOnly value={userLink} className="flex-1 bg-black p-4 rounded-xl text-xs font-mono border border-white/10 outline-none" />
              <button onClick={() => navigator.clipboard.writeText(userLink)} className="bg-blue-600 px-4 rounded-xl font-black text-xs">COPY</button>
            </div>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">API Configuration</label>
            <input value={config.API} onChange={(e) => setConfig({ ...config, API: e.target.value })} className="w-full bg-black p-4 rounded-xl mt-2 text-sm border border-white/10 outline-none" />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button onClick={() => setPosts([])} className="bg-zinc-800 p-4 rounded-2xl font-black uppercase text-xs tracking-widest text-left flex justify-between">Clear Global Feed <X size={16}/></button>
            <button onClick={() => setChatHistory([])} className="bg-zinc-800 p-4 rounded-2xl font-black uppercase text-xs tracking-widest text-left flex justify-between">Reset AI Context <Sparkles size={16}/></button>
            <button className="bg-red-600/20 text-red-500 p-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] mt-4">Wipe All Nexus Data</button>
          </div>
        </div>
      </div>
    );
  }

  // --- USER PORTAL VIEW (PREMIUM UI) ---
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#121212]/80 backdrop-blur-2xl border-b border-white/5 z-[5000] flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-blue-600/20 text-xl">X</div>
          <span className="text-2xl font-black italic tracking-tighter uppercase">
            {activeTab === 'social' ? 'Facebook' : activeTab === 'music' ? 'Spotify' : 'Race-X'}
          </span>
        </div>
        <button onClick={logout} className="bg-zinc-900 p-2 rounded-lg opacity-50 hover:opacity-100 transition-opacity"><LogOut size={18}/></button>
      </header>

      <main className="pt-16 pb-28 max-w-[600px] mx-auto min-h-screen border-x border-white/5 bg-black">
        {activeTab === "hub" && (
          <div className="p-6 space-y-6 animate-in fade-in zoom-in-95 duration-500">
             <div className="bg-gradient-to-br from-blue-600/20 via-black to-black p-10 rounded-[3.5rem] border border-blue-500/20 relative overflow-hidden">
                <Crown className="absolute -right-6 -top-6 text-blue-500 opacity-10" size={150} />
                <h1 className="text-5xl font-black italic mb-2 uppercase tracking-tighter leading-none text-white">The <br/>Nexus Hub</h1>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] flex items-center gap-2">Neural System Online</p>
             </div>
             <div className="grid grid-cols-2 gap-5">
                <HubCard title="Rx Social" sub="Facebook Clone" icon={<LayoutGrid size={36}/>} color="bg-blue-600" onClick={() => setActiveTab('social')} />
                <HubCard title="Rx Studio" sub="AI Lab" icon={<Zap size={36}/>} color="bg-purple-600" onClick={() => setActiveTab('studio')} />
                <HubCard title="Rx Music" sub="Spotify Clone" icon={<Music size={36}/>} color="bg-green-600" onClick={() => setActiveTab('music')} />
                <HubCard title="Rx Market" sub="Amazon Clone" icon={<ShoppingBag size={36}/>} color="bg-orange-600" onClick={() => setActiveTab('shop')} />
                <HubCard title="Magic Chat" sub="Gemini 1.5" icon={<Sparkles size={36}/>} color="bg-indigo-600" onClick={() => setActiveTab('chat')} />
                <HubCard title="System" sub="God Mode" icon={<Settings size={36}/>} color="bg-zinc-800" />
             </div>
          </div>
        )}

        {/* --- SOCIAL FEED --- */}
        {activeTab === "social" && (
          <div className="animate-in fade-in duration-500">
             <div className="bg-[#121212] p-5 mb-2 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 shrink-0 shadow-lg" />
                <button onClick={() => setIsPostModalOpen(true)} className="flex-1 bg-zinc-800/50 text-left px-6 py-3 rounded-full text-zinc-400 text-sm font-bold border border-white/5">What's on your mind?</button>
             </div>
             <div className="space-y-2">{posts.map(p => <SocialCard key={p.id} post={p} />)}</div>
          </div>
        )}

        {/* --- AI CHAT --- */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-[78vh] animate-in fade-in">
             <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3"><Sparkles className="text-indigo-400" /><span className="font-black italic uppercase tracking-tighter text-lg">Magic Gemini 1.5</span></div>
             </div>
             <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {chatHistory.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`p-5 rounded-[1.5rem] max-w-[85%] text-sm font-bold ${m.role === 'user' ? 'bg-indigo-600 rounded-tr-none text-white' : 'bg-zinc-800 rounded-tl-none text-zinc-200'}`}>{m.text}</div>
                  </div>
                ))}
             </div>
             <div className="p-6 bg-black">
                <div className="bg-[#121212] rounded-3xl p-3 flex items-center gap-3 border border-white/10 shadow-2xl">
                   <input value={msgInput} onChange={(e)=>setMsgInput(e.target.value)} placeholder="Ask Nexus Intelligence..." className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-white px-4" />
                   <button onClick={()=>{setChatHistory([...chatHistory,{role:'user',text:msgInput},{role:'bot',text:'Processing in Nexus...'}]); setMsgInput("")}} className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition"><Send size={20}/></button>
                </div>
             </div>
          </div>
        )}

        {/* --- MUSIC CLONE --- */}
        {activeTab === "music" && (
          <div className="p-6 space-y-8 animate-in fade-in">
             <h2 className="text-4xl font-black italic text-green-500 uppercase">Spotify</h2>
             <div className="grid grid-cols-1 gap-3">
                {music.length > 0 ? music.map((track, i) => (
                   <div key={i} className="bg-zinc-900/50 p-4 rounded-xl flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center"><Music className="text-black"/></div>
                      <div className="flex-1">
                        <p className="text-sm font-black uppercase text-white">{track.title || "Nexus Track"}</p>
                        <audio src={track.url} controls className="h-8 w-full mt-2 filter invert opacity-50" />
                      </div>
                   </div>
                )) : <p className="text-zinc-500 text-xs text-center font-black uppercase tracking-widest py-20">No Tracks Found in Nexus Node</p>}
             </div>
          </div>
        )}

        {/* --- SHOP CLONE --- */}
        {activeTab === "shop" && (
          <div className="p-6 grid grid-cols-2 gap-4 animate-in slide-in-from-right-10">
            {shop.map((item, i) => (
              <div key={i} className="bg-zinc-900 p-4 rounded-2xl border border-white/5 flex flex-col gap-3">
                <div className="aspect-square bg-zinc-800 rounded-xl overflow-hidden">
                  <img src={item.image || `https://picsum.photos/seed/${i}/400`} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-[10px] font-black uppercase text-zinc-300 leading-tight line-clamp-2">{item.name || "Race-X Nexus Node v4.0"}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-white">₹{item.price || '2,499'}</span>
                  <button className="p-2 bg-yellow-500 rounded-lg text-black"><ShoppingCart size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- MASTER FOOTER --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#121212]/95 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-4 z-[5000]">
        <NavIcon icon={<HomeIcon size={28}/>} label="Hub" active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
        <NavIcon icon={<LayoutGrid size={28}/>} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <div onClick={() => setIsPostModalOpen(true)} className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center -mt-12 shadow-blue-600/40 border-[6px] border-black active:scale-90 transition-all"><Plus size={36} className="text-white" /></div>
        <NavIcon icon={<Music size={28}/>} label="Music" active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <NavIcon icon={<ShoppingBag size={28}/>} label="Shop" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>

      {/* --- POST MODAL --- */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/98 z-[6000] flex flex-col p-6 animate-in slide-in-from-bottom-20 duration-500 backdrop-blur-3xl">
           <div className="flex justify-between items-center mb-12">
              <X onClick={() => setIsPostModalOpen(false)} className="text-zinc-500 p-2 bg-zinc-900 rounded-full" />
              <button onClick={handlePostSubmit} className="bg-blue-600 px-8 py-2.5 rounded-full font-black text-xs uppercase text-white">Publish</button>
           </div>
           <textarea autoFocus value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="What's on your mind?" className="flex-1 bg-transparent border-none outline-none text-3xl font-black italic tracking-tighter text-white resize-none" />
        </div>
      )}
    </div>
  );
}

/* --- UI HELPERS --- */
function HubCard({ title, sub, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className={`${color} p-7 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 active:scale-95 transition-all shadow-2xl border border-white/10 relative overflow-hidden min-h-[170px]`}>
       <div className="drop-shadow-2xl text-white">{icon}</div>
       <div className="text-center mt-3">
          <span className="text-[14px] font-black uppercase tracking-widest block leading-none text-white">{title}</span>
          <span className="text-[8px] font-black opacity-50 uppercase tracking-[0.2em] text-white/70">{sub}</span>
       </div>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-600'}`}>
      {icon}
      <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}

function SocialCard({ post }: any) {
  return (
    <div className="bg-[#121212] border-y border-white/5 pb-2 mb-2">
       <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-black italic text-sm text-white">RX</div>
             <div><h4 className="font-black text-sm uppercase text-white">{post.user_name}</h4><p className="text-[10px] font-black text-zinc-500">Global Node • <Globe size={10} className="inline"/></p></div>
          </div>
          <MoreHorizontal size={22} className="text-zinc-600" />
       </div>
       <div className="px-5 pb-6 text-sm font-bold text-zinc-200">{post.content}</div>
       <div className="px-4 flex justify-around items-center py-4 border-t border-zinc-800/50 mx-4">
          <button className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase tracking-widest"><Heart size={18} /> Like</button>
          <button className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase tracking-widest"><MessageCircle size={18} /> Comment</button>
          <button className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase tracking-widest"><Share2 size={18} /> Share</button>
       </div>
    </div>
  );
}
