import React, { useState, useEffect } from "react";
import { 
  Sparkles, MessageSquare, Share2, ArrowLeft, Send, Heart, 
  MessageCircle, PlusSquare, Zap, LayoutGrid, Settings, 
  ShieldCheck, MoreHorizontal, Image as ImageIcon, Bell, Play, 
  Mic2, Crown, Cpu, Gift, Gem, ShieldAlert, AlertTriangle, UserX, 
  Share, Lock, Menu, ThumbsUp, FileText, ChevronRight, CheckCircle, 
  RefreshCw, Search, Trophy, Users, ShoppingBag, Clapperboard, Star,
  ShieldCheck as VerifiedIcon, Flame, Clock, Ghost, Target, Terminal, 
  Gavel, Activity, ZapOff, Radio
} from "lucide-react";

export default function Home() {
  const [screen, setScreen] = useState("home");
  const [gems, setGems] = useState(7500);
  const [reputation, setReputation] = useState(98); // AI Sentiment Score
  const [isGhostMarketOpen, setIsGhostMarketOpen] = useState(false);
  const [isLiveCommandActive, setIsLiveCommandActive] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // --- 1. THE AI SENTIMENT LOGIC (GOOD VIBES = 2X GEMS) ---
  const handleVibeCheck = (isPositive: boolean) => {
    if (isPositive) {
      setReputation(prev => Math.min(prev + 2, 100));
      showToast("✨ POSITIVE VIBE DETECTED: Reputation Up!");
    } else {
      setReputation(prev => Math.max(prev - 5, 0));
      showToast("⚠️ NEGATIVE SENTIMENT: Vibe Penalty Applied.");
    }
  };

  // --- 2. GHOST MARKET AUCTION (DIAMOND BURN) ---
  const enterGhostMarket = () => {
    if (gems >= 5000) {
      setScreen("ghost_market");
      showToast("🌑 WELCOME TO THE GHOST MARKET");
    } else {
      showToast("❌ 5,000 💎 REQUIRED FOR ENTRY");
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#010101] text-white font-sans overflow-x-hidden selection:bg-blue-500/40 transition-all duration-1000">
      
      {/* --- SOVEREIGN NOTIFICATION --- */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[2000] bg-blue-600/80 backdrop-blur-3xl px-10 py-3 rounded-full border border-white/20 shadow-[0_0_80px_rgba(37,99,235,0.6)] animate-in zoom-in-90">
           <p className="text-[10px] font-black italic uppercase tracking-[0.3em] flex items-center gap-3"> <Radio size={14} className="animate-pulse text-white"/> {notification} </p>
        </div>
      )}

      {/* --- OMNIVERSE HEADER --- */}
      {screen !== "home" && (
        <header className="fixed top-0 left-0 right-0 p-5 bg-black/95 backdrop-blur-3xl border-b border-white/5 z-[1000] flex items-center justify-between">
          <div className="flex items-center gap-4" onClick={() => setScreen("hub")}>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 active:scale-90 transition"><ArrowLeft size={20}/></div>
            <div className="flex flex-col">
               <h1 className="text-2xl font-black italic tracking-tighter bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">NEXUS SOVEREIGN</h1>
               <div className="flex items-center gap-2"><Activity size={10} className="text-cyan-500 animate-pulse"/><span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">SENTIMENT: {reputation}%</span></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-zinc-900/90 px-4 py-2 rounded-full border border-cyan-500/30 flex items-center gap-2 shadow-inner">
                <Gem size={14} className="text-cyan-400 animate-spin-slow"/>
                <span className="text-[11px] font-black italic text-cyan-400">{gems.toLocaleString()}</span>
             </div>
             {/* MASTER KEY (Double Tap for Owner Panel) */}
             <div className="w-11 h-11 rounded-2xl border-2 border-blue-600/50 p-0.5 cursor-pointer" onDoubleClick={() => setScreen("owner")}>
                <div className="w-full h-full rounded-2xl bg-zinc-800 flex items-center justify-center font-black italic text-blue-500 text-xs">RX</div>
             </div>
          </div>
        </header>
      )}

      <main className={screen !== "home" ? "pt-32 pb-44 px-4" : ""}>

        {/* --- SCREEN: OWNER OVERRIDE (THE SOURCE CODE) --- */}
        {screen === "owner" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-20">
             <div className="flex items-center gap-3 mb-8"><Terminal className="text-blue-500" size={32}/><h2 className="text-3xl font-black italic uppercase tracking-tighter">Command Kernel</h2></div>
             <div className="grid grid-cols-1 gap-4">
                <AdminControl label="Global Diamond Value" val="2.4x" onClick={() => showToast("VALUATION UPDATED")} />
                <AdminControl label="Shadow Ban List" val="142 Users" onClick={() => showToast("SCANNING FOR TOXICITY...")} />
                <button onClick={() => {setIsGhostMarketOpen(!isGhostMarketOpen); showToast("GHOST MARKET STATUS UPDATED")}} className={`p-8 rounded-[3rem] border-2 ${isGhostMarketOpen ? 'bg-purple-600 border-white shadow-[0_0_40px_rgba(147,51,234,0.5)]' : 'bg-zinc-900 border-white/5'} flex justify-between items-center transition-all duration-500`}>
                   <div className="text-left"><h3 className="text-lg font-black italic uppercase">Ghost Market</h3><p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Diamond Auction Mode</p></div>
                   <Gavel size={28}/>
                </button>
             </div>
          </div>
        )}

        {/* --- SCREEN: HUB (PULSE & AUCTIONS) --- */}
        {screen === "hub" && (
          <div className="space-y-6 animate-in fade-in duration-700">
             {isGhostMarketOpen && (
               <div className="p-10 bg-gradient-to-br from-purple-900 to-black rounded-[3.5rem] border border-purple-500/40 shadow-2xl relative overflow-hidden group cursor-pointer" onClick={enterGhostMarket}>
                  <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 transition-transform"><Gavel size={200}/></div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                     <Ghost size={40} className="text-purple-400 mb-4 animate-bounce"/>
                     <h2 className="text-2xl font-black italic uppercase text-white">GHOST MARKET LIVE</h2>
                     <p className="text-[9px] font-bold text-purple-300 uppercase tracking-[0.3em] mt-2">Exclusive High-Diamond Auction</p>
                  </div>
               </div>
             )}

             <div className="grid grid-cols-1 gap-4">
                <div className="p-6 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-4"><div className="p-3 bg-blue-600/10 rounded-2xl"><Activity size={20} className="text-blue-500"/></div><div><h4 className="text-[10px] font-black uppercase text-zinc-400">Social Reputation</h4><p className="text-sm font-black italic text-white">{reputation >= 90 ? 'EXCELLENT' : 'MONITORED'}</p></div></div>
                   <div className="text-right"><p className="text-[10px] font-black text-cyan-500 italic">2X GEM BOOST</p></div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-5">
                <ActionBox title="Nexus Shop" sub="60% OFF" icon={<ShoppingBag size={28}/>} color="text-green-500" onClick={() => setScreen("shop")} />
                <ActionBox title="Social Feed" sub="LIVE VIBE" icon={<Users size={28}/>} color="text-blue-500" onClick={() => setScreen("social")} />
             </div>
          </div>
        )}

        {/* --- SCREEN: GHOST MARKET (AUCTION) --- */}
        {screen === "ghost_market" && (
          <div className="p-6 space-y-8 animate-in zoom-in-95">
             <div className="text-center space-y-2"><h2 className="text-4xl font-black italic uppercase text-purple-400">The Vault</h2><p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Premium AI Assets - 1 Hour Only</p></div>
             <AuctionItem title="Hyper-Real V3 Lens" price="15,000 💎" />
             <AuctionItem title="Invisible Ghost Tag" price="25,000 💎" />
             <button onClick={() => setScreen("hub")} className="w-full py-5 bg-white/5 rounded-full text-[10px] font-black uppercase italic border border-white/10">Exit Market</button>
          </div>
        )}

        {screen === "home" && (
          <div className="h-screen flex flex-col items-center justify-center bg-[#010101]" onClick={() => setScreen("hub")}>
             <div className="w-48 h-48 bg-blue-600 rounded-[5rem] flex items-center justify-center text-9xl font-black italic shadow-[0_0_150px_rgba(37,99,235,0.5)] border-8 border-white/5 animate-pulse">RX</div>
             <p className="mt-16 text-[12px] font-black uppercase tracking-[0.8em] text-blue-500/60">Omniverse Sovereign Active</p>
          </div>
        )}
      </main>

      {/* --- SOVEREIGN NAV --- */}
      {screen !== "home" && screen !== "owner" && (
        <nav className="fixed bottom-0 left-0 right-0 h-24 bg-black/95 backdrop-blur-4xl border-t border-white/5 flex items-center justify-around z-[1000]">
          <NavBtn icon={<Share2/>} active={screen === 'social'} onClick={() => setScreen('social')} />
          <NavBtn icon={<ShoppingBag/>} active={screen === 'shop'} onClick={() => setScreen('shop')} />
          <div className="p-6 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 rounded-full -mt-14 shadow-[0_0_60px_rgba(37,99,235,0.4)] active:scale-90 transition cursor-pointer border-4 border-black" onClick={() => handleVibeCheck(true)}>
             <PlusSquare size={32} className="text-white"/>
          </div>
          <NavBtn icon={<Trophy/>} active={screen === 'ghost_market'} onClick={() => setScreen('ghost_market')} />
          <NavBtn icon={<LayoutGrid/>} active={screen === 'hub'} onClick={() => setScreen('hub')} />
        </nav>
      )}
    </div>
  );
}

