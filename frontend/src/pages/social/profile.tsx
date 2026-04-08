import { useState } from "react";
import { useLocation } from "wouter";
import { 
  ArrowLeft, Settings, Grid, Play, User, Camera, MoreHorizontal, 
  Check, X, BarChart3, Users, TrendingUp, DollarSign, Award, 
  ChevronRight, Lock, Bell, Moon, Tag, Share2, Shield, Heart, Eye, Zap
} from "lucide-react";

export default function UserProfile() {
  const [, setLocation] = useLocation();
  
  // --- REAL ENGINE STATES ---
  const [view, setView] = useState<'profile' | 'dashboard' | 'settings' | 'edit'>('profile');
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'tags'>('posts');
  
  // User Data & Reward Stats (Policy Safe)
  const [profile, setProfile] = useState({
    name: "Race-X Creator",
    username: "nexus_master_01",
    bio: "The Nexus is here. Building the future with AI. 🚀",
    location: "Mumbai, India",
    link: "race-x.ai",
    stats: { posts: 128, followers: "12.5K", following: 452, reach: "45.2K" },
    rewards: { diamonds: 12500, gems: 450, exp: "Level 12" }
  });

  // --- 1. DYNAMIC CONTENT RENDERER ---
  const renderTabContent = () => {
    const gridStyle = "grid grid-cols-3 gap-1 animate-in fade-in duration-500";
    if (activeTab === 'posts') {
      return (
        <div className={gridStyle}>
          {[1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} className="aspect-square bg-zinc-900 border border-white/5 relative group cursor-pointer">
              <img src={`https://picsum.photos/400/400?random=${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === 'reels') {
      return (
        <div className="grid grid-cols-3 gap-1 px-1">
          {[1,2,3].map(i => (
            <div key={i} className="aspect-[9/16] bg-zinc-900 rounded-lg overflow-hidden relative group">
              <img src={`https://picsum.photos/400/700?random=${i+10}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-black"><Play size={10}/> {i*2}K</div>
            </div>
          ))}
        </div>
      );
    }
    return <div className="py-20 text-center text-zinc-600 uppercase text-[10px] font-black tracking-widest">No Tagged Content</div>;
  };

  // --- 2. PROFESSIONAL DASHBOARD VIEW (With Safe Rewards) ---
  if (view === 'dashboard') return (
    <div className="min-h-screen bg-black animate-in slide-in-from-right duration-300 pb-10">
      <div className="p-4 flex items-center gap-4 border-b border-white/5 sticky top-0 bg-black/90 backdrop-blur-md z-50">
        <ArrowLeft onClick={() => setView('profile')} className="cursor-pointer active:scale-75 transition-all" />
        <h1 className="font-black uppercase italic tracking-tighter">Creator Dashboard</h1>
      </div>
      
      <div className="p-5 space-y-6">
        {/* Safe Reward Card */}
        <div className="bg-gradient-to-br from-cyan-900/40 via-black to-black border border-cyan-500/20 p-6 rounded-[35px] shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.3em]">Nexus Rewards</p>
              <h2 className="text-3xl font-black italic mt-1">{profile.rewards.diamonds.toLocaleString()} <span className="text-xs not-italic text-zinc-500 tracking-tighter">Diamonds</span></h2>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <Award className="text-cyan-400" size={24} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white text-black text-[10px] font-black py-3 rounded-2xl uppercase tracking-widest active:scale-95 transition-all">Redeem Assets</button>
            <button className="bg-zinc-900 text-white text-[10px] font-black py-3 rounded-2xl border border-white/5 uppercase tracking-widest active:scale-95 transition-all">Gift History</button>
          </div>
        </div>

        <section>
          <h3 className="text-[10px] text-zinc-500 font-black uppercase mb-4 tracking-widest">Performance Insights</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatBox label="Content Reach" value={profile.stats.reach} growth="+12.5%" />
            <StatBox label="Interactions" value="8,432" growth="+5.2%" />
          </div>
        </section>

        <section className="bg-zinc-900/40 border border-white/5 rounded-[30px] p-5">
          <h3 className="font-black text-xs uppercase mb-4 flex items-center gap-2 text-cyan-400"><Zap size={14}/> Professional Tools</h3>
          <div className="space-y-4">
            <ToolRow icon={<DollarSign size={16}/>} title="Monetization" status="Eligible" />
            <ToolRow icon={<TrendingUp size={16}/>} title="Ads on Reels" status="In Review" />
            <ToolRow icon={<Award size={16}/>} title="Fan Badges" status="Active" />
          </div>
        </section>
      </div>
    </div>
  );

  // --- 3. EDIT PROFILE VIEW ---
  if (view === 'edit') return (
    <div className="min-h-screen bg-black p-6 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between mb-10">
        <X onClick={() => setView('profile')} className="cursor-pointer" />
        <h2 className="font-black uppercase tracking-[0.2em]">Edit Profile</h2>
        <Check onClick={() => setView('profile')} className="text-cyan-400 cursor-pointer" />
      </div>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-zinc-500 font-black uppercase">Display Name</label>
          <input className="bg-zinc-900 border border-white/10 p-4 rounded-2xl outline-none focus:border-cyan-500 text-white" value={profile.name} onChange={(e)=>setProfile({...profile, name: e.target.value})} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-zinc-500 font-black uppercase">Bio</label>
          <textarea className="bg-zinc-900 border border-white/10 p-4 rounded-2xl h-32 outline-none focus:border-cyan-500 text-white resize-none" value={profile.bio} onChange={(e)=>setProfile({...profile, bio: e.target.value})} />
        </div>
      </div>
    </div>
  );

  // --- 4. SETTINGS VIEW ---
  if (view === 'settings') return (
    <div className="min-h-screen bg-black animate-in fade-in duration-300">
      <div className="p-4 flex items-center gap-4 border-b border-white/5 sticky top-0 bg-black/90">
        <ArrowLeft onClick={() => setView('profile')} className="cursor-pointer" />
        <h1 className="font-black uppercase italic tracking-tighter">Settings & Privacy</h1>
      </div>
      <div className="p-4 space-y-2">
        <SettingsLink icon={<Lock/>} title="Privacy Center" />
        <SettingsLink icon={<Shield/>} title="Security & Login" />
        <SettingsLink icon={<Bell/>} title="Notifications" />
        <SettingsLink icon={<Moon/>} title="Display Mode" />
        <button onClick={() => setLocation("/auth/signin")} className="w-full mt-10 p-4 rounded-2xl bg-red-500/10 text-red-500 font-black uppercase text-xs">Logout</button>
      </div>
    </div>
  );

  // --- 5. MAIN PROFILE INTERFACE ---
  return (
    <div className="min-h-screen bg-black text-white pb-24 selection:bg-cyan-500 selection:text-black">
      <div className="p-4 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-40 border-b border-white/5">
        <div className="flex items-center gap-4">
          <ArrowLeft onClick={() => setLocation("/social/feed")} className="active:scale-75 transition-all" />
          <span className="font-black italic uppercase tracking-tighter text-lg">{profile.username}</span>
        </div>
        <div className="flex gap-5">
          <Share2 size={20} className="text-zinc-400 active:scale-90" />
          <Settings onClick={() => setView('settings')} className="text-zinc-400 active:rotate-90 transition-all cursor-pointer" />
        </div>
      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="relative group mb-4">
          <div className="w-24 h-24 rounded-[35px] bg-gradient-to-tr from-cyan-500 to-purple-600 p-[3px] animate-pulse-slow">
            <div className="w-full h-full rounded-[32px] bg-black flex items-center justify-center overflow-hidden border-2 border-black">
              <User size={40} className="text-zinc-800" />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-cyan-500 p-2 rounded-xl border-4 border-black cursor-pointer shadow-xl">
            <Camera size={12} className="text-black" />
          </div>
        </div>
        <h2 className="text-xl font-black uppercase italic tracking-tighter">{profile.name}</h2>
        <p className="text-[10px] text-zinc-500 font-black uppercase mt-1 tracking-[0.2em] px-10 text-center">{profile.bio}</p>
      </div>

      <div className="flex justify-around py-6 border-y border-white/5 bg-zinc-900/10">
        <div className="text-center"><p className="font-black text-lg">{profile.stats.posts}</p><p className="text-[9px] text-zinc-500 uppercase font-black">Posts</p></div>
        <div className="text-center"><p className="font-black text-lg text-cyan-400">{profile.stats.followers}</p><p className="text-[9px] text-zinc-500 uppercase font-black">Followers</p></div>
        <div className="text-center"><p className="font-black text-lg">{profile.stats.following}</p><p className="text-[9px] text-zinc-500 uppercase font-black">Following</p></div>
      </div>

      <div className="px-6 grid grid-cols-2 gap-3 mt-6">
        <button onClick={() => setView('edit')} className="bg-zinc-900 border border-white/10 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Edit Profile</button>
        <button onClick={() => setView('dashboard')} className="bg-cyan-500 text-black py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]"><BarChart3 size={14}/> Dashboard</button>
      </div>

      <div className="flex mt-8 border-b border-white/5">
        <TabButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts'} icon={<Grid size={22}/>} />
        <TabButton active={activeTab === 'reels'} onClick={() => setActiveTab('reels'} icon={<Play size={22}/>} />
        <TabButton active={activeTab === 'tags'} onClick={() => setActiveTab('tags'} icon={<Tag size={22}/>} />
      </div>

      <div className="mt-[2px]">{renderTabContent()}</div>
    </div>
  );
}

// --- HELPER COMPONENTS ---
function TabButton({ active, onClick, icon }: any) {
  return (
    <button onClick={onClick} className={`flex-1 py-4 flex justify-center transition-all ${active ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/5' : 'text-zinc-600'}`}>
      {icon}
    </button>
  );
}

function StatBox({ label, value, growth }: any) {
  return (
    <div className="bg-zinc-900/60 p-4 rounded-[25px] border border-white/5">
      <p className="text-[9px] text-zinc-500 uppercase font-black mb-1">{label}</p>
      <div className="flex items-baseline justify-between">
        <p className="text-xl font-black italic">{value}</p>
        <span className="text-[9px] font-bold text-green-400">{growth}</span>
      </div>
    </div>
  );
}

function ToolRow({ icon, title, status }: any) {
  return (
    <div className="flex items-center justify-between p-2 rounded-xl transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400">{icon}</div>
        <span className="text-sm font-bold">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-black uppercase text-zinc-500 bg-black px-2 py-1 rounded border border-white/5">{status}</span>
        <ChevronRight size={14} className="text-zinc-700" />
      </div>
    </div>
  );
}

function SettingsLink({ icon, title }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-2xl border border-white/5 mb-1">
      <div className="flex items-center gap-4">
        <div className="text-cyan-400">{icon}</div>
        <span className="text-sm font-bold">{title}</span>
      </div>
      <ChevronRight size={16} className="text-zinc-700" />
    </div>
  );
}
