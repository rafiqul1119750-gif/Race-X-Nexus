import React, { useState, useEffect, useRef } from "react";
import { 
  Lock, Shield, Gem, Plus, LayoutGrid, Zap, Music, ShoppingBag, Sparkles, 
  Settings, User, LogOut, ChevronLeft, Mic, Image as ImageIcon, Video, 
  Trash2, Download, CreditCard, History, Share2, Heart, MessageCircle, MoreHorizontal
} from "lucide-react";

/* ---------------- 1. PREMIUM SPLASH ---------------- */
function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 2800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[9999] overflow-hidden text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full" />
      <div className="relative mb-8">
        <div className="w-24 h-24 border-2 border-blue-500/20 border-t-blue-500 rounded-[2rem] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-black italic text-blue-500">X</div>
      </div>
      <h1 className="text-5xl font-black italic tracking-tighter animate-pulse">RACE-X</h1>
      <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.4em] mt-2">Neural Nexus v4.0</p>
    </div>
  );
}

/* ---------------- 2. LOGIN & SIGNUP (WITH REAL TERMS) ---------------- */
function AuthPortal({ onAuthSuccess }: any) {
  const [view, setView] = useState<"login" | "signup">("login");
  const [showTerms, setShowTerms] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAction = () => {
    if (view === "signup" && !isAgreed) return alert("Please read and agree to Terms first!");
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 text-white relative">
      <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-10 shadow-2xl rotate-12 border border-white/20"><Shield size={32} /></div>
      
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">{view === "login" ? "Nexus Sign In" : "Create Node"}</h2>
          <p className="text-zinc-600 text-[10px] font-black uppercase mt-2 tracking-widest">Global Security Protocol Active</p>
        </div>

        <div className="space-y-4">
          <input placeholder="Nexus ID" className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none font-bold focus:border-blue-500" />
          <input type="password" placeholder="Access Key" className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none font-bold focus:border-blue-500" />
          
          {view === "signup" && (
            <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
              <input type="checkbox" checked={isAgreed} readOnly className="accent-blue-600" />
              <button onClick={() => setShowTerms(true)} className="text-[10px] font-black text-blue-400 uppercase underline">Read Rules & Regulations</button>
            </div>
          )}
        </div>

        <button onClick={handleAction} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 shadow-xl transition-all">
          {view === "login" ? "Synchronize" : "Finalize Registration"}
        </button>

        <button onClick={() => setView(view === "login" ? "signup" : "login")} className="w-full text-center text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-4">
          {view === "login" ? "Need a New Node? Create Account" : "Back to Security Portal"}
        </button>
      </div>

      {/* TERMS MODAL */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[999] p-8 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-6 pt-10 px-4">
            <h3 className="text-2xl font-black italic text-blue-500 uppercase">Race-X Rules & Regulations</h3>
            <div className="text-zinc-400 text-xs leading-relaxed font-bold space-y-4">
               <p>1. PROHIBITED CONTENT: Any form of violent, hateful, or explicit adult content is strictly banned on Race-X.</p>
               <p>2. AI GENERATION: Users are responsible for content generated via RX Studio. Do not use AI to create deepfakes of real people.</p>
               <p>3. MONETIZATION: 1 Diamond = 1 Paisa. Withdrawals are processed within 24-48 hours via registered UPI.</p>
               <p>4. DATA PRIVACY: Your data is encrypted on the Nexus Node. We do not sell user data to third parties.</p>
            </div>
          </div>
          <button onClick={() => { setIsAgreed(true); setShowTerms(false); }} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase mt-6">I Agree & Accept</button>
        </div>
      )}
    </div>
  );
}

