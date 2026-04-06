import { motion } from 'framer-motion';
import { Trophy, Timer, Gift, Star, ChevronRight, Users, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ui/ProgressBar';

const Event = () => {
  const activeEvents = [
    {
      id: 1,
      title: "Cyberpunk Art Challenge",
      prize: "5,000 Diamonds",
      timeLeft: "2 Din Baki",
      participants: "1.2k",
      status: "Live",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Daily Login Streak",
      prize: "50 Diamonds",
      timeLeft: "Aaj Tak",
      participants: "Aap + 5k Others",
      status: "Ongoing",
      gradient: "from-emerald-500 to-teal-700"
    }
  ];

  return (
    <div className="space-y-8 pb-32">
      {/* --- Featured Event Banner (Big) --- */}
      <section className="relative h-64 rounded-[3rem] overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt="Event Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full animate-pulse">LIVE NOW</span>
          </div>
          <h2 className="text-3xl font-black tracking-tighter leading-none">GRAND AI <br/> TOURNAMENT</h2>
          <p className="text-sm text-gray-300 mt-2 font-medium">Win a share of 50,000 Diamonds</p>
        </div>
      </section>

      {/* --- Event Stats / Leaderboard Shortcut --- */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-secondary/10 border-white/5 flex items-center gap-3">
          <Trophy className="text-yellow-500" size={24} />
          <div>
            <p className="text-lg font-black leading-none">#42</p>
            <p className="text-[9px] text-gray-500 uppercase font-bold">Your Rank</p>
          </div>
        </Card>
        <Card className="p-4 bg-secondary/10 border-white/5 flex items-center gap-3">
          <Star className="text-primary" size={24} />
          <div>
            <p className="text-lg font-black leading-none">120</p>
            <p className="text-[9px] text-gray-500 uppercase font-bold">Points</p>
          </div>
        </Card>
      </div>

      {/* --- Active Challenges List --- */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1 flex items-center gap-2">
          <Timer size={14} /> Active Challenges
        </h3>
        
        {activeEvents.map((event) => (
          <motion.div key={event.id} whileTap={{ scale: 0.98 }}>
            <Card className={`p-5 bg-gradient-to-r ${event.gradient} border-none relative overflow-hidden group`}>
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-black text-white">{event.title}</h4>
                    <p className="text-xs text-white/70 font-bold italic">Prize: {event.prize}</p>
                  </div>
                  <div className="bg-black/20 backdrop-blur-md p-2 rounded-xl text-white text-[10px] font-bold">
                    {event.timeLeft}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-white/60" />
                    <span className="text-[10px] text-white font-bold">{event.participants} Participating</span>
                  </div>
                  <Button className="bg-white text-black hover:bg-gray-200 rounded-xl font-black text-xs px-6">
                    JOIN
                  </Button>
                </div>
              </div>
              {/* Decorative shapes */}
              <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-white/10 rotate-12" />
            </Card>
          </motion.div>
        ))}
      </section>

      {/* --- Daily Tasks (Mini Events) --- */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Daily Quests</h3>
        <Card className="p-4 bg-secondary/20 border-white/5 space-y-4">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-3">
                <Gift className="text-primary" />
                <div>
                  <p className="text-sm font-bold">Create 3 AI Images</p>
                  <p className="text-[10px] text-gray-500">Progress: 1/3</p>
                </div>
             </div>
             <span className="text-xs font-black text-primary">+10 💎</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
             <div className="w-1/3 h-full bg-primary shadow-[0_0_10px_#fff]"></div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Event;
