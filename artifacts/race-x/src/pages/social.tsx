import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Bookmark, Share2, TrendingUp, Award, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetSocialFeed, useLikePost } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

const STORIES = [
  { id: 1, user: "NeonByte",   avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",   bg: "from-primary/40 to-secondary/40",   seen: false, content: "🎮 Just dropped my new track — NEXUS OVERDRIVE!", time: "2m ago" },
  { id: 2, user: "CyberNinja", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", bg: "from-secondary/40 to-destructive/30", seen: false, content: "🔥 Tournament finals tonight! WHO'S READY?", time: "15m ago" },
  { id: 3, user: "ZeroX",      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",   bg: "from-amber-500/30 to-primary/40",   seen: true,  content: "✨ New Studio template dropped — check it out", time: "1h ago" },
  { id: 4, user: "StarForge",  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",  bg: "from-green-500/30 to-primary/30",   seen: false, content: "💎 Reached Diamond rank — grinding pays off!", time: "3h ago" },
  { id: 5, user: "VoidPulse",  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",  bg: "from-destructive/30 to-secondary/40", seen: true, content: "🎵 AI generated this beat in 2 minutes — insane", time: "5h ago" },
  { id: 6, user: "OmegaRift",  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", bg: "from-blue-500/30 to-primary/30",  seen: false, content: "🛸 New visual pack launching at midnight!", time: "6h ago" },
];

function StoryViewer({ stories, startIdx, onClose }: { stories: typeof STORIES; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  const [progress, setProgress] = useState(0);
  const story = stories[idx];

  // Auto-advance
  useState(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          if (idx < stories.length - 1) { setIdx(i => i + 1); return 0; }
          else { onClose(); return 100; }
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm h-[80vh] rounded-3xl overflow-hidden bg-gradient-to-br ${story.bg} border border-white/10 shadow-2xl`}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-none"
                style={{ width: i < idx ? "100%" : i === idx ? `${progress}%` : "0%" }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden">
              <img src={story.avatar} alt={story.user} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">@{story.user}</p>
              <p className="text-white/60 text-[10px]">{story.time}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <p className="text-white text-2xl font-bold text-center leading-relaxed mt-16">{story.content}</p>
        </div>

        {/* Navigation */}
        <button
          onClick={() => { if (idx > 0) { setIdx(i => i - 1); setProgress(0); } }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => { if (idx < stories.length - 1) { setIdx(i => i + 1); setProgress(0); } else onClose(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Social() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetSocialFeed();
  const { mutate: likePost } = useLikePost({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/social/feed"] }) }
  });

  const [activeStory, setActiveStory] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const posts = data?.posts || [];
  const trending = data?.trending || [];

  return (
    <>
      <AnimatePresence>
        {activeStory !== null && (
          <StoryViewer stories={STORIES} startIdx={activeStory} onClose={() => setActiveStory(null)} />
        )}
      </AnimatePresence>

      <div className="px-4 py-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">

          {/* ── Stories Line ── */}
          <div className="glass-panel p-4 rounded-2xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Stories</p>
            <div className="flex gap-3 overflow-x-auto pb-1 custom-scrollbar">
              {/* Add Story button */}
              <div className="flex-shrink-0 flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center bg-black/40 group-hover:border-primary/50 transition-colors">
                  <span className="text-2xl font-bold text-white/40 group-hover:text-primary transition-colors">+</span>
                </div>
                <p className="text-[9px] text-muted-foreground whitespace-nowrap">Your Story</p>
              </div>

              {STORIES.map((story, i) => (
                <motion.div
                  key={story.id}
                  whileTap={{ scale: 0.92 }}
                  className="flex-shrink-0 flex flex-col items-center gap-1.5 cursor-pointer"
                  onClick={() => setActiveStory(i)}
                >
                  <div className={`w-14 h-14 rounded-full p-[2px] ${story.seen ? "bg-white/20" : "bg-gradient-to-br from-primary to-secondary shadow-[0_0_10px_rgba(0,247,255,0.3)]"}`}>
                    <div className="w-full h-full rounded-full border-2 border-black overflow-hidden">
                      <img src={story.avatar} alt={story.user} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <p className={`text-[9px] whitespace-nowrap max-w-[56px] truncate ${story.seen ? "text-muted-foreground" : "text-white font-bold"}`}>
                    @{story.user}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Create Post ── */}
          <div className="glass-panel p-4 rounded-2xl flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5">
              <div className="w-full h-full bg-black rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="You" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Share your latest creation..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground focus:ring-0"
            />
            <button className="px-4 py-1.5 bg-primary text-primary-foreground font-bold rounded-lg btn-ripple text-sm shadow-[0_0_12px_rgba(0,247,255,0.3)]">Post</button>
          </div>

          {/* ── Posts ── */}
          {posts.map(post => (
            <div key={post.id} className="glass-panel rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
              <div className="p-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                    <img src={post.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop"} alt={post.authorName} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{post.authorName}</h4>
                    <p className="text-[10px] text-muted-foreground">{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm text-white/90 mb-3 whitespace-pre-wrap">{post.content}</p>
                {post.imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-white/10 mb-3 bg-black">
                    <img src={post.imageUrl} alt="Post content" className="w-full max-h-96 object-contain" />
                  </div>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-4 py-3 border-t border-white/5 flex justify-between bg-black/20">
                <div className="flex gap-4">
                  <button
                    onClick={() => likePost({ postId: post.id })}
                    className={`flex items-center gap-1.5 text-sm transition-colors btn-ripple ${post.isLiked ? "text-destructive" : "text-muted-foreground hover:text-white"}`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors btn-ripple">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <div className="flex gap-4">
                  <button className="text-muted-foreground hover:text-white transition-colors btn-ripple">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className={`transition-colors btn-ripple ${post.saved ? "text-primary" : "text-muted-foreground hover:text-white"}`}>
                    <Bookmark className={`w-5 h-5 ${post.saved ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Right Sidebar ── */}
        <div className="hidden md:block w-72 space-y-6">
          <div className="glass-panel p-5 rounded-2xl">
            <h3 className="font-display font-bold text-glow flex items-center gap-2 border-b border-white/10 pb-3 mb-3">
              <TrendingUp className="w-5 h-5 text-primary" /> Trending
            </h3>
            <div className="space-y-3">
              {trending.map((trend, i) => (
                <div key={i} className="flex justify-between items-center cursor-pointer group">
                  <span className="text-sm font-bold text-white/80 group-hover:text-primary transition-colors">#{trend}</span>
                  <span className="text-[10px] text-muted-foreground">Top</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel-purple p-5 rounded-2xl border-secondary/30">
            <h3 className="font-display font-bold text-glow-purple flex items-center gap-2 border-b border-white/10 pb-3 mb-3 text-secondary">
              <Award className="w-5 h-5" /> Achievements
            </h3>
            <div className="space-y-4">
              {[
                { emoji: "🔥", title: "100k Club", desc: "Reached 100k views" },
                { emoji: "✨", title: "Creator Pro", desc: "Minted 5 assets" },
                { emoji: "⚡", title: "Streak Master", desc: "30 day streak" },
              ].map(a => (
                <div key={a.title} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-secondary/20 border border-secondary/50 flex items-center justify-center text-xl">{a.emoji}</div>
                  <div>
                    <p className="text-sm font-bold text-white">{a.title}</p>
                    <p className="text-[10px] text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
