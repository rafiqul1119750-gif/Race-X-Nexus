import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Send, Heart } from "lucide-react";

export default function CommentsPage() {
  const [, setLocation] = useLocation();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Aman_AI", text: "This UI is futuristic! 🔥", time: "2h", likes: 12 },
    { id: 2, user: "Sara_X", text: "Race-X is going to change everything.", time: "1h", likes: 5 }
  ]);

  const postComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      user: "YOU", // Real app mein yahan user ka profile name aayega
      text: commentText,
      time: "Just now",
      likes: 0
    };
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center gap-4 sticky top-0 bg-black z-50">
        <ArrowLeft onClick={() => setLocation("/social/feed")} className="cursor-pointer" />
        <h1 className="font-black uppercase italic text-sm">Comments</h1>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] font-black uppercase text-cyan-400">{c.user} <span className="text-zinc-600 ml-2 font-normal lowercase">{c.time}</span></p>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{c.text}</p>
              <div className="flex gap-4 mt-2 text-[10px] text-zinc-500 font-bold uppercase">
                <span>Reply</span>
                <span>{c.likes} Likes</span>
              </div>
            </div>
            <Heart size={14} className="text-zinc-700" />
          </div>
        ))}
      </div>

      {/* Input Bar (Fixed at bottom) */}
      <div className="p-4 bg-zinc-900/50 backdrop-blur-xl border-t border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-zinc-800" />
        <input 
          type="text" 
          placeholder="Add a comment for Race-X..." 
          className="flex-1 bg-transparent text-sm outline-none"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && postComment()}
        />
        <button onClick={postComment} className="text-cyan-400 font-black text-xs uppercase tracking-widest">Post</button>
      </div>
    </div>
  );
}
