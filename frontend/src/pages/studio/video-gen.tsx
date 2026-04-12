import React, { useState } from "react";
import { 
  ArrowLeft, Send, Loader2, Play, Sparkles, CheckCircle2, 
  Download, Edit3, Share2, Film
} from "lucide-react";
import { useLocation } from "wouter";

type GenStep = 'INPUT' | 'PROCESSING' | 'DRAFTS' | 'FINAL';

export default function VideoGen() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<GenStep>('INPUT');
  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState(0);

  // Function to simulate AI Generation
  const startGeneration = () => {
    if (!prompt.trim()) return;
    setStep('PROCESSING');
    
    // Progress Animation Logic
    let val = 0;
    const interval = setInterval(() => {
      val += 10;
      setProgress(val);
      if (val >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep('DRAFTS'), 500);
      }
    }, 400);
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col p-6 font-sans overflow-hidden">
      
      {/* 🔮 HEADER */}
      <header className="flex justify-between items-center z-50">
        <button 
          onClick={() => step === 'INPUT' ? setLocation("/studio") : setStep('INPUT')} 
          className="p-3 bg-zinc-900 rounded-full active:scale-75 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase">Neural Cinema</span>
          <div className="flex gap-1 mt-1">
             <div className={`h-1 w-4 rounded-full ${step === 'INPUT' ? 'bg-purple-500' : 'bg-zinc-800'}`} />
             <div className={`h-1 w-4 rounded-full ${step === 'DRAFTS' ? 'bg-purple-500' : 'bg-zinc-800'}`} />
             <div className={`h-1 w-4 rounded-full ${step === 'FINAL' ? 'bg-purple-500' : 'bg-zinc-800'}`} />
          </div>
        </div>
        <div className="w-10" />
      </header>

      {/* 🎬 MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col mt-8">
        
        {/* STEP 1: PROMPT INPUT */}
        {step === 'INPUT' && (
          <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-10 text-center">
               <div className="w-20 h-20 bg-purple-600/20 rounded-[30px] flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
                  <Film size={32} className="text-purple-500" />
               </div>
               <h2 className="text-2xl font-bold">What's the <span className="text-purple-500">Scene?</span></h2>
               <p className="text-zinc-500 text-xs mt-2 italic">Describe your video idea in detail...</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-2 flex items-center shadow-2xl focus-within:border-purple-500/50 transition-all">
              <input 
                autoFocus
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startGeneration()}
                placeholder="Ex: A futuristic samurai in rainy Tokyo..."
                className="bg-transparent flex-1 px-5 py-4 text-sm outline-none"
              />
              <button 
                onClick={startGeneration}
                className="p-4 bg-purple-600 rounded-[24px] shadow-lg active:scale-90 transition-all"
              >
                <Send size={20} fill="currentColor" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROCESSING (Neural Pulse) */}
        {step === 'PROCESSING' && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 blur-[60px] opacity-20 animate-pulse" />
              <Loader2 size={48} className="text-purple-500 animate-spin mb-8" />
            </div>
            <div className="w-full max-w-[240px]">
               <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 transition-all duration-300" style={{width: `${progress}%`}} />
               </div>
               <p className="text-center text-[9px] font-black tracking-[0.2em] text-zinc-500 mt-4 uppercase italic">
                 Neural Core Synthesizing: {progress}%
               </p>
            </div>
          </div>
        )}

        {/* STEP 3: TRIPLE DRAFTS */}
        {step === 'DRAFTS' && (
          <div className="flex-1 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-500">
             <h3 className="text-[10px] font-black text-center tracking-[0.3em] text-zinc-600 uppercase mb-4">Choose Your Direction</h3>
             <DraftItem title="Action Sequence" style="Cinematic / 24fps" color="from-purple-600/40" onClick={() => setStep('FINAL')} />
             <DraftItem title="Neon Cyberpunk" style="Vivid / Stylized" color="from-blue-600/40" onClick={() => setStep('FINAL')} />
             <DraftItem title="Atmospheric Noir" style="Grainy / Moody" color="from-zinc-600/40" onClick={() => setStep('FINAL')} />
          </div>
        )}

        {/* STEP 4: FINAL PREVIEW & ACTION */}
        {step === 'FINAL' && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-500">
             <div className="relative aspect-[9/16] max-h-[420px] bg-zinc-950 rounded-[40px] border border-white/5 overflow-hidden mx-auto w-full shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                      <Play fill="white" size={24} />
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                   <CheckCircle2 size={14} className="text-purple-400" />
                   <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Draft A: Ready</span>
                </div>
             </div>

             <div className="mt-8 flex flex-col gap-3">
                <ActionBtn icon={<Download size={18}/>} label="Save to Gallery" color="bg-zinc-900" />
                <ActionBtn icon={<Edit3 size={18}/>} label="Edit in Pro Studio" color="bg-zinc-900" onClick={() => setLocation("/studio/editor")} />
                <ActionBtn icon={<Share2 size={18}/>} label="Publish Video" color="bg-purple-600 shadow-xl shadow-purple-900/20" />
             </div>
          </div>
        )}

      </main>
    </div>
  );
}

// --- Internal Production Components ---

function DraftItem({ title, style, color, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 bg-gradient-to-br ${color} to-zinc-950 border border-white/5 rounded-[32px] p-6 text-left active:scale-95 transition-all shadow-xl flex flex-col justify-between`}
    >
      <div>
        <h4 className="text-xl font-black italic tracking-tighter">{title}</h4>
        <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">{style}</p>
      </div>
      <div className="flex justify-end"><div className="p-2 bg-white/5 rounded-full"><Sparkles size={14} className="text-white/60"/></div></div>
    </button>
  );
}

function ActionBtn({ icon, label, color, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full ${color} py-5 rounded-[24px] flex items-center justify-center gap-3 border border-white/5 active:scale-95 transition-all`}>
      {icon}
      <span className="text-[10px] font-black tracking-[0.2em] uppercase">{label}</span>
    </button>
  );
}
