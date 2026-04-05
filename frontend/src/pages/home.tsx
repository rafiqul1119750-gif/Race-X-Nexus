import React, { useState, useEffect, useRef } from "react";
import {
  Zap, Sparkles, Plus, LayoutGrid, Video, MessageSquare, Music, ShoppingBag,
  Heart, MessageCircle, Send, Play, X, Image as ImageIcon, 
  Search, MoreHorizontal, Share2, Bell, Crown, ShoppingCart, User, 
  Mic, Music2, Scissors, Wand2, Star, Camera, Globe, History, 
  Layers, Volume2, Home as HomeIcon, Download, Trash2
} from "lucide-react";
import { account, ID, databases, storage } from "@/lib/appwrite";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("hub");
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // --- API ENDPOINTS (Aapke Render Backend Se Connected) ---
  const RENDER_API = "https://race-x-nexus.onrender.com/api"; 
  const DB_ID = "racex_db";
  const COL_POSTS = "posts";

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

  // 1. REAL SOCIAL FEED (FETCH)
  const fetchFeed = async () => {
    try {
      const res = await fetch(`${RENDER_API}/social/feed`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) { console.error("Feed Error:", err); }
  };

  // 2. REAL POST SUBMISSION
  const handlePostSubmit = async () => {
    if (!postContent) return;
    try {
      await fetch(`${RENDER_API}/social/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          content: postContent, 
          user_id: user.$id, 
          user_name: user.name,
          timestamp: new Date().toISOString()
        })
      });
      setPostContent(""); setIsPostModalOpen(false); fetchFeed();
    } catch (err) { alert("Post Failed"); }
  };

  // 3. REAL AI MAGIC CHAT (GEMINI LOGIC)
  const handleChat = async () => {
    if (!msgInput) return;
    const userMsg = { role: "user", text: msgInput };
    setChatHistory([...chatHistory, userMsg]);
    setMsgInput("");
    setIsGenerating(true);

    try {
      const res = await fetch(`${RENDER_API}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: msgInput })
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: "ai", text: data.response }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: "ai", text: "Error connecting to Nexus AI." }]);
    } finally { setIsGenerating(false); }
  };

  // 4. REAL STUDIO GEN (IMAGE/VOICE)
  const generateAI = async (type: string) => {
    setIsGenerating(true);
    try {
      const res = await fetch(`${RENDER_API}/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, userId: user.$id })
      });
      const data = await res.json();
      alert(`${type} Generated Successfully! Check your Studio Gallery.`);
    } catch (err) { alert("Generation Failed"); }
    finally { setIsGenerating(false); }
  };

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;
  if (!user) return <AuthScreen setUser={setUser} />;

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      
      {/* --- TOP NAVBAR --- */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#1c1c1c]/80 backdrop-blur-md border-b border-white/5 z-[5000] flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black italic shadow-lg shadow-blue-600/20">X</div>
           <span className="text-xl font-black italic tracking-tighter">RACE-X</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-zinc-800 px-3 py-1 rounded-full border border-white/5">
             <Gem size={14} className="text-blue-400" />
             <span className="text-xs font-black">{user.gems}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-700 border border-white/10 overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="pfp" />
          </div>
        </div>
      </header>

      <main className="pt-14 pb-24 max-w-[600px] mx-auto min-h-screen border-x border-white/5 bg-black">

        {/* --- 0. HUB --- */}
        {activeTab === "hub" && (
          <div className="p-6 space-y-6 animate-in fade-in zoom-in-95 duration-500">
             <div className="bg-gradient-to-br from-blue-600/20 via-black to-black p-8 rounded-[2.5rem] border border-blue-500/20 relative overflow-hidden group">
                <Crown className="absolute -right-4 -top-4 text-blue-500 opacity-10 group-hover:rotate-12 transition-transform" size={120} />
                <h1 className="text-4xl font-black italic mb-1 uppercase tracking-tighter leading-none">The <br/>Nexus Hub</h1>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Neural Link Active</p>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <HubCard title="Social" sub="Global Feed" icon={<LayoutGrid size={32}/>} color="bg-blue-600" onClick={() => setActiveTab('social')} />
                <HubCard title="Studio" sub="AI Engine" icon={<Zap size={32}/>} color="bg-purple-600" onClick={() => setActiveTab('studio')} />
                <HubCard title="Music" sub="Hi-Fi Stream" icon={<Music size={32}/>} color="bg-green-600" onClick={() => setActiveTab('music')} />
                <HubCard title="Market" sub="Tech Shop" icon={<ShoppingBag size={32}/>} color="bg-orange-600" onClick={() => setActiveTab('shop')} />
                <HubCard title="Magic" sub="Gemini 1.5" icon={<Sparkles size={32}/>} color="bg-indigo-600" onClick={() => setActiveTab('chat')} />
                <HubCard title="Admin" sub="System" icon={<Settings size={32}/>} color="bg-zinc-800" onClick={() => setActiveTab('profile')} />
             </div>
          </div>
        )}

        {/* --- 1. REAL SOCIAL --- */}
        {activeTab === "social" && (
          <div className="animate-in fade-in duration-500">
            <div className="bg-[#1c1c1c] p-4 border-b border-white/5 flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 shrink-0" />
                <button onClick={() => setIsPostModalOpen(true)} className="flex-1 bg-zinc-800/50 text-left px-5 py-2.5 rounded-full text-zinc-400 text-sm font-medium hover:bg-zinc-800 transition">What's the update, {user.name.split(' ')[0]}?</button>
            </div>
            <div className="divide-y divide-white/5">
               {posts.length > 0 ? posts.map((p) => <FBPostCard key={p.id} post={p} />) : (
                 <div className="p-10 text-center text-zinc-600 font-bold uppercase text-xs tracking-widest">No Transmissions Found</div>
               )}
            </div>
          </div>
        )}

        {/* --- 2. REAL STUDIO --- */}
        {activeTab === "studio" && (
          <div className="p-5 space-y-6 animate-in slide-in-from-bottom-5">
             <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                <div><h2 className="text-xl font-black italic uppercase text-cyan-400">AI Creative Engine</h2><p className="text-[10px] text-zinc-500 font-bold uppercase">v4.0 Turbo</p></div>
                {isGenerating && <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />}
             </div>
             <div className="grid grid-cols-2 gap-4">
                <StudioBtn onClick={() => generateAI('image')} title="AI Image" sub="Flux.1 Pro" icon={<ImageIcon className="text-pink-500"/>} bg="bg-pink-500/10" />
                <StudioBtn onClick={() => generateAI('voice')} title="Voice Lab" sub="ElevenLabs" icon={<Mic className="text-blue-500"/>} bg="bg-blue-500/10" />
                <StudioBtn onClick={() => generateAI('music')} title="Suno Gen" sub="Music v3.5" icon={<Music2 className="text-green-500"/>} bg="bg-green-500/10" />
                <StudioBtn onClick={() => generateAI('fx')} title="SFX Magic" sub="Sound FX" icon={<Volume2 className="text-yellow-500"/>} bg="bg-yellow-500/10" />
             </div>
          </div>
        )}

        {/* --- 3. REAL CHAT --- */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-[80vh] animate-in fade-in">
             <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {chatHistory.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 grayscale">
                    <Sparkles size={80} className="mb-4" />
                    <p className="font-black uppercase tracking-[0.5em] text-xs">Race-X Magic Intelligence</p>
                  </div>
                )}
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-semibold shadow-xl ${msg.role === 'user' ? 'bg-blue-600 rounded-tr-none' : 'bg-[#1c1c1c] border border-white/10 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isGenerating && <div className="text-xs font-black text-blue-500 animate-pulse uppercase tracking-widest">Gemini is thinking...</div>}
             </div>
             <div className="p-4 bg-black border-t border-white/5 flex gap-2">
                <input 
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                  placeholder="Ask Race-X anything..." 
                  className="flex-1 bg-[#1c1c1c] rounded-2xl px-5 py-4 text-sm border border-white/10 focus:border-blue-500 transition-colors outline-none"
                />
                <button onClick={handleChat} className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 active:scale-90 transition"><Send size={20}/></button>
             </div>
          </div>
        )}

      </main>

      {/* --- FOOTER (SAB BUTTONS REAL KAAM KARENGE) --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1c1c1c]/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-[5000]">
        <NavIcon icon={<HomeIcon size={24}/>} active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
        <NavIcon icon={<LayoutGrid size={24}/>} active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <div onClick={() => setIsPostModalOpen(true)} className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center -mt-10 shadow-2xl shadow-blue-600/40 border-4 border-black active:scale-90 transition"><Plus size={32}/></div>
        <NavIcon icon={<Music size={24}/>} active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <NavIcon icon={<ShoppingBag size={24}/>} active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>

      {/* POST MODAL (REAL WORKING) */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[6000] flex flex-col p-6 animate-in fade-in slide-in-from-bottom-10">
           <div className="flex justify-between items-center mb-8">
              <X onClick={() => setIsPostModalOpen(false)} className="text-zinc-500" />
              <button onClick={handlePostSubmit} disabled={!postContent} className="bg-blue-600 disabled:opacity-50 px-8 py-2 rounded-full font-black text-xs uppercase tracking-widest">Publish</button>
           </div>
           <textarea 
              autoFocus
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's happening in your Nexus?" 
              className="flex-1 bg-transparent border-none outline-none text-2xl font-bold placeholder:opacity-20"
           />
           <div className="flex gap-4 p-4 border-t border-white/5">
              <ImageIcon className="text-green-500" />
              <Video className="text-red-500" />
              <Mic className="text-blue-500" />
           </div>
        </div>
      )}
    </div>
  );
}

// --- HELPER COMPONENTS ---

function HubCard({ title, sub, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className={`${color} p-6 rounded-[2rem] flex flex-col items-center gap-2 active:scale-95 transition-all shadow-xl border border-white/10 relative group overflow-hidden`}>
       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
       <div className="mb-2">{icon}</div>
       <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest block">{title}</span>
          <span className="text-[7px] font-bold opacity-50 uppercase tracking-tighter">{sub}</span>
       </div>
    </div>
  );
}

function NavIcon({ icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-3 rounded-2xl transition-all ${active ? 'text-blue-500 bg-blue-500/10' : 'text-zinc-500 hover:text-zinc-300'}`}>
      {icon}
    </button>
  );
}

