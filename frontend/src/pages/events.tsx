import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp, Search, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Leaderboard = () => {
  // Mock Data: Real app mein Appwrite se 'likes' ya 'diamonds' ke basis par query hoga
  const topCreators = [
    { id: 1, name: "Aryan AI", score: "12,450", rank: 1, avatar: "A" },
    { id: 2, name: "Nexus Queen", score: "10,200", rank: 2, avatar: "N" },
    { id: 3, name: "Cyber King", score: "9,800", rank: 3, avatar: "C" },
  ];

  const otherRankers = [
    { id: 4, name: "Rahul Dev", score: "8,500", rank: 4 },
    { id: 5, name: "AI Master", score: "7,900", rank: 5 },
    { id: 6, name: "Digital Nomad", score: "7,200", rank: 6 },
    { id: 7, name: "Future Bot", score: "6,500", rank: 7 },
  ];

  return (
    <div className="space-y-8 pb-32 pt-2">
      {/* --- Top 3 Podium Section --- */}
      <section className="flex justify-center items-end gap-2 pt-10 pb-6 relative overflow-hidden">
        {/* Rank 2 */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full border-4 border-slate-400 overflow-hidden bg-secondary mb-2">
             <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">N</div>
          </div>
          <div className="h-24 w-20 bg-gradient-to-t from-slate-400/20 to-slate-400/40 rounded-t-2xl flex flex-col items-center justify-center border-x border-t border-white/10">
            <span className="text-xl font-black text-slate-400">2</span>
            <p className="text-[8px] font-bold uppercase text-white/60">Silver</p>
          </div>
        </motion.div>

        {/* Rank 1 (The King) */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center z-10"
        >
          <Crown className="text-yellow-400 mb-1 animate-bounce" size={24} fill="currentColor" />
          <div className="w-20 h-20 rounded-full border-4 border-yellow-400 overflow-hidden bg-secondary mb-2 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
             <div className="w-full h-full flex items-center justify-center font-bold text-yellow-400 text-xl">A</div>
          </div>
          <div className="h-32 w-24 bg-gradient-to-t from-yellow-500/20 to-yellow-500/40 rounded-t-2xl flex flex-col items-center justify-center border-x border-t border-yellow-400/30">
            <span className="text-3xl font-black text-yellow-400">1</span>
            <p className="text-[10px] font-bold uppercase text-white">Winner</p>
          </div>
        </motion.div>

        {/* Rank 3 */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full border-4 border-amber-700 overflow-hidden bg-secondary mb-2">
             <div className="w-full h-full flex items-center justify-center font-bold text-amber-700">C</div>
          </div>
          <div className="h-20 w-20 bg-gradient-to-t from-amber-700/20 to-amber-700/40 rounded-t-2xl flex flex-col items-center justify-center border-x border-t border-white/10">
            <span className="text-xl font-black text-amber-700">3</span>
            <p className="text-[8px] font-bold uppercase text-white/60">Bronze</p>
          </div>
        </motion.div>
      </section>

      {/* --- Search & Filter Bar --- */}
      <div className="px-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search creators..." 
            className="w-full bg-secondary/20 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-primary/50 transition-all text-sm"
          />
        </div>
      </div>

      {/* --- Rankings List --- */}
      <section className="space-y-3 px-2">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1 flex items-center gap-2">
          <TrendingUp size={14} /> Global Rankings
        </h3>

        {otherRankers.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-4 bg-secondary/10 border-white/5 flex items-center justify-between group hover:bg-secondary/20 transition-all rounded-2xl">
              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-gray-500 w-4">{user.rank}</span>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <User size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-bold">{user.name}</p>
                  <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Level {10 - i}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-black text-primary">{user.score}</span>
                  <Trophy size={12} className="text-primary" />
                </div>
                <p className="text-[8px] text-gray-600 font-bold uppercase italic">Points Gained</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Leaderboard;
