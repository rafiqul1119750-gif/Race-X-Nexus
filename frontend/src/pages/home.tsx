import React, { useState } from "react";
import { 
  Zap, Sparkles, Globe, Library, Plus, Gem, 
  LayoutGrid, Video, Users, MessageSquare, Music, ShoppingBag,
  Settings, Heart, MessageCircle, Send, Play, Disc
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("hub");
  const [wallet] = useState(7500);

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* --- GLOBAL HEADER (Hamesha Rahega) --- */}
      <div className="p-6 pt-12 flex items-center justify-between fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-3xl z-[3000]">
        <div className="flex items-center gap-4" onClick={() => setActiveTab("hub")}>
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xs shadow-[0_0_20px_rgba(37,99,235,0.3)]">RX</div>
          <div>
            <h2 className="text-xl font-black italic text-blue-500 uppercase tracking-tighter">{activeTab}</h2>
            <div className="flex gap-3">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{wallet} GEMS</span>
            </div>
          </div>
        </div>
        <Settings size={20} className="text-zinc-700" />
      </div>

      {/* --- MAIN CONTENT SWITCHER --- */}
      <main className="pt-32 pb-44 px-5 max-w-[500px] mx-auto min-h-screen">
        
        {/* 1. RX HUB (Main Menu) */}
        {activeTab === "hub" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-900/40 via-zinc-900 to-black p-10 border border-white/5 shadow-2xl mb-8">
              <h1 className="text-4xl font-black italic uppercase leading-[0.85] tracking-tighter">RX: <br /> <span className="text-blue-500">THE FUTURE</span></h1>
              <button className="mt-8 bg-white text-black px-8 py-3.5 rounded-full font-black text-[11px] uppercase active:scale-95 transition">+ NEW PROJECT</button>
            </div>

            <HubCard title="RX Studio" color="bg-cyan-400" icon={<Zap size={35} className="text-black fill-black"/>} onClick={() => setActiveTab("studio")} />
            <HubCard title="RX Magic" color="bg-[#121415] border-2 border-cyan-400/40 text-cyan-400" icon={<Sparkles size={35}/>} onClick={() => setActiveTab("magic")} />
            <HubCard title="RX Social" color="bg-[#9333EA]" icon={<Globe size={35}/>} onClick={() => setActiveTab("social")} />
            <HubCard title="RX Library" color="bg-gradient-to-r from-cyan-400 to-[#9333EA] text-black" icon={<Library size={35}/>} onClick={() => setActiveTab("library")} />
            <HubCard title="RX Shop" color="bg-[#F97316]" icon={<ShoppingBag size={35} className="fill-white"/>} onClick={() => setActiveTab("shop")} />
          </div>
        )}

        {/* 2. RX STUDIO (AI Generator) */}
        {activeTab === "studio" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-5">
            <h2 className="text-2xl font-black italic uppercase">Materializer</h2>
            <textarea placeholder="Describe your vision..." className="w-full bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 text-sm font-black italic outline-none min-h-[200px]" />
            <button className="w-full py-8 bg-cyan-400 text-black rounded-[2.5rem] font-black uppercase text-xs shadow-xl active:scale-95 transition">Materialize Asset</button>
          </div>
        )}

        {/* 3. RX SOCIAL (Feed) */}
        {activeTab === "social" && (
          <div className="space-y-6 animate-in slide-in-from-right-5">
             <PostItem user="RX_SYSTEM" likes="2.5M" img="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800" />
             <PostItem user="NEXUS_CORE" likes="890K" img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800" />
          </div>
        )}

        {/* 4. RX SHOP (Marketplace) */}
        {activeTab === "shop" && (
          <div className="grid grid-cols-2 gap-4 animate-in zoom-in-95">
             <ShopItem title="1,000 GEMS" price="₹99" />
             <ShopItem title="5,000 GEMS" price="₹399" />
             <ShopItem title="RX PREMIUM" price="₹999/mo" />
          </div>
        )}

      </main>

      {/* --- GLOBAL BOTTOM NAV --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-zinc-900/95 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-4 z-[5000]">
        <NavIcon label="Hub" icon={<LayoutGrid size={22}/>} active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
        <NavIcon label="Studio" icon={<Video size={22}/>} active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <NavIcon label="Social" icon={<Users size={22}/>} active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <NavIcon label="Chat" icon={<MessageSquare size={22}/>} active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <NavIcon label="Music" icon={<Music size={22}/>} active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <NavIcon label="Shop" icon={<ShoppingBag size={22}/>} active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
      </nav>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

function HubCard({ title, color, icon, onClick }: any) {
  return (
    <div onClick={onClick} className={`${color} rounded-[2.2rem] p-9 flex justify-between items-center active:scale-95 transition-all cursor-pointer shadow-xl`}>
      <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">{title}</h2>
      {icon}
    </div>
  );
}

function PostItem({ user, likes, img }: any) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-[3rem] overflow-hidden">
      <div className="p-5 font-black italic text-[11px] uppercase tracking-widest text-blue-500">{user}</div>
      <img src={img} className="w-full aspect-square object-cover" />
      <div className="p-6 flex justify-between items-center">
        <div className="flex gap-6"><Heart size={22}/><MessageCircle size={22}/><Send size={22}/></div>
        <span className="text-[10px] font-black italic text-zinc-500">{likes}</span>
      </div>
    </div>
  );
}

function ShopItem({ title, price }: any) {
  return (
    <div className="bg-zinc-900 p-8 rounded-[2rem] border border-white/5 text-center">
       <Gem size={30} className="mx-auto text-orange-500 mb-4" />
       <h3 className="text-[10px] font-black uppercase mb-2">{title}</h3>
       <button className="w-full py-3 bg-white text-black rounded-full font-black text-[9px] uppercase">{price}</button>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-blue-500' : 'text-zinc-500'}`}>
      <div className={`${active ? 'bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20' : 'p-1'}`}>{icon}</div>
      <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}
