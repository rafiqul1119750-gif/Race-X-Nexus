import React, { useState, useEffect } from "react";
import { 
  Sparkles, MessageSquare, Share2, ShoppingCart, ArrowLeft, 
  Send, Heart, MessageCircle, Bookmark, Plus, Zap, Wallet, 
  LayoutGrid, Play, MoreHorizontal, User, Search
} from "lucide-react";

type ScreenType = "home" | "hub" | "studio" | "magic" | "social" | "shop";

export default function Home() {
  const [screen, setScreen] = useState<ScreenType>("home");

  // Navigation Handler
  const goTo = (target: ScreenType) => {
    window.scrollTo(0, 0);
    setScreen(target);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 font-sans pb-10">
      
      {/* GLOBAL BACK BUTTON */}
      {screen !== "home" && (
        <div className="fixed top-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-xl border-b border-white/5 z-[100] flex items-center justify-between">
          <button onClick={() => goTo(screen === "hub" ? "home" : "hub")} className="p-2.5 rounded-2xl bg-white/5 active:scale-90 transition">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-[10px] font-black tracking-[0.3em] uppercase italic text-zinc-500">Race-X Nexus</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>
      )}

      <div className={screen !== "home" ? "pt-20" : ""}>
        {screen === "home" && (
          <div className="flex flex-col items-center justify-center h-screen gap-6 animate-in fade-in duration-1000">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />
              <h1 className="relative text-7xl font-black tracking-tighter italic bg-gradient-to-br from-white via-zinc-400 to-zinc-800 bg-clip-text text-transparent">RX</h1>
            </div>
            <div className="text-center space-y-1">
               <h1 className="text-2xl font-black tracking-[0.5em] uppercase italic">RACE-X</h1>
               <p className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase">The Everything AI Engine</p>
            </div>
            <button 
              onClick={() => goTo("hub")} 
              className="mt-8 px-12 py-4 bg-white text-black font-black italic rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 tracking-widest"
            >
              ENTER INTERFACE
            </button>
          </div>
        )}

        {screen === "hub" && (
          <div className="p-6 grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-10 duration-500">
            <HubCard title="STUDIO" sub="AI Generation" icon={<Sparkles className="text-blue-400" />} onClick={() => goTo("studio")} />
            <HubCard title="MAGIC AI" sub="Nexus Brain" icon={<MessageSquare className="text-emerald-400" />} onClick={() => goTo("magic")} />
            <HubCard title="SOCIAL" sub="Global Feed" icon={<Share2 className="text-purple-400" />} onClick={() => goTo("social")} />
            <HubCard title="RX SHOP" sub="Marketplace" icon={<ShoppingCart className="text-yellow-400" />} onClick={() => goTo("shop")} />
            <HubCard title="WALLET" sub="1,250 Diamonds" icon={<Wallet className="text-pink-400" />} onClick={() => {}} />
            <HubCard title="ASSETS" sub="My Vault" icon={<LayoutGrid className="text-cyan-400" />} onClick={() => {}} />
          </div>
        )}

        {screen === "studio" && <Studio />}
        {screen === "magic" && <Magic />}
        {screen === "social" && <Social />}
        {screen === "shop" && <Shop />}
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function HubCard({ title, sub, icon, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="p-6 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl hover:bg-zinc-800/60 active:scale-95 transition-all group cursor-pointer"
    >
      <div className="mb-4 p-3 bg-black/40 w-fit rounded-2xl group-hover:scale-110 transition-transform shadow-inner border border-white/5">{icon}</div>
      <h2 className="font-black italic text-sm tracking-tighter uppercase">{title}</h2>
      <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-1">{sub}</p>
    </div>
  );
}

/* 🎬 STUDIO (Functional Prompting) */
function Studio() {
  const [prompt, setPrompt] = useState("");
  return (
    <div className="p-6 space-y-6 animate-in zoom-in-95">
      <div className="bg-zinc-900/60 p-8 rounded-[3rem] border border-blue-500/20 shadow-2xl">
        <h2 className="text-2xl font-black italic uppercase text-blue-400 mb-6 flex items-center gap-3"><Sparkles /> Studio V2</h2>
        <textarea 
          className="w-full bg-black/50 border border-white/10 rounded-[2rem] p-6 h-40 text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700" 
          placeholder="Describe your AI masterpiece..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="w-full mt-6 bg-blue-600 py-5 rounded-2xl font-black italic uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-blue-600/20">Generate (10 💎)</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-square bg-zinc-900 rounded-[2rem] border border-white/5 animate-pulse" />
        <div className="aspect-square bg-zinc-900 rounded-[2rem] border border-white/5 animate-pulse" />
      </div>
    </div>
  );
}

/* 🤖 MAGIC AI (Real-time Chat Feel) */
function Magic() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([{ role: 'bot', text: 'Race-X Nexus online. Command me, Admin.' }]);

  const send = () => {
    if (!msg) return;
    setChat([...chat, { role: 'user', text: msg }, { role: 'bot', text: 'Processing through Nexus Core...' }]);
    setMsg("");
  };

  return (
    <div className="p-6 h-[80vh] flex flex-col justify-between animate-in fade-in">
      <div className="space-y-4 overflow-y-auto no-scrollbar pb-10">
        {chat.map((c, i) => (
          <div key={i} className={`p-4 rounded-[2rem] text-sm max-w-[85%] font-bold italic ${c.role === 'user' ? 'bg-white text-black self-end ml-auto rounded-tr-none' : 'bg-blue-600/10 border border-blue-500/20 text-blue-300 rounded-tl-none'}`}>
            {c.text}
          </div>
        ))}
      </div>
      <div className="bg-white/5 p-2 rounded-full border border-white/10 flex items-center px-6 gap-3 backdrop-blur">
        <input 
          value={msg} 
          onChange={(e) => setMsg(e.target.value)} 
          className="bg-transparent flex-1 outline-none text-sm h-12" 
          placeholder="Type command..."
          onKeyPress={(e) => e.key === 'Enter' && send()}
        />
        <button onClick={send} className="text-blue-500"><Send size={20}/></button>
      </div>
    </div>
  );
}

/* 🌐 SOCIAL (Full Post UI) */
function Social() {
  return (
    <div className="p-4 space-y-8 animate-in slide-in-from-bottom-5">
      <PostItem user="nexus_official" img="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800" likes="45.2k" />
      <PostItem user="cyber_vision" img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800" likes="12k" />
    </div>
  );
}

function PostItem({ user, img, likes }: any) {
  return (
    <div className="bg-zinc-950/80 border border-white/5 rounded-[3.5rem] overflow-hidden shadow-2xl">
      <div className="flex justify-between p-6 items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[1.5px]"><div className="w-full h-full rounded-full bg-black flex items-center justify-center font-black italic text-[9px]">RX</div></div>
          <span className="text-sm font-black italic uppercase tracking-tighter">{user}</span>
        </div>
        <MoreHorizontal size={20} className="text-zinc-700" />
      </div>
      <img src={img} className="w-full aspect-square object-cover" alt="Post" />
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-8"><Heart size={28}/><MessageCircle size={28}/><Send size={28}/></div>
          <Bookmark size={28} className="text-zinc-700" />
        </div>
        <p className="text-xs font-black italic text-blue-500 uppercase">{likes} Interactions</p>
      </div>
    </div>
  );
}

/* 🛒 RX SHOP (Card Marketplace) */
function Shop() {
  const items = [
    { name: "Nexus Pro Badge", price: "500 💎", icon: <Award className="text-yellow-400" /> },
    { name: "AI Boost Pack", price: "200 💎", icon: <Zap className="text-blue-400" /> },
    { name: "Custom Themes", price: "350 💎", icon: <LayoutGrid className="text-purple-400" /> }
  ];

  return (
    <div className="p-6 grid gap-4 animate-in fade-in">
      {items.map((item, i) => (
        <div key={i} className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between group hover:bg-zinc-800 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">{item.icon}</div>
            <div>
              <p className="text-sm font-black italic uppercase">{item.name}</p>
              <p className="text-[10px] font-bold text-blue-400 uppercase mt-0.5">{item.price}</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-white text-black font-black italic rounded-full text-[10px] active:scale-90 transition">BUY</button>
        </div>
      ))}
    </div>
  );
}

const Award = ({ className }: any) => <div className={className}><Plus /></div>;

