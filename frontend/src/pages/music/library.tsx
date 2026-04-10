import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Download, Clock, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { databases } from "../../lib/appwrite";

const DATABASE_ID = 'racex_db';
const COLLECTION_ID = 'api_configs';

export default function NexusLibrary() {
  const [, setLocation] = useLocation();
  const [recentTracks, setRecentTracks] = useState<any[]>([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const config = response.documents.find(doc => doc.service_name === 'JAMENDO_MUSIC');
        if (config) {
          const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${config.key_value}&format=json&limit=6&order=releasedate_desc`);
          const data = await res.json();
          setRecentTracks(data.results);
        }
      } catch (err) { console.error(err); }
    };
    fetchLibrary();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/music/main")} className="p-3 bg-zinc-900 rounded-2xl"><ArrowLeft size={20} /></button>
          <h1 className="text-3xl font-black italic uppercase">My Nexus</h1>
        </div>
        <button className="p-3 bg-green-500 text-black rounded-2xl"><Plus size={20} /></button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="aspect-square bg-zinc-900 rounded-[35px] flex flex-col items-center justify-center border border-white/5">
          <Zap className="text-green-500 mb-2" />
          <span className="text-[10px] font-black uppercase">AI Mix</span>
        </div>
        <div className="aspect-square bg-zinc-900 rounded-[35px] flex flex-col items-center justify-center border border-white/5">
          <Download className="text-zinc-500 mb-2" />
          <span className="text-[10px] font-black uppercase">Offline</span>
        </div>
      </div>

      <h3 className="text-[10px] font-black uppercase text-zinc-500 mb-6 flex items-center gap-2"><Clock size={12}/> Recent Syncs</h3>
      <div className="space-y-4">
        {recentTracks.map(track => (
          <div key={track.id} className="flex items-center gap-4 p-3 bg-zinc-900/30 rounded-2xl border border-white/5">
            <img src={track.image} className="w-10 h-10 rounded-lg" />
            <div className="flex-1 overflow-hidden">
              <h4 className="text-[11px] font-black uppercase truncate">{track.name}</h4>
              <p className="text-[9px] text-zinc-600 font-bold uppercase">{track.artist_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
