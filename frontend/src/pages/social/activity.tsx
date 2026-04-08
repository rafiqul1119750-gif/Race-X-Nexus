import { useLocation } from "wouter";
import { ArrowLeft, Bell, Heart, UserPlus } from "lucide-react";

export default function ActivityPage() {
  const [, setLocation] = useLocation();

  const notifications = [
    { id: 1, user: 'Zoya_AI', action: 'liked your post', icon: Heart, color: 'text-red-500' },
    { id: 2, user: 'Nexus_Admin', action: 'followed you', icon: UserPlus, color: 'text-cyan-500' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="flex items-center gap-4 mb-10">
        <ArrowLeft onClick={() => setLocation('/social/feed')} className="text-zinc-500" />
        <h1 className="text-sm font-black italic tracking-[0.2em] uppercase">Activity Feed</h1>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-center justify-between p-5 bg-zinc-900/40 border border-white/5 rounded-[25px]">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-xl bg-black border border-white/10 ${n.color}`}>
                <n.icon size={16} />
              </div>
              <div>
                <p className="text-[11px] font-black italic">@{n.user}</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">{n.action}</p>
              </div>
            </div>
            <button className="text-[9px] font-black bg-white text-black px-3 py-1.5 rounded-lg uppercase">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}
