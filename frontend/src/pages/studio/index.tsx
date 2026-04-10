import { ArrowLeft, Play, Mic2, Music, ChevronRight, Cpu } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { databases } from "../../lib/appwrite"; 

const DATABASE_ID = 'Race-X-Nexus';
const COLLECTION_ID = 'api_configs';

export default function RXStudio() {
  const [, setLocation] = useLocation();
  const [engineStatus, setEngineStatus] = useState("Protocol v4.0 Active");

  const studioTools = [
    {
      title: "SOUND ENGINE",
      desc: "SAFE 30S CLIPS FOR SOCIAL",
      icon: <Music className="text-pink-400" size={24} />,
      path: "/studio/editor", 
      color: "from-pink-600/20 to-transparent",
    },
    {
      title: "CINEMA AI",
      desc: "TEXT TO CINEMATIC VIDEO",
      icon: <Play className="text-cyan-400" fill="currentColor" size={24} />,
      path: "/studio/video-gen", 
      color: "from-blue-600/20 to-transparent",
    },
    {
      title: "VOICE LAB",
      desc: "AI VOICE CLONING",
      icon: <Mic2 className="text-purple-400" size={24} />,
      path: "/studio/voice-lab", 
      color: "from-purple-600/20 to-transparent",
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans">
      <header className="flex items-center justify-between mb-10">
        <button onClick={() => setLocation("/hub")} className="p-4 bg-zinc-900/80 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20}/>
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">RX STUDIO</h2>
          <p className="text-[7px] font-bold text-zinc-600 uppercase tracking-[0.3em] mt-1">{engineStatus}</p>
        </div>
        <Cpu size={20} className="text-cyan-500 animate-pulse" />
      </header>

      <div className="space-y-4">
        {studioTools.map((tool) => (
          <button 
            key={tool.title} 
            onClick={() => setLocation(tool.path)}
            className="relative overflow-hidden w-full bg-zinc-900/40 border border-white/5 p-8 rounded-[35px] flex items-center justify-between active:scale-[0.98] group transition-all"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-center gap-6 relative z-10">
              <div className="p-5 bg-black rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <div className="text-left">
                <h4 className="text-lg font-black italic uppercase tracking-widest leading-none mb-2">{tool.title}</h4>
                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{tool.desc}</p>
              </div>
            </div>
            <div className="p-3 bg-white/5 rounded-full relative z-10 group-hover:bg-white group-hover:text-black transition-all">
              <ChevronRight size={18} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
