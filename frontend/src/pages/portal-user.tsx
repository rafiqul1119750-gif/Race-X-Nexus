import { motion } from 'framer-motion';
import { 
  TrendingUp, Star, Zap, Award, 
  BarChart, Clock, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UserPortal = () => {
  const { user, diamonds } = useAppContext();

  // Mock Insights (Real app mein Appwrite functions se calculate honge)
  const insights = [
    { label: 'Profile Views', value: '1,284', change: '+12%', icon: <BarChart className="text-blue-400" /> },
    { label: 'AI Creations', value: '42', change: 'This Month', icon: <Star className="text-yellow-400" /> },
    { label: 'Diamond Earned', value: '850', change: '+150', icon: <Zap className="text-primary" /> },
  ];

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* --- User Welcome Banner --- */}
      <section className="relative p-6 rounded-[2.5rem] bg-gradient-to-br from-secondary/80 to-black border border-white/10 overflow-hidden">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center">
             <Award className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">Creator Portal</h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Level 2: Rising Star</p>
          </div>
        </div>
        {/* Decorative Glow */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      </section>

      {/* --- Quick Insights Grid --- */}
      <div className="grid grid-cols-1 gap-4">
        {insights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 bg-secondary/10 border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/10 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{item.label}</p>
                  <p className="text-xl font-black">{item.value}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-bold">
                  {item.change}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* --- Account Status & Verification --- */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Account Security</h3>
        <Card className="p-5 bg-secondary/20 border-white/10 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-400" />
                <span className="text-sm font-bold">Identity Verified</span>
             </div>
             <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between opacity-50">
             <div className="flex items-center gap-3">
                <Clock className="text-gray-400" />
                <span className="text-sm font-bold">Two-Factor Auth</span>
             </div>
             <button className="text-[10px] font-black text-primary underline">ENABLE</button>
          </div>
        </Card>
      </section>

      {/* --- Creator Tasks / Monetization --- */}
      <Card className="p-6 bg-primary text-black rounded-[2.5rem] shadow-[0_20px_40px_rgba(var(--primary),0.2)]">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-black leading-tight">Monetization<br/>Program</h3>
            <p className="text-[10px] font-bold mt-2 uppercase opacity-80 italic">Earn real cash from Diamonds</p>
          </div>
          <TrendingUp size={32} strokeWidth={3} />
        </div>
        <Button className="w-full mt-6 bg-black text-white hover:bg-gray-900 rounded-2xl font-black h-12 shadow-xl">
          Apply Now <ChevronRight size={18} className="ml-1" />
        </Button>
      </Card>
    </div>
  );
};

export default UserPortal;
