import React, { useEffect, useState, useRef } from "react";
import { account } from "@/lib/appwrite";
import {
  ImageIcon,
  Mic,
  Music,
  PlaySquare,
  Guitar,
  Piano,
  User
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  const API_BASE = "https://race-x-nexus.onrender.com";

  // INIT
  useEffect(() => {
    account.get().then(setUser).catch(() => {});

    fetch(`${API_BASE}/health`)
      .then(() => console.log("Server Ready"))
      .catch(() => console.log("Server connecting..."));
  }, []);

  // CORE FUNCTION
  async function executeNexusProtocol(
    endpoint: string,
    type: "video" | "audio" | "image"
  ) {
    if (loading) return;

    try {
      setLoading(true);
      setStatus("Processing...");

      const callAPI = async () => {
        const res = await fetch(`${API_BASE}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || "Request failed");
        }

        return res.json();
      };

      let data;

      try {
        data = await callAPI();
      } catch (err) {
        console.log("Retry...");
        setStatus("Retrying...");
        await new Promise((r) => setTimeout(r, 3000));
        data = await callAPI();
      }

      setStatus("Generating output...");

      // OUTPUT HANDLING
      if (type === "image" && data?.url) {
        window.open(data.url, "_blank");
      }

      if (type === "audio" && data?.url) {
        const audio = new Audio(data.url);
        audio.play().catch(() => {});
      }

      if (type === "video" && data?.video) {
        setResultVideo(data.video);
      }

      setStatus("Completed");

    } catch (err) {
      console.error(err);
      setStatus("Error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  }

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* HEADER */}
      <header className="flex justify-between items-center p-6 z-10">
        <div>
          <p className="text-cyan-400 text-[10px] tracking-[0.5em] uppercase">
            STUDIO DASHBOARD
          </p>
          <h1 className="text-2xl font-bold">
            Hi {user?.name?.split(" ")[0] || "User"}
          </h1>
        </div>

        <div className="w-12 h-12 rounded-full border border-cyan-400 flex items-center justify-center">
          <User />
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 z-10">

        <div className="grid grid-cols-2 gap-5 w-full max-w-md">

          <HoloButton
            icon={<ImageIcon />}
            label="IMAGE"
            disabled={loading}
            onClick={() => executeNexusProtocol("/create-image", "image")}
          />

          <HoloButton
            icon={<Mic />}
            label="VOICE"
            disabled={loading}
            onClick={() => executeNexusProtocol("/create-voice", "audio")}
          />

          <HoloButton
            icon={<Piano />}
            label="MELODY"
            disabled={loading}
            onClick={() => executeNexusProtocol("/create-melody", "audio")}
          />

          <HoloButton
            icon={<Guitar />}
            label="MUSIC"
            disabled={loading}
            onClick={() => executeNexusProtocol("/create-music", "audio")}
          />

          <HoloButton
            icon={<PlaySquare />}
            label="VIDEO"
            disabled={loading}
            onClick={() => executeNexusProtocol("/generate-movie", "video")}
          />

          <HoloButton
            icon={<Music />}
            label="SONG"
            primary
            disabled={loading}
            onClick={() => executeNexusProtocol("/create-song", "audio")}
          />
        </div>

        {/* STATUS */}
        {(loading || status) && (
          <div className="mt-8 text-center">
            <div className="w-20 h-[3px] bg-zinc-800 mx-auto overflow-hidden rounded">
              <div className="h-full bg-cyan-400 animate-pulse w-1/2" />
            </div>
            <p className="text-cyan-400 text-xs mt-2">{status}</p>
          </div>
        )}

        {/* VIDEO OUTPUT */}
        {resultVideo && (
          <div className="mt-6 w-full max-w-md">
            <video
              src={resultVideo}
              controls
              className="w-full rounded-xl border border-cyan-400"
            />
            <button
              onClick={() => window.open(resultVideo, "_blank")}
              className="mt-3 w-full bg-white text-black py-2 rounded"
            >
              Download
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// BUTTON
function HoloButton({
  icon,
  label,
  onClick,
  primary,
  disabled
}: any) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const move = (e: any) => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = -(y - rect.height / 2) / 10;
    const ry = (x - rect.width / 2) / 10;

    ref.current.style.transform =
      `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      onClick={onClick}
      disabled={disabled}
      className={`
        p-6 rounded-2xl border transition-all duration-300
        ${primary
          ? "bg-blue-600 border-blue-400"
          : "bg-zinc-900/40 border-white/10"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
      `}
    >
      <div className="flex justify-center text-cyan-400 mb-2">
        {icon}
      </div>
      <p className="text-xs text-center font-bold">{label}</p>
    </button>
  );
}
