import React, { useState, useEffect, useRef } from "react";
import {
  Zap, Sparkles, Plus, Gem, LayoutGrid, Video, MessageSquare, Music, ShoppingBag,
  Settings, Heart, MessageCircle, Send, Play, X, Image as ImageIcon, 
  Search, MoreHorizontal, Share2, Bell, Crown, ShoppingCart, User, 
  Mic, Music2, Scissors, Wand2, Star, Filter, CreditCard, Package, 
  Truck, ExternalLink, Smile, Camera, Globe, Bookmark, History, 
  Flame, Menu, MoreVertical, ChevronRight, Layers, Volume2
} from "lucide-react";
import { account, ID } from "@/lib/appwrite";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("social");
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);

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
      
      {/* --- TOP NAVBAR (FB STYLE) --- */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#1c1c1c] border-b border-white/10 z-[5000] flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
           <span className="text-2xl font-black italic text-blue-500 tracking-tighter">RACE-X</span>
        </div>
        <div className="flex gap-2">
          <div className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 cursor-pointer"><Search size={20} /></div>
          <div className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 cursor-pointer" onClick={() => setActiveTab('chat')}><MessageSquare size={20} /></div>
        </div>
      </header>

      {/* --- MAIN NAVIGATION SWITCHER --- */}
      <main className="pt-14 pb-24 max-w-[600px] mx-auto min-h-screen border-x border-white/5 bg-black">

        {/* 1. RX SOCIAL (FACEBOOK CLONE) */}
        {activeTab === "social" && (
          <div className="animate-in fade-in duration-500">
            {/* FB Story Section */}
            <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide bg-[#1c1c1c] mb-2">
               <div className="min-w-[100px] h-40 bg-zinc-800 rounded-xl relative overflow-hidden shrink-0 border border-white/5">
                  <div className="h-2/3 bg-blue-600" />
                  <div className="absolute bottom-2 w-full text-center text-[10px] font-bold">Create Story</div>
                  <div className="absolute top-24 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-[#1c1c1c] flex items-center justify-center"><Plus size={16}/></div>
               </div>
               {[1,2,3,4].map(i => (
                 <div key={i} className="min-w-[100px] h-40 bg-zinc-700 rounded-xl shrink-0 relative overflow-hidden shadow-lg">
                    <img src={`https://picsum.photos/seed/st${i}/200/300`} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-blue-500 bg-black" />
                 </div>
               ))}
            </div>

            {/* FB Post Box */}
            <div className="bg-[#1c1c1c] p-4 mb-2 border-y border-white/5">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 shrink-0" />
                <button onClick={() => setIsPostModalOpen(true)} className="flex-1 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 text-left px-4 py-2.5 rounded-full text-sm">What's on your mind, {user.name.split(' ')[0]}?</button>
              </div>
              <div className="flex mt-4 pt-2 border-t border-zinc-800 justify-around">
                <button className="flex items-center gap-2 text-xs font-bold text-zinc-400"><ImageIcon size={18} className="text-green-500"/> Photo</button>
                <button className="flex items-center gap-2 text-xs font-bold text-zinc-400"><Video size={18} className="text-red-500"/> Reel</button>
                <button className="flex items-center gap-2 text-xs font-bold text-zinc-400"><Smile size={18} className="text-yellow-500"/> Activity</button>
              </div>
            </div>

            {/* FB Timeline Feed */}
            <div className="space-y-2">
               {posts.map((p) => <FBPostCard key={p.id} post={p} />)}
            </div>
          </div>
        )}

        {/* 2. RX STUDIO (CANVA + AI TOOLS) */}
        {activeTab === "studio" && (
          <div className="p-5 space-y-6 animate-in slide-in-from-bottom-5">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black italic uppercase text-cyan-400">Creative Studio</h2>
                <Layers className="text-zinc-500" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <StudioBtn title="AI Canvas" icon={<ImageIcon className="text-pink-500"/>} bg="bg-pink-500/10" />
                <StudioBtn title="Voice Lab" icon={<Mic className="text-blue-500"/>} bg="bg-blue-500/10" />
                <StudioBtn title="Sound FX" icon={<Volume2 className="text-yellow-500"/>} bg="bg-yellow-500/10" />
                <StudioBtn title="Clip Editor" icon={<Scissors className="text-green-500"/>} bg="bg-green-500/10" />
             </div>
             <div className="bg-[#1c1c1c] rounded-3xl p-6 border border-white/10 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10"><Wand2 size={120} /></div>
                <h3 className="text-lg font-black mb-1">AI Voice Cloning</h3>
                <p className="text-xs text-zinc-500 mb-6 uppercase tracking-widest font-bold">11Labs Engine Integrated</p>
                <button className="bg-cyan-500 text-black px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest">Start Cloning</button>
             </div>
          </div>
        )}

        {/* 3. RX MAGIC CHAT (GEMINI CLONE) */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-[75vh] animate-in fade-in">
             <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-blue-500/20 max-w-[80%]">
                   <p className="text-sm font-bold text-blue-400 mb-2">RX-Magic AI</p>
                   <p className="text-sm">Hello {user.name}, how can I help you in the Nexus today? ⚡</p>
                </div>
                {chatHistory.map((c, i) => (
                  <div key={i} className={`flex ${c.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`p-4 rounded-2xl max-w-[85%] text-sm font-bold ${c.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>{c.text}</div>
                  </div>
                ))}
             </div>
             <div className="p-4 bg-[#1c1c1c] flex gap-2 items-center">
                <div className="flex-1 bg-black rounded-full px-5 py-3 flex items-center gap-3 border border-white/10">
                   <Sparkles size={18} className="text-blue-500" />
                   <input 
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    placeholder="Ask Gemini anything..." 
                    className="bg-transparent border-none outline-none text-sm w-full" 
                   />
                </div>
                <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center"><Send size={18}/></button>
             </div>
          </div>
        )}

        {/* 4. RX MUSIC (SPOTIFY CLONE) */}
        {activeTab === "music" && (
          <div className="p-5 space-y-6 animate-in slide-in-from-right-4">
             <h2 className="text-3xl font-black italic uppercase text-green-500">Spotify Vault</h2>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-indigo-900 to-black p-5 rounded-2xl border border-white/5 h-48 flex flex-col justify-end">
                   <h4 className="font-black text-lg">Daily Mix 1</h4>
                   <p className="text-[10px] uppercase font-bold text-zinc-400">Made for you</p>
                </div>
                <div className="bg-gradient-to-br from-green-900 to-black p-5 rounded-2xl border border-white/5 h-48 flex flex-col justify-end">
                   <h4 className="font-black text-lg">Nexus Phonk</h4>
                   <p className="text-[10px] uppercase font-bold text-zinc-400">AI Beats</p>
                </div>
             </div>
             <div className="space-y-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl group transition">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-800 rounded relative overflow-hidden">
                           <img src={`https://picsum.photos/seed/mus${i}/100`} />
                           <Play className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition" size={20}/>
                        </div>
                        <div>
                           <h4 className="font-bold text-sm">Nexus Track {i}</h4>
                           <p className="text-[10px] font-bold text-zinc-500 uppercase">AI Artist • 3:20</p>
                        </div>
                     </div>
                     <MoreHorizontal className="text-zinc-600" />
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* 5. RX SHOP (AMAZON CLONE) */}
        {activeTab === "shop" && (
           <div className="p-4 space-y-4 animate-in fade-in">
              <div className="bg-[#1c1c1c] p-4 rounded-xl flex items-center gap-3 border border-white/10">
                 <Search size={20} className="text-zinc-500" />
                 <input placeholder="Search Flipkart/Amazon..." className="bg-transparent outline-none text-sm w-full" />
              </div>
              <div className="bg-yellow-500 rounded-2xl p-6 flex justify-between items-center text-black">
                 <div>
                    <h3 className="text-2xl font-black italic">BIG SAVING DAYS</h3>
                    <p className="text-xs font-bold uppercase tracking-tighter">Min. 70% Off AI Gadgets</p>
                 </div>
                 <ChevronRight size={40} />
              </div>
              <div className="grid grid-cols-2 gap-3 pb-20">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="bg-[#1c1c1c] rounded-2xl p-3 border border-white/5">
                      <div className="aspect-square bg-zinc-800 rounded-xl mb-3 overflow-hidden">
                         <img src={`https://picsum.photos/seed/sh${i}/300`} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-xs font-bold truncate">RX-Nexus Smart Watch v{i}</h4>
                      <div className="flex items-center gap-2 mt-2">
                         <span className="text-green-500 font-bold">₹1,499</span>
                         <span className="text-[9px] text-zinc-500 line-through font-bold">₹3,999</span>
                      </div>
                      <button className="w-full mt-3 bg-yellow-500 text-black py-2 rounded-lg font-black text-[9px] uppercase tracking-widest active:scale-95 transition">Add to Cart</button>
                   </div>
                 ))}
              </div>
           </div>
        )}

      </main>

      {/* --- FOOTER NAV (INSTA STYLE) --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1c1c1c]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around px-2 z-[5000]">
        <NavIcon icon={<LayoutGrid size={26}/>} active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <NavIcon icon={<Zap size={26}/>} active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <div onClick={() => setIsPostModalOpen(true)} className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center -mt-8 shadow-2xl border-4 border-black active:scale-90 transition"><Plus size={28}/></div>
        <NavIcon icon={<Music size={26}/>} active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <NavIcon icon={<ShoppingBag size={26}/>} active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>

      {/* FB Post Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[6000] flex items-center justify-center p-6 backdrop-blur-md">
           <div className="bg-[#1c1c1c] w-full max-w-lg rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                 <h2 className="font-bold text-center w-full">Create Post</h2>
                 <X onClick={() => setIsPostModalOpen(false)} className="text-zinc-500 cursor-pointer" />
              </div>
              <div className="p-5">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600" />
                    <div><p className="font-bold text-sm">{user.name}</p><div className="flex items-center gap-1 text-zinc-500 text-[10px] font-bold bg-zinc-800 px-2 py-0.5 rounded-md"><Globe size={10}/> Public</div></div>
                 </div>
                 <textarea 
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`} 
                    className="w-full bg-transparent text-lg border-none outline-none min-h-[200px] resize-none"
                 />
                 <button onClick={handlePostSubmit} className="w-full bg-blue-600 py-3 rounded-lg font-black uppercase text-xs tracking-widest mt-4">Post</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function FBPostCard({ post }: any) {
  return (
    <div className="bg-[#1c1c1c] border-y border-white/5 pb-2">
       <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black text-xs italic">RX</div>
             <div>
                <h4 className="font-bold text-[15px]">{post.authorName}</h4>
                <p className="text-[10px] text-zinc-500 font-bold">{new Date(post.timestamp).toLocaleDateString()} • <Globe size={10} className="inline"/></p>
             </div>
          </div>
          <MoreHorizontal size={20} className="text-zinc-500" />
       </div>
       <div className="px-4 pb-4 text-[15px] leading-snug">{post.content}</div>
       <div className="px-4 py-3 flex justify-between border-t border-zinc-800 mt-2 mx-2">
          <button className="flex items-center gap-2 text-zinc-400 font-bold text-sm hover:bg-white/5 px-4 py-1.5 rounded-lg transition"><Heart size={20} /> Like</button>
          <button className="flex items-center gap-2 text-zinc-400 font-bold text-sm hover:bg-white/5 px-4 py-1.5 rounded-lg transition"><MessageCircle size={20} /> Comment</button>
          <button className="flex items-center gap-2 text-zinc-400 font-bold text-sm hover:bg-white/5 px-4 py-1.5 rounded-lg transition"><Share2 size={20} /> Share</button>
       </div>
    </div>
  );
}

function StudioBtn({ title, icon, bg }: any) {
  return (
    <div className={`${bg} p-6 rounded-3xl flex flex-col items-center gap-3 border border-white/5 cursor-pointer active:scale-95 transition`}>
       <div className="p-4 bg-black/40 rounded-2xl">{icon}</div>
       <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
    </div>
  );
}

function NavIcon({ icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-500'}`}>
      {icon}
    </button>
  );
}

// Keep your existing Splash and AuthScreen components here
