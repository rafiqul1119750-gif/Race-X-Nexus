import React, { useState, useEffect, useRef } from "react";
import {
  Zap, Sparkles, Globe, Library, Plus, Gem,
  LayoutGrid, Video, Users, MessageSquare, Music, ShoppingBag,
  Settings, Heart, MessageCircle, Send, Play, Disc, ArrowLeft, Bell, Crown, Pause
} from "lucide-react";

/* ================= HYBRID DB (INDIAN DATA SEED) ================= */
const DB = {
  async get(key: string) {
    let data = JSON.parse(localStorage.getItem(key) || "[]");
    if (!data.length) {
      if (key === "reels") {
        data = Array.from({ length: 15 }, (_, i) => ({
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
          caption: `RX Viral Reel #${i + 1} 🔥 #Trending`,
          likes: `${Math.floor(Math.random() * 900)}K`
        }));
      }
      if (key === "songs") {
        data = Array.from({ length: 10 }, (_, i) => ({
          title: `RX Exclusive Hit ${i + 1}`,
          artist: "Race-X AI Artist",
          url: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 10) + 1}.mp3`,
          cover: `https://picsum.photos/seed/music${i}/200/200`
        }));
      }
      localStorage.setItem(key, JSON.stringify(data));
    }
    return data;
  }
};

