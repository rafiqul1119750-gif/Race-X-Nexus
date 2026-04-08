import { useLocation } from "wouter";
import { Heart, MessageCircle, Share2, Globe, Plus, Search, User, Compass, Bell, Camera, Send, Bookmark } from "lucide-react";

export default function SocialFeed() {
  const [, setLocation] = useLocation();

  const stories = [
    { id: 1, name: 'Your Story', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
    { id: 2, name: 'Zoya', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
    { id: 3, name: 'Alex', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' },
    { id: 4, name: 'Nexus', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4' },
  ];

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* 1. TOP BAR (TikTok Style) */}
      <div className="absolute top-0 w-full z-50 pt-4 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex justify-between items-center px-6 mb-4">
          <Camera size={24} onClick={() => setLocation('/social/create')} className="active:scale-90" />
          <div className="flex gap-4 text-[11px] font-black tracking-widest uppercase">
            <span onClick={() => setLocation('/social/following')} className="text-zinc-500">Following</span>
            <span onClick={() => setLocation('/social/feed')} className="text-white border-b-2 border-cyan-400 pb-1">For You</span>
          </div>
          <Send size={24} className="-rotate-45" onClick={() => setLocation('/chat')} />
        </div>

        {/* 2. STORY BAR (Instagram/FB Style) */}
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
          {stories.map(s => (
            <div key={s.id} onClick={() => setLocation(`/social/story/${s.id}`)} className="flex flex-col items-center gap-1 min-w-[65px]">
              <div className="w-14 h-14 rounded-full border-2 border-cyan-400 p-0.5 bg-zinc-900 overflow-hidden">
                <img src={s.img} alt="story" className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-tighter text-zinc-400">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MAIN VIDEO FEED (TikTok Style) */}
      <div className="h-full bg-zinc-950 flex items-center justify-center">
        <video 
          src="https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-city-light-14144-large.mp4" 
          className="w-full h-full object-cover opacity-80" 
          autoPlay loop muted playsInline 
        />
      </div>

      {/* 4. SIDE ACTIONS (Insta Style) */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-50 items-center">
        <div className="flex flex-col items-center gap-1">
          <Heart size={30} className="fill-cyan-400 text-cyan-400 active:scale-150 transition-transform" />
          <span className="text-[10px] font-black">24.5K</span>
        </div>
        <div className="flex flex-col items-center gap-1" onClick={() => setLocation('/social/comments/1')}>
          <MessageCircle size={30} className="active:scale-125" />
          <span className="text-[10px] font-black">1.2K</span>
        </div>
        <Bookmark size={30} onClick={() => setLocation('/social/save')} className="active:scale-125" />
        <Share2 size={30} className="active:scale-125" />
      </div>

      {/* 5. BOTTOM NAV (Master Controls) */}
      <div className="absolute bottom-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-5 pb-8 flex justify-around items-center">
        <Globe onClick={() => setLocation('/social/feed')} className="text-white" size={26} />
        <Compass onClick={() => setLocation('/social/explore')} className="text-zinc-500" size={26} />
        <div onClick={() => setLocation('/social/create')} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center -mt-10 border-4 border-black shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-90 transition-transform">
          <Plus className="text-black font-black" size={28} />
        </div>
        <Bell onClick={() => setLocation('/social/activity')} className="text-zinc-500" size={26} />
        <User onClick={() => setLocation('/profile')} className="text-zinc-500" size={26} />
      </div>
    </div>
  );
}
