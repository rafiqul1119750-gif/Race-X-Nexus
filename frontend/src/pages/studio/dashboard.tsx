import React, { useEffect, useState, useRef } from "react";
import { account } from "@/lib/appwrite";
import { ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  const API_BASE = "https://race-x-nexus.onrender.com";

  // 🔥 AUTO WAKE
  useEffect(() => {
    account.get().then(setUser).catch(() => {});

    fetch(`${API_BASE}/health`)
      .then(() => console.log("Server Ready"))
      .catch(() => console.log("Waking server..."));
  }, []);

  // 🚀 MAIN FUNCTION (AUTO RETRY + NO ALERT)
  async function executeNexusProtocol(endpoint: string, type: 'video' | 'audio' | 'image') {
    try {
      setLoading(true);

      const call = async () => {
        const res = await fetch(`${API_BASE}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) throw new Error("sleep");
        return res.json();
      };

      setStatus("⚡ Initializing AI...");
      let data;

      try {
        data = await call();
      } catch {
        setStatus("🧠 Waking Neural Core...");
        await new Promise(r => setTimeout(r, 20000));
        data = await call();
      }

      setStatus("🎬 Rendering Output...");

      // ===== OUTPUT =====
      if (type === 'image' && data.url) window.open(data.url);
      if (type === 'audio' && data.url) new Audio(data.url).play();
      if (type === 'video' && data.video) setResultVideo(data.video);

      setStatus("✅ Done");

    } catch (err) {
      console.error(err);
      setStatus("❌ Connection Failed");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  }

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">

      {/* 🌐 GRID */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      {/* HEADER */}
      <header className="flex justify-between items-center p-8 z-10">
        <div>
          <p className="text-cyan-400 text-[10px] tracking-[0.5em] animate-pulse uppercase italic">
            NEURAL CORE ACTIVE
          </p>
          <h1 className="text-3xl font-black bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Hi {user?.name?.split(" ")[0] || "User"}
          </h1>
        </div>

        <div className="w-14 h-14 rounded-full border border-cyan-400 flex items-center justify-center">
          <User />
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 px-6">

        <div className="grid grid-cols-2 gap-6 w-full max-w-md">

          <HoloButton icon={<ImageIcon />} label="IMAGE"
            onClick={() => executeNexusProtocol("/create-image", "image")} />

          <HoloButton icon={<Mic />} label="VOICE"
            onClick={() => executeNexusProtocol("/create-voice", "audio")} />

          <HoloButton icon={<Piano />} label="MELODY"
            onClick={() => executeNexusProtocol("/create-melody", "audio")} />

          <HoloButton icon={<Guitar />} label="MUSIC"
            onClick={() => executeNexusProtocol("/create-music", "audio")} />

          <HoloButton icon={<PlaySquare />} label="VIDEO"
            onClick={() => executeNexusProtocol("/generate-movie", "video")} />

          <HoloButton icon={<Music />} label="SONG"
            onClick={() => executeNexusProtocol("/create-song", "audio")} primary />

        </div>

        {/* STATUS */}
        {(loading || status) && (
          <div className="mt-8 text-center">
            <div className="w-16 h-[2px] bg-zinc-800 mx-auto overflow-hidden">
              <div className="h-full bg-cyan-400 animate-[shimmer_1.5s_infinite]" style={{ width: "40%" }} />
            </div>
            <p className="text-cyan-400 text-xs mt-2">{status}</p>
          </div>
        )}

        {/* VIDEO */}
        {resultVideo && (
          <div className="mt-6 w-full max-w-md">
            <video src={resultVideo} controls className="w-full rounded-xl" />
            <button
              onClick={() => window.open(resultVideo)}
              className="mt-3 w-full bg-white text-black py-2 rounded"
            >
              Download
            </button>
          </div>
        )}

      </main>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}

// ===== 3D BUTTON =====
function HoloButton({ icon, label, onClick, primary }: any) {
  const ref = useRef<any>(null);

  const move = (e: any) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = -(y - rect.height / 2) / 10;
    const ry = (x - rect.width / 2) / 10;

    ref.current.style.transform =
      `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
  };

  const reset = () => {
    ref.current.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      onClick={onClick}
      className={`p-8 rounded-2xl border transition-all duration-300
      ${primary ? "bg-blue-600 border-blue-400" : "bg-zinc-900/40 border-white/10"}`}
    >
      <div className="flex justify-center text-cyan-400 mb-2">
        {icon}
      </div>
      <p className="text-xs text-center font-bold">{label}</p>
    </button>
  );
}
