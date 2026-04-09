import { ArrowLeft, Plus, Video, Play, Image as ImageIcon, Send, UserPlus, Users, ShoppingBag, Heart, Search } from "lucide-react";
import { useLocation } from "wouter";

export default function SocialIndex() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-32 font-sans overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* --- HEADER WITH PROFILE SYNC --- */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLocation("/hub")} 
            className="p-3 bg-zinc-900 rounded-2xl active:scale-75 transition-all border border-white/5"
          >
            <ArrowLeft className="text-cyan-400" size={24}/>
          </button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black italic uppercase tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-none">Social Hub</h1>
            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.3em]">Node: Community_01</span>
          </div>
        </div>
        <button 
          onClick={() => setLocation("/profile")} 
          className="w-12 h-12 rounded-full border-2 border-cyan-500 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-90 transition-all"
        >
          <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center font-black text-cyan-400 text-sm italic">RX</div>
        </button>
      </div>

      {/* --- REAL-TIME STATS CARD --- */}
      <div className="bg-zinc-900/30 border border-white/5 rounded-[40px] p-8 mb-10 backdrop-blur-xl flex justify-between items-center relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full" />
        
        <div className="text-center px-4 relative z-10">
          <h4 className="text-2xl font-black italic">10</h4>
          <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Posts</p>
        </div>
        <div className="w-[1px] h-8 bg-white/10" />
        <div className="text-center px-4 relative z-10">
          <h4 className="text-2xl font-black italic text-cyan-400 tracking-tighter">8.4K</h4>
          <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Followers</p>
        </div>
        <div className="w-[1px] h-8 bg-white/10" />
        <button 
          onClick={() => setLocation("/social/search")} 
          className="bg-white text-black px-6 py-2.5 rounded-full text-[9px] font-black uppercase italic shadow-lg active:scale-95 transition-all relative z-10"
        >
          Find
        </button>
      </div>

      {/* --- QUICK ACTIONS (STORIES/REELS) --- */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600"><Video size={12} /> Live Channels</h3>
          <span onClick={() => setLocation("/social/explore")} className="text-[8px] font-black text-cyan-500 uppercase cursor-pointer">Explore All</span>
        </div>
        <div className="flex justify-between">
          <ActionCircle icon={<Plus />} label="Story" color="bg-blue-600" onClick={() => setLocation("/social/create")} />
          <ActionCircle icon={<Video />} label="Reels" color="bg-purple-600" onClick={() => setLocation("/social/explore")} />
          <ActionCircle icon={<Play />} label="Watch" color="bg-cyan-600" onClick={() => setLocation("/social/feed")} />
          <ActionCircle icon={<Search />} label="Search" color="bg-zinc-800" onClick={() => setLocation("/social/search")} />
        </div>
      </section>

      {/* --- COMMUNITY NODES --- */}
      <section className="grid grid-cols-2 gap-4 mb-10">
        <CommunityNode 
          title="Friends" 
          desc="Neural Connections"
          icon={<UserPlus className="text-cyan-400" />} 
          onClick={() => setLocation("/social/search")} 
        />
        <CommunityNode 
          title="Activity" 
          desc="System Alerts"
          icon={<Heart className="text-red-500" />} 
          onClick={() => setLocation("/social/activity")} 
        />
      </section>

      {/* --- THE GLOBAL PUBLISH BUTTON --- */}
      <div className="fixed bottom-10 left-6 right-6 z-50">
        <div className="absolute -inset-2 bg-white/5 blur-2xl rounded-full" />
        <button 
          onClick={() => setLocation("/social/create")}
          className="relative w-full bg-white text-black font-black uppercase italic tracking-[0.3em] rounded-full py-6 flex items-center justify-center gap-4 active:scale-[0.97] transition-all shadow-[0_20px_60px_rgba(255,255,255,0.2)]"
        >
          <Send size={18} fill="black" /> Create Post
        </button>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS WITH REAL FEEDBACK ---
function ActionCircle({ icon, label, color, onClick }: any) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button 
        onClick={onClick} 
        className={`${color} w-16 h-16 rounded-full flex items-center justify-center shadow-2xl active:scale-75 transition-all border border-white/10 group overflow-hidden relative`}
      >
        <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity" />
        {icon}
      </button>
      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function CommunityNode({ title, desc, icon, onClick }: any) {
  return (
    <button 
      onClick={onClick} 
      className="bg-zinc-900/40 border border-white/5 p-8 rounded-[45px] flex flex-col items-center gap-4 active:scale-95 transition-all group relative overflow-hidden"
    >
      <div className="p-4 bg-black rounded-2xl group-hover:scale-110 transition-transform relative z-10 border border-white/5">
        {icon}
      </div>
      <div className="text-center relative z-10">
        <span className="block text-xs font-black uppercase italic tracking-tighter">{title}</span>
        <span className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest mt-1">{desc}</span>
      </div>
    </button>
  );
}
