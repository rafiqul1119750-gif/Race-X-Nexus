import React, { useState, useEffect, useRef } from "react";
import { 
  Lock, LogIn, Shield, UserPlus, CheckCircle, X, 
  Home as HomeIcon, LayoutGrid, Zap, Music, ShoppingBag, 
  Settings, Crown, Gem, Plus, Globe, Heart, MessageCircle, 
  Share2, MoreHorizontal, Sparkles, User, LogOut, Search,
  ImageIcon, Video, Layers, Wand2, Download, Mic, PlusCircle, 
  Maximize2, Trash2, Volume2, AudioLines, Radio, Play, Pause, Disc
} from "lucide-react";

/* ---------------- 1. PREMIUM SPLASH & AUTH (Keeping Same) ---------------- */
function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 2800);
    return () => clearTimeout(timer);
  }, [onDone]);
  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[9999] overflow-hidden text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative mb-12">
        <div className="w-32 h-32 border-[3px] border-blue-500/20 border-t-blue-500 rounded-[2.5rem] animate-spin shadow-[0_0_40px_rgba(37,99,235,0.2)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-400 to-blue-600">X</span>
        </div>
      </div>
      <h1 className="text-6xl font-black italic tracking-tighter animate-pulse">RACE-X</h1>
      <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] mt-2">Omniverse v4.0</p>
    </div>
  );
}

function AuthScreen({ onLogin }: any) {
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 text-white">
      <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-10 shadow-2xl rotate-12 border border-white/20"><Lock className="text-white" size={32} /></div>
      <div className="w-full max-w-sm space-y-6 text-center">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Nexus Entry</h2>
        <div className="space-y-4">
          <input placeholder="Nexus ID" className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none font-bold text-white focus:border-blue-500 transition-all" />
          <input type="password" placeholder="Access Key" className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none font-bold text-white focus:border-blue-500 transition-all" />
          <div className="flex items-start gap-3 p-2 text-left">
            <input type="checkbox" checked={agreed} onChange={(e)=>setAgreed(e.target.checked)} className="mt-1 accent-blue-600" />
            <label className="text-[10px] text-zinc-500 font-black uppercase">Agree to Race-X Terms</label>
          </div>
        </div>
        <button onClick={() => agreed ? onLogin() : alert("Agree to Terms")} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl">Synchronize</button>
      </div>
    </div>
  );
}

