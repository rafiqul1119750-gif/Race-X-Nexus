import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, Globe, Sparkles, MessageSquare, Music, ShoppingCart, 
  Settings, Bell, User, LogOut 
} from 'lucide-react';
import { Card } from '../components/ui/card';

const modules = [
  { id: 'studio', name: 'RX STUDIO', icon: Video, color: 'from-purple-500', path: '/studio', desc: 'Creator Studio' },
  { id: 'social', name: 'RX SOCIAL', icon: Globe, color: 'from-blue-500', path: '/social', desc: 'Social App' },
  { id: 'magic', name: 'RX MAGIC', icon: Sparkles, color: 'from-cyan-400', path: '/magic', desc: 'AI Tools' },
  { id: 'chat', name: 'RX CHAT', icon: MessageSquare, color: 'from-green-500', path: '/chat', desc: 'Messaging' },
  { id: 'music', name: 'RX MUSIC', icon: Music, color: 'from-pink-500', path: '/music', desc: 'Music System' },
  { id: 'shop', name: 'RX SHOP', icon: ShoppingCart, color: 'from-orange-500', path: '/shop', desc: 'Commerce' },
];

const RXMainHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />

      {/* Top Controls */}
      <div className="flex justify-between items-center mb-10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(0,242,255,0.3)]">
            RX
          </div>
          <h1 className="text-xl font-black tracking-tighter italic">NEXUS HUB</h1>
        </div>
        <div className="flex gap-4">
          <Bell className="w-6 h-6 text-zinc-400 cursor-pointer hover:text-white" />
          <Settings className="w-6 h-6 text-zinc-400 cursor-pointer hover:text-white" />
          <User className="w-6 h-6 text-zinc-400 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
        {modules.map((mod) => (
          <Card 
            key={mod.id}
            onClick={() => navigate(mod.path)}
            className="group relative bg-zinc-900/40 border-zinc-800/50 backdrop-blur-xl p-6 h-40 flex flex-col justify-between cursor-pointer hover:border-zinc-500 transition-all duration-300 active:scale-95"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
              <mod.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-black text-sm tracking-widest">{mod.name}</h2>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">{mod.desc}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-6 left-6 right-6 flex justify-between items-center text-[10px] text-zinc-600 font-mono border-t border-zinc-900 pt-4">
        <span>CORE ENGINE V1.0</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" /> SYSTEM ONLINE
        </span>
      </div>
    </div>
  );
};

export default RXMainHub;
