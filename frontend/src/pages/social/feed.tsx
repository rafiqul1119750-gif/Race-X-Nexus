import { useLocation } from "wouter";
import { 
  Search, Send, Heart, MessageCircle, 
  Share2, Bookmark, MoreVertical, Plus 
} from "lucide-react";

export default function SocialFeed() {
  const [, setLocation] = useLocation();

  // --- SAMPLE DATA ---
  const stats = { followers: "12.5K", following: "450", posts: "128" };
  const stories = [
    { id: 1, name: "Your Story", img: "https://randomuser.me/api/portraits/men/1.jpg", me: true },
    { id: 2, name: "Aman", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Sara", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  ];

  const feedPosts = [
    {
      id: "p1",
      user: "RX_PREMIUM_STUDIO",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
      likes: "1.2K",
      caption: "Race-X Nexus is live! 🚀"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between px-4 py-4 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <h1 
          onClick={() => setLocation("/hub")} 
          className="text-2xl font-black italic tracking-tighter text-cyan-400 cursor-pointer active:scale-95 transition-all"
        >
          RACE-X
        </h1>
        <div className="flex gap-5">
          {/* SEARCH BUTTON */}
          <Search 
            size={22} 
            className="text-zinc-400 cursor-pointer active:scale-90 transition-all" 
            onClick={() => setLocation("/social/search")} 
          />
          {/* MESSAGES/SEND BUTTON */}
          <Send 
            size={22} 
            className="text-zinc-400 cursor-pointer active:scale-90 transition-all" 
            onClick={() => setLocation("/chat")} 
          />
        </div>
      </div>

      {/* --- STATS BAR --- */}
      <div className="flex justify-around items-center py-3 border-y border-white/5 bg-zinc-900/20">
        <div className="flex flex-col items-center">
          <span className="text-[14px] font-black">{stats.posts}</span>
          <span className="text-[9px] uppercase tracking-widest text-zinc-500">Posts</span>
        </div>
        {/* CLICKABLE FOLLOWERS -> ACTIVITY PAGE */}
        <div 
          onClick={() => setLocation("/social/activity")}
          className="flex flex-col items-center cursor-pointer active:opacity-50"
        >
          <span className="text-[14px] font-black text-cyan-400">{stats.followers}</span>
          <span className="text-[9px] uppercase tracking-widest text-zinc-500">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[14px] font-black">{stats.following}</span>
          <span className="text-[9px] uppercase tracking-widest text-zinc-500">Following</span>
        </div>
      </div>

      {/* --- STORIES --- */}
      <div className="flex overflow-x-auto gap-4 px-4 py-5 no-scrollbar bg-black">
        {stories.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div 
              onClick={() => s.me ? setLocation("/social/create") : null}
              className={`p-[2px] rounded-full cursor-pointer active:scale-95 transition-all ${s.me ? 'bg-zinc-800' : 'bg-gradient-to-tr from-cyan-500 to-purple-500'}`}
            >
              <div className="relative w-16 h-16 rounded-full border-2 border-black overflow-hidden bg-zinc-900">
                <img src={s.img} className="w-full h-full object-cover" />
                {s.me && (
                  <div className="absolute bottom-0 right-0 bg-cyan-500 rounded-full p-0.5 border-2 border-black">
                    <Plus size={10} className="text-black font-bold" />
                  </div>
                )}
              </div>
            </div>
            <span className="text-[10px] text-zinc-500">{s.name}</span>
          </div>
        ))}
      </div>

      {/* --- FEED --- */}
      {feedPosts.map((post) => (
        <div key={post.id} className="p-4 border-b border-white/5">
          {/* USER INFO -> PROFILE PAGE */}
          <div className="flex items-center justify-between mb-3 px-2">
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => setLocation("/profile")}
            >
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-300">{post.user}</span>
            </div>
            <MoreVertical size={18} className="text-zinc-500 cursor-pointer" />
          </div>
          
          {/* POST IMAGE */}
          <div className="aspect-square bg-zinc-900 rounded-[35px] overflow-hidden mb-4 border border-white/10">
             <img src={post.image} className="w-full h-full object-cover" />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-between px-2 mb-3">
            <div className="flex gap-6">
              <Heart size={24} className="text-zinc-400 hover:text-red-500 transition-all cursor-pointer active:scale-125" />
              {/* COMMENT BUTTON -> COMMENTS PAGE */}
              <MessageCircle 
                size={24} 
                className="text-zinc-400 hover:text-cyan-400 transition-all cursor-pointer active:scale-110" 
                onClick={() => setLocation(`/social/comments/${post.id}`)}
              />
              <Send 
                size={24} 
                className="text-zinc-400 hover:text-purple-400 transition-all rotate-[-20deg] cursor-pointer" 
                onClick={() => setLocation("/chat")}
              />
            </div>
            <Bookmark size={24} className="text-zinc-400 cursor-pointer active:text-yellow-500" />
          </div>
        </div>
      ))}
    </div>
  );
}
