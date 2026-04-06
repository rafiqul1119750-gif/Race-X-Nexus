import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, LayoutGrid, BarChart2, DollarSign, 
  Settings2, Wand2, ArrowUpRight, Share2 
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Badge from '@/components/ui/badge';

const CreatorPortal = () => {
  const { diamonds } = useAppContext();
  const [activeTab, setActiveTab] = useState('uploads');

  return (
    <div className="space-y-8 pb-32">
      {/* --- Creator Hero Section --- */}
      <section className="bg-gradient-to-tr from-primary/30 via-secondary/20 to-black p-6 rounded-[3rem] border border-white/10 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <Badge className="bg-primary text-black font-black">CREATOR PRO</Badge>
            <Settings2 className="text-gray-500" size={20} />
          </div>
          <h2 className="text-3xl font-black mt-4 leading-tight tracking-tighter">
            Design Your <br/> Legacy.
          </h2>
          <div className="flex gap-4 mt-6">
            <Button className="bg-white text-black font-bold rounded-2xl px-6 h-12 shadow-xl hover:bg-primary transition-all">
              <Plus className="mr-1 w-5 h-5" /> New Project
            </Button>
          </div>
        </div>
        <Wand2 className="absolute -right-6 -bottom-6 w-40 h-40 text-primary/10 -rotate-12" />
      </section>

      {/* --- Performance Overview --- */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5 bg-secondary/10 border-white/5 flex flex-col justify-between h-32">
          <div className="p-2 bg-blue-500/10 rounded-xl w-fit"><BarChart2 className="text-blue-400 w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-black">4.8k</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total Reach</p>
          </div>
        </Card>
        <Card className="p-5 bg-secondary/10 border-white/5 flex flex-col justify-between h-32">
          <div className="p-2 bg-emerald-500/10 rounded-xl w-fit"><DollarSign className="text-emerald-400 w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-black">₹2,450</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Est. Revenue</p>
          </div>
        </Card>
      </div>

      {/* --- Project Manager Tabs --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <LayoutGrid size={14} /> My Projects
          </h3>
          <button className="text-xs text-primary font-bold">Filter</button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {[1, 2].map((i) => (
            <motion.div 
              key={i}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Card className="p-4 bg-secondary/20 border-white/5 flex items-center gap-4 hover:border-primary/40 transition-all">
                <div className="w-16 h-16 bg-black rounded-2xl border border-white/10 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold">AI Cyberpunk Model_{i}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[9px] text-gray-500 flex items-center gap-1"><ArrowUpRight size={10} /> 1.2k Views</span>
                    <span className="text-[9px] text-primary flex items-center gap-1 font-bold"><Zap size={10} fill="currentColor" /> 120 Gained</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-500 group-hover:text-primary transition-colors">
                  <Share2 size={18} />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Promotion Card --- */}
      <Card className="p-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-white/10 rounded-[2.5rem] border-dashed border-2">
        <div className="text-center space-y-2">
          <h4 className="font-black text-lg text-purple-300 tracking-tight">Boost Your Reach</h4>
          <p className="text-[10px] text-gray-400 leading-relaxed font-medium">Get featured on the Race-X Home Screen for 50 Diamonds.</p>
          <Button className="mt-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold px-8 h-10 shadow-lg shadow-purple-900/50">
            Promote Now
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreatorPortal;
