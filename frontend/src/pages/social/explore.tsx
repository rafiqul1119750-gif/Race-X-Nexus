import React, { useState } from 'react';
import { Search, TrendingUp, Play, Image as ImageIcon, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialExplore = () => {
  const [activeTab, setActiveTab] = useState("Trending");

  // 🔍 Trending Nodes from Diagram
  const tags = ["#RaceX", "#AI_Magic", "#Cyberpunk", "#Gaming", "#MusicSync", "#Crypto"];

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      
      {/* 🔍 Search Bar Node */}
      <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md pt-4 pb-2">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search Creators, Magic, or Studios..." 
            className="w-full bg-zinc-900/50 border border-zinc-800 p-4 pl-12 rounded-2xl focus:border-cyan-500/50 outline-none transition-all text-sm font-bold tracking-tight"
          />
        </div>

        {/* 🔍 Trending Tags Scroller */}
        <div className="flex gap-3 overflow-x-auto py-4 hide-scrollbar">
          {tags.map((tag) => (
            <button 
              key={tag}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black text-zinc-400 whitespace-nowrap hover:border-cyan-500 hover:text-cyan-400 transition-all uppercase tracking-widest"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 🔍 Featured Trending Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <h2 className="text-[11px] font-black tracking-[0.3em] uppercase italic">Hot This Week</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Main Large Card */}
          <div className="col-span-2 h-48 bg-zinc-900 rounded-[24px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="bg-cyan-500 text-black text-[8px] font-black px-2 py-1 rounded-full uppercase mb-2 inline-block">Featured AI</span>
              <h3 className="text-lg font-black italic tracking-tighter uppercase leading-none">New Cyber-Studio Live</h3>
            </div>
            <div className="w-full h-full bg-zinc-800 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 🔍 Content Grid (The Masonry Layout) */}
      <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            key={i} 
            className={`bg-zinc-900 relative group cursor-pointer ${i % 7 === 0 ? 'col-span-2 row-span-2 h-80' : 'h-40'}`}
          >
            {/* Icons to show content type */}
            <div className="absolute top-2 right-2 z-10 opacity-60 group-hover:opacity-100 transition-opacity">
              {i % 2 === 0 ? <Play className="w-4 h-4 text-white" /> : <ImageIcon className="w-4 h-4 text-white" />}
            </div>
            
            {/* Content Placeholder */}
            <div className="w-full h-full bg-zinc-800 border-[0.5px] border-black/20 group-hover:bg-zinc-700 transition-colors" />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <Hash className="w-6 h-6 text-cyan-400" />
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default SocialExplore;
