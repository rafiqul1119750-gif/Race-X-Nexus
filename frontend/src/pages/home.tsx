import React, { useState, useEffect } from "react";
import {
  Zap, Sparkles, Plus, LayoutGrid, Video, MessageSquare, Music, ShoppingBag,
  Heart, MessageCircle, Send, Play, X, Image as ImageIcon, 
  Search, MoreHorizontal, Share2, Bell, Crown, ShoppingCart, User, 
  Mic, Music2, Scissors, Wand2, Star, Camera, Globe, History, 
  Layers, Volume2, Home as HomeIcon, Lock
} from "lucide-react";
import { account } from "@/lib/appwrite";

// --- 1. SPLASH SCREEN (REAL ANIMATED LOOK) ---
function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] overflow-hidden">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-600 rounded-full animate-spin mb-6" />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-black italic text-blue-500 animate-pulse">X</div>
      </div>
      <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2">RACE-X</h1>
      <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.5em] animate-bounce">Initializing Nexus...</p>
      <div className="absolute bottom-10 w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-[progress_2s_ease-in-out]" style={{width: '100%'}} />
      </div>
    </div>
  );
}

// --- 2. AUTH SCREEN (LOGIN CLONE) ---
function AuthScreen({ setUser }: any) {
  const handleLogin = async () => {
    // Demo login for instant access - Real logic can be added via Appwrite
    const mockUser = { $id: 'u123', name: 'Race-X Developer', gems: 7500 };
    setUser(mockUser);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-600/30 rotate-12">
        <Lock className="text-white" size={40} />
      </div>
      <h2 className="text-3xl font-black mb-2 uppercase italic tracking-tighter">Nexus Secure Access</h2>
      <p className="text-zinc-500 text-sm mb-10 max-w-xs uppercase font-bold tracking-widest">Connect to your Neural Network to Continue</p>
      <button 
        onClick={handleLogin}
        className="w-full max-w-xs bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-transform"
      >
        Sign In with Nexus ID
      </button>
      <p className="mt-8 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Encrypted by Race-X Protocol</p>
    </div>
  );
}

