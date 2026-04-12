import React, { useEffect, useState } from "react";
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

  // ================= REAL BACKEND CALL =================

  async function generateCinema() {
    setLoading(true);

    const res = await fetch("http://localhost:5000/generate-movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: "Hero fights villain and wins"
      })
    });

    const data = await res.json();

    setResultVideo(data.video); // REAL merged video
    setLoading(false);
  }

  // ================= UI =================

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col relative overflow-hidden">

      {/* 🌌 Background */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(#0ff 1px, transparent 0)`,
          backgroundSize: "20px 20px"
        }}
      />

      {/* HEADER */}
      <header className="flex justify-between p-6 z-10">
        <div>
          <p className="text-cyan-400 text-xs tracking-widest">
            NEURAL CORE ACTIVE
          </p>
          <h1 className="text-3xl font-bold">
            Hi {user?.name || "User"}
          </h1>
        </div>

        <div className="w-12 h-12 rounded-full border border-cyan-400 flex items-center justify-center">
          <User />
        </div>
      </header>

      {/* MAIN PANEL */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">

        <p className="text-zinc-500 mb-6 text-xs tracking-widest">
          WHERE SHOULD WE START?
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md">

          <Button icon={<ImageIcon />} label="Create Image" sub="Stable Diffusion" />
          <Button icon={<Mic />} label="Create Voice" sub="Real TTS" />
          <Button icon={<Piano />} label="Create Melody" sub="Synth Core" />
          <Button icon={<Guitar />} label="Create Music" sub="AI Music" />

          <Button
            icon={<PlaySquare />}
            label="Create Video"
            sub="Cinema AI"
            onClick={generateCinema}
          />

          <Button
            icon={<Music />}
            label="Create Song"
            sub="Voice + Visual"
            primary
          />

        </div>

        {/* LOADING */}
        {loading && (
          <p className="mt-6 text-cyan-400 animate-pulse">
            🎬 Generating Real Movie...
          </p>
        )}

        {/* RESULT VIDEO */}
        {resultVideo && (
          <div className="mt-6 w-full max-w-md">
            <video
              src={resultVideo}
              controls
              className="rounded-lg w-full"
            />

            <button
              onClick={() => {
                const a = document.createElement("a");
                a.href = resultVideo;
                a.download = "movie.mp4";
                a.click();
              }}
              className="mt-2 w-full bg-green-500 py-2 rounded"
            >
              📥 Download Movie
            </button>
          </div>
        )}

      </div>

      {/* WAVE */}
      <div className="absolute bottom-6 w-full flex justify-center gap-1 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-cyan-400 animate-bounce"
            style={{
              height: `${Math.random() * 40 + 10}px`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

    </div>
  );
}

// ================= BUTTON =================

function Button({ icon, label, sub, onClick, primary }: any) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border transition-all
      ${primary
        ? "bg-blue-600 border-blue-400"
        : "bg-[#111] border-zinc-700 hover:border-cyan-400"
      }`}
    >
      <div className="mb-2">{icon}</div>
      <p className="text-xs font-bold">{label}</p>
      <p className="text-[10px] text-zinc-500">{sub}</p>
    </button>
  );
}
