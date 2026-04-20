import React, { useState } from 'react';
import { NexusCore } from '../../lib/nexus-core';

export default function MagicChat() {
  const [chat, setChat] = useState([{ role: 'ai', text: 'Race-X Online. State your command.' }]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSend = async () => {
    if (!msg.trim() || busy) return;
    const userMsg = msg;
    setChat(p => [...p, { role: 'user', text: userMsg }]);
    setMsg("");
    setBusy(true);

    try {
      const response = await NexusCore.askGemini(userMsg);
      setChat(p => [...p, { role: 'ai', text: response }]);
    } catch {
      setChat(p => [...p, { role: 'ai', text: "Signal Interrupted. Retry." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="h-screen bg-[#050505] flex flex-col p-4">
      <div className="flex-1 overflow-y-auto space-y-4 pb-20 pt-4">
        {chat.map((c, i) => (
          <div key={i} className={`flex ${c.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl text-sm max-w-[85%] ${c.role === 'user' ? 'bg-[#00F2FF] text-black' : 'bg-white/5 border border-white/10 text-white'}`}>
              {c.text}
            </div>
          </div>
        ))}
        {busy && <div className="text-[#00F2FF] text-[10px] animate-pulse uppercase">Race-X is thinking...</div>}
      </div>

      <div className="fixed bottom-6 left-4 right-4 bg-white/5 border border-white/10 p-2 rounded-2xl flex backdrop-blur-xl">
        <input 
          className="flex-1 bg-transparent p-3 outline-none text-white text-sm"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Command the AI..."
        />
        <button onClick={handleSend} className="bg-[#00F2FF] px-5 rounded-xl font-bold">🚀</button>
      </div>
    </div>
  );
}
