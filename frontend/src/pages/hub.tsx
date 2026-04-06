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
  shop: '#f59e0b'
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
    <div className="min-h-screen bg-black text-white p-4 pb-32 relative overflow-x-hidden">
      
      {/* 🖼️ Background Logo (Subtle center logo) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] w-[100%] pointer-events-none z-0">
          <img src="/images/rx-logo.png" alt="RX Background" className="w-full h-auto object-contain" />
      </div>
      
      {/* 🌌 Hero Banner Section (hero-bg.png) */}
      <div className="relative w-full h-56 rounded-3xl overflow-hidden mb-8 z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <img 
          src="/images/hero-bg.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover brightness-[0.7]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
            Welcome to<br />
            <span className="text-4xl text-cyan-400">Race-X World</span>
          </h1>
          <button className="mt-4 bg-white text-black font-black text-[10px] uppercase px-6 py-2 rounded-full tracking-widest active:scale-95 transition-transform">
            + New Project
          </button>
        </div>
      </div>

      {/* Grid: Studio, Magic, Social */}
      <div className="flex flex-col gap-4 relative z-10 mb-4">
        {moduleCards.slice(0, 3).map((mod) => (
          <Card 
            key={mod.id}
            onClick={() => navigate(mod.path)}
            style={{ backgroundColor: mod.color }}
            className="flex items-center justify-between px-6 py-4 rounded-2xl cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all h-[78px] border-none shadow-lg"
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
                {moduleCards[3].desc}
            </p>
        </div>
        <BookOpenText className="w-9 h-9 text-black stroke-[2.5]" />
      </Card>
      
      {/* RX Shop Card */}
      <Card 
        onClick={() => navigate('/shop')}
        style={{ backgroundColor: colors.shop }}
        className="flex items-center justify-between px-6 py-4 rounded-2xl cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all h-[78px] border-none relative z-10 shadow-md"
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
                className={`flex flex-col items-center gap-1 flex-1 transition-colors ${item.active ? 'text-cyan-400' : 'text-zinc-600'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[8px] font-black uppercase tracking-tighter">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default RXMainHub;
