import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  Heart,
  Download,
  ListMusic,
  Wand2,
} from "lucide-react";
import { useLocation } from "wouter";
import { databases } from "../../lib/appwrite";

const DATABASE_ID = "racex_db";
const COLLECTION_ID = "api_configs";

export default function NexusLibrary() {
  const [, setLocation] = useLocation();

  const [tracks, setTracks] = useState<any[]>([]);
  const [current, setCurrent] = useState<any>(null);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);
  const [playlist, setPlaylist] = useState<any[]>([]);

  // ================= LOAD JAMENDO =================
  useEffect(() => {
    const load = async () => {
      try {
        const res = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID
        );

        const config = res.documents.find(
          (d) => d.service_name === "JAMENDO_MUSIC"
        );

        if (!config) return;

        const api = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${config.key_value}&format=json&limit=20`
        );

        const data = await api.json();

        // ✅ FIXED MAPPING (IMPORTANT)
        const safeTracks = (data.results || []).map((t: any) => ({
          id: t.id,
          name: t.name,
          artist_name: t.artist_name,
          audio: t.audio || t.audiodownload || "",
          image: t.album_image || t.image || "",
        }));

        setTracks(safeTracks);
      } catch (err) {
        console.error("LOAD ERROR:", err);
      }
    };

    load();
  }, []);

  // ================= PLAY =================
  const playTrack = (t: any) => {
    setCurrent(t);
    setPlaying(true);
  };

  // ================= LIKE =================
  const toggleLike = (id: string) => {
    setLiked((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );
  };

  // ================= DOWNLOAD =================
  const downloadTrack = async (url: string, name: string) => {
    if (!url) return;

    const res = await fetch(url);
    const blob = await res.blob();

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name + ".mp3";
    a.click();
  };

  // ================= AI MIX =================
  const aiMix = () => {
    const shuffled = [...tracks].sort(() => Math.random() - 0.5);
    setTracks(shuffled);
    setPlaylist(shuffled);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setLocation("/music/main")}
          className="p-3 bg-zinc-900 rounded-2xl"
        >
          <ArrowLeft />
        </button>

        <button
          onClick={aiMix}
          className="p-3 bg-purple-600 rounded-2xl"
        >
          <Wand2 />
        </button>
      </div>

      {/* TRACKS */}
      <div className="space-y-4">
        {tracks.map((t) => (
          <div
            key={t.id}
            className="p-3 bg-zinc-900/40 rounded-2xl border border-white/5 flex items-center gap-4"
          >
            {/* IMAGE FIXED */}
            <img
              src={t.image}
              className="w-10 h-10 rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="text-xs font-black truncate">{t.name}</p>
              <p className="text-[10px] text-zinc-500">
                {t.artist_name}
              </p>
            </div>

            <button onClick={() => playTrack(t)}>
              {current?.id === t.id && playing ? <Pause /> : <Play />}
            </button>

            <button onClick={() => toggleLike(t.id)}>
              <Heart
                className={
                  liked.includes(t.id)
                    ? "text-red-500 fill-red-500"
                    : ""
                }
              />
            </button>

            <button onClick={() => downloadTrack(t.audio, t.name)}>
              <Download />
            </button>

            <button onClick={() => setPlaylist([...playlist, t])}>
              <ListMusic />
            </button>
          </div>
        ))}
      </div>

      {/* MINI PLAYER */}
      {current && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-white/10 p-3 flex items-center gap-3">

          <img
            src={current.image}
            className="w-10 h-10 rounded-lg object-cover"
          />

          <div className="flex-1">
            <p className="text-xs font-black truncate">
              {current.name}
            </p>
            <p className="text-[10px] text-zinc-500">
              {current.artist_name}
            </p>
          </div>

          {/* AUDIO FIXED */}
          <audio
            src={current.audio}
            controls
            autoPlay={playing}
            className="w-32"
          />
        </div>
      )}
    </div>
  );
}
