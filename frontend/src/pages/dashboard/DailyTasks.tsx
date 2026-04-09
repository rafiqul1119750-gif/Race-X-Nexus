import { Target, Trophy, Flame, ChevronRight } from "lucide-react";

export function NexusDailyTasks() {
  const tasks = [
    { label: "Watch 5 Ads", reward: "1 Diamond", progress: 60, icon: <Target className="text-cyan-400" size={16}/> },
    { label: "Create 1 Studio Reel", reward: "200 Gems", progress: 0, icon: <Flame className="text-orange-500" size={16}/> },
    { label: "Weekly: 50 Shares", reward: "10 Diamonds", progress: 20, icon: <Trophy className="text-yellow-500" size={16}/> }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Active Protocols</h3>
        <span className="text-[9px] font-bold text-cyan-500 italic">RESET IN 14H</span>
      </div>

      {tasks.map((task, i) => (
        <div key={i} className="bg-zinc-900/40 border border-white/5 p-5 rounded-[30px] flex items-center justify-between group active:scale-95 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black rounded-2xl border border-white/5">{task.icon}</div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-tight">{task.label}</p>
              <p className="text-[8px] font-bold text-cyan-500 mt-1 italic">Reward: {task.reward}</p>
            </div>
          </div>
          <div className="relative w-10 h-10 flex items-center justify-center">
             <span className="text-[9px] font-black italic">{task.progress}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
