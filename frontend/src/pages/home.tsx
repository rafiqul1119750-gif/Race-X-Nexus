import React, { useState, useEffect } from "react";
import {
  LayoutGrid, Video, Users, MessageSquare, Music, ShoppingBag,
  Settings, Zap, Sparkles, Globe, Library, Gem, Database
} from "lucide-react";

export default function Home() {
  const [tab, setTab] = useState("hub");

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HEADER */}
      <div className="fixed top-0 w-full p-4 bg-black/80 backdrop-blur z-50 flex justify-between">
        <h1 className="font-black text-blue-500 uppercase">RX {tab}</h1>
        <Settings />
      </div>

      {/* MAIN */}
      <main className="pt-20 pb-28 px-4">

        {tab === "hub" && <Hub setTab={setTab} />}
        {tab === "studio" && <Studio />}
        {tab === "magic" && <Magic />}
        {tab === "social" && <Social />}
        {tab === "chat" && <Chat />}
        {tab === "music" && <MusicPlayer />}
        {tab === "shop" && <Shop />}
        {tab === "library" && <LibraryPage />}
        {tab === "backend" && <BackendPro />}

      </main>

      {/* NAV */}
      <nav className="fixed bottom-0 w-full flex justify-around bg-zinc-900 p-3">
        <Nav icon={<LayoutGrid />} onClick={()=>setTab("hub")} />
        <Nav icon={<Video />} onClick={()=>setTab("studio")} />
        <Nav icon={<Users />} onClick={()=>setTab("social")} />
        <Nav icon={<MessageSquare />} onClick={()=>setTab("chat")} />
        <Nav icon={<Music />} onClick={()=>setTab("music")} />
        <Nav icon={<ShoppingBag />} onClick={()=>setTab("shop")} />
      </nav>

    </div>
  );
}

/* ================= HUB ================= */
const Hub = ({ setTab }: any) => (
  <div className="space-y-4">
    <Card t="RX Studio" onClick={()=>setTab("studio")} />
    <Card t="RX Magic" onClick={()=>setTab("magic")} />
    <Card t="RX Social" onClick={()=>setTab("social")} />
    <Card t="RX Chat" onClick={()=>setTab("chat")} />
    <Card t="RX Music" onClick={()=>setTab("music")} />
    <Card t="RX Shop" onClick={()=>setTab("shop")} />
    <Card t="RX Library" onClick={()=>setTab("library")} />
    <Card t="RX Backend" onClick={()=>setTab("backend")} />
  </div>
);

const Card = ({ t, onClick }: any) => (
  <div onClick={onClick} className="p-5 bg-zinc-900 rounded-xl cursor-pointer">
    {t}
  </div>
);

const Nav = ({ icon, onClick }: any) => (
  <button onClick={onClick}>{icon}</button>
);

/* ================= STUDIO ================= */
const Studio = () => (
  <div>
    <textarea className="w-full bg-zinc-900 p-4 rounded" placeholder="Generate..." />
    <button className="w-full mt-3 bg-cyan-400 text-black p-3 rounded">Generate</button>
  </div>
);

/* ================= MAGIC ================= */
const Magic = () => (
  <div>
    <input className="w-full bg-zinc-900 p-3 rounded" placeholder="Ask AI..." />
    <button className="w-full mt-3 bg-blue-500 p-3 rounded">Run</button>
  </div>
);

/* ================= SOCIAL ================= */
const Social = () => {
  const [posts,setPosts]=useState<any[]>([]);
  const [text,setText]=useState("");

  return (
    <div>
      <input value={text} onChange={e=>setText(e.target.value)} className="w-full p-3 bg-zinc-900 rounded"/>
      <button onClick={()=>{setPosts([{text},...posts]);setText("")}} className="bg-blue-500 p-3 mt-2 w-full rounded">Post</button>

      {posts.map((p,i)=><div key={i} className="p-3 bg-zinc-800 mt-2">{p.text}</div>)}
    </div>
  );
};

/* ================= CHAT ================= */
const Chat = () => {
  const [msg,setMsg]=useState("");
  const [chat,setChat]=useState<any[]>([]);

  return (
    <div>
      {chat.map((c,i)=><div key={i} className="p-2">{c}</div>)}
      <input value={msg} onChange={e=>setMsg(e.target.value)} className="w-full p-3 bg-zinc-900"/>
      <button onClick={()=>{setChat([...chat,msg]);setMsg("")}} className="bg-green-500 p-3 w-full">Send</button>
    </div>
  );
};

/* ================= MUSIC ================= */
const MusicPlayer = () => {
  const tracks=[
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  ];
  const [i,setI]=useState(0);
  const [audio]=useState(new Audio(tracks[0]));

  useEffect(()=>{audio.src=tracks[i];audio.play();},[i]);

  return (
    <div>
      <button onClick={()=>audio.play()} className="bg-green-500 p-3">Play</button>
      <button onClick={()=>audio.pause()} className="bg-red-500 p-3">Pause</button>
      <button onClick={()=>setI((i+1)%tracks.length)} className="bg-white text-black p-3">Next</button>
    </div>
  );
};

/* ================= SHOP ================= */
const Shop = () => (
  <div className="grid grid-cols-2 gap-2">
    <div className="bg-zinc-900 p-4">₹99</div>
    <div className="bg-zinc-900 p-4">₹199</div>
  </div>
);

/* ================= LIBRARY ================= */
const LibraryPage = () => (
  <div className="grid grid-cols-2 gap-2">
    <div className="bg-zinc-900 p-4">Assets</div>
    <div className="bg-zinc-900 p-4">Projects</div>
  </div>
);

/* ================= BACKEND (API SYSTEM) ================= */
type APIItem = {
  name: string;
  url: string;
  method: string;
  key: string;
  headers: string;
  body: string;
  enabled: boolean;
};

const BackendPro = () => {
  const [apis,setApis]=useState<APIItem[]>([]);

  const addAPI=()=>setApis([...apis,{name:"API",url:"",method:"GET",key:"",headers:"",body:"",enabled:true}]);

  return (
    <div>
      <button onClick={addAPI} className="bg-green-500 p-2">Add API</button>

      {apis.map((a,i)=>(
        <div key={i} className="bg-zinc-900 p-3 mt-2">
          <input placeholder="Name" onChange={e=>a.name=e.target.value}/>
          <input placeholder="URL" onChange={e=>a.url=e.target.value}/>
        </div>
      ))}
    </div>
  );
};
