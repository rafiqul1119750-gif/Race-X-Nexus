import React, { useState, useEffect, useRef } from "react";
import {
  Heart, MessageCircle, Send, LayoutGrid, Users,
  BarChart3, Coins, Settings, Play, Pause, ShoppingCart, Bell
} from "lucide-react";

/* SPLASH */
function Splash({ onDone }: any) {
  useEffect(() => { setTimeout(onDone, 1500); }, []);
  return <div className="h-screen flex items-center justify-center bg-black text-white text-5xl">RX</div>;
}

/* STORE */
const Store = {
  get: (k: string, d: any) => JSON.parse(localStorage.getItem(k) || JSON.stringify(d)),
  set: (k: string, v: any) => localStorage.setItem(k, JSON.stringify(v))
};

export default function Home() {

  const [showSplash, setShowSplash] = useState(true);
  const [tab, setTab] = useState("social");

  const [user, setUser] = useState<any>(Store.get("user", null));
  const [name, setName] = useState("");

  const [reels, setReels] = useState<any[]>([]);
  const [comments, setComments] = useState<any>({});
  const [inputComment, setInputComment] = useState("");

  const [following, setFollowing] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  const [songs, setSongs] = useState<any[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRef = useRef<any>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const [messages, setMessages] = useState<any[]>([]);
  const [msg, setMsg] = useState("");
  const [typing, setTyping] = useState(false);

  const [coins, setCoins] = useState(0);

  /* INIT */
  useEffect(() => {
    setReels(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      caption: "🔥 Reel " + i
    })));

    setSongs(Array.from({ length: 10 }, (_, i) => ({
      id: i,
      title: "Song " + i,
      url: "https://www.w3schools.com/html/horse.mp3"
    })));

    setProducts(Array.from({ length: 6 }, (_, i) => ({
      id: i,
      name: "Product " + i,
      price: 100 + i * 20
    })));
  }, []);

  /* LOGIN */
  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;
  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <input value={name} onChange={e => setName(e.target.value)} className="p-2 border bg-black"/>
        <button onClick={() => { const u = { name }; setUser(u); Store.set("user", u); }} className="mt-3 bg-blue-500 p-2">Login</button>
      </div>
    );
  }

  /* CHAT AI */
  const sendMsg = () => {
    if (!msg) return;
    setMessages(m => [...m, { user: "You", text: msg }]);
    setTyping(true);

    setTimeout(() => {
      setMessages(m => [...m, { user: "RX AI", text: "🤖 Smart AI response..." }]);
      setTyping(false);
    }, 1200);

    setMsg("");
  };

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HEADER */}
      <header className="fixed top-0 w-full flex justify-between p-4 bg-black z-50">
        <div>RX</div>
        <Bell onClick={() => setTab("notify")} />
      </header>

      <main className="pt-16 pb-20">

        {/* SOCIAL */}
        {tab === "social" && (
          <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
            {reels.map(r => (
              <div key={r.id} className="h-screen snap-start relative">
                <video src={r.url} autoPlay loop muted className="w-full h-full object-cover"/>
                <div className="absolute bottom-20 left-4">{r.caption}</div>

                {/* COMMENTS */}
                <div className="absolute bottom-10 left-4">
                  <input
                    value={inputComment}
                    onChange={e => setInputComment(e.target.value)}
                    placeholder="Comment..."
                    className="bg-black border p-1"
                  />
                  <button onClick={() => {
                    setComments(c => ({
                      ...c,
                      [r.id]: [...(c[r.id] || []), inputComment]
                    }));
                    setInputComment("");
                  }}>Post</button>

                  {(comments[r.id] || []).map((c: any, i: number) => (
                    <div key={i}>{c}</div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* PROFILE */}
        {tab === "profile" && (
          <div className="p-4">
            <h2>{user.name}</h2>
            <button onClick={() => setFollowing(!following)}>
              {following ? "Following" : "Follow"}
            </button>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {tab === "notify" && (
          <div className="p-4">
            {notifications.map((n, i) => <div key={i}>{n}</div>)}
          </div>
        )}

        {/* MUSIC */}
        {tab === "music" && (
          <div className="p-4">
            {songs.map(s => (
              <div key={s.id}>
                {s.title}
                <button onClick={() => {
                  setPlaying(s.id);
                  audioRef.current.src = s.url;
                  audioRef.current.play();
                }}>
                  ▶
                </button>
              </div>
            ))}
            <audio ref={audioRef} controls className="w-full mt-3"/>
          </div>
        )}

        {/* SHOP */}
        {tab === "shop" && (
          <div className="p-4">
            {products.map(p => (
              <div key={p.id}>
                {p.name} ₹{p.price}
                <button onClick={() => setCart(c => [...c, p])}>Add</button>
              </div>
            ))}
            <button onClick={() => {
              setOrders(o => [...o, cart]);
              setCart([]);
            }}>Checkout</button>
          </div>
        )}

        {/* CHAT */}
        {tab === "chat" && (
          <div className="p-4">
            <div className="h-[60vh] overflow-y-auto">
              {messages.map((m, i) => <div key={i}>{m.user}: {m.text}</div>)}
              {typing && <div>AI typing...</div>}
            </div>
            <input value={msg} onChange={e => setMsg(e.target.value)} />
            <button onClick={sendMsg}>Send</button>
          </div>
        )}

      </main>

      {/* NAV */}
      <nav className="fixed bottom-0 w-full flex justify-around p-3 bg-black">
        <button onClick={() => setTab("social")}><LayoutGrid /></button>
        <button onClick={() => setTab("profile")}><Users /></button>
        <button onClick={() => setTab("music")}><Play /></button>
        <button onClick={() => setTab("shop")}><ShoppingCart /></button>
        <button onClick={() => setTab("chat")}><Send /></button>
      </nav>

    </div>
  );
}
