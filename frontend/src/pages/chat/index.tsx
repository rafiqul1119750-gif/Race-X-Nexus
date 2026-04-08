import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Search, Camera, Edit3, Send } from "lucide-react";

export default function ChatPage() {
  const [, setLocation] = useLocation();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [msg, setMsg] = useState("");

  const chats = [
    { id: 1, name: "Aman AI", lastMsg: "Check out the new Race-X update!", time: "9:41 AM", online: true },
    { id: 2, name: "Sara Nexus", lastMsg: "Sent a photo", time: "Yesterday", online: false },
    { id: 3, name: "Race-X Team", lastMsg: "Welcome to the future.", time: "Monday", online: true }
  ];

  if (selectedChat) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <ArrowLeft onClick={() => setSelectedChat(null)} className="cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/50" />
            <span className="font-black italic text-sm uppercase">{selectedChat.name}</span>
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col justify-end gap-3 overflow-y-auto">
          <div className="bg-zinc-900 p-3 rounded-2xl rounded-bl-none max-w-[80%] text-xs">Bhai, chat system functional hai! 🚀</div>
          <div className="bg-cyan-500 text-black p-3 rounded-2xl rounded-br-none max-w-[80%] self-end text-xs font-bold">Ekdum professional look! 🏁</div>
        </div>
        <div className="p-4 flex items-center gap-3 bg-zinc-900/30">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 bg-zinc-900 border border-white/5 p-3 rounded-2xl text-xs outline-none focus:border-cyan-500" 
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <div className="p-3 bg-cyan-500 rounded-2xl text-black active:scale-90 transition-all"><Send size={18}/></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <ArrowLeft onClick={() => setLocation("/social/feed")} />
        <h1 className="font-black italic text-xl uppercase tracking-tighter text-cyan-400">Messages</h1>
        <Edit3 size={20} className="text-zinc-400" />
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
        <input type="text" placeholder="Search friends..." className="w-full bg-zinc-900/50 border border-white/5 p-3 pl-10 rounded-2xl text-xs outline-none" />
      </div>

      <div className="space-y-4">
        {chats.map(chat => (
          <div key={chat.id} onClick={() => setSelectedChat(chat)} className="flex items-center gap-4 p-2 active:bg-zinc-900 rounded-2xl transition-all cursor-pointer">
            <div className="relative">
              <div className="w-14 h-14 rounded-[20px] bg-zinc-800 border border-white/10" />
              {chat.online && <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-4 border-black rounded-full" />}
            </div>
            <div className="flex-1">
              <h3 className="font-black text-sm uppercase italic">{chat.name}</h3>
              <p className="text-[10px] text-zinc-500 truncate">{chat.lastMsg}</p>
            </div>
            <span className="text-[9px] text-zinc-600 font-bold">{chat.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
