import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, MessageCircle, Share2, Zap, MoreHorizontal, 
  PlusSquare, Play, Volume2, Bookmark, Send 
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { databases, storage } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToaster } from "../hooks/use-toast";

const Social = () => {
  const { user, setDiamonds, refreshUserData } = useAppContext();
  const { toast } = useToaster();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 1. Real Data Fetching (Appwrite) ---
  const fetchPosts = async () => {
    try {
      const response = await databases.listDocuments(
        'YOUR_DATABASE_ID', 
        'POSTS_COLLECTION_ID',
        [Query.orderDesc('$createdAt')]
      );
      setPosts(response.documents);
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  // --- 2. Functional Features ---

  // Like Logic (Instagram Style)
  const handleLike = async (postId: string, currentLikes: number) => {
    try {
      await databases.updateDocument('YOUR_DATABASE_ID', 'POSTS_COLLECTION_ID', postId, {
        likes: currentLikes + 1
      });
      setPosts(posts.map(p => p.$id === postId ? { ...p, likes: p.likes + 1 } : p));
      // Haptic feedback (vibes) logic yahan trigger hogi
    } catch (err) { toast({ title: "Error", description: "Like failed!" }); }
  };

  // Diamond Tip (TikTok Style Gifting)
  const handleGiftDiamond = async (creatorId: string, postId: string) => {
    if (user.diamonds < 1) {
      toast({ title: "No Diamonds!", description: "Shop se kharidein." });
      return;
    }
    // Logic: User se 1 Diamond lo, Creator ko do
    try {
      await databases.updateDocument('YOUR_DATABASE_ID', 'USER_STATS', user.$id, { diamonds: user.diamonds - 1 });
      setDiamonds(prev => prev - 1);
      toast({ title: "Diamond Sent! 💎", description: "Creator ko support karne ke liye shukriya!" });
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* --- Story Bar (Instagram Style) --- */}
      <section className="flex gap-4 overflow-x-auto py-2 px-1 no-scrollbar">
        <div className="flex flex-col items-center gap-1 min-w-[70px]">
          <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-primary to-purple-600 border border-background relative">
            <img src={user?.prefs?.avatar} className="w-full h-full rounded-full object-cover border-2 border-black" />
            <div className="absolute bottom-0 right-0 bg-primary text-black rounded-full p-0.5 border-2 border-black">
              <PlusSquare size={12} fill="currentColor" />
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Your Story</span>
        </div>
        {/* Other Stories Mockup */}
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex flex-col items-center gap-1 min-w-[70px] opacity-70">
            <div className="w-16 h-16 rounded-full p-1 border-2 border-primary/40">
              <div className="w-full h-full rounded-full bg-secondary/50" />
            </div>
            <span className="text-[10px] font-medium text-gray-500">Creator_{i}</span>
          </div>
        ))}
      </section>

      {/* --- Social Feed (Facebook + TikTok Power) --- */}
      <div className="space-y-6">
        {posts.map((post) => (
          <motion.div 
            key={post.$id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/10 border-y sm:border border-white/5 sm:rounded-[2rem] overflow-hidden"
          >
            {/* Header: Facebook Layout */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
                   <img src={post.creatorAvatar} alt="Avatar" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">{post.creatorName}</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{post.category || 'AI Creator'}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-500"><MoreHorizontal size={20}/></Button>
            </div>

            {/* Content: Instagram/TikTok Visuals */}
            <div className="relative aspect-square bg-black flex items-center justify-center group">
              <img 
                src={post.mediaUrl} 
                className="w-full h-full object-cover" 
                loading="lazy"
              />
              {/* Play Button Overlay for Videos */}
              {post.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      <Play fill="white" className="text-white ml-1" />
                   </div>
                </div>
              )}
              {/* Floating Diamond Tip Button (TikTok Power) */}
              <button 
                onClick={() => handleGiftDiamond(post.creatorId, post.$id)}
                className="absolute right-4 bottom-4 p-3 bg-primary/20 backdrop-blur-xl border border-primary/40 rounded-full shadow-2xl active:scale-90 transition-transform"
              >
                <Zap size={24} className="text-primary fill-primary animate-pulse" />
              </button>
            </div>

            {/* Interaction Bar: Facebook Buttons + Instagram Style Icons */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <button onClick={() => handleLike(post.$id, post.likes)} className="flex items-center gap-1 group active:scale-125 transition-transform">
                    <Heart size={24} className="text-rose-500 group-hover:fill-rose-500 transition-colors" />
                    <span className="text-xs font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 group">
                    <MessageCircle size={24} className="text-gray-400 group-hover:text-white" />
                    <span className="text-xs font-bold">{post.commentsCount}</span>
                  </button>
                  <button className="active:scale-110 transition-transform">
                    <Share2 size={24} className="text-gray-400" />
                  </button>
                </div>
                <Bookmark size={24} className="text-gray-400" />
              </div>

              {/* Caption: Facebook Style */}
              <div className="space-y-1">
                <p className="text-sm leading-relaxed">
                  <span className="font-bold mr-2">{post.creatorName}</span>
                  {post.caption}
                </p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest cursor-pointer">#RaceX #AI_Revolution #Nexus</p>
              </div>

              {/* Quick Comment Input (Facebook Layout) */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <div className="w-6 h-6 rounded-full bg-secondary/50 overflow-hidden">
                   <img src={user?.prefs?.avatar} alt="User" />
                </div>
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="flex-1 bg-transparent text-xs outline-none border-none placeholder:text-gray-600"
                />
                <Send size={16} className="text-primary opacity-50" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Social;
