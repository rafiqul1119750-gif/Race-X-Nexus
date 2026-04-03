import React, { useState } from "react";
import { 
  Zap, Sparkles, Globe, Library, Plus, Gem, 
  LayoutGrid, Video, Users, MessageSquare, Music, ShoppingBag,
  Settings
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("hub");
  const [wallet] = useState(7500);

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* --- TOP PROFILE SECTION --- */}
      <div className="p-6 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-white/10 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
          </div>
          <div>
            <h2 className="text-2xl font-black italic text-blue-500 uppercase tracking-tighter">Creator</h2>
            <div className="flex gap-3 mt-1">
              <span className="text-[9px] font-black text-zinc-500 uppercase">0 Diamonds</span>
              <span className="text-[9px] font-black text-zinc-500 uppercase">7,500 Gems</span>
            </div>
          </div>
        </div>
        <Settings size={20} className="text-zinc-700" />
      </div>

      {/* --- MAIN HUB (DIRECT ENTRY) --- */}
      <main className="px-5 pb-40 space-y-5">
        
        {/* BANNER */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-900/40 to-black p-10 border border-white/5 shadow-2xl">
          <h1 className="text-4xl font-black italic uppercase leading-none tracking-tighter">
            Race-X: <br /> <span className="text-blue-500">The Future</span>
          </h1>
          <button className="mt-6 bg-white text-black px-8 py-3 rounded-full font-black text-[10px] uppercase">
            + New Project
          </button>
        </div>

        {/* --- RX CARDS SECTION --- */}
        
        {/* RX STUDIO */}
        <div onClick={() => setActiveTab("studio")} className="bg-cyan-400 rounded-[2rem] p-8 flex justify-between items-center active:scale-95 transition-all cursor-pointer">
          <h2 className="text-4xl font-black italic uppercase text-black tracking-tighter">RX Studio</h2>
          <Zap size={35} className="text-black fill-black" />
        </div>

        {/* RX MAGIC */}
        <div className="bg-[#121415] rounded-[2rem] p-8 flex justify-between items-center border-2 border-cyan-400/30 active:scale-95 transition-all cursor-pointer">
          <h2 className="text-4xl font-black italic uppercase text-cyan-400 tracking-tighter">RX Magic</h2>
          <Sparkles size={35} className="text-cyan-400" />
        </div>

        {/* RX SOCIAL */}
        <div onClick={() => setActiveTab("social")} className="bg-[#9333EA] rounded-[2rem] p-8 flex justify-between items-center active:scale-95 transition-all cursor-pointer">
          <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter">RX Social</h2>
          <Globe size={35} className="text-white" />
        </div>

        {/* RX LIBRARY */}
        <div className="bg-gradient-to-r from-cyan-400 to-[#9333EA] rounded-[2rem] p-8 flex justify-between items-center active:scale-95 transition-all cursor-pointer">
          <h2 className="text-4xl font-black italic uppercase text-black tracking-tighter">RX Library</h2>
          <Library size={35} className="text-black" />
        </div>

        {/* RX SHOP (Added Back!) */}
        <div onClick={() => setActiveTab("shop")} className="bg-orange-500 rounded-[2rem] p-8 flex justify-between items-center active:scale-95 transition-all cursor-pointer shadow-[0_10px_30px_rgba(249,115,22,0.3)]">
          <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter">RX Shop</h2>
          <ShoppingBag size={35} className="text-white fill-white" />
        </div>

      </main>

      {/* --- BOTTOM NAV --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-zinc-900/90 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-4 z-[5000]">
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

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-blue-500' : 'text-zinc-500'}`}>
      {icon}
      <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}
