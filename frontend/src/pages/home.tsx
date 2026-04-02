import { useState } from "react";
import { 
  Sparkles, MessageSquare, Share2, Music, ShoppingBag, 
  Heart, MessageCircle, Send, Play, Zap, Wallet, LayoutGrid, 
  MoreHorizontal, Bookmark, PlusCircle, Search, Mic, Radio
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("social");

  return (
    <div className="pb-32 bg-black min-h-screen animate-in fade-in duration-700">
      
      {/* --- MASTER NAVIGATION (HUB SELECTOR) --- */}
      <nav className="flex justify-around items-center px-4 py-5 bg-black/95 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <TabBtn icon={<Share2 size={24}/>} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <TabBtn icon={<Sparkles size={24}/>} label="Studio" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <TabBtn icon={<MessageSquare size={24}/>} label="Magic" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <TabBtn icon={<Music size={24}/>} label="Music" active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <TabBtn icon={<ShoppingBag size={24}/>} label="Shop" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>

      <div className="mt-6 px-4 max-w-[600px] mx-auto space-y-8">
        
        {/* ==========================================
            MODULE 1: RX SOCIAL (HUB + FEED)
        ========================================== */}
        {activeTab === 'social' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-500">
            {/* THE HUB CARDS */}
            <div className="grid grid-cols-2 gap-4">
              <ActionCard icon={<Sparkles className="text-blue-400" />} title="AI Studio" desc="Create Magic" onClick={() => setActiveTab('studio')} />
              <ActionCard icon={<Wallet className="text-green-400" />} title="Wallet" desc="1,250 💎" onClick={() => {}} />
              <ActionCard icon={<Zap className="text-yellow-400" />} title="Trends" desc="Viral Now" onClick={() => {}} />
              <ActionCard icon={<LayoutGrid className="text-purple-400" />} title="Library" desc="Assets" onClick={() => {}} />
            </div>

            {/* STORIES SECTION */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
                    <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 ring-2 ring-black">
                       <div className="w-full h-full rounded-full bg-black border-2 border-black overflow-hidden shadow-inner">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=RX${i}`} alt="user" />
                       </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-black uppercase italic italic">Nexus_{i}</span>
                 </div>
               ))}
            </div>

            {/* FEED POSTS */}
            <Post user="nexus_admin" img="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800" likes="50K" caption="Race-X Master Hub is now fully operational. Next level AI Social begins here." />
            <Post user="ai_visionary" img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800" likes="12K" caption="Testing the new 8k render engine in RX Studio. Absolutely insane detail! 🔥" />
          </div>
        )}

        {/* ==========================================
            MODULE 2: RX STUDIO (AI ENGINE)
        ========================================== */}
        {activeTab === 'studio' && (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            <div className="bg-zinc-900/80 p-8 rounded-[3rem] border border-blue-500/30 shadow-2xl">
              <h2 className="text-2xl font-black italic uppercase text-blue-400 mb-6 flex items-center gap-3"><Sparkles size={28}/> Magic Studio</h2>
              <textarea className="w-full bg-black/60 border border-white/10 rounded-3xl p-6 h-48 text-sm outline-none focus:border-blue-500/50 transition-all text-white placeholder:text-zinc-700" placeholder="Describe the impossible... (e.g. A neon dragon flying over Tokyo 2077)" />
              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black italic uppercase tracking-[0.2em] text-lg shadow-lg shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-3 transition-all">
                <PlusCircle size={24}/> Create Masterpiece (10 💎)
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 opacity-50">
               <div className="aspect-square bg-zinc-900 rounded-[2rem] border border-white/5 animate-pulse" />
               <div className="aspect-square bg-zinc-900 rounded-[2rem] border border-white/5 animate-pulse" />
            </div>
          </div>
        )}

        {/* ==========================================
            MODULE 3: MAGIC CHAT (AI CHATBOT)
        ========================================== */}
        {activeTab === 'chat' && (
          <div className="h-[75vh] bg-zinc-950 border border-white/10 rounded-[3rem] p-6 flex flex-col shadow-2xl relative overflow-hidden">
             <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pb-10">
                <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-[2rem] rounded-tl-none w-fit max-w-[85%] animate-in fade-in slide-in-from-left-4">
                   <p className="text-[10px] font-black text-blue-400 uppercase italic mb-1 tracking-widest">RX Magic AI</p>
                   <p className="text-sm text-zinc-200">Race-X System check: All modules online. I am ready to process your commands. What are we building today?</p>
                </div>
             </div>
             <div className="bg-white/5 p-2 rounded-full flex gap-3 px-6 border border-white/10 items-center backdrop-blur-md">
                <input className="bg-transparent flex-1 outline-none text-sm h-14" placeholder="Command Nexus..." />
                <button className="bg-blue-600 p-3 rounded-full hover:bg-blue-400 transition-all shadow-lg shadow-blue-600/20"><Send size={20}/></button>
             </div>
          </div>
        )}

        {/* ==========================================
            MODULE 4: RX MUSIC & SHOP (PLACEHOLDERS)
        ========================================== */}
        {(activeTab === 'music' || activeTab === 'shop') && (
           <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in duration-1000">
              <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                 {activeTab === 'music' ? <Radio size={48} className="text-blue-500 animate-pulse"/> : <ShoppingBag size={48} className="text-blue-500 animate-pulse"/>}
              </div>
              <h3 className="text-4xl font-black italic uppercase text-zinc-800 tracking-tighter">Deploying {activeTab}...</h3>
              <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Nexus Engine v2.0</p>
           </div>
        )}

      </div>
    </div>
  );
}

// --- REUSABLE MASTER COMPONENTS ---

function TabBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-blue-500 scale-125' : 'text-zinc-600 opacity-40 hover:opacity-100'}`}>
      {icon}
      <span className="text-[9px] font-black uppercase italic tracking-tighter">{label}</span>
    </button>
  );
}

function ActionCard({ icon, title, desc, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-zinc-900/50 border border-white/5 p-6 rounded-[2.5rem] hover:bg-zinc-800 hover:border-blue-500/40 transition-all cursor-pointer group active:scale-95 shadow-xl">
      <div className="mb-4 p-3 bg-black/40 w-fit rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <p className="text-sm font-black italic uppercase text-white leading-none">{title}</p>
      <p className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest mt-1.5">{desc}</p>
    </div>
  );
}

function Post({ user, img, likes, caption }: any) {
  return (
    <div className="bg-zinc-950/60 border border-white/5 rounded-[3.5rem] overflow-hidden shadow-2xl">
      <div className="flex justify-between p-6 items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[2px]">
             <div className="w-full h-full rounded-full bg-black border-2 border-black flex items-center justify-center font-black italic text-[10px]">RX</div>
          </div>
          <span className="text-sm font-black italic uppercase text-white tracking-tighter">{user}</span>
        </div>
        <MoreHorizontal size={20} className="text-zinc-700" />
      </div>
      <img src={img} className="w-full aspect-square object-cover" alt="Post" />
      <div className="p-8 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-8">
             <Heart size={30} className="hover:text-red-500 transition-colors cursor-pointer" />
             <MessageCircle size={30} className="hover:text-blue-400 transition-colors cursor-pointer" />
             <Send size={30} className="hover:text-green-400 transition-colors cursor-pointer" />
          </div>
          <Bookmark size={30} className="text-zinc-700" />
        </div>
        <div>
           <p className="text-sm font-black italic text-blue-500">{likes} <span className="text-white/40 font-bold">ENGAGED</span></p>
           <p className="text-sm text-zinc-300 leading-relaxed mt-2"><span className="font-black italic text-white mr-2 uppercase">{user}</span> {caption}</p>
        </div>
      </div>
    </div>
  );
}
