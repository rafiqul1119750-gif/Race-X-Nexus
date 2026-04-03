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
  SkipForward, SkipBack, Volume2, Globe, Database, ListMusic, Plus, Trash2, Key, Save, Fingerprint 
} from "lucide-react";

// Workable Model: "Watch Ad to Unlock Feature"
const FEATURES = [
  { id: 'studio', name: 'Studio', cost: 1000, icon: <Zap/>, unad: false },
  { id: 'magic', name: 'Magic AI', cost: 2500, icon: <Sparkles/>, unad: true },
  { id: 'social', name: 'Social', cost: 0, icon: <Share2/>, unad: false },
  { id: 'lib', name: 'Media Library', cost: 1500, icon: <LayoutGrid/>, unad: false },
];

export default function Home() {
  // 1. CORE STATES
  const [screen, setScreen] = useState("splash");
  const [diamonds, setDiamonds] = useState(() => Number(localStorage.getItem("rx_diamonds")) || 750);
  const [karma, setKarma] = useState(() => Number(localStorage.getItem("rx_karma")) || 98);
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([]);
  const [ownerMode, setOwnerMode] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // OWNER KERNEL NODES (Saved in LocalStorage)
  const [apiNodes, setApiNodes] = useState(() => {
    const saved = localStorage.getItem("rx_nodes");
    return saved ? JSON.parse(saved) : [
      { id: 1, type: "AI", name: "Flux Engine", endpoint: "https://api.flux.ai", key: "FL-99" },
      { id: 2, type: "MUSIC", name: "Nexus Stream", endpoint: "https://api.nexus.io", key: "NX-01" }
    ];
  });

  // 2. ENGINE STATES (AI & MUSIC)
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({title: "Nexus Horizon", artist: "AI Sovereign"});
  const [musicProgress, setMusicProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 3. LOGIC FLOWS (No Cash Business Model)

  // SPLASH -> HUB Transition (3 Seconds)
  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => setScreen("hub"), 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem("rx_diamonds", diamonds.toString());
    localStorage.setItem("rx_karma", karma.toString());
    localStorage.setItem("rx_nodes", JSON.stringify(apiNodes));
  }, [diamonds, karma, apiNodes]);
  
  // EARNING LOOP: Watch Ad
  const watchAdAndEarn = () => {
    showToast("📺 Ad Loading...");
    setTimeout(() => {
      setDiamonds(prev => prev + 500);
      setKarma(prev => prev + 1);
      showToast("💰 +500 Diamonds Added!");
    }, 4000);
  };

  // FEATURE LOOP: Unlock
  const unlockFeature = (id: string, cost: number) => {
    if (unlockedFeatures.includes(id)) { setScreen(id); return; }
    if (diamonds < cost) { showToast("❌ Need More Diamonds!"); return; }
    setDiamonds(prev => prev - cost);
    setUnlockedFeatures(prev => [...prev, id]);
    showToast(`✅ ${id.toUpperCase()} Unlocked!`);
    setScreen(id);
  };

  // MUSIC PLAYER LOGIC
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setMusicProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  // AI GENERATION LOGIC
  const generateAIImage = () => {
    if (diamonds < 500) { showToast("❌ Need 500 Diamonds"); return; }
    setIsGenerating(true);
    setTimeout(() => {
      setDiamonds(prev => prev - 500);
      setGeneratedImages([`https://api.dicebear.com/7.x/identicon/svg?seed=${Math.random()}`, ...generatedImages]);
      setIsGenerating(false);
      showToast("✨ AI Asset Generated!");
    }, 4000);
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- SUB COMPONENTS FOR WORKABILITY ---

  // NAV ICON (Bottom)
  const NavIcon = ({ icon, label, id }: any) => (
    <div onClick={() => setScreen(id)} className={`flex flex-col items-center gap-1.5 cursor-pointer ${screen === id ? 'text-blue-500' : 'text-zinc-700'}`}>
       {icon} <span className="text-[9px] font-bold uppercase tracking-tight">{label}</span>
    </div>
  );

  // ACTION BLOCK (Hub)
  const ActionBlock = ({ title, sub, icon, bg, cost, id, unad }: any) => {
    const isUnlocked = unlockedFeatures.includes(id);
    return (
      <div 
        onClick={() => unlockFeature(id, cost)}
        className={`rounded-3xl p-8 flex justify-between items-center transition-all ${isUnlocked ? 'border-2 border-green-500/20' : ''}`}
        style={{background: isUnlocked ? "#0A0A0A" : bg}}
      >
        <div className={`${isUnlocked ? 'text-zinc-600' : 'text-black'}`}>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{title}</h2>
          <p className="text-[10px] font-bold uppercase mt-1 italic">{sub}</p>
        </div>
        <div className={`relative ${isUnlocked ? 'text-green-500' : 'text-black'}`}>
          {icon}
          {!isUnlocked && cost > 0 && <span className="absolute -top-3 -right-3 text-[8px] bg-red-600 text-white p-1 rounded-full font-black">{cost} 💎</span>}
          {!isUnlocked && cost === 0 && unad && <span className="absolute -top-3 -right-3 text-[8px] bg-blue-600 text-white p-1 rounded-full font-black animate-pulse">Ads</span>}
          {isUnlocked && <CheckCircle className="absolute -top-3 -right-3 text-green-500"/>}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#010101] text-white font-sans overflow-hidden">
      
      {/* SPLASH LAYER */}
      {screen === "splash" && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center animate-out fade-out duration-1000 delay-[2500ms]">
          {/* Black background removed from image */}
          <div className="w-56 h-56 rounded-full flex items-center justify-center transition-all animate-pulse">
            <h1 className="text-[12rem] font-black italic tracking-tighter text-blue-500 shadow-[0_0_100px_rgba(37,99,235,0.4)]">RX</h1>
          </div>
          <h1 className="text-6xl font-black italic mt-16 text-white tracking-tighter">RACE-<span className="text-blue-500">X</span></h1>
          <p className="text-zinc-500 uppercase tracking-[1em] text-[10px] font-bold mt-4">The Future of Creation</p>
          <div className="w-32 h-1 bg-zinc-900 overflow-hidden rounded-full mt-10">
            <div className="h-full bg-blue-500 animate-loading-bar"></div>
          </div>
          <p className="text-zinc-800 text-[9px] font-bold uppercase mt-20 tracking-widest">NEXUS ENGINE v2.0.4</p>
        </div>
      )}

      {/* HEADER LAYER (Visible on all workable pages) */}
      {screen !== "splash" && (
        <header className="p-6 pt-10 flex items-center gap-4 bg-black/80 backdrop-blur-2xl sticky top-0 z-40 border-b border-white/5 animate-in fade-in duration-500">
           {screen !== "hub" && <ArrowLeft onClick={() => setScreen("hub")} className="text-zinc-600"/>}
           <div className="flex-1 flex gap-4 items-center">
              <div className="relative">
                 <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/10 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                 </div>
                 <div className="absolute -bottom-2 -right-2 bg-blue-600 px-2 py-0.5 rounded-full text-[8px] font-bold border-2 border-black">LVL 1</div>
              </div>
              <div>
                 <h2 className="text-2xl font-black tracking-tighter text-blue-500 italic uppercase">Creator</h2>
                 <div className="flex gap-4 mt-0.5">
                    <div className="flex items-center gap-1"><Gem size={10} className="text-cyan-400"/><span className="text-[9px] font-black text-zinc-600 uppercase">0 Diamonds</span></div>
                    <div className="flex items-center gap-1"><Gem size={10} className="text-blue-400"/><span className="text-[9px] font-black text-blue-500 uppercase">{diamonds.toLocaleString()} Gems</span></div>
                 </div>
              </div>
           </div>
           <Settings onClick={() => setScreen("owner_kernel")} className={`text-zinc-600 ${ownerMode ? 'text-green-500 animate-pulse' : ''}`}/>
        </header>
      )}

      {/* MAIN CONTENT LAYER */}
      <main className={`transition-all duration-500 ${screen === "splash" ? "h-screen" : "pt-4 pb-32 px-5 h-screen overflow-y-auto"}`}>

        {/* HUB PAGE (Direct from image) */}
        {screen === "hub" && (
          <div className="space-y-6 animate-in slide-in-from-right-10">
            <div className="rounded-[2.5rem] bg-gradient-to-br from-orange-900/40 via-zinc-900 to-black p-10 border border-white/5 shadow-2xl relative">
              <Sparkles size={100} className="text-blue-500/10 absolute -top-10 -right-10"/>
              <h1 className="text-4xl font-black italic leading-[0.9] tracking-tighter uppercase w-full">Race-X: The <br/> <span className="text-blue-500">Future</span> of Creation</h1>
              <button onClick={watchAdAndEarn} className="mt-8 bg-white text-black px-8 py-3.5 rounded-full flex items-center gap-2 font-black text-[11px] uppercase shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <Play size={18} fill="black"/><span className="animate-pulse">Earn Gems</span>
              </button>
            </div>
            <ActionBlock title="Studio" sub="Creative Tools" icon={<Zap size={35}/>} bg="#22D3EE" cost={0} unad={true} id="studio" />
            <ActionBlock title="Music" sub="Nexus Stream" icon={<Music size={35}/>} bg="#A855F7" cost={1000} unad={false} id="music" />
            <ActionBlock title="Magic" sub="AI Materializer" icon={<Sparkles size={35}/>} bg="#27272A" cost={2500} unad={false} id="magic" />
            <ActionBlock title="Social" sub="Nexus Hub" icon={<Share2 size={35}/>} bg="#111827" cost={0} unad={false} id="social" />
          </div>
        )}

        {/* WORKABLE INBUILT PAGES (Icons & Actions) */}

        {/* STUDIO PAGE */}
        {screen === "studio" && (
          <div className="space-y-6 text-center py-10 animate-in fade-in">
             <div className="p-8 bg-zinc-900 rounded-[3rem] border border-white/5"><Zap size={100} className="mx-auto text-cyan-400"/></div>
             <h2 className="text-5xl font-black italic uppercase text-cyan-400">Creator Studio</h2>
             <p className="text-xs font-bold text-zinc-500 uppercase px-6">Access professional tools. WATCH ADS to unlock premium filters.</p>
             <button onClick={watchAdAndEarn} className="w-full py-7 bg-white text-black rounded-[2rem] font-black uppercase text-xs active:scale-95 transition">Unlock Pro Tools (Ad)</button>
          </div>
        )}

        {/* MUSIC PAGE (Player) */}
        {screen === "music" && (
          <div className="space-y-12 py-10 text-center animate-in fade-in">
             <Disc size={200} className={`mx-auto text-purple-600 shadow-[0_0_50px_rgba(168,85,247,0.3)] ${isPlaying ? 'animate-spin-slow' : ''}`} />
             <div>
                <h2 className="text-3xl font-black italic uppercase leading-tight">{currentTrack.title}</h2>
                <p className="text-[10px] font-bold text-purple-500 mt-2 uppercase tracking-widest">{currentTrack.artist}</p>
             </div>
             <div className="flex items-center gap-6 justify-center">
                <button className="text-zinc-600"><SkipBack size={30}/></button>
                <button onClick={() => setIsPlaying(!isPlaying)} className="p-7 bg-white text-black rounded-full active:scale-95 transition">
                  {isPlaying ? <PauseCircle size={40}/> : <PlayCircle size={40}/>}
                </button>
                <button className="text-zinc-600"><SkipForward size={30}/></button>
             </div>
          </div>
        )}

        {/* MAGIC PAGE (AI Image Gen) */}
        {screen === "magic" && (
          <div className="space-y-6 py-6 animate-in slide-in-from-bottom-10">
             <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your vision..." className="w-full bg-zinc-900/40 border border-white/10 rounded-[2.5rem] p-7 text-sm font-black italic outline-none focus:border-blue-500 min-h-[160px]" />
             <button onClick={generateAIImage} disabled={isGenerating} className="w-full py-7 bg-blue-600 rounded-[2.5rem] font-black italic uppercase text-xs shadow-2xl active:scale-95 transition-all">
                {isGenerating ? "Processing..." : "Generate Masterpiece (500 Gems)"}
             </button>
             <div className="grid grid-cols-2 gap-4">
                {generatedImages.map((img, i) => <img key={i} src={img} className="rounded-[2rem] border border-white/10 shadow-lg" />)}
             </div>
          </div>
        )}

        {/* OWNER KERNEL (Double Tap Setting to access) */}
        {screen === "owner_kernel" && (
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
                   <button onClick={() => { setIsLocked(true); setScreen("hub"); showToast("💾 Nodes Synced"); }} className="w-full py-8 bg-white text-black rounded-[3rem] font-black italic uppercase text-xs">Sync & Lock Kernel</button>
                </div>
             )}
          </div>
        )}

      </main>

      {/* FOOTER LAYER (Hamesha visible) */}
      {screen !== "splash" && (
        <nav className="h-28 bg-black/95 backdrop-blur-3xl border-t border-white/5 fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-4 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 duration-700">
           <NavIcon id="hub" label="Hub" icon={<LayoutGrid size={22}/>} />
           <NavIcon id="studio" label="Studio" icon={<Video size={22}/>} />
           <div className="p-7 bg-blue-600 rounded-full -mt-20 border-4 border-black shadow-[0_0_60px_rgba(37,99,235,0.4)] cursor-pointer active:scale-90 transition" onClick={watchAdAndEarn}>
              <Play size={40} className="fill-white"/>
           </div>
           <NavBtn label="Social" icon={<Share2 size={22}/>} onClick={() => unlockFeature("social", FEATURES.find(f => f.id === 'social')?.cost || 0)} />
           <NavIcon id="shop" label="Shop" icon={<ShoppingBag size={22}/>} />
        </nav>
      )}

      {/* TOAST LAYER */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-blue-600 px-10 py-4 rounded-full shadow-2xl animate-in zoom-in-90 shadow-blue-500/50">
           <p className="text-[10px] font-black uppercase tracking-widest text-white">{notification}</p>
        </div>
      )}
    </div>
  );
}

// Sub-component NavBtn for unlocking logic
const NavBtn = ({ icon, label, onClick }: any) => (
    <div onClick={onClick} className="flex flex-col items-center gap-1.5 cursor-pointer text-zinc-700">
       {icon} <span className="text-[9px] font-bold uppercase tracking-tight">{label}</span>
    </div>
);
