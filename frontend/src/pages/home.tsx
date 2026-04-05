import React, { useState, useEffect } from "react";
import { 
  Lock, LogIn, Shield, UserPlus, CheckCircle, X, 
  Home as HomeIcon, LayoutGrid, Zap, Music, ShoppingBag, 
  Settings, Crown, Gem, Plus, Globe, Heart, MessageCircle, 
  Share2, MoreHorizontal, Sparkles, User, LogOut
} from "lucide-react";

/* ---------------- 1. PREMIUM SPLASH ---------------- */
function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 2800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[9999] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative mb-12 group">
        <div className="w-32 h-32 border-[3px] border-blue-500/20 border-t-blue-500 rounded-[2.5rem] animate-spin shadow-[0_0_40px_rgba(37,99,235,0.2)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-400 to-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">X</span>
        </div>
      </div>
      <div className="text-center space-y-2 z-10">
        <h1 className="text-6xl font-black italic tracking-tighter text-white animate-pulse">RACE-X</h1>
        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em]">Omniverse v4.0</p>
      </div>
      <div className="absolute bottom-24 w-72 h-1 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
        <div className="h-full bg-blue-600 animate-[progress_2.5s_linear]" style={{ width: '100%' }} />
      </div>
      <style>{`@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );
}

/* ---------------- 2. AUTH SCREEN ---------------- */
function AuthScreen({ onLogin }: any) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (mode === "signup" && !agreed) {
      alert("Agree to Terms first");
      return;
    }
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8">
      <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(37,99,235,0.3)] rotate-12">
        <Lock className="text-white" size={32} />
      </div>
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Nexus Login</h2>
        </div>
        <div className="space-y-4">
          <input placeholder="Nexus ID" className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none font-bold text-sm text-white" />
          <input type="password" placeholder="Access Key" className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none font-bold text-sm text-white" />
          {mode === "signup" && (
            <div className="flex items-start gap-3 p-2">
              <input type="checkbox" checked={agreed} onChange={(e)=>setAgreed(e.target.checked)} className="mt-1" />
              <label className="text-[10px] text-zinc-500 font-bold uppercase">Agree to Terms & Conditions</label>
            </div>
          )}
        </div>
        <button onClick={handleSubmit} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all">Synchronize</button>
        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="w-full text-[10px] font-black text-blue-500 uppercase tracking-widest text-center mt-4">
          {mode === "signin" ? "Register New Node" : "Back to Sign In"}
        </button>
      </div>
    </div>
  );
}

/* ---------------- 3. MAIN OMNIVERSE ---------------- */
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("hub");
  
  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;
  if (!user) return <AuthScreen onLogin={() => setUser({ name: 'Explorer', gems: 7500 })} />;

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      
      {/* --- PREMIUM DYNAMIC HEADER --- */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-black/50 backdrop-blur-3xl border-b border-white/5 z-50 flex items-center px-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-blue-600/30 text-xl border border-white/10">X</div>
          <div className="h-4 w-[1px] bg-white/10 mx-1" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Omniverse</span>
        </div>
        
        <div className="flex-1 text-center">
          <h2 className="text-xs font-black italic uppercase tracking-[0.2em] text-white/80">Welcome to Race-X Creation</h2>
        </div>

        <div className="flex-1 flex justify-end gap-3">
          <div className="bg-zinc-900 border border-white/5 px-4 py-1.5 rounded-full flex items-center gap-2">
            <Gem size={14} className="text-blue-400 animate-pulse" />
            <span className="text-xs font-black tracking-tighter">{user.gems.toLocaleString()}</span>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-28 max-w-[600px] mx-auto min-h-screen px-4">

        {/* --- MAIN HUB (3D FLOATING GLASS CARDS) --- */}
        {activeTab === "hub" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-700">
            <GlassCard 
              title="RX SOCIAL" 
              sub="Global Network Feed" 
              icon={<LayoutGrid size={40}/>} 
              color="from-blue-600/40" 
              onClick={() => setActiveTab('social')} 
            />
            <GlassCard 
              title="RX STUDIO" 
              sub="Neural Image & Video Engine" 
              icon={<Zap size={40}/>} 
              color="from-purple-600/40" 
              onClick={() => setActiveTab('studio')} 
            />
            <GlassCard 
              title="MAGIC CHAT" 
              sub="Advanced Gemini AI Node" 
              icon={<Sparkles size={40}/>} 
              color="from-indigo-600/40" 
              onClick={() => setActiveTab('chat')} 
            />
            <GlassCard 
              title="RX MUSIC" 
              sub="Spatial Audio Streaming" 
              icon={<Music size={40}/>} 
              color="from-green-600/40" 
              onClick={() => setActiveTab('music')} 
            />
            <GlassCard 
              title="RX SHOP" 
              sub="Nexus Asset Marketplace" 
              icon={<ShoppingBag size={40}/>} 
              color="from-orange-600/40" 
              onClick={() => setActiveTab('shop')} 
            />
          </div>
        )}

        {/* --- SOCIAL TAB --- */}
        {activeTab === "social" && (
          <div className="animate-in fade-in duration-500 space-y-4">
            <div className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 shadow-lg shrink-0 flex items-center justify-center font-black italic">RX</div>
                <button className="flex-1 text-left px-6 py-4 rounded-2xl bg-black/40 text-zinc-500 text-sm font-bold border border-white/10">
                  Post that you want...
                </button>
              </div>
            </div>
            <div className="bg-zinc-900/30 p-10 rounded-[2rem] text-center border border-dashed border-white/10">
              <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Scanning Global Feed...</p>
            </div>
          </div>
        )}

        {/* --- MAGIC CHAT TAB --- */}
        {activeTab === "chat" && (
          <div className="h-[70vh] flex flex-col animate-in slide-in-from-right-10">
            <div className="flex-1 bg-zinc-900/20 rounded-[2.5rem] border border-white/5 p-6 mb-4">
              <div className="bg-indigo-600/20 p-4 rounded-2xl border border-indigo-500/20 max-w-[80%]">
                <p className="text-xs font-bold leading-relaxed">System Online. Race-X Magic Chat is ready for your neural prompt.</p>
              </div>
            </div>
            <div className="bg-zinc-900/50 p-3 rounded-3xl border border-white/10 flex items-center gap-3">
              <input placeholder="Ask Magic AI..." className="flex-1 bg-transparent border-none outline-none px-4 font-bold text-sm" />
              <button className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"><Plus/></button>
            </div>
          </div>
        )}

      </main>

      {/* --- MASTER NAVIGATION --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-black/60 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-4 z-50">
        <NavIcon icon={<HomeIcon size={24}/>} label="Hub" active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
        <NavIcon icon={<LayoutGrid size={24}/>} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center -mt-12 shadow-[0_15px_35px_rgba(37,99,235,0.4)] border-[6px] border-black active:scale-90 transition-all cursor-pointer">
          <Plus size={32} className="text-white" />
        </div>
        <NavIcon icon={<Music size={24}/>} label="Music" active={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        <NavIcon icon={<Settings size={24}/>} label="Admin" active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} />
      </nav>
    </div>
  );
}

/* --- 3D FLOATING GLASS CARD COMPONENT --- */
function GlassCard({ title, sub, icon, color, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/20 backdrop-blur-md p-8 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl`}
    >
      {/* Dynamic Glow Background */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${color} to-transparent blur-[60px] opacity-40 group-hover:opacity-100 transition-opacity`} />
      
      <div className="flex items-center gap-8 relative z-10">
        <div className={`w-20 h-20 rounded-3xl bg-zinc-800/50 flex items-center justify-center shadow-inner border border-white/10 group-hover:bg-blue-600/20 transition-colors`}>
          <div className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {icon}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-1">
            {sub}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Plus size={20} className="text-white" />
        </div>
      </div>

      {/* Glass Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-2 transition-all ${active ? 'text-blue-500 scale-110 drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]' : 'text-zinc-600 hover:text-zinc-400'}`}>
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
