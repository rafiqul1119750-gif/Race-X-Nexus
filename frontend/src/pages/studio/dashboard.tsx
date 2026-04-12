import React, { useEffect, useState, useRef } from "react";
import { account } from "@/lib/appwrite";
import {
  ImageIcon, Mic, Music, PlaySquare, Guitar, Piano, User
} from "lucide-react";

export default function Dashboard() {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  useEffect(() => {
    account.get().then(setUser);
  }, []);

  const API = "http://localhost:5000";

  const call = async (url: string) => {
    const res = await fetch(`${API}${url}`, { method: "POST" });
    return await res.json();
  };

  // ===== REAL FUNCTIONS =====
  const createImage = async () => window.open((await call("/create-image")).url);
  const createVoice = async () => new Audio((await call("/create-voice")).url).play();
  const createMelody = async () => new Audio((await call("/create-melody")).url).play();
  const createMusic = async () => new Audio((await call("/create-music")).url).play();
  const createSong = async () => new Audio((await call("/create-song")).url).play();

  const createVideo = async () => {
    setLoading(true);
    const d = await call("/generate-movie");
    setResultVideo(d.video);
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col relative overflow-hidden">

      {/* 🌐 HOLOGRAM GRID */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* HEADER */}
      <header className="flex justify-between items-center p-6 z-10">
        <div>
          <p className="text-cyan-400 text-xs tracking-widest animate-pulse">
            NEURAL CORE ACTIVE
          </p>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Hi {user?.name || "User"}
          </h1>
        </div>

        <div className="w-14 h-14 rounded-full border border-cyan-400 flex items-center justify-center shadow-[0_0_20px_cyan]">
          <User />
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center justify-center z-10">

        <p className="text-zinc-500 text-xs mb-8 tracking-widest">
          WHERE SHOULD WE START?
        </p>

        <div className="grid grid-cols-2 gap-6 w-full max-w-md">

          <HoloButton icon={<ImageIcon />} label="IMAGE" onClick={createImage}/>
          <HoloButton icon={<Mic />} label="VOICE" onClick={createVoice}/>
          <HoloButton icon={<Piano />} label="MELODY" onClick={createMelody}/>
          <HoloButton icon={<Guitar />} label="MUSIC" onClick={createMusic}/>
          <HoloButton icon={<PlaySquare />} label="VIDEO" onClick={createVideo}/>
          <HoloButton icon={<Music />} label="SONG" onClick={createSong} primary/>

        </div>

        {/* LOADING */}
        {loading && (
          <p className="mt-6 text-cyan-400 animate-pulse">
            ⚡ Rendering Cinematic Output...
          </p>
        )}

        {/* VIDEO OUTPUT */}
        {resultVideo && (
          <div className="mt-6 w-full max-w-md">
            <video src={resultVideo} controls className="w-full rounded-xl shadow-lg" />

            <button
              onClick={() => {
                const a = document.createElement("a");
                a.href = resultVideo;
                a.download = "movie.mp4";
                a.click();
              }}
              className="mt-3 w-full bg-green-500 py-2 rounded-xl"
            >
              📥 Download Movie
            </button>
          </div>
        )}

      </main>

    </div>
  );
}

// ===== 3D HOLOGRAM BUTTON =====

function HoloButton({ icon, label, onClick, primary }: any) {
  const ref = useRef<any>(null);

  const handleMove = (e: any) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 8;
    const rotateY = (x - rect.width / 2) / 8;

    ref.current.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;

    ref.current.style.boxShadow = `
      ${x/8}px ${y/8}px 40px rgba(0,255,255,0.35),
      0 0 25px rgba(0,255,255,0.2)
    `;
  };

  const reset = () => {
    ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    ref.current.style.boxShadow = "0 0 20px rgba(0,255,255,0.2)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={`relative p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 active:scale-95 overflow-hidden
      ${primary
        ? "bg-blue-500/20 border-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.5)]"
        : "bg-cyan-500/5 border-cyan-400/20"
      }`}
    >

      {/* moving light */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 hover:opacity-100 transition duration-300"/>

      <div className="mb-2 flex justify-center text-cyan-400">
        {icon}
      </div>

      <p className="text-xs font-bold text-center tracking-widest">
        {label}
      </p>

    </button>
  );
}
