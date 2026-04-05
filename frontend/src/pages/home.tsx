import React, { useState, useEffect, useRef } from "react";
import {
  Zap, Sparkles, Plus, Gem, LayoutGrid, Video, MessageSquare, Music, ShoppingBag,
  Settings, Heart, MessageCircle, Send, Play, X, Image as ImageIcon, 
  Search, MoreHorizontal, Share2, Bell, Crown, ShoppingCart, User, 
  Mic, Music2, Scissors, Wand2, Star, Filter, CreditCard, Package, 
  Truck, ExternalLink, Smile, Camera, Globe, Bookmark, History, 
  Flame, Menu, MoreVertical, ChevronRight, Layers, Volume2, Home as HomeIcon,
  Download, ListMusic, Disc, Radio, Repeat, Shuffle, SkipBack, SkipForward,
  MapPin, CheckCircle, Gift, CreditCard as CardIcon, Lock
} from "lucide-react";
import { account, ID } from "@/lib/appwrite";

// --- 1. REAL SPLASH COMPONENT ---
function Splash({ onDone }: { onDone: () => void }) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
      <div className="relative mb-8">
        <div className="w-28 h-28 border-[6px] border-blue-500/10 border-t-blue-600 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-black italic text-blue-500">X</div>
      </div>
      <h1 className="text-5xl font-black italic tracking-tighter text-white mb-2 animate-pulse">RACE-X</h1>
      <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.6em]">Neural Link v4.0</p>
      <div className="absolute bottom-20 w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 animate-[progress_2.5s_ease-in-out]" style={{width: '100%'}} />
      </div>
    </div>
  );
}

// --- 2. REAL AUTH SCREEN ---
function AuthScreen({ setUser }: any) {
  const handleLogin = () => setUser({ $id: 'dev_01', name: 'Race-X Admin', gems: 7500 });
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-10">
      <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(37,99,235,0.3)] rotate-12">
        <Lock className="text-white" size={44} />
      </div>
      <h2 className="text-4xl font-black mb-3 italic tracking-tighter uppercase">Nexus Login</h2>
      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-12 text-center">Biometric & Neural Encryption Active</p>
      <button onClick={handleLogin} className="w-full max-w-sm bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl">Start Synchronization</button>
      <div className="mt-12 flex gap-6 opacity-30">
        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
        <div className="w-2 h-2 bg-white rounded-full animate-ping [animation-delay:0.2s]" />
        <div className="w-2 h-2 bg-white rounded-full animate-ping [animation-delay:0.4s]" />
      </div>
    </div>
  );
}

