import { useLocation } from "wouter";
import { Heart, MessageCircle, Share2, Globe, Plus, Search, User, Compass, Bell, Send } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function SocialFeed() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* HEADER: Hub aur Search Connection */}
      <div className="absolute top-0 w-full z-50 pt-6 px-6">
        <div className="flex justify-between items-center">
          <button onClick={() => setLocation('/hub')} className="p-2 bg-zinc-900/50 rounded-full border border-white/10 active:scale-90 transition-transform">
            <Send size={18} className="-rotate-45 text-cyan-400" />
          </button>
          <h1 className="text-xl font-black italic tracking-widest">RACE-X</h1>
          <Search size={22} onClick={() => setLocation('/social/search')} className="cursor-pointer" />
        </div>
      </div>

      {/* VIDEO AREA */}
      <div className="h-full bg-zinc-950">
         <video src="https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-city-light-14144-large.mp4" className="w-full h-full object-cover opacity-60" autoPlay loop muted playsInline />
      </div>

      {/* BOTTOM NAV: Sab Live hai ab */}
      <div className="absolute bottom-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-5 pb-8 flex justify-around items-center">
        <Compass onClick={() => setLocation('/social/explore')} className="text-zinc-500 cursor-pointer" />
        <Globe onClick={() => setLocation('/social/feed')} className="text-white cursor-pointer" />
        
        {/* CREATE LIVE */}
        <div onClick={() => setLocation('/social/create')} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center -mt-10 border-4 border-black cursor-pointer shadow-lg active:scale-90 transition-transform">
          <Plus className="text-black font-bold" />
        </div>

        <Bell onClick={() => setLocation('/social/activity')} className="text-zinc-500 cursor-pointer" />
        <User onClick={() => setLocation('/profile')} className="text-zinc-500 cursor-pointer" />
      </div>
    </div>
  );
}
