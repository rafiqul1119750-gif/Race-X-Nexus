import { useState, useEffect } from "react";
import {
  Sparkles, MessageSquare, Share2, Music, ShoppingBag,
  Heart, MessageCircle, Send, Wallet, TrendingUp, Layers,
  MoreHorizontal, Bookmark, Play
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("social");

  // GLOBAL STATES
  const [wallet, setWallet] = useState(1250);
  const [notifications, setNotifications] = useState(3);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);

  // MOCK DATA LOAD (Appwrite ready)
  useEffect(() => {
    setPosts([
      { user: "NEXUS_CORE", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800", likes: "125K" },
      { user: "AI_MASTER", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800", likes: "89K" }
    ]);

    setMessages([
      { from: "ai", text: "NEXUS AI READY." }
    ]);
  }, []);

  return (
    <div className="pb-32 bg-black min-h-screen text-white">

      {/* NAV */}
      <nav className="flex justify-around py-4 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <TabBtn label="SOCIAL" active={activeTab === "social"} onClick={() => setActiveTab("social")} icon={<Share2 size={20} />} />
        <TabBtn label="STUDIO" active={activeTab === "studio"} onClick={() => setActiveTab("studio")} icon={<Sparkles size={20} />} />
        <TabBtn label="MAGIC" active={activeTab === "chat"} onClick={() => setActiveTab("chat")} icon={<MessageSquare size={20} />} />
        <TabBtn label="MUSIC" active={activeTab === "music"} onClick={() => setActiveTab("music")} icon={<Music size={20} />} />
        <TabBtn label="SHOP" active={activeTab === "shop"} onClick={() => setActiveTab("shop")} icon={<ShoppingBag size={20} />} />
      </nav>

      <div className="p-4 space-y-6 max-w-[500px] mx-auto">

        {/* SOCIAL */}
        {activeTab === "social" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <HubCard title="AI STUDIO" desc="CREATE" onClick={() => setActiveTab("studio")} icon={<Sparkles />} />
              <HubCard title="WALLET" desc={`${wallet} 💎`} icon={<Wallet />} />
              <HubCard title="TRENDS" desc="VIRAL" icon={<TrendingUp />} />
              <HubCard title="ASSETS" desc="VAULT" icon={<Layers />} />
            </div>

            {posts.map((p, i) => (
              <PostItem key={i} {...p} />
            ))}
          </>
        )}

        {/* STUDIO */}
        {activeTab === "studio" && (
          <Studio wallet={wallet} setWallet={setWallet} />
        )}

        {/* CHAT */}
        {activeTab === "chat" && (
          <MagicChat messages={messages} setMessages={setMessages} />
        )}

        {/* MUSIC */}
        {activeTab === "music" && <MusicModule />}

        {/* SHOP */}
        {activeTab === "shop" && <ShopModule wallet={wallet} setWallet={setWallet} />}

      </div>
    </div>
  );
}

// ---------- COMPONENTS ----------

function TabBtn({ label, active, onClick, icon }) {
  return (
    <button onClick={onClick} className={`text-xs ${active ? "text-blue-500" : "text-zinc-500"}`}>
      {icon}
      <div>{label}</div>
    </button>
  );
}

function HubCard({ title, desc, icon, onClick }) {
  return (
    <div onClick={onClick} className="p-4 bg-zinc-900 rounded-xl">
      {icon}
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function PostItem({ user, img, likes }) {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden">
      <div className="p-3 flex justify-between">
        <span>{user}</span>
        <MoreHorizontal size={16} />
      </div>
      <img src={img} />
      <div className="p-3 flex justify-between">
        <div className="flex gap-3">
          <Heart /><MessageCircle /><Send />
        </div>
        <Bookmark />
      </div>
      <p className="p-3">{likes} interactions</p>
    </div>
  );
}

// ---------- MODULES ----------

function Studio({ wallet, setWallet }) {
  const generate = () => {
    if (wallet < 10) return alert("Not enough gems");
    setWallet(wallet - 10);
    alert("AI GENERATED");
  };

  return (
    <div>
      <textarea placeholder="Describe AI output..." className="w-full bg-black p-3" />
      <button onClick={generate}>Generate (10 💎)</button>
    </div>
  );
}

function MagicChat({ messages, setMessages }) {
  const [input, setInput] = useState("");

  const send = () => {
    if (!input) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
  };

  return (
    <div>
      <div className="h-60 overflow-auto">
        {messages.map((m, i) => (
          <div key={i}>{m.text}</div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}

function MusicModule() {
  return (
    <div>
      <h2>Music Player</h2>
      <Play />
    </div>
  );
}

function ShopModule({ wallet, setWallet }) {
  const buy = () => {
    setWallet(wallet - 100);
    alert("Purchased");
  };

  return (
    <div>
      <h2>Shop</h2>
      <button onClick={buy}>Buy Item (100 💎)</button>
    </div>
  );
}
