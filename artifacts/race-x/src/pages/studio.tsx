import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Plus, Video, Image, Layout, Star, ArrowRight, Lock, Copy, Check, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const INBUILT_TEMPLATES = [
  {
    id: 1,
    name: "Instagram Post",
    desc: "1080×1080 · Neon border, text overlay",
    locked: false,
    icon: "📷",
    tag: "Social",
    color: "from-pink-500/20 to-secondary/20",
    border: "border-pink-500/30",
  },
  {
    id: 2,
    name: "YouTube Thumb",
    desc: "1280×720 · Bold title, cinematic BG",
    locked: false,
    icon: "🎬",
    tag: "Video",
    color: "from-destructive/20 to-amber-500/20",
    border: "border-destructive/30",
  },
  {
    id: 3,
    name: "Music Poster",
    desc: "800×800 · Waveform art, artist credit",
    locked: false,
    icon: "🎵",
    tag: "Music",
    color: "from-primary/20 to-secondary/20",
    border: "border-primary/30",
  },
  {
    id: 4,
    name: "Event Banner",
    desc: "1200×628 · Countdown, neon text",
    locked: false,
    icon: "⚡",
    tag: "Events",
    color: "from-amber-500/20 to-primary/20",
    border: "border-amber-500/30",
  },
  {
    id: 5,
    name: "3D Avatar Card",
    desc: "600×900 · Holographic profile frame",
    locked: true,
    icon: "🧬",
    tag: "3D · Lvl 15+",
    color: "from-white/5 to-white/5",
    border: "border-white/10",
  },
  {
    id: 6,
    name: "Sci-Fi Intro",
    desc: "1920×1080 · Video intro sequence",
    locked: false,
    icon: "🚀",
    tag: "Video",
    color: "from-secondary/20 to-primary/20",
    border: "border-secondary/30",
  },
  {
    id: 7,
    name: "Glitch Transition",
    desc: "Overlay effect · Drag & drop",
    locked: false,
    icon: "⚡",
    tag: "FX",
    color: "from-destructive/10 to-secondary/20",
    border: "border-destructive/20",
  },
  {
    id: 8,
    name: "Hologram Effect",
    desc: "3D holographic overlay · Pro",
    locked: true,
    icon: "🔮",
    tag: "3D · Lvl 10+",
    color: "from-white/5 to-white/5",
    border: "border-white/10",
  },
];

function generateSmartLink(path: string) {
  const ua = navigator.userAgent;
  const base = window.location.origin;
  if (/android/i.test(ua)) return `intent://${window.location.host}${path}#Intent;scheme=https;end`;
  if (/iphone|ipad/i.test(ua)) return `${base}${path}?src=ios`;
  return `${base}${path}?src=web`;
}

export default function Studio() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const projects = [
    { id: 1, title: "Neon Cyberpunk Edit", type: "Video", date: "2 hrs ago", thumb: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=300&fit=crop" },
    { id: 2, title: "Tournament Highlight", type: "Clip", date: "1 day ago", thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop" },
    { id: 3, title: "Avatar Gen V2", type: "3D", date: "3 days ago", thumb: "https://images.unsplash.com/photo-1618367588411-d9a90fefa881?w=400&h=300&fit=crop" },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generateSmartLink("/portal/creator")).catch(() => {});
    setCopied(true);
    toast({ title: "🔗 Smart Link Copied!", description: "Shareable Creator Portal link generated." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-black text-glow">RX Studio</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and mint your next masterpiece.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2.5 border border-primary/40 text-primary font-bold rounded-xl hover:bg-primary/10 transition-all btn-ripple text-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            Smart Link
          </button>
          <Link href="/studio/editor">
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold font-display tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] hover:scale-105 transition-all btn-ripple">
              <Plus className="w-5 h-5" /> NEW PROJECT
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl">
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" /> Recent Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {projects.map(p => (
                <div key={p.id} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-2 border border-white/10 group-hover:border-primary/50 transition-colors">
                    <img src={p.thumb} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-primary transition-colors">{p.title}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-muted-foreground">{p.type}</span>
                    <span className="text-[10px] text-muted-foreground">{p.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Templates Library — 5 inbuilt */}
          <div className="glass-panel p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-bold flex items-center gap-2">
                <Layout className="w-5 h-5 text-secondary" /> Template Library
              </h2>
              <span className="text-xs text-muted-foreground">{INBUILT_TEMPLATES.filter(t => !t.locked).length} ready · {INBUILT_TEMPLATES.filter(t => t.locked).length} locked</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {INBUILT_TEMPLATES.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative p-4 rounded-2xl border bg-gradient-to-br ${t.color} ${t.border}
                    ${t.locked ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-[0_0_15px_rgba(0,247,255,0.15)] cursor-pointer"} transition-all`}
                >
                  {t.locked && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <h4 className="font-bold text-sm text-white leading-tight">{t.name}</h4>
                  <p className="text-[9px] mt-1 text-muted-foreground leading-tight">{t.desc}</p>
                  <div className="mt-2">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${t.locked ? "bg-white/10 text-muted-foreground" : "bg-primary/20 text-primary"}`}>
                      {t.tag}
                    </span>
                  </div>
                  {t.locked && (
                    <div className="absolute inset-0 flex items-end justify-center pb-2 opacity-0 hover:opacity-100 transition-opacity rounded-2xl bg-black/50">
                      <p className="text-[9px] text-destructive font-bold">Locked by Level</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border-primary/30 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2 text-glow">
              <Image className="w-5 h-5 text-primary" /> AI Suggestions
            </h2>
            <ul className="space-y-4 relative z-10">
              <li className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-primary/30 transition-colors text-sm">
                <span className="font-bold text-primary block mb-1">Color Grade Trick</span>
                Boost cyan midtones for that cyberpunk vibe — instant upgrade.
              </li>
              <li className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-primary/30 transition-colors text-sm">
                <span className="font-bold text-primary block mb-1">Trending Audio</span>
                Synthwave #84 boosts algorithm reach by 24%.
              </li>
              <li className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-primary/30 transition-colors text-sm">
                <span className="font-bold text-primary block mb-1">Thumb Template</span>
                Try the YouTube Thumb template for 3× CTR.
              </li>
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-3xl">
            <h2 className="text-xl font-display font-bold mb-4">Collab Invites (1)</h2>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="w-10 h-10 rounded-full bg-secondary/20 overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">@CyberNinja</p>
                <p className="text-[10px] text-muted-foreground">Invited you to edit "Glitch Hop Mix"</p>
              </div>
              <button className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/80 btn-ripple">Join</button>
            </div>
          </div>

          {/* Share link panel */}
          <div className="glass-panel p-5 rounded-3xl border-primary/30">
            <h3 className="font-display font-bold text-primary mb-3 flex items-center gap-2">
              <Copy className="w-4 h-4" /> Generate Smart Link
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Share your Creator Portal. Detects Android / iOS / Web.</p>
            <div className="bg-black/40 rounded-lg px-3 py-2 text-[10px] font-mono text-muted-foreground mb-3 break-all">
              {generateSmartLink("/portal/creator")}
            </div>
            <button onClick={handleCopyLink} className="w-full py-2 bg-primary text-primary-foreground font-bold text-sm rounded-xl btn-ripple flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,247,255,0.25)]">
              {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Smart Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
