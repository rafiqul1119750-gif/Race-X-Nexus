import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  ArrowLeft, Settings, Grid, Play, User, Camera, 
  Check, X, BarChart3, Award, ChevronRight, Lock, 
  Bell, Moon, Tag, Share2, Shield, Zap, BadgeCheck, 
  ExternalLink, Flame, Plus, DollarSign, TrendingUp
} from "lucide-react";

export default function UserProfile() {
  const [, setLocation] = useLocation();
  const [view, setView] = useState<'profile' | 'dashboard' | 'settings' | 'edit'>('profile');
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'trends'>('posts');
  const [isLoading, setIsLoading] = useState(true);

  // --- FORCE DARK MODE & LOADING LOGIC ---
  useEffect(() => {
    document.documentElement.classList.add('dark');
    const timer = setTimeout(() => setIsLoading(false), 1500); // Real Feel Loading
    return () => clearTimeout(timer);
  }, []);

  const [profile, setProfile] = useState({
    name: "Race-X Creator",
    username: "nexus_master_01",
    bio: "The Nexus is here. Building the future with AI. 🚀",
    link: "race-x.ai",
    stats: { posts: 128, followers: "12.5K", following: 452, reach: "45.2K" },
    rewards: { diamonds: 12500, gems: 450, exp: "Level 12" },
    isVerified: true
  });

  // --- 1. SKELETON LOADER (Shimmer Effect) ---
  const SkeletonGrid = () => (
    <div className="grid grid-cols-3 gap-1 animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div key={i} className="aspect-square bg-zinc-900 border border-white/5" />
      ))}
    </div>
  );

  // --- 2. DYNAMIC CONTENT RENDERER ---
  const renderTabContent = () => {
    if (isLoading) return <SkeletonGrid />;
    
    const gridStyle = "grid grid-cols-3 gap-1 animate-in fade-in zoom-in duration-500";
    if (activeTab === 'posts') {
      return (
        <div className={gridStyle}>
          {[1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} className="aspect-square bg-zinc-900 border border-white/5 relative group cursor-pointer active:scale-95 transition-transform overflow-hidden">
              <img src={`https://picsum.photos/400/400?random=${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" alt="Post" />
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === 'reels') {
      return (
        <div className="grid grid-cols-3 gap-1 px-1 animate-in slide-in-from-bottom duration-500">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-[9/16] bg-zinc-900 rounded-2xl overflow-hidden relative group active:scale-95 transition-all">
              <img src={`https://picsum.photos/400/700?random=${i+20}`} className="w-full h-full object-cover" alt="Reel" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-black uppercase drop-shadow-lg"><Play size={10} fill="white"/> {i*3.2}K</div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="p-4 space-y-4 animate-in fade-in duration-500">
        <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2"><Flame size={12}/> Trending in Nexus</h3>
        <div className="grid grid-cols-2 gap-3">
          <TrendCard tag="#RaceX_AI" count="2.4M Pins" />
          <TrendCard tag="#FutureUI" count="1.1M Pins" />
        </div>
      </div>
    );
  };

  // --- 3. VIEWS (Dashboard, Edit, Settings) ---
  if (view === 'dashboard') return (
    <div className="min-h-screen bg-black text-white pb-10">
      <div className="p-4 flex items-center gap-4 border-b border-white/5 sticky top-0 bg-black/90 backdrop-blur-xl z-50">
        <ArrowLeft onClick={() => setView('profile')} className="cursor-pointer active:scale-75 transition-all" />
        <h1 className="font-black uppercase italic tracking-tighter">Creator Dashboard</h1>
      </div>
      <div className="p-5 space-y-6">
        <div className="bg-gradient-to-br from-cyan-900/40 via-black to-black border border-cyan-500/20 p-6 rounded-[40px] shadow-[0_20px_50px_rgba(34,211,238,0.1)] active:scale-[0.98] transition-all">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.3em]">Nexus Rewards</p>
              <h2 className="text-3xl font-black italic mt-1">{profile.rewards.diamonds.toLocaleString()} <span className="text-xs not-italic text-zinc-500 tracking-tighter uppercase font-bold">Diamonds</span></h2>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20"><Award className="text-cyan-400" size={24} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white text-black text-[10px] font-black py-4 rounded-[20px] uppercase tracking-widest active:scale-90 transition-all">Redeem Assets</button>
            <button className="bg-zinc-900 text-white text-[10px] font-black py-4 rounded-[20px] border border-white/5 uppercase tracking-widest active:scale-90 transition-all">History</button>
          </div>
        </div>
        <section className="grid grid-cols-2 gap-3">
          <StatBox label="Reach" value={profile.stats.reach} growth="+12%" />
          <StatBox label="Interactions" value="8,432" growth="+5%" />
        </section>
      </div>
    </div>
  );

  // --- 4. MAIN PROFILE UI (WITH SAFE-AREA) ---
  return (
    <div className="min-h-screen bg-black text-white pb-32 selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* Navbar with blur effect */}
      <div className="p-4 flex justify-between items-center sticky top-0 bg-black/70 backdrop-blur-2xl z-40 border-b border-white/5">
        <div className="flex items-center gap-4">
          <ArrowLeft onClick={() => setLocation("/social/feed")} className="active:scale-75 transition-all cursor-pointer" />
          <div className="flex items-center gap-1">
            <span className="font-black italic uppercase tracking-tighter text-lg">{profile.username}</span>
            {profile.isVerified && <BadgeCheck size={18} className="text-cyan-400 fill-cyan-400/20" />}
          </div>
        </div>
        <div className="flex gap-5">
          <Share2 size={20} className="text-zinc-400 active:scale-75 transition-all cursor-pointer" onClick={() => alert("Nexus Link Copied!")} />
          <Settings onClick={() => setView('settings')} className="text-zinc-400 active:rotate-90 transition-all cursor-pointer" />
        </div>
      </div>

      {/* Stories with Haptic Hover */}
      <div className="flex gap-4 overflow-x-auto p-5 no-scrollbar border-b border-white/5">
        <div className="flex flex-col items-center gap-2 flex-shrink-0 active:scale-90 transition-all cursor-pointer">
          <div className="w-16 h-16 rounded-[24px] border-2 border-dashed border-zinc-700 flex items-center justify-center text-zinc-500 bg-zinc-900/30"><Plus size={20} /></div>
          <span className="text-[9px] font-black uppercase">Add Story</span>
        </div>
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0 active:scale-95 transition-all">
            <div className="w-16 h-16 rounded-[24px] p-[2.5px] bg-gradient-to-tr from-cyan-500 via-purple-500 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <div className="w-full h-full rounded-[22px] bg-black overflow-hidden border-2 border-black">
                <img src={`https://picsum.photos/100/100?random=${i+50}`} className="w-full h-full object-cover" alt="Story" />
              </div>
            </div>
            <span className="text-[9px] font-black uppercase text-zinc-500">Live {i}</span>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="p-10 flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-[42px] bg-gradient-to-tr from-cyan-500 to-purple-600 p-[3px] shadow-[0_0_40px_rgba(34,211,238,0.25)] animate-pulse-slow">
            <div className="w-full h-full rounded-[39px] bg-black flex items-center justify-center overflow-hidden border-2 border-black">
              <User size={48} className="text-zinc-800" />
            </div>
          </div>
          <div onClick={() => setView('edit')} className="absolute bottom-0 right-0 bg-cyan-500 p-2.5 rounded-2xl border-4 border-black cursor-pointer shadow-xl active:scale-50 transition-all">
            <Camera size={14} className="text-black" />
          </div>
        </div>
        <h2 className="text-2xl font-black uppercase italic tracking-tighter">{profile.name}</h2>
        <div className="flex items-center gap-2 mt-2 text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
           <ExternalLink size={10}/>
           <span className="text-[9px] font-black uppercase tracking-[0.2em]">{profile.link}</span>
        </div>
        <p className="text-[10px] text-zinc-500 font-bold uppercase mt-5 tracking-[0.1em] px-12 text-center leading-relaxed opacity-70">
          {profile.bio}
        </p>
      </div>

      {/* Stats Table (Haptic Design) */}
      <div className="flex justify-around py-8 border-y border-white/5 bg-zinc-900/10">
        <StatItem label="Posts" value={profile.stats.posts} />
        <StatItem label="Followers" value={profile.stats.followers} highlight />
        <StatItem label="Following" value={profile.stats.following} />
      </div>

      {/* Main Buttons (Safe Area Padding Handling) */}
      <div className="px-6 grid grid-cols-2 gap-3 mt-8">
        <button onClick={() => setView('edit')} className="bg-zinc-900 border border-white/10 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all hover:bg-zinc-800">Edit Nexus</button>
        <button onClick={() => setView('dashboard')} className="bg-cyan-500 text-black py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_15px_35px_rgba(34,211,238,0.25)]">
          <BarChart3 size={14}/> Dashboard
        </button>
      </div>

      {/* Tabs */}
      <div className="flex mt-12 border-b border-white/5">
        <TabButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} icon={<Grid size={22}/>} />
        <TabButton active={activeTab === 'reels'} onClick={() => setActiveTab('reels')} icon={<Play size={22}/>} />
        <TabButton active={activeTab === 'trends'} onClick={() => setActiveTab('trends')} icon={<TrendingUp size={22}/>} />
      </div>

      <div className="mt-[2px] min-h-[500px]">{renderTabContent()}</div>
    </div>
  );
}

