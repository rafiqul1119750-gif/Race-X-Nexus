import React, { useState, useRef, useEffect } from 'react';

export default function MagicChat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Race-X Intelligence Active. How can I assist you, Boss?' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Real Gemini API Call
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_GEMINI_API_KEY`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }]
          })
        }
      );
      
      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "System Error: Connection to Nexus Lost." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col text-white">
      {/* Cinematic Header */}
      <div className="p-4 glass-strong border-b border-white/10 flex items-center gap-3">
        <div className="w-2 h-2 bg-[#00F2FF] rounded-full animate-pulse shadow-[0_0_10px_#00F2FF]"></div>
        <h2 className="text-sm font-black tracking-widest italic">MAGIC CHAT v5</h2>
      </div>

      {/* Real-time Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
              msg.role === 'user' 
              ? 'bg-[#00F2FF] text-black font-semibold' 
              : 'glass-strong border border-white/10 text-gray-200'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-[10px] text-[#00F2FF] animate-pulse">NEXUS IS THINKING...</div>}
        <div ref={chatEndRef} />
      </div>

      {/* Futuristic Input Bar */}
      <div className="p-4 pb-8 bg-[#050505]">
        <div className="glass-strong rounded-2xl p-2 flex items-center gap-2 border border-white/10">
          <input 
            className="flex-1 bg-transparent p-2 outline-none text-sm"
            placeholder="Talk to Race-X..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            className="bg-[#00F2FF] text-black h-10 w-10 rounded-xl flex items-center justify-center font-bold"
          >
            🚀
          </button>
        </div>
      </div>
    </div>
  );
}
