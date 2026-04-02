import { useState } from "react";
import { 
  Sparkles, MessageSquare, Share2, Music, ShoppingBag, 
  Heart, MessageCircle, Send, Play, Zap, Wallet, LayoutGrid, 
  MoreHorizontal, Bookmark, PlusSquare, Search, Mic, TrendingUp, Layers
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("social");

  return (
    <div className="pb-32 bg-[#000000] min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* --- TOP HUB NAVIGATION (Premium Blur) --- */}
      <nav className="flex justify-around items-center px-2 py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <TabBtn icon={<Share2 size={22}/>} label="SOCIAL" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <TabBtn icon={<Sparkles size={22}/>} label="STUDIO" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <TabBtn icon={<MessageSquare size={22}/>} label="MAGIC" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <TabBtn icon={<Music size={22}/>} label="MUSIC" active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <TabBtn icon={<ShoppingBag size={22}/>} label="SHOP" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>

      <div className="mt-4 px-4 max-w-[500px] mx-auto space-y-8">
        
        {/* --- MODULE 1: SOCIAL (Action Cards + Feed) --- */}
        {activeTab === 'social' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* 4 ACTION CARDS (Polished Design) */}
            <div className="grid grid-cols-2 gap-3">
              <HubCard icon={<Sparkles size={20} className="text-blue-400" />} title="AI STUDIO" desc="CREATE NOW" onClick={() => setActiveTab('studio')} />
              <HubCard icon={<Wallet size={20} className="text-emerald-400" />} title="WALLET" desc="1,250 💎" />
              <HubCard icon={<TrendingUp size={20} className="text-yellow-400" />} title="TRENDS" desc="VIRAL HUB" />
              <HubCard icon={<Layers size={20} className="text-purple-400" />} title="ASSETS" desc="MY VAULT" />
            </div>

            {/* STORIES (Precise Alignment) */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 border-y border-white/5 -mx-4 px-4 bg-zinc-950/30">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="flex flex-col items-center gap-1.5 min-w-[70px]">
                    <div className="w-[66px] h-[66px] rounded-full p-[2px] bg-gradient-to-tr from-[#3b82f6] via-[#a855f7] to-[#ec4899]">
                       <div className="w-full h-full rounded-full bg-black border-[2.5px] border-black overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=RX${i}`} alt="user" className="w-full h-full object-cover" />
                       </div>
                    </div>
                    <span className="text-[9px] text-zinc-500 font-black tracking-tighter">USER_{i}</span>
                 </div>
               ))}
            </div>

            {/* FEED POSTS (Workable Structure) */}
            <div className="space-y-6">
              <PostItem user="NEXUS_CORE" img="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800" likes="125K" />
              <PostItem user="AI_MASTER" img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800" likes="89K" />
            </div>
          </div>
        )}

        {/* --- MODULE 2: STUDIO (Full Functional UI) --- */}
        {activeTab === 'studio' && (
          <div className="bg-zinc-900/40 p-6 rounded-[2.5rem] border border-blue-500/20 space-y-6 animate-in zoom-in-95">
            <h2 className="text-xl font-black italic uppercase text-blue-400 flex items-center gap-2 px-2"><Sparkles size={20}/> STUDIO V2</h2>
            <div className="bg-black/60 border border-white/5 rounded-3xl p-5">
              <textarea className="w-full bg-transparent text-sm h-32 outline-none resize-none" placeholder="Describe the masterpiece..." />
            </div>
            <button className="w-full bg-blue-600 py-4 rounded-2xl font-black italic uppercase tracking-widest active:scale-95 transition-all">GENERATE (10 💎)</button>
          </div>
        )}

        {/* --- MODULE 3: MAGIC CHAT (Workable Interface) --- */}
        {activeTab === 'chat' && (
          <div className="h-[65vh] bg-zinc-950/50 border border-white/5 rounded-[2.5rem] p-5 flex flex-col justify-between">
             <div className="bg-blue-600/10 border border-blue-500/10 p-4 rounded-3xl w-fit max-w-[85%] text-xs font-bold text-blue-300">
               NEXUS MAGIC AI ONLINE. COMMANDS READY.
             </div>
             <div className="bg-white/5 p-1 rounded-full flex gap-2 px-4 border border-white/5 items-center">
                <input className="bg-transparent flex-1 outline-none text-xs h-12" placeholder="ASK ANYTHING..." />
                <button className="bg-blue-600 p-2.5 rounded-full"><Send size={16}/></button>
             </div>
          </div>
        )}

        {/* --- MODULE 4 & 5: MUSIC & SHOP (Placeholders) --- */}
        {(activeTab === 'music' || activeTab === 'shop') && (
           <div className="text-center py-20 opacity-20 font-black italic uppercase text-3xl tracking-tighter">
              {activeTab} DEPLOYING...
           </div>
        )}

      </div>
    </div>
  );
}

// --- DESIGN COMPONENTS (THE PRO FEEL) ---

function TabBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-600 opacity-50'}`}>
      {icon}
      <span className="text-[8px] font-black tracking-widest">{label}</span>
    </button>
  );
}

function HubCard({ icon, title, desc, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-zinc-900/30 border border-white/5 p-5 rounded-[2rem] hover:bg-zinc-800 transition-all active:scale-95">
      <div className="mb-4 bg-black/40 p-2.5 w-fit rounded-xl">{icon}</div>
      <p className="text-xs font-black italic uppercase text-white tracking-tighter">{title}</p>
      <p className="text-[8px] font-bold text-zinc-600 mt-1 tracking-widest">{desc}</p>
    </div>
  );
}

function PostItem({ user, img, likes }: any) {
  return (
    <div className="bg-zinc-950/50 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-xl">
      <div className="flex justify-between p-5 items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-black italic text-[9px]">RX</div>
          <span className="text-[11px] font-black italic uppercase tracking-tighter">{user}</span>
        </div>
        <MoreHorizontal size={18} className="text-zinc-700" />
      </div>
      <img src={img} className="w-full aspect-square object-cover" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <div className="flex gap-6"><Heart size={24}/><MessageCircle size={24}/><Send size={24}/></div>
          <Bookmark size={24} className="text-zinc-700" />
        </div>
        <p className="text-[11px] font-black italic text-blue-500">{likes} <span className="text-white/40">INTERACTIONS</span></p>
      </div>
    </div>
  );
}
