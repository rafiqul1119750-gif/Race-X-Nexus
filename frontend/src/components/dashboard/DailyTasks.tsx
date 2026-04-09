import { Target, Trophy, Flame, Zap } from "lucide-react";

export function NexusDailyTasks() {
  const dailyTasks = [
    { label: "Watch 5 Ads", reward: "1 Diamond", progress: 60, icon: <Target className="text-cyan-400" size={16}/> },
    { label: "Create 1 Studio Reel", reward: "200 Gems", progress: 0, icon: <Flame className="text-orange-500" size={16}/> },
  ];

  const weeklyChallenge = {
    label: "NEXUS ELITE: 50 SHARES",
    reward: "10 Diamonds",
    progress: 40, // 20/50 shares done
    daysLeft: 3,
    icon: <Trophy className="text-yellow-500" size={20}/>
  };

  return (
    <div className="px-6 py-8 space-y-8">
      {/* --- DAILY SECTION --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Daily Protocols</h3>
          <span className="text-[8px] font-bold text-cyan-500 italic">RESET IN 14H</span>
        </div>

        {dailyTasks.map((task, i) => (
          <div key={i} className="bg-zinc-900/40 border border-white/5 p-5 rounded-[30px] flex items-center justify-between active:scale-95 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-black rounded-2xl border border-white/5">{task.icon}</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-tight">{task.label}</p>
                <p className="text-[8px] font-bold text-cyan-500 mt-1 italic">+{task.reward}</p>
              </div>
            </div>
            <span className="text-[10px] font-black italic text-zinc-600">{task.progress}%</span>
          </div>
        ))}
      </div>

      {/* --- 🔥 WEEKLY CHALLENGE NODE (FB CLONE STYLE) --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-yellow-600">Weekly Mega Challenge</h3>
          <div className="flex items-center gap-1 text-[8px] font-bold text-zinc-500">
             <Zap size={10}/> {weeklyChallenge.daysLeft} DAYS LEFT
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 p-6 rounded-[35px] relative overflow-hidden group">
          <div className="flex items-center gap-5 relative z-10">
            <div className="p-4 bg-yellow-500 rounded-2xl text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              {weeklyChallenge.icon}
            </div>
            <div className="flex-1">
              <p className="text-xs font-black uppercase italic tracking-tight">{weeklyChallenge.label}</p>
              <p className="text-[9px] font-bold text-yellow-500 mt-1 italic">BIG REWARD: {weeklyChallenge.reward}</p>
              
              {/* Progress Bar */}
              <div className="mt-4 w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 transition-all duration-1000" 
                  style={{ width: `${weeklyChallenge.progress}%` }}
                />
              </div>
            </div>
          </div>
          {/* Background Decorative Text */}
          <span className="absolute -right-4 -bottom-2 text-4xl font-black italic opacity-[0.03] select-none tracking-tighter">ELITE</span>
        </div>
      </div>
    </div>
  );
}
