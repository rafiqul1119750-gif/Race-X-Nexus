import { 
  ArrowLeft, Settings, Share2, Camera, ExternalLink, 
  Plus, LayoutGrid, BarChart3, Edit3, MoreHorizontal, User, Activity 
} from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function UserProfile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // --- 📸 CAMERA LOGIC (Bina kuch kate) ---
  const handleProfileImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        toast({ title: "Uploading...", description: `${file.name} is being synced to Nexus.` });
      }
    };
    input.click();
  };

  const handleShare = async () => {
    const publicUrl = `${window.location.origin}/profile/nexus_master_01`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Race-X Creator Profile',
          text: 'Check out this profile on Race-X',
          url: publicUrl,
        });
      } else {
        navigator.clipboard.writeText(publicUrl);
        toast({ title: "Link Copied!", description: "Public profile link saved to clipboard." });
      }
    } catch (err) { console.error("Share failed", err); }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- 1. HEADER --- */}
      <header className="flex items-center justify-between px-6 py-6 sticky top-0 z-50 bg-black/80 backdrop-blur-xl">
        <button onClick={() => setLocation("/hub")} className="active:scale-75 transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-black italic uppercase tracking-widest leading-none">NEXUS_MASTER_01</h2>
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
        </div>
        <div className="flex gap-5">
          <Share2 
            size={20} 
            className="active:scale-75 transition-all text-zinc-400 cursor-pointer hover:text-white" 
            onClick={handleShare}
          />
          <Settings 
            size={20} 
            className="active:scale-75 transition-all text-zinc-400 cursor-pointer hover:text-white" 
            onClick={() => setLocation("/admin/api")} 
          />
        </div>
      </header>

      {/* --- 2. STORIES/HIGHLIGHTS --- */}
      <div className="flex gap-4 px-6 overflow-x-auto no-scrollbar mb-10 pt-2">
        <div className="flex flex-col items-center gap-3 shrink-0" onClick={() => setLocation("/social/create")}>
          <div className="w-20 h-20 rounded-[32px] border-2 border-dashed border-zinc-800 flex items-center justify-center active:scale-90 transition-all group cursor-pointer">
            <Plus size={24} className="text-zinc-600 group-hover:text-cyan-500 transition-colors" />
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500">Live</span>
        </div>

        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-3 shrink-0">
            <div className="w-20 h-20 rounded-[32px] p-[2px] bg-gradient-to-tr from-cyan-500/20 to-zinc-800 active:scale-90 transition-all">
              <div className="w-full h-full rounded-[30px] bg-zinc-900 border-2 border-black overflow-hidden shadow-2xl flex items-center justify-center">
                 <LayoutGrid size={20} className="opacity-10 text-cyan-400" />
              </div>
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500">Node {i}</span>
          </div>
        ))}
      </div>

      {/* --- 3. PROFILE AVATAR & INFO (Fixed Camera Click) --- */}
      <div className="flex flex-col items-center mb-8 px-6 text-center">
        <div className="relative mb-6">
          <div className="w-40 h-40 rounded-[55px] border-2 border-white/5 p-1.5 flex items-center justify-center bg-zinc-900/20">
            <div 
              onClick={handleProfileImage} 
              className="w-full h-full rounded-[50px] bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer"
            >
               <User size={60} className="text-zinc-800" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera size={24} className="text-white" />
               </div>
            </div>
          </div>
          <button 
            onClick={handleProfileImage} 
            className="absolute bottom-1 right-1 bg-cyan-500 p-3 rounded-2xl border-[6px] border-black text-black active:scale-75 transition-all shadow-xl"
          >
            <Camera size={18} fill="black" />
          </button>
        </div>

        <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2 leading-none">RACE-X CREATOR</h1>
        
        <button 
          onClick={() => window.open('https://race-x.ai', '_blank')}
          className="flex items-center gap-2 bg-zinc-900/80 px-6 py-2.5 rounded-full border border-white/5 mb-6 active:scale-95 transition-all"
        >
          <ExternalLink size={12} className="text-cyan-500" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 italic">WWW.RACE-X.AI</span>
        </button>

        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] max-w-[280px] leading-relaxed">
          The Nexus is here. Digital Architect & AI Innovator. <br/> 
          <span className="text-cyan-500/50 mt-1 block tracking-[0.4em]">#DOMINATE</span>
        </p>
      </div>

      {/* --- 4. STATS --- */}
      <div className="flex justify-between px-10 py-10 border-t border-zinc-900/50">
        <div className="text-center active:scale-90 transition-all cursor-pointer group" onClick={() => setLocation("/social/feed")}>
          <h4 className="text-2xl font-black italic tracking-tighter group-hover:text-cyan-400">128</h4>
          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-2">Posts</p>
        </div>
        <div className="text-center active:scale-90 transition-all cursor-pointer group" onClick={() => setLocation("/social/search")}>
          <h4 className="text-2xl font-black italic text-cyan-500 tracking-tighter">12.5K</h4>
          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-2">Followers</p>
        </div>
        <div className="text-center active:scale-90 transition-all cursor-pointer group">
          <h4 className="text-2xl font-black italic tracking-tighter group-hover:text-cyan-400">452</h4>
          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-2">Following</p>
        </div>
      </div>

      {/* --- 5. ACTION BUTTONS (Fully Linked) --- */}
      <div className="flex gap-4 px-6 mt-2 mb-20 relative">
        <button 
          onClick={() => setLocation("/social/edit-profile")}
          className="flex-1 bg-zinc-900/80 border border-white/5 py-6 rounded-[30px] flex items-center justify-center gap-3 active:scale-[0.97] transition-all group"
        >
          <Edit3 size={16} className="text-zinc-500 group-hover:text-white" />
          <span className="text-[10px] font-black uppercase italic tracking-[0.2em]">Edit Profile</span>
        </button>
        
        <button 
          onClick={() => setLocation("/admin/analytics")} // ✅ Fixed: Points to your new Analytics node
          className="flex-1 bg-cyan-500 text-black py-6 rounded-[30px] flex items-center justify-center gap-3 active:scale-[0.97] transition-all shadow-[0_20px_40px_rgba(6,182,212,0.2)]"
        >
          <BarChart3 size={16} />
          <span className="text-[10px] font-black uppercase italic tracking-[0.2em]">Insights</span>
        </button>

        <button className="p-6 bg-zinc-900/80 border border-white/5 rounded-[30px] active:scale-90 transition-all">
          <MoreHorizontal size={20} className="text-zinc-400" />
        </button>
      </div>

    </div>
  );
}
