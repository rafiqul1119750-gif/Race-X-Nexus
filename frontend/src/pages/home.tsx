import React, { useState, useEffect, useRef } from "react";
import {
  Zap, Sparkles, Globe, Library, Plus, Gem,
  LayoutGrid, Video, Users, MessageSquare, Music, ShoppingBag,
  Settings, Heart, MessageCircle, Send, Play, Disc, ArrowLeft, Bell, Crown, Pause, Activity, ShoppingCart, X, Eye, EyeOff, Image as ImageIcon
} from "lucide-react";
import { account, ID } from "@/lib/appwrite";

/* ================= MASTER APP (REAL CONNECTED) ================= */
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("social"); // Default Feed par rakha hai
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Post States
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");

  const RENDER_API = "https://race-x-nexus.onrender.com/api/social";

  // --- 1. Real Session & Feed Fetch ---
  useEffect(() => {
    const initApp = async () => {
      try {
        const activeUser = await account.get();
        setUser({ ...activeUser, gems: 7500 }); // Appwrite se user data
        fetchFeed();
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
        setTimeout(() => setShowSplash(false), 1800);
      }
    };
    initApp();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await fetch(`${RENDER_API}/feed`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Feed Error:", err);
    }
  };

  // --- 2. Real Post Submission ---
  const handlePostSubmit = async () => {
    if (!postContent) return;
    try {
      const res = await fetch(`${RENDER_API}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: postContent,
          user_id: user.$id,
          user_name: user.name,
          image_url: ""
        })
      });
      if (res.ok) {
        setPostContent("");
        setIsPostModalOpen(false);
        fetchFeed(); // Refresh feed after post
      }
    } catch (err) {
      alert("Post failed!");
    }
  };

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;
  if (!user) return <AuthScreen setUser={setUser} />;

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-hidden">
      
      {/* FACEBOOK STYLE TOP NAV */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-900/90 backdrop-blur-xl border-b border-white/5 z-[5000] flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black italic text-blue-600 tracking-tighter">RX</span>
          <div className="hidden md:flex bg-zinc-800 px-4 py-2 rounded-full items-center gap-2">
            <Search size={16} className="text-zinc-500" />
            <input placeholder="Search Nexus..." className="bg-transparent outline-none text-xs w-40" />
          </div>
        </div>
        <div className="flex items-center gap-5">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{user.gems} GEMS</span>
              <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-cyan-400 w-[60%]" />
              </div>
           </div>
           <Bell size={22} className="text-zinc-400" />
           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 border border-white/20" />
        </div>
      </header>

      {/* CONTENT ENGINE */}
      <main className="pt-20 pb-32 max-w-[650px] mx-auto h-screen overflow-y-auto scrollbar-hide">
        
        {/* FACEBOOK STYLE "WHAT'S ON YOUR MIND" */}
        {activeTab === "social" && (
          <div className="px-4 mb-6 mt-4">
            <div className="bg-zinc-900 rounded-3xl p-5 border border-white/5 shadow-xl">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 shrink-0" />
                <button 
                  onClick={() => setIsPostModalOpen(true)}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-500 text-left px-6 py-3 rounded-full text-sm font-bold transition-all"
                >
                  What's the hype, {user.name.split(' ')[0]}?
                </button>
              </div>
              <div className="flex mt-4 pt-4 border-t border-white/5 justify-around">
                <button className="flex items-center gap-2 text-xs font-black text-zinc-400"><ImageIcon size={18} className="text-green-500"/> Photo</button>
                <button className="flex items-center gap-2 text-xs font-black text-zinc-400"><Video size={18} className="text-red-500"/> Reel</button>
                <button className="flex items-center gap-2 text-xs font-black text-zinc-400"><Plus size={18} className="text-blue-500"/> Live</button>
              </div>
            </div>
          </div>
        )}

        {/* FEED / SOCIAL CONTENT */}
        <div className="space-y-4 px-4 pb-20">
          {activeTab === "social" && posts.map((p: any) => (
            <PostCard key={p.id} post={p} />
          ))}
          {/* Default message if no posts */}
          {activeTab === "social" && posts.length === 0 && (
             <div className="text-center py-20 text-zinc-600 font-black italic uppercase tracking-widest">Nexus Synchronizing...</div>
          )}
        </div>

      </main>

      {/* INSTAGRAM STYLE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around px-2 z-[5000]">
        <NavIcon label="Feed" icon={<LayoutGrid size={24}/>} active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <NavIcon label="Music" icon={<Music size={24}/>} active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <div onClick={() => setIsPostModalOpen(true)} className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center -mt-10 shadow-2xl shadow-blue-600/40 border-4 border-black active:scale-90 transition">
          <Plus size={30} className="text-white" />
        </div>
        <NavIcon label="Chat" icon={<MessageSquare size={24}/>} active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <NavIcon label="Profile" icon={<User size={24}/>} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </nav>

      {/* CREATE POST MODAL (FACEBOOK STYLE) */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[6000] flex items-center justify-center p-6 backdrop-blur-md">
           <div className="bg-zinc-900 w-full max-w-lg rounded-[2.5rem] border border-white/10 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-800/30">
                 <h2 className="font-black italic uppercase text-blue-500 tracking-tighter">New Transmission</h2>
                 <X onClick={() => setIsPostModalOpen(false)} className="text-zinc-500 cursor-pointer" />
              </div>
              <div className="p-8">
                 <textarea 
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Broadcast to the Nexus..." 
                    className="w-full bg-transparent text-xl font-bold border-none outline-none min-h-[200px] resize-none"
                 />
                 <button 
                    onClick={handlePostSubmit}
                    disabled={!postContent}
                    className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl hover:bg-blue-700 transition disabled:opacity-30"
                 > Launch Post </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function PostCard({ post }: any) {
  return (
    <div className="bg-zinc-900/50 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-xl">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center font-black italic text-xs border border-white/10">RX</div>
          <div>
            <h4 className="font-black italic uppercase text-xs tracking-tighter text-white">{post.authorName}</h4>
            <p className="text-[8px] font-black text-zinc-500 uppercase">{new Date(post.timestamp).toLocaleTimeString()}</p>
          </div>
        </div>
        <MoreHorizontal size={20} className="text-zinc-600" />
      </div>
      <div className="px-8 pb-6">
        <p className="text-sm font-bold text-zinc-200 leading-relaxed">{post.content}</p>
      </div>
      {post.imageUrl && <img src={post.imageUrl} className="w-full h-80 object-cover border-y border-white/5" />}
      <div className="p-6 flex justify-between border-t border-white/5 bg-zinc-900/20">
         <div className="flex gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Heart size={22} className="group-hover:text-red-500 transition-colors" />
              <span className="text-[10px] font-black uppercase">{post.likes}</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <MessageCircle size={22} className="group-hover:text-blue-500 transition-colors" />
              <span className="text-[10px] font-black uppercase">{post.comments}</span>
            </div>
         </div>
         <Send size={22} className="text-zinc-500 cursor-pointer" />
      </div>
    </div>
  );
}

// ... Splash, AuthScreen, NavIcon code (Baki logic pehle wala hi use karein) ...
