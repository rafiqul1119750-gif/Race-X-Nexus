import React from "react";
import { useLocation } from "wouter";
import { Video, Mic2, BarChart3, Wand2, Zap } from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const menu = [
    { title: "STUDIO EDITOR", icon: <Video />, path: "/studio/editor", color: "bg-[#00D1FF]" },
    { title: "AI CINEMA", icon: <Wand2 />, path: "/studio/video", color: "bg-[#A155FF]" },
    { title: "VOICE LAB", icon: <Mic2 />, path: "/studio/voice", color: "bg-[#FF4694]" },
    { title: "ANALYTICS", icon: <BarChart3 />, path: "/studio/analytics", color: "bg-zinc-700" },
  ];

  return (
    <div className="p-6 bg-black min-h-screen text-white flex flex-col items-center overflow-x-hidden">
      <div className="w-full flex flex-col items-center mb-12 mt-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-10 h-10 bg-[#00D1FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)]">
            <Zap size={24} fill="black" />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">RX <span className="text-[#00D1FF]">Nexus</span></h1>
        </div>
        <p className="text-[9px] text-zinc-600 tracking-[0.4em] uppercase font-bold">The Production Hub</p>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-sm px-2">
        {menu.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              console.log("Navigating to:", item.path);
              setLocation(item.path);
            }}
            className="aspect-square bg-zinc-900/40 border border-white/5 rounded-[45px] flex flex-col items-center justify-center gap-4 active:scale-90 transition-all group"
          >
            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center ${item.color} text-black shadow-lg`}>
              {React.cloneElement(item.icon, { size: 28 })}
            </div>
            <span className="text-[10px] font-black uppercase tracking-tight text-zinc-500 group-hover:text-white">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
