import React, { useState } from "react";
import { 
  Sparkles, Image as ImageIcon, Mic, Music, Play, Video, 
  Send, Loader2, Save, Edit3, Share2, ArrowLeft, Piano, CheckCircle2, User
} from "lucide-react";
import { useLocation } from "wouter";

type StudioStep = 'DASHBOARD' | 'CHAT' | 'DRAFTING' | 'POST_PRODUCTION';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<StudioStep>('DASHBOARD');
  const [mode, setMode] = useState<{name: string, icon: any}>({name: "", icon: null});
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- STEP 1: DASHBOARD ---
  if (step === 'DASHBOARD') {
    return (
      <div className="h-screen w-screen bg-[#050505] text-white flex flex-col p-6 font-sans">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-xl font-bold">Hi <span className="text-blue-500">User</span>,</h1>
            <p className="text-[9px] text-zinc-500 font-black tracking-[0.3em] uppercase">Race-X Neural Core Active</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 p-0.5">
            <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center">
              <User size={20} className="text-zinc-600" />
            </div>
          </div>
        </header>

        <h2 className="text-3xl font-medium leading-tight mb-10">Where should we <br/> <span className="font-bold">start?</span></h2>

        <div className="grid grid-cols-2 gap-4">
          <MenuBtn icon={<ImageIcon size={20}/>} label="Create Image" onClick={() => {setMode({name: "Image", icon: <ImageIcon/>}); setStep('CHAT');}} />
          <MenuBtn icon={<Mic size={20}/>} label="Create Voice" onClick={() => {setMode({name: "Voice", icon: <Mic/>}); setStep('CHAT');}} />
          <MenuBtn icon={<Piano size={20}/>} label="Create Melody" onClick={() => {setMode({name: "Melody", icon: <Piano/>}); setStep('CHAT');}} />
          <MenuBtn icon={<Music size={20}/>} label="Create Music" onClick={() => {setMode({name: "Music", icon: <Music/>}); setStep('CHAT');}} />
          <MenuBtn icon={<Video size={20}/>} label="Create Video" onClick={() => {setMode({name: "Video", icon: <Video/>}); setStep('CHAT');}} />
          <MenuBtn icon={<Sparkles size={20}/>} label="Create Song" color="bg-blue-600" onClick={() => {setMode({name: "Song", icon: <Sparkles/>}); setStep('CHAT');}} />
        </div>
      </div>
    );
  }

  // --- STEP 2: CHAT ---
  if (step === 'CHAT') {
    return (
      <div className="h-screen w-screen bg-[#0E0E0E] flex flex-col p-6">
        <button onClick={() => setStep('DASHBOARD')} className="mb-6 w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-full active:scale-90 transition-all"><ArrowLeft size={20} /></button>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex gap-4 mb-8 items-start animate-in fade-in slide-in-from-bottom-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">{mode.icon}</div>
            <div className="bg-[#1E1F20] p-5 rounded-3xl rounded-tl-none border border-white/5 text-sm">Hi! What's the idea for your <span className="text-blue-400 font-bold">{mode.name}</span>?</div>
          </div>
          {isGenerating && (
            <div className="flex flex-col items-center gap-3">
               <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden max-w-[200px]"><div className="h-full bg-blue-500 w-full animate-pulse" /></div>
               <p className="text-[10px] font-black tracking-widest text-blue-500">SYNTHESIZING DRAFTS...</p>
            </div>
          )}
        </div>
        <div className="mt-auto pb-4">
          <div className="bg-[#1E1F20] border border-white/10 rounded-[32px] p-2 pl-6 flex items-center shadow-2xl">
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={`Describe your ${mode.name.toLowerCase()}...`} className="bg-transparent flex-1 outline-none text-sm py-3" />
            <button onClick={() => {setIsGenerating(true); setTimeout(() => {setIsGenerating(false); setStep('DRAFTING');}, 2500)}} className="p-4 bg-blue-600 rounded-3xl active:scale-90 transition-all"><Send size={20} fill="currentColor" /></button>
          </div>
        </div>
      </div>
    );
  }

  // --- STEP 3: DRAFTING ---
  if (step === 'DRAFTING') {
    return (
      <div className="h-screen w-screen bg-[#050505] flex flex-col p-6">
        <h2 className="text-center text-[10px] font-black tracking-[0.4em] mb-10 text-zinc-500 uppercase">Neural Drafts Generated</h2>
        <div className="flex-1 flex flex-col gap-5">
          <DraftCard id="A" title="Neon Action" theme="from-blue-600/30" onClick={() => setStep('POST_PRODUCTION')} />
          <DraftCard id="B" title="Cyber Flow" theme="from-purple-600/30" onClick={() => setStep('POST_PRODUCTION')} />
          <DraftCard id="C" title="Retro Pulse" theme="from-orange-600/30" onClick={() => setStep('POST_PRODUCTION')} />
        </div>
      </div>
    );
  }

  // --- STEP 4: POST-PRODUCTION ---
  return (
    <div className="h-screen w-screen bg-[#0E0E0E] flex flex-col p-6">
       <div className="flex-1 flex items-center justify-center py-6">
          <div className="w-full aspect-[9/16] max-h-[440px] bg-black rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center"><button className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20"><Play fill="white" size={24} /></button></div>
             <div className="absolute bottom-6 left-6 flex items-center gap-2"><CheckCircle2 size={12} className="text-blue-400" /><span className="text-[9px] font-black text-white/50 uppercase">Neural Draft A Ready</span></div>
          </div>
       </div>
       <div className="flex flex-col gap-3 pb-4">
          <ActionBtn icon={<Save size={18}/>} label="SAVE TO GALLERY" color="bg-zinc-900" />
          <ActionBtn icon={<Edit3 size={18}/>} label="EDIT IN PRO STUDIO" color="bg-zinc-900" onClick={() => setLocation('/studio/editor')} />
          <ActionBtn icon={<Share2 size={18}/>} label="PUBLISH TO RACE-X" color="bg-blue-600 border-transparent shadow-lg shadow-blue-900/20" />
       </div>
    </div>
  );
}

// --- Internal UI Components ---
function MenuBtn({ icon, label, onClick, color }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 p-5 ${color || 'bg-zinc-900/60'} border border-white/5 rounded-[28px] active:scale-95 transition-all`}>
      <span className="text-blue-400">{icon}</span><span className="text-xs font-bold">{label}</span>
    </button>
  );
}

function DraftCard({ id, title, theme, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex-1 bg-gradient-to-br ${theme} to-[#080808] border border-white/10 rounded-[32px] p-6 flex flex-col justify-between active:scale-95 transition-all shadow-xl`}>
      <div className="flex justify-between"><span className="text-[8px] font-black text-white/30 tracking-[0.3em]">DRAFT {id}</span><Play size={10} fill="white"/></div>
      <h3 className="text-xl font-black italic text-white">{title}</h3>
    </div>
  );
}

function ActionBtn({ icon, label, color, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full ${color} border border-white/10 py-4 rounded-3xl flex items-center justify-center gap-3 active:scale-95 transition-all`}>
      {icon}<span className="text-[10px] font-black tracking-widest uppercase">{label}</span>
    </button>
  );
}
