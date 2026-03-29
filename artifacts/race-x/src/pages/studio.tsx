import { motion } from "framer-motion";
import { Link } from "wouter";
import { Plus, Video, Image, Layout, Star, ArrowRight } from "lucide-react";

export default function Studio() {
  const projects = [
    { id: 1, title: "Neon Cyberpunk Edit", type: "Video", date: "2 hrs ago", thumb: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=300&fit=crop" },
    { id: 2, title: "Tournament Highlight", type: "Clip", date: "1 day ago", thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop" },
    { id: 3, title: "Avatar Gen V2", type: "3D", date: "3 days ago", thumb: "https://images.unsplash.com/photo-1618367588411-d9a90fefa881?w=400&h=300&fit=crop" },
  ];

  const templates = [
    { id: 1, name: "Sci-Fi Intro", locked: false },
    { id: 2, name: "Glitch Transition", locked: false },
    { id: 3, name: "Hologram Effect", locked: true },
  ];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-black text-glow">RX Studio</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and mint your next masterpiece.</p>
        </div>
        <Link href="/studio/editor">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold font-display tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] hover:scale-105 transition-all btn-ripple">
            <Plus className="w-5 h-5" />
            NEW PROJECT
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Recent Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl">
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Recent Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {projects.map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-2 border border-white/10 group-hover:border-primary/50 transition-colors">
                    {/* studio recent project thumbnail */}
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

          <div className="glass-panel p-6 rounded-3xl">
             <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Layout className="w-5 h-5 text-secondary" />
              Templates & Unlocks
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {templates.map(t => (
                <div key={t.id} className={`flex-shrink-0 w-48 p-4 rounded-2xl border ${t.locked ? 'bg-background/50 border-white/5 opacity-50' : 'glass-panel-purple border-secondary/30 hover:border-secondary'} transition-all cursor-pointer`}>
                  <div className={`w-10 h-10 rounded-lg mb-3 flex items-center justify-center ${t.locked ? 'bg-white/5' : 'bg-secondary/20'}`}>
                    <Star className={`w-5 h-5 ${t.locked ? 'text-white/30' : 'text-secondary'}`} />
                  </div>
                  <h4 className="font-bold text-sm">{t.name}</h4>
                  <p className="text-[10px] mt-1 text-muted-foreground">{t.locked ? 'Reach Lvl 10 to unlock' : 'Ready to use'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - AI Mentor & Collaboration */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border-primary/30 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2 text-glow">
              <Image className="w-5 h-5 text-primary" />
              AI Suggestions
            </h2>
            <ul className="space-y-4 relative z-10">
              <li className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-primary/30 transition-colors text-sm">
                <span className="font-bold text-primary block mb-1">Color Grade Trick</span>
                Try boosting the cyan midtones in your latest video for that cyberpunk vibe.
              </li>
              <li className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-primary/30 transition-colors text-sm">
                <span className="font-bold text-primary block mb-1">Trending Audio</span>
                Synthwave track #84 is trending. Use it to boost algorithm reach by 24%.
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
        </div>

      </div>
    </div>
  );
}