// --- 3. MAIN APP ---
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("hub");
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const RENDER_API = "https://race-x-nexus.onrender.com/api";

  useEffect(() => {
    if (user) {
      fetch(`${RENDER_API}/social/feed`).then(r => r.json()).then(d => setPosts(d.posts || [])).catch(() => {});
    }
  }, [user]);

  const handlePostSubmit = () => {
    if (!postContent) return;
    const newPost = { id: Date.now(), user_name: user.name, content: postContent, timestamp: new Date().toISOString() };
    setPosts([newPost, ...posts]);
    setPostContent("");
    setIsPostModalOpen(false);
  };

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;
  if (!user) return <AuthScreen setUser={setUser} />;

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* --- PREMIUM HEADER --- */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#121212]/80 backdrop-blur-2xl border-b border-white/5 z-[5000] flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-blue-600/20 text-xl">X</div>
          <span className="text-2xl font-black italic tracking-tighter uppercase">{activeTab === 'social' ? 'Facebook' : activeTab === 'music' ? 'Spotify' : 'Race-X'}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-zinc-900 border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
            <Gem size={14} className="text-blue-400" />
            <span className="text-xs font-black tracking-tighter">{user.gems.toLocaleString()}</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-blue-500/50 p-0.5"><img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`} className="rounded-full bg-zinc-800" /></div>
        </div>
      </header>

      <main className="pt-16 pb-28 max-w-[600px] mx-auto min-h-screen border-x border-white/5 bg-black">

        {/* --- 0. NEXUS HUB (DASHBOARD) --- */}
        {activeTab === "hub" && (
          <div className="p-6 space-y-6 animate-in fade-in zoom-in-95 duration-500">
             <div className="bg-gradient-to-br from-blue-600/20 via-black to-black p-10 rounded-[3.5rem] border border-blue-500/20 relative overflow-hidden group">
                <Crown className="absolute -right-6 -top-6 text-blue-500 opacity-10 group-hover:rotate-12 transition-transform" size={150} />
                <h1 className="text-5xl font-black italic mb-2 uppercase tracking-tighter leading-none">The <br/>Nexus Hub</h1>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> Neural System Online</p>
             </div>
             <div className="grid grid-cols-2 gap-5">
                <HubCard title="Rx Social" sub="Facebook Clone" icon={<LayoutGrid size={36}/>} color="bg-blue-600" onClick={() => setActiveTab('social')} />
                <HubCard title="Rx Studio" sub="AI Lab" icon={<Zap size={36}/>} color="bg-purple-600" onClick={() => setActiveTab('studio')} />
                <HubCard title="Rx Music" sub="Spotify Clone" icon={<Music size={36}/>} color="bg-green-600" onClick={() => setActiveTab('music')} />
                <HubCard title="Rx Market" sub="Amazon Clone" icon={<ShoppingBag size={36}/>} color="bg-orange-600" onClick={() => setActiveTab('shop')} />
                <HubCard title="Magic Chat" sub="Gemini 1.5" icon={<Sparkles size={36}/>} color="bg-indigo-600" onClick={() => setActiveTab('chat')} />
                <HubCard title="System" sub="God Mode" icon={<Settings size={36}/>} color="bg-zinc-800" onClick={() => setActiveTab('profile')} />
             </div>
          </div>
        )}

        {/* --- 1. RX SOCIAL (FB CLONE) --- */}
        {activeTab === "social" && (
          <div className="animate-in fade-in duration-500">
             <div className="bg-[#121212] p-5 mb-2 border-y border-white/5 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 shrink-0 shadow-lg" />
                <button onClick={() => setIsPostModalOpen(true)} className="flex-1 bg-zinc-800/50 text-left px-6 py-3 rounded-full text-zinc-400 text-sm font-bold border border-white/5">What's on your mind?</button>
             </div>
             <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar bg-[#121212] mb-2 border-y border-white/5">
                <div className="min-w-[120px] h-48 bg-zinc-800 rounded-2xl relative overflow-hidden flex flex-col">
                   <div className="h-2/3 bg-zinc-700" /><div className="flex-1 bg-[#121212]" />
                   <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-10 h-10 bg-blue-600 rounded-full border-4 border-[#121212] flex items-center justify-center"><Plus size={24}/></div>
                   <div className="absolute bottom-2 w-full text-center text-[10px] font-black uppercase">Create Story</div>
                </div>
                {[1,2,3].map(i => (
                  <div key={i} className="min-w-[120px] h-48 bg-zinc-700 rounded-2xl shrink-0 overflow-hidden relative border border-white/5">
                    <img src={`https://picsum.photos/seed/s${i}/240/400`} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-full border-2 border-blue-500 bg-black overflow-hidden"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} /></div>
                  </div>
                ))}
             </div>
             <div className="space-y-2">{posts.map(p => <SocialCard key={p.id} post={p} />)}</div>
          </div>
        )}

        {/* --- 2. RX STUDIO (AI CANVA) --- */}
        {activeTab === "studio" && (
          <div className="p-6 space-y-6 animate-in slide-in-from-bottom-10">
             <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="text-3xl font-black italic uppercase text-cyan-400">Rx Creative Studio</h2>
                <Layers className="text-cyan-400" size={28} />
             </div>
             <div className="grid grid-cols-2 gap-5">
                <StudioBtn title="AI Image Gen" sub="Stable Diffusion" icon={<ImageIcon className="text-pink-500"/>} bg="bg-pink-500/10" />
                <StudioBtn title="Voice Lab" sub="ElevenLabs V2" icon={<Mic className="text-blue-500"/>} bg="bg-blue-500/10" />
                <StudioBtn title="Clip Engine" sub="Sora/Veo Gen" icon={<Video className="text-green-500"/>} bg="bg-green-500/10" />
                <StudioBtn title="Music Magic" sub="Suno Engine" icon={<Music2 className="text-yellow-500"/>} bg="bg-yellow-500/10" />
             </div>
             <div className="bg-[#121212] p-8 rounded-[2.5rem] border border-cyan-500/20 relative overflow-hidden group">
                <Wand2 className="absolute -right-6 -bottom-6 text-cyan-500 opacity-10 group-hover:scale-110 transition-transform" size={150} />
                <h3 className="text-2xl font-black mb-2 uppercase">Background Remover</h3>
                <p className="text-[10px] font-black text-zinc-500 mb-8 uppercase tracking-[0.3em]">AI Vision v4.0 Active</p>
                <button className="bg-cyan-500 text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20">Upload Asset</button>
             </div>
          </div>
        )}

        {/* --- 3. MAGIC CHAT (GEMINI CLONE) --- */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-[78vh] animate-in fade-in">
             <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]">
                <div className="flex items-center gap-3"><Sparkles className="text-indigo-400" /><span className="font-black italic uppercase tracking-tighter text-lg">Magic Gemini 1.5</span></div>
                <History className="text-zinc-600" size={22} />
             </div>
             <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                <div className="bg-[#121212] p-6 rounded-[2rem] border border-indigo-500/20 max-w-[90%]">
                   <p className="text-[10px] font-black text-indigo-400 mb-3 uppercase tracking-[0.4em]">Intelligence System</p>
                   <p className="text-sm font-semibold leading-relaxed text-zinc-300">Synchronized with Nexus Core. I am your Gemini-powered assistant. Input your creative prompt to begin.</p>
                </div>
                {chatHistory.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`p-5 rounded-[1.5rem] max-w-[85%] text-sm font-bold shadow-2xl ${m.role === 'user' ? 'bg-indigo-600 rounded-tr-none' : 'bg-zinc-800 rounded-tl-none'}`}>{m.text}</div>
                  </div>
                ))}
             </div>
             <div className="p-6 bg-black">
                <div className="bg-[#121212] rounded-3xl p-3 flex items-center gap-3 border border-white/10 shadow-2xl">
                   <div className="w-10 h-10 flex items-center justify-center text-zinc-500"><Plus size={24}/></div>
                   <input value={msgInput} onChange={(e)=>setMsgInput(e.target.value)} placeholder="Type magic prompt..." className="flex-1 bg-transparent border-none outline-none text-sm font-bold" />
                   <button onClick={()=>{setChatHistory([...chatHistory,{role:'user',text:msgInput}]); setMsgInput("")}} className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 active:scale-90 transition"><Send size={20}/></button>
                </div>
             </div>
          </div>
        )}

        {/* --- 4. RX MUSIC (SPOTIFY CLONE) --- */}
        {activeTab === "music" && (
          <div className="p-6 space-y-8 animate-in fade-in">
             <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black italic text-green-500 tracking-tighter uppercase">Spotify</h2>
                <div className="flex gap-6"><History size={26}/><Settings size={26}/></div>
             </div>
             <div className="flex gap-4">
                <button className="bg-green-500 text-black px-8 py-2 rounded-full font-black text-xs uppercase">Music</button>
                <button className="bg-zinc-900 text-white px-8 py-2 rounded-full font-black text-xs uppercase border border-white/5">Podcasts</button>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {[1,2,3,4].map(i => (
                   <div key={i} className="bg-zinc-900/50 rounded-md overflow-hidden flex items-center gap-4 group active:scale-95 transition">
                      <div className="w-16 h-16 bg-zinc-800 shrink-0 shadow-lg"><img src={`https://picsum.photos/seed/mus${i}/150`} className="w-full h-full object-cover" /></div>
                      <span className="text-xs font-black truncate pr-4 uppercase tracking-tighter">Phonk Mix {i}</span>
                   </div>
                ))}
             </div>
             <h3 className="text-2xl font-black italic tracking-tighter uppercase mt-10">Made For {user.name.split(' ')[0]}</h3>
             <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="min-w-[160px] space-y-3 group cursor-pointer">
                     <div className="w-full aspect-square bg-zinc-800 rounded-xl overflow-hidden shadow-2xl relative">
                        <img src={`https://picsum.photos/seed/alb${i}/300`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-xl"><Play size={20} fill="currentColor"/></div>
                     </div>
                     <p className="text-sm font-black uppercase tracking-tighter">Daily Mix {i}</p>
                     <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest line-clamp-1">Vibe-X, Nexus-AI, Tech-Core</p>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* --- 5. RX SHOP (AMAZON CLONE) --- */}
        {activeTab === "shop" && (
           <div className="animate-in slide-in-from-right-10">
              <div className="bg-[#121212] p-4 flex items-center gap-3 sticky top-16 z-40 border-b border-white/5">
                 <div className="flex-1 bg-white rounded-xl flex items-center px-4 py-3 text-zinc-800 shadow-2xl">
                    <Search size={22} className="mr-3 opacity-40" />
                    <input placeholder="Search Amazon.in" className="bg-transparent border-none outline-none text-sm font-bold w-full" />
                    <Camera size={22} className="ml-3 opacity-40" />
                 </div>
              </div>
              <div className="bg-[#1c1c1c] p-3 px-5 flex items-center gap-2 text-[11px] font-bold text-zinc-400 border-b border-white/5">
                 <MapPin size={16} className="text-white" /> Deliver to {user.name} - New Delhi 110001
              </div>
              <div className="h-56 w-full relative overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                 <div className="absolute bottom-6 left-6"><h2 className="text-4xl font-black italic uppercase leading-none">UP TO 70% OFF</h2><p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500">Nexus Anniversary Sale</p></div>
              </div>
              <div className="grid grid-cols-2 gap-[1px] bg-zinc-800">
                 {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="bg-black p-5 flex flex-col group active:bg-zinc-900 transition">
                       <div className="aspect-square bg-zinc-900 rounded-2xl mb-4 overflow-hidden shadow-inner">
                          <img src={`https://picsum.photos/seed/prd${i}/400`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       </div>
                       <h4 className="text-[11px] font-bold text-zinc-300 line-clamp-2 leading-snug mb-2 uppercase">Race-X Nexus Smart Audio Node v{i}.0 Edition</h4>
                       <div className="flex items-center gap-1 mb-3"><div className="flex text-yellow-500"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12}/></div><span className="text-[10px] font-black text-blue-400 ml-1">12,402</span></div>
                       <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl font-black">₹{1499 + (i*200)}</span>
                          <span className="text-[10px] text-zinc-500 font-bold line-through">₹5,999</span>
                       </div>
                       <button className="w-full bg-yellow-400 text-black py-3 rounded-xl font-black text-[10px] uppercase shadow-lg shadow-yellow-400/10 active:scale-95 transition-transform">Add to Cart</button>
                    </div>
                 ))}
              </div>
           </div>
        )}

      </main>

      {/* --- MASTER FOOTER NAVIGATION --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#121212]/95 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-4 z-[5000]">
        <NavIcon icon={<HomeIcon size={28}/>} label="Hub" active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
        <NavIcon icon={<LayoutGrid size={28}/>} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <div onClick={() => setIsPostModalOpen(true)} className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center -mt-12 shadow-[0_15px_40px_rgba(37,99,235,0.4)] border-[6px] border-black active:scale-90 transition-all"><Plus size={36} className="text-white drop-shadow-lg" /></div>
        <NavIcon icon={<Music size={28}/>} label="Music" active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <NavIcon icon={<ShoppingBag size={28}/>} label="Shop" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>

      {/* --- CREATE POST MODAL (REAL FB STYLE) --- */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/98 z-[6000] flex flex-col p-6 animate-in slide-in-from-bottom-20 duration-500 backdrop-blur-3xl">
           <div className="flex justify-between items-center mb-12">
              <X onClick={() => setIsPostModalOpen(false)} className="text-zinc-500 cursor-pointer p-2 bg-zinc-900 rounded-full" />
              <h2 className="font-black uppercase tracking-[0.4em] text-xs">New Transmission</h2>
              <button onClick={handlePostSubmit} className="bg-blue-600 px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-transform">Publish</button>
           </div>
           <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-blue-600 shadow-lg border-2 border-white/10" />
              <div><h4 className="font-black uppercase tracking-tighter text-lg">{user.name}</h4><p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Public Nexus Node</p></div>
           </div>
           <textarea 
              autoFocus
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's happening in your Nexus?" 
              className="flex-1 bg-transparent border-none outline-none text-3xl font-black italic tracking-tighter placeholder:opacity-10 leading-tight resize-none"
           />
           <div className="flex justify-around p-6 bg-zinc-900/50 rounded-[2.5rem] border border-white/5 mb-6">
              <ImageIcon className="text-green-500" size={30} /><Video className="text-red-500" size={30} /><Mic className="text-blue-500" size={30} /><Smile className="text-yellow-500" size={30} />
           </div>
        </div>
      )}
    </div>
  );
}

