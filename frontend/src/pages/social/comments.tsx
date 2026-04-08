import { useLocation } from "wouter";
import { ArrowLeft, Send, MessageCircle } from "lucide-react";

export default function CommentsPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-screen bg-black text-white flex flex-col font-sans">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 border-b border-white/5 bg-zinc-900/20 backdrop-blur-xl">
        <ArrowLeft onClick={() => setLocation('/social/feed')} className="text-zinc-400 active:scale-75" />
        <div className="flex items-center gap-2">
          <MessageCircle size={16} className="text-cyan-400" />
          <h2 className="text-xs font-black uppercase tracking-widest">Nexus Discussion</h2>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[1px]">
            <div className="w-full h-full rounded-full bg-zinc-900" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black italic text-cyan-400 mb-1">@RaceX_Bot</p>
            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/50 p-3 rounded-2xl rounded-tl-none border border-white/5">
              Welcome to the first post on Race-X! This is a dedicated comment node.
            </p>
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div className="p-6 pb-10 bg-zinc-900/50 backdrop-blur-3xl border-t border-white/10">
        <div className="flex items-center gap-3 bg-black border border-white/10 p-2 rounded-2xl shadow-2xl">
          <input 
            type="text" 
            placeholder="Broadcast your thought..." 
            className="flex-1 bg-transparent px-4 py-2 outline-none text-xs font-bold"
          />
          <button className="bg-white text-black p-3 rounded-xl active:scale-90 transition-transform">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
