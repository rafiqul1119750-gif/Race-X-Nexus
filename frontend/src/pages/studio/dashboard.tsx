import React from "react";
import { Link } from "wouter"; // Link use karenge setLocation ki jagah
import { Video, Mic2, BarChart3, Wand2, Zap } from "lucide-react";

export default function Dashboard() {
  const menu = [
    { title: "Studio Editor", icon: <Video />, path: "/studio/editor", color: "bg-cyan-500" },
    { title: "AI Cinema", icon: <Wand2 />, path: "/studio/video", color: "bg-purple-500" },
    { title: "Voice Lab", icon: <Mic2 />, path: "/studio/voice", color: "bg-pink-500" },
    { title: "Analytics", icon: <BarChart3 />, path: "/studio/analytics", color: "bg-zinc-700" },
  ];

  return (
    <div className="p-6 bg-black min-h-screen text-white overflow-y-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-cyan-500 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <Zap size={20} className="text-black" fill="currentColor" />
        </div>
        <h1 className="text-3xl font-black text-white italic tracking-tighter">RX <span className="text-cyan-500 font-black">NEXUS</span></h1>
      </div>
      <p className="text-zinc-500 text-[9px] mb-10 tracking-[0.4em] uppercase font-bold pl-1">The Production Hub</p>

      <div className="grid grid-cols-2 gap-4">
        {menu.map((item) => (
          <Link key={item.path} href={item.path}>
            <a className="p-6 bg-zinc-900/40 border border-white/5 rounded-[32px] flex flex-col items-center gap-4 active:scale-90 transition-all group hover:border-cyan-500/30">
              <div className={`p-4 rounded-2xl ${item.color} text-black shadow-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
                {React.cloneElement(item.icon, { size: 24 })}
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-60 group-hover:opacity-100 text-center leading-tight">
                {item.title}
              </span>
            </a>
          </Link>
        ))}
      </div>
      
      {/* Visual Indicator of Live Status */}
      <div className="mt-12 p-4 bg-zinc-900/20 border border-white/5 rounded-2xl flex items-center justify-between">
          <span className="text-[8px] font-bold text-zinc-600 tracking-widest uppercase">System Core</span>
          <span className="text-[8px] font-bold text-green-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> ONLINE
          </span>
      </div>
    </div>
  );
}
