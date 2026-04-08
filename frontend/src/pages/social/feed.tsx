import { useLocation } from "wouter";
import { Heart, MessageCircle, Share2, Globe, Plus, Search, User, Compass, Bell } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function SocialFeed() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* TOP: Profile, Logo & Search */}
      <div className="absolute top-0 w-full z-50 bg-gradient-to-b from-black to-transparent pt-6 px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2" onClick={() => setLocation('/profile')}>
            <div className="w-10 h-10 rounded-full border border-cyan-400 p-0.5"><User size={20} className="mx-auto mt-1"/></div>
            <span className="text-[10px] font-black text-cyan-400">{diamonds} 💎</span>
          </div>
          <h1 className="text-xl font-black italic tracking-widest">RACE-X</h1>
          <Search size={22} onClick={() => setLocation('/social/search')} />
        </div>
      </div>

      {/* FEED VIDEO */}
      <div className="h-full bg-zinc-900 flex items-center justify-center">
        <video src="https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-city-light-14144-large.mp4" className="w-full h-full object-cover opacity-60" autoPlay loop muted playsInline />
      </div>

      {/* SIDE ACTIONS */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-50">
        <Heart size={28} className="fill-white" />
        <MessageCircle size={28} onClick={() => setLocation('/social/comments/1')} />
        <Share2 size={28} />
      </div>

      {/* BOTTOM NAV: Sab click hoga ab */}
      <div className="absolute bottom-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-5 pb-8 flex justify-around items-center">
        <Compass onClick={() => setLocation('/social/explore')} className="text-zinc-500" />
        <Globe onClick={() => setLocation('/social/feed')} className="text-white" />
        <div onClick={() => setLocation('/social/create')} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center -mt-10 border-4 border-black"><Plus className="text-black" /></div>
        <Bell onClick={() => setLocation('/social/activity')} className="text-zinc-500" />
        <User onClick={() => setLocation('/profile')} className="text-zinc-500" />
      </div>
    </div>
  );
}
