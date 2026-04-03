import React, { useState, useEffect } from "react";
import { 
  Sparkles, MessageSquare, Share2, Music, ShoppingBag, 
  Heart, MessageCircle, Send, Wallet, TrendingUp, Layers, 
  MoreHorizontal, Bookmark, Play, Gem, Ticket, ExternalLink, 
  Wand2, Disc, Settings, LayoutGrid, Flame
} from "lucide-react";

export default function Home() {
  // 1. SETTINGS & STATES
  const [activeTab, setActiveTab] = useState("hub"); // Default Screen
  const [showSplash, setShowSplash] = useState(true); // Single Splash Control
  const [wallet, setWallet] = useState(() => Number(localStorage.getItem("rx_gems")) || 7500);
  const [notification, setNotification] = useState<string | null>(null);

  // 2. SPLASH TIMER (3 Seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); // Splash hat jayega, Hub piche ready hai
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 3. ACTIONS
  const watchAd = () => {
    setNotification("📺 LOADING AD...");
    setTimeout(() => {
      setWallet(prev => prev + 500);
      setNotification("💰 +500 GEMS!");
      setTimeout(() => setNotification(null), 2000);
    }, 3000);
  };

  return (
    <div className="bg-[#010101] min-h-screen text-white font-sans overflow-hidden">
      
      {/* --- SINGLE SPLASH OVERLAY --- */}
      {showSplash && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
           <div className="w-44 h-44 bg-blue-600 rounded-[4rem] flex items-center justify-center text-8xl font-black italic shadow-[0_0_100px_rgba(37,99,235,0.4)] animate-pulse">
              RX
           </div>
           <p className="mt-10 text-[10px] font-black uppercase tracking-[1em] text-blue-500/40">Nexus Active</p>
        </div>
      )}

      {/* --- GLOBAL HEADER (Visible after Splash) --- */}
      {!showSplash && (
        <header className="fixed top-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-2xl border-b border-white/5 z-[2000] flex justify-between items-center animate-in fade-in duration-700">
           <div className="flex items-center gap-3" onClick={() => setActiveTab("hub")}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">RX</div>
              <h1 className="text-xl font-black italic text-blue-500 uppercase tracking-tighter">Nexus</h1>
           </div>
           <div className="flex items-center gap-3">
              <div className="bg-zinc-900 px-4 py-2 rounded-full border border-blue-500/20 flex items-center gap-2">
                 <Gem size={14} className="text-blue-400"/><span className="text-xs font-black italic">{wallet.toLocaleString()}</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center" onDoubleClick={() => setActiveTab("owner")}>
                 <Settings size={18} className="text-zinc-700"/>
              </div>
           </div>
        </header>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <main className={`pt-32 pb-40 px-4 max-w-[500px] mx-auto h-screen overflow-y-auto ${showSplash ? 'hidden' : 'block animate-in fade-in'}`}>
        
        {/* HUB SCREEN (Bade Buttons) */}
        {activeTab === "hub" && (
          <div className="space-y-8">
             <div className="grid grid-cols-2 gap-5">
                <HubCard title="SOCIAL" desc="FEED" icon={<Share2 size={24}/>} color="text-blue-500" onClick={() => setActiveTab("social")} />
                <HubCard title="STUDIO" desc="CREATE" icon={<Wand2 size={24}/>} color="text-purple-500" onClick={() => setActiveTab("studio")} />
                <HubCard title="MUSIC" desc="STREAM" icon={<Music size={24}/>} color="text-green-500" onClick={() => setActiveTab("music")} />
                <HubCard title="SHOP" desc="COUPONS" icon={<ShoppingBag size={24}/>} color="text-orange-500" onClick={() => setActiveTab("shop")} />
             </div>
             
             {/* QUICK EARN CARD */}
             <div onClick={watchAd} className="p-10 bg-gradient-to-br from-zinc-900 to-black rounded-[3.5rem] border border-white/5 flex justify-between items-center shadow-2xl active:scale-95 transition cursor-pointer mt-10">
                <div>
                  <h3 className="font-black italic text-sm text-white">REVENUE NODE</h3>
                  <p className="text-[9px] text-zinc-500 uppercase font-bold mt-1 tracking-widest">GET 500 GEMS NOW</p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                   <Play size={20} className="text-white fill-white ml-1"/>
                </div>
             </div>
          </div>
        )}

        {/* SOCIAL TAB */}
        {activeTab === "social" && (
          <div className="space-y-6 animate-in slide-in-from-right-10">
             <PostItem user="NEXUS_CORE" img="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800" likes="125K" />
             <PostItem user="AI_MASTER" img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800" likes="89K" />
          </div>
        )}

        {/* STUDIO TAB */}
        {activeTab === "studio" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-10">
             <textarea placeholder="Describe AI Output..." className="w-full bg-zinc-900/40 border border-white/10 rounded-[3rem] p-8 text-sm font-black italic outline-none min-h-[180px] focus:border-blue-500 transition-all" />
             <button onClick={() => alert("Processing...")} className="w-full py-8 bg-blue-600 rounded-[3rem] font-black uppercase text-xs shadow-xl active:scale-95 transition">Materialize (500 💎)</button>
          </div>
        )}

        {/* MUSIC & SHOP (Simplified placeholders for speed) */}
        {activeTab === "music" && <div className="text-center py-20 animate-pulse"><Disc size={150} className="mx-auto text-blue-500/20 mb-10"/><h2 className="text-2xl font-black italic">Nexus Radio</h2></div>}
        {activeTab === "shop" && <div className="text-center py-20"><ShoppingBag size={100} className="mx-auto text-orange-500/20 mb-10"/><h2 className="text-2xl font-black italic">Coupon Vault</h2></div>}

      </main>

      {/* --- GLOBAL BOTTOM NAV (Visible after Splash) --- */}
      {!showSplash && (
        <nav className="fixed bottom-0 left-0 right-0 h-28 bg-black/90 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around z-[2000] px-4 animate-in slide-in-from-bottom-10">
           <NavBtn label="HUB" active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} icon={<LayoutGrid size={24}/>} />
           <NavBtn label="SOCIAL" active={activeTab === 'social'} onClick={() => setActiveTab('social')} icon={<Share2 size={24}/>} />
           <div className="p-7 bg-blue-600 rounded-full -mt-20 border-4 border-black shadow-[0_0_50px_rgba(37,99,235,0.4)] active:scale-90 transition cursor-pointer" onClick={() => setActiveTab("chat")}>
              <MessageSquare size={32} className="text-white fill-white"/>
           </div>
           <NavBtn label="STUDIO" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} icon={<Wand2 size={24}/>} />
           <NavBtn label="SHOP" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} icon={<ShoppingBag size={24}/>} />
        </nav>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[4000] bg-blue-600 px-10 py-4 rounded-full shadow-2xl animate-in zoom-in-90">
           <p className="text-[10px] font-black uppercase tracking-widest text-white">{notification}</p>
        </div>
      )}
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

