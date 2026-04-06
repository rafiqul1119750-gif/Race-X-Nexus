import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, ChevronLeft, MoreVertical, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  
  // Fake Chat Data (Real app mein Appwrite Realtime se aayega)
  const [messages, setMessages] = useState([
    { id: 1, text: "Bhai, naya AI model dekha?", senderId: "other", time: "10:30 AM" },
    { id: 2, text: "Haan yaar, Race-X Studio kamaal hai! 🔥", senderId: "me", time: "10:31 AM" },
    { id: 3, text: "Ek mast image generate ki hai, dikhaun?", senderId: "other", time: "10:32 AM" },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      senderId: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  // Auto-scroll to bottom jab naya message aaye
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[85vh] -mt-4 -mx-4">
      {/* --- Chat Header --- */}
      <header className="p-4 bg-secondary/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ChevronLeft size={20} />
          </Button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center border border-white/10">
              <User size={20} className="text-black" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full"></div>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">Nexus Creator</h2>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400">
          <MoreVertical size={20} />
        </Button>
      </header>

      {/* --- Messages Area --- */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.senderId === 'me' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-lg ${
              msg.senderId === 'me' 
              ? 'bg-primary text-black font-medium rounded-tr-none' 
              : 'bg-secondary/50 text-white border border-white/5 rounded-tl-none'
            }`}>
              <p className="leading-relaxed">{msg.text}</p>
              <p className={`text-[9px] mt-1 text-right ${msg.senderId === 'me' ? 'text-black/60' : 'text-gray-500'}`}>
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Input Area --- */}
      <footer className="p-4 bg-background border-t border-white/5">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="text-gray-400 rounded-full bg-secondary/20">
            <Sparkles size={20} className="text-primary" />
          </Button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Message..."
              className="w-full bg-secondary/30 border border-white/10 rounded-2xl py-3 pl-4 pr-10 outline-none focus:border-primary/50 transition-all text-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <ImageIcon size={18} />
            </Button>
          </div>
          <Button 
            type="submit" 
            className="rounded-full w-12 h-12 bg-primary text-black p-0 shadow-lg shadow-primary/20 active:scale-90 transition-transform"
          >
            <Send size={20} fill="currentColor" />
          </Button>
        </form>
      </footer>
    </div>
  );
};

export default Chat;
