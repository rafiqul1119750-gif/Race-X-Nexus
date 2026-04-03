import React, { useState, useEffect, useRef } from "react";
import {
  Zap, Sparkles, Globe, Library, Plus, Gem,
  LayoutGrid, Video, Users, MessageSquare, Music, ShoppingBag,
  Settings, Heart, MessageCircle, Send, Play, Disc, ArrowLeft, Bell, Crown, Pause, Activity, ShoppingCart
} from "lucide-react";

/* ================= CONFIGS & STORE ================= */
const ML_CONFIG = { FEED_API: "https://your-ml-api.com/feed", TRACK_API: "https://your-ml-api.com/track" };
const STREAM_CONFIG = { RTMP_SERVER: "rtmp://your-vps-ip/live", HLS_PLAYBACK: "https://your-domain.com/hls/" };
const SCALE_CONFIG = { CDN: "Cloudflare", STORAGE: "S3", DB: "PostgreSQL", CACHE: "Redis", QUEUE: "Kafka" };

const Store = {
  get: (k: string, d: any) => JSON.parse(localStorage.getItem(k) || JSON.stringify(d)),
  set: (k: string, v: any) => localStorage.setItem(k, JSON.stringify(v))
};

/* ================= SPLASH SCREEN ================= */
function Splash({ onDone }: any) {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, []);
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-500/40 animate-pulse">
        <span className="text-4xl font-black italic text-white">RX</span>
      </div>
      <h2 className="mt-6 text-zinc-500 font-black tracking-[0.3em] text-[10px] uppercase animate-bounce">Initializing Future</h2>
    </div>
  );
}

