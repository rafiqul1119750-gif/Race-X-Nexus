import { useState } from "react";
import { 
  Sparkles, MessageSquare, Share2, Music, ShoppingBag, 
  Heart, MessageCircle, Send, Play, Zap, Wallet, LayoutGrid, MoreHorizontal 
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("social");

  return (
    <div className="pb-24 animate-in fade-in duration-700">
      {/* --- TOP NAV HUB --- */}
      <section className="flex justify-around items-center px-4 py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <HubTab icon={<Share2 size={20}/>} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <HubTab icon={<Sparkles size={20}/>} label="Studio" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <HubTab icon={<MessageSquare size={20}/>} label="Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <HubTab icon={<Music size={20}/>} label="Music" active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <HubTab icon={<ShoppingBag size={20}/>} label="Shop" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </section>

      <div className="mt-6 px-4">
        {/* --- SOCIAL TAB (WITH HUB CARDS) --- */}
        {activeTab === 'social' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            
            {/* YE RAHE AAPKE HUB CARDS (Action Section) */}
            <div className="grid grid-cols-2 gap-3">
              <HubCard icon={<Sparkles className="text-blue-400" />} label="AI Studio" sub="Create Now" />
              <HubCard icon={<Wallet className="text-emerald-400" />} label="Wallet" sub="1,250 💎" />
              <HubCard icon={<Zap className="text-yellow-400" />} label="Trends" sub="Viral Hub" />
              <HubCard icon={<LayoutGrid className="text-purple-400" />} label="Assets" sub="Nexus Box" />
            </div>

            {/* STORIES SECTION */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="flex flex-col items-center gap-1 min-w-[70px]">
                    <div className="w-16 h-16 rounded-full p-[1.5px] bg-gradient-to-tr from-blue-500 to-purple-600">
                       <div className="w-full h-full rounded-full bg-black border-2 border-black overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                       </div>
                    </div>
                    <span className="text-[9px] text-zinc-600 font-black uppercase italic tracking-tighter">Nexus_{i}</span>
                 </div>
               ))}
            </div>

            {/* SOCIAL POST (Instagram Style) */}
            <div className="bg-zinc-950/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
              <div className="flex justify-between p-5 items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black italic text-xs">RX</div>
                  <span className="text-sm font-black italic uppercase text-white">Nexus_Official</span>
                </div>
                <MoreHorizontal size={20} className="text-zinc-600" />
              </div>
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" className="w-full aspect-square object-cover" />
              <div className="p-6 flex justify-between">
                <div className="flex gap-6"><Heart size={24}/><MessageCircle size={24}/><Send size={24}/></div>
                <div className="w-6 h-6 border-2 border-white/10 rounded-md" />
              </div>
            </div>
          </div>
        )}

        {/* --- OTHER MODULES (Studio, Chat, etc.) --- */}
        {activeTab === 'studio' && (
          <div className="bg-zinc-900/60 p-8 rounded-[2.5rem] border border-blue-500/20 space-y-6">
            <h2 className="text-2xl font-black italic uppercase text-blue-400 flex items-center gap-3"><Sparkles /> Magic Studio</h2>
            <textarea className="w-full bg-black/50 border border-white/10 rounded-3xl p-5 h-40 text-sm outline-none focus:border-blue-500/40" placeholder="Describe your AI masterpiece..." />
            <button className="w-full bg-blue-600 py-5 rounded-2xl font-black italic uppercase tracking-widest text-lg shadow-lg shadow-blue-600/20 active:scale-95 transition-all">Generate Image (10 💎)</button>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="h-[65vh] bg-zinc-950/80 border border-white/5 rounded-[2.5rem] p-6 flex flex-col justify-between">
             <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-3xl w-fit max-w-[80%] text-sm italic font-bold">RX Magic Chat Ready. Ask me anything...</div>
             <div className="bg-white/5 p-2 rounded-full flex gap-3 px-6 border border-white/10"><input className="bg-transparent flex-1 outline-none text-sm h-12" placeholder="Ask Nexus..." /><button className="text-blue-500 font-black italic">SEND</button></div>
          </div>
        )}

        {(activeTab === 'music' || activeTab === 'shop') && (
           <div className="flex items-center justify-center h-[50vh] text-4xl font-black italic uppercase text-zinc-800 tracking-tighter opacity-30">Coming Soon</div>
        )}
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---
function HubTab({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-600 opacity-60'}`}>
      {icon}
      <span className="text-[9px] font-black uppercase italic tracking-tighter">{label}</span>
    </button>
  );
}

function HubCard({ icon, label, sub }: any) {
  return (
    <div className="bg-zinc-900/50 border border-white/5 p-5 rounded-[2rem] hover:bg-zinc-800 transition-all cursor-pointer group active:scale-95">
      <div className="mb-4 p-2 bg-black/40 w-fit rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
      <p className="text-xs font-black italic uppercase text-white">{label}</p>
      <p className="text-[9px] font-bold uppercase text-zinc-600 tracking-widest">{sub}</p>
    </div>
  );
}
