import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, MonitorPlay, Users, MessageSquare, 
  Music, ShoppingCart, Settings, ArrowLeft, Bell,
  Play, Pause, FastForward, SkipBack, Bot
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useGetUserProfile, useGetEvents } from "@workspace/api-client-react";

export function AppLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { currentTrack, isPlaying, setIsPlaying, cartCount, showAiMentor, setShowAiMentor } = useAppContext();
  
  const { data: profile } = useGetUserProfile();
  const { data: events } = useGetEvents();
  
  const isGodMode = profile?.isGodMode || false;
  const liveEventCount = events?.liveCount || 0;

  const NAV_ITEMS = [
    { id: "/", icon: Home, label: "Hub" },
    { id: "/studio", icon: MonitorPlay, label: "Studio" },
    { id: "/social", icon: Users, label: "Social" },
    { id: "/chat", icon: MessageSquare, label: "Chat" },
    { id: "/music", icon: Music, label: "Music" },
    { id: "/shop", icon: ShoppingCart, label: "Shop", badge: cartCount },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      
      {/* Background animated elements */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-secondary/20 rounded-full blur-[150px]" />
      </div>

      {/* Global Header */}
      <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {location !== "/" && (
            <button 
              onClick={() => window.history.back()} 
              className="p-2 rounded-full hover:bg-white/10 transition-colors btn-ripple"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          )}
          <Link href="/">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            >
              <motion.img 
                src={`${import.meta.env.BASE_URL}images/rx-logo.png`} 
                alt="RX Logo" 
                className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(0,212,255,0.6)] group-hover:scale-110 transition-transform"
                animate={{ rotateY: [0, 360] }}
                transition={{ rotateY: { duration: 20, repeat: Infinity, ease: "linear" } }}
                style={{ transformStyle: "preserve-3d" }}
              />
              <span className="font-display font-bold text-xl tracking-widest text-glow hidden sm:block">RACE-X</span>
            </motion.div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/events">
            <div className="relative p-2 rounded-full hover:bg-white/10 cursor-pointer btn-ripple">
              <Bell className="w-5 h-5 text-white" />
              {liveEventCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-destructive rounded-full flex items-center justify-center text-[10px] font-bold animate-pulse">
                  {liveEventCount}
                </span>
              )}
            </div>
          </Link>
          
          <Link href="/profile">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 btn-ripple">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary overflow-hidden">
                {profile?.avatar ? <img src={profile.avatar} alt="Avatar" /> : <div className="w-full h-full" />}
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold font-display">{profile?.diamonds || 0} 💎</span>
              </div>
            </div>
          </Link>

          {isGodMode && (
            <Link href="/admin">
              <div className="p-2 rounded-full bg-primary/20 text-primary border border-primary/50 cursor-pointer hover:bg-primary/40 btn-ripple shadow-[0_0_10px_rgba(0,212,255,0.5)]">
                <Settings className="w-5 h-5 animate-[spin_4s_linear_infinite]" />
              </div>
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 pt-16 pb-24 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Music Player (Sticky Bottom above Nav) */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-[4.5rem] left-0 w-full z-40 px-4 py-2"
          >
            <div className="max-w-md mx-auto glass-panel-purple rounded-full flex items-center px-4 py-2 gap-3 shadow-[0_-5px_20px_rgba(157,78,221,0.2)]">
              <div className="w-10 h-10 rounded-full bg-muted border border-secondary/30 overflow-hidden flex-shrink-0 animate-[spin_4s_linear_infinite]" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
                <img src={currentTrack.coverUrl || "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=100&h=100&fit=crop"} alt="Cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-white">{currentTrack.title}</p>
                <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-white/70 hover:text-white"><SkipBack className="w-4 h-4" /></button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center hover:scale-110 transition-transform btn-ripple"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <button className="text-white/70 hover:text-white"><FastForward className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating AI Avatar (Bottom Right) */}
      <div className="fixed bottom-24 right-4 z-50">
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <button 
            onClick={() => setShowAiMentor(!showAiMentor)}
            className="w-14 h-14 rounded-full border-2 border-primary bg-background/80 shadow-[0_0_20px_rgba(0,212,255,0.4)] overflow-hidden hover:scale-110 transition-transform cursor-pointer relative btn-ripple"
          >
            <img src={`${import.meta.env.BASE_URL}images/avatar-ai.png`} alt="AI Mentor" className="w-full h-full object-cover" />
          </button>
        </motion.div>
        
        <AnimatePresence>
          {showAiMentor && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-16 right-0 w-64 glass-panel rounded-2xl p-4 mb-2 origin-bottom-right"
            >
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-sm text-glow">AI Mentor</h3>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Hi! I noticed you have unlocked a new template in RX Studio. Want to try it out for your next post?
              </p>
              <button 
                onClick={() => { setLocation('/studio'); setShowAiMentor(false); }}
                className="mt-3 w-full py-1.5 bg-primary/20 text-primary border border-primary/50 rounded hover:bg-primary/40 text-xs font-bold btn-ripple"
              >
                Go to Studio
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 glass-panel border-t border-white/5 pb-safe">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.id || (item.id !== "/" && location.startsWith(item.id));
            return (
              <Link key={item.id} href={item.id}>
                <div className="flex flex-col items-center justify-center w-14 h-14 relative cursor-pointer group btn-ripple">
                  <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/20 shadow-[0_0_15px_rgba(0,212,255,0.3)]' : 'group-hover:bg-white/5'}`}>
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-white'}`} />
                  </div>
                  <span className={`text-[10px] mt-1 font-display transition-colors ${isActive ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                    {item.label}
                  </span>
                  
                  {item.badge ? (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                  
                  {isActive && (
                    <motion.div layoutId="nav-indicator" className="absolute -bottom-1 w-8 h-1 bg-primary rounded-t-md shadow-[0_-2px_10px_rgba(0,212,255,1)]" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