/* ---------------- 3. MASTER OMNIVERSE ---------------- */
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("hub");
  const [showMenu, setShowMenu] = useState(false);

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;
  if (!user) return <AuthPortal onAuthSuccess={() => setUser({ name: 'Nexus_User', gems: 12500, followers: '45.2K', following: '840' })} />;

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-500/30">
      
      {/* --- REFINED TOP HEADER (FOLLOWERS/FOLLOWING) --- */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-black/40 backdrop-blur-3xl border-b border-white/5 z-[100] flex items-center px-5">
        <div className="w-1/3 flex items-center gap-3">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-blue-600/30">X</div>
           <button onClick={() => setShowMenu(true)} className="p-2 bg-zinc-900 rounded-lg"><div className="w-4 h-0.5 bg-white mb-1"/><div className="w-3 h-0.5 bg-white mb-1"/><div className="w-4 h-0.5 bg-white"/></button>
        </div>
        
        <div className="w-1/3 text-center flex justify-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-black text-white">{user.followers}</span>
            <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Followers</span>
          </div>
          <div className="w-[1px] h-6 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-black text-white">{user.following}</span>
            <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Following</span>
          </div>
        </div>

        <div className="w-1/3 flex justify-end">
           <div className="w-10 h-10 rounded-full border-2 border-blue-500/50 p-0.5">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-full h-full rounded-full bg-zinc-800" alt="profile"/>
           </div>
        </div>
      </header>

      <main className="pt-24 pb-28 max-w-[600px] mx-auto px-5">
        
        {/* --- MAIN HUB VIEW --- */}
        {activeTab === "hub" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-700">
             <h2 className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 italic">Welcome to Race-X Creation</h2>
             <GlassCard title="RX SOCIAL" sub="Human Feed" icon={<LayoutGrid size={32}/>} color="from-blue-600/40" onClick={() => setActiveTab('social')} />
             <GlassCard title="RX STUDIO" sub="AI Audio/Visual" icon={<Zap size={32}/>} color="from-cyan-600/40" onClick={() => setActiveTab('studio')} />
             <GlassCard title="RX WALLET" sub="Earnings Hub" icon={<CreditCard size={32}/>} color="from-green-600/40" onClick={() => setActiveTab('wallet')} />
          </div>
        )}

        {/* --- STUDIO INTERFACE (REAL FEATURES) --- */}
        {activeTab === "studio" && (
          <div className="animate-in fade-in duration-500 space-y-6">
            <div className="flex items-center gap-4 mb-4" onClick={() => setActiveTab('hub')}>
              <ChevronLeft /> <span className="text-xs font-black uppercase tracking-widest">Back to Hub</span>
            </div>
            
            <div className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-white/10">
               <h3 className="text-xl font-black italic uppercase">AI Studio Engine</h3>
               <div className="grid grid-cols-2 gap-4 mt-6">
                 <StudioTool icon={<Mic/>} label="Voice Clone" sub="11-Labs Node" />
                 <StudioTool icon={<ImageIcon/>} label="AI Art" sub="Flux Engine" />
                 <StudioTool icon={<Video/>} label="Video Gen" sub="Sora Node" />
                 <StudioTool icon={<PlusCircle icon={<Plus/>}/>} label="Upload" sub="Gallery Access" onClick={() => alert("Opening Phone Gallery...")} />
               </div>
            </div>

            <div className="p-4 border border-white/5 rounded-3xl space-y-3">
              <p className="text-[10px] font-black uppercase text-zinc-500">Audio Library</p>
              {[1, 2].map(i => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Music size={16} className="text-blue-500"/>
                    <span className="text-[11px] font-bold">Sound Effect #{i}</span>
                  </div>
                  <Download size={16} className="text-zinc-600"/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- WALLET INTERFACE --- */}
        {activeTab === "wallet" && (
           <div className="animate-in slide-in-from-right-10 duration-500 space-y-6 text-center">
             <div className="bg-gradient-to-br from-green-600/20 to-black p-10 rounded-[3rem] border border-green-500/20">
                <Gem size={48} className="text-green-500 mx-auto mb-4 animate-bounce" />
                <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Current Balance</h4>
                <div className="text-5xl font-black italic my-2">{user.gems.toLocaleString()}</div>
                <p className="text-[10px] font-black text-green-400 uppercase italic">≈ ₹{(user.gems/100).toFixed(2)} INR</p>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <button className="bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest">Withdrawal</button>
                <button className="bg-zinc-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest border border-white/5">History</button>
             </div>
           </div>
        )}

      </main>

      {/* --- NAVIGATION --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-black/60 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around z-50">
        <NavIcon icon={<LayoutGrid/>} label="Hub" active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
        <NavIcon icon={<Zap/>} label="Studio" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center -mt-12 shadow-xl border-[6px] border-black"><Plus size={32}/></div>
        <NavIcon icon={<CreditCard/>} label="Wallet" active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} />
        <NavIcon icon={<Settings/>} label="Settings" active={showMenu} onClick={() => setShowMenu(true)} />
      </nav>

      {/* --- MASTER MENU DRAWER --- */}
      {showMenu && (
        <div className="fixed inset-0 z-[1000] animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/60" onClick={() => setShowMenu(false)} />
           <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-white/10 rounded-t-[3rem] p-8 space-y-6 animate-in slide-in-from-bottom-20">
              <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-4" />
              <h3 className="text-center text-xs font-black uppercase tracking-widest text-zinc-500 mb-8">Nexus System Menu</h3>
              
              <MenuOption icon={<User/>} label="Nexus Profile" sub="Manage your digital ID" />
              <MenuOption icon={<Gem/>} label="Monetization" sub="1 Diamond = 1 Paisa" onClick={() => { setActiveTab('wallet'); setShowMenu(false); }} />
              <MenuOption icon={<Zap/>} label="Creator Tools" sub="AI Engine Settings" />
              <MenuOption icon={<Shield/>} label="Security" sub="Password & Privacy" />
              <MenuOption icon={<LogOut className="text-red-500"/>} label="Terminal Exit" sub="Safely Logout" onClick={() => setUser(null)} />
           </div>
        </div>
      )}
    </div>
  );
}

/* --- UI COMPONENTS --- */
function GlassCard({ title, sub, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className={`relative group cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/20 backdrop-blur-xl p-8 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl`}>
      <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${color} to-transparent blur-[60px] opacity-30 group-hover:opacity-60 transition-opacity`} />
      <div className="flex items-center gap-6 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white">{icon}</div>
        <div>
          <h3 className="text-xl font-black italic uppercase text-white">{title}</h3>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 mt-1">{sub}</p>
        </div>
      </div>
    </div>
  );
}

function StudioTool({ icon, label, sub, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-white/5 border border-white/5 p-5 rounded-[2rem] flex flex-col items-center gap-2 hover:bg-white/10 transition active:scale-95">
       <div className="text-cyan-400">{icon}</div>
       <div className="text-center">
         <p className="text-[10px] font-black uppercase text-white tracking-tight">{label}</p>
         <p className="text-[7px] font-bold uppercase text-zinc-600">{sub}</p>
       </div>
    </div>
  );
}

function MenuOption({ icon, label, sub, onClick }: any) {
  return (
    <div onClick={onClick} className="flex items-center gap-5 p-4 bg-white/5 rounded-2xl border border-white/5 active:scale-95 transition-all">
       <div className="text-blue-500">{icon}</div>
       <div>
         <p className="text-xs font-black uppercase tracking-tight">{label}</p>
         <p className="text-[8px] font-black uppercase text-zinc-600 mt-0.5">{sub}</p>
       </div>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-2 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-600'}`}>
      {icon}
      <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
