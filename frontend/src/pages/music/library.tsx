import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Download, Clock, Zap, Music } from "lucide-react";
import { useLocation } from "wouter";
import { getNexusKey } from "../../lib/appwrite"; // Path confirm kar lena

export default function NexusLibrary() {
  const [, setLocation] = useLocation();
  const [recentTracks, setRecentTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔄 REAL DATA FETCHING
  useEffect(() => {
    const fetchLibraryData = async () => {
      try {
        const apiKey = await getNexusKey('JAMENDO_MUSIC');
        if (!apiKey) return;

        // Recently Synced ke liye 'Chill' genre ke 5 gaane fetch karna
        const res = await fetch(
          `https://api.jamendo.com/v1.2/tracks/?client_id=${apiKey}&format=json&limit=5&order=releasedate_desc&tags=chill`
        );
        const data = await res.json();
        setRecentTracks(data.results);
      } catch (err) {
        console.error("Library Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLibraryData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/music/main")} className="p-3 bg-zinc-900 rounded-2xl active:scale-75 transition-all">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">My Nexus</h1>
        </div>
        <button className="p-3 bg-cyan-500 text-black rounded-2xl shadow-lg active:scale-90 transition-all">
          <Plus size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
        <LibraryTab label="Playlists" active />
        <LibraryTab label="Artists" />
        <LibraryTab label="Downloaded" icon={<Download size={10}/>} />
      </div>

      {/* Playlists (Asli Categories) */}
      <div className="grid grid-cols-2 gap-4">
        <PlaylistCard title="Night Drive" count="Lo-Fi Mix" cover="https://picsum.photos/400/400?random=201" isAi />
        <PlaylistCard title="Nexus Viral" count="Popular Now" cover="https://picsum.photos/400/400?random=202" />
      </div>

      {/* Recent Activity (AB YE LIVE HAI) */}
      <div className="mt-12 space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Clock size={12}/> Recently Synced
          </h3>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
               <div key={i} className="animate-pulse flex items-center gap-4 p-3 bg-zinc-900/30 rounded-2xl">
                 <div className="w-10 h-10 rounded-lg bg-zinc-800" />
                 <div className="flex-1 space-y-2">
                   <div className="h-2 w-24 bg-zinc-800 rounded-full" />
                   <div className="h-1.5 w-16 bg-zinc-900 rounded-full" />
                 </div>
               </div>
            ))}
          </div>
        ) : (
          recentTracks.map((track) => (
            <div key={track.id} className="flex items-center gap-4 p-3 bg-zinc-900/30 rounded-2xl border border-white/5 hover:bg-zinc-800 transition-all cursor-pointer">
              <img src={track.image} className="w-10 h-10 rounded-lg object-cover" alt="cover" />
              <div className="flex-1 overflow-hidden">
                <h4 className="text-[11px] font-black uppercase truncate italic">{track.name}</h4>
                <p className="text-[9px] text-zinc-600 font-bold uppercase">{track.artist_name}</p>
              </div>
              <Zap size={12} className="text-cyan-500" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Helper Components (Pehle wale hi use honge)
function LibraryTab({ label, active, icon }: any) {
  return (
    <button className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border transition-all ${active ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-white/10'}`}>
      {icon} {label}
    </button>
  );
}

function PlaylistCard({ title, count, cover, isAi }: any) {
  return (
    <div className="space-y-3 group cursor-pointer active:scale-95 transition-all">
      <div className="aspect-square rounded-[35px] overflow-hidden relative border border-white/5">
        <img src={cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Playlist" />
        {isAi && (
          <div className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-xl border border-cyan-500/30 shadow-2xl">
            <Zap size={14} className="text-cyan-400 fill-cyan-400/20" />
          </div>
        )}
      </div>
      <div className="px-2">
        <h4 className="font-black uppercase italic tracking-tighter text-sm">{title}</h4>
        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{count}</p>
      </div>
    </div>
  );
}
