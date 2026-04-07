import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  Camera, Search, MessageSquare, Bell, Heart, 
  Share2, Bookmark, Music2, Plus, User, Compass, 
  Activity, MoreVertical 
} from 'lucide-react';

const SocialApp = () => {
  const [, setLocation] = useLocation();
  const [activeReel, setActiveReel] = useState(0);

  // Real data structure based on your diagram
  const reels = [
    {
      id: 1,
      video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1545-large.mp4',
      user: 'RaceX_Creator',
      caption: 'Testing the new AI Engine for Race-X! 💎 #AI #Futuristic',
      music: 'Race-X Original Audio',
      likes: '24.5K',
      comments: '1.2K'
    },
    {
      id: 2,
      video: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-background-with-lines-and-dots-1130-large.mp4',
      user: 'Nexus_Labs',
      caption: 'The future of social media is here. Join the revolution. 🚀',
      music: 'Cyber Synth - Nexus',
      likes: '102K',
      comments: '5.8K'
    }
  ];

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden flex flex-col">
      
      {/* 🔝 TOP BAR (Diagram: Camera, Search, DM, Notifications) */}
      <header className="absolute top-0 w-full z-50 flex items-center justify-between px-6 py-5 bg-gradient-to-b from-black/70 to-transparent">
        <Camera className="w-7 h-7 cursor-pointer hover:text-cyan-400" onClick={() => setLocation('/social/create')} />
        <div className="flex items-center gap-6">
          <Search className="w-6 h-6 cursor-pointer" onClick={() => setLocation('/social/explore')} />
          <MessageSquare className="w-6 h-6 cursor-pointer" onClick={() => setLocation('/chat')} />
          <Bell className="w-6 h-6 cursor-pointer" onClick={() => setLocation('/social/activity')} />
        </div>
      </header>

      {/* 🏠 HOME (Reels Default - Infinite Scroll) */}
      <main className="flex-1 overflow-y-scroll snap-y snap-mandatory no-scrollbar h-full">
        {reels.map((reel, index) => (
          <section key={reel.id} className="h-screen w-full snap-start relative flex items-center justify-center bg-zinc-900">
            {/* Video Player Component */}
            <video 
              src={reel.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />

            {/* Right Side Actions (Workable Buttons) */}
            <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-20">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-400 p-0.5 overflow-hidden shadow-[0_0_10px_rgba(0,225,255,0.5)]">
                  <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${reel.user}`} alt="User" />
                </div>
                <div className="bg-cyan-500 rounded-full p-0.5 -mt-3 z-30">
                  <Plus className="w-3 h-3 text-black font-bold" />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Heart className="w-8 h-8 text-white drop-shadow-lg hover:text-red-500 transition-colors cursor-pointer" />
                <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">{reel.likes}</span>
              </div>

              <div className="flex flex-col items-center cursor-pointer" onClick={() => console.log('Open Comments')}>
                <MessageSquare className="w-8 h-8 text-white drop-shadow-lg" />
                <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">{reel.comments}</span>
              </div>

              <Share2 className="w-8 h-8 text-white drop-shadow-lg cursor-pointer" />
              <Bookmark className="w-8 h-8 text-white drop-shadow-lg cursor-pointer" />
              
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center animate-spin-slow">
                <Music2 className="w-5 h-5 text-zinc-400" />
              </div>
            </div>

            {/* Bottom Content (User Info & Description) */}
            <div className="absolute bottom-28 left-4 right-16 z-20">
              <h3 className="text-lg font-black italic tracking-tighter uppercase mb-2">@{reel.user}</h3>
              <p className="text-sm text-zinc-200 line-clamp-2 mb-4 font-medium tracking-tight">
                {reel.caption}
              </p>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full w-fit border border-white/10">
                <Music2 className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest truncate max-w-[150px]">
                  {reel.music}
                </span>
              </div>
            </div>
            
            {/* Overlay for Ad Interstitials (Mental Placeholder for Step 3) */}
            {index % 5 === 4 && (
              <div className="absolute inset-0 bg-black/60 z-40 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-zinc-900 p-6 rounded-3xl border border-cyan-500 text-center">
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Sponsored Ad</span>
                  <h4 className="text-xl font-bold mt-2">Discover New Tech</h4>
                  <button className="mt-4 bg-cyan-500 text-black font-black px-6 py-2 rounded-full text-xs">Learn More</button>
                </div>
              </div>
            )}
          </section>
        ))}
      </main>

      {/* 🔻 BOTTOM NAV (Diagram: Home, Explore, Create, Activity, Profile) */}
      <nav className="fixed bottom-0 w-full bg-black/80 backdrop-blur-2xl border-t border-zinc-900 px-4 py-4 z-50">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[
            { id: 'home', icon: HomeIcon, path: '/social', active: true },
            { id: 'explore', icon: Compass, path: '/social/explore' },
            { id: 'create', icon: PlusSquareIcon, path: '/social/create' },
            { id: 'activity', icon: Activity, path: '/social/activity' },
            { id: 'profile', icon: User, path: '/social/profile' },
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center gap-1 flex-1 transition-all ${item.active ? 'text-cyan-400 scale-110' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}
        </div>
      </nav>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .animate-spin-slow { animation: spin 5s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// Custom Icons to match Diagram perfectly
const HomeIcon = (p: any) => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>;
const PlusSquareIcon = (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;

export default SocialApp;
