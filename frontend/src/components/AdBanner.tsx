import { Info } from "lucide-react";

const AdBanner = () => {
  return (
    <div className="w-full p-4 bg-zinc-900/50 border border-zinc-800 rounded-3xl flex items-center gap-4 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-24 h-full bg-cyan-500/5 blur-2xl group-hover:bg-cyan-500/10 transition-all" />
      
      <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-[10px] font-black text-zinc-500 border border-white/5">
        AD
      </div>
      
      <div className="flex-1">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/90">Watch to Earn</h4>
        <p className="text-[8px] font-bold text-zinc-500 uppercase">Get 50+ Diamonds per view</p>
      </div>

      <button className="px-4 py-2 bg-white text-black text-[9px] font-black uppercase rounded-xl hover:bg-cyan-400 transition-all">
        Claim
      </button>
    </div>
  );
};

export default AdBanner;
