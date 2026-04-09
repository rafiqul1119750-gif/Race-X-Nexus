import { ArrowLeft, Send, Sparkles, Mic, Zap, Terminal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

export default function NeuralChat() {
  const [, setLocation] = useLocation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    // Asli API Logic - HuggingFace Connector
    try {
      const hfKey = localStorage.getItem("api_hugging");
      
      // Agar API key nahi hai, to simulated response dikhayega
      if (!hfKey) {
        setTimeout(() => {
          setMessages(prev => [...prev, { role: "ai", content: "Error: API Key Missing. Please update Nexus API Console." }]);
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
      const aiResponse = result[0]?.generated_text || "Node successfully processed your command.";
      
      setMessages(prev => [...prev, { role: "ai", content: aiResponse.split(userMsg)[1] || aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", content: "Nexus Link Interrupted. Retry connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-6 font-sans selection:bg-cyan-500/30">
      {/* Dynamic Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/magic")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75 transition-all border border-white/5">
            <ArrowLeft size={20} className="text-cyan-400" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-2">
              <Terminal size={16} className="text-cyan-400" /> Neural Link
            </h1>
            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.3em]">Encrypted Node 01</span>
          </div>
        </div>
        <div className="px-4 py-2 bg-zinc-900/50 border border-cyan-500/20 rounded-full flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
          <span className="text-[8px] font-black uppercase text-cyan-500">Online</span>
        </div>
      </header>

      {/* Chat History Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-4 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center opacity-20">
            <Sparkles size={80} className="mb-4 text-cyan-400" />
            <p className="text-[10px] uppercase font-black tracking-[0.5em]">Waiting for Command...</p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-[30px] ${
                m.role === 'user' 
                ? 'bg-cyan-600 text-black font-bold rounded-tr-none' 
                : 'bg-zinc-900 border border-white/5 text-zinc-200 rounded-tl-none'
              }`}>
                <p className="text-xs leading-relaxed">{m.content}</p>
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 p-5 rounded-[30px] rounded-tl-none animate-pulse">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-50" />
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-20" />
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Controller - Every Pixel is a Hitbox */}
      <div className="relative mt-4 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative flex items-center gap-2">
          <button className="p-5 bg-zinc-900 rounded-full border border-white/5 active:scale-75 transition-all text-zinc-500 hover:text-cyan-400">
            <Mic size={20} />
          </button>
          
          <div className="relative flex-1">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              type="text" 
              placeholder="Ask Race-X AI Engine..." 
              className="w-full bg-zinc-900/80 border border-white/5 rounded-full py-6 px-8 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-zinc-700 placeholder:uppercase placeholder:text-[10px] placeholder:font-black pr-16" 
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full text-black hover:bg-cyan-400 active:scale-90 transition-all shadow-2xl"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
