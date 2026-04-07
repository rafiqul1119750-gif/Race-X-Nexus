import { useLocation } from "wouter";
import { Home, Play, ShoppingBag, User, Zap } from "lucide-react";
import { cn } from "../lib/utils";

const BottomNav = () => {
  const [location, setLocation] = useLocation();

  const navItems = [
    { icon: Home, path: "/hub", label: "Hub" },
    { icon: Play, path: "/social/feed", label: "Reels" },
    { icon: Zap, path: "/studio/editor", label: "Magic", primary: true },
    { icon: ShoppingBag, path: "/shop/products", label: "Shop" },
    { icon: User, path: "/social/profile", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 h-20 bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-[32px] flex items-center justify-around px-2 z-50 shadow-2xl">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => setLocation(item.path)}
          className="relative flex flex-col items-center justify-center p-2 transition-all group"
        >
          {item.primary ? (
            <div className="absolute -top-12 bg-white text-black p-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6 fill-black" />
            </div>
          ) : (
            <item.icon
              className={cn(
                "w-5 h-5 transition-colors",
                location === item.path ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,225,255,0.8)]" : "text-zinc-500"
              )}
            />
          )}
          {!item.primary && (
            <span className={cn(
              "text-[8px] font-black uppercase mt-1 tracking-widest",
              location === item.path ? "text-cyan-400" : "text-zinc-700"
            )}>
              {item.label}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