/* ================= MAIN APP ================= */
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("hub");
  const [user, setUser] = useState<any>(Store.get("user", null));
  const [loginName, setLoginName] = useState("");

  // Data States
  const [reels, setReels] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  
  // Interaction States
  const [playingSong, setPlayingSong] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [serverLoad, setServerLoad] = useState(24);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Seed Data
    setReels(Array.from({ length: 15 }, (_, i) => ({
      id: i, url: "https://www.w3schools.com/html/mov_bbb.mp4",
      caption: `RX Viral Reel #${i + 1} 🔥`, likes: `${Math.floor(Math.random() * 900)}K`
    })));
    setSongs(Array.from({ length: 10 }, (_, i) => ({
      id: i, title: `RX Hit ${i + 1}`, artist: "Race-X AI",
      url: "https://www.w3schools.com/html/horse.mp3",
      cover: `https://picsum.photos/seed/rx${i}/200/200`
    })));
    setProducts(Array.from({ length: 6 }, (_, i) => ({
      id: i, name: `RX Tech Gear ${i + 1}`, price: 1500 + (i * 250)
    })));

    const interval = setInterval(() => {
      setServerLoad(l => Math.min(100, Math.max(10, l + (Math.random() * 6 - 3))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (!loginName) return;
    const u = { name: loginName, gems: 7500 };
    setUser(u);
    Store.set("user", u);
  };

  const sendChatMessage = () => {
    if (!inputMsg) return;
    setMessages(prev => [...prev, { role: "user", text: inputMsg }]);
    setInputMsg("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: "RX AI processing your request... 🚀" }]);
      setIsTyping(false);
    }, 1500);
  };

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;

  if (!user) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-10">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl mb-8 flex items-center justify-center font-black text-2xl shadow-2xl shadow-blue-500/20">RX</div>
        <input 
          value={loginName} onChange={e => setLoginName(e.target.value)}
          placeholder="Enter Username"
          className="w-full bg-zinc-900 border border-white/10 p-5 rounded-2xl text-white font-bold mb-4 focus:outline-none focus:border-blue-500 transition-all"
        />
        <button onClick={handleLogin} className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition">Access Nexus</button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-500/30">

      {/* --- MASTER HEADER --- */}
      <header className="fixed top-0 left-0 right-0 p-6 pt-12 bg-black/90 backdrop-blur-3xl border-b border-white/5 z-[4000] flex justify-between items-center">
        <div className="flex items-center gap-4" onClick={() => setActiveTab("hub")}>
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg active:scale-90 transition cursor-pointer">
            {activeTab === "hub" ? "RX" : <ArrowLeft size={20} />}
          </div>
          <div>
            <h2 className="text-xl font-black italic text-blue-500 uppercase tracking-tighter">{activeTab}</h2>
            <p className="text-[8px] font-black text-zinc-500 uppercase">User: {user.name}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{user.gems} GEMS</span>
            <div className="flex gap-1 items-center">
               <div className={`w-1 h-1 rounded-full ${serverLoad > 80 ? 'bg-red-500' : 'bg-green-500'}`}/>
               <span className="text-[7px] text-zinc-500 uppercase">Node-RX</span>
            </div>
          </div>
          <Bell size={20} className="text-zinc-500" />
        </div>
      </header>

      <main className={`pt-32 pb-44 ${activeTab === 'social' ? 'px-0' : 'px-5'} max-w-[600px] mx-auto`}>

        {/* 1. HUB */}
        {activeTab === "hub" && (
          <div className="space-y-6 animate-in fade-in duration-700">
            <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-900/40 via-zinc-900 to-black p-10 border border-white/5 shadow-2xl">
              <h1 className="text-4xl font-black italic uppercase leading-none tracking-tighter">THE <br /> <span className="text-blue-500 font-black">ECOSYSTEM</span></h1>
              <div className="flex gap-3 mt-8">
                 <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                    <Activity size={12} className="text-blue-500"/>
                    <span className="text-[10px] font-black uppercase tracking-widest">{serverLoad.toFixed(0)}% LOAD</span>
                 </div>
              </div>
            </div>
            <HubCard title="RX Social" color="bg-[#9333EA]" icon={<Video size={35}/>} onClick={() => setActiveTab("social")} />
            <HubCard title="RX Music" color="bg-[#0EA5E9]" icon={<Music size={35}/>} onClick={() => setActiveTab("music")} />
            <HubCard title="RX Studio" color="bg-cyan-400" icon={<Zap size={35} className="text-black fill-black"/>} onClick={() => setActiveTab("studio")} />
            <HubCard title="RX Shop" color="bg-[#F97316]" icon={<ShoppingBag size={35}/>} onClick={() => setActiveTab("shop")} />
          </div>
        )}

        {/* 2. SOCIAL (REELS) */}
        {activeTab === "social" && (
          <div className="h-[80vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
            {reels.map((r, i) => (
              <div key={i} className="h-[80vh] w-full snap-start relative bg-zinc-950 mb-4 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                <video src={r.url} autoPlay muted loop className="w-full h-full object-cover" />
                <div className="absolute bottom-10 left-6 right-16">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white/20 flex items-center justify-center font-black text-[10px]">RX</div>
                    <span className="font-black italic text-white uppercase text-xs tracking-widest">RX_Official</span>
                  </div>
                  <p className="text-sm font-bold text-white mb-2 drop-shadow-md">{r.caption}</p>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex gap-2">
                    <input className="bg-transparent text-xs w-full outline-none" placeholder="Add comment..." />
                    <Send size={16} className="text-blue-500"/>
                  </div>
                </div>
                <div className="absolute bottom-12 right-4 flex flex-col gap-8 items-center z-10">
                   <div className="flex flex-col items-center gap-1"><Heart size={30} className="fill-white" /><span className="text-[10px] font-black">{r.likes}</span></div>
                   <div className="flex flex-col items-center gap-1"><MessageCircle size={30} /><span className="text-[10px] font-black">42K</span></div>
                   <Disc size={30} className="animate-spin-slow text-blue-500" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. MUSIC (SONGS) */}
        {activeTab === "music" && (
          <div className="space-y-4 animate-in slide-in-from-bottom-5">
            <h2 className="text-2xl font-black italic uppercase text-blue-500 mb-6">Audio Stream</h2>
            {songs.map((s, i) => (
              <div key={i} onClick={() => {
                setPlayingSong(i);
                if (audioRef.current) {
                  audioRef.current.src = s.url;
                  audioRef.current.play();
                }
              }} 
              className={`p-5 rounded-[2.2rem] border transition-all cursor-pointer flex items-center justify-between ${playingSong === i ? 'bg-blue-600 border-transparent shadow-xl' : 'bg-zinc-900/40 border-white/5'}`}>
                <div className="flex items-center gap-5">
                  <img src={s.cover} className="w-14 h-14 rounded-2xl object-cover" alt="cover" />
                  <div>
                    <h3 className="font-black italic text-sm uppercase tracking-tight">{s.title}</h3>
                    <p className={`text-[10px] font-bold uppercase ${playingSong === i ? 'text-white/70' : 'text-zinc-500'}`}>{s.artist}</p>
                  </div>
                </div>
                {playingSong === i ? <Pause size={24} className="fill-white" /> : <Play size={24} className="text-zinc-600" />}
              </div>
            ))}
            <audio ref={audioRef} className="hidden" />
          </div>
        )}

        {/* 4. CHAT (AI) */}
        {activeTab === "chat" && (
          <div className="h-[70vh] flex flex-col bg-zinc-900/40 rounded-[3rem] border border-white/5 p-6">
            <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-[2rem] text-sm font-bold ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-zinc-800 text-zinc-300 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] font-black uppercase text-blue-500 animate-pulse">RX AI is typing...</div>}
            </div>
            <div className="mt-6 flex gap-3">
              <input value={inputMsg} onChange={e => setInputMsg(e.target.value)} 
                onKeyPress={e => e.key === 'Enter' && sendChatMessage()}
                placeholder="Talk to RX AI..."
                className="flex-1 bg-zinc-800 p-5 rounded-full text-sm font-bold border border-white/5 focus:border-blue-500 outline-none transition-all" />
              <button onClick={sendChatMessage} className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center active:scale-90 transition">
                <Send size={20} />
              </button>
            </div>
          </div>
        )}

        {/* 5. SHOP */}
        {activeTab === "shop" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black italic uppercase text-orange-500">RX Gear Store</h2>
              <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-[8px] w-5 h-5 flex items-center justify-center rounded-full font-black">{cart.length}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-zinc-900 p-6 rounded-[2.5rem] border border-white/5 text-center">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl mx-auto mb-4 flex items-center justify-center text-orange-500"><Gem size={24}/></div>
                  <h3 className="text-[10px] font-black uppercase mb-1 tracking-tight">{p.name}</h3>
                  <p className="text-blue-500 font-black text-sm mb-4">₹{p.price}</p>
                  <button onClick={() => setCart(c => [...c, p])} className="w-full bg-white text-black py-3 rounded-full text-[9px] font-black uppercase active:scale-95 transition">Add to Cart</button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <button className="w-full bg-orange-600 py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-orange-600/20">Checkout (₹{cart.reduce((a,b)=>a+b.price, 0)})</button>
            )}
          </div>
        )}

        {/* 6. INFRA */}
        {activeTab === "infra" && (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-black italic uppercase text-white">Scale Infrastructure</h2>
            <div className="grid grid-cols-2 gap-4">
              <InfraCard label="CDN NODE" value={SCALE_CONFIG.CDN} />
              <InfraCard label="DB CLUSTER" value={SCALE_CONFIG.DB} />
              <InfraCard label="CACHE" value={SCALE_CONFIG.CACHE} />
              <InfraCard label="LOAD BALANCER" value="Active" />
            </div>
            <div className="bg-zinc-900/60 p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
              <div className="flex justify-between items-end mb-6 relative z-10">
                <div>
                   <p className="text-[9px] font-black text-zinc-500 uppercase mb-1">Global System Load</p>
                   <h3 className="text-4xl font-black italic text-blue-500">{serverLoad.toFixed(0)}%</h3>
                </div>
                <Activity size={40} className={serverLoad > 80 ? 'text-red-600' : 'text-blue-600'} />
              </div>
              <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className={`h-full transition-all duration-1000 ${serverLoad > 80 ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]'}`} style={{width: `${serverLoad}%`}} />
              </div>
              <p className="mt-6 text-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">All Systems Operational - Node: RX-7-Nexus</p>
            </div>
          </div>
        )}

        {/* 7. STUDIO */}
        {activeTab === "studio" && (
          <div className="p-20 text-center border-2 border-dashed border-cyan-400/20 rounded-[3rem] animate-pulse">
             <Sparkles size={50} className="text-cyan-400 mx-auto mb-6" />
             <h2 className="text-xl font-black italic text-white uppercase tracking-tighter">AI Studio Initializing...</h2>
             <p className="text-[10px] font-bold text-zinc-500 mt-2 uppercase tracking-widest">Face Swap & Motion Engine v4.0</p>
          </div>
        )}

      </main>

      {/* --- GLOBAL MASTER NAV --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-zinc-900/95 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-4 z-[5000]">
        <NavIcon label="Hub" icon={<LayoutGrid size={22}/>} active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
        <NavIcon label="Social" icon={<Video size={22}/>} active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <NavIcon label="Chat" icon={<MessageSquare size={22}/>} active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <NavIcon label="Music" icon={<Music size={22}/>} active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <NavIcon label="Infra" icon={<Activity size={22}/>} active={activeTab === 'infra'} onClick={() => setActiveTab('infra')} />
        <NavIcon label="Shop" icon={<ShoppingBag size={22}/>} active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function HubCard({ title, color, icon, onClick }: any) {
  return (
    <div onClick={onClick} className={`${color} rounded-[2.2rem] p-9 flex justify-between items-center active:scale-95 transition-all cursor-pointer shadow-xl group overflow-hidden relative`}>
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"/>
      <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none relative z-10">{title}</h2>
      <div className="relative z-10">{icon}</div>
    </div>
  );
}

function InfraCard({ label, value }: any) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-[2rem] text-center shadow-lg">
      <p className="text-[9px] font-black text-zinc-500 uppercase mb-1 tracking-widest">{label}</p>
      <p className="font-black text-xs italic text-blue-500 uppercase">{value}</p>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-2 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-500'}`}>
      <div className={`${active ? 'bg-blue-500/10 p-3 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10' : 'p-1 hover:text-zinc-300'}`}>{icon}</div>
      <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}
