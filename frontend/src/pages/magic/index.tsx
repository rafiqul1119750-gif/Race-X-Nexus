import React, { useState } from 'react';
import { NexusCore } from '../../lib/nexus-core';

export default function MagicChat() {
  const [msgs, setMsgs] = useState([{ r: 'ai', t: 'Race-X Intelligence Online. Command me.' }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input; setInput("");
    setMsgs([...msgs, { r: 'user', t: userText }]);
    setLoading(true);
    const reply = await NexusCore.askGemini(userText);
    setMsgs(prev => [...prev, { r: 'ai', t: reply }]);
    setLoading(false);
  };

  return (
    <div className="h-screen bg-[#050505] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.r === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl max-w-[85%] text-sm ${m.r === 'user' ? 'bg-[#00F2FF] text-black font-bold' : 'bg-white/5 border border-white/10 text-white'}`}>
              {m.t}
            </div>
          </div>
        ))}
        {loading && <p className="text-[10px] text-[#00F2FF] animate-pulse">THINKING...</p>}
      </div>
      <div className="p-4 bg-black border-t border-white/10 flex gap-2">
        <input className="flex-1 bg-white/5 p-4 rounded-xl outline-none text-white" value={input} onChange={e => setInput(e.target.value)} placeholder="Type command..." />
        <button onClick={handleSend} className="bg-[#00F2FF] px-6 rounded-xl text-black font-bold">SEND</button>
      </div>
    </div>
  );
}
