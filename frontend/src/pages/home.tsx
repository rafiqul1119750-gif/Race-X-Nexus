import React, { useState, useEffect, useRef } from "react";
import {
  LayoutGrid, Users, Music, User, ArrowLeft, Heart, Bell, Crown
} from "lucide-react";

/* ================= APPWRITE ================= */
const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = "YOUR_PROJECT_ID";
const DATABASE_ID = "YOUR_DB_ID";
const STORAGE_BUCKET = "YOUR_BUCKET_ID";

let db: any = null;
let storage: any = null;
let realtime: any = null;
let appwriteAvailable = false;

try {
  const { Client, Databases, Storage, Realtime } = require("appwrite");
  const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);
  db = new Databases(client);
  storage = new Storage(client);
  realtime = new Realtime(client);
  appwriteAvailable = true;
} catch {}

/* ================= TYPES ================= */
type Post = { user: string; text: string; likes: number; comments: string[]; $id?: string };
type Reel = { url: string };
type Notification = { text: string };

/* ================= HYBRID DB ================= */
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
      if (key === "posts") {
        data = [
          { user: "Alice", text: "Welcome to RX Social!", likes: 5, comments: [] },
          { user: "Bob", text: "Check out this amazing app!", likes: 2, comments: [] },
        ];
      }
      if (key === "reels") {
        data = [
          { url: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { url: "https://www.w3schools.com/html/movie.mp4" },
        ];
      }
      if (key === "notifications") {
        data = [
          { text: "Alice joined the platform" },
          { text: "Bob liked your post" },
        ];
      }
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

/* ================= MAIN ================= */
export default function Home() {
  const [tab, setTab] = useState<"hub" | "social" | "reels" | "notif" | "profile">("hub");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [toast, setToast] = useState("");
  let toastTimer: NodeJS.Timeout;

  const showToast = (t: string) => {
    setToast(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="fixed top-0 w-full flex justify-between p-4 bg-white/10 backdrop-blur-xl z-10">
        <div className="flex gap-2 items-center">
          {tab !== "hub" && <ArrowLeft onClick={() => setTab("hub")} />}
          {role === "admin" ? <Crown /> : <User />}
          RX {tab}
        </div>
        <div className="flex gap-3">
          <Bell onClick={() => setTab("notif")} />
          <button onClick={() => setRole(role === "user" ? "admin" : "user")}>Switch</button>
        </div>
      </div>

      <main className="pt-16 pb-24 px-3 space-y-4">
        {tab === "hub" && <Hub setTab={setTab} />}
        {tab === "social" && <Social showToast={showToast} />}
        {tab === "reels" && <Reels />}
        {tab === "notif" && <Notifications />}
        {tab === "profile" && <Profile />}
      </main>

      <nav className="fixed bottom-0 w-full flex justify-around bg-white/10 backdrop-blur-xl p-3 z-10">
        <Nav icon={<LayoutGrid />} onClick={() => setTab("hub")} />
        <Nav icon={<Users />} onClick={() => setTab("social")} />
        <Nav icon={<Music />} onClick={() => setTab("reels")} />
        <Nav icon={<User />} onClick={() => setTab("profile")} />
      </nav>

      {toast && <div className="fixed bottom-20 bg-white text-black p-2 rounded">{toast}</div>}
    </div>
  );
}

/* ================= HUB ================= */
const Hub = ({ setTab }: { setTab: (tab: string) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <Btn t="Feed" onClick={() => setTab("social")} />
    <Btn t="Reels" onClick={() => setTab("reels")} />
    <Btn t="Profile" onClick={() => setTab("profile")} />
  </div>
);

const Btn = ({ t, onClick }: { t: string; onClick: () => void }) => (
  <div onClick={onClick} className="bg-white/10 p-5 rounded-xl text-center cursor-pointer">{t}</div>
);

const Nav = ({ icon, onClick }: { icon: JSX.Element; onClick: () => void }) => (
  <button onClick={onClick}>{icon}</button>
);

/* ================= SOCIAL ================= */
const Social = ({ showToast }: { showToast: (t: string) => void }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [following, setFollowing] = useState<string[]>([]);

  useEffect(() => { load(); subscribe(); }, []);

  const load = async () => {
    let p = await DB.get("posts");
    p.sort((a: Post, b: Post) => b.likes - a.likes);
    setPosts(p);
    setFollowing(JSON.parse(localStorage.getItem("following") || "[]"));
  };

  const subscribe = () => {
    if (appwriteAvailable && realtime) {
      realtime.subscribe(`databases.${DATABASE_ID}.collections.posts.documents`, () => load());
    }
  };

  const post = async () => {
    if (!text) return;
    const data: Post = { user: "You", text, likes: 0, comments: [] };
    await DB.add("posts", data);
    setText("");
    showToast("Posted");
    load();
  };

  const follow = (user: string) => {
    const f = [...following, user];
    setFollowing(f);
    localStorage.setItem("following", JSON.stringify(f));
    DB.add("notifications", { text: `You followed ${user}` });
  };

  const like = (i: number) => {
    const updated = [...posts];
    updated[i].likes++;
    setPosts(updated);
    DB.update("posts", updated);
    DB.add("notifications", { text: "Someone liked a post" });
  };

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Post..." className="w-full p-2 rounded" />
      <button onClick={post} className="bg-blue-500 w-full p-2 mt-2 rounded">Post</button>

      {posts.map((p, i) => (
        <div key={i} className="bg-white/10 p-3 mt-3 rounded-xl">
          <b>{p.user}</b>
          <button onClick={() => follow(p.user)} className="ml-2 text-blue-400">Follow</button>
          <p>{p.text}</p>
          <button onClick={() => like(i)} className="flex items-center gap-1"><Heart /> {p.likes}</button>
          {p.comments.map((c, j) => <div key={j}>{c}</div>)}
        </div>
      ))}
    </div>
  );
};

/* ================= REELS ================= */
const Reels = () => {
  const [videos, setVideos] = useState<Reel[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => { DB.get("reels").then(setVideos); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) video.play();
        else video.pause();
      });
    }, { threshold: 0.75 });
    videoRefs.current.forEach(v => v && observer.observe(v));
    return () => videoRefs.current.forEach(v => v && observer.unobserve(v));
  }, [videos]);

  return (
    <div className="space-y-5">
      {videos.map((v, i) => (
        <video
          key={i}
          ref={el => videoRefs.current[i] = el}
          src={v.url}
          controls
          loop
          className="w-full rounded-xl"
        />
      ))}
    </div>
  );
};

/* ================= NOTIFICATIONS ================= */
const Notifications = () => {
  const [notifs, setNotifs] = useState<Notification[]>([]);

  useEffect(() => { DB.get("notifications").then(setNotifs); }, []);

  return (
    <div>
      {notifs.map((n, i) => (
        <div key={i} className="bg-white/10 p-2 mt-2 rounded">{n.text}</div>
      ))}
    </div>
  );
};

/* ================= PROFILE ================= */
const Profile = () => {
  const [followers, setFollowers] = useState<string[]>([]);

  useEffect(() => {
    setFollowers(JSON.parse(localStorage.getItem("following") || "[]"));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Followers</h2>
      {followers.map((f, i) => <div key={i}>{f}</div>)}
    </div>
  );
};
