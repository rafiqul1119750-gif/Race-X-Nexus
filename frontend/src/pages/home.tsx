import React, { useState } from 'react';
import { Heart, MessageCircle, User, Play, Search, Settings, ChevronLeft, Mic, Image as ImageIcon } from 'lucide-react';

// 1. 💬 CHAT SYSTEM (Messenger - Live Text/Voice/Media)
export const ChatSystem = ({ onBack }: { onBack: () => void }) => {
  const [view, setView] = useState<'list' | 'screen'>('list');
  return (
    <div className="fixed inset-0 bg-black z-[60] flex flex-col">
      <header className="p-4 border-b border-gray-800 flex items-center gap-4">
        <button onClick={view === 'list' ? onBack : () => setView('list')}><ChevronLeft /></button>
        <h2 className="font-bold text-xl">{view === 'list' ? 'Messenger' : 'User_Node'}</h2>
      </header>
      {view === 'list' ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} onClick={() => setView('screen')} className="flex gap-3 items-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-blue-900 border border-blue-500"></div>
              <div><p className="font-bold">User Node {i}</p><p className="text-xs text-gray-500">Sent a voice message</p></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="bg-blue-600 self-end p-2 rounded-lg max-w-[70%] ml-auto text-sm">Bhai, ye logic live hai!</div>
            <div className="bg-gray-800 self-start p-2 rounded-lg max-w-[70%] text-sm italic">Voice Message • 0:12</div>
          </div>
          <div className="p-4 border-t border-gray-800 flex gap-4 items-center bg-black">
            <button className="text-blue-500"><ImageIcon size={24}/></button>
            <input type="text" placeholder="Aa message..." className="flex-1 bg-gray-900 rounded-full px-4 py-2 outline-none text-sm" />
            <button className="text-blue-500"><Mic size={24}/></button>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. 🔍 EXPLORE PAGE (Trending & Grid Feed)
export const ExplorePage = () => (
  <div className="p-4 space-y-4 h-full overflow-y-auto">
    <div className="flex items-center bg-gray-900 rounded-lg px-3 py-2 gap-2">
      <Search size={18} className="text-gray-500" />
      <input type="text" placeholder="Search Users, Videos, Hashtags..." className="bg-transparent outline-none text-sm w-full" />
    </div>
    <div className="grid grid-cols-3 gap-1">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="aspect-[9/16] bg-gray-800 relative group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40"><Play size={20}/></div>
          <img src={`https://picsum.photos/seed/${i+20}/200/300`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  </div>
);

// 3. ❤️ ACTIVITY TAB (Likes/Follows/Mentions)
export const ActivityPage = () => (
  <div className="p-4 space-y-6 h-full overflow-y-auto">
    <h2 className="font-black text-2xl">Notifications</h2>
    {['Liked your reel', 'Started following you', 'Commented: "Masterpiece!"'].map((text, i) => (
      <div key={i} className="flex items-center justify-between border-b border-gray-900 pb-4">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 to-pink-500"></div>
          <p className="text-sm"><span className="font-bold">User_{i+1}</span> {text}</p>
        </div>
        <div className="w-10 h-12 bg-gray-800 rounded overflow-hidden"><img src={`https://picsum.photos/seed/${i+40}/50/50`} /></div>
      </div>
    ))}
  </div>
);

// 4. 👤 PROFILE TAB (Header, Tabs, Settings)
export const ProfileTab = () => (
  <div className="flex-1 overflow-y-auto bg-black">
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="w-20 h-20 rounded-full border-2 border-blue-500 p-1"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" className="rounded-full" /></div>
        <div className="flex gap-6 text-center mt-4">
          <div><p className="font-bold">128</p><p className="text-[10px] text-gray-500">Reels</p></div>
          <div><p className="font-bold">1.2M</p><p className="text-[10px] text-gray-500">Followers</p></div>
        </div>
        <button className="mt-4"><Settings size={24} /></button>
      </div>
      <div><p className="font-bold">Omniverse God</p><p className="text-xs text-gray-400">Race-X Official Admin Node</p></div>
      <button className="w-full bg-gray-900 border border-gray-700 py-2 rounded font-bold text-sm">Edit Profile</button>
    </div>
    <div className="grid grid-cols-3 border-t border-gray-800 text-center py-2">
      <div className="border-b-2 border-blue-500 pb-2">🧱</div><div>🎬</div><div>🔖</div>
    </div>
    <div className="grid grid-cols-3 gap-0.5 mt-0.5">
      {[...Array(9)].map((_, i) => <div key={i} className="aspect-square bg-gray-900"></div>)}
    </div>
  </div>
);
