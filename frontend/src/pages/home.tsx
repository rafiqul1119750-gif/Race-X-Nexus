// ⚠️ BIG FILE — READY FRONTEND SUPER APP

import React, { useState, useEffect } from "react";
import {
  Home, Video, Users, MessageCircle, Music, ShoppingBag, Settings, Shield
} from "lucide-react";

/* ================= API SYSTEM ================= */
type APIConfig = {
  name: string;
  key: string;
  url: string;
  enabled: boolean;
};

const defaultAPIs: APIConfig[] = [
  { name: "OpenAI", key: "", url: "https://api.openai.com/v1", enabled: false },
  { name: "Appwrite", key: "", url: "", enabled: false },
];

/* ================= MAIN ================= */
export default function HomePage() {
  const [page, setPage] = useState("splash");

  const [apis, setApis] = useState<APIConfig[]>(() => {
    const saved = localStorage.getItem("rx_apis");
    return saved ? JSON.parse(saved) : defaultAPIs;
  });

  useEffect(() => {
    localStorage.setItem("rx_apis", JSON.stringify(apis));
  }, [apis]);

  useEffect(() => {
    setTimeout(() => setPage("hub"), 2000);
  }, []);

  if (page === "splash") return <Splash />;
  if (page === "studio") return <Studio />;
  if (page === "social") return <Social />;
  if (page === "chat") return <Chat apis={apis} />;
  if (page === "music") return <MusicPlayer />;
  if (page === "shop") return <Shop />;
  if (page === "settings") return <SettingsPage />;
  if (page === "god") return <GodMode apis={apis} setApis={setApis} />;

  return <Hub setPage={setPage} />;
}

/* ================= SPLASH ================= */
const Splash = () => (
  <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
    <h1 className="text-5xl font-bold">RX</h1>
    <p className="text-gray-400">Race-X Omniverse</p>
  </div>
);

/* ================= HUB ================= */
const Hub = ({ setPage }: any) => (
  <div className="p-4 bg-black text-white min-h-screen pb-20">
    <h1 className="text-2xl font-bold mb-4">RX HUB</h1>

    <Btn t="Studio" onClick={()=>setPage("studio")} />
    <Btn t="Social" onClick={()=>setPage("social")} />
    <Btn t="Chat" onClick={()=>setPage("chat")} />
    <Btn t="Music" onClick={()=>setPage("music")} />
    <Btn t="Shop" onClick={()=>setPage("shop")} />
    <Btn t="Settings" onClick={()=>setPage("settings")} />
    <Btn t="God Mode" onClick={()=>setPage("god")} />

    <BottomNav setPage={setPage}/>
  </div>
);

const Btn = ({t,onClick}:any)=>(
  <div onClick={onClick} className="p-4 mb-3 bg-white/10 rounded-xl cursor-pointer">{t}</div>
);

/* ================= SOCIAL ================= */
const Social = () => {
  const [posts,setPosts]=useState<any[]>([]);
  const [text,setText]=useState("");

  return (
    <Page title="Social">
      <input className="input" value={text} onChange={e=>setText(e.target.value)} />
      <button className="btn" onClick={()=>{setPosts([{text},...posts]);setText("")}}>Post</button>

      {posts.map((p,i)=><div key={i} className="card">{p.text}</div>)}
    </Page>
  );
};

/* ================= CHAT ================= */
const Chat = ({apis}:any)=>{
  const [msg,setMsg]=useState("");
  const [chat,setChat]=useState<any[]>([]);

  const send=()=>{
    setChat([...chat,{user:msg},{bot:"AI Ready (connect API)"}]);
    setMsg("");
  };

  return(
    <Page title="Chat">
      {chat.map((c,i)=><div key={i}>{c.user||c.bot}</div>)}
      <input className="input" value={msg} onChange={e=>setMsg(e.target.value)}/>
      <button className="btn" onClick={send}>Send</button>
    </Page>
  );
};

/* ================= MUSIC ================= */
const MusicPlayer = () => {
  const tracks=[
    {title:"Song 1",url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"},
    {title:"Song 2",url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"},
  ];

  const [i,setI]=useState(0);
  const [audio]=useState(new Audio(tracks[0].url));
  const [play,setPlay]=useState(false);

  useEffect(()=>{audio.src=tracks[i].url;if(play)audio.play();},[i]);

  return(
    <Page title="Music">
      <h2>{tracks[i].title}</h2>
      <button className="btn" onClick={()=>{audio.play();setPlay(true)}}>Play</button>
      <button className="btn" onClick={()=>{audio.pause();setPlay(false)}}>Pause</button>
      <button className="btn" onClick={()=>setI((i+1)%tracks.length)}>Next</button>
    </Page>
  );
};

/* ================= SHOP ================= */
const Shop = () => (
  <Page title="Shop">
    <div className="card">RX Item ₹100 <button className="btn">Buy</button></div>
  </Page>
);

/* ================= SETTINGS ================= */
const SettingsPage = () => (
  <Page title="Settings">
    <div className="card">Terms & Conditions</div>
    <div className="card">Privacy Policy</div>
    <div className="card">Safety Scanner</div>
  </Page>
);

/* ================= GOD MODE ================= */
const GodMode = ({apis,setApis}:any)=>(
  <Page title="God Mode">
    {apis.map((a:any,i:number)=>(
      <div key={i} className="card">
        <input value={a.name} onChange={e=>{a.name=e.target.value;setApis([...apis])}}/>
        <input value={a.url} onChange={e=>{a.url=e.target.value;setApis([...apis])}}/>
        <input value={a.key} onChange={e=>{a.key=e.target.value;setApis([...apis])}}/>
      </div>
    ))}
  </Page>
);

/* ================= COMMON ================= */
const Page = ({title,children}:any)=>(
  <div className="p-4 bg-black text-white min-h-screen">
    <h1 className="text-xl font-bold mb-3">{title}</h1>
    {children}
  </div>
);

const BottomNav=({setPage}:any)=>(
  <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-black p-3">
    <div onClick={()=>setPage("hub")}><Home/></div>
    <div onClick={()=>setPage("social")}><Users/></div>
    <div onClick={()=>setPage("chat")}><MessageCircle/></div>
    <div onClick={()=>setPage("music")}><Music/></div>
    <div onClick={()=>setPage("shop")}><ShoppingBag/></div>
  </div>
);
