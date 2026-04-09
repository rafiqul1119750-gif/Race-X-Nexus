import { Sparkles, MessageSquare, Image as ImageIcon, Wand2, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function MagicIndex() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => setLocation("/hub")} className="p-2 active:scale-75"><ArrowLeft /></button>
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">Nexus Magic</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card title="Neural Chat" icon={<MessageSquare />} color="from-blue-600 to-purple-600" onClick={() => setLocation("/magic/ai-chat")} />
        <Card title="Dream Canvas" icon={<ImageIcon />} color="from-purple-600 to-pink-600" onClick={() => setLocation("/magic/image-gen")} />
        <Card title="Studio Node" icon={<Wand2 />} color="from-pink-600 to-orange-600" onClick={() => setLocation("/studio")} />
      </div>
    </div>
  );
}

function Card({ title, icon, color, onClick }: any) {
  return (
    <button onClick={onClick} className={`relative h-44 rounded-[45px] overflow-hidden p-8 flex flex-col justify-end bg-gradient-to-br ${color} active:scale-95 transition-all`}>
      <div className="absolute top-8 right-8 opacity-20">{icon}</div>
      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-left">{title}</h3>
    </button>
  );
}
