import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, MessageSquare, Share2, ArrowLeft, Send, Heart, 
  MessageCircle, PlusSquare, Zap, LayoutGrid, Settings, 
  ShieldCheck, MoreHorizontal, Image as ImageIcon, Bell, Play, 
  Mic2, Crown, Cpu, Gift, Gem, ShieldAlert, AlertTriangle, UserX, 
  Share, Lock, Menu, ThumbsUp, FileText, ChevronRight, CheckCircle, 
  RefreshCw, Search, Trophy, Users, ShoppingBag, Clapperboard, Star,
  ShieldCheck as VerifiedIcon, Flame, Clock, Ghost, Target, Terminal, 
  Gavel, Activity, ZapOff, Radio, Music, Disc, PlayCircle, PauseCircle,
  SkipForward, SkipBack, Volume2, Globe, Database, ListMusic, Plus, Trash2, Key, Save, Fingerprint, 
  Wand2, Layers, Download, Ticket, ExternalLink
} from "lucide-react";

export default function Home() {
  // --- 1. CORE STATES (PERSISTENCE) ---
  const [screen, setScreen] = useState("splash"); // Start with Splash
  const [gems, setGems] = useState(() => Number(localStorage.getItem("rx_gems")) || 7500);
  const [reputation, setReputation] = useState(() => Number(localStorage.getItem("rx_vibe")) || 98);
  const [isLocked, setIsLocked] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // --- 2. DYNAMIC API NODES (OWNER PANEL) ---
  const [apiNodes, setApiNodes] = useState(() => {
    const saved = localStorage.getItem("rx_nodes");
    return saved ? JSON.parse(saved) : [
      { id: 1, type: "AI", name: "Flux Engine", endpoint: "https://api.flux.ai", key: "FL-99" },
      { id: 2, type: "MUSIC", name: "Nexus Stream", endpoint: "https://api.nexus.io", key: "NX-01" }
    ];
  });

  // --- 3. COUPON INVENTORY (SHOP) ---
  const [coupons, setCoupons] = useState([
    { id: 1, store: "AMAZON", title: "₹100 OFF Voucher", cost: 10000, code: "AMZ-RX-100", redeemed: false },
    { id: 2, store: "FLIPKART", title: "10% Discount Code", cost: 8000, code: "FK-NEXUS-10", redeemed: false },
    { id: 3, store: "MEESHO", title: "₹50 Flat Discount", cost: 5000, code: "MSH-FREE-50", redeemed: false },
  ]);

  // --- 4. ENGINE STATES (AI & MUSIC) ---
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioAdPlaying, setIsAudioAdPlaying] = useState(false);
  const [songCounter, setSongCounter] = useState(0);
  const [currentTrack, setCurrentTrack] = useState({ title: "Nexus Horizon", artist: "AI Sovereign" });
  const adAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- 5. LOGIC FLOWS (NO-CASH BUSINESS MODEL) ---

  // AUTO-TRANSITION: Splash -> Hub (3 Seconds)
  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => setScreen("hub"), 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // EARNING LOOP: Watch Ad
  const watchAdAndEarn = () => {
    showToast("📺 LOADING PREMIUM AD ENGINE...");
    setTimeout(() => {
      setGems(prev => prev + 500);
      showToast("💰 +500 GEMS ADDED (Ad Reward)");
    }, 5000);
  };

  // SHOP LOOP: Redeem Coupons
  const redeemCoupon = (id: number) => {
    const coupon = coupons.find(c => c.id === id);
    if (!coupon || gems < coupon.cost) {
      showToast("❌ NEED MORE GEMS! WATCH ADS.");
      return;
    }
    setGems(prev => prev - coupon.cost);
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, redeemed: true } : c));
    showToast(`✅ COUPON UNLOCKED: ${coupon.code}`);
  };

  // AFFILIATE REDIRECTS
  const handleStoreRedirect = (store: string, url: string) => {
    showToast(`🔗 OPENING ${store}...`);
    setTimeout(() => window.open(url, "_blank"), 1200);
  };

  // AI GENERATION LOGIC
  const generateAIImage = () => {
    if (gems < 500) { showToast("❌ NEED 500 GEMS"); return; }
    setIsGenerating(true);
    setTimeout(() => {
      setGems(prev => prev - 500);
      setGeneratedImages([`https://api.dicebear.com/7.x/identicon/svg?seed=${Math.random()}`, ...generatedImages]);
      setIsGenerating(false);
      showToast("✨ AI ASSET CREATED");
    }, 4000);
  };

  // MUSIC LOGIC
  const selectSong = (song: any) => {
    if (songCounter >= 2) {
       setIsPlaying(false); setIsAudioAdPlaying(true);
       if(adAudioRef.current) adAudioRef.current.play();
       setTimeout(() => { setIsAudioAdPlaying(false); setIsPlaying(true); setSongCounter(0); }, 8000);
    } else {
      setCurrentTrack(song); setIsPlaying(true); setSongCounter(prev => prev + 1);
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#010101] text-white font-sans overflow-hidden">
      <audio ref={adAudioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* SPLASH LAYER */}
      {screen === "splash" && (
        <div className="fixed inset-0 z-[5000] bg-black flex flex-col items-center justify-center">
           <div className="w-56 h-56 bg-blue-600 rounded-[5.5rem] flex items-center justify-center text-[10rem] font-black italic shadow-[0_0_150px_rgba(37,99,235,0.4)] animate-pulse">RX</div>
           <p className="mt-20 text-[11px] font-black uppercase tracking-[1.2em] text-blue-500/50">Nexus Sovereign Active</p>
        </div>
      )}

      {/* HEADER (Visible after Splash) */}
      {screen !== "splash" && (
        <header className="fixed top-0 left-0 right-0 p-6 bg-black/95 backdrop-blur-3xl border-b border-white/5 z-[2000] flex justify-between items-center animate-in fade-in">
           <div className="flex items-center gap-3" onClick={() => setScreen("hub")}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">RX</div>
              <h1 className="text-xl font-black italic text-blue-500 tracking-tighter uppercase">Nexus</h1>
           </div>
           <div className="flex gap-3">
              <div onClick={watchAdAndEarn} className="bg-zinc-900 px-4 py-2 rounded-full border border-orange-500/30 flex items-center gap-2 animate-pulse cursor-pointer">
                 <Play size={12} className="text-orange-500"/><span className="text-[9px] font-black uppercase text-orange-500 text-white">Earn</span>
              </div>
              <div className="bg-zinc-900 px-4 py-2 rounded-full border border-cyan-500/30 flex items-center gap-2">
                 <Gem size={12} className="text-cyan-400"/><span className="text-[10px] font-black italic">{gems.toLocaleString()}</span>
              </div>
              <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center" onDoubleClick={() => setScreen("owner")}>
                 <Settings size={16} className="text-zinc-600"/>
              </div>
           </div>
        </header>
      )}

      {/* MAIN CONTENT AREA */}
      <main className={`transition-all duration-500 ${screen !== "splash" ? "pt-32 pb-44 px-4 h-screen overflow-y-auto" : "h-screen"}`}>

        {/* OWNER KERNEL */}
        {screen === "owner" && (
          <div className="space-y-8 pb-32">
             {isLocked ? (
                <div className="p-12 bg-zinc-900/60 rounded-[4rem] text-center space-y-8 border border-white/5 shadow-2xl mt-10">
                   <Fingerprint size={80} className="mx-auto text-blue-600 animate-pulse"/>
                   <input type="password" placeholder="Admin Pin" onChange={(e) => e.target.value === "0000" && setIsLocked(false)} className="w-full bg-black/60 p-6 rounded-3xl text-center outline-none border border-white/10" />
                </div>
             ) : (
                <div className="space-y-6">
                   <h2 className="text-3xl font-black italic uppercase px-2 text-blue-500">Nexus Kernel</h2>
                   {apiNodes.map((node: any) => (
                      <div key={node.id} className="p-8 bg-zinc-900/60 border-l-4 border-l-blue-600 rounded-[3rem] space-y-4">
                         <input value={node.name} className="bg-transparent text-sm font-black italic text-white outline-none w-full" />
                         <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-[10px] font-mono text-blue-400 truncate">{node.endpoint}</div>
                         <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 truncate">{node.key}</div>
                      </div>
                   ))}
                   <button onClick={() => { setIsLocked(true); setScreen("hub"); showToast("💾 NODES COMMITTED"); }} className="w-full py-8 bg-white text-black rounded-[3rem] font-black italic uppercase text-xs">Sync & Lock Hub</button>
                </div>
             )}
          </div>
        )}

        {/* SHOP (COUPONS) */}
        {screen === "shop" && (
          <div className="space-y-8 pb-32 animate-in fade-in">
             <div className="p-10 bg-gradient-to-br from-blue-900/20 to-black rounded-[4rem] border border-blue-500/20 text-center shadow-2xl">
                <Ticket size={40} className="mx-auto text-blue-500 mb-4"/>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Coupon Vault</h2>
                <p className="text-[8px] font-bold text-zinc-500 uppercase mt-2">Spend Gems • Get Codes</p>
             </div>
             <div className="grid grid-cols-1 gap-4">
                {coupons.map(c => (
                  <div key={c.id} className={`p-8 bg-zinc-900/40 border border-white/5 rounded-[3rem] flex justify-between items-center shadow-xl ${c.redeemed ? 'border-green-500/30 bg-green-500/5' : ''}`}>
                     <div>
                        <h4 className="font-black italic text-sm">{c.store}</h4>
                        <p className="text-[11px] font-black text-blue-400">{c.title}</p>
                        <p className="text-[8px] text-zinc-500 font-bold mt-1 uppercase italic">{c.cost} GEMS</p>
                     </div>
                     {c.redeemed ? (
                        <span className="text-xs font-mono font-black text-white bg-black/60 px-4 py-2 rounded-lg border border-white/5 select-all">{c.code}</span>
                     ) : (
                        <button onClick={() => redeemCoupon(c.id)} className="bg-blue-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase active:scale-95 transition">REDEEM</button>
                     )}
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* AI STUDIO */}
        {screen === "ai_studio" && (
          <div className="space-y-8 pb-32 animate-in slide-in-from-right-10">
             <div className="p-10 bg-zinc-900/40 rounded-[4rem] border border-white/5 text-center shadow-2xl">
                <Wand2 size={40} className="mx-auto text-blue-500 mb-4 animate-pulse"/>
                <h2 className="text-3xl font-black italic uppercase">AI Studio</h2>
             </div>
             <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your vision..." className="w-full bg-zinc-900/40 border border-white/10 rounded-[3rem] p-8 text-sm font-black italic outline-none focus:border-blue-500 min-h-[150px]" />
             <button onClick={generateAIImage} disabled={isGenerating} className="w-full py-8 bg-blue-600 rounded-[3rem] font-black italic uppercase text-xs shadow-2xl active:scale-95 transition-all">
                {isGenerating ? "Processing..." : "Generate Masterpiece (500 Gems)"}
             </button>
             <div className="grid grid-cols-2 gap-4">
                {generatedImages.map((img, i) => <div key={i} className="aspect-square bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-inner"><img src={img} className="w-full h-full object-cover" /></div>)}
             </div>
          </div>
        )}

        {/* HUB (MAIN NAVIGATION) */}
        {screen === "hub" && (
          <div className="space-y-8 animate-in fade-in">
             <div className="grid grid-cols-2 gap-5">
                <ActionBox title="AI Studio" sub="CREATE" icon={<Wand2 size={28}/>} color="text-blue-500" onClick={() => setScreen("ai_studio")} />
                <ActionBox title="Music" sub="STREAM" icon={<Music size={28}/>} color="text-purple-500" onClick={() => setScreen("music")} />
                <ActionBox title="Shop" sub="COUPONS" icon={<ShoppingBag size={28}/>} color="text-green-500" onClick={() => setScreen("shop")} />
                <ActionBox title="Status" sub="VIBE" icon={<Flame size={28}/>} color="text-orange-500" onClick={() => setScreen("hub")} />
             </div>
             <div className="mt-10 space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 px-2">Store Redirects (Affiliate)</h3>
                <button onClick={() => handleStoreRedirect("AMAZON", "https://amazon.in")} className="w-full p-8 bg-zinc-900/40 border border-white/5 rounded-[3rem] flex justify-between items-center shadow-lg active:scale-95 transition">
                   <span className="font-black italic text-white uppercase text-sm">Shop Amazon</span>
                   <ExternalLink size={20} className="text-zinc-700"/>
                </button>
                <button onClick={() => handleStoreRedirect("FLIPKART", "https://flipkart.com")} className="w-full p-8 bg-zinc-900/40 border border-white/5 rounded-[3rem] flex justify-between items-center shadow-lg active:scale-95 transition">
                   <span className="font-black italic text-white uppercase text-sm">Shop Flipkart</span>
                   <ExternalLink size={20} className="text-zinc-700"/>
                </button>
             </div>
          </div>
        )}

        {/* MUSIC PLAYER */}
        {screen === "music" && (
          <div className="space-y-6 animate-in slide-in-from-right-10">
             <div className={`p-10 rounded-[5rem] border-2 transition-all duration-700 text-center shadow-2xl ${isAudioAdPlaying ? 'border-orange-500 bg-orange-600/10 animate-pulse' : 'border-white/5 bg-zinc-900/40'}`}>
                {isAudioAdPlaying ? (
                  <div className="py-12"><Mic2 size={70} className="mx-auto text-orange-500 mb-6"/><h2 className="text-2xl font-black italic uppercase text-white">Voice Ad</h2><p className="text-[10px] font-bold text-zinc-600">Generating Revenue Node...</p></div>
                ) : (
                  <> <Disc size={150} className={`mx-auto text-blue-500/10 mb-10 ${isPlaying ? 'animate-spin-slow' : ''}`} /><h2 className="text-3xl font-black italic truncate">{currentTrack.title}</h2><p className="text-[10px] font-bold text-zinc-500 uppercase mt-4 tracking-widest">{currentTrack.artist}</p> </>
                )}
                <div className="flex justify-center items-center gap-12 mt-12">
                   <button onClick={() => setIsPlaying(!isPlaying)} className="p-7 bg-white text-black rounded-full active:scale-90 transition shadow-2xl">{isPlaying ? <PauseCircle size={36}/> : <PlayCircle size={36}/>}</button>
                   <button onClick={() => selectSong({title: "Hyper-Drive", artist: "Nexus-01"})} disabled={isAudioAdPlaying} className="p-4 text-zinc-600 active:text-white"><SkipForward size={28}/></button>
                </div>
             </div>
          </div>
        )}

      </main>

      {/* FOOTER NAVIGATION */}
      {screen !== "splash" && screen !== "owner" && (
        <nav className="fixed bottom-0 left-0 right-0 h-28 bg-black/95 backdrop-blur-5xl border-t border-white/5 flex items-center justify-around z-[2000] px-4 animate-in slide-in-from-bottom-10">
           <NavBtn icon={<LayoutGrid size={24}/>} active={screen === 'hub'} onClick={() => setScreen('hub')} />
           <NavBtn icon={<Wand2 size={24}/>} active={screen === 'ai_studio'} onClick={() => setScreen('ai_studio')} />
           <div className="p-7 bg-blue-600 rounded-full -mt-20 border-4 border-black shadow-[0_0_50px_rgba(37,99,235,0.4)] active:scale-90 transition cursor-pointer" onClick={watchAdAndEarn}>
              <Play size={38} className="text-white ml-1 fill-white"/>
           </div>
           <NavBtn icon={<Music size={24}/>} active={screen === 'music'} onClick={() => setScreen('music')} />
           <NavBtn icon={<ShoppingBag size={24}/>} active={screen === 'shop'} onClick={() => setScreen('shop')} />
        </nav>
      )}

      {/* NOTIFICATION LAYER */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[4000] bg-blue-600 px-10 py-4 rounded-full shadow-2xl animate-in zoom-in-90 shadow-blue-500/50">
           <p className="text-[10px] font-black uppercase tracking-widest text-white">{notification}</p>
        </div>
      )}
    </div>
  );
}

// SUB-COMPONENTS
function ActionBox({ title, sub, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className="p-10 bg-zinc-900/30 rounded-[3.5rem] border border-white/5 flex flex-col items-center gap-6 active:scale-95 transition-all shadow-inner">
       <div className={color}>{icon}</div>
       <div className="text-center"><h3 className="text-[12px] font-black italic uppercase text-white">{title}</h3><p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{sub}</p></div>
    </div>
  );
}

function NavBtn({ icon, active, onClick }: any) {
  return <button onClick={onClick} className={`transition-all duration-700 ${active ? 'text-blue-400 scale-125' : 'text-zinc-700'}`}>{icon}</button>;
}