/* --- OMNIVERSE CORE COMPONENTS (BINA KUCH KATE) --- */

function AdminControl({ label, val, onClick }: any) {
  return (
    <div className="p-7 bg-zinc-900/60 rounded-[2.5rem] border border-white/5 flex justify-between items-center active:bg-blue-600/10 transition" onClick={onClick}>
       <div><h4 className="text-[10px] font-black uppercase italic text-zinc-500 tracking-widest">{label}</h4><p className="text-lg font-black italic text-white">{val}</p></div>
       <Settings size={20} className="text-zinc-700"/>
    </div>
  );
}

function ActionBox({ title, sub, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className="p-10 bg-zinc-900/30 rounded-[3rem] border border-white/5 flex flex-col items-center gap-4 active:scale-95 transition group">
       <div className={`${color} group-hover:scale-110 transition-transform`}>{icon}</div>
       <div className="text-center"><h3 className="text-[11px] font-black italic uppercase text-white">{title}</h3><p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{sub}</p></div>
    </div>
  );
}

function AuctionItem({ title, price }: any) {
  return (
    <div className="p-7 bg-gradient-to-r from-zinc-900 to-zinc-950 border border-purple-500/20 rounded-[2.5rem] flex justify-between items-center">
       <div><h4 className="text-sm font-black italic uppercase text-white">{title}</h4><p className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">ONE OF ONE ASSET</p></div>
       <button className="bg-purple-600 px-6 py-2.5 rounded-full text-[10px] font-black uppercase italic shadow-lg shadow-purple-600/30">{price}</button>
    </div>
  );
}

function NavBtn({ icon, active, onClick }: any) {
  return <button onClick={onClick} className={`transition-all duration-500 ${active ? 'text-blue-400 scale-125' : 'text-zinc-600 opacity-50'}`}>{icon}</button>;
}
