import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, MessageCircle, Share2, Send, 
  Globe, Plus, Music2, Search, User 
} from "lucide-react";
import { useLocation } from "wouter";
import { useAppContext } from "../../context/AppContext";

export default function SocialFeed() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();
  const [activeTab, setActiveTab] = useState("for-you");

  const stories = [
    { id: 1, user: "You", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=me", plus: true },
    { id: 2, user: "Zoya", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=9" },
    { id: 3, user: "Alex", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=12" },
    { id: 4, user: "Vicky", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=5" },
  ];

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden font-sans">
      
      {/* 🔝 TOP NAVIGATION (Stories & Branding) */}
      <div className="absolute top-0 w-full z-50 bg-gradient-to-b from-black via-black/90 to-transparent pt-4">
        <div className="flex justify-between items-center px-6 mb-6">
          <div className="flex items-center gap-3" onClick={() => setLocation('/profile')}>
            <div className="w-10 h-10 rounded-full border-2 border-cyan-400 p-0.5 shadow-[0_0_10px_#22d3ee]">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=me" className="rounded-full bg-zinc-800" alt="me" />
            </div>
            <span className="text-[11px] font-black tracking-tight text-cyan-400">{diamonds} 💎</span>
          </div>
          <h1 className="text-xl font-black italic tracking-[0.2em]">RACE-X</h1>
          <Search size={22} onClick={() => setLocation('/social/search')} className="active:scale-90" />
        </div>

        {/* Horizontal Stories */}
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
          {stories.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={`w-14 h-14 rounded-full p-[2px] ${s.plus ? 'border border-dashed border-zinc-600' : 'bg-gradient-to-tr from-cyan-400 to-purple-600 shadow-[0_0_10px_rgba(34,211,238,0.3)]'}`}>
                <div className="w-full h-full rounded-full border-2 border-black overflow-hidden relative">
                  <img src={s.img} alt="story" />
                  {s.plus && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Plus size={14}/></div>}
                </div>
              </div>
              <span className="text-[8px] font-black uppercase text-zinc-500">{s.user}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 📱 MAIN FEED ENGINE */}
      <div className="h-full pt-44 overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-zinc-950">
        <div className="h-full w-full snap-start relative flex flex-col justify-end">
          {/* Background Video Placeholder */}
          <video 
            src="https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-city-light-14144-large.mp4" 
            className="absolute inset-0 w-full h-full object-cover opacity-70" 
            autoPlay loop muted playsInline 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

          {/* RIGHT SIDE ACTIONS (Dedicated Clicks) */}
          <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-50">
            <motion.div whileTap={{scale:0.8}} onClick={() => setLocation('/social/profile/Neon_Creator')} className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-2xl">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Neon" alt="creator" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-cyan-500 rounded-full p-0.5 border-2 border-black"><Plus size={10}/></div>
            </motion.div>

            <div className="flex flex-col items-center gap-1">
              <button className="p-3 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 shadow-xl"><Heart size={26} className="fill-white" /></button>
              <span className="text-[10px] font-black">24.5K</span>
            </div>

            <div className="flex flex-col items-center gap-1" onClick={() => setLocation('/social/comments/1')}>
              <button className="p-3 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 shadow-xl"><MessageCircle size={26} /></button>
              <span className="text-[10px] font-black">800</span>
            </div>

            <button className="p-3 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 shadow-xl"><Share2 size={26} /></button>
          </div>

          {/* POST INFO */}
          <div className="p-6 pb-28 relative z-20">
            <h3 className="font-black italic text-lg tracking-tighter mb-1" onClick={() => setLocation('/social/profile/Neon_Creator')}>@Neon_Creator</h3>
            <p className="text-xs font-medium text-zinc-300 max-w-[80%] mb-4">Mastering the Race-X Studio flow. This UI is actually insane! 🏁💎</p>
            <div className="flex items-center gap-2 bg-white/5 w-fit px-3 py-1 rounded-full border border-white/10">
              <Music2 size={12} className="text-cyan-400" />
              <span className="text-[9px] font-black uppercase tracking-widest italic">Race-X Original Sound</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🎮 NAVBAR (Nexus Hub Control) */}
      <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-3xl border-t border-white/10 p-5 pb-8 flex justify-around items-center z-50">
        <button onClick={() => setLocation('/hub')} className="text-zinc-500 active:text-white transition-all"><Send size={24} className="-rotate-45"/></button>
        <button onClick={() => setLocation('/social/feed')} className="text-white drop-shadow-[0_0_8px_#fff]"><Globe size={28} /></button>
        <div 
          onClick={() => setLocation('/studio')}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center -mt-12 border-[4px] border-black shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-90"
        >
           <Plus size={26} className="text-black font-black" />
        </div>
        <button onClick={() => setLocation('/chat')} className="text-zinc-500 active:text-white transition-all"><MessageCircle size={24} /></button>
        <button onClick={() => setLocation('/profile')} className="text-zinc-500 active:text-white transition-all"><User size={24} /></button>
      </div>

    </div>
  );
}