// --- FULL LOADED HELPER COMPONENTS ---

function TrendCard({ tag, count }: any) {
  return (
    <div className="h-32 bg-zinc-900/50 rounded-[30px] border border-white/5 p-5 flex flex-col justify-between active:scale-95 transition-all cursor-pointer hover:border-cyan-500/30">
      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{tag}</span>
      <span className="font-black italic text-xl text-white tracking-tighter">{count}</span>
    </div>
  );
}

function StatItem({ label, value, highlight }: any) {
  return (
    <div className="text-center group cursor-pointer active:scale-90 transition-all">
      <p className={`font-black text-xl transition-all ${highlight ? 'text-cyan-400' : 'text-white'}`}>{value}</p>
      <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mt-1 opacity-60">{label}</p>
    </div>
  );
}

function TabButton({ active, onClick, icon }: any) {
  return (
    <button onClick={onClick} className={`flex-1 py-5 flex justify-center transition-all ${active ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/5' : 'text-zinc-600'}`}>
      {icon}
    </button>
  );
}

function StatBox({ label, value, growth }: any) {
  return (
    <div className="bg-zinc-900/40 p-5 rounded-[30px] border border-white/5 backdrop-blur-md">
      <p className="text-[9px] text-zinc-500 uppercase font-black mb-1 tracking-widest">{label}</p>
      <div className="flex items-baseline justify-between">
        <p className="text-xl font-black italic">{value}</p>
        <span className="text-[9px] font-bold text-green-400">{growth}</span>
      </div>
    </div>
  );
}
