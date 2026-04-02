import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

export default function Home() {
  const stories = [1, 2, 3, 4, 5, 6];
  const posts = [
    { id: 1, user: "nexus_ai", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800", likes: "12.5k", caption: "Generated this cinematic world in Race-X AI Studio! 🚀" },
    { id: 2, user: "cyber_punk", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800", likes: "8k", caption: "The future is here. #RaceX #Nexus" }
  ];

  return (
    <div className="py-4 space-y-6">
      {/* STORIES SECTION */}
      <div className="flex gap-4 overflow-x-auto px-4 no-scrollbar pb-2">
        {stories.map((s) => (
          <div key={s} className="flex flex-col items-center gap-1 min-w-[70px]">
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
              <div className="w-full h-full rounded-full bg-black border-2 border-black overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`} alt="story" />
              </div>
            </div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">User_{s}</span>
          </div>
        ))}
      </div>

      {/* FEED POSTS */}
      {posts.map((post) => (
        <div key={post.id} className="border-b border-white/5 pb-4">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-zinc-800" />
              <span className="text-sm font-black italic uppercase">{post.user}</span>
            </div>
            <MoreHorizontal size={20} className="text-zinc-500" />
          </div>
          
          <img src={post.img} className="w-full aspect-square object-cover" alt="post" />

          <div className="px-4 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <Heart size={26} className="hover:text-red-500 cursor-pointer" />
                <MessageCircle size={26} className="hover:text-blue-400 cursor-pointer" />
                <Send size={26} className="hover:text-green-400 cursor-pointer" />
              </div>
              <Bookmark size={26} />
            </div>
            <p className="text-sm font-black italic">{post.likes} likes</p>
            <p className="text-sm"><span className="font-black italic mr-2">{post.user}</span> {post.caption}</p>
            <p className="text-[10px] text-zinc-600 font-bold uppercase mt-2">View all 145 comments</p>
          </div>
        </div>
      ))}
    </div>
  );
}
