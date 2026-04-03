// ... [Pichle saare Imports same rakho] ...

export default function Home() {
  const [screen, setScreen] = useState("splash"); // 1. Start with Splash
  const [gems, setGems] = useState(() => Number(localStorage.getItem("rx_gems")) || 7500);
  const [notification, setNotification] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  // --- 2. THE FIX: FORCE TRANSITION TO HUB ---
  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => {
        setScreen("hub"); // 3 Second baad Hub aana hi chahiye
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // ... [Baki Logic: watchAdAndEarn, redeemCoupon, generateAIImage same rakho] ...

  return (
    <div className="min-h-screen bg-[#010101] text-white font-sans overflow-hidden">
      
      {/* --- LAYER 1: SPLASH (Z-INDEX 5000) --- */}
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

      {/* --- LAYER 2: GLOBAL HEADER (Visible after splash) --- */}
      {screen !== "splash" && (
        <header className="fixed top-0 left-0 right-0 p-6 bg-black/95 backdrop-blur-3xl border-b border-white/5 z-[2000] flex justify-between items-center animate-in fade-in">
           <div className="flex items-center gap-3" onClick={() => setScreen("hub")}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">RX</div>
              <h1 className="text-xl font-black italic text-blue-500">NEXUS</h1>
           </div>
           <div className="flex gap-3">
              <div className="bg-zinc-900 px-4 py-2 rounded-full border border-cyan-500/30 flex items-center gap-2">
                 <Gem size={12} className="text-cyan-400"/><span className="text-[10px] font-black">{gems.toLocaleString()}</span>
              </div>
              <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center" onDoubleClick={() => setScreen("owner")}>
                 <Settings size={16} className="text-zinc-600"/>
              </div>
           </div>
        </header>
      )}

      {/* --- LAYER 3: MAIN HUB & SCREENS --- */}
      {screen !== "splash" && (
        <main className="pt-32 pb-44 px-4 h-screen overflow-y-auto animate-in fade-in duration-700">
          
          {/* HUB SCREEN (The missing part) */}
          {screen === "hub" && (
            <div className="space-y-8">
               <div className="grid grid-cols-2 gap-4">
                  <ActionBox title="AI Studio" sub="CREATE" icon={<Wand2/>} color="text-blue-500" onClick={() => setScreen("ai_studio")} />
                  <ActionBox title="Music" sub="STREAM" icon={<Music/>} color="text-purple-500" onClick={() => setScreen("music")} />
                  <ActionBox title="Shop" sub="COUPONS" icon={<ShoppingBag/>} color="text-green-500" onClick={() => setScreen("shop")} />
                  <ActionBox title="Nexus" sub="CORE" icon={<Flame/>} color="text-orange-500" onClick={() => setScreen("hub")} />
               </div>
               
               <div className="mt-8 space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 px-2">Earning Nodes</h3>
                  <button onClick={() => window.open("https://amazon.in", "_blank")} className="w-full p-8 bg-zinc-900/40 border border-white/5 rounded-[3rem] flex justify-between items-center active:scale-95 transition">
                     <span className="font-black italic text-white uppercase text-sm">Amazon Partner</span>
                     <ExternalLink size={20} className="text-zinc-700"/>
                  </button>
                  <button onClick={() => window.open("https://flipkart.com", "_blank")} className="w-full p-8 bg-zinc-900/40 border border-white/5 rounded-[3rem] flex justify-between items-center active:scale-95 transition">
                     <span className="font-black italic text-white uppercase text-sm">Flipkart Partner</span>
                     <ExternalLink size={20} className="text-zinc-700"/>
                  </button>
               </div>
            </div>
          )}

          {/* SHOP SCREEN */}
          {screen === "shop" && (
            <div className="space-y-6">
               <div className="p-10 bg-zinc-900/40 rounded-[4rem] text-center border border-white/5">
                  <Ticket size={40} className="mx-auto text-blue-500 mb-4"/>
                  <h2 className="text-2xl font-black italic uppercase">Coupon Vault</h2>
               </div>
               {/* [Coupons Mapping same as before] */}
            </div>
          )}

          {/* AI STUDIO SCREEN */}
          {screen === "ai_studio" && (
            <div className="space-y-6">
               <div className="p-10 bg-zinc-900/40 rounded-[4rem] text-center border border-white/5">
                  <Wand2 size={40} className="mx-auto text-blue-500 mb-4 animate-pulse"/>
                  <h2 className="text-2xl font-black italic uppercase">AI Studio</h2>
               </div>
               <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe..." className="w-full bg-zinc-900/40 border border-white/10 rounded-[3rem] p-8 text-sm outline-none" />
               <button onClick={generateAIImage} className="w-full py-8 bg-blue-600 rounded-[3rem] font-black uppercase text-xs">Generate (500 Gems)</button>
            </div>
          )}

          {/* MUSIC SCREEN */}
          {screen === "music" && (
             <div className="text-center py-10">
                <Disc size={150} className="mx-auto text-blue-500/20 mb-10 animate-spin-slow" />
                <h2 className="text-2xl font-black italic">Nexus Stream</h2>
                <p className="text-xs text-zinc-500 mt-4 uppercase font-bold">Premium AI Audio</p>
             </div>
          )}

          {/* OWNER PANEL */}
          {screen === "owner" && (
            <div className="p-8 space-y-6">
               <h2 className="text-2xl font-black italic text-blue-500">ADMIN KERNEL</h2>
               <div className="p-8 bg-zinc-900/60 rounded-[3rem] border border-white/5">
                  <p className="text-[10px] font-mono text-blue-400">System Secure: {isLocked ? "YES" : "NO"}</p>
               </div>
            </div>
          )}

        </main>
      )}

      {/* --- LAYER 4: GLOBAL FOOTER (Visible after splash) --- */}
      {screen !== "splash" && screen !== "owner" && (
        <nav className="fixed bottom-0 left-0 right-0 h-28 bg-black/95 backdrop-blur-5xl border-t border-white/5 flex items-center justify-around z-[2000] px-4">
           <NavBtn icon={<LayoutGrid size={24}/>} active={screen === 'hub'} onClick={() => setScreen('hub')} />
           <NavBtn icon={<Wand2 size={24}/>} active={screen === 'ai_studio'} onClick={() => setScreen('ai_studio')} />
           <div className="p-7 bg-blue-600 rounded-full -mt-20 border-4 border-black shadow-2xl active:scale-90 transition cursor-pointer" onClick={watchAdAndEarn}>
              <Play size={38} className="text-white ml-1 fill-white"/>
           </div>
           <NavBtn icon={<Music size={24}/>} active={screen === 'music'} onClick={() => setScreen('music')} />
           <NavBtn icon={<ShoppingBag size={24}/>} active={screen === 'shop'} onClick={() => setScreen('shop')} />
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

// ... [ActionBox aur NavBtn sub-components same rakho] ...
