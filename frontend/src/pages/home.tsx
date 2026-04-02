import { useState } from "react";
import { Sparkles, MessageSquare, Share2, Music, ShoppingBag, Heart, Play, Send } from "lucide-react";

export default function Home() {
  const [tab, setTab] = useState("social");

  return (
    <div className="flex flex-col min-h-screen bg-black pb-20">
      {/* HUB SELECTOR */}
      <div className="flex justify-around p-4 border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur-md z-50">
        <button onClick={() => setTab("social")} className={`p-2 ${tab === 'social' ? 'text-blue-500' : 'text-zinc-500'}`}><Share2 /></button>
        <button onClick={() => setTab("studio")} className={`p-2 ${tab === 'studio' ? 'text-blue-500' : 'text-zinc-500'}`}><Sparkles /></button>
        <button onClick={() => setTab("chat")} className={`p-2 ${tab === 'chat' ? 'text-blue-500' : 'text-zinc-500'}`}><MessageSquare /></button>
        <button onClick={() => setTab("music")} className={`p-2 ${tab === 'music' ? 'text-blue-500' : 'text-zinc-500'}`}><Music /></button>
        <button onClick={() => setTab("shop")} className={`p-2 ${tab === 'shop' ? 'text-blue-500' : 'text-zinc-500'}`}><ShoppingBag /></button>
      </div>

      <div className="p-4">
        {/* SOCIAL CONTENT */}
        {tab === "social" && (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="h-64 bg-zinc-900 rounded-[2rem] border border-white/5 flex items-center justify-center text-zinc-700 font-black italic uppercase">RX Social Feed</div>
             <div className="h-64 bg-zinc-900 rounded-[2rem] border border-white/5 flex items-center justify-center text-zinc-700 font-black italic uppercase">Next Post...</div>
          </div>
        )}

        {/* STUDIO CONTENT */}
        {tab === "studio" && (
          <div className="bg-zinc-900 p-6 rounded-[2rem] border border-blue-500/20 space-y-4 animate-in slide-in-from-bottom-4">
            <h2 className="text-xl font-black italic text-blue-400 uppercase">RX Studio</h2>
            <div className="h-40 bg-black/50 rounded-2xl border border-white/10 p-4 text-zinc-600">Enter prompt here...</div>
            <button className="w-full bg-blue-600 py-4 rounded-xl font-black italic uppercase">Generate (10 💎)</button>
          </div>
        )}

        {/* CHAT CONTENT */}
        {tab === "chat" && (
          <div className="h-[60vh] bg-zinc-950 border border-white/5 rounded-[2rem] p-4 flex flex-col justify-between">
            <div className="bg-blue-600/10 p-3 rounded-2xl w-fit text-sm border border-blue-500/20 text-blue-300">RX Magic Chat is online.</div>
            <div className="bg-white/5 p-3 rounded-full flex gap-3"><input className="bg-transparent flex-1 outline-none text-sm" placeholder="Type..." /><Send size={18}/></div>
          </div>
        )}

        {/* MUSIC & SHOP (Simple Placeholders) */}
        {(tab === "music" || tab === "shop") && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-black italic text-zinc-800 uppercase tracking-tighter">{tab} Coming Soon</h3>
          </div>
        )}
      </div>
    </div>
  );
}
