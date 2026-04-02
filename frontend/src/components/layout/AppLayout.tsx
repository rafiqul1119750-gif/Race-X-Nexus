import { Link, useLocation } from "wouter";
import { Home, Video, Users, MessageSquare, Music, ShoppingBag } from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Home, label: "Hub" },
    { href: "/studio", icon: Video, label: "Studio" },
    { href: "/social", icon: Users, label: "Social" },
    { href: "/chat", icon: MessageSquare, label: "Chat" },
    { href: "/music", icon: Music, label: "Music" },
    { href: "/shop", icon: ShoppingBag, label: "Shop" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Main Content */}
      <main className="pb-28 pt-4 px-4 max-w-lg mx-auto">
        {children}
      </main>

      {/* Premium Glass Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md glass-card py-3 px-2 z-50">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a className="flex flex-col items-center gap-1 transition-all duration-300">
                  <item.icon 
                    size={22} 
                    className={`${isActive ? "text-blue-500 neon-glow" : "text-slate-500"}`} 
                  />
                  <span className={`text-[10px] font-medium ${isActive ? "text-blue-400" : "text-slate-600"}`}>
                    {item.label}
                  </span>
                </a>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
