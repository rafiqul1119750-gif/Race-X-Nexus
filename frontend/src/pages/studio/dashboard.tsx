import React from "react";
import { useLocation } from "wouter";
import { Video, Mic2, BarChart3, Wand2, Zap } from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const handleNav = (path: string) => {
    // Ye line ensure karegi ki app refresh na ho aur seedha Editor khule
    setLocation(path);
  };

  const menu = [
    { title: "STUDIO EDITOR", icon: <Video />, path: "/studio/editor", color: "bg-[#00D1FF]" },
    { title: "AI CINEMA", icon: <Wand2 />, path: "/studio/video", color: "bg-[#A155FF]" },
    { title: "VOICE LAB", icon: <Mic2 />, path: "/studio/voice", color: "#FF4694" }, // Pink as per your screenshot
    { title: "ANALYTICS", icon: <BarChart3 />, path: "/studio/analytics", color: "bg-[#444]" },
  ];

  return (
    <div className="p-6 bg-black min-h-screen text-white flex flex-col items-center">
      {/* BRANDING (As seen in your screenshot) */}
      <div className="w-full flex flex-col items-center mb-12">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-10 h-10 bg-[#00D1FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)]">
            <Zap size={24} fill="black" />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter">RX <span className="text-[#00D1FF]">NEXUS</span></h1>
        </div>
        <p className="text-[9px] text-zinc-500 tracking-[0.4em] uppercase font-bold">The Production Hub</p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
        {menu.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNav(item.path)}
            className="aspect-square bg-zinc-900/40 border border-white/5 rounded-[40px] flex flex-col items-center justify-center gap-4 active:scale-90 transition-all group"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.color.startsWith('bg') ? item.color : ''} text-black shadow-lg`} style={!item.color.startsWith('bg') ? {backgroundColor: item.color} : {}}>
              {React.cloneElement(item.icon, { size: 28 })}
            </div>
            <span className="text-[10px] font-black uppercase tracking-tight text-zinc-400 group-hover:text-white transition-colors">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {/* SYSTEM STATUS */}
      <div className="mt-auto w-full max-w-sm p-5 bg-zinc-900/20 border border-white/5 rounded-3xl flex items-center justify-between">
        <span className="text-[9px] font-bold text-zinc-600 tracking-widest uppercase">System Core</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-bold text-green-500 uppercase">Online</span>
        </div>
      </div>
    </div>
  );
}
