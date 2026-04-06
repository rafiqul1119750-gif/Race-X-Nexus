import { motion } from 'framer-motion';
import { Settings, Edit2, Grid, Bookmark, Share2, Zap, Heart } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

const Profile = () => {
  const { user, diamonds } = useAppContext();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');

  // Fake data for UI visualization (Baad mein Appwrite se aayega)
  const stats = [
    { label: 'Creations', count: '24' },
    { label: 'Followers', count: '1.2k' },
    { label: 'Following', count: '450' },
  ];

  return (
    <div className="space-y-6 pb-28">
      {/* --- Profile Header --- */}
      <header className="relative pt-6 flex flex-col items-center text-center">
        <div className="absolute top-0 right-0">
          <Button variant="ghost" size="icon" className="text-gray-400">
            <Settings size={22} />
          </Button>
        </div>

        {/* Avatar with Neon Glow */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative w-24 h-24 rounded-full border-4 border-background overflow-hidden bg-secondary">
            <img 
              src={user?.prefs?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=RaceX"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-primary text-black p-1.5 rounded-full border-2 border-background shadow-lg active:scale-90 transition-transform">
            <Edit2 size={12} fill="currentColor" />
          </button>
        </div>

        <h2 className="mt-4 text-xl font-black tracking-tight">{user?.name || "Premium Creator"}</h2>
        <p className="text-sm text-muted-foreground italic">@rx_{user?.$id?.slice(0, 5) || "nexus"}</p>
        
        <div className="flex items-center gap-2 mt-3 bg-white/5 px-4 py-1.5 rounded-2xl border border-white/10">
          <Zap className="w-4 h-4 text-primary fill-primary" />
          <span className="font-bold text-sm">{diamonds} Diamonds</span>
        </div>
      </header>

      {/* --- Stats Row --- */}
      <section className="flex justify-around py-4 border-y border-white/5">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-lg font-black">{stat.count}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* --- Action Buttons --- */}
      <div className="flex gap-3 px-2">
        <Button className="flex-1 rounded-xl font-bold h-12 bg-white text-black hover:bg-gray-200">
          Edit Profile
        </Button>
        <Button variant="secondary" className="rounded-xl font-bold h-12 px-5 border border-white/10">
          <Share2 size={18} />
        </Button>
      </div>

      {/* --- Content Tabs --- */}
      <div className="space-y-4">
        <div className="flex border-b border-white/5">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`flex-1 pb-3 flex items-center justify-center gap-2 transition-all ${activeTab === 'posts' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          >
            <Grid size={18} /> <span className="text-xs font-bold uppercase">My Work</span>
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`flex-1 pb-3 flex items-center justify-center gap-2 transition-all ${activeTab === 'saved' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          >
            <Bookmark size={18} /> <span className="text-xs font-bold uppercase">Saved</span>
          </button>
        </div>

        {/* --- Post Grid (Empty State / Mockup) --- */}
        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div 
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: item * 0.05 }}
              className="aspect-square bg-secondary/30 rounded-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart size={16} className="text-white fill-white" />
              </div>
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-purple-600/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
