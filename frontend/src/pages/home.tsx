// ... [Pichle saare Imports same rahenge] ...

export default function Home() {
  // --- 1. CORE STATES ---
  const [screen, setScreen] = useState("splash"); // Default "splash" rakha hai
  const [gems, setGems] = useState(() => Number(localStorage.getItem("rx_gems")) || 7500);
  const [notification, setNotification] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  // --- 2. AUTO-TRANSITION (Splash to Hub) ---
  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => {
        setScreen("hub"); // 3 second baad apne aap Hub par le jayega
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // ... [Baki saari States & Logic (AI, Music, Shop) SAME rakho] ...

  return (
    <div className="min-h-screen bg-[#010101] text-white font-sans overflow-hidden">
      
      {/* 1. SPLASH SCREEN LAYER */}
      {screen === "splash" && (
        <div className="fixed inset-0 z-[5000] bg-black flex flex-col items-center justify-center animate-out fade-out duration-1000 delay-[2500ms]">
           <div className="w-56 h-56 bg-blue-600 rounded-[5.5rem] flex items-center justify-center text-[10rem] font-black italic shadow-[0_0_150px_rgba(37,99,235,0.4)] animate-pulse">
              RX
           </div>
           <p className="mt-20 text-[11px] font-black uppercase tracking-[1.2em] text-blue-500/50">
              Nexus Sovereign Active
           </p>
        </div>
      )}

      {/* 2. GLOBAL HEADER (Splash ke baad hi dikhega) */}
      {screen !== "splash" && (
        <header className="fixed top-0 left-0 right-0 p-6 bg-black/95 backdrop-blur-3xl border-b border-white/5 z-[2000] flex justify-between items-center animate-in fade-in duration-500">
           <div className="flex items-center gap-3" onClick={() => setScreen("hub")}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">RX</div>
              <h1 className="text-xl font-black italic text-blue-500 tracking-tighter uppercase">Nexus</h1>
           </div>
           <div className="flex gap-3">
              <div className="bg-zinc-900 px-4 py-2 rounded-full border border-cyan-500/30 flex items-center gap-2">
                 <Gem size={12} className="text-cyan-400"/><span className="text-[10px] font-black italic">{gems.toLocaleString()}</span>
              </div>
              <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center" onDoubleClick={() => setScreen("owner")}>
                 <Settings size={16} className="text-zinc-600"/>
              </div>
           </div>
        </header>
      )}

      {/* 3. MAIN CONTENT AREA */}
      <main className={`transition-all duration-500 ${screen !== "splash" ? "pt-32 pb-44 px-4 h-screen overflow-y-auto" : "h-screen"}`}>
        
        {/* HUB SCREEN */}
        {screen === "hub" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
             <div className="grid grid-cols-2 gap-4">
                <ActionBox title="AI Studio" sub="CREATE" icon={<Wand2/>} color="text-blue-500" onClick={() => setScreen("ai_studio")} />
                <ActionBox title="Music" sub="STREAM" icon={<Music/>} color="text-purple-500" onClick={() => setScreen("music")} />
                <ActionBox title="Shop" sub="COUPONS" icon={<ShoppingBag/>} color="text-green-500" onClick={() => setScreen("shop")} />
                <ActionBox title="Status" sub="VIBE" icon={<Flame/>} color="text-orange-500" onClick={() => setScreen("hub")} />
             </div>
             
             {/* AFFILIATE SECTION */}
             <div className="mt-10 space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 px-2">Store Redirects</h3>
                <button onClick={() => window.open("https://amazon.in", "_blank")} className="w-full p-8 bg-zinc-900/40 border border-white/5 rounded-[3rem] flex justify-between items-center active:scale-95 transition">
                   <span className="font-black italic text-white uppercase text-sm">Amazon Store</span>
                   <ExternalLink size={20} className="text-zinc-700"/>
                </button>
             </div>
          </div>
        )}

        {/* ... [Baki Screens: shop, ai_studio, music, owner ka code same rahega] ... */}

      </main>

      {/* 4. GLOBAL NAVIGATION (Splash ke baad hi dikhega) */}
      {screen !== "splash" && screen !== "owner" && (
        <nav className="fixed bottom-0 left-0 right-0 h-28 bg-black/95 backdrop-blur-5xl border-t border-white/5 flex items-center justify-around z-[2000] px-4 animate-in slide-in-from-bottom-10">
           <NavBtn icon={<LayoutGrid size={24}/>} active={screen === 'hub'} onClick={() => setScreen('hub')} />
           <NavBtn icon={<Wand2 size={24}/>} active={screen === 'ai_studio'} onClick={() => setScreen('ai_studio')} />
           <div className="p-7 bg-blue-600 rounded-full -mt-20 border-4 border-black shadow-2xl active:scale-90 transition" onClick={() => showToast("📺 AD ENGINE READY")}>
              <Play size={38} className="text-white ml-1 fill-white"/>
           </div>
           <NavBtn icon={<Music size={24}/>} active={screen === 'music'} onClick={() => setScreen('music')} />
           <NavBtn icon={<ShoppingBag size={24}/>} active={screen === 'shop'} onClick={() => setScreen('shop')} />
        </nav>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[4000] bg-blue-600 px-10 py-4 rounded-full shadow-2xl animate-in zoom-in-90">
           <p className="text-[10px] font-black uppercase tracking-widest">{notification}</p>
        </div>
      )}
    </div>
  );
}
