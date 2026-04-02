import { useState } from "react";
import { SplashScreen } from "./SplashScreen";
import { 
  Home, Search, PlusSquare, Play, MessageCircle, 
  Heart, User, Bell, Menu, Sparkles, Bookmark, Settings 
} from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) return <SplashScreen onFinish={() => setIsLoading(false)} />;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-20 lg:w-64 flex-col border-r border-white/10 h-screen sticky top-0 bg-black p-4">
        <div className="p-4 mb-8">
           <h1 className="text-2xl font-black italic tracking-tighter text-blue-500 hidden lg:block">RACE-X</h1>
           <h1 className="text-2xl font-black text-blue-500 lg:hidden">RX</h1>
        </div>
        <nav className="flex-1 space-y-2">
          <NavItem icon={<Home />} label="Home" active />
          <NavItem icon={<Search />} label="Explore" />
          <NavItem icon={<Play />} label="Reels" />
          <NavItem icon={<MessageCircle />} label="Messages" />
          <NavItem icon={<Bell />} label="Notifications" />
          <NavItem icon={<PlusSquare />} label="Create" />
          <NavItem icon={<Sparkles />} label="AI Studio" color="text-blue-400" />
          <NavItem icon={<User />} label="Profile" />
        </nav>
      </aside>

      {/* MAIN FEED AREA */}
      <main className="flex-1 bg-black overflow-y-auto pb-20 md:pb-0">
        <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur-md z-50">
          <span className="text-xl font-black italic text-blue-500">RACE-X</span>
          <div className="flex gap-5"><Heart size={24} /><MessageCircle size={24} /></div>
        </header>
        <div className="max-w-[600px] mx-auto w-full">{children}</div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-white/10 flex items-center justify-around z-50">
        <Home size={28} className="text-blue-500" />
        <Search size={28} />
        <PlusSquare size={28} />
        <Play size={28} />
        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/20" />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active = false, color = "text-zinc-400" }: any) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl cursor-pointer hover:bg-white/5 group transition-all">
      <span className={`${active ? 'text-white' : color} group-hover:scale-110 transition-transform`}>{icon}</span>
      <span className={`text-sm font-bold uppercase italic hidden lg:block ${active ? 'text-white' : 'text-zinc-500'}`}>{label}</span>
    </div>
  );
}
