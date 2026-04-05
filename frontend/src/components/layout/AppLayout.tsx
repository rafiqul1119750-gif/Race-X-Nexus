import { useState } from "react";
import { 
  Home, Search, PlusSquare, Play, MessageCircle, 
  Heart, User, Bell, Menu, Sparkles, X, Share2, MoreHorizontal
} from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");

  const handlePostSubmit = async () => {
    if(!postContent) return;
    try {
      const response = await fetch("https://race-x-nexus.onrender.com/api/social/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: postContent,
          user_id: "user_rx_" + Math.random().toString(36).substr(2, 5),
          user_name: "Race-X User",
          image_url: ""
        })
      });
      if(response.ok) {
        alert("Post Published! 🚀");
        setIsPostModalOpen(false);
        setPostContent("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
      {/* TOP NAVBAR (Facebook Style) */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#1c1c1c] border-b border-white/10 flex items-center justify-between px-4 z-[100]">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black italic text-blue-500 tracking-tighter">RACE-X</span>
          <div className="hidden md:flex items-center bg-[#2b2b2b] px-3 py-1.5 rounded-full ml-4">
            <Search size={18} className="text-zinc-500" />
            <input type="text" placeholder="Search Race-X" className="bg-transparent border-none focus:outline-none ml-2 text-sm w-48" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#2b2b2b] rounded-full hover:bg-zinc-700 cursor-pointer"><MessageCircle size={20} /></div>
          <div className="p-2 bg-[#2b2b2b] rounded-full hover:bg-zinc-700 cursor-pointer"><Bell size={20} /></div>
          <div className="w-9 h-9 rounded-full bg-blue-600 border border-white/10"></div>
        </div>
      </header>

      <div className="flex pt-14 h-screen justify-center">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:flex w-[280px] flex-col p-4 fixed left-0 top-14 overflow-y-auto">
          <nav className="space-y-1">
            <SidebarItem icon={<User className="text-blue-500" />} label="My Profile" />
            <SidebarItem icon={<Home className="text-blue-500" />} label="Feeds" active />
            <SidebarItem icon={<Sparkles className="text-purple-400" />} label="AI Studio" />
            <SidebarItem icon={<Play className="text-red-500" />} label="RX Reels" />
            <div className="border-b border-white/10 my-4"></div>
            <p className="text-zinc-500 text-xs font-bold mb-2 px-3">SHORTCUTS</p>
            <SidebarItem icon={<div className="w-6 h-6 bg-zinc-800 rounded"></div>} label="Gaming Zone" />
            <SidebarItem icon={<div className="w-6 h-6 bg-zinc-800 rounded"></div>} label="Race Events" />
          </nav>
        </aside>

        {/* MIDDLE FEED AREA (Facebook Style Width) */}
        <main className="w-full max-w-[680px] px-4 py-6 mb-20 md:mb-0">
          {/* CREATE POST BOX (Facebook Style) */}
          <div className="bg-[#1c1c1c] rounded-xl p-4 mb-6 border border-white/5">
            <div className="flex gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 shrink-0"></div>
              <button 
                onClick={() => setIsPostModalOpen(true)}
                className="w-full bg-[#2b2b2b] hover:bg-zinc-700 text-zinc-400 text-left px-4 rounded-full text-sm transition-all"
              >
                What's on your mind, Racer?
              </button>
            </div>
            <div className="border-t border-white/5 pt-3 flex justify-around">
              <button onClick={() => setIsPostModalOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:bg-white/5 p-2 rounded-lg flex-1 justify-center">
                <PlusSquare className="text-green-500" size={20} /> Post
              </button>
              <button className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:bg-white/5 p-2 rounded-lg flex-1 justify-center">
                <Play className="text-red-500" size={20} /> Live
              </button>
            </div>
          </div>

          {/* ASLI CONTENT (CHILDREN) */}
          <div className="space-y-4">
            {children}
          </div>
        </main>

        {/* RIGHT SIDEBAR (Trending) */}
        <aside className="hidden xl:flex w-[320px] flex-col p-4 fixed right-0 top-14">
          <div className="bg-[#1c1c1c] rounded-xl p-4 border border-white/5">
            <h3 className="font-bold text-zinc-500 mb-4 uppercase text-xs tracking-widest">Trending Now</h3>
            <div className="space-y-4">
              <TrendingItem tag="#NeonCity" posts="12.5k posts" />
              <TrendingItem tag="#RaceX2026" posts="8.2k posts" />
              <TrendingItem tag="#AIGeneration" posts="5.1k posts" />
            </div>
          </div>
        </aside>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#1c1c1c] border-t border-white/10 flex items-center justify-around z-[100]">
        <Home size={24} className="text-blue-500" />
        <Play size={24} />
        <PlusSquare size={28} onClick={() => setIsPostModalOpen(true)} className="text-zinc-400" />
        <Search size={24} />
        <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/20" />
      </nav>

      {/* POST MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] p-4 backdrop-blur-sm">
          <div className="bg-[#1c1c1c] w-full max-w-lg border border-white/10 rounded-xl shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-center w-full">Create Post</h3>
              <X className="cursor-pointer text-zinc-400 hover:text-white" onClick={() => setIsPostModalOpen(false)} />
            </div>
            <div className="p-4">
              <textarea 
                className="w-full bg-transparent border-none text-white focus:outline-none min-h-[150px] text-lg resize-none"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <button 
                onClick={handlePostSubmit}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
                disabled={!postContent}
              >
                Post to Race-X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${active ? 'bg-white/5' : 'hover:bg-white/5'}`}>
      <span className="shrink-0">{icon}</span>
      <span className={`text-[15px] font-semibold ${active ? 'text-white' : 'text-zinc-300'}`}>{label}</span>
    </div>
  );
}

function TrendingItem({ tag, posts }: any) {
  return (
    <div className="cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all">
      <p className="text-blue-400 font-bold text-sm">{tag}</p>
      <p className="text-zinc-500 text-xs">{posts}</p>
    </div>
  );
}
