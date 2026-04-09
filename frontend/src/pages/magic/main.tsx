import { useState } from "react";
import { Sparkles, MessageSquare, Image as ImageIcon, Wand2 } from "lucide-react";
import { useLocation } from "wouter";

// ✅ CRITICAL FIX: Adding 'export default' so App.tsx can find it
export default function MagicMain() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 selection:bg-purple-500">
      
      {/* Header Section */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse">
            <Sparkles size={24} className="text-black" />
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Nexus Magic</h1>
        </div>
      </header>

      {/* Cards Grid - All 3 are now Functional */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* 1. Neural Chat */}
        <MagicCard 
          title="Neural Chat" 
          desc="Gemini-Powered AI Intelligence"
          icon={<MessageSquare size={32}/>}
          color="from-blue-600 to-purple-600"
          onClick={() => setLocation("/magic/ai-chat")} 
        />

        {/* 2. Dream Canvas */}
        <MagicCard 
          title="Dream Canvas" 
          desc="Text to Photorealistic Art"
          icon={<ImageIcon size={32}/>}
          color="from-purple-600 to-pink-600"
          onClick={() => setLocation("/magic/image-gen")}
        />

        {/* 3. Magic Wand */}
        <MagicCard 
          title="Magic Wand" 
          desc="Upscale & Enhance Everything"
          icon={<Wand2 size={32}/>}
          color="from-pink-600 to-orange-600"
          // Redirecting to the main Studio Hub
          onClick={() => setLocation("/studio")} 
        />
      </div>

      {/* Stats Board Section (Bina kuch kate) */}
      <div className="mt-10 p-6 bg-zinc-900/50 rounded-[40px] border border-white/5 flex justify-around backdrop-blur-md">
        <MagicStat label="AI Tokens" value="1.2M" />
        <div className="w-[1px] bg-white/10" />
        <MagicStat label="Gems" value="450" />
      </div>
    </div>
  );
}

// --- Sub-Components (Keep these below) ---

function MagicCard({ title, desc, icon, color, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`relative h-48 rounded-[45px] overflow-hidden p-8 flex flex-col justify-end group cursor-pointer active:scale-95 transition-all shadow-2xl`}
    >
      {/* Background Gradient Layer */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80 group-hover:scale-110 transition-transform duration-1000`} />
      
      {/* Icon top-right */}
      <div className="absolute top-8 right-8 text-white/20 group-hover:text-white transition-colors duration-500">
        {icon}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-1">
          {title}
        </h3>
        <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
          {desc}
        </p>
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