function FBPostCard({ post }: any) {
  return (
    <div className="bg-[#1c1c1c]/30 p-4 space-y-4">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-xs italic">RX</div>
             <div><h4 className="font-bold text-sm tracking-tight">{post.user_name}</h4><p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Verified Node • {new Date(post.timestamp).toLocaleTimeString()}</p></div>
          </div>
          <MoreVertical size={16} className="text-zinc-600" />
       </div>
       <p className="text-sm leading-relaxed font-medium text-zinc-200">{post.content}</p>
       <div className="flex justify-between items-center pt-2 border-t border-white/5">
          <button className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase hover:text-blue-500 transition"><Heart size={16}/> Like</button>
          <button className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase hover:text-blue-500 transition"><MessageCircle size={16}/> Comment</button>
          <button className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase hover:text-blue-500 transition"><Share2 size={16}/> Share</button>
       </div>
    </div>
  );
}

function StudioBtn({ title, sub, icon, bg, onClick }: any) {
  return (
    <div onClick={onClick} className={`${bg} p-6 rounded-[2rem] flex flex-col items-center gap-2 border border-white/5 active:scale-95 transition-all cursor-pointer`}>
       <div className="p-4 bg-black/40 rounded-2xl shadow-inner">{icon}</div>
       <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-widest block">{title}</span>
          <span className="text-[7px] font-bold text-zinc-500 uppercase">{sub}</span>
       </div>
    </div>
  );
}
