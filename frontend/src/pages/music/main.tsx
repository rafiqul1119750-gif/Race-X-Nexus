import { useLocation } from "wouter";
import { ArrowLeft, Wand2, Image as ImageIcon, Zap, Cpu } from "lucide-react";

export default function MagicAI() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen p-6">
      <button onClick={() => setLocation("/hub")} className="mb-6 p-2 bg-secondary rounded-full">
        <ArrowLeft />
      </button>
      <h1 className="text-2xl font-black italic text-amber-500 mb-8 uppercase">RX Magic AI</h1>
      
      <div className="space-y-4">
        {["Text-to-Image", "Neural Voice", "Code Assistant"].map((tool) => (
          <div key={tool} className="p-6 bg-secondary border border-border rounded-[25px] flex justify-between items-center">
            <span className="font-bold uppercase text-xs tracking-widest">{tool}</span>
            <Zap size={16} className="text-amber-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
