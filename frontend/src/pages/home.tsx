import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, Globe, Wallet, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Badge from '@/components/ui/badge';

const Home = () => {
  const navigate = useNavigate();
  const { user, diamonds } = useAppContext();

  // Animations for a smooth mobile feel
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      className="space-y-6 pb-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* --- Top Banner (The Hub) --- */}
      <section className="relative h-48 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <img 
          src="/assets/hub-top.png" 
          alt="Race-X Hub" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
          <h1 className="text-2xl font-bold text-white tracking-tight">Race-X Nexus</h1>
          <p className="text-gray-300 text-sm">Next-Gen AI Creator Hub</p>
        </div>
      </section>

      {/* --- Quick Stats (Diamonds & Rank) --- */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-secondary/50 border-primary/20 backdrop-blur-md flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Diamonds</p>
            <p className="text-xl font-black text-primary">{diamonds ?? 0}</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            <Zap className="w-5 h-5 text-primary fill-primary" />
          </div>
        </Card>
        <Card className="p-4 bg-secondary/50 border-white/5 backdrop-blur-md flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Status</p>
            <p className="text-lg font-bold">Creator</p>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">Live</Badge>
        </Card>
      </div>

      {/* --- Main Navigation Grid --- */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground pl-1">The Studio</h2>
        <div className="grid grid-cols-3 gap-3">
          <MenuButton 
            icon={<Sparkles className="w-6 h-6 text-purple-400" />} 
            label="Studio" 
            onClick={() => navigate('/studio')} 
          />
          <MenuButton 
            icon={<ShoppingBag className="w-6 h-6 text-orange-400" />} 
            label="Market" 
            onClick={() => navigate('/shop')} 
          />
          <MenuButton 
            icon={<Globe className="w-6 h-6 text-blue-400" />} 
            label="Social" 
            onClick={() => navigate('/social')} 
          />
        </div>
      </section>

      {/* --- Featured Action Card --- */}
      <Card className="p-6 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-white/10 relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Create Your Avatar</h3>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Generate 100% accurate AI models with just a prompt.
          </p>
          <Button 
            onClick={() => navigate('/studio')}
            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-6 rounded-2xl shadow-xl transition-all active:scale-95"
          >
            Launch Rx-Studio
          </Button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="w-32 h-32 text-white" />
        </div>
      </Card>
    </motion.div>
  );
};

// Reusable Menu Component for clean code
const MenuButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-secondary/30 rounded-3xl border border-white/5 active:bg-primary/20 transition-colors space-y-2 group"
  >
    <div className="group-active:scale-110 transition-transform">{icon}</div>
    <span className="text-xs font-medium text-gray-300">{label}</span>
  </button>
);

export default Home;
