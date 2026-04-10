import { ArrowLeft, Send, Sparkles, Bot, User, Cpu, Paperclip } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

// ✅ BUILD FIX: Render path updated from ../../../ to ../../
import { databases } from "../../lib/appwrite"; 

// ✅ Nexus Configuration
const DATABASE_ID = 'Race-X-Nexus';
const COLLECTION_ID = 'api_configs';

export default function MagicChat() {
  const [, setLocation] = useLocation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Race-X Neural Link Active. I am Gemini, how can I assist your creative process today?' }
  ]);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🛡️ 1. NEXUS ENGINE SYNC (Gemini Key Fetch)
  useEffect(() => {
    const fetchNexusKey = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const config = response.documents.find(doc => doc.service_name === 'GEMINI_AI');
        if (config) setApiKey(config.key_value);
      } catch (err) {
        console.error("Nexus Key Sync Failed");
      }
    };
    fetchNexusKey();
  }, []);

  // Auto Scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // 🤖 2. GEMINI API EXECUTION
  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }]
        })
      });

      const data = await res.json();
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const botResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      } else {
        throw new Error("Invalid Response");
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Neural Link Interrupted. Please check your Nexus API configuration." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75 transition-all">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
              Magic Chat <Sparkles size={16} className="text-cyan-400" />
            </h2>
            <p className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.3em]">
              {apiKey ? "Gemini 1.5 Flash Online" : "Nexus Syncing..."}
            </p>
          </div>
        </div>
        <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
          <Cpu size={18} className={`text-cyan-400 ${isTyping ? 'animate-pulse' : ''}`} />
        </div>
      </header>

      {/* Chat Space */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] p-5 rounded-[30px] flex gap-4 ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none shadow-[0_10px_30px_rgba(8,145,178,0.3)]' : 'bg-zinc-900/50 border border-white/5 rounded-tl-none'}`}>
              <div className="flex-shrink-0 mt-1">
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-cyan-400" />}
              </div>
              <p className="text-[13px] font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-zinc-900/50 p-5 rounded-[25px] flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-duration:0.8s]" />
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Field */}
      <div className="p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="bg-zinc-900/80 backdrop-blur-2xl border border-white/10 p-2 rounded-[35px] flex items-center gap-2 shadow-2xl">
          <button className="p-4 text-zinc-500 hover:text-white transition-colors">
            <Paperclip size={20} />
          </button>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your vision..."
            className="flex-1 bg-transparent border-none outline-none text-[11px] font-bold uppercase tracking-wider placeholder:text-zinc-600 px-2"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className={`p-4 bg-white text-black rounded-full active:scale-90 transition-all shadow-lg ${isTyping ? 'opacity-50' : 'hover:scale-105'}`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