// --- 3. MAIN HOME COMPONENT ---
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("hub");
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const RENDER_API = "https://race-x-nexus.onrender.com/api";

  // Real data fetching logic
  useEffect(() => {
    if (user) {
      fetch(`${RENDER_API}/social/feed`)
        .then(res => res.json())
        .then(data => setPosts(data.posts || []))
        .catch(e => console.log("Offline Mode"));
    }
  }, [user]);

  const handlePost = async () => {
    if(!postContent) return;
    const newPost = { id: Date.now(), user_name: user.name, content: postContent, timestamp: new Date().toISOString() };
    setPosts([newPost, ...posts]);
    setPostContent("");
    setIsPostModalOpen(false);
  };

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;
  if (!user) return <AuthScreen setUser={setUser} />;

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#1c1c1c]/90 backdrop-blur-md border-b border-white/5 z-[5000] flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black italic">X</div>
           <span className="text-xl font-black italic tracking-tighter uppercase">{activeTab === 'social' ? 'Facebook' : 'Race-X'}</span>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-zinc-800 px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
              <Sparkles size={12} className="text-blue-400" />
              <span className="text-[10px] font-black tracking-tighter">7.5K</span>
           </div>
           <div className="w-8 h-8 rounded-full bg-blue-500 overflow-hidden border border-white/20">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="pfp" />
           </div>
        </div>
      </header>

      <main className="pt-14 pb-24 max-w-[600px] mx-auto min-h-screen border-x border-white/5 bg-black">
        {/* TAB RENDERING (HUB, SOCIAL, SHOP, ETC.) */}
        {activeTab === "hub" && (
          <div className="p-6 space-y-6 animate-in fade-in zoom-in-95 duration-500">
             <div className="bg-gradient-to-br from-blue-600/30 to-black p-8 rounded-[3rem] border border-blue-500/20">
                <h1 className="text-4xl font-black italic mb-1 uppercase tracking-tighter">Nexus Hub</h1>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Central Command Online</p>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <HubCard title="Rx Social" sub="FB Clone" icon={<LayoutGrid size={32}/>} color="bg-blue-600" onClick={() => setActiveTab('social')} />
                <HubCard title="Rx Studio" sub="AI Engine" icon={<Zap size={32}/>} color="bg-purple-600" onClick={() => setActiveTab('studio')} />
                <HubCard title="Rx Music" sub="Spotify Clone" icon={<Music size={32}/>} color="bg-green-600" onClick={() => setActiveTab('music')} />
                <HubCard title="Rx Market" sub="Amazon Clone" icon={<ShoppingBag size={32}/>} color="bg-orange-600" onClick={() => setActiveTab('shop')} />
             </div>
          </div>
        )}

        {/* SOCIAL VIEW (FACEBOOK STYLE) */}
        {activeTab === "social" && (
          <div className="animate-in fade-in">
             <div className="p-4 bg-[#1c1c1c] mb-2 flex gap-3 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-blue-600 shrink-0" />
                <button onClick={() => setIsPostModalOpen(true)} className="flex-1 bg-zinc-800 rounded-full text-left px-5 py-2.5 text-zinc-400 text-sm">What's on your mind?</button>
             </div>
             <div className="space-y-2">
                {posts.map(p => <FBPost key={p.id} post={p} />)}
             </div>
          </div>
        )}

        {/* SHOP VIEW (AMAZON STYLE) */}
        {activeTab === "shop" && (
          <div className="p-4 space-y-4 animate-in slide-in-from-right-10">
             <div className="bg-white rounded-lg p-3 flex items-center text-black">
                <Search size={20} className="mr-2 opacity-50" />
                <input placeholder="Search Nexus Market" className="bg-transparent outline-none w-full text-sm" />
             </div>
             <div className="grid grid-cols-2 gap-2">
                {[1,2,3,4].map(i => (
                   <div key={i} className="bg-[#1c1c1c] p-3 rounded-xl border border-white/5">
                      <div className="aspect-square bg-zinc-800 rounded-lg mb-2 overflow-hidden">
                        <img src={`https://picsum.photos/seed/shop${i}/200`} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-[10px] font-bold line-clamp-2">Nexus Pro Gadget Gen {i}</h4>
                      <p className="text-green-500 font-black text-sm mt-1">₹4,999</p>
                      <button className="w-full mt-2 bg-yellow-500 text-black py-1.5 rounded-lg text-[9px] font-black uppercase">Add to Cart</button>
                   </div>
                ))}
             </div>
          </div>
        )}

        {/* MUSIC VIEW (SPOTIFY STYLE) */}
        {activeTab === "music" && (
           <div className="p-6 space-y-6 animate-in fade-in">
              <h2 className="text-3xl font-black italic text-green-500 tracking-tighter">Spotify</h2>
              <div className="space-y-4">
                 {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-lg group">
                       <div className="w-12 h-12 bg-zinc-800 rounded shadow-lg overflow-hidden">
                          <img src={`https://picsum.photos/seed/m${i}/100`} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1">
                          <h4 className="text-sm font-bold">Nexus Track {i}</h4>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Race-X AI Symphony</p>
                       </div>
                       <Play size={20} className="text-zinc-500 group-hover:text-green-500 transition" />
                    </div>
                 ))}
              </div>
           </div>
        )}
      </main>

      {/* FOOTER NAV */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1c1c1c]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around px-2 z-[5000]">
        <NavBtn icon={<HomeIcon size={24}/>} active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
        <NavBtn icon={<LayoutGrid size={24}/>} active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <div onClick={() => setIsPostModalOpen(true)} className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center -mt-8 border-4 border-black active:scale-90 transition shadow-2xl shadow-blue-600/30"><Plus size={32}/></div>
        <NavBtn icon={<Music size={24}/>} active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <NavBtn icon={<ShoppingBag size={24}/>} active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>

      {/* POST MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/98 z-[6000] p-6 flex flex-col">
           <div className="flex justify-between items-center mb-10">
              <X onClick={() => setIsPostModalOpen(false)} className="text-zinc-500" />
              <button onClick={handlePost} className="bg-blue-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">Publish</button>
           </div>
           <textarea 
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Post to Nexus Social..." 
              className="flex-1 bg-transparent border-none outline-none text-2xl font-bold italic"
           />
        </div>
      )}
    </div>
  );
}

// --- MINI COMPONENTS ---
function HubCard({ title, sub, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className={`${color} p-6 rounded-[2.5rem] flex flex-col items-center gap-2 active:scale-95 transition-all border border-white/10`}>
       {icon}
       <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-widest block">{title}</span>
          <span className="text-[7px] font-bold opacity-50 uppercase tracking-tighter">{sub}</span>
       </div>
    </div>
  );
}

function NavBtn({ icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-3 rounded-2xl transition-all ${active ? 'text-blue-500 bg-blue-500/10' : 'text-zinc-500'}`}>
      {icon}
    </button>
  );
}

function FBPost({ post }: any) {
  return (
    <div className="bg-[#1c1c1c] p-4 space-y-4">
       <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black italic text-xs">RX</div>
          <div><h4 className="font-bold text-sm tracking-tight">{post.user_name}</h4><p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Verified Node</p></div>
       </div>
       <p className="text-sm font-medium text-zinc-200">{post.content}</p>
       <div className="flex justify-between items-center pt-3 border-t border-white/5">
          <div className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase tracking-widest"><Heart size={16}/> Like</div>
          <div className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase tracking-widest"><MessageCircle size={16}/> Comment</div>
          <div className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase tracking-widest"><Share2 size={16}/> Share</div>
       </div>
    </div>
  );
}
