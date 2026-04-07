import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowLeft, Heart, MessageCircle, Share2, Music2 } from "lucide-react";
import VideoPlayer from "../../components/VideoPlayer"; // Path check kar lena

export default function Feed() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* --- TOP NAVIGATION --- */}
      <div className="absolute top-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={() => setLocation("/hub")} className="p-2 bg-white/10 rounded-full backdrop-blur-md">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex gap-4 font-black italic text-[10px] tracking-widest">
          <span className="text-cyan-400 border-b-2 border-cyan-400 pb-1">FOLLOWING</span>
          <span className="text-zinc-500">FOR YOU</span>
        </div>
        <div className="w-9 h-9 rounded-full border border-cyan-500/50 p-0.5">
          <img src="/images/avatar.png" className="w-full h-full rounded-full object-cover" alt="Profile" />
        </div>
      </div>

      {/* --- REELS ENGINE (FULL SCREEN) --- */}
      <div className="flex-1 relative bg-zinc-900">
        <VideoPlayer src="/videos/sample-reel.mp4" />

        {/* SIDE BAR ACTIONS */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold">12.5K</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold">842</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold">Share</span>
          </div>
        </div>

        {/* BOTTOM INFO SECTION */}
        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
          <h3 className="font-bold text-sm">@race_x_creator</h3>
          <p className="text-xs text-zinc-300 mt-2 line-clamp-2">
            Amazing AI generation using Race-X Studio! #AI #Creative #Nexus
          </p>

          {/* ⚡ NEW SCROLLING TEXT (Marquee Fix) */}
          <div className="mt-4 flex items-center gap-2 overflow-hidden bg-white/5 py-2 px-3 rounded-xl border border-white/5">
            <Music2 className="w-3 h-3 text-cyan-400 flex-shrink-0" />
            <motion.div 
              animate={{ x: [0, -200] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400"
            >
              Original Sound - Race-X Media Studio • Original Sound - Race-X Media Studio • 
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