/* ================= MAIN APP ================= */
export default function Home() {
  const [activeTab, setActiveTab] = useState("hub");
  const [reels, setReels] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const [playingSong, setPlayingSong] = useState<number | null>(null);

  useEffect(() => {
    DB.get("reels").then(setReels);
    DB.get("songs").then(setSongs);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-blue-500/30">

      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 p-6 pt-12 bg-black/90 backdrop-blur-3xl border-b border-white/5 z-[4000] flex justify-between items-center">
        <div className="flex items-center gap-4" onClick={() => setActiveTab("hub")}>
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg active:scale-90 transition">
            {activeTab === "hub" ? "RX" : <ArrowLeft size={20} />}
          </div>
          <h2 className="text-xl font-black italic text-blue-500 uppercase tracking-tighter">{activeTab}</h2>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest text-right">7,500 GEMS</span>
          </div>
          <Settings size={20} className="text-zinc-700" />
        </div>
      </header>

      {/* --- CONTENT SWITCHER --- */}
      <main className={`pt-32 pb-44 ${activeTab === 'social' ? 'px-0' : 'px-5'} max-w-[600px] mx-auto min-h-screen`}>

        {/* 1. RX HUB (Main Menu) */}
        {activeTab === "hub" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-900/40 via-zinc-900 to-black p-10 border border-white/5 shadow-2xl mb-4">
              <h1 className="text-4xl font-black italic uppercase leading-[0.85] tracking-tighter italic">RX: <br /> <span className="text-blue-500">THE FUTURE</span></h1>
              <button className="mt-8 bg-white text-black px-8 py-3.5 rounded-full font-black text-[11px] uppercase active:scale-95 transition">+ NEW PROJECT</button>
            </div>
            <HubCard title="RX Studio" color="bg-cyan-400" icon={<Zap size={35} className="text-black fill-black"/>} onClick={() => setActiveTab("studio")} />
            <HubCard title="RX Magic" color="bg-[#121415] border-2 border-cyan-400/40 text-cyan-400" icon={<Sparkles size={35}/>} onClick={() => setActiveTab("magic")} />
            <HubCard title="RX Social" color="bg-[#9333EA]" icon={<Video size={35}/>} onClick={() => setActiveTab("social")} />
            <HubCard title="RX Library" color="bg-gradient-to-r from-cyan-400 to-[#9333EA] text-black" icon={<Library size={35}/>} onClick={() => setActiveTab("library")} />
            <HubCard title="RX Shop" color="bg-[#F97316]" icon={<ShoppingBag size={35} className="fill-white"/>} onClick={() => setActiveTab("shop")} />
          </div>
        )}

        {/* 2. RX SOCIAL (Reels/Videos Only) */}
        {activeTab === "social" && (
          <div className="h-[80vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
            {reels.map((r, i) => (
              <div key={i} className="h-[80vh] w-full snap-start relative bg-zinc-950 mb-4 rounded-[2.5rem] overflow-hidden border border-white/5">
                <video src={r.url} autoPlay muted loop className="w-full h-full object-cover" />
                <div className="absolute bottom-10 left-6 right-16">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 border-2 border-white/20 flex items-center justify-center font-black text-[10px]">RX</div>
                    <span className="font-black italic text-white uppercase text-xs tracking-widest shadow-xl">Race-X_Creator</span>
                  </div>
                  <p className="text-sm font-bold text-white mb-4 drop-shadow-md">{r.caption}</p>
                </div>
                {/* Reels UI Sidebar */}
                <div className="absolute bottom-12 right-4 flex flex-col gap-8 items-center z-10">
                   <div className="flex flex-col items-center gap-1"><Heart size={30} className="fill-white drop-shadow-lg" /><span className="text-[10px] font-black">{r.likes}</span></div>
                   <div className="flex flex-col items-center gap-1"><MessageCircle size={30} className="drop-shadow-lg" /><span className="text-[10px] font-black">22K</span></div>
                   <Send size={30} className="drop-shadow-lg" />
                   <Disc size={30} className="animate-spin-slow text-blue-500 drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. RX MUSIC (Audio Songs Only) */}
        {activeTab === "music" && (
          <div className="space-y-4 animate-in slide-in-from-bottom-5">
            <h2 className="text-2xl font-black italic uppercase text-blue-500 mb-6">Top Charts</h2>
            {songs.map((s, i) => (
              <div key={i} onClick={() => setPlayingSong(i)} className={`p-5 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between ${playingSong === i ? 'bg-blue-600 border-transparent shadow-xl shadow-blue-600/20' : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900'}`}>
                <div className="flex items-center gap-5">
                  <img src={s.cover} className="w-14 h-14 rounded-2xl object-cover" alt="cover" />
                  <div>
                    <h3 className="font-black italic text-sm uppercase tracking-tight">{s.title}</h3>
                    <p className={`text-[10px] font-bold uppercase ${playingSong === i ? 'text-white/70' : 'text-zinc-500'}`}>{s.artist}</p>
                  </div>
                </div>
                {playingSong === i ? <Pause size={24} className="fill-white" /> : <Play size={24} className="text-zinc-600 fill-zinc-600" />}
              </div>
            ))}
          </div>
        )}

        {/* 4. RX SHOP / STUDIO (Placeholders) */}
        {activeTab === "shop" && (
           <div className="grid grid-cols-2 gap-4 animate-in zoom-in-95">
              <ShopItem title="1,000 GEMS" price="₹99" />
              <ShopItem title="5,000 GEMS" price="₹399" />
           </div>
        )}
        {activeTab === "studio" && <div className="p-10 text-center font-black italic text-cyan-400 border border-dashed border-cyan-400/20 rounded-[2.5rem]">RX STUDIO: AI ENGINE INITIALIZED</div>}

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

/* ================= COMPONENTS ================= */

function HubCard({ title, color, icon, onClick }: any) {
  return (
    <div onClick={onClick} className={`${color} rounded-[2.2rem] p-9 flex justify-between items-center active:scale-95 transition-all cursor-pointer shadow-xl`}>
      <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">{title}</h2>
      {icon}
    </div>
  );
}

function ShopItem({ title, price }: any) {
  return (
    <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-white/5 text-center flex flex-col items-center">
       <Gem size={32} className="text-orange-500 mb-4" />
       <h3 className="text-[11px] font-black uppercase mb-5 tracking-tighter">{title}</h3>
       <button className="w-full py-4 bg-white text-black rounded-full font-black text-[10px] uppercase active:scale-90 transition">{price}</button>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-2 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-500'}`}>
      <div className={`${active ? 'bg-blue-500/10 p-3 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10' : 'p-1'}`}>{icon}</div>
      <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}
