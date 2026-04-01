import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles } from "lucide-react";
import { useGetChatMessages, useSendChatMessage } from "@workspace/api-client-react";
import { useAppContext } from "@/context/AppContext";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

export default function Chat() {
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetChatMessages();
  const { mutate: sendMessage, isPending } = useSendChatMessage({
    mutation: {
      onSuccess: () => {
        setInput("");
        queryClient.invalidateQueries({ queryKey: [`/api/chat/messages`] });
      }
    }
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data?.messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isPending) return;
    sendMessage({ data: { content: input } });
  };

  const messages = data?.messages || [];
  const suggestions = data?.aiSuggestions || ["Tell me a joke", "How do I edit videos?", "Write a tweet"];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto px-4 py-6">
      <div className="glass-panel rounded-t-2xl p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/50">
            <Bot className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
          </div>
          <div>
            <h2 className="font-display font-bold text-glow text-lg">RX Magic Chat</h2>
            <p className="text-xs text-muted-foreground">AI Assistant & Global Rooms</p>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 glass-panel border-y-0 rounded-none p-4 overflow-y-auto space-y-4 custom-scrollbar"
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.senderName === "You";
            const isAi = msg.type === "ai";
            const isSystem = msg.type === "system";

            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center my-4">
                  <span className="bg-white/5 border border-white/10 text-muted-foreground text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                    {msg.content}
                  </span>
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ${isAi ? 'bg-primary/20 p-1 border border-primary/50' : 'bg-muted'}`}>
                    {isAi ? <Bot className="w-full h-full text-primary" /> : <img src={msg.senderAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&fit=crop"} alt="Avatar" className="w-full h-full object-cover" />}
                  </div>
                  <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-muted-foreground mb-1 ml-1">{msg.senderName} • {format(new Date(msg.timestamp), 'HH:mm')}</span>
                    <div className={`p-3 rounded-2xl text-sm shadow-lg ${
                      isUser 
                        ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-[0_0_15px_rgba(0,212,255,0.2)]' 
                        : isAi 
                          ? 'bg-secondary/20 border border-secondary/30 text-white rounded-tl-sm shadow-[0_0_15px_rgba(157,78,221,0.1)]'
                          : 'bg-white/10 text-white rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="glass-panel rounded-b-2xl p-4 border-t border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="flex gap-2 mb-3 overflow-x-auto custom-scrollbar pb-2">
          {suggestions.map((sug, i) => (
            <button 
              key={i}
              onClick={() => setInput(sug)}
              className="flex items-center gap-1.5 whitespace-nowrap bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 px-3 py-1.5 rounded-full text-xs transition-colors text-white/80 hover:text-primary btn-ripple"
            >
              <Sparkles className="w-3 h-3" />
              {sug}
            </button>
          ))}
        </div>
        <form onSubmit={handleSend} className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask RX Magic Chat..."
            className="w-full bg-black/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-4 pr-12 py-3 text-sm outline-none text-white transition-all shadow-inner"
            disabled={isPending}
          />
          <button 
            type="submit"
            disabled={!input.trim() || isPending}
            className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 btn-ripple shadow-[0_0_10px_rgba(0,212,255,0.4)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
