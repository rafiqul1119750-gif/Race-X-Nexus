import { useLocation } from "wouter";
import { Film, Image as ImageIcon, PlusSquare } from "lucide-react";

export const PostTrigger = () => {
  const [, setLocation] = useLocation();

  const handlePostSelection = (type: 'reel' | 'post' | 'story') => {
    // 🛡️ Redirect to Studio First
    // Pass the type as state so Studio knows what to build
    setLocation(`/studio?mode=${type}`);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6 bg-zinc-900/80 backdrop-blur-2xl rounded-t-[40px] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <button onClick={() => handlePostSelection('reel')} className="flex flex-col items-center gap-2 p-4 active:scale-90 transition-all">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400"><Film size={24}/></div>
        <span className="text-[8px] font-black uppercase tracking-widest">Reel (30s)</span>
      </button>
      
      <button onClick={() => handlePostSelection('post')} className="flex flex-col items-center gap-2 p-4 active:scale-90 transition-all">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-purple-400"><ImageIcon size={24}/></div>
        <span className="text-[8px] font-black uppercase tracking-widest">Video (60s)</span>
      </button>

      <button onClick={() => handlePostSelection('story')} className="flex flex-col items-center gap-2 p-4 active:scale-90 transition-all">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-green-400"><PlusSquare size={24}/></div>
        <span className="text-[8px] font-black uppercase tracking-widest">Story</span>
      </button>
    </div>
  );
};
