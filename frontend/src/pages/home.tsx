import { useState } from "react";
import { 
  Sparkles, MessageSquare, Share2, Music, ShoppingBag, 
  Heart, MessageCircle, Send, Play, Zap, Wallet, LayoutGrid, 
  MoreHorizontal, Bookmark, PlusCircle, Search, Mic, Radio,
  TrendingUp, Award, Layers
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("social");

  return (
    <div className="pb-32 bg-black min-h-screen font-sans selection:bg-blue-500/30">
      
      {/* --- MASTER TOP NAVIGATION --- */}
      <nav className="flex justify-around items-center px-4 py-5 bg-black/95 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <TabBtn icon={<Share2 size={22}/>} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <TabBtn icon={<Sparkles size={22}/>} label="Studio" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <TabBtn icon={<MessageSquare size={22}/>} label="Magic" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <TabBtn icon={<Music size={22}/>} label="Music" active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <TabBtn icon={<ShoppingBag size={22}/>} label="Shop" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>

      <div className="mt-6 px-4 max-w-[600px] mx-auto">
        
        {/* --- MODULE 1: SOCIAL HUB (Main Hub + Feed) --- */}
        {activeTab === 'social' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* 4 MAIN HUB CARDS */}
            <div className="grid grid-cols-2 gap-4">
              <HubCard icon={<Sparkles className="text-blue-400" />} title="AI Studio" desc="Create Now" onClick={() => setActiveTab('studio')} />
              <HubCard icon={<Wallet className="text-emerald-400" />} title="Wallet" desc="1,250 💎" />
              <HubCard icon={<TrendingUp className="text-yellow-400" />} title="Trends" desc="Viral Hub" />
              <HubCard icon={<Layers className="text-purple-400" />} title="Assets" desc="My Vault" />
            </div>

            {/* INSTAGRAM STYLE STORIES */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 border-y border-white/5 bg-zinc-950/20 -mx-4 px-4">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="flex flex-col items-center gap-2 min-w-[75px]">
                    <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500">
                       <div className="w-full h-full rounded-full bg-black border-2 border-black overflow-hidden p-0.5">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} alt="user" className="w-full h-full" />
                       </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-black uppercase italic tracking-tighter text-center">User_{i}</span>
                 </div>
               ))}
            </div>

            {/* FB/INSTA STYLE POSTS */}
            <div className="space-y-8">
              <PostItem user="Nexus_Official" img="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800" likes="125K" cap="The Race-X Master Engine is now active. All modules online." />
              <PostItem user="AI_Creator" img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800" likes="89K" cap="Generated this in the new RX Studio. Insane quality!" />
            </div>
          </div>
        )}

        {/* --- MODULE 2: RX STUDIO (AI Generator) --- */}
        {activeTab === 'studio' && (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            <div className="bg-zinc-900/80 p-8 rounded-[3rem] border border-blue-500/30 shadow-2xl">
              <h2 className="text-2xl font-black italic uppercase text-blue-400 mb-6 flex items-center gap-3"><Sparkles size={28}/> Magic Studio</h2>
              <div className="bg-black/60 border border-white/10 rounded-3xl p-6 space-y-4">
                <textarea className="w-full bg-transparent text-sm outline-none h-40 resize-none placeholder:text-zinc-700" placeholder="Describe your masterpiece..." />
                <div className="flex justify-between border-t border-white/5 pt-4">
                  <div className="flex gap-4 text-zinc-500"><Mic size={18}/><LayoutGrid size={18}/></div>
                  <span className="text-[10px] font-black text-blue-500 uppercase">HD Render Active</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black italic uppercase tracking-[0.2em] text-lg shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-3">
                <PlusCircle size={24}/> Initiate Build (10 💎)
              </button>
            </div>
          </div>
        )}

        {/* --- MODULE 3: MAGIC CHAT (AI Assistant) --- */}
        {activeTab === 'chat' && (
          <div className="h-[70vh] bg-zinc-950 border border-white/10 rounded-[3rem] p-6 flex flex-col shadow-2xl relative">
             <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pb-10">
                <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-[2rem] rounded-tl-none w-fit max-w-[85%]">
                   <p className="text-[10px] font-black text-blue-400 uppercase italic mb-1">RX Magic AI</p>
                   <p className="text-sm text-zinc-300 italic">Welcome, Admin. All systems are operational. How can I assist your build today?</p>
                </div>
             </div>
             <div className="bg-white/5 p-2 rounded-full flex gap-3 px-6 border border-white/10 items-center backdrop-blur-md">
                <input className="bg-transparent flex-1 outline-none text-sm h-14" placeholder="Command Nexus..." />
                <button className="bg-blue-600 p-3 rounded-full hover:bg-blue-400 transition-all"><Send size={20}/></button>
             </div>
          </div>
        )}

        {/* --- MODULE 4: RX MUSIC PLAYER --- */}
        {activeTab === 'music' && (
          <div className="space-y-6 animate-in slide-in-from-right-5 duration-500">
             <h2 className="text-xl font-black italic uppercase text-zinc-400 px-4">Trending RX Beats</h2>
             {[1,2,3,4].map(i => (
               <div key={i} className="bg-zinc-900/50 p-4 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-blue-600/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><Music size={20} className="text-blue-500"/></div>
                    <div>
                      <p className="text-sm font-black italic uppercase">Nexus Wave Vol.{i}</p>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">AI Composition • 03:45</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all"><Play size={18}/></button>
               </div>
             ))}
          </div>
        )}

        {/* --- MODULE 5: RX SHOP --- */}
        {activeTab === 'shop' && (
          <div className="grid grid-cols-2 gap-4 animate-in zoom-in-95 duration-500">
             {[1,2,3,4].map(i => (
               <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden group">
                  <div className="aspect-square bg-zinc-800 flex items-center justify-center text-zinc-700 relative">
                    <ShoppingBag size={40} className="opacity-20"/>
                    <div className="absolute top-4 right-4 bg-blue-600 text-[8px] font-black italic px-3 py-1 rounded-full uppercase">Rare</div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-xs font-black italic uppercase">Nexus Asset #{i}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-blue-400 tracking-widest">500 💎</span>
                      <button className="p-2 bg-white/5 rounded-xl group-hover:bg-blue-600 transition-all"><PlusCircle size={16}/></button>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        )}

      </div>
    </div>
  );
}

// --- MASTER REUSABLE COMPONENTS ---

function TabBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-blue-500 scale-125' : 'text-zinc-600 opacity-40 hover:opacity-100'}`}>
      {icon}
      <span className="text-[9px] font-black uppercase italic tracking-tighter">{label}</span>
    </button>
  );
}

