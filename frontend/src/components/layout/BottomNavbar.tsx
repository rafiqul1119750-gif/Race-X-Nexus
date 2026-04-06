import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Sparkles, LayoutGrid, User, MessageSquare } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={22} />, path: '/', label: 'Home' },
    { icon: <LayoutGrid size={22} />, path: '/social', label: 'Feed' },
    { icon: <Sparkles size={24} />, path: '/studio', label: 'Studio', primary: true },
    { icon: <MessageSquare size={22} />, path: '/chat', label: 'Chat' },
    { icon: <User size={22} />, path: '/profile', label: 'You' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-2xl border-t border-white/5 px-6 flex items-center justify-between z-50">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${
            location.pathname === item.path ? 'text-primary' : 'text-gray-500'
          } ${item.primary ? 'bg-primary text-black p-3 rounded-2xl -mt-10 shadow-lg shadow-primary/20 border-4 border-background' : ''}`}
        >
          {item.icon}
          {!item.primary && <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
