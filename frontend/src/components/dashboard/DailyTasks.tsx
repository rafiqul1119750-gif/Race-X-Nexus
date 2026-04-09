import { Target, Trophy, Flame, Zap, CheckCircle2 } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";

export function NexusDailyTasks() {
  const { diamonds, setDiamonds, gems, setGems } = useAppContext();
  const [isClaimed, setIsClaimed] = useState(false);

  // --- 🛠️ DYNAMIC TASK STATES ---
  const dailyTasks = [
    { label: "Watch 5 Ads", reward: "1 Diamond", progress: 60, icon: <Target className="text-cyan-400" size={16}/> },
    { label: "Create 1 Studio Reel", reward: "200 Gems", progress: 0, icon: <Flame className="text-orange-500" size={16}/> },
  ];

  const weeklyChallenge = {
    label: "NEXUS ELITE: 50 SHARES",
    reward: 10, // 10 Diamonds
    progress: 100, // For testing, marked as complete
    daysLeft: 3,
    icon: <Trophy className="text-yellow-500" size={20}/>
  };

  // --- 💎 CLAIM PROTOCOL ---
  const handleWeeklyClaim = () => {
    if (weeklyChallenge.progress === 100 && !isClaimed) {
      const newTotal = diamonds + weeklyChallenge.reward;
      setDiamonds(newTotal);
      localStorage.setItem("rx-diamonds", newTotal.toString());
      setIsClaimed(true);
      
      // Nexus Alert System
      console.log("🛡️ Protocol Elite: 10 Diamonds Credited to Wallet");
    }
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

        <div className={`bg-gradient-to-br border p-6 rounded-[35px] relative overflow-hidden group transition-all duration-500 ${
          isClaimed ? 'from-green-500/10 border-green-500/20' : 'from-yellow-500/10 border-yellow-500/20'
        }`}>
          <div className="flex items-center gap-5 relative z-10">
            <div className={`p-4 rounded-2xl text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all ${
              isClaimed ? 'bg-green-500' : 'bg-yellow-500'
            }`}>
              {isClaimed ? <CheckCircle2 size={20}/> : weeklyChallenge.icon}
            </div>
            <div className="flex-1">
              <p className="text-xs font-black uppercase italic tracking-tight">
                {isClaimed ? "CHALLENGE COMPLETED" : weeklyChallenge.label}
              </p>
              <p className={`text-[9px] font-bold mt-1 italic ${isClaimed ? 'text-green-500' : 'text-yellow-500'}`}>
                {isClaimed ? "REWARD ADDED TO NEXUS" : `BIG REWARD: ${weeklyChallenge.reward} DIAMONDS`}
              </p>
              
              {/* Progress & Claim Logic */}
              {!isClaimed && (
                <>
                  <div className="mt-4 w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500 transition-all duration-1000" 
                      style={{ width: `${weeklyChallenge.progress}%` }}
                    />
                  </div>
                  
                  {weeklyChallenge.progress === 100 && (
                    <button 
                      onClick={handleWeeklyClaim}
                      className="mt-4 w-full py-3 bg-white text-black text-[10px] font-black uppercase italic rounded-xl active:scale-95 transition-all hover:bg-yellow-500"
                    >
                      Claim 10 Diamonds
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          {/* Background Decorative Text */}
          <span className="absolute -right-4 -bottom-2 text-4xl font-black italic opacity-[0.03] select-none tracking-tighter">
            {isClaimed ? "DONE" : "ELITE"}
          </span>
        </div>
      </div>
    </div>
  );
}
