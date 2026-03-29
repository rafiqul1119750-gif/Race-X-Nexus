import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, TrendingUp, Award } from "lucide-react";
import { useGetSocialFeed, useLikePost } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

export default function Social() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetSocialFeed();
  const { mutate: likePost } = useLikePost({
    mutation: {
      onSuccess: () => {
        // Invalidate queries to refresh feed
        queryClient.invalidateQueries({ queryKey: [`/api/social/feed`] });
      }
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const posts = data?.posts || [];
  const trending = data?.trending || [];

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
      
      {/* Main Feed */}
      <div className="flex-1 space-y-6">
        {/* Create Post Input */}
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
          <button className="px-4 py-1.5 bg-primary text-primary-foreground font-bold rounded-lg btn-ripple text-sm">Post</button>
        </div>

        {/* Posts */}
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
                  className={`flex items-center gap-1.5 text-sm transition-colors btn-ripple ${post.isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-white'}`}
                >
                  <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
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
                <button className={`transition-colors btn-ripple ${post.saved ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}>
                  <Bookmark className={`w-5 h-5 ${post.saved ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block w-72 space-y-6">
        <div className="glass-panel p-5 rounded-2xl">
          <h3 className="font-display font-bold text-glow flex items-center gap-2 border-b border-white/10 pb-3 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            Trending
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
            <Award className="w-5 h-5" />
            Achievements
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-secondary/20 border border-secondary/50 flex items-center justify-center text-xl">🔥</div>
              <div>
                <p className="text-sm font-bold text-white">100k Club</p>
                <p className="text-[10px] text-muted-foreground">Reached 100k views</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-primary/20 border border-primary/50 flex items-center justify-center text-xl">✨</div>
              <div>
                <p className="text-sm font-bold text-white">Creator Pro</p>
                <p className="text-[10px] text-muted-foreground">Minted 5 assets</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
