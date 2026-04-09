import { ArrowLeft, Camera, Check, X, User, Globe, MessageSquare, Shield } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function EditProfile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // --- 📝 Form States ---
  const [name, setName] = useState("RACE-X CREATOR");
  const [username, setUsername] = useState("nexus_master_01");
  const [bio, setBio] = useState("The Nexus is here. Digital Architect & AI Innovator.");
  const [website, setWebsite] = useState("www.race-x.ai");

  const handleSave = () => {
    // Yahan save logic aayega (API call)
    toast({
      title: "Profile Updated",
      description: "Aapka Nexus profile update ho gaya hai.",
    });
    setLocation("/profile");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 pb-20">
      
      {/* --- 1. HEADER --- */}
      <header className="flex items-center justify-between px-6 py-8 sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <button onClick={() => setLocation("/profile")} className="active:scale-75 transition-all p-2 bg-zinc-900 rounded-xl">
          <X size={20} />
        </button>
        <h2 className="text-xs font-black italic uppercase tracking-[0.4em]">Edit Nexus</h2>
        <button onClick={handleSave} className="active:scale-75 transition-all p-2 bg-cyan-500 rounded-xl text-black">
          <Check size={20} strokeWidth={3} />
        </button>
      </header>

      {/* --- 2. AVATAR CHANGE --- */}
      <div className="flex flex-col items-center py-10">
        <div className="relative group cursor-pointer">
          <div className="w-32 h-32 rounded-[45px] bg-zinc-900 border-2 border-white/5 p-1 flex items-center justify-center overflow-hidden">
            <User size={50} className="text-zinc-800" />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={24} className="text-cyan-400" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-cyan-500 p-2 rounded-xl border-4 border-black">
            <Camera size={14} fill="black" strokeWidth={3} />
          </div>
        </div>
        <p className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.3em] mt-6">Change Avatar</p>
      </div>

      {/* --- 3. FORM INPUTS --- */}
      <div className="px-6 space-y-8">
        
        {/* Full Name */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">
            <User size={12} /> Full Name
          </label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/5 rounded-[25px] px-6 py-5 text-sm font-bold focus:border-cyan-500/50 outline-none transition-all"
          />
        </div>

        {/* Username */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">
            <Shield size={12} /> Username
          </label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold">@</span>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/5 rounded-[25px] px-10 py-5 text-sm font-bold focus:border-cyan-500/50 outline-none transition-all"
            />
          </div>
        </div>

        {/* Website */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">
            <Globe size={12} /> Website
          </label>
          <input 
            type="text" 
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/5 rounded-[25px] px-6 py-5 text-sm font-bold text-cyan-400 focus:border-cyan-500/50 outline-none transition-all italic"
          />
        </div>

        {/* Bio */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">
            <MessageSquare size={12} /> Bio
          </label>
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full bg-zinc-900/50 border border-white/5 rounded-[30px] px-6 py-6 text-sm font-medium leading-relaxed focus:border-cyan-500/50 outline-none transition-all resize-none"
          />
        </div>

      </div>

      {/* --- 4. ACTION FOOTER --- */}
      <div className="mt-12 px-6">
        <button 
          onClick={handleSave}
          className="w-full bg-white text-black font-black uppercase italic tracking-[0.3em] py-6 rounded-[30px] active:scale-[0.97] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
        >
          Update Protocol
        </button>
      </div>

    </div>
  );
}
