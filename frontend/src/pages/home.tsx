import { useState } from "react";
import { Sparkles, MessageSquare, Share2 } from "lucide-react";

export default function Home() {
  const [screen, setScreen] = useState<"home" | "hub" | "studio" | "magic" | "social">("home");

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-black via-[#050510] to-black"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[150px] top-0 left-0 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] bottom-0 right-0 animate-pulse"></div>
      </div>

      {/* 🔥 SPLASH */}
      {screen === "home" && (
        <div className="flex flex-col items-center justify-center h-screen">

          <FloatingLogo />

          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            RACE-X
          </h1>

          <p className="text-zinc-500 text-sm mt-2 tracking-widest">
            THE FUTURE OF CREATION
          </p>

          <button
            onClick={() => setScreen("hub")}
            className="mt-10 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_25px_#00ffff] active:scale-95"
          >
            ENTER
          </button>
        </div>
      )}

      {/* 🔥 HUB */}
      {screen === "hub" && (
        <div className="p-6 space-y-6">

          <GlassCard title="STUDIO" icon={<Sparkles />} onClick={() => setScreen("studio")} />
          <GlassCard title="MAGIC" icon={<MessageSquare />} onClick={() => setScreen("magic")} />
          <GlassCard title="SOCIAL" icon={<Share2 />} onClick={() => setScreen("social")} />

        </div>
      )}

      {/* MODULES */}
      {screen === "studio" && <Screen title="STUDIO" />}
      {screen === "magic" && <Screen title="MAGIC AI" />}
      {screen === "social" && <Screen title="SOCIAL FEED" />}
    </div>
  );
}

{/* 🔥 FLOATING LOGO */}
function FloatingLogo() {
  return (
    <div className="relative mb-8 animate-bounce">
      <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 blur-2xl opacity-40"></div>

      <div className="w-40 h-40 rounded-full flex items-center justify-center text-5xl font-black bg-black border border-white/10 shadow-[0_0_50px_#00ffff] relative z-10">
        RX
      </div>
    </div>
  );
}

{/* 🔥 TYPES */}
type GlassCardProps = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};

{/* 🔥 3D GLASS CARD */}
function GlassCard({ title, icon, onClick }: GlassCardProps) {

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 20;
    const rotateY = (x / rect.width - 0.5) * 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const reset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="
      p-10 rounded-[2rem] text-center
      bg-white/5 backdrop-blur-2xl border border-white/10
      shadow-[0_20px_80px_rgba(0,0,0,0.8)]
      transition-all duration-300
      relative overflow-hidden
      "
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-2xl"></div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl shadow-inner">
          {icon}
        </div>
        <h2 className="text-xl font-black tracking-widest">{title}</h2>
      </div>
    </div>
  );
}

{/* 🔥 SCREEN */}
type ScreenProps = {
  title: string;
};

function Screen({ title }: ScreenProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-black">{title}</h1>
    </div>
  );
}
