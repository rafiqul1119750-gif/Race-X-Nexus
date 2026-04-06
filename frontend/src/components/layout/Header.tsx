import { useNavigate } from 'react-router-dom';
import { Zap, Bell, Search, UserCircle } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const { diamonds, user } = useAppContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/60 backdrop-blur-xl border-b border-white/5 px-4 flex items-center justify-between">
      {/* --- Left: App Logo --- */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
      >
        <div className="bg-primary p-1.5 rounded-lg shadow-[0_0_15px_rgba(var(--primary),0.4)]">
          <Zap size={18} className="text-black fill-current" />
        </div>
        <span className="text-lg font-black tracking-tighter italic">RACE-X</span>
      </motion.div>

      {/* --- Right: Wallet & Notifications --- */}
      <div className="flex items-center gap-3">
        {/* Diamond Counter (Clickable to go to Shop) */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/shop')}
          className="bg-secondary/40 border border-white/10 pl-2 pr-3 py-1 rounded-full flex items-center gap-2 cursor-pointer hover:bg-secondary/60 transition-colors"
        >
          <div className="bg-primary/20 p-1 rounded-full">
            <Zap size={14} className="text-primary fill-primary" />
          </div>
          <span className="text-sm font-black text-primary">{diamonds ?? 0}</span>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white rounded-full">
            <Search size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white rounded-full">
            <Bell size={20} />
            {/* Notification Dot */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-background"></span>
          </Button>
          
          {/* User Mini Avatar (Goes to Profile) */}
          <button 
            onClick={() => navigate('/profile')}
            className="ml-1 w-8 h-8 rounded-full border-2 border-white/10 overflow-hidden active:scale-90 transition-transform"
          >
            <img 
              src={user?.prefs?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=RaceX"} 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
