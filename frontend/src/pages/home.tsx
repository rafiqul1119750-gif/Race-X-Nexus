import React, { useState, useEffect, useRef } from "react";
import {
  Zap, Sparkles, Globe, Library, Plus, Gem,
  LayoutGrid, Video, Users, MessageSquare, Music, ShoppingBag,
  Settings, Heart, MessageCircle, Send, Play, Disc, ArrowLeft, Bell, Crown, 
  Pause, Activity, ShoppingCart, X, Eye, EyeOff, Image as ImageIcon, 
  Search, MoreHorizontal, Share2, Mic, Music2, Scissors, Wand2, Star, 
  Filter, CreditCard, Package, Truck, ExternalLink
} from "lucide-react";
import { account, ID } from "@/lib/appwrite";

/* ================= FULL NEXUS ENGINE ================= */
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("social");
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [playingId, setPlayingId] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const RENDER_API = "https://race-x-nexus.onrender.com/api/social";

  useEffect(() => {
    const initApp = async () => {
      try {
        const activeUser = await account.get();
        setUser({ ...activeUser, gems: 7500 });
        fetchFeed();
      } catch (err) { setUser(null); }
      finally { setTimeout(() => setShowSplash(false), 1800); }
    };
    initApp();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await fetch(`${RENDER_API}/feed`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) { console.error(err); }
  };

  const handlePostSubmit = async () => {
    if (!postContent) return;
    try {
      await fetch(`${RENDER_API}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: postContent, user_id: user.$id, user_name: user.name })
      });
      setPostContent(""); setIsPostModalOpen(false); fetchFeed();
    } catch (err) { alert("Post Error"); }
  };

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;
  if (!user) return <AuthScreen setUser={setUser} />;

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-600/30 overflow-hidden">
      
      {/* --- TOP DYNAMIC NAVIGATION --- */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-900/90 backdrop-blur-2xl border-b border-white/5 z-[5000] flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black italic text-blue-600 tracking-tighter">RX</span>
          <div className="hidden md:flex bg-zinc-800 px-4 py-2 rounded-full items-center gap-2">
            <Search size={16} className="text-zinc-500" />
            <input placeholder={`Search in ${activeTab}...`} className="bg-transparent outline-none text-xs w-48" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-cyan-400 tracking-widest">{user.gems} GEMS</span>
            <div className="w-16 h-1 bg-zinc-800 rounded-full mt-1"><div className="h-full bg-cyan-400 w-[70%]" /></div>
          </div>
          <Bell size={20} className="text-zinc-400 cursor-pointer" />
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/10" />
        </div>
      </header>

      {/* --- MAIN CONTENT SWITCHER --- */}
      <main className="pt-20 pb-32 max-w-[650px] mx-auto h-screen overflow-y-auto scrollbar-hide">

        {/* 1. RX SOCIAL (FACEBOOK CLONE) */}
        {activeTab === "social" && (
          <div className="space-y-4 animate-in fade-in duration-500">
            {/* Facebook style Create Box */}
            <div className="mx-4 bg-zinc-900 rounded-3xl p-5 border border-white/5 shadow-xl">
              <div className="flex gap-4 items-center">
                <div className="w-11 h-11 rounded-full bg-blue-600 shrink-0" />
                <button onClick={() => setIsPostModalOpen(true)} className="w-full bg-zinc-800 text-zinc-500 text-left px-6 py-3 rounded-full text-sm font-bold">What's on your mind, Racer?</button>
              </div>
              <div className="flex mt-4 pt-4 border-t border-white/5 justify-around">
                <button className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase"><ImageIcon size={16} className="text-green-500"/> Photo</button>
                <button className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase"><Video size={16} className="text-red-500"/> Reel</button>
                <button className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase"><Wand2 size={16} className="text-blue-500"/> AI Magic</button>
              </div>
            </div>
            {/* Feed Posts */}
            {posts.map((p: any) => <SocialCard key={p.id} post={p} />)}
          </div>
        )}

        {/* 2. RX STUDIO (AI TOOLS) */}
        {activeTab === "studio" && (
          <div className="px-6 space-y-6 animate-in slide-in-from-bottom-5">
            <h2 className="text-2xl font-black italic text-cyan-400 uppercase tracking-tighter">AI Creative Suite</h2>
            <div className="grid grid-cols-2 gap-4">
              <StudioTool title="Canva AI" desc="Design Visuals" icon={<ImageIcon className="text-pink-500"/>} />
              <StudioTool title="RX Voice" desc="Voice Cloning" icon={<Mic className="text-blue-500"/>} />
              <StudioTool title="Music Gen" desc="Text to Track" icon={<Music2 className="text-purple-500"/>} />
              <StudioTool title="FX Studio" desc="Sound Effects" icon={<Zap className="text-yellow-500"/>} />
            </div>
            <div className="bg-gradient-to-r from-blue-900/40 to-black p-8 rounded-[3rem] border border-blue-500/20 relative overflow-hidden">
               <Sparkles className="absolute top-4 right-4 text-blue-500 opacity-30" size={60} />
               <h3 className="text-xl font-black italic mb-2 uppercase">Magic Clip Editor</h3>
               <p className="text-xs text-zinc-400 mb-6">Convert long videos into AI-optimized Reels automatically.</p>
               <button className="bg-blue-600 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest">Open Editor</button>
            </div>
          </div>
        )}

        {/* 3. RX MUSIC (SPOTIFY CLONE) */}
        {activeTab === "music" && (
          <div className="px-6 space-y-8 animate-in fade-in">
             <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-blue-500">Music Vault</h2>
                <Filter size={20} className="text-zinc-500" />
             </div>
             <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {["Trending", "AI Beats", "Lo-Fi", "Phonk", "Old School"].map(t => (
                  <button key={t} className="bg-zinc-900 px-6 py-2 rounded-full text-[10px] font-black uppercase whitespace-nowrap border border-white/5">{t}</button>
                ))}
             </div>
             <div className="space-y-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/40 rounded-3xl border border-white/5 hover:bg-zinc-800 transition">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-zinc-800 rounded-xl overflow-hidden relative group">
                           <img src={`https://picsum.photos/seed/${i}/200`} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100"><Play size={20} /></div>
                        </div>
                        <div>
                           <h4 className="font-bold text-sm">Nexus Track #{i}</h4>
                           <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">AI Symphony • 3:45</p>
                        </div>
                     </div>
                     <MoreHorizontal size={20} className="text-zinc-600" />
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* 4. RX SHOP (AMAZON CLONE) */}
        {activeTab === "shop" && (
          <div className="px-6 space-y-6 animate-in slide-in-from-right-4">
             <div className="bg-orange-500 p-6 rounded-[2.5rem] flex justify-between items-center relative overflow-hidden">
                <ShoppingBag className="absolute -right-4 -bottom-4 text-white/20" size={100} />
                <div>
                   <h2 className="text-2xl font-black italic uppercase">Flash Deals</h2>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Up to 80% Off AI Gear</p>
                </div>
                <button className="bg-white text-orange-500 px-6 py-2 rounded-full font-black text-[10px] uppercase z-10">Shop Now</button>
             </div>
             <div className="grid grid-cols-2 gap-4 pb-20">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-zinc-900 rounded-[2rem] p-4 border border-white/5">
                     <div className="w-full aspect-square bg-zinc-800 rounded-2xl mb-4 overflow-hidden">
                        <img src={`https://picsum.photos/seed/shop${i}/300`} className="w-full h-full object-cover" />
                     </div>
                     <h4 className="text-xs font-bold line-clamp-1">RX-Pro Headset Neon Gen-4</h4>
                     <div className="flex items-center gap-2 mt-2">
                        <span className="text-blue-500 font-black">₹4,999</span>
                        <span className="text-[8px] text-zinc-500 line-through">₹9,999</span>
                     </div>
                     <button className="w-full mt-4 bg-zinc-800 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition">Add to Cart</button>
                  </div>
                ))}
             </div>
          </div>
        )}

      </main>

      {/* --- REAL-LOOK BOTTOM NAVIGATION --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/95 backdrop-blur-3xl border-t border-white/10 flex items-center justify-around px-2 z-[5000]">
        <NavIcon label="Social" icon={<LayoutGrid size={24}/>} active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <NavIcon label="Studio" icon={<Zap size={24}/>} active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <div onClick={() => setIsPostModalOpen(true)} className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center -mt-10 shadow-2xl shadow-blue-600/40 border-4 border-black active:scale-95 transition cursor-pointer">
          <Plus size={28} className="text-white" />
        </div>
        <NavIcon label="Music" icon={<Music size={24}/>} active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <NavIcon label="Shop" icon={<ShoppingBag size={24}/>} active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>

      {/* --- CREATE POST OVERLAY --- */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/98 z-[6000] flex items-center justify-center p-6 backdrop-blur-xl">
           <div className="bg-zinc-900 w-full max-w-lg rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl shadow-blue-500/10">
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-800/40">
                 <h2 className="font-black italic uppercase text-blue-500 tracking-tighter">Broadcasting Live</h2>
                 <X onClick={() => setIsPostModalOpen(false)} className="text-zinc-500 cursor-pointer" />
              </div>
              <div className="p-8">
                 <textarea 
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Sync your thoughts to the Nexus..." 
                    className="w-full bg-transparent text-xl font-bold border-none outline-none min-h-[220px] resize-none placeholder:text-zinc-700"
                 />
                 <div className="flex gap-4 mb-6">
                    <div className="bg-zinc-800 p-4 rounded-2xl cursor-pointer hover:bg-zinc-700"><ImageIcon size={20} className="text-green-500" /></div>
                    <div className="bg-zinc-800 p-4 rounded-2xl cursor-pointer hover:bg-zinc-700"><Play size={20} className="text-red-500" /></div>
                    <div className="bg-zinc-800 p-4 rounded-2xl cursor-pointer hover:bg-zinc-700"><Music size={20} className="text-purple-500" /></div>
                 </div>
                 <button 
                    onClick={handlePostSubmit}
                    disabled={!postContent}
                    className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-[0.4em] shadow-xl disabled:opacity-30 active:scale-95 transition"
                 > Launch Transmission </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

/* ================= CORE UI COMPONENTS ================= */

function SocialCard({ post }: any) {
  return (
    <div className="mx-4 bg-zinc-900/40 rounded-[2.8rem] border border-white/5 overflow-hidden shadow-lg mb-4">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-black italic text-[10px]">RX</div>
          <div>
            <h4 className="font-black italic uppercase text-xs tracking-tighter text-white">{post.authorName}</h4>
            <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Broadcasted • {new Date(post.timestamp).toLocaleTimeString()}</p>
          </div>
        </div>
        <MoreHorizontal size={18} className="text-zinc-600" />
      </div>
      <div className="px-8 pb-6">
        <p className="text-sm font-bold text-zinc-200 leading-relaxed">{post.content}</p>
      </div>
      <div className="px-6 py-5 flex justify-between border-t border-white/5 bg-zinc-900/30">
         <div className="flex gap-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Heart size={20} className="group-hover:text-red-500 transition-colors" />
              <span className="text-[9px] font-black uppercase">{post.likes || 0}</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <MessageCircle size={20} className="group-hover:text-blue-500 transition-colors" />
              <span className="text-[9px] font-black uppercase">{post.comments || 0}</span>
            </div>
            <Share2 size={20} className="text-zinc-500 cursor-pointer" />
         </div>
         <Crown size={18} className="text-yellow-500/40" />
      </div>
    </div>
  );
}

function StudioTool({ title, desc, icon }: any) {
  return (
    <div className="bg-zinc-900 p-6 rounded-[2.2rem] border border-white/5 hover:border-blue-500/30 transition cursor-pointer group">
       <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">{icon}</div>
       <h4 className="font-black text-xs uppercase italic tracking-tighter mb-1">{title}</h4>
       <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{desc}</p>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-500 hover:text-zinc-300'}`}>
      <div className={`transition-all duration-300 ${active ? 'bg-blue-600/10 p-2.5 rounded-xl border border-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]' : 'p-1'}`}>{icon}</div>
      <span className="text-[7px] font-black uppercase tracking-[0.2em]">{label}</span>
    </button>
  );
}

// ... Splash & AuthScreen (Keep existing logic) ...
