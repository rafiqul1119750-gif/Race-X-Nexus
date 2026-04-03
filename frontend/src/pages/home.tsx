import React, { useState } from "react";
import { 
  Zap, Sparkles, Globe, Library, Plus, Gem, 
  LayoutGrid, Video, Users, MessageSquare, Music, ShoppingBag,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("hub");

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-cyan-500/30">
      
      {/* --- 1. PROFILE & CURRENCY ROW --- */}
      <div className="p-6 pt-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-zinc-800 overflow-hidden border border-white/10 shadow-lg">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-600 px-2 py-0.5 rounded-md text-[8px] font-black border-2 border-black">
              LVL 1
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tighter text-blue-500 italic uppercase">Creator</h2>
            <div className="flex gap-3 mt-0.5">
              <div className="flex items-center gap-1">
                <Gem size={10} className="text-cyan-400" />
                <span className="text-[9px] font-black text-zinc-500 uppercase">0 Diamonds</span>
              </div>
              <div className="flex items-center gap-1">
                <Gem size={10} className="text-blue-400" />
                <span className="text-[9px] font-black text-zinc-500 uppercase">0 Gems</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/5">
           <Plus size={20} className="text-zinc-500" />
        </div>
      </div>

      {/* --- 2. MAIN HUB CONTENT --- */}
      <main className="px-5 pb-36 space-y-5">
        
        {/* BANNER: THE FUTURE OF CREATION */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-900/40 via-zinc-900 to-black p-10 border border-white/5 shadow-2xl group">
          <div className="relative z-10">
            <h1 className="text-4xl font-black italic uppercase leading-[0.9] tracking-tighter w-full mb-6">
              Race-X: The Future <br /> <span className="text-blue-500">of Creation</span>
            </h1>
            <button className="bg-white text-black px-8 py-3.5 rounded-full flex items-center gap-2 font-black text-[11px] uppercase shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 transition">
              <Plus size={18} strokeWidth={4} /> New Project
            </button>
          </div>
          {/* Background Decorative Element */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/10 blur-[80px] rounded-full"></div>
        </div>

        {/* --- GRID BUTTONS --- */}
        
        {/* RX STUDIO */}
        <div 
          onClick={() => setActiveTab("studio")}
          className="bg-cyan-400 rounded-[2rem] p-8 flex justify-between items-center active:scale-[0.97] transition-all cursor-pointer shadow-[0_15px_30px_rgba(34,211,238,0.2)]"
        >
          <div className="flex flex-col">
            <h2 className="text-4xl font-black italic uppercase text-black tracking-tighter leading-none">Studio</h2>
            <span className="text-[10px] font-black text-black/50 mt-1 uppercase italic">Professional Tools</span>
          </div>
          <Zap size={38} className="text-black fill-black" />
        </div>

        {/* MAGIC AI */}
        <div className="bg-[#121415] rounded-[2rem] p-8 flex justify-between items-center border-2 border-cyan-400/30 active:scale-[0.97] transition-all cursor-pointer group">
          <div className="flex flex-col">
            <h2 className="text-4xl font-black italic uppercase text-cyan-400 tracking-tighter leading-none">Magic</h2>
            <span className="text-[10px] font-black text-cyan-400/40 mt-1 uppercase italic">AI Materializer</span>
          </div>
          <Sparkles size={38} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
        </div>

        {/* RX SOCIAL */}
        <div 
          onClick={() => setActiveTab("social")}
          className="bg-[#9333EA] rounded-[2rem] p-8 flex justify-between items-center active:scale-[0.97] transition-all cursor-pointer shadow-[0_15px_30px_rgba(147,51,234,0.2)]"
        >
          <div className="flex flex-col">
            <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter leading-none">Social</h2>
            <span className="text-[10px] font-black text-white/40 mt-1 uppercase italic">Community Hub</span>
          </div>
          <Globe size={38} className="text-white" />
        </div>

        {/* MEDIA LIBRARY */}
        <div className="bg-gradient-to-r from-cyan-400 to-[#9333EA] rounded-[2rem] p-8 flex justify-between items-center active:scale-[0.97] transition-all cursor-pointer overflow-hidden relative shadow-2xl">
          <div className="relative z-10 flex flex-col">
            <h2 className="text-4xl font-black italic uppercase text-black tracking-tighter leading-none">Library</h2>
            <span className="text-[10px] font-black text-black/60 mt-1 uppercase italic">Millions of Sounds & Voices</span>
          </div>
          <Library size={38} className="text-black relative z-10" />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-white/10 opacity-20"></div>
        </div>

      </main>

      {/* --- 3. PREMIUM BOTTOM NAVIGATION --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-[4000]">
        <nav className="h-22 bg-zinc-900/90 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 flex items-center justify-around px-4 py-3 shadow-2xl">
          <NavIcon label="Hub" icon={<LayoutGrid size={20}/>} active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
          <NavIcon label="Studio" icon={<Video size={20}/>} active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
          <NavIcon label="Social" icon={<Users size={20}/>} active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
          <NavIcon label="Chat" icon={<MessageSquare size={20}/>} active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
          <NavIcon label="Music" icon={<Music size={20}/>} active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
          <NavIcon label="Shop" icon={<ShoppingBag size={20}/>} active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
        </nav>
      </div>

    </div>
  );
}

// Sub-component for Navigation
function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-blue-500 scale-110' : 'text-zinc-500'}`}>
      <div className={`${active ? 'bg-blue-500/15 p-2.5 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'p-2'}`}>
        {icon}
      </div>
      <span className={`text-[8px] font-black uppercase tracking-tighter ${active ? 'opacity-100' : 'opacity-50'}`}>{label}</span>
    </button>
  );
}
