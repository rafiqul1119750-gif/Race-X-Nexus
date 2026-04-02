import React, { useState } from "react";
import { Sparkles, MessageSquare, Share2, ShoppingCart, ArrowLeft } from "lucide-react";

type ScreenType = "home" | "hub" | "studio" | "magic" | "social" | "shop";

export default function Home() {
  const [screen, setScreen] = useState<ScreenType>("home");

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACK BUTTON */}
      {screen !== "home" && (
        <button
          onClick={() => setScreen("hub")}
          className="absolute top-5 left-5 z-50 p-2 rounded-full bg-white/10 backdrop-blur"
        >
          <ArrowLeft />
        </button>
      )}

      {/* HOME */}
      {screen === "home" && (
        <Center>
          <FloatingLogo />
          <Title />
          <button onClick={() => setScreen("hub")} className="btn">ENTER</button>
        </Center>
      )}

      {/* HUB */}
      {screen === "hub" && (
        <div className="p-6 grid gap-6">
          <GlassCard title="STUDIO" icon={<Sparkles />} onClick={() => setScreen("studio")} />
          <GlassCard title="MAGIC AI" icon={<MessageSquare />} onClick={() => setScreen("magic")} />
          <GlassCard title="SOCIAL" icon={<Share2 />} onClick={() => setScreen("social")} />
          <GlassCard title="RX SHOP" icon={<ShoppingCart />} onClick={() => setScreen("shop")} />
        </div>
      )}

      {/* PAGES */}
      {screen === "studio" && <Studio />}
      {screen === "magic" && <Magic />}
      {screen === "social" && <Social />}
      {screen === "shop" && <Shop />}
    </div>
  );
}

/* ---------- COMMON UI ---------- */

function Center({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center justify-center h-screen gap-4">{children}</div>;
}

function Title() {
  return (
    <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
      RACE-X
    </h1>
  );
}

function FloatingLogo() {
  return (
    <div className="mb-6 text-5xl font-black animate-bounce">RX</div>
  );
}

function GlassCard({ title, icon, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center active:scale-95 transition"
    >
      <div className="mb-3">{icon}</div>
      <h2 className="font-bold">{title}</h2>
    </div>
  );
}

/* ---------- FEATURES (WORKING BASIC LOGIC) ---------- */

/* 🎬 STUDIO */
function Studio() {
  const [text, setText] = useState("");

  return (
    <Page title="RX STUDIO">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Create something..."
        className="input"
      />
      <button className="btn">Generate</button>
    </Page>
  );
}

/* 🤖 MAGIC AI */
function Magic() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const send = () => {
    if (!msg) return;
    setChat([...chat, msg]);
    setMsg("");
  };

  return (
    <Page title="MAGIC AI">
      <div className="space-y-2">
        {chat.map((c, i) => (
          <div key={i} className="bg-white/10 p-2 rounded">{c}</div>
        ))}
      </div>

      <input value={msg} onChange={(e) => setMsg(e.target.value)} className="input" />
      <button onClick={send} className="btn">Send</button>
    </Page>
  );
}

/* 🌐 SOCIAL */
function Social() {
  const [posts, setPosts] = useState<string[]>([]);
  const [post, setPost] = useState("");

  const addPost = () => {
    if (!post) return;
    setPosts([post, ...posts]);
    setPost("");
  };

  return (
    <Page title="SOCIAL">
      <input value={post} onChange={(e) => setPost(e.target.value)} className="input" />
      <button onClick={addPost} className="btn">Post</button>

      {posts.map((p, i) => (
        <div key={i} className="bg-white/10 p-2 mt-2 rounded">{p}</div>
      ))}
    </Page>
  );
}

/* 🛒 RX SHOP */
function Shop() {
  const items = ["Premium Theme", "AI Boost", "Pro Badge"];

  return (
    <Page title="RX SHOP">
      {items.map((item, i) => (
        <div key={i} className="bg-white/10 p-4 rounded flex justify-between">
          <span>{item}</span>
          <button className="btn-small">Buy</button>
        </div>
      ))}
    </Page>
  );
}

/* ---------- PAGE LAYOUT ---------- */

function Page({ title, children }: any) {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = `
.btn { padding:10px 20px; background:linear-gradient(to right, cyan, purple); border-radius:20px; }
.btn-small { padding:6px 12px; background:purple; border-radius:10px; }
.input { width:100%; padding:10px; border-radius:10px; background:#111; }
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = styles;
  document.head.appendChild(style);
}
