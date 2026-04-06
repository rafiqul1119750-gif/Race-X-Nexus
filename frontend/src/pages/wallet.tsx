import { motion } from 'framer-motion';
import { 
  Zap, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  CreditCard, 
  PlusCircle, 
  TrendingUp 
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Wallet = () => {
  const { diamonds } = useAppContext();

  // Mock Data: Real App mein ye Appwrite Database se aayega
  const transactions = [
    { id: 1, type: 'spent', amount: 5, label: 'AI Image Gen', date: 'Aaj, 02:30 PM' },
    { id: 2, type: 'received', amount: 500, label: 'Pack Purchase', date: 'Kal, 11:15 AM' },
    { id: 3, type: 'spent', amount: 10, label: 'AI Video Gen', date: '2 Din pehle' },
    { id: 4, type: 'received', amount: 50, label: 'Daily Reward', date: '3 Din pehle' },
  ];

  return (
    <div className="space-y-6 pb-28">
      {/* --- Main Balance Card --- */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-[2.5rem] blur opacity-30"></div>
        <Card className="relative bg-black/60 border-white/10 p-8 rounded-[2.5rem] backdrop-blur-3xl overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Total Balance</p>
              <div className="flex items-center gap-2 mt-2">
                <Zap className="w-8 h-8 text-primary fill-primary" />
                <h2 className="text-5xl font-black tracking-tighter">{diamonds}</h2>
              </div>
            </div>
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
              <TrendingUp className="text-primary w-6 h-6" />
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <Button className="flex-1 bg-white text-black hover:bg-gray-200 font-bold rounded-2xl h-12">
              <PlusCircle className="mr-2 w-4 h-4" /> Add Money
            </Button>
            <Button variant="outline" className="flex-1 border-white/10 font-bold rounded-2xl h-12">
              Withdraw
            </Button>
          </div>

          {/* Decorative background circle */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        </Card>
      </motion.div>

      {/* --- Quick Actions --- */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-secondary/20 border-white/5 flex items-center gap-3 active:scale-95 transition-transform">
          <div className="p-2 bg-emerald-500/10 rounded-xl"><ArrowDownLeft className="text-emerald-400 w-5 h-5" /></div>
          <span className="text-xs font-bold uppercase">Received</span>
        </Card>
        <Card className="p-4 bg-secondary/20 border-white/5 flex items-center gap-3 active:scale-95 transition-transform">
          <div className="p-2 bg-rose-500/10 rounded-xl"><ArrowUpRight className="text-rose-400 w-5 h-5" /></div>
          <span className="text-xs font-bold uppercase">Spent</span>
        </Card>
      </div>

      {/* --- Transaction History --- */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <History size={16} /> Recent Activity
          </h3>
          <button className="text-xs text-primary font-bold">See All</button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <motion.div 
              key={tx.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: tx.id * 0.1 }}
            >
              <Card className="p-4 bg-secondary/10 border-white/5 flex items-center justify-between group hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${tx.type === 'received' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                    {tx.type === 'received' ? <ArrowDownLeft size={18} className="text-emerald-400" /> : <ArrowUpRight size={18} className="text-rose-400" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{tx.label}</p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black ${tx.type === 'received' ? 'text-emerald-400' : 'text-white'}`}>
                    {tx.type === 'received' ? '+' : '-'}{tx.amount}
                  </p>
                  <p className="text-[8px] text-gray-500 font-bold uppercase">Diamonds</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Wallet;
