import { ArrowLeft, Send, Sparkles, Mic, Zap, Bot, User, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

export default function MagicChat() {
  const [, setLocation] = useLocation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    try {
      const hfKey = localStorage.getItem("api_hugging");
      
      if (!hfKey) {
        setTimeout(() => {
          setMessages(prev => [...prev, { role: "ai", content: "Bhai, API Key missing hai. Admin Console mein jaakar HuggingFace Key update koro." }]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        {
          headers: { Authorization: `Bearer ${hfKey}`, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ inputs: userMsg }),
        }
      );
      
      const result = await response.json();
      const aiResponse = result[0]?.generated_text || "System Node online. Process complete.";
      
      setMessages(prev => [...prev, { role: "ai", content: aiResponse.split(userMsg)[1] || aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", content: "Connection lost. RX Protocol reconnecting..." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-cyan-500/30">
      
      {/* --- PREMIUM GEMINI HEADER --- */}
      <header className="p-6 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-2xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900/80 rounded-2xl active:scale-75 transition-all border border-white/5">
            <ArrowLeft size={18} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-md font-black uppercase italic tracking-tighter flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400" /> RX Magic Chat
            </h1>
            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.3em]">AI Engine v4.0 Active</span>
          </div>
        </div>
        <button onClick={clearChat} className="p-3 text-zinc-600 hover:text-red-400 transition-colors">
          <Trash2 size={18} />
        </button>
      </header>

      {/* --- CHAT AREA --- */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center space-y-4 pt-20">
            <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-[30px] flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-pulse">
              <Bot size={40} className="text-black" />
            </div>
            <div>
              <p className="text-lg font-black italic uppercase tracking-widest text-white">How can I help, Boss?</p>
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-1">RX Neural Link is ready for commands</p>
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                m.role === 'user' ? 'bg-cyan-500 border-cyan-400 text-black' : 'bg-zinc-900 border-white/10 text-cyan-400'
              }`}>
                {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`max-w-[80%] p-5 rounded-[28px] ${
                m.role === 'user' 
                ? 'bg-zinc-900 text-zinc-200 rounded-tr-none border border-white/5 shadow-xl' 
                : 'bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 text-zinc-200 rounded-tl-none border border-white/10'
              }`}>
                <p className="text-[13px] leading-relaxed font-medium">{m.content}</p>
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="flex gap-4 items-center animate-pulse">
            <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10">
              <Bot size={14} className="text-zinc-600" />
            </div>
            <div className="flex gap-1.5 p-4 bg-zinc-900/50 rounded-full">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-100" />
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* --- GEMINI-STYLE INPUT BAR --- */}
      <div className="p-6 bg-gradient-to-t from-black via-black to-transparent">
        <div className="relative max-w-4xl mx-auto flex items-center gap-3">
          <div className="relative flex-1 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[35px] blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-zinc-900/90 border border-white/10 rounded-[30px] pr-2 focus-within:border-cyan-500/50 transition-all">
              <button className="p-4 text-zinc-500 hover:text-cyan-400 transition-colors">
                <Mic size={20} />
              </button>
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                type="text" 
                placeholder="Message RX Magic..." 
                className="flex-1 bg-transparent py-5 px-2 text-sm focus:outline-none placeholder:text-zinc-600 placeholder:text-[11px] placeholder:font-bold placeholder:uppercase" 
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className={`p-4 rounded-[22px] transition-all ${
                  input.trim() ? 'bg-white text-black shadow-lg scale-100' : 'bg-zinc-800 text-zinc-600 scale-90'
                }`}
              >
                <Send size={18} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
        <p className="text-center text-[8px] font-bold text-zinc-700 uppercase tracking-[0.3em] mt-4">Powered by Race-X Neural Protocol</p>
      </div>
    </div>
  );
}
