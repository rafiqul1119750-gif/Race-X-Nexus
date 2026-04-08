import { useState } from "react";
import { useLocation } from "wouter";
import { Search, ArrowLeft, TrendingUp, Grid } from "lucide-react";

export default function SearchPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      {/* Header with Search Input */}
      <div className="flex items-center gap-4 mb-8">
        <ArrowLeft onClick={() => setLocation('/social/feed')} className="text-zinc-400 active:scale-75" />
        <div className="flex-1 flex items-center gap-3 bg-zinc-900/80 border border-white/10 p-4 rounded-2xl shadow-xl">
          <Search size={18} className="text-cyan-400" />
          <input 
            type="text" 
            placeholder="Search Race-X Nexus..." 
            className="bg-transparent outline-none text-xs font-bold w-full placeholder:text-zinc-600"
          />
        </div>
      </div>

      {/* Trending Section */}
      <div className="mb-6 flex items-center gap-2">
        <TrendingUp size={14} className="text-purple-500" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Trending Now</span>
      </div>

      {/* Grid Placeholder */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="aspect-square bg-zinc-900 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-active:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}
