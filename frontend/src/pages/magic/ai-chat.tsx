import { useState, useRef, useEffect } from "react";
import { 
  Send, ArrowLeft, Bot, User, Stars, Sparkles, 
  Mic, Image as ImageIcon, Paperclip, MoreVertical, 
  RefreshCcw, ShieldCheck, Zap 
} from "lucide-react";
import { useLocation } from "wouter";

// --- TYPES FOR REALTIME CHAT ---
type Message = {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'error';
};

export default function NeuralChat() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'bot', 
      text: 'Nexus Neural Online. I have access to Gemini 1.5 Pro. How can I assist your creation today?', 
      timestamp: new Date().toLocaleTimeString(),
      status: 'sent'
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- AUTO SCROLL LOGIC ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // --- REAL CHAT LOGIC (Connected to Appwrite/Gemini) ---
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Yahan aapka real Gemini API fetch call aayega via Appwrite Functions
      // const response = await callNexusAI(input); 
      
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: "Processing your request through Neural Layers... [Real Gemini Response Placeholder]",
          timestamp: new Date().toLocaleTimeString(),
          status: 'sent'
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      setIsTyping(false);
      alert("Nexus Link Interrupted.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans overflow-hidden">
      
      {/* --- PREMIUM AI HEADER --- */}
      <header className="p-4 flex items-center justify-between border-b border-white/5 bg-zinc-950/80 backdrop-blur-2xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/magic/main")} className="p-2.5 bg-zinc-900 rounded-2xl active:scale-75 transition-all">
            <ArrowLeft size={20} className="text-zinc-400" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <Bot size={22} className="text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase italic tracking-tighter">Neural Chat v4</h2>
              <div className="flex items-center gap-1">
                <ShieldCheck size={10} className="text-cyan-400" />
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">End-to-End Encrypted</span>
              </div>
            </div>
          </div>
        </div>
        <MoreVertical className="text-zinc-600" />
      </header>

      {/* --- MESSAGES AREA --- */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth no-scrollbar"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom duration-500`}>
            <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              
              <div className={`p-5 rounded-[30px] text-sm font-medium leading-relaxed shadow-2xl ${
                msg.role === 'user' 
                ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-tr-none' 
                : 'bg-zinc-900/80 backdrop-blur-md text-zinc-200 border border-white/5 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
              
              <div className="flex items-center gap-2 px-2">
                <span className="text-[8px] font-black text-zinc-600 uppercase">{msg.timestamp}</span>
                {msg.role === 'bot' && <Zap size={8} className="text-purple-500 fill-purple-500" />}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-zinc-900/50 p-4 rounded-[20px] border border-white/5">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- FUTURISTIC INPUT BAR --- */}
      <div className="p-6 bg-gradient-to-t from-black via-black to-transparent">
        <div className="max-w-4xl mx-auto relative group">
          
          {/* Quick Actions Above Input */}
          <div className="flex gap-2 mb-4">
             <QuickAction label="Image Gen" icon={<ImageIcon size={12}/>} color="border-pink-500/30 text-pink-400" />
             <QuickAction label="Code Nexus" icon={<Zap size={12}/>} color="border-cyan-500/30 text-cyan-400" />
          </div>

          <div className="relative flex items-center bg-zinc-900/80 backdrop-blur-3xl border border-white/10 rounded-[35px] p-2 pr-4 focus-within:border-purple-500/50 transition-all shadow-2xl">
            <button className="p-3 text-zinc-500 hover:text-purple-400 transition-colors">
              <Paperclip size={20} />
            </button>
            
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Nexus anything..."
              className="flex-1 bg-transparent py-4 px-2 text-xs font-bold outline-none placeholder:text-zinc-600 text-white"
            />

            <div className="flex items-center gap-2">
              <button className="p-3 text-zinc-500 hover:text-purple-400 active:scale-75 transition-all">
                <Mic size={20} />
              </button>
              <button 
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="p-4 bg-purple-500 text-black rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-90 transition-all disabled:opacity-50 disabled:grayscale"
              >
                <Send size={18} fill="black" />
              </button>
            </div>
          </div>

          <p className="text-center text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em] mt-4">
            Powered by Nexus Neural Engine v4.0
          </p>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ label, icon, color }: any) {
  return (
    <button className={`px-4 py-2 bg-zinc-900/50 border rounded-full flex items-center gap-2 text-[9px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all ${color}`}>
      {icon} {label}
    </button>
  );
}
