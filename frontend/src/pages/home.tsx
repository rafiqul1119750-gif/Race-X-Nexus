// ... [Pichle saare Imports same rakho] ...

export default function Home() {
  // --- 1. NAVIGATION & SPLASH ---
  // Default ko "hub" kar diya hai taaki pehle buttons dikhein
  const [activeTab, setActiveTab] = useState("hub"); 
  const [showSplash, setShowSplash] = useState(true);
  const [isLocked, setIsLocked] = useState(true);

  // --- 2. GLOBAL STATES ---
  const [wallet, setWallet] = useState(() => Number(localStorage.getItem("rx_gems")) || 7500);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([{ from: "ai", text: "NEXUS CORE ONLINE." }]);
  const [notification, setNotification] = useState<string | null>(null);

  // --- 3. ENGINE STATES ---
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // --- 4. SYSTEM INITIALIZATION ---
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    setPosts([
      { user: "NEXUS_CORE", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800", likes: "125K" },
      { user: "AI_MASTER", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800", likes: "89K" }
    ]);
    return () => clearTimeout(timer);
  }, []);

  const watchAdAndEarn = () => {
    setNotification("📺 LOADING AD...");
    setTimeout(() => {
      setWallet(prev => prev + 500);
      setNotification("💰 +500 GEMS!");
      setTimeout(() => setNotification(null), 2000);
    }, 3000);
  };

  return (
    <div className="bg-[#010101] min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* --- SPLASH SCREEN --- */}
      {showSplash && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
           <div className="w-48 h-48 bg-blue-600 rounded-[4rem] flex items-center justify-center text-8xl font-black italic shadow-[0_0_120px_rgba(37,99,235,0.4)] animate-pulse">RX</div>
           <p className="mt-10 text-[10px] font-black uppercase tracking-[1.2em] text-blue-500/40">Nexus Sovereign Active</p>
        </div>
      )}

      {/* --- TOP HEADER --- */}
      {!showSplash && (
        <header className="fixed top-0 left-0 right-0 p-5 bg-black/80 backdrop-blur-3xl border-b border-white/5 z-[2000] flex justify-between items-center animate-in fade-in">
           <div className="flex items-center gap-3" onClick={() => setActiveTab("hub")}>
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-black text-[10px]">RX</div>
              <h1 className="text-lg font-black italic tracking-tighter text-blue-500 uppercase">{activeTab}</h1>
           </div>
           <div className="flex gap-3">
              <div onClick={watchAdAndEarn} className="bg-zinc-900 px-4 py-2 rounded-full border border-orange-500/30 flex items-center gap-2 cursor-pointer">
                 <Play size={10} className="text-orange-500 fill-orange-500"/><span className="text-[9px] font-black uppercase text-orange-500">EARN</span>
              </div>
              <div className="bg-zinc-900 px-4 py-2 rounded-full border border-blue-500/20 flex items-center gap-2">
                 <Gem size={12} className="text-blue-400"/><span className="text-[10px] font-black italic">{wallet.toLocaleString()}</span>
              </div>
              <div className="w-9 h-9 flex items-center justify-center" onDoubleClick={() => setActiveTab("owner")}>
                 <Settings size={16} className="text-zinc-700"/>
              </div>
           </div>
        </header>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      {!showSplash && (
        <main className="pt-28 pb-40 px-4 max-w-[500px] mx-auto space-y-6">
          
          {/* 1. HUB SCREEN (PEHLE YEH DIKHEGA) */}
          {activeTab === "hub" && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
               <div className="grid grid-cols-2 gap-4">
                  <HubCard title="SOCIAL" desc="FEED" icon={<Share2 className="text-blue-500"/>} onClick={() => setActiveTab("social")} />
                  <HubCard title="STUDIO" desc="CREATE" icon={<Wand2 className="text-purple-500"/>} onClick={() => setActiveTab("studio")} />
                  <HubCard title="MUSIC" desc="STREAM" icon={<Music className="text-green-500"/>} onClick={() => setActiveTab("music")} />
                  <HubCard title="SHOP" desc="COUPONS" icon={<ShoppingBag className="text-orange-500"/>} onClick={() => setActiveTab("shop")} />
               </div>
               
               {/* QUICK AD SECTION */}
               <div className="mt-10 p-8 bg-gradient-to-br from-zinc-900 to-black rounded-[3rem] border border-white/5 flex justify-between items-center shadow-2xl active:scale-95 transition cursor-pointer" onClick={watchAdAndEarn}>
                  <div>
                    <h3 className="font-black italic text-sm">REVENUE NODE</h3>
                    <p className="text-[9px] text-zinc-500 uppercase font-bold mt-1">Watch Ad for 500 Gems</p>
                  </div>
                  <Play size={24} className="text-blue-600 fill-blue-600" />
               </div>
            </div>
          )}

          {/* 2. SOCIAL TAB */}
          {activeTab === "social" && (
            <div className="space-y-6 animate-in slide-in-from-right-10">
               {posts.map((p, i) => <PostItem key={i} {...p} />)}
            </div>
          )}

          {/* 3. STUDIO TAB (AI GENERATOR) */}
          {activeTab === "studio" && (
            <div className="space-y-6 animate-in slide-in-from-bottom-10">
               <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe..." className="w-full bg-zinc-900/40 border border-white/10 rounded-[2.5rem] p-7 text-sm font-black italic outline-none min-h-[160px]" />
               <button onClick={() => alert("Generating...")} className="w-full py-7 bg-blue-600 rounded-[2.5rem] font-black uppercase text-xs">Generate Asset (500 💎)</button>
            </div>
          )}

          {/* 4. MAGIC CHAT, MUSIC, SHOP, OWNER (Same as before...) */}
          {activeTab === "chat" && <MagicChat messages={messages} setMessages={setMessages} />}
          {activeTab === "music" && <div className="text-center py-20"><Disc size={150} className="mx-auto text-blue-500/20 animate-spin-slow" /><h2 className="mt-10 text-2xl font-black italic uppercase">Nexus Radio</h2></div>}
          {activeTab === "shop" && <ShopModule wallet={wallet} setWallet={setWallet} />}
          {activeTab === "owner" && <div className="p-10 text-center font-black italic uppercase text-blue-500">Admin Kernel Locked</div>}

        </main>
      )}

      {/* --- GLOBAL BOTTOM NAVIGATION --- */}
      {!showSplash && activeTab !== "owner" && (
        <nav className="fixed bottom-0 left-0 right-0 h-24 bg-black/95 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around z-[2000] px-2">
           <NavBtn label="HUB" active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} icon={<LayoutGrid size={22}/>} />
           <NavBtn label="SOCIAL" active={activeTab === 'social'} onClick={() => setActiveTab('social')} icon={<Share2 size={22}/>} />
           <div className="p-5 bg-blue-600 rounded-full -mt-12 border-4 border-black shadow-2xl active:scale-90 transition cursor-pointer" onClick={() => setActiveTab("chat")}>
              <MessageSquare size={28} className="text-white fill-white"/>
           </div>
           <NavBtn label="STUDIO" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} icon={<Wand2 size={22}/>} />
           <NavBtn label="SHOP" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} icon={<ShoppingBag size={22}/>} />
        </nav>
      )}

      {/* TOAST */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[4000] bg-blue-600 px-10 py-4 rounded-full shadow-2xl animate-in zoom-in-90">
           <p className="text-[10px] font-black uppercase tracking-widest text-white">{notification}</p>
        </div>
      )}
    </div>
  );
}

// ... [Sub-components same as before: HubCard, PostItem, NavBtn, MagicChat, ShopModule] ...
