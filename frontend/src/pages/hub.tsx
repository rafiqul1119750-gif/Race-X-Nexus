import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Sparkles, 
  Globe, 
  BookOpenText, 
  ShoppingBag,
  Home,
  Video,
  Users,
  MessageSquare,
  Music,
  ShoppingBasket
} from 'lucide-react';
import { Card } from '../components/ui/card';

// screenshots ke colors
const colors = {
  studio: '#00e1ff',
  magic: '#00e1ff',
  social: '#ab47bc',
  media: 'linear-gradient(to right, #00e1ff, #ab47bc)',
  shop: '#ffa726' // Yellow for Shop
};

const moduleCards = [
  { id: 'studio', name: 'RX STUDIO', icon: Zap, color: colors.studio, path: '/studio' },
  { id: 'magic', name: 'RX MAGIC', icon: Sparkles, color: colors.magic, path: '/magic' },
  { id: 'social', name: 'RX SOCIAL', icon: Globe, color: colors.social, path: '/social' },
  { 
    id: 'media', 
    name: 'RX MEDIA LIBRARY', 
    icon: BookOpenText, 
    color: colors.media, 
    path: '/media',
    desc: '(MILLIONS OF INDIAN SONGS & VOICES)' 
  },
  { id: 'shop', name: 'RX SHOP', icon: ShoppingBag, color: colors.shop, path: '/shop' } // ADDED
];

const RXMainHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#000000] text-white p-5 pb-28 relative">
      {/* Background logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 w-[60%]">
          <img src="/rx-logo.png" alt="RX Logo Background" className="w-full h-auto" /> {/* Path adjustment */}
      </div>
      
      {/* Header (Screenshot se basic copy) */}
      <header className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <img src="/creator-avatar.png" alt="Creator Avatar" className="w-10 h-10 rounded-full border border-blue-500 shadow-blue" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-blue-400">Creator</h1>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
              <span>0 Diamonds</span>
              <span>0 Gems</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Hero Card (RACE-X: THE FUTURE...) */}
      <Card className="bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a] to-[#2d1b40] border-zinc-800/80 p-8 rounded-2xl mb-6 relative z-10">
        <div className="absolute top-1 right-1 opacity-20">
          <img src="/rx-logo.png" alt="RX Logo Overlay" className="w-8 h-8" /> {/* Path adjustment */}
        </div>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-tight mb-6 w-[80%]">
          RACE-X: THE FUTURE<br />OF CREATION
        </h2>
        <button className="bg-white text-black font-bold text-xs uppercase px-5 py-2.5 rounded-full hover:bg-zinc-200 active:scale-95 transition-all">
          + New Project
        </button>
      </Card>

      {/* Grid Modules */}
      <div className="grid grid-cols-1 gap-4 relative z-10 mb-6">
        {moduleCards.slice(0, 3).map((mod) => (
          <Card 
            key={mod.id}
            onClick={() => navigate(mod.path)}
            style={{ backgroundColor: mod.color, boxShadow: `0 0 15px 0 ${mod.color}50` }} // Basic shadow
            className="flex items-center justify-between px-6 py-5 rounded-xl cursor-pointer hover:brightness-110 active:scale-98 transition-all duration-300 h-20 border-none"
          >
            <h3 className="font-black text-2xl tracking-tighter uppercase italic text-black">
              {mod.name}
            </h3 >
            <mod.icon className="w-7 h-7 text-black" />
          </Card>
        ))}
      </div>

      {/* Media Library - Row card with description */}
      <Card 
        key={moduleCards[3].id}
        onClick={() => navigate(moduleCards[3].path)}
        style={{ background: colors.media, boxShadow: '0 0 15px 0 #00e1ff40, 0 0 15px 0 #ab47bc40' }} // Mixed shadow
        className="flex items-center justify-between px-6 py-4 rounded-xl cursor-pointer hover:brightness-110 active:scale-98 transition-all duration-300 h-24 mb-4 border-none relative z-10"
      >
        <div className="flex flex-col gap-0.5">
            <h3 className="font-black text-2xl tracking-tighter uppercase italic text-black">
                {moduleCards[3].name}
            </h3 >
            {moduleCards[3].desc && <p className="text-[10px] text-zinc-900 uppercase font-medium">{moduleCards[3].desc}</p>}
        </div>
        <moduleCards[3].icon className="w-8 h-8 text-black" />
      </Card>
      
      {/* ADDED: RX Shop Card */}
      <Card 
        key={moduleCards[4].id}
        onClick={() => navigate(moduleCards[4].path)}
        style={{ backgroundColor: colors.shop, boxShadow: `0 0 15px 0 ${colors.shop}50` }}
        className="flex items-center justify-between px-6 py-5 rounded-xl cursor-pointer hover:brightness-110 active:scale-98 transition-all duration-300 h-20 border-none relative z-10"
      >
        <h3 className="font-black text-2xl tracking-tighter uppercase italic text-black">
          {moduleCards[4].name}
        </h3 >
        <moduleCards[4].icon className="w-7 h-7 text-black" />
      </Card>


      {/* Bottom Navigation (Screenshot layout) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#000000]/80 backdrop-blur-md border-t border-zinc-900 p-4 z-20">
        <div className="flex items-center justify-around gap-2 max-w-sm mx-auto">
          {[
            { name: 'Hub', icon: Home, path: '/', active: true },
            { name: 'Studio', icon: Video, path: '/studio' },
            { name: 'Social', icon: Users, path: '/social' },
            { name: 'Chat', icon: MessageSquare, path: '/chat' },
            { name: 'Music', icon: Music, path: '/music' },
            { name: 'Shop', icon: ShoppingBasket, path: '/shop' },
          ].map((item) => (
            <button 
                key={item.name} 
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1.5 flex-1 ${item.active ? 'text-blue-400' : 'text-zinc-500'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium uppercase tracking-tighter">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default RXMainHub;