/* ---------------- 2. MAIN OMNIVERSE ---------------- */
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("hub");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;
  if (!user) return <AuthScreen onLogin={() => setUser({ name: 'Explorer', gems: 7500 })} />;

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-black/40 backdrop-blur-3xl border-b border-white/5 z-50 flex items-center px-6">
        <div className="w-1/4"><div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic text-xl border border-white/10 shadow-lg shadow-blue-600/30">X</div></div>
        <div className="w-2/4 text-center font-black italic uppercase text-[10px] tracking-[0.2em] text-white/90">Welcome to Race-X Creation</div>
        <div className="w-1/4 flex justify-end"><div className="bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2"><Gem size={14} className="text-blue-400"/><span className="text-xs font-black">{user.gems.toLocaleString()}</span></div></div>
      </header>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*,audio/*" />

      <main className="pt-24 pb-28 max-w-[600px] mx-auto min-h-screen px-5">

        {/* --- HUB TAB --- */}
        {activeTab === "hub" && (
          <div className="space-y-6 py-4 animate-in slide-in-from-bottom-10 duration-700">
            <GlassCard title="RX SOCIAL" sub="Human Network" icon={<LayoutGrid size={38}/>} color="from-blue-600/40" onClick={() => setActiveTab('social')} />
            <GlassCard title="RX STUDIO" sub="AI Creative Suite" icon={<Zap size={38}/>} color="from-cyan-600/40" onClick={() => setActiveTab('studio')} />
            <GlassCard title="MAGIC CHAT" sub="Gemini Intel" icon={<Sparkles size={38}/>} color="from-indigo-600/40" onClick={() => setActiveTab('chat')} />
            <GlassCard title="RX MUSIC" sub="Atmospheric Beats" icon={<Music size={38}/>} color="from-green-600/40" onClick={() => setActiveTab('music')} />
            <GlassCard title="RX SHOP" sub="Nexus Assets" icon={<ShoppingBag size={38}/>} color="from-orange-600/40" onClick={() => setActiveTab('shop')} />
          </div>
        )}

        {/* --- STUDIO TAB (ADVANCED AUDIO & VOICE) --- */}
        {activeTab === "studio" && (
          <div className="animate-in fade-in duration-500 space-y-8 pb-10">
            
            {/* Studio Header */}
            <div className="flex justify-between items-center bg-zinc-900/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10">
              <div>
                <h3 className="text-2xl font-black italic uppercase text-white tracking-tight">Audio & Visual Lab</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Everything is Real AI</p>
              </div>
              <button onClick={() => fileInputRef.current?.click()} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center active:scale-90 transition-all shadow-lg"><Plus className="text-black" /></button>
            </div>

            {/* --- AI VOICE CLONING & LIST --- */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <h4 className="text-[11px] font-black uppercase text-zinc-500 tracking-[0.4em]">AI Voice Synthesis</h4>
                <span className="text-[9px] font-black text-cyan-400 uppercase">11-Labs Node</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                 <div className="bg-gradient-to-r from-blue-600/20 to-transparent p-5 rounded-3xl border border-blue-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-blue-600/20"><Mic size={24}/></div>
                       <div><p className="text-xs font-black uppercase tracking-widest text-white">Neural Voice Clone</p><p className="text-[8px] font-bold text-zinc-500 uppercase">Upload 10s audio sample</p></div>
                    </div>
                    <button className="bg-white text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase active:scale-95 transition">Clone Now</button>
                 </div>
              </div>
              
              <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                <VoiceCard name="Alpha Male" type="Cinematic" />
                <VoiceCard name="Siri Pro" type="Assistant" />
                <VoiceCard name="Deep Bass" type="Narrator" />
                <VoiceCard name="Anime Girl" type="Vocaloid" />
              </div>
            </div>

            {/* --- SOUND EFFECTS & SONG LIST --- */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase text-zinc-500 tracking-[0.4em] ml-2">Audio Library</h4>
              <div className="bg-zinc-900/60 rounded-[2.5rem] border border-white/5 overflow-hidden">
                <div className="flex border-b border-white/5">
                   <button className="flex-1 py-4 text-[10px] font-black uppercase bg-white/5 text-white border-b-2 border-cyan-500">Song List</button>
                   <button className="flex-1 py-4 text-[10px] font-black uppercase text-zinc-600">Sound Effects (SFX)</button>
                </div>
                <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto no-scrollbar">
                  <AudioTrack title="Neon Nights" artist="RX Synthetic" duration="03:45" />
                  <AudioTrack title="Cyber Attack" artist="SFX Library" duration="00:12" isSFX />
                  <AudioTrack title="Deep Focus" artist="Lofi Node" duration="04:20" />
                  <AudioTrack title="Glitch Transition" artist="SFX Library" duration="00:05" isSFX />
                  <AudioTrack title="Race-X Theme" artist="Official" duration="02:50" />
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-black/60 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around z-50">
        <NavIcon icon={<HomeIcon size={24}/>} label="Hub" active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
        <NavIcon icon={<LayoutGrid size={24}/>} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center -mt-12 shadow-[0_15px_35px_rgba(37,99,235,0.4)] border-[6px] border-black active:scale-90 transition-all cursor-pointer"><Plus size={32}/></div>
        <NavIcon icon={<Zap size={24}/>} label="Studio" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <NavIcon icon={<Music size={24}/>} label="Music" active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
      </nav>
    </div>
  );
}

/* --- STUDIO SUB-COMPONENTS --- */
function VoiceCard({ name, type }: any) {
  return (
    <div className="min-w-[120px] bg-zinc-900/80 border border-white/5 p-4 rounded-3xl flex flex-col items-center gap-2 hover:border-cyan-500 transition group cursor-pointer">
      <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:scale-110 transition"><AudioLines size={24}/></div>
      <div className="text-center">
        <p className="text-[10px] font-black uppercase text-white tracking-tighter">{name}</p>
        <p className="text-[7px] font-bold uppercase text-zinc-600">{type}</p>
      </div>
    </div>
  );
}

function AudioTrack({ title, artist, duration, isSFX }: any) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition group cursor-pointer border border-transparent hover:border-white/5">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 group-hover:text-cyan-400 transition">
             {isSFX ? <Volume2 size={18}/> : <Disc size={18} className="group-hover:animate-spin"/>}
          </div>
          <div>
             <h5 className="text-[11px] font-black uppercase text-white tracking-tight">{title}</h5>
             <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{artist}</p>
          </div>
       </div>
       <div className="flex items-center gap-3">
          <span className="text-[9px] font-black text-zinc-700">{duration}</span>
          <button className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition active:scale-90"><Play size={14}/></button>
       </div>
    </div>
  );
}

/* --- GENERIC UI HELPERS --- */
function GlassCard({ title, sub, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className={`relative group cursor-pointer overflow-hidden rounded-[2.8rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl p-8 transition-all hover:translate-y-[-4px] active:scale-95 shadow-2xl`}>
      <div className={`absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br ${color} to-transparent blur-[70px] opacity-30 group-hover:opacity-60 transition-opacity`} />
      <div className="flex items-center gap-8 relative z-10">
        <div className="w-20 h-20 rounded-[2rem] bg-zinc-900/80 flex items-center justify-center shadow-2xl border border-white/10 group-hover:border-blue-500/50 transition-colors"><div className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{icon}</div></div>
        <div className="flex-1"><h3 className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-cyan-400 transition-colors">{title}</h3><p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-1">{sub}</p></div>
      </div>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-2 transition-all ${active ? 'text-cyan-500 scale-110 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'text-zinc-600'}`}>
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
