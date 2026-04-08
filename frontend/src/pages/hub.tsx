import { useLocation } from "wouter";
import { Heart, MessageCircle, Share2, Globe, Plus, Search, User, Compass, Bell, Camera, Send } from "lucide-react";

export default function SocialFeed() {
  const [, setLocation] = useLocation();

  return (
    <div className="fixed inset-0 bg-black text-white">
      {/* TOP BAR (Diagram: Camera, Search, DM, Notif) */}
      <div className="absolute top-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <Camera size={24} onClick={() => setLocation('/social/create')} />
        <h1 className="text-xl font-black italic tracking-widest">RACE-X</h1>
        <div className="flex gap-5">
          <Search size={24} onClick={() => setLocation('/social/search')} />
          <Send size={24} className="-rotate-45" onClick={() => setLocation('/chat')} />
        </div>
      </div>

      {/* VIDEO PLAYER (Reels Default) */}
      <div className="h-full bg-zinc-900 flex items-center justify-center">
        <video src="https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-city-light-14144-large.mp4" className="w-full h-full object-cover opacity-70" autoPlay loop muted playsInline />
      </div>

      {/* BOTTOM NAV (Diagram: Home, Explore, Create, Activity, Profile) */}
      <div className="absolute bottom-0 w-full bg-black/90 backdrop-blur-md border-t border-white/10 p-5 pb-8 flex justify-around items-center">
        <Globe size={24} onClick={() => setLocation('/social/feed')} className="text-white" />
        <Compass size={24} onClick={() => setLocation('/social/explore')} className="text-zinc-500" />
        <div onClick={() => setLocation('/social/create')} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center -mt-10 border-4 border-black shadow-xl">
          <Plus className="text-black font-bold" />
        </div>
        <Bell size={24} onClick={() => setLocation('/social/activity')} className="text-zinc-500" />
        <User size={24} onClick={() => setLocation('/profile')} className="text-zinc-500" />
      </div>
    </div>
  );
}
