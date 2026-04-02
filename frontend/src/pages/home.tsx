import { useState } from "react";
import { 
  Sparkles, MessageSquare, Share2, Music, ShoppingBag, 
  Heart, MessageCircle, Send, Play, Zap, Wallet, LayoutGrid, 
  MoreHorizontal, Bookmark, Search, PlusCircle 
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("social");

  return (
    <div className="pb-32 animate-in fade-in duration-700 bg-black min-h-screen">
      
      {/* --- 1. TOP NAV BAR (THE HUB SELECTOR) --- */}
      <section className="flex justify-around items-center px-4 py-5 bg-black/90 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50">
        <HubTab icon={<Share2 size={22}/>} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <HubTab icon={<Sparkles size={22}/>} label="Studio" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <HubTab icon={<MessageSquare size={22}/>} label="Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <HubTab icon={<Music size={22}/>} label="Music" active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <HubTab icon={<ShoppingBag size={22}/>} label="Shop" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </section>

      <div className="mt-6 px-4 max-w-[600px] mx-auto">
        
        {/* --- MODULE: RX SOCIAL (HOME HUB) --- */}
        {activeTab === 'social' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-500">
            
            {/* THE MAIN ACTION CARDS (HUB) */}
            <div className="grid grid-cols-2 gap-4">
              <HubCard icon={<Sparkles className="text-blue-400" />} label="AI Studio" sub="Generate Art" onClick={() => setActiveTab('studio')} />
              <HubCard icon={<Wallet className="text-emerald-400" />} label="Wallet" sub="1,250 💎" onClick={() => {}} />
              <HubCard icon={<Zap className="text-yellow-400" />} label="Trends" sub="Viral Now" onClick={() => {}} />
              <HubCard icon={<LayoutGrid className="text-purple-400" />} label="Assets" sub="My Vault" onClick={() => {}} />
            </div>

            {/* STORIES SECTION (INSTA STYLE) */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 border-y border-white/5 bg-zinc-950/20 -mx-4 px-4">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="flex flex-col items-center gap-2 min-w-[75px]">
                    <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-blue-500/20">
                       <div className="w-full h-full rounded-full bg-black border-2 border-black overflow-hidden p-0.5">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} alt="user" className="w-full h-full object-cover" />
                       </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-black uppercase italic tracking-tighter">Creator_{i}</span>
                 </div>
               ))}
            </div>

            {/* SOCIAL FEED POSTS (FB/INSTA STYLE) */}
            <div className="space-y-8">
              <PostCard user="nexus_official" time="2h ago" likes="45.2k" caption="The Race-X engine is now live. Explore the future of AI Social." img="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800" />
              <PostCard user="cyber_punk_2026" time="5h ago" likes="12k" caption="New cyberpunk assets generated in RX Studio! #Nexus #AI" img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800" />
            </div>
          </div>
        )}

        {/* --- MODULE: RX STUDIO (AI ENGINE) --- */}
        {activeTab === 'studio' && (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            <div className="bg-zinc-900/60 p-8 rounded-[3rem] border border-blue-500/20 shadow-2xl shadow-blue-500/5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black italic uppercase text-blue-400 flex items-center gap-3"><Sparkles /> Magic Studio</h2>
                <div className="px-3 py-1 bg-blue-500/10 rounded-full text-[10px] font-black text-blue-400 border border-blue-500/20 italic">V2.0 LIVE</div>
              </div>
              <textarea className="w-full bg-black/50 border border-white/10 rounded-3xl p-6 h-48 text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700" placeholder="A cinematic portrait of a neon cyborg in 8k..." />
              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black italic uppercase tracking-[0.2em] text-lg transition-all active:scale-95 flex items-center justify-center gap-3">
                <PlusCircle size={24}/> Initiate Build (10 💎)
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="aspect-square bg-zinc-900 rounded-3xl border border-white/5 animate-pulse" />
               <div className="aspect-square bg-zinc-900 rounded-3xl border border-white/5 animate-pulse" />
            </div>
          </div>
        )}

        {/* --- MODULE: MAGIC CHAT (AI CHATBOT) --- */}
        {activeTab === 'chat' && (
          <div className="h-[70vh] bg-zinc-950/80 border border-white/5 rounded-[3rem] p-6 flex flex-col justify-between shadow-2xl">
             <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
                <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-[2rem] rounded-tl-none w-fit max-w-[85%]">
                   <p className="text-sm font-bold text-blue-300 italic uppercase tracking-tighter">RX Magic AI</p>
                   <p className="text-sm text-zinc-300 mt-1">Status: Online. Ready to help you build Race-X. What's the plan, Admin?</p>
                </div>
             </div>
             <div className="mt-4 bg-white/5 p-2 rounded-full flex gap-3 px-6 border border-white/10 items-center">
                <input className="bg-transparent flex-1 outline-none text-sm h-14" placeholder="Command Nexus..." />
                <button className="bg-blue-600 p-3 rounded-full hover:bg-blue-500 transition-all"><Send size={20}/></button>
             </div>
          </div>
        )}

        {/* --- MODULE: MUSIC & SHOP --- */}
        {(activeTab === 'music' || activeTab === 'shop') && (
           <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center border border-white/5">
                 {activeTab === 'music' ? <Music size={40} className="text-zinc-700"/> : <ShoppingBag size={40} className="text-zinc-700"/>}
              </div>
              <p className="text-3xl font-black italic uppercase text-zinc-800 tracking-tighter">Deploying {activeTab}...</p>
           </div>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS (THE BUILDING BLOCKS) ---

function HubTab({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-blue-500 scale-125' : 'text-zinc-600 opacity-50 hover:opacity-100'}`}>
      {icon}
      <span className="text-[8px] font-black uppercase italic tracking-tighter">{label}</span>
    </button>
  );
}

function HubCard({ icon, label, sub, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-zinc-900/50 border border-white/5 p-6 rounded-[2.5rem] hover:bg-zinc-800 hover:border-blue-500/30 transition-all cursor-pointer group active:scale-95">
      <div className="mb-4 p-3 bg-black/40 w-fit rounded-2xl group-hover:scale-110 transition-transform shadow-inner">{icon}</div>
      <p className="text-sm font-black italic uppercase text-white leading-none">{label}</p>
      <p className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest mt-1">{sub}</p>
    </div>
  );
}

function PostCard({ user, time, likes, caption, img }: any) {
  return (
    <div className="bg-zinc-950/40 border border-white/5 rounded-[3rem] overflow-hidden shadow-xl">
      <div className="flex justify-between p-6 items-center">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[1.5px]">
             <div className="w-full h-full rounded-full bg-black border-2 border-black flex items-center justify-center text-[10px] font-black italic">RX</div>
          </div>
          <div>
            <p className="text-sm font-black italic uppercase text-white leading-none">{user}</p>
            <p className="text-[10px] text-zinc-600 font-bold uppercase mt-1">{time}</p>
          </div>
        </div>
        <MoreHorizontal size={20} className="text-zinc-700" />
      </div>
      <img src={img} className="w-full aspect-square object-cover" alt="Race-X Content" />
      <div className="p-7 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-7">
             <Heart size={28} className="hover:text-red-500 transition-colors cursor-pointer" />
             <MessageCircle size={28} className="hover:text-blue-400 transition-colors cursor-pointer" />
             <Send size={28} className="hover:text-emerald-400 transition-colors cursor-pointer" />
          </div>
          <Bookmark size={28} className="text-zinc-700 hover:text-white transition-colors" />
        </div>
        <div>
           <p className="text-sm font-black italic text-blue-500">{likes} <span className="text-white/60 font-bold">INTERACTIONS</span></p>
           <p className="text-sm text-zinc-400 leading-relaxed mt-2">
             <span className="font-black italic text-white mr-2 uppercase tracking-tighter">{user}</span> {caption}
           </p>
        </div>
      </div>
    </div>
  );
}
