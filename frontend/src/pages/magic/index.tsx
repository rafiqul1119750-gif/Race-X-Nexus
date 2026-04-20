import React, { useState, useRef, useEffect } from 'react';
import { NexusCore } from '../../lib/nexus-core';

export default function MagicChat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your AI assistant powered by Race-X Nexus. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      // Real Gemini API Call via NexusCore
      const aiResponse = await NexusCore.askGemini(userMessage);
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "System Error: Nexus link interrupted. Please check API keys." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      {/* Header - Exact Screenshot Style */}
      <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/50 backdrop-blur-xl sticky top-0 z-10">
        <div>
          <h2 className="text-[#00F2FF] font-black italic tracking-tighter text-lg uppercase">RX Magic Chat</h2>
          <p className="text-[8px] text-gray-500 tracking-[0.3em] uppercase">Neural Link Active</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[9px] font-bold">RACE-X OFFICIAL</p>
            <p className="text-[8px] text-[#00F2FF]">LEVEL 1002</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#00F2FF] text-black flex items-center justify-center font-black shadow-[0_0_15px_#00F2FF44]">R</div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
              msg.role === 'user' 
              ? 'bg-[#00F2FF] text-black font-bold shadow-[0_10px_20px_rgba(0,242,255,0.1)]' 
              : 'bg-white/[0.03] border border-white/10 text-gray-200'
            }`}>
              {msg.text}
            </div>
            <span className="text-[8px] mt-2 opacity-20 uppercase tracking-widest px-2">
              {msg.role === 'user' ? 'Sent' : 'Nexus AI'}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-[#00F2FF] rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-[#00F2FF] rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1 h-1 bg-[#00F2FF] rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input - Exact Screenshot Style */}
      <div className="p-5 pb-8 bg-gradient-to-t from-black to-transparent">
        <div className="bg-white/[0.05] border border-white/10 rounded-[2rem] p-2 flex items-center gap-2 backdrop-blur-2xl">
          <textarea 
            className="flex-1 bg-transparent p-4 outline-none text-sm h-14 resize-none placeholder:opacity-30"
            placeholder="Command the AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className="w-12 h-12 bg-[#00F2FF] text-black rounded-2xl flex items-center justify-center font-black text-xl hover:scale-95 transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] disabled:opacity-50"
          >
            🚀
          </button>
        </div>
        <p className="text-center text-[8px] mt-4 opacity-20 tracking-widest uppercase">
          Press Enter to send • Race-X Neural Engine v5.0
        </p>
      </div>
    </div>
  );
}
