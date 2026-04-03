import React, { useState, useEffect } from "react";
import {
  LayoutGrid, Users, MessageSquare, Music, ShoppingBag,
  Crown, Share2, User, ArrowLeft, Heart, ImagePlus, Bell
} from "lucide-react";

/* ================= APPWRITE ================= */
const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = "YOUR_PROJECT_ID";
const DATABASE_ID = "YOUR_DB_ID";
const STORAGE_BUCKET = "YOUR_BUCKET_ID";

let db:any=null;
let storage:any=null;
let realtime:any=null;
let appwriteAvailable=false;

try{
  const { Client, Databases, Storage } = require("appwrite");
  const client=new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);
  db=new Databases(client);
  storage=new Storage(client);
  realtime=client.subscribe;
  appwriteAvailable=true;
}catch{}

/* ================= HYBRID DB ================= */
const DB={
  async get(key:string){
    if(appwriteAvailable){
      try{
        const res=await db.listDocuments(DATABASE_ID,key);
        return res.documents;
      }catch{}
    }
    return JSON.parse(localStorage.getItem(key)||"[]");
  },
  async add(key:string,data:any){
    if(appwriteAvailable){
      try{ await db.createDocument(DATABASE_ID,key,"unique()",data); }catch{}
    }
    const old=JSON.parse(localStorage.getItem(key)||"[]");
    localStorage.setItem(key,JSON.stringify([data,...old]));
  },
  async update(key:string,data:any[]){
    localStorage.setItem(key,JSON.stringify(data));
  }
};

/* ================= MAIN ================= */
export default function Home(){

  const [tab,setTab]=useState("hub");
  const [role,setRole]=useState<"user"|"admin">("user");
  const [toast,setToast]=useState("");

  const showToast=(t:string)=>{
    setToast(t);
    setTimeout(()=>setToast(""),2000);
  };

  return(
    <div className="min-h-screen text-white bg-gradient-to-br from-black via-zinc-900 to-black">

      <div className="fixed top-0 w-full flex justify-between p-4 bg-white/10 backdrop-blur-xl">
        <div className="flex gap-2 items-center">
          {tab!=="hub" && <ArrowLeft onClick={()=>setTab("hub")}/>}
          {role==="admin"?<Crown/>:<User/>}
          RX {tab}
        </div>
        <div className="flex gap-3">
          <Bell onClick={()=>setTab("notif")}/>
          <button onClick={()=>setRole(role==="user"?"admin":"user")}>Switch</button>
        </div>
      </div>

      <main className="pt-16 pb-24 px-3 space-y-4">
        {tab==="hub" && <Hub setTab={setTab} role={role}/>}
        {tab==="social" && <Social showToast={showToast}/>}
        {tab==="reels" && <Reels/>}
        {tab==="notif" && <Notifications/>}
        {tab==="profile" && <Profile/>}
      </main>

      <nav className="fixed bottom-0 w-full flex justify-around bg-white/10 backdrop-blur-xl p-3">
        <Nav icon={<LayoutGrid/>} onClick={()=>setTab("hub")}/>
        <Nav icon={<Users/>} onClick={()=>setTab("social")}/>
        <Nav icon={<Music/>} onClick={()=>setTab("reels")}/>
        <Nav icon={<User/>} onClick={()=>setTab("profile")}/>
      </nav>

      {toast && <div className="fixed bottom-20 bg-white text-black p-2 rounded">{toast}</div>}
    </div>
  );
}

/* ================= HUB ================= */
const Hub=({setTab}:any)=>(
  <div className="grid grid-cols-2 gap-3">
    <Btn t="Feed" onClick={()=>setTab("social")}/>
    <Btn t="Reels" onClick={()=>setTab("reels")}/>
    <Btn t="Profile" onClick={()=>setTab("profile")}/>
  </div>
);

const Btn=({t,onClick}:any)=>(<div onClick={onClick} className="bg-white/10 p-5 rounded-xl">{t}</div>);
const Nav=({icon,onClick}:any)=>(<button onClick={onClick}>{icon}</button>);

/* ================= SOCIAL ================= */
const Social=({showToast}:any)=>{

  const [posts,setPosts]=useState<any[]>([]);
  const [text,setText]=useState("");
  const [following,setFollowing]=useState<string[]>([]);

  useEffect(()=>{load()},[]);
  const load=async()=>{
    let p=await DB.get("posts");
    p.sort((a:any,b:any)=>(b.likes - a.likes)); // simple algo
    setPosts(p);
    setFollowing(JSON.parse(localStorage.getItem("following")||"[]"));
  };

  const post=async()=>{
    if(!text) return;
    const data={user:"You",text,likes:0,comments:[]};
    await DB.add("posts",data);
    setText("");
    showToast("Posted");
    load();
  };

  const follow=(user:string)=>{
    let f=[...following,user];
    setFollowing(f);
    localStorage.setItem("following",JSON.stringify(f));
    DB.add("notifications",{text:`You followed ${user}`});
  };

  const like=(i:number)=>{
    const updated=[...posts];
    updated[i].likes++;
    setPosts(updated);
    DB.update("posts",updated);
    DB.add("notifications",{text:"Someone liked a post"});
  };

  return(
    <div>
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Post..." className="w-full p-2"/>
      <button onClick={post} className="bg-blue-500 w-full p-2 mt-2">Post</button>

      {posts.map((p,i)=>(
        <div key={i} className="bg-white/10 p-3 mt-3 rounded-xl">
          <b>{p.user}</b>
          <button onClick={()=>follow(p.user)} className="ml-2 text-blue-400">Follow</button>
          <p>{p.text}</p>

          <button onClick={()=>like(i)}><Heart/> {p.likes}</button>

          {p.comments.map((c:any,j:number)=><div key={j}>{c}</div>)}
        </div>
      ))}
    </div>
  );
};

/* ================= REELS ================= */
const Reels=()=>{
  const [videos,setVideos]=useState<any[]>([]);

  useEffect(()=>{
    DB.get("reels").then(setVideos);
  },[]);

  return(
    <div className="space-y-5">
      {videos.map((v,i)=>(
        <video key={i} src={v.url} controls className="w-full rounded-xl"/>
      ))}
    </div>
  );
};

/* ================= NOTIFICATIONS ================= */
const Notifications=()=>{
  const [notifs,setNotifs]=useState<any[]>([]);

  useEffect(()=>{
    DB.get("notifications").then(setNotifs);
  },[]);

  return(
    <div>
      {notifs.map((n,i)=>(
        <div key={i} className="bg-white/10 p-2 mt-2 rounded">{n.text}</div>
      ))}
    </div>
  );
};

/* ================= PROFILE ================= */
const Profile=()=>{
  const [followers,setFollowers]=useState<any[]>([]);

  useEffect(()=>{
    setFollowers(JSON.parse(localStorage.getItem("following")||"[]"));
  },[]);

  return(
    <div>
      <h2>Followers</h2>
      {followers.map((f,i)=><div key={i}>{f}</div>)}
    </div>
  );
};