/* --- REUSABLE COMPONENTS (MASTER LIST) --- */

function HubCard({ title, sub, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className={`${color} p-7 rounded-[2.5rem] flex flex-col items-center gap-3 active:scale-95 transition-all shadow-2xl border border-white/10 group overflow-hidden relative min-h-[170px] justify-center`}>
       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
       <div className="drop-shadow-2xl">{icon}</div>
       <div className="text-center mt-3">
          <span className="text-[14px] font-black uppercase tracking-widest block leading-none">{title}</span>
          <span className="text-[8px] font-black opacity-50 uppercase tracking-[0.2em]">{sub}</span>
       </div>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-blue-500 scale-110 drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]' : 'text-zinc-600'}`}>
      {icon}
      <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}

function SocialCard({ post }: any) {
  return (
    <div className="bg-[#121212] border-y border-white/5 pb-2 mb-2 animate-in fade-in duration-500">
       <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black italic text-sm shadow-lg shadow-blue-600/20">RX</div>
             <div><h4 className="font-black text-sm uppercase tracking-tighter">{post.user_name}</h4><p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1">Global Node • Just Now • <Globe size={10}/></p></div>
          </div>
          <MoreHorizontal size={22} className="text-zinc-600" />
       </div>
       <div className="px-5 pb-6 text-sm font-bold leading-relaxed text-zinc-200">{post.content}</div>
       <div className="px-4 flex justify-between items-center py-4 border-t border-zinc-800/50 mx-4">
          <button className="flex items-center gap-2.5 text-zinc-500 font-black text-[11px] uppercase tracking-widest hover:text-blue-500 transition-colors"><Heart size={20} /> Like</button>
          <button className="flex items-center gap-2.5 text-zinc-500 font-black text-[11px] uppercase tracking-widest hover:text-blue-500 transition-colors"><MessageCircle size={20} /> Comment</button>
          <button className="flex items-center gap-2.5 text-zinc-500 font-black text-[11px] uppercase tracking-widest hover:text-blue-500 transition-colors"><Share2 size={20} /> Share</button>
       </div>
    </div>
  );
}

function StudioBtn({ title, sub, icon, bg }: any) {
  return (
    <div className={`${bg} p-7 rounded-[2.5rem] flex flex-col items-center gap-3 border border-white/5 active:scale-95 transition-all group cursor-pointer shadow-xl`}>
       <div className="p-5 bg-black/40 rounded-[1.5rem] group-hover:bg-black/60 transition-colors shadow-inner">{icon}</div>
       <div className="text-center">
          <span className="text-[11px] font-black uppercase tracking-widest block mb-1 leading-none">{title}</span>
          <span className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.2em]">{sub}</span>
       </div>
    </div>
  );
}
