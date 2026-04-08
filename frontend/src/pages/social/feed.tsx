import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, MessageCircle, Share2, Send, 
  Globe, Plus, Music2, Search, Settings, UserCircle 
} from "lucide-react";
import { useLocation } from "wouter";
import { useAppContext } from "../../context/AppContext";

export default function SocialFeed() {
  const [, setLocation] = useLocation();
  const { diamonds } = useAppContext();
  const [activeTab, setActiveTab] = useState("for-you");

  const stories = [
    { id: 1, user: "Your Story", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=me", plus: true },
    { id: 2, user: "Alex", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
    { id: 3, user: "Zoya", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
    { id: 4, user: "Nexus", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
    { id: 5, user: "RaceX", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=4" },
  ];

  const posts = [
    {
      id: 1,
      user: "Neon_Creator",
      content: "Futuristic vibes only. #RaceX #AI",
      video: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-city-light-14144-large.mp4",
      likes: "24K",
      comments: "800"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      
      {/* 🔝 TOP BAR (Story & Header) */}
      <div className="absolute top-0 w-full z-50 bg-gradient-to-b from-black via-black/80 to-transparent pt-4">
        {/* Profile & Search Row */}
        <div className="flex justify-between items-center px-6 mb-4">
          <div className="flex items-center gap-3" onClick={() => setLocation('/profile')}>
            <div className="w-10 h-10 rounded-full border-2 border-cyan-400 p-0.5">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=me" className="rounded-full bg-zinc-800" alt="profile" />
            </div>
            <div className="text-[10px] font-black italic tracking-tighter">
              <p className="text-white">MY PROFILE</p>
              <p className="text-cyan-400">{diamonds} 💎</p>
            </div>
          </div>
          <h1 className="text-xl font-black italic tracking-widest text-white">RACE-X</h1>
          <Search size={22} className="text-white" />
        </div>

        {/* 📸 STORY FEED (Instagram Style) */}
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className={`w-16 h-16 rounded-full p-[2px] ${story.plus ? 'border-2 border-dashed border-zinc-600' : 'bg-gradient-to-tr from-cyan-400 to-purple-600'}`}>
                <div className="w-full h-full rounded-full border-2 border-black overflow-hidden relative">
                  <img src={story.img} alt={story.user} />
                  {story.plus && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Plus size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">{story.user}</span>
            </div>
          ))}
        </div>

        {/* Following/For-You Selector */}
        <div className="flex justify-center gap-8 mt-2 pb-2">
          <button onClick={() => setActiveTab('following')} className={`text-[10px] font-black uppercase tracking-widest ${activeTab === 'following' ? 'text-white' : 'text-zinc-500'}`}>Following</button>
          <button onClick={() => setActiveTab('for-you')} className={`text-[10px] font-black uppercase tracking-widest ${activeTab === 'for-you' ? 'text-cyan-400 underline decoration-2 underline-offset-4' : 'text-zinc-500'}`}>For You</button>
        </div>
      </div>

      {/* 📱 REELS SCROLL ENGINE (Already built, keeping it integrated) */}
      <div className="h-full pt-44 overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-zinc-900">
        {posts.map((post) => (
          <div key={post.id} className="h-full w-full snap-start relative flex flex-col justify-end">
            <video src={post.video} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
            
            {/* Interaction Buttons (Same as before but polished) */}
            <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-30">
               <div className="flex flex-col items-center gap-1">
                 <button className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/10"><Heart size={26} className="fill-white" /></button>
                 <span className="text-[10px] font-black">{post.likes}</span>
               </div>
               <button className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/10"><MessageCircle size={26} /></button>
               <button className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/10"><Share2 size={26} /></button>
            </div>

            <div className="p-6 pb-28 relative z-20">
              <h3 className="font-black italic text-lg tracking-tighter">@{post.user}</h3>
              <p className="text-xs font-medium text-zinc-200">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
