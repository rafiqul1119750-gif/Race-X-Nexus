import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Globe, Sparkles, ShoppingBag, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation Items ki list
  const navItems = [
    { path: '/', icon: <Home size={24} />, label: 'Home' },
    { path: '/social', icon: <Globe size={24} />, label: 'Social' },
    { path: '/studio', icon: <Sparkles size={24} />, label: 'Studio', primary: true },
    { path: '/shop', icon: <ShoppingBag size={24} />, label: 'Shop' },
    { path: '/profile', icon: <User size={24} />, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 bg-gradient-to-t from-black via-black/90 to-transparent">
      <div className="max-w-md mx-auto bg-secondary/40 backdrop-blur-2xl border border-white/10 rounded-3xl h-16 flex items-center justify-around px-2 shadow-2xl relative">
        
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-center w-12 h-12 transition-all active:scale-90"
            >
              {/* Active Glow Effect */}
              {isActive && (
                <motion.div 
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
                />
              )}

              {/* Icon Logic */}
              <div className={`z-10 transition-colors duration-300 ${
                isActive ? 'text-primary' : 'text-gray-500'
              } ${item.primary ? 'p-2 bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]' : ''}`}>
                {item.icon}
              </div>

              {/* Label (Optional: Choti screen par hide kar sakte hain) */}
              <span className={`text-[10px] mt-1 font-bold z-10 transition-opacity ${
                isActive ? 'opacity-100 text-primary' : 'opacity-0'
              }`}>
                {item.label}
              </span>

              {/* Active Indicator Dot */}
              {isActive && (
                <motion.div 
                  layoutId="nav-dot"
                  className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_#fff]"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
