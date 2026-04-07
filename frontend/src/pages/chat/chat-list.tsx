import { useLocation } from "wouter";
import { ArrowLeft, Search, Plus, MessageSquare } from "lucide-react";

export default function ChatList() {
  const [, setLocation] = useLocation();
  const chats = [
    { id: 1, name: "Nexus AI", msg: "Processing your request...", time: "Now" },
    { id: 2, name: "Team Race-X", msg: "New update in Studio", time: "2m" }
  ];

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setLocation("/hub")} className="p-2 bg-zinc-900 rounded-full text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-black italic tracking-widest text-green-400">RX CHAT</h1>
        <Plus size={20} className="text-white" />
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-3.5 text-zinc-500 w-4 h-4" />
        <input placeholder="SEARCH MESSAGES" className="w-full bg-zinc-900/50 border border-white/5 p-4 pl-12 rounded-2xl text-[10px] outline-none" />
      </div>

      <div className="space-y-4">
        {chats.map(chat => (
          <div key={chat.id} className="p-5 bg-zinc-900/30 border border-white/5 rounded-[24px] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <MessageSquare className="text-green-400 w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold">{chat.name}</h3>
                <p className="text-[10px] text-zinc-500 mt-1">{chat.msg}</p>
              </div>
            </div>
            <span className="text-[8px] text-zinc-600 font-black uppercase">{chat.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
