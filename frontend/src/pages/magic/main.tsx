import { useState } from "react";
import { Sparkles, MessageSquare, Image as ImageIcon, Wand2, Zap, Brain, Stars } from "lucide-react";
import { useLocation } from "wouter";

export default function MagicMain() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 selection:bg-purple-500">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse">
            <Sparkles size={24} className="text-black" />
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Nexus Magic</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <MagicCard 
          title="Neural Chat" 
          desc="Gemini-Powered AI Intelligence"
          icon={<MessageSquare size={32}/>}
          color="from-blue-600 to-purple-600"
          onClick={() => setLocation("/magic/ai-chat")}
        />
        <MagicCard 
          title="Dream Canvas" 
          desc="Text to Photorealistic Art"
          icon={<ImageIcon size={32}/>}
          color="from-purple-600 to-pink-600"
          onClick={() => setLocation("/magic/image-gen")}
        />
        <MagicCard 
          title="Magic Wand" 
          desc="Upscale & Enhance Everything"
          icon={<Wand2 size={32}/>}
          color="from-pink-600 to-orange-600"
          onClick={() => {}}
        />
      </div>

      {/* Stats Board */}
      <div className="mt-10 p-6 bg-zinc-900/50 rounded-[40px] border border-white/5 flex justify-around">
        <MagicStat label="AI Tokens" value="1.2M" />
        <div className="w-[1px] bg-white/10" />
        <MagicStat label="Gems" value="450" />
      </div>
    </div>
  );
}

function MagicCard({ title, desc, icon, color, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`relative h-48 rounded-[45px] overflow-hidden p-8 flex flex-col justify-end group cursor-pointer active:scale-95 transition-all`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80 group-hover:scale-110 transition-transform duration-1000`} />
      <div className="absolute top-8 right-8 text-white/20 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{title}</h3>
        <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{desc}</p>
      </div>
    </div>
  );
}

function MagicStat({ label, value }: any) {
  return (
    <div className="text-center">
      <p className="text-2xl font-black italic text-white tracking-tighter">{value}</p>
      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}
