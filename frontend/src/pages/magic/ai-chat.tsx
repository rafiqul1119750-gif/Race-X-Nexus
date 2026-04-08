import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, Bot, User, Stars } from "lucide-react";
import { useLocation } from "wouter";

export default function AiChat() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello Creator. I am Nexus Neural. How can we innovate today?' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    
    // Real Logic: Call Appwrite Function (Gemini Proxy)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: "Analyzing your request through Nexus Core..." }]);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-4 flex items-center gap-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <ArrowLeft onClick={() => setLocation("/magic/main")} className="active:scale-75 transition-all" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
            <Stars size={16} className="text-black" />
          </div>
          <span className="font-black italic uppercase tracking-tighter">Neural Chat v4</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom duration-500`}>
            <div className={`max-w-[80%] p-4 rounded-[28px] ${m.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-zinc-900 text-zinc-300 rounded-tl-none border border-white/5'}`}>
              <p className="text-sm font-medium leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-zinc-950/50 backdrop-blur-2xl">
        <div className="relative flex items-center">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything to Nexus..."
            className="w-full bg-zinc-900 border border-white/10 rounded-full py-4 pl-6 pr-16 text-xs font-bold outline-none focus:border-purple-500 transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 p-3 bg-purple-500 text-black rounded-full active:scale-75 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
