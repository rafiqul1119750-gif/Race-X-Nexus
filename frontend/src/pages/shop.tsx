import { motion } from 'framer-motion';
import { Zap, CreditCard, Gift, ChevronRight, Star } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Badge from '@/components/ui/badge';

const Shop = () => {
  const { diamonds } = useAppContext();

  const diamondPacks = [
    { id: 1, amount: 100, price: '₹99', label: 'Starter Pack', icon: <Zap className="text-yellow-400" /> },
    { id: 2, amount: 500, price: '₹399', label: 'Most Popular', icon: <Star className="text-primary" />, popular: true },
    { id: 3, amount: 1200, price: '₹799', label: 'Best Value', icon: <Gift className="text-purple-400" /> },
    { id: 4, amount: 3000, price: '₹1599', label: 'Mega Bundle', icon: <Zap className="text-emerald-400" fill="currentColor" /> },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* --- Current Balance Header --- */}
      <section className="bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-3xl p-6 border border-white/10 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary/80">Your Balance</p>
          <div className="flex items-center gap-3 mt-1">
            <Zap className="w-8 h-8 text-primary fill-primary" />
            <h2 className="text-4xl font-black">{diamonds}</h2>
          </div>
          <p className="text-xs text-gray-400 mt-2">Use diamonds to unlock AI Studio & Premium Features</p>
        </div>
        <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
      </section>

      {/* --- Diamond Store Grid --- */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-tighter text-muted-foreground px-1">Diamond Store</h3>
        <div className="grid grid-cols-1 gap-4">
          {diamondPacks.map((pack) => (
            <motion.div 
              key={pack.id}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Card className={`p-5 flex items-center justify-between border-white/5 bg-secondary/20 backdrop-blur-xl hover:border-primary/30 transition-all ${pack.popular ? 'border-primary/50 bg-primary/5' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl">
                    {pack.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold">{pack.amount}</p>
                      <span className="text-xs font-medium text-gray-500">Diamonds</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">{pack.label}</p>
                  </div>
                </div>

                <div className="text-right">
                  {pack.popular && (
                    <Badge className="mb-2 bg-primary text-black font-black border-none text-[9px]">POPULAR</Badge>
                  )}
                  <Button size="sm" className="bg-white text-black hover:bg-primary hover:text-white font-bold rounded-xl px-5 h-10 flex items-center gap-2 shadow-lg transition-all">
                    {pack.price} <ChevronRight size={14} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Extra Options --- */}
      <section className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-secondary/10 border-white/5 flex flex-col items-center text-center space-y-2">
          <div className="p-2 bg-blue-500/10 rounded-full"><CreditCard className="text-blue-400 w-5 h-5" /></div>
          <p className="text-xs font-bold">Redeem Code</p>
        </Card>
        <Card className="p-4 bg-secondary/10 border-white/5 flex flex-col items-center text-center space-y-2">
          <div className="p-2 bg-purple-500/10 rounded-full"><Gift className="text-purple-400 w-5 h-5" /></div>
          <p className="text-xs font-bold">Daily Reward</p>
        </Card>
      </section>
    </div>
  );
};

export default Shop;
