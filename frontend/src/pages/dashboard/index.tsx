import React from 'react';
import { Link } from 'react-router-dom';

export default function MainHub() {
  const user = {
    name: "RACE-X Official",
    level: 1002,
    points: 99929,
    avatar: "R"
  };

  const tools = [
    { name: "RX STUDIO", desc: "Neural Art & Vision", path: "/studio", color: "#00F2FF", icon: "⚡" },
    { name: "RX MAGIC CHAT", desc: "AI Intelligence", path: "/magic", color: "#00F2FF", icon: "✨" },
    { name: "RX SOCIAL", desc: "Connect & Create", path: "/social", color: "#00F2FF", icon: "🌐" },
    { name: "RX SHOPPING", desc: "Digital Assets", path: "/shop", color: "#00F2FF", icon: "🛍️" },
    { name: "RX MUSIC", desc: "Synth & Beats", path: "/music", color: "#00F2FF", icon: "🎵" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-5 font-sans selection:bg-[#00F2FF]">
      {/* Top Header - Exact Screenshot Style */}
      <div className="flex justify-between items-center mb-10 pt-4">
        <div>
          <h1 className="text-xl font-black italic tracking-tighter text-white">RACE-X: THE FUTURE</h1>
          <p className="text-[8px] text-[#00F2FF] tracking-[0.4em] uppercase font-bold">Creation Engine Active</p>
        </div>
        <div className="flex gap-2">
            <span className="text-[9px] bg-white/5 border border-white/10 px-3 py-1 rounded-full font-bold">API TEST</span>
            <span className="text-[9px] bg-[#00F2FF]/20 text-[#00F2FF] px-3 py-1 rounded-full font-bold">GOD MODE</span>
        </div>
      </div>

      {/* User Welcome Card */}
      <div className="glass-strong border border-white/10 rounded-[2.5rem] p-6 mb-8 flex items-center gap-5 bg-gradient-to-br from-white/[0.05] to-transparent">
        <div className="w-16 h-16 rounded-full bg-[#00F2FF] text-black flex items-center justify-center text-2xl font-black shadow-[0_0_30px_rgba(0,242,255,0.3)]">
          {user.avatar}
        </div>
        <div>
          <p className="text-xs opacity-40 uppercase tracking-widest font-bold">Welcome Back</p>
          <h2 className="text-lg font-black italic">{user.name}</h2>
          <p className="text-[10px] text-[#00F2FF] font-bold uppercase mt-1">Level {user.level} • {user.points} RX Points</p>
        </div>
      </div>

      {/* Feature Grid - Hub Action Buttons */}
      <div className="grid grid-cols-1 gap-4 mb-10">
        {tools.map((tool, i) => (
          <Link key={i} to={tool.path} className="group">
            <div className="bg-white/[0.03] border border-white/10 p-5 rounded-3xl flex items-center justify-between hover:bg-white/[0.08] transition-all active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{tool.icon}</span>
                <div>
                  <h3 className="font-black italic text-sm tracking-wide group-hover:text-[#00F2FF] transition-colors">{tool.name}</h3>
                  <p className="text-[9px] opacity-40 uppercase tracking-widest mt-1">{tool.desc}</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] group-hover:border-[#00F2FF] group-hover:text-[#00F2FF]">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Action Bar (Bottom Footer) */}
      <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center">
        <p className="text-[8px] opacity-20 tracking-[0.5em] uppercase mb-4 text-center leading-loose">
          Race-X Neural Core • v5.0.4<br/>
          All Systems Operational
        </p>
      </div>
    </div>
  );
}
