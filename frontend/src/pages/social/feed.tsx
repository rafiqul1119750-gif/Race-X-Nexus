import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Search, Heart, MessageCircle, Share2, Bookmark, 
  MoreVertical, Plus, Bell, Camera, Send, Compass, User, LayoutGrid
} from "lucide-react";

export default function SocialFeed() {
  const [, setLocation] = useLocation();
  const [liked, setLiked] = useState<string[]>([]);

  // Real Interaction Logic
  const toggleLike = (id: string) => {
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col select-none">
      
      {/* --- TOP HEADER (Facebook/Insta Style) --- */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="flex gap-4 items-center">
          <div className="p-2 bg-zinc-900 rounded-xl active:scale-90 transition-all">
             <LayoutGrid size={20} className="text-cyan-400" onClick={() => setLocation("/hub")} />
          </div>
          <Camera size={22} className="text-zinc-400 active:scale-75 transition-all" onClick={() => setLocation("/social/create")} />
          <Bell size={22} className="text-zinc-400 active:scale-75 transition-all" onClick={() => setLocation("/social/activity")} />
        </div>
        
        <h1 className="text-2xl font-black italic tracking-tighter text-white">RACE-X</h1>
        
        <div className="flex gap-4 items-center">
          <Search size={22} className="text-zinc-400" onClick={() => setLocation("/social/search")} />
          <Send size={22} className="text-zinc-400 rotate-[-20deg]" onClick={() => setLocation("/chat")} />
        </div>
      </div>

      {/* --- REELS/FEED SECTION (TikTok Style) --- */}
      <div className="flex-1 overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {[1, 2].map((post) => (
          <div key={post} className="h-full w-full snap-start relative bg-zinc-950">
            {/* Background Placeholder for Video/Image */}
            <div className="absolute inset-0 flex items-center justify-center text-zinc-800 font-black italic opacity-20">
               RACE-X MEDIA LOADED
            </div>

            {/* SIDEBAR ACTIONS (TikTok Style) */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center z-40">
              <div className="flex flex-col items-center gap-1">
                <Heart 
                  size={32} 
                  className={`transition-all active:scale-150 cursor-pointer ${liked.includes(post.toString()) ? 'fill-cyan-400 text-cyan-400' : 'text-white'}`} 
                  onClick={() => toggleLike(post.toString())}
                />
                <span className="text-[10px] font-bold">24K</span>
              </div>
              
              <div className="flex flex-col items-center gap-1" onClick={() => setLocation(`/social/comments/${post}`)}>
                <MessageCircle size={32} className="text-white active:scale-125 transition-all" />
                <span className="text-[10px] font-bold">1.2K</span>
              </div>

              <Bookmark size={30} className="text-white active:scale-125 transition-all" />
              <Share2 size={30} className="text-white active:scale-125 transition-all" />
            </div>

            {/* BOTTOM INFO */}
            <div className="absolute bottom-6 left-4 right-16 z-40">
              <div className="flex items-center gap-3 mb-3" onClick={() => setLocation("/profile")}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 border-2 border-black" />
                <span className="font-black italic text-sm">@RACE_X_CREATOR</span>
                <button className="bg-cyan-500 text-black text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">Follow</button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                The future of AI social networking is here. Get ready for the nexus shift. #RaceX #AI #Future
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- BOTTOM NAVIGATION BAR (Functional) --- */}
      <div className="bg-black/90 backdrop-blur-xl border-t border-white/5 px-6 py-3 flex justify-between items-center z-50">
        <div className="p-2 active:scale-75 transition-all text-white" onClick={() => setLocation("/social/feed")}>
          <div className="w-6 h-6 border-2 border-white rounded-md flex items-center justify-center font-black text-[8px]">RX</div>
        </div>
        
        <Compass size={26} className="text-zinc-500 active:scale-75 transition-all" onClick={() => setLocation("/social/explore")} />
        
        {/* THE MAIN CREATE BUTTON */}
        <div 
          onClick={() => setLocation("/social/create")}
          className="bg-white rounded-2xl p-2 px-5 active:scale-90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <Plus size={24} className="text-black font-bold" />
        </div>
        
        <Bell size={26} className="text-zinc-500 active:scale-75 transition-all" onClick={() => setLocation("/social/activity")} />
        
        <User 
          size={26} 
          className="text-zinc-500 active:scale-75 transition-all" 
          onClick={() => setLocation("/profile")} 
        />
      </div>
    </div>
  );
}
