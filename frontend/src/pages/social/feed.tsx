import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, MessageCircle, Share2, 
  Plus, Music, Bookmark, Zap 
} from 'lucide-react';

// 🎥 Dummy Data for Reels (Replace with API later)
const REELS_DATA = [
  { id: 1, user: "@ace_pilot", desc: "Testing the new Race-X Engine! 🚀 #future #ai", likes: "12.5K", music: "Original Sound - RaceX" },
  { id: 2, user: "@cyber_queen", desc: "Neon vibes only. 💎 #cyberpunk #magic", likes: "45K", music: "After Dark - Remix" },
];

const SocialFeed = () => {
  return (
    <div className="h-screen bg-black overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
      {REELS_DATA.map((reel) => (
        <div key={reel.id} className="h-screen w-full snap-start relative flex flex-col justify-end pb-20">
          
          {/* 🎥 Video Background Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-black to-black z-0">
             <div className="absolute inset-0 flex items-center justify-center opacity-20">
               <Zap className="w-20 h-20 text-cyan-500 animate-pulse" />
             </div>
          </div>

          {/* 👤 Right Sidebar Actions Node */}
          <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-20">
            <div className="flex flex-col items-center gap-1 group">
              <div className="p-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 group-active:scale-90 transition-all">
                <Heart className="w-7 h-7 text-white group-hover:text-red-500 transition-colors" />
              </div>
              <span className="text-[10px] font-black text-white">{reel.likes}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="p-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <span className="text-[10px] font-black text-white italic">REPLY</span>
            </div>

            {/* 💎 Diamond Gifting Node (Monetization) */}
            <div className="flex flex-col items-center gap-1">
              <motion.div 
                whileTap={{ scale: 1.5, rotate: 20 }}
                className="p-3 bg-cyan-500/20 backdrop-blur-xl rounded-full border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <Zap className="w-7 h-7 text-cyan-400 fill-cyan-400" />
              </motion.div>
              <span className="text-[10px] font-black text-cyan-400 tracking-tighter">GIFT</span>
            </div>

            <div className="p-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
              <Share2 className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* 📝 Video Info Node (Bottom Left) */}
          <div className="px-6 space-y-3 z-20 relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500 rounded-full border-2 border-white overflow-hidden shadow-lg shadow-cyan-500/20" />
              <h3 className="font-black italic text-lg tracking-tight uppercase">{reel.user}</h3>
              <button className="px-4 py-1 bg-white text-black text-[9px] font-black rounded-full uppercase tracking-widest hover:bg-cyan-400 transition-colors">Follow</button>
            </div>
            
            <p className="text-sm text-zinc-300 font-medium line-clamp-2 pr-12 leading-snug">
              {reel.desc}
            </p>

            {/* 🎵 Music Disc Node */}
            <div className="flex items-center gap-2">
              <Music className="w-3 h-3 text-cyan-400" />
              <marquee className="text-[10px] font-black text-zinc-400 w-40 uppercase tracking-widest italic">
                {reel.music}
              </marquee>
            </div>
          </div>

          {/* 🔘 Rotating Disc Animation */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 right-6 w-10 h-10 rounded-full border-4 border-zinc-800 bg-gradient-to-tr from-zinc-900 to-black flex items-center justify-center overflow-hidden z-20"
          >
            <div className="w-4 h-4 bg-zinc-700 rounded-full border-2 border-zinc-900" />
          </motion.div>

        </div>
      ))}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default SocialFeed;