function NavBtn({ label, active, onClick, icon }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all duration-500 ${active ? 'text-blue-500 scale-125' : 'text-zinc-700'}`}>
       {icon}
       <span className="text-[7px] font-black tracking-widest">{label}</span>
    </button>
  );
}

function HubCard({ title, desc, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className="p-8 bg-zinc-900/40 border border-white/5 rounded-[3rem] flex flex-col items-center gap-4 active:scale-95 transition-all shadow-inner cursor-pointer">
       <div className={color}>{icon}</div>
       <div className="text-center">
          <h3 className="text-[11px] font-black italic text-zinc-500 uppercase">{title}</h3>
          <p className="text-[12px] font-black uppercase text-white tracking-tighter">{desc}</p>
       </div>
    </div>
  );
}

function PostItem({ user, img, likes }: any) {
  return (
    <div className="bg-zinc-900/30 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl mb-4">
       <div className="p-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-black text-[9px]">RX</div>
          <span className="text-[11px] font-black italic tracking-widest uppercase">{user}</span>
       </div>
       <img src={img} className="w-full aspect-square object-cover" />
       <div className="p-6">
          <div className="flex gap-6 mb-4">
             <Heart size={22} className="hover:text-red-500 transition-colors" />
             <MessageCircle size={22} />
             <Send size={22} />
          </div>
          <p className="text-[10px] font-black italic text-blue-500 uppercase tracking-widest">{likes} INTERACTIONS</p>
       </div>
    </div>
  );
}
