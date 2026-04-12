import React from "react";
import { useLocation } from "wouter";
import { LayoutGrid, Video, Mic2, BarChart3, Wand2 } from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const menu = [
    { title: "Studio Editor", icon: <Video />, path: "/studio/editor", color: "bg-cyan-500" },
    { title: "AI Cinema", icon: <Wand2 />, path: "/studio/video", color: "bg-purple-500" },
    { title: "Voice Lab", icon: <Mic2 />, path: "/studio/voice", color: "bg-pink-500" },
    { title: "Analytics", icon: <BarChart3 />, path: "/studio/analytics", color: "bg-zinc-700" },
  ];

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-black text-white italic mb-2">RX <span className="text-cyan-500">NEXUS</span></h1>
      <p className="text-zinc-500 text-xs mb-10 tracking-widest uppercase font-bold">The Production Hub</p>

      <div className="grid grid-cols-2 gap-4">
        {menu.map((item) => (
          <button
            key={item.path}
            onClick={() => setLocation(item.path)}
            className="p-6 bg-zinc-900/50 border border-white/5 rounded-[30px] flex flex-col items-center gap-4 active:scale-95 transition-all group hover:border-white/20"
          >
            <div className={`p-4 rounded-2xl ${item.color} text-black shadow-lg`}>
              {React.cloneElement(item.icon, { size: 24 })}
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter opacity-70 group-hover:opacity-100">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
