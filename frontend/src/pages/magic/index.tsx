import { Sparkles, MessageSquare, Image as ImageIcon, Wand2, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function MagicMain() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => setLocation("/hub")} className="p-2 active:scale-75 transition-all"><ArrowLeft /></button>
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">Nexus Magic</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <MagicCard title="Neural Chat" desc="Gemini-Powered AI" icon={<MessageSquare size={32}/>} color="from-blue-600 to-purple-600" onClick={() => setLocation("/magic/ai-chat")} />
        <MagicCard title="Dream Canvas" desc="Text to Art" icon={<ImageIcon size={32}/>} color="from-purple-600 to-pink-600" onClick={() => setLocation("/magic/image-gen")} />
        <MagicCard title="Magic Wand" desc="Enhance Everything" icon={<Wand2 size={32}/>} color="from-pink-600 to-orange-600" onClick={() => setLocation("/studio")} />
      </div>
    </div>
  );
}

function MagicCard({ title, desc, icon, color, onClick }: any) {
  return (
    <button onClick={onClick} className={`relative h-48 rounded-[45px] overflow-hidden p-8 flex flex-col justify-end bg-gradient-to-br ${color} active:scale-95 transition-all w-full text-left`}>
      <div className="absolute top-8 right-8 text-white/20">{icon}</div>
      <h3 className="text-2xl font-black uppercase italic tracking-tighter">{title}</h3>
      <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{desc}</p>
    </button>
  );
}
