import { useState } from "react";
import { 
  Sparkles, MessageSquare, Share2, Music, ShoppingBag, 
  Heart, MessageCircle, Send, Play, Zap, Plus, Search, MoreHorizontal
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("social");

  return (
    <div className="pb-24 animate-in fade-in duration-700">
      {/* --- MASTER HUB NAV --- */}
      <section className="flex justify-between items-center px-4 py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <HubTab icon={<Share2 />} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <HubTab icon={<Sparkles />} label="Studio" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <HubTab icon={<MessageSquare />} label="Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <HubTab icon={<Music />} label="Music" active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <HubTab icon={<ShoppingBag />} label="Shop" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </section>

      {/* --- DYNAMIC CONTENT --- */}
      <div className="mt-4 px-4 min-h-screen">
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="h-16 flex gap-4 overflow-x-auto no-scrollbar pb-2">
               {[1,2,3,4,5].map(i => <div key={i} className="min-w-[60px] h-14 rounded-full bg-zinc-900 border border-white/5" />)}
            </div>
            <div className="aspect-square bg-zinc-900/50 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-zinc-700 font-black italic uppercase">RX Social Feed Live</div>
          </div>
        )}

        {activeTab === 'studio' && (
          <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-blue-500/20 space-y-4">
            <h2 className="text-xl font-black italic uppercase text-blue-400">RX Studio</h2>
            <textarea className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 h-32" placeholder="Dream something..." />
            <button className="w-full bg-blue-600 py-4 rounded-xl font-black italic uppercase tracking-widest">Generate (10 💎)</button>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="h-[60vh] bg-zinc-950/50 border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between italic uppercase font-black text-blue-500/30">
            <span>Magic AI Ready...</span>
            <div className="h-12 bg-white/5 rounded-full px-6 flex items-center">Nexus Chat Input</div>
          </div>
        )}

        {(activeTab === 'music' || activeTab === 'shop') && (
          <div className="text-center py-20 opacity-20 font-black italic uppercase tracking-tighter text-4xl">Coming Soon</div>
        )}
      </div>
    </div>
  );
}

function HubTab({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-600'}`}>
      {icon}
      <span className="text-[8px] font-black uppercase italic">{label}</span>
    </button>
  );
}
