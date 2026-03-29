import { Trophy, Medal, Target } from "lucide-react";
import { useGetLeaderboard } from "@workspace/api-client-react";

export default function Leaderboard() {
  const { data, isLoading } = useGetLeaderboard();

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const entries = data?.entries || [];

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <Target className="w-3 h-3" /> Season {data?.season || "1"}
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black text-glow mb-2">Global Ranking</h1>
        <p className="text-muted-foreground">Top creators across the ecosystem.</p>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden border-primary/20">
        {/* Table Header */}
        <div className="grid grid-cols-[3rem_1fr_auto_auto] sm:grid-cols-[4rem_1fr_100px_80px] gap-2 md:gap-4 p-4 md:p-5 border-b border-white/10 bg-black/40 text-xs font-bold text-muted-foreground uppercase tracking-widest">
          <div className="text-center">Rank</div>
          <div>Creator</div>
          <div className="text-right">Score</div>
          <div className="text-right hidden sm:block">Diamonds</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {entries.map((entry, i) => {
            const isTop3 = entry.rank <= 3;
            
            return (
              <div 
                key={entry.userId}
                className={`grid grid-cols-[3rem_1fr_auto_auto] sm:grid-cols-[4rem_1fr_100px_80px] gap-2 md:gap-4 p-4 md:p-5 items-center border-b border-white/5 hover:bg-white/5 transition-colors ${entry.userId === 'user1' ? 'bg-primary/10 border-l-4 border-l-primary' : ''}`}
              >
                <div className="text-center flex justify-center">
                  {entry.rank === 1 ? <Medal className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" /> : 
                   entry.rank === 2 ? <Medal className="w-6 h-6 text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.8)]" /> : 
                   entry.rank === 3 ? <Medal className="w-6 h-6 text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.8)]" /> : 
                   <span className="font-display font-bold text-muted-foreground">{entry.rank}</span>}
                </div>
                
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ${isTop3 ? 'border-2 border-primary shadow-[0_0_10px_rgba(0,212,255,0.5)]' : 'border border-white/10'}`}>
                    <img src={entry.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop"} alt={entry.username} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-bold truncate ${isTop3 ? 'text-white' : 'text-white/80'}`}>{entry.displayName || entry.username}</p>
                    <p className="text-[10px] text-muted-foreground truncate">@{entry.username} • {entry.faction}</p>
                  </div>
                </div>

                <div className="text-right font-display font-bold text-primary text-glow text-sm sm:text-base">
                  {entry.score.toLocaleString()}
                </div>

                <div className="text-right hidden sm:flex items-center justify-end gap-1 font-bold text-white/80 text-sm">
                  {entry.diamonds} <span className="text-[10px]">💎</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
