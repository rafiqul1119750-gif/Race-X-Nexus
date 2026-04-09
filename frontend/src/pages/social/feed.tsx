import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { 
  Search, Heart, MessageCircle, Share2, Bookmark, 
  Plus, Bell, Camera, Send, Compass, User, LayoutGrid, 
  Music2, MoreHorizontal
} from "lucide-react";

export default function SocialFeed() {
  const [, setLocation] = useLocation();
  const [liked, setLiked] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulation Data (Bhai yahan real backend se data map hoga)
  const posts = [
    { id: "1", user: "RX_Nexus", desc: "Building the future of AI Social. #RaceX #Web3", likes: "45.2K", comments: "820", music: "Nexus - Original Audio" },
    { id: "2", user: "Cyber_Mizo", desc: "Aizawl looks different in 2077. #Cyberpunk #Mizoram", likes: "12.8K", comments: "340", music: "Lofi Beats - RX Studio" },
  ];

  const toggleLike = (id: string) => {
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col select-none">
      
      {/* --- TOP HUD (Transparent Overlay) --- */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-8 z-[60] bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={() => setLocation("/hub")} className="p-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 active:scale-90 transition-all">
          <LayoutGrid size={20} className="text-cyan-400" />
        </button>
        
        <div className="flex gap-6 items-center">
          <span className="text-[11px] font-black tracking-[0.3em] text-zinc-400 uppercase">Following</span>
          <span className="text-[11px] font-black tracking-[0.3em] text-white uppercase border-b-2 border-cyan-500 pb-1">For You</span>
        </div>

        <div className="flex gap-4">
          <Search size={22} className="text-white" onClick={() => setLocation("/social/search")} />
        </div>
      </div>

      {/* --- VERTICAL REELS ENGINE --- */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      >
        {posts.map((post) => (
          <div key={post.id} className="h-full w-full snap-start relative bg-[#0a0a0a]">
            {/* 🎥 Video/Media Content Placeholder */}
            <div 
              onDoubleClick={() => toggleLike(post.id)}
              className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center"
            >
              <div className="opacity-10 scale-150 rotate-[-12deg] select-none pointer-events-none">
                <h1 className="text-[120px] font-black italic tracking-tighter">RX_MEDIA</h1>
              </div>
            </div>

            {/* ⚡ RIGHT SIDEBAR (The Interaction Hub) */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-7 items-center z-[50]">
              <div className="relative mb-2" onClick={() => setLocation("/profile")}>
                <div className="w-14 h-14 rounded-full border-2 border-white p-0.5 bg-zinc-800 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500 to-blue-600" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-cyan-500 text-black rounded-full p-0.5">
                  <Plus size={14} strokeWidth={4} />
                </div>
              </div>

              <div className="flex flex-col items-center gap-1 group">
                <Heart 
                  size={34} 
                  fill={liked.includes(post.id) ? "currentColor" : "none"}
                  className={`transition-all duration-300 active:scale-[2] ${liked.includes(post.id) ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'text-white'}`} 
                  onClick={() => toggleLike(post.id)}
                />
                <span className="text-[10px] font-black uppercase">{post.likes}</span>
              </div>
              
              <div className="flex flex-col items-center gap-1" onClick={() => setLocation(`/social/comments/${post.id}`)}>
                <MessageCircle size={32} className="text-white active:scale-125 transition-all" />
                <span className="text-[10px] font-black uppercase">{post.comments}</span>
              </div>

              <Bookmark size={30} className="text-white active:scale-125 transition-all" />
              
              <div className="p-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 animate-[spin_6s_linear_infinite]">
                <Music2 size={20} className="text-cyan-400" />
              </div>
            </div>

            {/* 📝 BOTTOM METADATA */}
            <div className="absolute bottom-10 left-4 right-20 z-[50] space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="font-black italic text-lg tracking-tight">@{post.user}</h3>
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
              </div>
              
              <p className="text-[13px] text-zinc-200 leading-relaxed font-medium line-clamp-2">
                {post.desc}
              </p>

              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/5">
                <Music2 size={12} className="text-zinc-400" />
                <marquee className="text-[10px] font-bold text-zinc-400 w-24 uppercase tracking-widest">{post.music}</marquee>
              </div>
            </div>

            {/* ⏳ VIDEO PROGRESS BAR */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-[60]">
               <div className="h-full bg-cyan-500 w-1/3 shadow-[0_0_10px_rgba(6,182,212,1)] animate-[load_15s_linear_infinite]" />
            </div>
          </div>
        ))}
      </div>

      {/* --- BOTTOM NAV (Solid & Blur) --- */}
      <div className="bg-black/95 backdrop-blur-3xl border-t border-white/5 px-8 py-5 flex justify-between items-center z-[70]">
        <div className="p-1 active:scale-75 transition-all" onClick={() => setLocation("/social/feed")}>
          <div className="w-7 h-7 bg-white text-black rounded-lg flex items-center justify-center font-black text-[10px] italic">RX</div>
        </div>
        
        <Compass size={28} className="text-zinc-600 hover:text-white transition-all" onClick={() => setLocation("/social/explore")} />
        
        <div 
          onClick={() => setLocation("/social/create")}
          className="relative group"
        >
          <div className="absolute -inset-2 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all" />
          <div className="bg-white rounded-2xl p-2.5 px-6 relative active:scale-90 transition-all">
            <Plus size={24} className="text-black font-black" />
          </div>
        </div>
        
        <Bell size={28} className="text-zinc-600 hover:text-white transition-all" onClick={() => setLocation("/social/activity")} />
        
        <User 
          size={28} 
          className="text-zinc-600 hover:text-white transition-all" 
          onClick={() => setLocation("/profile")} 
        />
      </div>
    </div>
  );
}