function HubCard({ icon, title, desc, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-zinc-900/60 border border-white/5 p-6 rounded-[2.5rem] hover:bg-zinc-800 hover:border-blue-500/40 transition-all cursor-pointer group active:scale-95 shadow-xl">
      <div className="mb-4 p-3 bg-black/40 w-fit rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <p className="text-sm font-black italic uppercase text-white leading-none tracking-tighter">{title}</p>
      <p className="text-[9px] font-bold uppercase text-zinc-600 tracking-widest mt-1.5">{desc}</p>
    </div>
  );
}

function PostItem({ user, img, likes, cap }: any) {
  return (
    <div className="bg-zinc-950/80 border border-white/5 rounded-[3.5rem] overflow-hidden shadow-2xl">
      <div className="flex justify-between p-6 items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[1.5px]"><div className="w-full h-full rounded-full bg-black border-2 border-black flex items-center justify-center font-black italic text-[9px]">RX</div></div>
          <span className="text-sm font-black italic uppercase text-white tracking-tighter">{user}</span>
        </div>
        <MoreHorizontal size={20} className="text-zinc-700" />
      </div>
      <img src={img} className="w-full aspect-square object-cover" alt="Race-X" />
      <div className="p-8 space-y-5">
        <div className="flex justify-between items-center"><div className="flex gap-8"><Heart size={28} className="hover:text-red-500 transition-colors cursor-pointer" /><MessageCircle size={28} className="hover:text-blue-400 transition-colors cursor-pointer" /><Send size={28} className="hover:text-green-400 transition-colors cursor-pointer" /></div><Bookmark size={28} className="text-zinc-700" /></div>
        <p className="text-sm font-black italic text-blue-500">{likes} <span className="text-white/40 font-bold">INTERACTIONS</span></p>
        <p className="text-sm text-zinc-300 leading-relaxed"><span className="font-black italic text-white mr-2 uppercase">{user}</span> {cap}</p>
      </div>
    </div>
  );
}
