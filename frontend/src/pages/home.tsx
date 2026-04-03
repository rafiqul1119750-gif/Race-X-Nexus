import React, { useState, useEffect, useRef } from "react";
import { 
  Zap, Sparkles, Globe, Library, Plus, Gem, 
  LayoutGrid, Video, Users, MessageSquare, Music, ShoppingBag,
  Settings, Heart, MessageCircle, Send, Play, Disc, ArrowLeft, Bell, Crown, User
} from "lucide-react";

/* ================= APPWRITE CONFIG ================= */
const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = "YOUR_PROJECT_ID";
const DATABASE_ID = "YOUR_DB_ID";

let db: any = null;
let realtime: any = null;
let appwriteAvailable = false;

try {
  const { Client, Databases, Realtime } = require("appwrite");
  const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);
  db = new Databases(client);
  realtime = new Realtime(client);
  appwriteAvailable = true;
} catch {}

/* ================= HYBRID DATABASE LOGIC ================= */
const DB = {
  async get(key: string) {
    if (appwriteAvailable) {
      try {
        const res = await db.listDocuments(DATABASE_ID, key);
        return res.documents;
      } catch {}
    }
    let data = JSON.parse(localStorage.getItem(key) || "[]");
    if (data.length === 0) {
      if (key === "posts") data = [{ user: "RX_SYSTEM", text: "Welcome to Race-X!", likes: 100, comments: [] }];
      if (key === "reels") data = [{ url: "https://www.w3schools.com/html/mov_bbb.mp4" }];
      localStorage.setItem(key, JSON.stringify(data));
    }
    return data;
  },
  async add(key: string, data: any) {
    if (appwriteAvailable) {
      try { await db.createDocument(DATABASE_ID, key, "unique()", data); } catch {}
    }
    const old = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([data, ...old]));
  },
  async update(key: string, data: any[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

/* ================= MAIN APP COMPONENT ================= */
export default function Home() {
  const [activeTab, setActiveTab] = useState("hub");
  const [wallet] = useState(7500);
  const [role, setRole] = useState<"user" | "admin">("user");
  const [posts, setPosts] = useState<any[]>([]);
  const [reels, setReels] = useState<any[]>([]);
  const [text, setText] = useState("");

  // Load Data on Start
  useEffect(() => {
    DB.get("posts").then(setPosts);
    DB.get("reels").then(setReels);
  }, []);

  const handlePost = async () => {
    if (!text) return;
    const newPost = { user: "You", text, likes: 0, comments: [] };
    await DB.add("posts", newPost);
    setText("");
    DB.get("posts").then(setPosts);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* --- PREMIUM GLOBAL HEADER --- */}
      <header className="fixed top-0 left-0 right-0 p-6 pt-12 bg-black/80 backdrop-blur-3xl border-b border-white/5 z-[4000] flex justify-between items-center">
        <div className="flex items-center gap-4" onClick={() => setActiveTab("hub")}>
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-xs shadow-lg shadow-blue-500/20">
            {activeTab === "hub" ? "RX" : <ArrowLeft size={20} />}
          </div>
          <div>
            <h2 className="text-xl font-black italic text-blue-500 uppercase tracking-tighter">{activeTab}</h2>
            <div className="flex gap-2">
               <Gem size={10} className="text-cyan-400" />
               <span className="text-[8px] font-black text-zinc-500 uppercase">{wallet} GEMS</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-zinc-600">
           <Bell size={20} />
           <div onClick={() => setRole(role === "user" ? "admin" : "user")}>
              {role === "admin" ? <Crown className="text-yellow-500" /> : <Settings size={20} />}
           </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="pt-32 pb-44 px-5 max-w-[600px] mx-auto min-h-screen">
        
        {/* 1. RX HUB (Home) */}
        {activeTab === "hub" && (
          <div className="space-y-6 animate-in fade-in duration-700">
            <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-900/40 via-zinc-900 to-black p-10 border border-white/5 shadow-2xl">
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

        {/* 2. RX STUDIO (Generator) */}
        {activeTab === "studio" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-5">
            <textarea 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe your vision..." 
              className="w-full bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 text-sm font-black italic outline-none min-h-[180px] focus:border-cyan-400 transition-all" 
            />
            <button onClick={handlePost} className="w-full py-8 bg-cyan-400 text-black rounded-[2.5rem] font-black uppercase text-xs shadow-xl active:scale-95 transition">Materialize Asset</button>
          </div>
        )}

        {/* 3. RX SOCIAL (Feed) */}
        {activeTab === "social" && (
          <div className="space-y-8 animate-in slide-in-from-right-5">
            {posts.map((p, i) => (
              <PostItem key={i} user={p.user} text={p.text} likes={p.likes} img={`https://picsum.photos/seed/${i}/800`} />
            ))}
          </div>
        )}

        {/* 4. RX REELS (Video) */}
        {activeTab === "music" && (
          <div className="space-y-6 animate-in fade-in">
             {reels.map((v, i) => (
               <div key={i} className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-zinc-900">
                  <video src={v.url} controls loop className="w-full aspect-[9/16] object-cover" />
                  <div className="absolute bottom-10 left-6">
                     <p className="font-black italic uppercase text-white shadow-lg">RX Reel #{i+1}</p>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* 5. RX SHOP (Market) */}
        {activeTab === "shop" && (
          <div className="grid grid-cols-2 gap-4 animate-in zoom-in-95">
             <ShopItem title="1,000 GEMS" price="₹99" />
             <ShopItem title="5,000 GEMS" price="₹399" />
             <ShopItem title="RX PREMIUM" price="₹999" />
             <ShopItem title="CREATOR KIT" price="₹499" />
          </div>
        )}

      </main>

      {/* --- GLOBAL BOTTOM NAVIGATION --- */}
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

/* ================= REUSABLE COMPONENTS ================= */

function HubCard({ title, color, icon, onClick }: any) {
  return (
    <div onClick={onClick} className={`${color} rounded-[2.2rem] p-9 flex justify-between items-center active:scale-95 transition-all cursor-pointer shadow-xl`}>
      <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">{title}</h2>
      {icon}
    </div>
  );
}

function PostItem({ user, text, likes, img }: any) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-[3rem] overflow-hidden">
      <div className="p-5 flex items-center justify-between">
         <span className="font-black italic text-[11px] uppercase tracking-widest text-blue-500">{user}</span>
         <button className="text-[10px] font-black text-zinc-500 uppercase">Follow</button>
      </div>
      {img && <img src={img} className="w-full aspect-square object-cover" />}
      <div className="p-6">
        <p className="text-sm font-bold text-zinc-300 mb-4">{text}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-6"><Heart size={22}/><MessageCircle size={22}/><Send size={22}/></div>
          <span className="text-[10px] font-black italic text-zinc-500 uppercase">{likes} Likes</span>
        </div>
      </div>
    </div>
  );
}

function ShopItem({ title, price }: any) {
  return (
    <div className="bg-zinc-900 p-8 rounded-[2rem] border border-white/5 text-center flex flex-col items-center">
       <Gem size={30} className="text-orange-500 mb-4" />
       <h3 className="text-[10px] font-black uppercase mb-4 tracking-tighter">{title}</h3>
       <button className="w-full py-3 bg-white text-black rounded-full font-black text-[9px] uppercase active:scale-90 transition">{price}</button>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-500'}`}>
      <div className={`${active ? 'bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20 shadow-lg shadow-blue-500/10' : 'p-1'}`}>{icon}</div>
      <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}
