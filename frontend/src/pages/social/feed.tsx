import { useLocation } from "wouter";
import { Heart, MessageCircle, Share2, Globe, Plus, Search, User, Compass, Bell, Camera, Send, Bookmark, LayoutGrid } from "lucide-react";

export default function SocialFeed() {
  const [, setLocation] = useLocation();

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* TOP BAR: Hub link added */}
      <div className="absolute top-0 w-full z-50 pt-6 px-6 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent pb-10">
        <div onClick={() => setLocation('/hub')} className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 active:scale-90 transition-transform">
           <LayoutGrid size={20} className="text-cyan-400" /> 
        </div>
        <h1 className="text-xl font-black italic tracking-widest">RACE-X</h1>
        <div className="flex gap-5">
          <Search size={24} onClick={() => setLocation('/social/search')} />
          <Send size={24} className="-rotate-45" onClick={() => setLocation('/chat')} />
        </div>
      </div>

      {/* REELS / VIDEO AREA */}
      <div className="h-full bg-zinc-950">
         <video 
          src="https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-city-light-14144-large.mp4" 
          className="w-full h-full object-cover opacity-70" 
          autoPlay loop muted playsInline 
        />
      </div>

      {/* SIDEBAR ACTIONS (No Dead Links) */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-50 items-center">
        <div className="flex flex-col items-center gap-1">
          <Heart size={32} className="fill-cyan-400 text-cyan-400" />
          <span className="text-[10px] font-black">24K</span>
        </div>
        <MessageCircle size={32} onClick={() => setLocation('/social/comments/1')} />
        <Bookmark size={32} />
        <Share2 size={32} />
      </div>

      {/* BOTTOM NAV */}
      <div className="absolute bottom-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-5 pb-8 flex justify-around items-center">
        <Globe onClick={() => setLocation('/social/feed')} className="text-white" size={26} />
        <Compass onClick={() => setLocation('/social/explore')} className="text-zinc-500" size={26} />
        <div onClick={() => setLocation('/social/create')} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center -mt-10 border-4 border-black active:scale-90 transition-all shadow-xl">
          <Plus className="text-black font-black" size={28} />
        </div>
        <Bell onClick={() => setLocation('/social/activity')} className="text-zinc-500" size={26} />
        <User onClick={() => setLocation('/profile')} className="text-zinc-500" size={26} />
      </div>
    </div>
  );
}
