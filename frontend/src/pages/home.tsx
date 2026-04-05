import React, { useState, useEffect, useRef } from "react";
import {
  Zap, Sparkles, Plus, Gem, LayoutGrid, Video, MessageSquare, Music, ShoppingBag,
  Settings, Heart, MessageCircle, Send, Play, X, Image as ImageIcon, 
  Search, MoreHorizontal, Share2, Bell, Crown, ShoppingCart, User, 
  Mic, Music2, Scissors, Wand2, Star, Filter, CreditCard, Package, 
  Truck, ExternalLink, Smile, Camera, Globe, Bookmark, History, 
  Flame, Menu, MoreVertical, ChevronRight, Layers, Volume2, Home as HomeIcon
} from "lucide-react";
import { account, ID } from "@/lib/appwrite";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("hub"); // Start with HUB
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [msgInput, setMsgInput] = useState("");

  const RENDER_API = "https://race-x-nexus.onrender.com/api/social";

  useEffect(() => {
    const initApp = async () => {
      try {
        const activeUser = await account.get();
        setUser({ ...activeUser, gems: 7500 });
        fetchFeed();
      } catch (err) { setUser(null); }
      finally { setTimeout(() => setShowSplash(false), 1500); }
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
    <div className="bg-[#0f0f0f] min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* --- TOP NAVBAR --- */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#1c1c1c] border-b border-white/10 z-[5000] flex justify-between items-center px-4">
        <span className="text-2xl font-black italic text-blue-500 tracking-tighter">RACE-X</span>
        <div className="flex gap-2">
          <div className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 cursor-pointer"><Search size={20} /></div>
          <Bell size={20} className="text-zinc-500 mx-2" />
          <div className="w-8 h-8 rounded-full bg-blue-600 border border-white/10" />
        </div>
      </header>

      <main className="pt-14 pb-24 max-w-[600px] mx-auto min-h-screen border-x border-white/5 bg-black">

        {/* 0. THE NEXUS HUB (DASHBOARD) */}
        {activeTab === "hub" && (
          <div className="p-6 space-y-6 animate-in fade-in zoom-in-95 duration-500">
             <div className="bg-gradient-to-br from-blue-900/40 to-black p-8 rounded-[3rem] border border-blue-500/20 relative overflow-hidden">
                <Crown className="absolute -right-2 -top-2 text-blue-500 opacity-20" size={100} />
                <h1 className="text-3xl font-black italic mb-2 uppercase tracking-tighter leading-none">The <br/>Nexus Hub</h1>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">System Online • v4.0</p>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <HubCard title="Social" icon={<LayoutGrid size={32}/>} color="bg-blue-600" onClick={() => setActiveTab('social')} />
                <HubCard title="Studio" icon={<Zap size={32}/>} color="bg-purple-600" onClick={() => setActiveTab('studio')} />
                <HubCard title="Music" icon={<Music size={32}/>} color="bg-green-600" onClick={() => setActiveTab('music')} />
                <HubCard title="Shop" icon={<ShoppingBag size={32}/>} color="bg-orange-600" onClick={() => setActiveTab('shop')} />
                <HubCard title="Magic Chat" icon={<Sparkles size={32}/>} color="bg-indigo-600" onClick={() => setActiveTab('chat')} />
                <HubCard title="Profile" icon={<User size={32}/>} color="bg-zinc-800" onClick={() => setActiveTab('profile')} />
             </div>
          </div>
        )}

        {/* 1. RX SOCIAL (FACEBOOK CLONE) */}
        {activeTab === "social" && (
          <div className="animate-in fade-in duration-500">
            <div className="bg-[#1c1c1c] p-4 mb-2 border-y border-white/5">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600" />
                <button onClick={() => setIsPostModalOpen(true)} className="flex-1 bg-zinc-800/50 text-zinc-400 text-left px-4 py-2.5 rounded-full text-sm">What's on your mind?</button>
              </div>
            </div>
            <div className="space-y-2">
               {posts.map((p) => <FBPostCard key={p.id} post={p} />)}
            </div>
          </div>
        )}

        {/* 2. RX STUDIO (CANVA STYLE) */}
        {activeTab === "studio" && (
          <div className="p-5 space-y-6 animate-in slide-in-from-bottom-5">
             <h2 className="text-2xl font-black italic uppercase text-cyan-400">Creative Studio</h2>
             <div className="grid grid-cols-2 gap-4">
                <StudioBtn title="AI Canvas" icon={<ImageIcon className="text-pink-500"/>} bg="bg-pink-500/10" />
                <StudioBtn title="Voice Lab" icon={<Mic className="text-blue-500"/>} bg="bg-blue-500/10" />
                <StudioBtn title="Clip Editor" icon={<Scissors className="text-green-500"/>} bg="bg-green-500/10" />
                <StudioBtn title="Magic FX" icon={<Volume2 className="text-yellow-500"/>} bg="bg-yellow-500/10" />
             </div>
          </div>
        )}

        {/* 3. RX MAGIC CHAT (GEMINI CLONE) */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-[75vh] animate-in fade-in">
             <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-blue-500/20 max-w-[80%] text-sm">
                   Ask anything to Race-X AI...
                </div>
             </div>
             <div className="p-4 bg-[#1c1c1c] flex gap-2 border-t border-white/5">
                <input placeholder="Type magic..." className="flex-1 bg-black rounded-full px-5 py-3 text-sm border border-white/10" />
                <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center"><Send size={18}/></button>
             </div>
          </div>
        )}

        {/* 4. RX MUSIC (SPOTIFY CLONE) */}
        {activeTab === "music" && (
          <div className="p-5 space-y-6 animate-in fade-in">
             <h2 className="text-3xl font-black italic uppercase text-green-500 tracking-tighter">Music Vault</h2>
             <div className="space-y-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition group">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center"><Music size={20}/></div>
                        <div><h4 className="font-bold text-sm">Nexus Track {i}</h4><p className="text-[10px] text-zinc-500 uppercase">AI Symphony</p></div>
                     </div>
                     <Play size={20} className="text-zinc-600 group-hover:text-green-500 transition" />
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* 5. RX SHOP (AMAZON CLONE) */}
        {activeTab === "shop" && (
           <div className="p-4 space-y-4 animate-in slide-in-from-right-4">
              <div className="bg-yellow-500 rounded-2xl p-6 flex justify-between items-center text-black shadow-xl shadow-yellow-500/10">
                 <div><h3 className="text-2xl font-black italic uppercase">Super Sale</h3><p className="text-xs font-bold uppercase tracking-tighter">70% Off All AI Gear</p></div>
                 <ShoppingCart size={40} />
              </div>
              <div className="grid grid-cols-2 gap-3 pb-20">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="bg-[#1c1c1c] rounded-2xl p-3 border border-white/5 shadow-lg">
                      <div className="aspect-square bg-zinc-800 rounded-xl mb-3" />
                      <h4 className="text-xs font-bold truncate">RX Smart Gadget Pro v{i}</h4>
                      <p className="text-green-500 font-bold mt-2">₹1,999</p>
                      <button className="w-full mt-3 bg-yellow-500 text-black py-2 rounded-lg font-black text-[9px] uppercase">Add to Cart</button>
                   </div>
                 ))}
              </div>
           </div>
        )}

      </main>

      {/* --- FOOTER NAV (SAB KUCH FIXED) --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1c1c1c]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around px-2 z-[5000]">
        <button onClick={() => setActiveTab('hub')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'hub' ? 'text-blue-500 scale-110' : 'text-zinc-500'}`}><HomeIcon size={24}/><span className="text-[7px] font-black uppercase">Hub</span></button>
        <button onClick={() => setActiveTab('social')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'social' ? 'text-blue-500 scale-110' : 'text-zinc-500'}`}><LayoutGrid size={24}/><span className="text-[7px] font-black uppercase">Social</span></button>
        <div onClick={() => setIsPostModalOpen(true)} className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center -mt-8 shadow-2xl border-4 border-black active:scale-95 transition"><Plus size={28}/></div>
        <button onClick={() => setActiveTab('music')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'music' ? 'text-blue-500 scale-110' : 'text-zinc-500'}`}><Music size={24}/><span className="text-[7px] font-black uppercase">Music</span></button>
        <button onClick={() => setActiveTab('shop')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'shop' ? 'text-blue-500 scale-110' : 'text-zinc-500'}`}><ShoppingBag size={24}/><span className="text-[7px] font-black uppercase">Shop</span></button>
      </nav>

      {/* Post Modal and Other Screens (Keep existing) */}
    </div>
  );
}

