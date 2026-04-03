import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, MessageSquare, Share2, Music, ShoppingBag, 
  Heart, MessageCircle, Send, Wallet, TrendingUp, Layers, 
  MoreHorizontal, Bookmark, Play, Gem, Ticket, ExternalLink, 
  Wand2, Disc, PlayCircle, PauseCircle, Fingerprint, Settings,
  Flame, SkipForward, Mic2, Pause
} from "lucide-react";

export default function Home() {
  // --- 1. NAVIGATION & SPLASH ---
  const [activeTab, setActiveTab] = useState("social");
  const [showSplash, setShowSplash] = useState(true);
  const [isLocked, setIsLocked] = useState(true);

  // --- 2. GLOBAL STATES (Gems & Data) ---
  const [wallet, setWallet] = useState(() => Number(localStorage.getItem("rx_gems")) || 7500);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([{ from: "ai", text: "NEXUS CORE ONLINE. READY TO CREATE." }]);
  const [notification, setNotification] = useState<string | null>(null);

  // --- 3. ENGINE STATES (AI & Music) ---
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioAdPlaying, setIsAudioAdPlaying] = useState(false);
  const adAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- 4. SYSTEM INITIALIZATION ---
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    setPosts([
      { user: "NEXUS_CORE", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800", likes: "125K" },
      { user: "AI_MASTER", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800", likes: "89K" }
    ]);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("rx_gems", wallet.toString());
  }, [wallet]);

  // --- 5. LOGIC ACTIONS ---
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const watchAdAndEarn = () => {
    showToast("📺 LOADING AD REVENUE NODE...");
    setTimeout(() => {
      setWallet(prev => prev + 500);
      showToast("💰 +500 GEMS ADDED!");
    }, 4000);
  };

  const generateAI = () => {
    if (wallet < 500) return showToast("❌ NEED 500 GEMS!");
    setIsGenerating(true);
    setTimeout(() => {
      setWallet(prev => prev - 500);
      setGeneratedImages([`https://api.dicebear.com/7.x/identicon/svg?seed=${Math.random()}`, ...generatedImages]);
      setIsGenerating(false);
      showToast("✨ AI ASSET MATERIALIZED");
    }, 4000);
  };

  return (
    <div className="bg-[#010101] min-h-screen text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <audio ref={adAudioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* --- SPLASH SCREEN --- */}
      {showSplash && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-all">
           <div className="w-48 h-48 bg-blue-600 rounded-[4rem] flex items-center justify-center text-8xl font-black italic shadow-[0_0_120px_rgba(37,99,235,0.4)] animate-pulse">RX</div>
           <p className="mt-10 text-[10px] font-black uppercase tracking-[1.2em] text-blue-500/40">Nexus Sovereign Active</p>
        </div>
      )}

      {/* --- TOP HEADER --- */}
      {!showSplash && (
        <header className="fixed top-0 left-0 right-0 p-5 bg-black/80 backdrop-blur-3xl border-b border-white/5 z-[2000] flex justify-between items-center animate-in fade-in">
           <div className="flex items-center gap-3" onClick={() => setActiveTab("social")}>
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-black text-[10px]">RX</div>
              <h1 className="text-lg font-black italic tracking-tighter text-blue-500 uppercase">{activeTab}</h1>
           </div>
           <div className="flex gap-3">
              <div onClick={watchAdAndEarn} className="bg-zinc-900 px-4 py-2 rounded-full border border-orange-500/30 flex items-center gap-2 animate-pulse cursor-pointer">
                 <Play size={10} className="text-orange-500 fill-orange-500"/><span className="text-[9px] font-black uppercase text-orange-500">EARN</span>
              </div>
              <div className="bg-zinc-900 px-4 py-2 rounded-full border border-blue-500/20 flex items-center gap-2">
                 <Gem size={12} className="text-blue-400"/><span className="text-[10px] font-black italic">{wallet.toLocaleString()}</span>
              </div>
              <div className="w-9 h-9 flex items-center justify-center" onDoubleClick={() => setActiveTab("owner")}>
                 <Settings size={16} className="text-zinc-700 hover:text-white transition-colors"/>
              </div>
           </div>
        </header>
      )}

      {/* --- MAIN CONTENT FEED --- */}
      {!showSplash && (
        <main className={`pt-28 pb-40 px-4 max-w-[500px] mx-auto space-y-6 ${activeTab === "social" ? "animate-in fade-in" : ""}`}>
          
          {/* 1. SOCIAL TAB */}
          {activeTab === "social" && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                 <HubCard title="STUDIO" desc="CREATE" icon={<Sparkles className="text-blue-500"/>} onClick={() => setActiveTab("studio")} />
                 <HubCard title="TRENDS" desc="VIRAL" icon={<TrendingUp className="text-green-500"/>} onClick={() => {}} />
              </div>
              {posts.map((p, i) => <PostItem key={i} {...p} />)}
            </>
          )}

          {/* 2. STUDIO TAB (AI GENERATOR) */}
          {activeTab === "studio" && (
            <div className="space-y-6 animate-in slide-in-from-bottom-10">
               <div className="p-8 bg-zinc-900/40 rounded-[3.5rem] border border-white/5 text-center shadow-2xl">
                  <Wand2 size={40} className="mx-auto text-blue-500 mb-4 animate-pulse" />
                  <h2 className="text-2xl font-black italic uppercase italic">AI Studio</h2>
               </div>
               <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your vision..." className="w-full bg-zinc-900/40 border border-white/10 rounded-[2.5rem] p-7 text-sm font-black italic outline-none min-h-[160px] focus:border-blue-500 transition-all" />
               <button onClick={generateAI} disabled={isGenerating} className="w-full py-7 bg-blue-600 rounded-[2.5rem] font-black italic uppercase text-xs shadow-xl active:scale-95 transition-all">
                  {isGenerating ? "PROCESSING..." : "GENERATE ASSET (500 💎)"}
               </button>
               <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((img, i) => <img key={i} src={img} className="rounded-[2rem] border border-white/10 shadow-lg" />)}
               </div>
            </div>
          )}

          {/* 3. MAGIC CHAT TAB */}
          {activeTab === "chat" && <MagicChat messages={messages} setMessages={setMessages} />}

          {/* 4. MUSIC TAB */}
          {activeTab === "music" && (
            <div className="text-center py-10 animate-in fade-in">
               <div className={`relative mx-auto w-64 h-64 flex items-center justify-center`}>
                  <Disc size={200} className={`text-blue-500/10 absolute ${isPlaying ? 'animate-spin-slow' : ''}`} />
                  <div className="z-10 bg-zinc-900 p-10 rounded-full border border-white/5 shadow-2xl">
                     {isPlaying ? <Pause size={40} onClick={() => setIsPlaying(false)}/> : <Play size={40} className="ml-2" onClick={() => setIsPlaying(true)}/>}
                  </div>
               </div>
               <h2 className="mt-10 text-3xl font-black italic uppercase tracking-tighter">Nexus Radio</h2>
               <p className="text-[10px] font-bold text-zinc-500 tracking-[0.4em] mt-2 uppercase">Premium AI Audio Stream</p>
            </div>
          )}

          {/* 5. SHOP TAB */}
          {activeTab === "shop" && <ShopModule wallet={wallet} setWallet={setWallet} />}

          {/* 6. OWNER PANEL */}
          {activeTab === "owner" && (
             <div className="p-8 space-y-8 animate-in zoom-in-95">
                <div className="text-center">
                   <Fingerprint size={60} className="mx-auto text-blue-500 mb-6 animate-pulse"/>
                   <h2 className="text-2xl font-black italic uppercase">Admin Kernel</h2>
                </div>
                <input type="password" placeholder="ENTER MASTER PIN" onChange={(e) => e.target.value === "0000" && setIsLocked(false)} className="w-full bg-zinc-900/40 p-6 rounded-[2rem] border border-white/10 text-center text-sm font-black italic" />
                {!isLocked && <div className="p-6 bg-blue-600/10 border border-blue-500/30 rounded-[2rem] text-center text-[10px] font-black text-blue-500">SYSTEM UNLOCKED: NODES READY</div>}
             </div>
          )}

        </main>
      )}

      {/* --- GLOBAL BOTTOM NAVIGATION --- */}
      {!showSplash && activeTab !== "owner" && (
        <nav className="fixed bottom-0 left-0 right-0 h-24 bg-black/95 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around z-[2000] px-2">
           <NavBtn label="SOCIAL" active={activeTab === 'social'} onClick={() => setActiveTab('social')} icon={<Share2 size={22}/>} />
           <NavBtn label="STUDIO" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} icon={<Wand2 size={22}/>} />
           <div className="p-5 bg-blue-600 rounded-full -mt-12 border-4 border-black shadow-2xl active:scale-90 transition cursor-pointer" onClick={() => setActiveTab("chat")}>
              <MessageSquare size={28} className="text-white fill-white"/>
           </div>
           <NavBtn label="MUSIC" active={activeTab === 'music'} onClick={() => setActiveTab('music')} icon={<Music size={22}/>} />
           <NavBtn label="SHOP" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} icon={<ShoppingBag size={22}/>} />
        </nav>
      )}

      {/* TOAST NOTIFICATION */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[4000] bg-blue-600 px-10 py-4 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.5)] animate-in zoom-in-90">
           <p className="text-[10px] font-black uppercase tracking-widest text-white">{notification}</p>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavBtn({ label, active, onClick, icon }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all duration-500 ${active ? 'text-blue-500 scale-110' : 'text-zinc-700'}`}>
       {icon}
       <span className="text-[8px] font-black tracking-widest">{label}</span>
    </button>
  );
}

function HubCard({ title, desc, icon, onClick }: any) {
  return (
    <div onClick={onClick} className="p-6 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] flex flex-col items-center gap-3 active:scale-95 transition-all shadow-inner">
       <div className="p-3 bg-black/40 rounded-2xl">{icon}</div>
       <div className="text-center">
          <h3 className="text-[10px] font-black italic text-zinc-500 uppercase">{title}</h3>
          <p className="text-[11px] font-black uppercase text-white">{desc}</p>
       </div>
    </div>
  );
}

function PostItem({ user, img, likes }: any) {
  return (
    <div className="bg-zinc-900/30 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl mb-4">
       <div className="p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-black text-[9px]">RX</div>
             <span className="text-[11px] font-black italic tracking-widest uppercase">{user}</span>
          </div>
          <MoreHorizontal size={18} className="text-zinc-700" />
       </div>
       <img src={img} className="w-full aspect-square object-cover" />
       <div className="p-6">
          <div className="flex justify-between items-center mb-4">
             <div className="flex gap-6 items-center">
                <Heart size={22} className="hover:text-red-500 transition-colors" />
                <MessageCircle size={22} className="hover:text-blue-500 transition-colors" />
                <Send size={22} className="hover:text-green-500 transition-colors" />
             </div>
             <Bookmark size={22} className="text-zinc-800" />
          </div>
          <p className="text-[10px] font-black italic text-blue-500 uppercase tracking-[0.2em]">{likes} INTERACTIONS</p>
       </div>
    </div>
  );
}

function MagicChat({ messages, setMessages }: any) {
  const [input, setInput] = useState("");
  const send = () => {
    if (!input) return;
    setMessages([...messages, { from: "user", text: input.toUpperCase() }]);
    setInput("");
  };
  return (
    <div className="flex flex-col h-[65vh] bg-zinc-900/20 rounded-[3rem] border border-white/5 overflow-hidden animate-in slide-in-from-bottom-5">
       <div className="flex-1 overflow-auto p-6 space-y-4">
          {messages.map((m: any, i: number) => (
             <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-2xl text-[10px] font-black uppercase max-w-[80%] shadow-lg ${m.from === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-zinc-800 text-zinc-300 rounded-bl-none'}`}>
                   {m.text}
                </div>
             </div>
          ))}
       </div>
       <div className="p-4 bg-black/60 flex gap-2 border-t border-white/5">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="TYPE MESSAGE..." className="flex-1 bg-transparent border border-white/10 rounded-full px-6 text-[10px] font-black uppercase outline-none focus:border-blue-500" />
          <button onClick={send} className="p-4 bg-blue-600 rounded-full shadow-lg active:scale-90 transition"><Send size={18}/></button>
       </div>
    </div>
  );
}

