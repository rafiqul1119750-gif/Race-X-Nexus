import { ArrowLeft, Plus, Video, Play, Image as ImageIcon, Send, UserPlus, Users, ShoppingBag, Calendar } from "lucide-react";
import { useLocation } from "wouter";

export default function SocialIndex() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-2 active:scale-75 transition-all">
            <ArrowLeft size={24} className="text-cyan-400" />
          </button>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Race-X Social</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]">R</div>
      </div>

      {/* Stats Card */}
      <div className="bg-zinc-900/40 border border-cyan-500/20 rounded-[35px] p-6 mb-10 backdrop-blur-xl">
        <div className="flex justify-around text-center">
          <Stat item="10" label="Posts" color="text-cyan-400" />
          <Stat item="0" label="Followers" color="text-purple-400" />
          <Stat item="0" label="Following" color="text-zinc-600" />
        </div>
      </div>

      {/* Quick Actions */}
      <section className="mb-10">
        <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-6"><Video size={14} /> Quick Actions</h3>
        <div className="flex justify-between px-2">
          <CircleBtn icon={<Plus />} label="Stories" color="bg-blue-600" onClick={() => setLocation("/social/stories")} />
          <CircleBtn icon={<Video />} label="Reels" color="bg-purple-600" onClick={() => setLocation("/social/reels")} />
          <CircleBtn icon={<Play />} label="Watch" color="bg-cyan-600" onClick={() => setLocation("/social/watch")} />
          <CircleBtn icon={<ImageIcon />} label="Create" color="bg-teal-600" onClick={() => setLocation("/social/create")} />
        </div>
      </section>

      {/* Explore Grid */}
      <section>
        <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6"><Users size={14} /> Explore</h3>
        <div className="grid grid-cols-2 gap-4">
          <ExploreCard icon={<UserPlus className="text-cyan-400" />} title="Friends" onClick={() => setLocation("/social/friends")} />
          <ExploreCard icon={<Users className="text-purple-500" />} title="Groups" onClick={() => setLocation("/social/groups")} />
          <ExploreCard icon={<Calendar className="text-zinc-700" />} title="Events" onClick={() => {}} />
          <ExploreCard icon={<ShoppingBag className="text-cyan-600" />} title="Marketplace" onClick={() => setLocation("/shop")} />
        </div>
      </section>

      {/* Publish Button */}
      <div className="fixed bottom-10 left-6 right-6">
        <button onClick={() => setLocation("/social/create")} className="w-full bg-white text-black font-black uppercase italic tracking-widest py-5 rounded-full flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <Send size={18} /> Publish
        </button>
      </div>
    </div>
  );
}

function Stat({ item, label, color }: any) {
  return (
    <div>
      <h4 className={`text-2xl font-black italic tracking-tighter ${color}`}>{item}</h4>
      <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
    </div>
  );
}

function CircleBtn({ icon, label, color, onClick }: any) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button onClick={onClick} className={`${color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all border border-white/10`}>{icon}</button>
      <span className="text-[10px] font-bold text-zinc-400 uppercase">{label}</span>
    </div>
  );
}

function ExploreCard({ icon, title, onClick }: any) {
  return (
    <button onClick={onClick} className="bg-zinc-900/20 border border-cyan-500/10 p-6 rounded-[30px] flex flex-col items-center gap-3 active:scale-95 transition-all">
      <div className="p-3 bg-black rounded-2xl">{icon}</div>
      <h4 className="text-sm font-black italic uppercase tracking-tighter">{title}</h4>
    </button>
  );
}
