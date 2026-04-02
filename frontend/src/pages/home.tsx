import { useState } from "react";
import { 
  Sparkles, MessageSquare, Share2, Music, ShoppingBag, 
  Heart, MessageCircle, Send, Play, Zap, Plus, Search, MoreHorizontal
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("social"); // default social feed

  return (
    <div className="pb-24">
      {/* --- 1. RX MASTER NAVIGATION HUB --- */}
      <section className="px-4 py-6 grid grid-cols-5 gap-2 border-b border-white/5 bg-zinc-950/20 sticky top-0 md:relative z-40 backdrop-blur-xl">
        <HubIcon icon={<Share2 />} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <HubIcon icon={<Sparkles />} label="Studio" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <HubIcon icon={<MessageSquare />} label="Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <HubIcon icon={<Music />} label="Music" active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <HubIcon icon={<ShoppingBag />} label="Shop" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </section>

      {/* --- 2. DYNAMIC MODULE RENDERING --- */}
      <div className="mt-4 px-4">
        {activeTab === 'social' && <SocialFeed />}
        {activeTab === 'studio' && <AIStudio />}
        {activeTab === 'chat' && <MagicChat />}
        {activeTab === 'music' && <RXMusic />}
        {activeTab === 'shop' && <RXShop />}
      </div>
    </div>
  );
}

// --- MODULE 1: RX SOCIAL (Insta/FB Style) ---
function SocialFeed() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex flex-col items-center gap-1 min-w-[70px]">
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 to-purple-600">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="rounded-full bg-black border-2 border-black" />
            </div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase italic">User_{i}</span>
          </div>
        ))}
      </div>
      <PostCard user="nexus_creators" img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" />
    </div>
  );
}

// --- MODULE 2: RX STUDIO (AI Generator) ---
function AIStudio() {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-blue-500/20">
        <h2 className="text-xl font-black italic uppercase text-blue-400 mb-4 flex items-center gap-2">
          <Sparkles size={20}/> Magic Studio
        </h2>
        <textarea className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-sm h-32 focus:border-blue-500/50 outline-none" placeholder="Describe your masterpiece..." />
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black italic uppercase tracking-widest transition-all">Generate Image (10 💎)</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-40 bg-zinc-800 rounded-2xl border border-white/5 animate-pulse" />
        <div className="h-40 bg-zinc-800 rounded-2xl border border-white/5 animate-pulse" />
      </div>
    </div>
  );
}

// --- MODULE 3: MAGIC CHAT (AI Assistant) ---
function MagicChat() {
  return (
    <div className="bg-zinc-900/30 h-[60vh] rounded-[2rem] border border-white/5 flex flex-col">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="bg-blue-600/10 border border-blue-500/20 p-3 rounded-2xl max-w-[80%] text-sm">Hello! I am RX Magic AI. How can I help you build today?</div>
      </div>
      <div className="p-4 flex gap-2">
        <input className="flex-1 bg-black/40 border border-white/10 rounded-full px-4 py-2 text-sm outline-none" placeholder="Ask Nexus anything..." />
        <button className="bg-blue-600 p-2 rounded-full"><Send size={18}/></button>
      </div>
    </div>
  );
}

// --- MODULE 4: RX MUSIC (Streaming Tool) ---
function RXMusic() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black uppercase text-zinc-500 px-2">Trending Tracks</h3>
      {[1,2,3].map(i => (
        <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/40 rounded-2xl border border-white/5 hover:bg-zinc-800/50 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center"><Music size={20} className="text-blue-400"/></div>
            <div>
              <p className="text-sm font-bold uppercase italic">Nexus Beats Vol.{i}</p>
              <p className="text-[10px] text-zinc-500 uppercase">AI Generated • 3:24</p>
            </div>
          </div>
          <Play size={20} className="text-blue-500" />
        </div>
      ))}
    </div>
  );
}

// --- MODULE 5: RX SHOP (Marketplace) ---
function RXShop() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[1,2,3,4].map(i => (
        <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden group">
          <div className="aspect-square bg-zinc-800 relative">
             <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-[8px] font-black italic rounded-full uppercase">Hot</div>
          </div>
          <div className="p-3 space-y-1">
            <p className="text-xs font-bold uppercase italic">Nexus Asset #{i}</p>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-blue-400 font-black italic">500 💎</span>
              <button className="p-1.5 bg-white/5 rounded-lg group-hover:bg-blue-600 transition-all"><ShoppingBag size={12}/></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- UTILS COMPONENTS ---
function HubIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all ${active ? 'bg-blue-600/20 border border-blue-500/30' : 'opacity-40 hover:opacity-100'}`}>
      <span className={active ? 'text-blue-400' : 'text-white'}>{icon}</span>
      <span className="text-[8px] font-black uppercase italic tracking-tighter">{label}</span>
    </button>
  );
}

function PostCard({ user, img }: any) {
  return (
    <div className="bg-zinc-950/40 border border-white/5 rounded-[2rem] overflow-hidden">
      <div className="flex justify-between p-4 items-center">
        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-blue-600/20" /><span className="text-xs font-black italic uppercase">{user}</span></div>
        <MoreHorizontal size={18} className="text-zinc-600" />
      </div>
      <img src={img} className="w-full aspect-video object-cover" />
      <div className="p-5 flex justify-between"><div className="flex gap-5"><Heart/><MessageCircle/><Send/></div><Bookmark/></div>
    </div>
  );
}
