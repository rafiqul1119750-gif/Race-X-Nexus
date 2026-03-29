import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Music, ShoppingCart, Users, Link2, Copy, Check, Play, Zap } from "lucide-react";
import { useGetMusicTracks, useGetShopItems, useGetSocialFeed } from "@workspace/api-client-react";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

function generateSmartLink(path: string) {
  const ua = navigator.userAgent;
  const base = window.location.origin;
  if (/android/i.test(ua)) return `intent://${window.location.host}${path}#Intent;scheme=https;end`;
  if (/iphone|ipad/i.test(ua)) return `${base}${path}?src=ios`;
  return `${base}${path}?src=web`;
}

export default function UserPortal() {
  const { data: tracksData } = useGetMusicTracks();
  const { data: shopData } = useGetShopItems();
  const { data: feedData } = useGetSocialFeed();
  const { setCurrentTrack, setIsPlaying } = useAppContext();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const tracks = tracksData?.tracks?.slice(0, 4) || [];
  const items = shopData?.items?.slice(0, 4) || [];
  const posts = feedData?.posts?.slice(0, 3) || [];

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSmartLink("/portal/user")).catch(() => {});
    setCopied(true);
    toast({ title: "🔗 User Portal Link Copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel-purple p-6 rounded-3xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-display font-bold text-glow-purple">User Portal</h1>
            <span className="text-[10px] px-2 py-0.5 bg-secondary/20 text-secondary border border-secondary/40 rounded font-bold">EXPLORER</span>
          </div>
          <p className="text-sm text-muted-foreground">Feed · Music · Shopping — Your personal nexus</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-white font-bold rounded-xl shadow-[0_0_15px_rgba(157,78,221,0.4)] hover:shadow-[0_0_25px_rgba(157,78,221,0.6)] transition-all btn-ripple text-sm"
        >
          {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
          {copied ? "Copied!" : "Share Portal"}
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Feed Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl">
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" /> Latest from Feed
            </h2>
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="p-4 bg-black/30 rounded-xl border border-white/5 hover:border-secondary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 overflow-hidden">
                      <img src={post.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop"} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-sm text-white">{post.authorName}</span>
                    <span className="text-xs text-muted-foreground ml-auto">❤️ {post.likes}</span>
                  </div>
                  <p className="text-sm text-white/70 line-clamp-2">{post.content}</p>
                </div>
              ))}
            </div>
            <Link href="/social">
              <button className="w-full mt-4 py-2 text-secondary text-sm font-bold btn-ripple hover:underline flex items-center justify-center gap-1">
                Open Full Feed <Zap className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Shop Preview */}
          <div className="glass-panel p-6 rounded-3xl">
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-accent" /> Recommended for You
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {items.map(item => (
                <div key={item.id} className="p-3 bg-black/30 border border-white/5 rounded-xl hover:border-accent/30 transition-colors">
                  <div className="w-full aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center text-3xl">
                    {item.category === "Music" ? "🎵" : item.category === "NFT" ? "🖼️" : item.category === "AR/VR" ? "🥽" : "✨"}
                  </div>
                  <p className="font-bold text-xs text-white truncate">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.price} {item.currency === "diamonds" ? "💎" : "💠"}</p>
                </div>
              ))}
            </div>
            <Link href="/shop">
              <button className="w-full mt-4 py-2 text-accent text-sm font-bold btn-ripple hover:underline flex items-center justify-center gap-1">
                Browse Shop <ShoppingCart className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Music Player Preview */}
        <div className="space-y-6">
          <div className="glass-panel p-5 rounded-3xl">
            <h3 className="font-display font-bold text-primary mb-4 flex items-center gap-2">
              <Music className="w-5 h-5" /> Now Playing
            </h3>
            <div className="space-y-3">
              {tracks.map(track => (
                <div
                  key={track.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/5 hover:border-primary/30 transition-all group cursor-pointer"
                  onClick={() => {
                    setCurrentTrack({ id: track.id, title: track.title, artist: track.artist, duration: track.duration });
                    setIsPlaying(true);
                    toast({ title: `▶ Now Playing: ${track.title}` });
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <Play className="w-4 h-4 text-primary fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{track.title}</p>
                    <p className="text-[10px] text-muted-foreground">{track.artist}</p>
                  </div>
                  {track.isAiGenerated && (
                    <span className="text-[9px] bg-secondary/20 text-secondary px-1.5 py-0.5 rounded font-bold flex-shrink-0">AI</span>
                  )}
                </div>
              ))}
            </div>
            <Link href="/music">
              <button className="w-full mt-4 py-2 text-primary text-sm font-bold btn-ripple hover:underline flex items-center justify-center gap-1">
                Open Music Library <Music className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Smart Link */}
          <div className="glass-panel p-5 rounded-3xl border-secondary/30">
            <h3 className="font-display font-bold text-secondary mb-2 flex items-center gap-2">
              <Link2 className="w-4 h-4" /> Smart Share
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Device-aware link for this portal.</p>
            <div className="bg-black/40 rounded-lg px-3 py-2 text-[10px] font-mono text-muted-foreground mb-3 break-all">
              {generateSmartLink("/portal/user")}
            </div>
            <button onClick={handleCopy} className="w-full py-2 bg-secondary/20 text-secondary border border-secondary/40 font-bold text-sm rounded-xl btn-ripple flex items-center justify-center gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Smart Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
