import React, { useState } from "react";
import { 
  ArrowLeft, Send, Loader2, Play, Mic, CheckCircle2, 
  Download, Edit3, Share2, Volume2, Music4, AudioLines
} from "lucide-react";
import { useLocation } from "wouter";

type VoiceStep = 'INPUT' | 'PROCESSING' | 'DRAFTS' | 'FINAL';

export default function VoiceLab() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<VoiceStep>('INPUT');
  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState(0);

  // Function to simulate AI Voice Synthesis
  const startSynthesis = () => {
    if (!prompt.trim()) return;
    setStep('PROCESSING');
    
    let val = 0;
    const interval = setInterval(() => {
      val += 5;
      setProgress(val);
      if (val >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep('DRAFTS'), 500);
      }
    }, 150);
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
          <span className="text-[10px] font-black tracking-[0.4em] text-pink-500 uppercase">Neural Voice Lab</span>
          <div className="flex gap-1 mt-1">
             <div className={`h-1 w-3 rounded-full ${step === 'INPUT' ? 'bg-pink-500' : 'bg-zinc-800'}`} />
             <div className={`h-1 w-3 rounded-full ${step === 'PROCESSING' ? 'bg-pink-500' : 'bg-zinc-800'}`} />
             <div className={`h-1 w-3 rounded-full ${step === 'DRAFTS' ? 'bg-pink-500' : 'bg-zinc-800'}`} />
          </div>
        </div>
        <div className="w-10" />
      </header>

      {/* 🎙️ MAIN INTERFACE */}
      <main className="flex-1 flex flex-col mt-8">
        
        {/* STEP 1: VOICE PROMPT */}
        {step === 'INPUT' && (
          <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-10 text-center">
               <div className="w-20 h-20 bg-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-500/30 relative">
                  <div className="absolute inset-0 bg-pink-500/10 rounded-full animate-ping" />
                  <Mic size={32} className="text-pink-500 relative z-10" />
               </div>
               <h2 className="text-2xl font-bold italic tracking-tighter">Clone or <span className="text-pink-500">Create?</span></h2>
               <p className="text-zinc-500 text-[10px] mt-2 uppercase tracking-widest">Type your script or vocal style</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-2 flex flex-col shadow-2xl focus-within:border-pink-500/50 transition-all">
              <textarea 
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: A deep cinematic male voice narrating a thriller intro..."
                className="bg-transparent px-5 py-4 text-sm outline-none resize-none"
              />
              <div className="flex justify-end p-2">
                <button 
                  onClick={startSynthesis}
                  className="p-4 bg-pink-600 rounded-[24px] shadow-lg active:scale-90 transition-all flex items-center gap-2"
                >
                  <span className="text-[10px] font-black uppercase tracking-wider ml-2">Synthesize</span>
                  <Volume2 size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROCESSING (Waveform Animation) */}
        {step === 'PROCESSING' && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex gap-1 items-end h-16 mb-10">
               {[...Array(10)].map((_, i) => (
                 <div 
                   key={i} 
                   className="w-1.5 bg-pink-500 rounded-full animate-[bounce_1s_infinite]" 
                   style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}
                 />
               ))}
            </div>
            <div className="w-full max-w-[200px]">
               <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 transition-all duration-300" style={{width: `${progress}%`}} />
               </div>
               <p className="text-center text-[8px] font-black tracking-[0.3em] text-pink-500 mt-4 uppercase">
                 Matching Vocal Frequencies... {progress}%
               </p>
            </div>
          </div>
        )}

        {/* STEP 3: TRIPLE VOICE DRAFTS */}
        {step === 'DRAFTS' && (
          <div className="flex-1 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-500">
             <h3 className="text-[9px] font-black text-center tracking-[0.4em] text-zinc-600 uppercase mb-4">Neural Vocal Profiles</h3>
             <VoiceDraftCard title="The Narrator" trait="Deep & Bass" icon={<AudioLines/>} onClick={() => setStep('FINAL')} />
             <VoiceDraftCard title="Cyber AI" trait="Robotic & Sharp" icon={<Sparkles/>} onClick={() => setStep('FINAL')} />
             <VoiceDraftCard title="The Hype" trait="Energetic & High" icon={<Music4/>} onClick={() => setStep('FINAL')} />
          </div>
        )}

        {/* STEP 4: FINAL VOCAL ACTION */}
        {step === 'FINAL' && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-500">
             <div className="bg-[#111] rounded-[40px] p-8 border border-white/5 shadow-2xl mb-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-pink-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                   <Play fill="white" size={32} className="ml-1" />
                </div>
                <h4 className="text-lg font-bold">Draft_A_Vocal.wav</h4>
                <div className="flex gap-1 mt-4">
                   {[...Array(20)].map((_, i) => <div key={i} className="h-4 w-0.5 bg-pink-500/40 rounded-full" />)}
                </div>
                <div className="flex items-center gap-2 mt-6">
                   <CheckCircle2 size={12} className="text-pink-400" />
                   <span className="text-[9px] font-black text-pink-500/60 uppercase">Vocal Sync Complete</span>
                </div>
             </div>

             <div className="mt-auto flex flex-col gap-3">
                <VocalActionBtn icon={<Download size={18}/>} label="Save to Studio" color="bg-zinc-900" />
                <VocalActionBtn icon={<Edit3 size={18}/>} label="Fine-Tune Voice" color="bg-zinc-900" onClick={() => setLocation("/studio/editor")} />
                <VocalActionBtn icon={<Share2 size={18}/>} label="Use in Production" color="bg-pink-600 shadow-xl shadow-pink-900/20" />
             </div>
          </div>
        )}

      </main>
    </div>
  );
}

// --- Helper Components ---

function VoiceDraftCard({ title, trait, icon, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="bg-[#111] border border-white/5 rounded-[28px] p-6 flex items-center justify-between active:scale-95 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-pink-600/10 rounded-2xl text-pink-500 group-hover:scale-110 transition-transform">{icon}</div>
        <div className="text-left">
          <h4 className="text-sm font-black italic tracking-tighter uppercase">{title}</h4>
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{trait}</p>
        </div>
      </div>
      <Play size={14} className="text-zinc-700" fill="currentColor" />
    </button>
  );
}

function VocalActionBtn({ icon, label, color, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full ${color} py-5 rounded-[24px] flex items-center justify-center gap-3 border border-white/5 active:scale-95 transition-all`}>
      {icon}
      <span className="text-[10px] font-black tracking-[0.2em] uppercase">{label}</span>
    </button>
  );
}
