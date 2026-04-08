import { useState } from "react";
import { useLocation } from "wouter";
import { 
  ArrowLeft, Settings, Grid, Play, User, 
  Camera, MoreHorizontal, Check, X, 
  BarChart3, Users, MessageSquare, TrendingUp, 
  Eye, Zap, DollarSign, Award, ChevronRight
} from "lucide-react";

export default function UserProfile() {
  const [, setLocation] = useLocation();
  
  // States
  const [isEditing, setIsEditing] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const profile = {
    name: "Race-X Creator",
    username: "nexus_master_01",
    stats: { posts: "128", followers: "12.5K", following: "450" }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      
      {/* --- HEADER --- */}
      <div className="sticky top-0 z-[100] bg-black/90 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ArrowLeft onClick={() => setLocation("/social/feed")} className="cursor-pointer" />
          <h1 className="font-black italic text-lg uppercase tracking-tighter">Nexus Profile</h1>
        </div>
        <Settings className="text-zinc-400 cursor-pointer" />
      </div>

      {/* --- PROFILE DATA (Short version for scroll) --- */}
      <div className="px-6 pt-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-[30px] bg-zinc-900 border-2 border-cyan-500/50 overflow-hidden mb-4">
          <div className="w-full h-full flex items-center justify-center bg-zinc-800">
            <User size={40} className="text-zinc-600" />
          </div>
        </div>
        <h2 className="text-xl font-black italic uppercase">{profile.name}</h2>
        <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-6">Professional Creator</p>
      </div>

      {/* --- ACTION BUTTONS (Added Dashboard) --- */}
      <div className="px-6 grid grid-cols-12 gap-2">
        <button 
          onClick={() => setIsEditing(true)}
          className="col-span-5 bg-zinc-900 border border-white/10 text-white font-black py-3 rounded-2xl text-[10px] uppercase tracking-widest active:scale-95 transition-all"
        >
          Edit Profile
        </button>
        <button 
          onClick={() => setShowDashboard(true)}
          className="col-span-5 bg-cyan-500 text-black font-black py-3 rounded-2xl text-[10px] uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <BarChart3 size={14} /> Dashboard
        </button>
        <button className="col-span-2 bg-zinc-900 flex items-center justify-center rounded-2xl border border-white/5">
          <MoreHorizontal />
        </button>
      </div>

      {/* --- POST TABS & GRID (Same as before) --- */}
      <div className="flex mt-8 border-y border-white/5">
        <button onClick={() => setActiveTab('posts')} className={`flex-1 py-4 flex justify-center ${activeTab === 'posts' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-zinc-600'}`}><Grid size={20}/></button>
        <button onClick={() => setActiveTab('reels')} className={`flex-1 py-4 flex justify-center ${activeTab === 'reels' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-zinc-600'}`}><Play size={20}/></button>
      </div>
      <div className="grid grid-cols-3 gap-1 mt-1">
        {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-zinc-900/50"></div>)}
      </div>

      {/* --- MODAL: PROFESSIONAL DASHBOARD (FB CLONE) --- */}
      {showDashboard && (
        <div className="fixed inset-0 z-[300] bg-black overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="sticky top-0 bg-black/90 backdrop-blur-md p-4 flex items-center gap-4 border-b border-white/5">
            <ArrowLeft onClick={() => setShowDashboard(false)} className="cursor-pointer" />
            <h1 className="font-black uppercase italic tracking-widest">Professional Dashboard</h1>
          </div>

          <div className="p-6 space-y-6">
            {/* Overview Section */}
            <div>
              <h3 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Performance (Last 28 Days)</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatCard title="Reach" value="45.2K" change="+12%" color="text-green-400" />
                <StatCard title="Engagement" value="12.8K" change="+5%" color="text-cyan-400" />
                <StatCard title="Followers" value="12,504" change="+240" color="text-purple-400" />
                <StatCard title="Net Income" value="₹0.00" change="0%" color="text-zinc-500" />
              </div>
            </div>

            {/* Tools Section */}
            <div className="space-y-4">
              <h3 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">Next Steps for You</h3>
              <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-[25px] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400"><Zap size={20}/></div>
                  <div>
                    <h4 className="text-sm font-bold">Earn with Stars</h4>
                    <p className="text-[10px] text-zinc-500">Setup your payout account</p>
                  </div>
                </div>
                <ChevronRight className="text-zinc-600" />
              </div>
            </div>

            {/* Platform Tools */}
            <div className="grid grid-cols-1 gap-3">
              <h3 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">Platform Tools</h3>
              <ToolItem icon={<DollarSign size={18}/>} title="Monetization" status="Not Eligible" />
              <ToolItem icon={<Award size={18}/>} title="Fan Engagement" status="Active" />
              <ToolItem icon={<TrendingUp size={18}/>} title="Ads on Reels" status="Reviewing" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Small Components for Dashboard
function StatCard({ title, value, change, color }: any) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-[30px]">
      <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">{title}</p>
      <p className="text-xl font-black italic">{value}</p>
      <p className={`text-[10px] font-bold mt-1 ${color}`}>{change}</p>
    </div>
  );
}

function ToolItem({ icon, title, status }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900/30 border border-white/5 rounded-2xl">
      <div className="flex items-center gap-4">
        <div className="text-zinc-400">{icon}</div>
        <span className="text-sm font-bold">{title}</span>
      </div>
      <span className="text-[9px] font-black uppercase text-zinc-500 px-3 py-1 bg-black rounded-lg border border-white/5">
        {status}
      </span>
    </div>
  );
}
