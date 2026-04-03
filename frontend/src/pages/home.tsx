import React, { useEffect, useState, useRef } from "react";

export default function App() {

  // ===== GLOBAL =====
  const [screen, setScreen] = useState("splash");
  const [loading, setLoading] = useState(true);

  // ===== USER =====
  const [user, setUser] = useState<string | null>(null);
  const [gems, setGems] = useState(2000);

  // ===== AI =====
  const [aiInput, setAiInput] = useState("");
  const [aiChat, setAiChat] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

  // ===== MUSIC =====
  const [song, setSong] = useState("None");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = [
    { name: "RX Theme", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Cyber Beat", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
  ];

  // ===== SHOP =====
  const [owned, setOwned] = useState<string[]>([]);
  const API = "http://localhost:3000";

  // ===== SOCIAL =====
  const [posts, setPosts] = useState<string[]>([]);
  const [postInput, setPostInput] = useState("");

  // ===== ADS =====
  const [showAd, setShowAd] = useState(false);

  // ===== SPLASH =====
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setScreen("login");
    }, 2000);
  }, []);

  // ===== AI REAL =====
  const sendAI = async () => {
    if (!aiInput) return;

    setAiChat((p) => [...p, "🧑 " + aiInput]);
    setAiLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are RX AI futuristic assistant." },
            { role: "user", content: aiInput }
          ]
        })
      });

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content || "No response";

      setAiChat((p) => [...p, "🤖 " + reply]);
    } catch {
      setAiChat((p) => [...p, "⚠️ AI Error"]);
    }

    setAiInput("");
    setAiLoading(false);
  };

  // ===== MUSIC =====
  const playTrack = (url: string, name: string) => {
    if (audioRef.current) audioRef.current.pause();

    const audio = new Audio(url);
    audioRef.current = audio;

    audio.play();
    setSong(name);
    setIsPlaying(true);

    audio.onended = () => setIsPlaying(false);
  };

  // ===== SHOP =====
  const buyItem = async (item: string, price: number) => {
    if (gems < price) return;

    await fetch(`${API}/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item, price })
    });

    setGems((g) => g - price);
    setOwned((o) => [...o, item]);

    triggerAd();
  };

  // ===== SOCIAL =====
  const addPost = () => {
    if (!postInput) return;
    setPosts([postInput, ...posts]);
    setPostInput("");
  };

  // ===== ADS =====
  const triggerAd = () => {
    setShowAd(true);
    setTimeout(() => setShowAd(false), 3000);
  };

  // ===== GOD MODE =====
  const godMode = () => {
    setGems(999999);
    setOwned(["ALL"]);
  };

  return (
    <div className="bg-black text-white min-h-screen p-4">

      {/* SPLASH */}
      {loading && <h1 className="text-3xl text-center mt-40">🚀 RX Loading...</h1>}

      {/* LOGIN */}
      {!loading && screen === "login" && (
        <div className="text-center mt-40">
          <h1 className="text-2xl mb-4">RX Login</h1>
          <button onClick={() => { setUser("RX User"); setScreen("home"); }}
            className="bg-blue-600 px-6 py-2 rounded">
            Enter
          </button>
        </div>
      )}

      {/* HOME */}
      {screen === "home" && (
        <div className="space-y-3">
          <h1>Welcome {user}</h1>
          <p>💎 {gems}</p>

          <button onClick={() => setScreen("studio")} className="bg-pink-600 p-2 rounded">RX Studio</button>
          <button onClick={() => setScreen("social")} className="bg-cyan-600 p-2 rounded">RX Social</button>
          <button onClick={() => setScreen("magic")} className="bg-indigo-600 p-2 rounded">RX Magic</button>
          <button onClick={() => setScreen("music")} className="bg-purple-600 p-2 rounded">RX Music</button>
          <button onClick={() => setScreen("shop")} className="bg-yellow-600 p-2 rounded">RX Shop</button>
          <button onClick={() => setScreen("owner")} className="bg-red-600 p-2 rounded">Owner</button>
        </div>
      )}

      {/* STUDIO */}
      {screen === "studio" && (
        <div>
          <h1>🎬 RX Studio</h1>
          <input value={aiInput} onChange={(e) => setAiInput(e.target.value)} />
          <button onClick={sendAI}>Generate</button>
          {aiChat.map((m, i) => <div key={i}>{m}</div>)}
        </div>
      )}

      {/* SOCIAL */}
      {screen === "social" && (
        <div>
          <h1>🌐 RX Social</h1>
          <input value={postInput} onChange={(e) => setPostInput(e.target.value)} />
          <button onClick={addPost}>Post</button>

          {posts.map((p, i) => (
            <div key={i} className="bg-zinc-800 p-2 mt-2">{p}</div>
          ))}
        </div>
      )}

      {/* MAGIC CHAT */}
      {screen === "magic" && (
        <div>
          <h1>✨ RX Magic Chat</h1>
          {aiChat.map((m, i) => <div key={i}>{m}</div>)}

          <input value={aiInput} onChange={(e) => setAiInput(e.target.value)} />
          <button onClick={sendAI}>
            {aiLoading ? "Thinking..." : "Ask AI"}
          </button>
        </div>
      )}

      {/* MUSIC */}
      {screen === "music" && (
        <div>
          <h1>🎵 RX Music</h1>
          <p>{song}</p>

          {tracks.map((t, i) => (
            <button key={i} onClick={() => playTrack(t.url, t.name)}>
              ▶ {t.name}
            </button>
          ))}
        </div>
      )}

      {/* SHOP */}
      {screen === "shop" && (
        <div>
          <h1>🛒 RX Shop</h1>

          {[
            { name: "Pro Badge", price: 500 },
            { name: "AI Boost", price: 1200 },
            { name: "Premium Theme", price: 2000 }
          ].map((item, i) => (
            <button key={i} onClick={() => buyItem(item.name, item.price)}>
              {item.name} ({item.price})
            </button>
          ))}
        </div>
      )}

      {/* OWNER */}
      {screen === "owner" && (
        <div>
          <h1>👑 Owner Panel</h1>
          <button onClick={godMode}>GOD MODE</button>
        </div>
      )}

      {/* ADS */}
      {showAd && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded">
          🚀 RX Ad
        </div>
      )}

    </div>
  );
}
