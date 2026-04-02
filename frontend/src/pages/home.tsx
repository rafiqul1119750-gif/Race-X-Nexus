import { Link } from "wouter";
import { Zap, Sparkles, Globe, Library, Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <section className="flex items-center gap-4 p-2">
        <div className="relative">
          <img 
            src="https://github.com/shadcn.png" 
            className="w-16 h-16 rounded-2xl border-2 border-blue-500/50 p-1"
            alt="Creator"
          />
          <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-lg px-1.5 py-0.5 text-[8px] font-bold shadow-[0_0_10px_rgba(37,99,235,0.8)]">
            LVL 1
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Welcome back, <span className="text-blue-500">Creator</span></h2>
          <div className="flex gap-3 mt-1">
            <span className="text-xs text-zinc-400 flex items-center gap-1">💎 0 Diamonds</span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">💠 0 Gems</span>
          </div>
        </div>
      </section>

      {/* Main Action Banner */}
      <section className="relative group overflow-hidden rounded-3xl aspect-[16/7] glass-card flex flex-col justify-end p-6 border-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
          alt="Studio Background"
        />
        <div className="relative z-20">
          <h1 className="text-3xl font-black italic tracking-tighter text-white leading-none mb-2">RACE-X: THE FUTURE<br/>OF CREATION</h1>
          <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-colors">
            <Plus size={14} /> NEW PROJECT
          </button>
        </div>
      </section>

      {/* Feature Grid - Neon Buttons Style */}
      <section className="grid grid-cols-1 gap-4">
        <Link href="/studio">
          <a className="group flex items-center justify-between p-5 rounded-2xl bg-cyan-400 text-black font-black italic tracking-tighter hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <span className="text-2xl uppercase">Studio</span>
            <Zap className="fill-black" size={28} />
          </a>
        </Link>

        <Link href="/chat">
          <a className="group flex items-center justify-between p-5 rounded-2xl bg-[#1A1A1A] text-cyan-400 border border-cyan-400/30 font-black italic tracking-tighter hover:bg-[#222] transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <span className="text-2xl uppercase italic">Magic</span>
            <Sparkles className="text-cyan-400" size={28} />
          </a>
        </Link>

        <Link href="/social">
          <a className="group flex items-center justify-between p-5 rounded-2xl bg-[#A855F7] text-white font-black italic tracking-tighter hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <span className="text-2xl uppercase italic">Social</span>
            <Globe className="text-white" size={28} />
          </a>
        </Link>

        <Link href="/music">
          <a className="group flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-cyan-400 to-[#A855F7] text-black font-black italic tracking-tighter hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <span className="text-2xl uppercase italic leading-none">Media Library <br/><span className="text-[10px] font-medium tracking-normal opacity-70">(Millions of Indian Songs & Voices)</span></span>
            <Library className="text-black" size={28} />
          </a>
        </Link>
      </section>
    </div>
  );
}
