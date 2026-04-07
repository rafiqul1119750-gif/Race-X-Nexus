import { useLocation } from "wouter";
import { ArrowLeft, LayoutDashboard, BarChart3, Video, Settings } from "lucide-react";

export default function StudioDashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => setLocation("/hub")} className="p-2 bg-zinc-900 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-black italic uppercase tracking-widest text-cyan-400">Creator Studio</h1>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-[32px]">
          <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">Total Views</p>
          <h2 className="text-3xl font-bold mt-1">24.8K</h2>
          <div className="h-1 w-full bg-zinc-800 mt-4 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-cyan-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/30 border border-white/5 p-5 rounded-[24px] flex flex-col items-center gap-3">
             <Video className="text-purple-400" />
             <span className="text-[10px] font-bold">UPLOADS</span>
          </div>
          <div className="bg-zinc-900/30 border border-white/5 p-5 rounded-[24px] flex flex-col items-center gap-3">
             <BarChart3 className="text-green-400" />
             <span className="text-[10px] font-bold">ANALYTICS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
