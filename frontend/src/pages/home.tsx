// 🚀 RACE-X OMNIVERSE FINAL (LOGIN BASED ADMIN + SHAREABLE USER PORTAL)

import React, { useState, useEffect } from "react";
import {
  Home, Shield, LogIn, LogOut, Send,
  Music, ShoppingBag, Video, MessageCircle, Plus
} from "lucide-react";

/* ---------------- CONFIG ---------------- */
const defaultConfig = {
  API: "https://race-x-nexus.onrender.com/api",
};

/* ---------------- MAIN ---------------- */
export default function Home() {

  /* ---------------- AUTH ---------------- */
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<"user" | "admin" | null>(null);

  /* ---------------- STATE ---------------- */
  const [tab, setTab] = useState("hub");
  const [config, setConfig] = useState(defaultConfig);

  const [posts, setPosts] = useState<any[]>([]);
  const [chat, setChat] = useState<any[]>([]);
  const [music, setMusic] = useState<any[]>([]);
  const [shop, setShop] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  /* ---------------- AUTO USER LINK ---------------- */
  const [userLink, setUserLink] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("rx_user_id") || Date.now().toString();
    localStorage.setItem("rx_user_id", id);
    setUserLink(`${window.location.origin}/user/${id}`);
  }, []);

  /* ---------------- LOGIN ---------------- */
  const loginUser = () => {
    setUser({ name: "User" });
    setRole("user");
  };

  const loginAdmin = () => {
    setUser({ name: "Admin" });
    setRole("admin");
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  /* ---------------- SAFE FETCH ---------------- */
  const safeFetch = async (url: string, fallback: any) => {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch {
      return fallback;
    }
  };

  /* ---------------- LOAD ---------------- */
  useEffect(() => {
    if (!user) return;

    (async () => {
      const API = config.API;

      const s = await safeFetch(`${API}/social/feed`, { posts: [] });
      const m = await safeFetch(`${API}/music`, { music: [] });
      const sh = await safeFetch(`${API}/shop`, { products: [] });
      const r = await safeFetch(`${API}/reels`, { reels: [] });

      setPosts(s.posts);
      setMusic(m.music);
      setShop(sh.products);
      setVideos(r.reels);
    })();
  }, [user, config]);

  /* ---------------- ACTIONS ---------------- */
  const post = () => {
    if (!text) return;

    const p = { id: Date.now(), user: user.name, text, likes: 0 };
    setPosts(prev => [p, ...prev]);
    setText("");
  };

  const send = () => {
    if (!msg) return;

    setChat(c => [...c, { role: "user", text: msg }]);
    setChat(c => [...c, { role: "bot", text: "AI reply..." }]);
    setMsg("");
  };

  /* ---------------- LOGIN SCREEN ---------------- */
  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
        <h1 className="text-2xl font-bold">RACE-X LOGIN</h1>

        <button onClick={loginUser} className="bg-blue-600 px-6 py-3 rounded-xl">
          <LogIn/> User Login
        </button>

        <button onClick={loginAdmin} className="bg-red-600 px-6 py-3 rounded-xl">
          <Shield/> Admin Login
        </button>
      </div>
    );
  }

  /* ---------------- ADMIN PORTAL ---------------- */
  if (role === "admin") {
    return (
      <div className="bg-black text-white min-h-screen p-4">

        <h1 className="text-xl font-bold flex items-center gap-2">
          <Shield/> ADMIN CONTROL PANEL
        </h1>

        {/* USER LINK */}
        <div className="mt-4 bg-zinc-900 p-3 rounded">
          <p className="text-sm">User Portal Link (Share this)</p>
          <input value={userLink} readOnly className="w-full bg-black p-2 mt-2 rounded"/>
        </div>

        {/* API CONTROL */}
        <div className="mt-4">
          <p>API Endpoint</p>
          <input
            value={config.API}
            onChange={e=>setConfig({ API: e.target.value })}
            className="w-full p-2 bg-zinc-900 rounded mt-1"
          />
        </div>

        {/* DATA CONTROL */}
        <div className="mt-4 space-y-2">
          <button onClick={()=>setPosts([])} className="bg-red-600 w-full p-2 rounded">Clear Posts</button>
          <button onClick={()=>setChat([])} className="bg-red-600 w-full p-2 rounded">Clear Chat</button>
          <button onClick={()=>setMusic([])} className="bg-red-600 w-full p-2 rounded">Clear Music</button>
        </div>

        <button onClick={logout} className="mt-6 bg-blue-600 w-full p-3 rounded">
          <LogOut/> Logout
        </button>

      </div>
    );
  }

  /* ---------------- USER PORTAL ---------------- */
  return (
    <div className="bg-black text-white min-h-screen pb-20">

      {/* HEADER */}
      <div className="p-4 text-xl font-bold border-b border-white/10">
        RACE-X
      </div>

      {/* HUB */}
      {tab === "hub" && (
        <div className="grid grid-cols-2 gap-4 p-4">
          <Btn t="RX Social" f={()=>setTab("social")} />
          <Btn t="RX Studio" f={()=>setTab("studio")} />
          <Btn t="RX Chat" f={()=>setTab("chat")} />
          <Btn t="RX Music" f={()=>setTab("music")} />
          <Btn t="RX Shop" f={()=>setTab("shop")} />
        </div>
      )}

      {/* SOCIAL */}
      {tab==="social" && (
        <div className="p-4">
          <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full p-3 bg-zinc-900 rounded"/>
          <button onClick={post} className="mt-2 bg-blue-600 px-4 py-2 rounded">Post</button>

          {posts.map(p=>(
            <div key={p.id} className="bg-zinc-900 p-3 mt-3 rounded">
              <b>{p.user}</b>
              <p>{p.text}</p>
              ❤️ {p.likes}
            </div>
          ))}
        </div>
      )}

      {/* CHAT */}
      {tab==="chat" && (
        <div className="p-4">
          {chat.map((c,i)=>(
            <div key={i}>{c.text}</div>
          ))}
          <div className="flex gap-2 mt-2">
            <input value={msg} onChange={e=>setMsg(e.target.value)} className="flex-1 p-2 bg-zinc-900 rounded"/>
            <button onClick={send}><Send/></button>
          </div>
        </div>
      )}

      {/* MUSIC */}
      {tab==="music" && (
        <div className="p-4">
          {music.map((m,i)=>(
            <audio key={i} src={m.url} controls className="w-full"/>
          ))}
        </div>
      )}

      {/* SHOP */}
      {tab==="shop" && (
        <div className="p-4 grid grid-cols-2 gap-3">
          {shop.map((p,i)=>(
            <div key={i} className="bg-zinc-900 p-2 rounded">
              <img src={p.image}/>
              <p>{p.name}</p>
              <p>₹{p.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* STUDIO */}
      {tab==="studio" && (
        <div className="p-4">
          <input type="file" className="w-full"/>
          {videos.map((v,i)=>(
            <video key={i} src={v.video} controls className="w-full mt-2"/>
          ))}
        </div>
      )}

      {/* NAV */}
      <div className="fixed bottom-0 w-full flex justify-around bg-black p-3 border-t border-white/10">
        <button onClick={()=>setTab("hub")}><Home/></button>
        <button onClick={()=>setTab("social")}><Plus/></button>
        <button onClick={()=>setTab("studio")}><Video/></button>
        <button onClick={()=>setTab("music")}><Music/></button>
        <button onClick={()=>setTab("shop")}><ShoppingBag/></button>
      </div>

    </div>
  );
}

/* ---------------- BTN ---------------- */
function Btn({ t, f }: any) {
  return (
    <button onClick={f} className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-xl font-bold">
      {t}
    </button>
  );
}
