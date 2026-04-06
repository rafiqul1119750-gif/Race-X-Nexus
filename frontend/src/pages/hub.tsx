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

const colors = {
  studio: '#00e1ff',
  magic: '#00e1ff',
  social: '#ab47bc',
  media: 'linear-gradient(90deg, #00e1ff 0%, #ab47bc 100%)',
  shop: '#f59e0b' // RX Shop ke liye Bright Orange/Yellow
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
  { id: 'shop', name: 'RX SHOP', icon: ShoppingBag, color: colors.shop, path: '/shop' }
];

const RXMainHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-5 pb-32 relative overflow-x-hidden">
      
      {/* 🖼️ Background Logo (From Public Folder) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07] w-[120%] pointer-events-none">
          <img src="/logo.png" alt="RX Background" className="w-full h-auto object-contain" />
      </div>
      
      {/* Header Section */}
      <header className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400 p-0.5 shadow-[0_0_15px_rgba(0,225,255,0.4)]">
            <img src="/avatar.png" alt="Creator" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter text-cyan-400 italic">CREATOR</h1>
            <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-500 tracking-widest uppercase">
              <span>0 Diamonds</span>
              <span>0 Gems</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Banner Card */}
      <Card className="bg-[#111] border-zinc-800/50 p-8 rounded-3xl mb-8 relative z-10 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 opacity-10">
           <img src="/logo.png" alt="RX Icon" className="w-full h-full" />
        </div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-[0.9] mb-8">
          RACE-X:<br />THE FUTURE<br />OF CREATION
        </h2>
        <button className="bg-white text-black font-black text-[10px] uppercase px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all tracking-widest">
          + New Project
        </button>
      </Card>

      {/* Grid: Studio, Magic, Social */}
      <div className="flex flex-col gap-4 relative z-10 mb-4">
        {moduleCards.slice(0, 3).map((mod) => (
          <Card 
            key={mod.id}
            onClick={() => navigate(mod.path)}
            style={{ backgroundColor: mod.color }}
            className="flex items-center justify-between px-6 py-4 rounded-2xl cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all h-[75px] border-none shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <h3 className="font-black text-2xl tracking-tighter uppercase italic text-black">
              {mod.name}
            </h3>
            <mod.icon className="w-8 h-8 text-black stroke-[2.5]" />
          </Card>
        ))}
      </div>

      {/* Media Library Card */}
      <Card 
        onClick={() => navigate('/media')}
        style={{ background: colors.media }}
        className="flex items-center justify-between px-6 py-4 rounded-2xl cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all h-24 mb-4 border-none relative z-10"
      >
        <div className="flex flex-col">
            <h3 className="font-black text-2xl tracking-tighter uppercase italic text-black">
                RX MEDIA LIBRARY
            </h3>
            <p className="text-[9px] text-black/80 font-bold uppercase tracking-tight">
                (MILLIONS OF INDIAN SONGS & VOICES)
            </p>
        </div>
        <BookOpenText className="w-9 h-9 text-black stroke-[2.5]" />
      </Card>
      
      {/* RX Shop Card */}
      <Card 
        onClick={() => navigate('/shop')}
        style={{ backgroundColor: colors.shop }}
        className="flex items-center justify-between px-6 py-4 rounded-2xl cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all h-[75px] border-none relative z-10 shadow-[0_4px_20px_rgba(245,158,11,0.3)]"
      >
        <h3 className="font-black text-2xl tracking-tighter uppercase italic text-black">
          RX SHOP
        </h3>
        <ShoppingBag className="w-8 h-8 text-black stroke-[2.5]" />
      </Card>

      {/* Bottom Dock Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-zinc-900 p-4 z-50">
        <div className="flex items-center justify-between max-w-md mx-auto">
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
                className={`flex flex-col items-center gap-1 flex-1 transition-colors ${item.active ? 'text-cyan-400' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''}`} />
              <span className="text-[8px] font-black uppercase tracking-tighter">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default RXMainHub;
