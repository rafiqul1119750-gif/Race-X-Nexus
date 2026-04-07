import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Settings, Grid, Bookmark, Zap, 
  ChevronRight, Wallet, Award, Share2, Plus
} from 'lucide-react';

const SocialProfile = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('posts');

  // 💎 Wallet Stats Node from Diagram
  const stats = {
    diamonds: "1,250",
    gems: "42.5",
    followers: "124K",
    following: "850"
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      
      {/* 👤 Top Header Node */}
      <header className="flex justify-between items-center p-6 pt-10">
        <h2 className="text-[10px] font-black text-zinc-500 tracking-[0.4em] uppercase italic">Nexus Identity</h2>
        <div className="flex gap-4">
          <button className="p-2 bg-zinc-900 rounded-full border border-zinc-800"><Share2 className="w-5 h-5 text-zinc-400" /></button>
          <button className="p-2 bg-zinc-900 rounded-full border border-zinc-800"><Settings className="w-5 h-5 text-zinc-400" /></button>
        </div>
      </header>

      {/* 👤 Profile Info Node */}
      <div className="px-6 flex flex-col items-center">
        <div className="relative">
          <div className="w-28 h-28 rounded-[40px] bg-gradient-to-tr from-cyan-500 to-purple-500 p-[2px] shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <div className="w-full h-full bg-black rounded-[38px] overflow-hidden border-4 border-black">
              <img src="https://placehold.co/400x400/111/fff?text=USER" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-cyan-500 rounded-2xl border-4 border-black">
            <Plus className="w-4 h-4 text-black stroke-[4]" />
          </button>
        </div>

        <h1 className="mt-6 text-2xl font-black tracking-tighter italic uppercase underline underline-offset-8 decoration-cyan-500/30">Ace Pilot</h1>
        <p className="text-[10px] text-zinc-500 font-bold mt-3 tracking-widest">@ace_nexus_01</p>
        
        {/* Bio */}
        <p className="mt-4 text-xs text-zinc-400 font-medium text-center px-10 leading-relaxed uppercase tracking-tight">
          Creating Magic in the Race-X Studio. 🚀 | AI Enthusiast | Digital Nomad
        </p>
      </div>

      {/* 💎 Wallet & Monetization Node (The "Diamond" System) */}
      <div className="px-6 mt-8">
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-[32px] p-6 flex items-center justify-between shadow-2xl">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">Nexus Wallet</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black">{stats.diamonds}</span>
              <span className="text-[9px] font-black text-zinc-600 uppercase">Diamonds</span>
            </div>
          </div>

          <div className="h-10 w-[1px] bg-zinc-800" />

          <div className="flex flex-col gap-1 text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-[10px] font-black text-purple-400 tracking-widest uppercase">Gems</span>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-baseline gap-2 mt-1 justify-end">
              <span className="text-2xl font-black">{stats.gems}</span>
              <span className="text-[9px] font-black text-zinc-600 uppercase">Tokens</span>
            </div>
          </div>
        </div>
        
        {/* Withdraw/Recharge Button */}
        <button className="w-full mt-3 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center justify-center gap-2 group hover:bg-white transition-all">
          <Wallet className="w-4 h-4 text-zinc-500 group-hover:text-black" />
          <span className="text-[10px] font-black text-zinc-500 group-hover:text-black uppercase tracking-widest">Manage Finances & Diamonds</span>
          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-black" />
        </button>
      </div>

      {/* 📊 Stats Bar */}
      <div className="flex justify-around mt-8 px-6">
        <div className="text-center">
          <h4 className="text-lg font-black">{stats.followers}</h4>
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Followers</p>
        </div>
        <div className="text-center">
          <h4 className="text-lg font-black">{stats.following}</h4>
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Following</p>
        </div>
        <div className="text-center">
          <h4 className="text-lg font-black">2.4M</h4>
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Likes</p>
        </div>
      </div>

      {/* 🖼️ Tabs Node */}
      <div className="flex mt-10 border-t border-zinc-900">
        <button 
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-4 flex justify-center ${activeTab === 'posts' ? 'border-t-2 border-white text-white' : 'text-zinc-600'}`}
        >
          <Grid className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-4 flex justify-center ${activeTab === 'saved' ? 'border-t-2 border-white text-white' : 'text-zinc-600'}`}
        >
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Grid Content Placeholder */}
      <div className="grid grid-cols-3 gap-[1px]">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-square bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer border-[0.5px] border-black" />
        ))}
      </div>

    </div>
  );
};

export default SocialProfile;
