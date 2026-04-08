import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, MessageCircle, Share2, Send, 
  Globe, Plus, Music2, Search, User 
} from "lucide-react";
import { useLocation } from "wouter";

export default function SocialFeed() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("for-you");

  const posts = [
    {
      id: 1,
      user: "Neon_Creator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      content: "Race-X Studio is the future! 🚀 #Cyberpunk",
      video: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-city-light-14144-large.mp4",
      fallbackColor: "bg-purple-900",
      likes: "24.5K",
      comments: "1.2K"
    },
    {
      id: 2,
      user: "AI_Master",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      content: "Editing this was so smooth. 💎",
      video: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-121-large.mp4",
      fallbackColor: "bg-blue-900",
      likes: "12K",
      comments: "450"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden font-sans">
      
      {/* 🔝 HEADER (Contrast check: White on Black/Transparent) */}
      <div className="absolute top-0 w-full z-[100] flex justify-between items-center p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
        <div className="flex gap-6">
          <button onClick={() => setActiveTab('following')} className={`text-sm font-black tracking-widest uppercase transition-all ${activeTab === 'following' ? 'text-white' : 'text-white/40'}`}>Following</button>
          <button onClick={() => setActiveTab('for-you')} className={`text-sm font-black tracking-widest uppercase transition-all ${activeTab === 'for-you' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-white/40'}`}>For You</button>
        </div>
        <Search size={22} className="text-white drop-shadow-lg" />
      </div>

      {/* 📱 FEED ENGINE */}
      <div className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {posts.map((post) => (
          <div key={post.id} className={`h-full w-full snap-start relative flex flex-col justify-end ${post.fallbackColor}`}>
            
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
               <video 
                 src={post.video} 
                 className="w-full h-full object-cover opacity-80" 
                 autoPlay loop muted playsInline 
               />
               {/* Overlay for Visibility */}
               <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
            </div>

            {/* RIGHT SIDE ACTIONS (High Visibility Glass) */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-50">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-400 overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                  <img src={post.avatar} alt="user" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-cyan-500 rounded-full p-1 border-2 border-black">
                  <Plus size={10} className="text-black font-black" />
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <button className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 active:scale-75 transition-all">
                  <Heart size={26} className="text-white fill-white" />
                </button>
                <span className="text-[10px] font-black mt-1 drop-shadow-lg">{post.likes}</span>
              </div>

              <div className="flex flex-col items-center">
                <button className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 active:scale-75 transition-all">
                  <MessageCircle size={26} className="text-white" />
                </button>
                <span className="text-[10px] font-black mt-1 drop-shadow-lg">{post.comments}</span>
              </div>

              <button className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 active:scale-75 transition-all">
                <Share2 size={26} className="text-white" />
              </button>
            </div>

            {/* BOTTOM INFO */}
            <div className="p-6 pb-32 relative z-40 w-full bg-gradient-to-t from-black via-black/20 to-transparent">
              <h3 className="font-black italic text-xl tracking-tight text-white mb-2 drop-shadow-md">@{post.user}</h3>
              <p className="text-sm font-medium text-zinc-100 mb-5 leading-snug drop-shadow-md">{post.content}</p>
              
              <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <Music2 size={12} className="text-cyan-400 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest">Original Sound - Race-X</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 🎮 NAVBAR (Fixed Contrast) */}
      <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-3xl border-t border-white/10 p-5 flex justify-around items-center z-[100]">
        <button onClick={() => setLocation('/hub')} className="text-zinc-500 active:text-white transition-colors"><Send size={24} className="-rotate-45"/></button>
        <button className="text-white"><Globe size={28} /></button>
        <div 
          onClick={() => setLocation('/studio')}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center -mt-12 border-[4px] border-black shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-90"
        >
           <Plus size={26} className="text-black font-black" />
        </div>
        <button className="text-zinc-500 active:text-white transition-colors"><MessageCircle size={24} /></button>
        <button onClick={() => setLocation('/profile')} className="text-zinc-500 active:text-white transition-colors"><User size={24} /></button>
      </div>

    </div>
  );
}
