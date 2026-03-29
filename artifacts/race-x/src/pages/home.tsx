import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  MonitorPlay, Users, MessageSquare, 
  Music, ShoppingCart, Trophy, Zap, Home as HomeIcon
} from "lucide-react";
import { useGetModules, useGetEvents, useGetUserProfile } from "@workspace/api-client-react";

const MODULE_ICONS: Record<string, React.ElementType> = {
  studio: MonitorPlay,
  social: Users,
  chat: MessageSquare,
  music: Music,
  shop: ShoppingCart,
  events: Trophy,
};

export default function Home() {
  const { data: modulesData, isLoading } = useGetModules();
  const { data: events } = useGetEvents();
  const { data: profile } = useGetUserProfile();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(0,212,255,0.5)]"></div>
      </div>
    );
  }

  const enabledModules = modulesData?.modules?.filter(m => m.enabled) || [];

  return (
    <div className="min-h-full px-4 pt-6 pb-20 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-6 rounded-3xl mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
            <div className="w-full h-full rounded-full bg-muted overflow-hidden">
              <img src={profile?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-glow">Welcome back, {profile?.displayName || 'Creator'}</h1>
            <div className="flex gap-3 mt-1 text-sm font-bold text-muted-foreground">
              <span className="text-white bg-white/10 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                <Zap className="w-3 h-3 text-primary" /> Lvl {profile?.level || 1}
              </span>
              <span className="flex items-center gap-1">{profile?.diamonds || 0} 💎</span>
              <span className="flex items-center gap-1">{profile?.gems || 0} 💠</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Event Ticker */}
      {events && events.liveCount > 0 && (
        <div className="mb-8 border border-destructive/30 bg-destructive/10 rounded-xl p-3 flex items-center gap-3 overflow-hidden shadow-[0_0_15px_rgba(255,0,0,0.15)]">
          <span className="bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse whitespace-nowrap tracking-wider">LIVE EVENT</span>
          <div className="flex-1 whitespace-nowrap overflow-hidden">
            <motion.div 
              animate={{ x: [0, -500] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="text-sm font-display text-destructive-foreground inline-block"
            >
              {events.events.filter(e => e.status === 'live').map(e => `${e.name} is happening right now! Jump in and participate! • `).join(' ')}
            </motion.div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end mb-6">
        <h2 className="text-3xl font-display font-black text-white text-glow tracking-wide uppercase">Nexus Hub</h2>
      </div>

      {/* Floating Cards Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {enabledModules.map((mod, i) => {
          const Icon = MODULE_ICONS[mod.id] || HomeIcon;
          const isPurple = i % 2 !== 0; // Alternate styles for visual interest
          
          return (
            <motion.div key={mod.id} variants={item}>
              <Link href={mod.path}>
                <motion.div 
                  whileHover={{ y: -10, scale: 1.02, rotateX: 5, rotateY: -5 }}
                  className={`relative block h-48 rounded-3xl p-6 cursor-pointer overflow-hidden ${isPurple ? 'glass-panel-purple' : 'glass-panel'} group`}
                  style={{ perspective: 1000 }}
                >
                  {/* Glowing background gradient */}
                  <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${isPurple ? 'from-secondary to-transparent' : 'from-primary to-transparent'}`} />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-2xl ${isPurple ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'} border border-white/10`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      {/* Fake live stat dot */}
                      <div className="flex items-center gap-1.5 bg-background/50 px-2 py-1 rounded-full border border-white/5 backdrop-blur-md">
                        <div className={`w-2 h-2 rounded-full ${isPurple ? 'bg-secondary' : 'bg-primary'} animate-pulse`} />
                        <span className="text-[10px] font-bold">Active</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-display font-bold ${isPurple ? 'group-hover:text-secondary text-glow-purple' : 'group-hover:text-primary text-glow'} transition-colors`}>{mod.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{mod.description}</p>
                    </div>
                  </div>
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-20 pointer-events-none" />
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