function HubCard({ title, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className={`${color} p-6 rounded-[2.5rem] flex flex-col items-center gap-4 active:scale-95 transition shadow-xl border border-white/10 group overflow-hidden relative`}>
       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
       {icon}
       <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
    </div>
  );
}

function FBPostCard({ post }: any) {
  return (
    <div className="bg-[#1c1c1c] border-y border-white/5 pb-2">
       <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black italic text-xs">RX</div>
             <div><h4 className="font-bold text-[15px]">{post.authorName}</h4><p className="text-[10px] text-zinc-500">{new Date(post.timestamp).toLocaleDateString()}</p></div>
          </div>
          <MoreHorizontal size={20} className="text-zinc-500" />
       </div>
       <div className="px-4 pb-4 text-[15px] leading-snug">{post.content}</div>
       <div className="px-4 py-3 flex justify-between border-t border-zinc-800 mt-2 mx-2">
          <button className="flex items-center gap-2 text-zinc-400 font-bold text-sm"><Heart size={18} /> Like</button>
          <button className="flex items-center gap-2 text-zinc-400 font-bold text-sm"><MessageCircle size={18} /> Comment</button>
          <button className="flex items-center gap-2 text-zinc-400 font-bold text-sm"><Share2 size={18} /> Share</button>
       </div>
    </div>
  );
}

function StudioBtn({ title, icon, bg }: any) {
  return (
    <div className={`${bg} p-6 rounded-3xl flex flex-col items-center gap-3 border border-white/5 active:scale-95 transition`}>
       <div className="p-4 bg-black/40 rounded-2xl">{icon}</div>
       <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
    </div>
  );
}
