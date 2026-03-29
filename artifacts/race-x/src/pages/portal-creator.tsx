import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  MonitorPlay, Users, BarChart2, Share2, Link2,
  Star, Zap, ArrowRight, Copy, Check
} from "lucide-react";
import { useGetUserProfile, useGetSocialFeed } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

function generateSmartLink(path: string) {
  const ua = navigator.userAgent;
  const base = window.location.origin;
  if (/android/i.test(ua)) return `intent://${window.location.host}${path}#Intent;scheme=https;end`;
  if (/iphone|ipad/i.test(ua)) return `${base}${path}?src=ios`;
  return `${base}${path}?src=web`;
}

const MOCK_ANALYTICS = [
  { label: "Total Views", value: "284K", change: "+12%", up: true },
  { label: "Followers", value: "18.4K", change: "+8%", up: true },
  { label: "Engagement", value: "6.7%", change: "+2.1%", up: true },
  { label: "Revenue 💎", value: "45.2K", change: "-3%", up: false },
];

export default function CreatorPortal() {
  const { data: profile } = useGetUserProfile();
  const { data: feedData } = useGetSocialFeed();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const link = generateSmartLink("/portal/creator");
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    toast({ title: "🔗 Smart Link Copied!", description: "Detected: " + (/android/i.test(navigator.userAgent) ? "Android" : /iphone|ipad/i.test(navigator.userAgent) ? "iOS" : "Web") });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-3xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-primary/30 shadow-[0_0_30px_rgba(0,247,255,0.08)]"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5 shadow-[0_0_15px_rgba(0,247,255,0.3)]">
            <div className="w-full h-full rounded-full bg-muted overflow-hidden">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-display font-bold text-glow">{profile?.displayName || "Creator"}</h1>
              <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary border border-primary/40 rounded font-bold">CREATOR</span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">@{profile?.username} · {profile?.faction || "No Faction"} · Lvl {profile?.level}</p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-[0_0_15px_rgba(0,247,255,0.3)] hover:shadow-[0_0_25px_rgba(0,247,255,0.5)] transition-all btn-ripple text-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            {copied ? "Copied!" : "Share Profile"}
          </button>
          <Link href="/studio">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-all btn-ripple text-sm">
              <MonitorPlay className="w-4 h-4 text-primary" /> Studio
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Analytics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {MOCK_ANALYTICS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-panel p-4 rounded-2xl"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-white mt-1">{stat.value}</p>
            <p className={`text-xs mt-1 font-bold ${stat.up ? "text-green-400" : "text-destructive"}`}>
              {stat.change} this week
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Studio Quick Access */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl">
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <MonitorPlay className="w-5 h-5 text-primary" /> Studio Quick Access
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {[
                { label: "New Video", desc: "Start from scratch", href: "/studio/editor", icon: "🎬" },
                { label: "Templates", desc: "5 ready to use", href: "/studio", icon: "📐" },
                { label: "Collab", desc: "1 invite pending", href: "/studio", icon: "👥" },
              ].map(item => (
                <Link key={item.label} href={item.href}>
                  <div className="p-4 rounded-xl border border-white/10 hover:border-primary/50 bg-black/30 cursor-pointer group transition-all">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="font-bold text-sm text-white group-hover:text-primary transition-colors">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/studio/editor">
              <button className="w-full py-3 bg-primary/20 text-primary border border-primary/40 rounded-xl font-bold hover:bg-primary/30 transition-all btn-ripple flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" /> Open Full Studio <ArrowRight className="w-4 h-4 ml-auto" />
              </button>
            </Link>
          </div>

          {/* Social Engagement */}
          <div className="glass-panel p-6 rounded-3xl">
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" /> Social Engagement
            </h2>
            <div className="space-y-3">
              {(feedData?.posts || []).slice(0, 3).map(post => (
                <div key={post.id} className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 truncate">{post.content.slice(0, 60)}...</p>
                    <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                  <Link href="/social">
                    <ArrowRight className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                  </Link>
                </div>
              ))}
            </div>
            <Link href="/social">
              <button className="w-full mt-4 py-2 text-secondary text-sm font-bold hover:underline flex items-center justify-center gap-1">
                View Full Feed <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="glass-panel-purple p-5 rounded-3xl">
            <h3 className="font-display font-bold text-secondary mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" /> Badges & Rank
            </h3>
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🏆</div>
              <p className="font-display font-bold text-white">Diamond Tier</p>
              <p className="text-xs text-muted-foreground">Top 3% of creators</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(profile?.badges || ["Founder", "Top Creator", "PvP Champ"]).slice(0, 6).map((b, i) => (
                <div key={i} className="bg-secondary/10 border border-secondary/20 rounded-lg p-2 text-center">
                  <p className="text-[9px] text-secondary font-bold leading-tight">{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Share Panel */}
          <div className="glass-panel p-5 rounded-3xl border-primary/30">
            <h3 className="font-display font-bold text-primary mb-3 flex items-center gap-2">
              <Share2 className="w-5 h-5" /> Smart Share
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Generates device-aware links. Auto-detects Android / iOS / Web.</p>
            <div className="bg-black/40 rounded-lg px-3 py-2 text-[10px] font-mono text-muted-foreground mb-3 break-all">
              {generateSmartLink("/portal/creator")}
            </div>
            <button onClick={handleCopyLink} className="w-full py-2 bg-primary text-primary-foreground font-bold text-sm rounded-xl btn-ripple flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,247,255,0.3)]">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
