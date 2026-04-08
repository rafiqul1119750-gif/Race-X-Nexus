import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, MessageCircle, Share2, Send, 
  MoreVertical, Plus, Music2, Search 
} from "lucide-react";
import { useLocation } from "wouter";

export default function SocialFeed() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("for-you"); // For You vs Following

  const posts = [
    {
      id: 1,
      user: "Neon_Creator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      content: "First edit from RX Studio! #Cyberpunk #RaceX",
      video: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-city-light-14144-large.mp4",
      likes: "24.5K",
      comments: "1.2K",
      music: "Original Sound - Neon_Creator"
    },
    {
      id: 2,
      user: "AI_Artist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      content: "Race-X Magic is insane. Check this out!",
      video: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-121-large.mp4",
      likes: "102K",
      comments: "5K",
      music: "Race-X Beats - Vol 1"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      
      {/* 🔝 TOP NAVIGATION (Instagram/TikTok Mix) */}
      <div className="absolute top-0 w-full z-50 flex justify-between items-center p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('following')}
            className={`text-sm font-black tracking-widest uppercase ${activeTab === 'following' ? 'text-white' : 'text-white/40'}`}
          >
            Following
          </button>
          <button 
            onClick={() => setActiveTab('for-you')}
            className={`text-sm font-black tracking-widest uppercase ${activeTab === 'for-you' ? 'text-white underline decoration-cyan-400 decoration-2 underline-offset-8' : 'text-white/40'}`}
          >
            For You
          </button>
        </div>
        <Search className="text-white" size={22} />
      </div>

      {/* 📱 VERTICAL SCROLL FEED (TikTok Style) */}
      <div className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {posts.map((post) => (
          <div key={post.id} className="h-full w-full snap-start relative flex flex-col justify-end">
            
            {/* Background Video/Image */}
            <div className="absolute inset-0 z-0 bg-zinc-900">
               <video 
                 src={post.video} 
                 className="w-full h-full object-cover" 
                 autoPlay loop muted playsInline 
               />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
            </div>

            {/* Right Side Actions (Interaction Bar) */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden mb-2">
                  <img src={post.avatar} alt="user" />
                </div>
                <div className="bg-cyan-500 rounded-full p-1 -mt-5">
                  <Plus size={10} className="text-black font-bold" />
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <motion.button whileTap={{ scale: 0.8 }} className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                  <Heart size={24} className="fill-white" />
                </motion.button>
                <span className="text-[10px] font-black">{post.likes}</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <button className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                  <MessageCircle size={24} />
                </button>
                <span className="text-[10px] font-black">{post.comments}</span>
              </div>

              <button className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                <Share2 size={24} />
              </button>
            </div>

            {/* Bottom Content Area */}
            <div className="p-6 pb-32 relative z-10 w-full max-w-[80%]">
              <h3 className="font-black italic text-lg tracking-tighter mb-2">@{post.user}</h3>
              <p className="text-sm font-medium leading-relaxed mb-4 text-zinc-200">{post.content}</p>
              
              <div className="flex items-center gap-2">
                <Music2 size={14} className="animate-spin-slow" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{post.music}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 🎮 BOTTOM BAR (Global Navigation) */}
      <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-3xl border-t border-white/10 p-5 flex justify-around items-center">
        <button onClick={() => setLocation('/hub')} className="text-zinc-500"><Send size={24} className="rotate-[-45deg]"/></button>
        <button className="text-white"><Globe size={28} /></button>
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center -mt-10 border-[4px] border-black shadow-2xl">
           <Plus size={24} className="text-black" />
        </div>
        <button className="text-zinc-500"><MessageCircle size={24} /></button>
        <button className="text-zinc-500"><User size={24} /></button>
      </div>

    </div>
  );
}