function ShopModule({ wallet, setWallet }: any) {
  const buy = (cost: number, item: string) => {
    if (wallet < cost) return alert("❌ NEED MORE GEMS!");
    setWallet(wallet - cost);
    alert(`✅ ${item} REDEEMED!`);
  };
  return (
    <div className="space-y-4 animate-in slide-in-from-right-10">
       <div className="p-10 bg-gradient-to-br from-blue-900/20 to-black rounded-[3.5rem] border border-blue-500/20 text-center shadow-2xl mb-4">
          <Ticket size={40} className="mx-auto text-blue-500 mb-4"/>
          <h2 className="text-2xl font-black italic uppercase italic">Coupon Vault</h2>
          <p className="text-[8px] font-bold text-zinc-500 uppercase mt-2">Spend Gems • Get Real Codes</p>
       </div>
       <ShopItem title="Amazon ₹100 Off" cost={5000} icon={<Ticket className="text-orange-500"/>} onBuy={() => buy(5000, "AMAZON VOUCHER")} />
       <ShopItem title="Flipkart 10% Off" cost={3000} icon={<Ticket className="text-blue-500"/>} onBuy={() => buy(3000, "FLIPKART CODE")} />
       <div className="mt-10 p-6 bg-zinc-900/40 rounded-[2.5rem] border border-white/5">
          <h3 className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-4">Direct Store Access</h3>
          <button onClick={() => window.open("https://amazon.in", "_blank")} className="w-full p-4 bg-black/40 rounded-2xl flex justify-between items-center text-[11px] font-black italic uppercase">
             Shop Amazon <ExternalLink size={14}/>
          </button>
       </div>
    </div>
  );
}

function ShopItem({ title, cost, icon, onBuy }: any) {
  return (
    <div className="p-6 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 flex justify-between items-center shadow-lg">
       <div className="flex items-center gap-4">
          {icon}
          <div>
             <h4 className="text-[11px] font-black uppercase italic">{title}</h4>
             <p className="text-[8px] font-bold text-zinc-600 mt-1 italic uppercase tracking-tighter">{cost} GEMS</p>
          </div>
       </div>
       <button onClick={onBuy} className="bg-white text-black px-6 py-2 rounded-xl text-[9px] font-black uppercase active:scale-95 transition-all">Redeem</button>
    </div>
  );
}
