import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Send, Globe, Plus, Music2, Search, User } from "lucide-react";
import { useLocation } from "wouter";
import { useAppContext } from "../../context/AppContext";

export default function SocialFeed() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* HEADER & STORIES */}
      <div className="absolute top-0 w-full z-50 bg-gradient-to-b from-black via-black/80 to-transparent pt-4 px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3" onClick={() => setLocation('/profile')}>
            <div className="w-10 h-10 rounded-full border-2 border-cyan-400 p-0.5"><User size={20} className="mx-auto mt-1 text-zinc-400" /></div>
            <span className="text-[11px] font-black tracking-tight text-cyan-400">{diamonds} 💎</span>
          </div>
          <h1 className="text-xl font-black italic tracking-[0.2em]">RACE-X</h1>
          <Search size={22} onClick={() => setLocation('/social/search')} />
        </div>
      </div>

      {/* FEED (TikTok Style) */}
      <div className="h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar bg-zinc-950">
        <div className="h-full w-full snap-start relative flex flex-col justify-end">
          <video src="https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-city-light-14144-large.mp4" className="absolute inset-0 w-full h-full object-cover opacity-60" autoPlay loop muted playsInline />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />

          {/* ACTIONS */}
          <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-50">
            <button className="p-3 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20"><Heart size={26} className="fill-white" /></button>
            <button onClick={() => setLocation('/social/comments/1')} className="p-3 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20"><MessageCircle size={26} /></button>
            <button className="p-3 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20"><Share2 size={26} /></button>
          </div>

          <div className="p-6 pb-28 relative z-20">
            <h3 className="font-black italic text-lg tracking-tighter mb-1">@Neon_Creator</h3>
            <p className="text-xs font-medium text-zinc-300">Welcome to the Nexus. 🏁💎</p>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-3xl border-t border-white/10 p-5 pb-8 flex justify-around items-center z-50">
        <button onClick={() => setLocation('/hub')} className="text-zinc-500"><Send size={24} className="-rotate-45"/></button>
        <button onClick={() => setLocation('/social/feed')} className="text-white"><Globe size={28} /></button>
        <div onClick={() => setLocation('/studio')} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center -mt-12 border-[4px] border-black shadow-lg"><Plus size={26} className="text-black font-black" /></div>
        <button onClick={() => setLocation('/chat')} className="text-zinc-500"><MessageCircle size={24} /></button>
        <button onClick={() => setLocation('/profile')} className="text-zinc-500"><User size={24} /></button>
      </div>
    </div>
  );
}
