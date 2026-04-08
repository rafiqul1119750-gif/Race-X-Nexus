import { useState } from "react";
import { useLocation } from "wouter";
import { 
  ArrowLeft, Settings, Grid, Play, User, 
  MapPin, Link as LinkIcon, Camera, MoreHorizontal, 
  Check, X, Globe, Lock, Shield, Bell, Moon
} from "lucide-react";

export default function UserProfile() {
  const [, setLocation] = useLocation();
  
  // States for Real Work
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  // User Profile Data
  const [profile, setProfile] = useState({
    name: "Race-X Creator",
    username: "nexus_master_01",
    bio: "Building the future of AI Nexus. 🚀 | Entrepreneur",
    location: "India",
    website: "race-x.onrender.com",
    avatar: "" // Placeholder for real image
  });

  return (
    <div className="min-h-screen bg-black text-white pb-24 select-none">
      
      {/* --- DYNAMIC HEADER --- */}
      <div className="sticky top-0 z-[100] bg-black/90 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ArrowLeft onClick={() => setLocation("/social/feed")} className="cursor-pointer active:scale-75 transition-all" />
          <h1 className="font-black italic text-lg uppercase tracking-tighter">Nexus Profile</h1>
        </div>
        <Settings 
          onClick={() => setShowSettings(true)} 
          className="text-zinc-400 cursor-pointer hover:rotate-90 transition-all duration-300" 
        />
      </div>

      {/* --- PROFILE CARD (FB STYLE) --- */}
      <div className="relative">
        {/* Cover Photo Placeholder */}
        <div className="h-32 bg-gradient-to-r from-zinc-900 to-black border-b border-white/5"></div>
        
        <div className="px-6 -mt-12 flex flex-col items-center">
          {/* Profile Picture with Glow */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-[35px] bg-black border-4 border-black overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <User size={40} className="text-zinc-700" />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 bg-cyan-500 p-2 rounded-xl border-4 border-black cursor-pointer active:scale-90">
              <Camera size={14} className="text-black" />
            </div>
          </div>

          <h2 className="mt-4 text-2xl font-black italic uppercase tracking-tighter text-white">
            {profile.name}
          </h2>
          <p className="text-cyan-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">@{profile.username}</p>
        </div>
      </div>

      {/* --- STATS SECTION --- */}
      <div className="flex justify-center gap-10 py-6 border-y border-white/5 my-4 bg-zinc-900/10">
        <div className="text-center">
          <p className="text-xl font-black">12</p>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black text-cyan-400">8.4K</p>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black">152</p>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Following</p>
        </div>
      </div>

      {/* --- ACTIONS --- */}
      <div className="px-6 grid grid-cols-5 gap-2">
        <button 
          onClick={() => setIsEditing(true)}
          className="col-span-4 bg-cyan-500 text-black font-black py-3 rounded-2xl text-xs uppercase tracking-widest active:scale-95 transition-all"
        >
          Edit Profile
        </button>
        <button className="bg-zinc-900 flex items-center justify-center rounded-2xl active:scale-95 transition-all border border-white/5">
          <MoreHorizontal />
        </button>
      </div>

      {/* --- TABS --- */}
      <div className="flex mt-8 border-b border-white/5">
        <button 
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-4 flex justify-center transition-all ${activeTab === 'posts' ? 'border-b-2 border-cyan-500 text-cyan-500' : 'text-zinc-600'}`}
        >
          <Grid size={22} />
        </button>
        <button 
          onClick={() => setActiveTab('reels')}
          className={`flex-1 py-4 flex justify-center transition-all ${activeTab === 'reels' ? 'border-b-2 border-cyan-500 text-cyan-500' : 'text-zinc-600'}`}
        >
          <Play size={22} />
        </button>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="grid grid-cols-3 gap-1 mt-1">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="aspect-square bg-zinc-900/50 animate-pulse border border-white/5"></div>
        ))}
      </div>

      {/* --- MODAL: EDIT PROFILE (Facebook Style Form) --- */}
      {isEditing && (
        <div className="fixed inset-0 z-[200] bg-black p-6 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between mb-8">
            <X onClick={() => setIsEditing(false)} className="cursor-pointer" />
            <h2 className="font-black uppercase tracking-widest">Edit Profile</h2>
            <Check 
              onClick={() => setIsEditing(false)} 
              className="text-cyan-400 cursor-pointer" 
            />
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-zinc-500">Full Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full bg-zinc-900 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-zinc-500">Bio</label>
              <textarea 
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full bg-zinc-900 border border-white/10 p-4 rounded-2xl h-24 focus:border-cyan-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: SETTINGS (FB CLONE) --- */}
      {showSettings && (
        <div className="fixed inset-0 z-[200] bg-black animate-in fade-in duration-300">
          <div className="p-4 flex items-center gap-4 border-b border-white/5">
            <ArrowLeft onClick={() => setShowSettings(false)} className="cursor-pointer" />
            <h1 className="font-black uppercase italic">Settings & Privacy</h1>
          </div>
          
          <div className="p-4 space-y-2">
             <SettingsItem icon={<Lock size={18}/>} title="Privacy Center" desc="Manage who sees your content" />
             <SettingsItem icon={<Shield size={18}/>} title="Security" desc="Two-factor authentication" />
             <SettingsItem icon={<Bell size={18}/>} title="Notifications" desc="Manage push alerts" />
             <SettingsItem icon={<Globe size={18}/>} title="Language" desc="System language: English" />
             <SettingsItem icon={<Moon size={18}/>} title="Dark Mode" desc="System Default" />
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Component for Settings
function SettingsItem({ icon, title, desc }: any) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-zinc-900/50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-white/5">
      <div className="p-3 rounded-xl bg-zinc-900 text-cyan-400">{icon}</div>
      <div>
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">{desc}</p>
      </div>
    </div>
  );
}
