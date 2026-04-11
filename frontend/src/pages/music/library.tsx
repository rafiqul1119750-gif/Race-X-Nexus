import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  Heart,
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

  // ================= INDIAN MUSIC ENGINE =================
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

        const api = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${config.key_value}&format=json&limit=30`
        );

        const data = await api.json();

        // 🎧 RAW TRACKS
        const raw = (data.results || []).map((t: any) => ({
          id: t.id,
          name: t.name,
          artist_name: t.artist_name,
          audio: t.audio || t.audiodownload,
          image: t.album_image || t.image,
        }));

        // 🇮🇳 INDIAN VIBE FILTER (REAL JUGAAD)
        const indianTracks = raw.filter((t: any) => {
          const text = (t.name + " " + t.artist_name).toLowerCase();

          return (
            text.includes("love") ||
            text.includes("indian") ||
            text.includes("folk") ||
            text.includes("bollywood") ||
            text.includes("acoustic") ||
            text.includes("desi") ||
            text.includes("sad") ||
            text.includes("romantic")
          );
        });

        // 🔥 IF EMPTY → fallback to full list
        const finalTracks =
          indianTracks.length > 0 ? indianTracks : raw;

        setTracks(finalTracks);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  // ================= PLAY =================
  const play = (t: any) => {
    setCurrent(t);
    setPlaying(true);
  };

  // ================= LIKE =================
  const toggleLike = (id: string) => {
    setLiked((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );
  };

  // ================= AI MIX =================
  const mix = () => {
    setTracks((p) => [...p].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setLocation("/music/main")}
          className="p-3 bg-zinc-900 rounded-2xl"
        >
          <ArrowLeft />
        </button>

        <button
          onClick={mix}
          className="p-3 bg-green-600 rounded-2xl"
        >
          <Wand2 />
        </button>
      </div>

      {/* TRACK LIST */}
      <div className="space-y-4">
        {tracks.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 p-3 bg-zinc-900/40 rounded-2xl"
          >
            <img
              src={t.image}
              className="w-10 h-10 rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="text-xs font-black">{t.name}</p>
              <p className="text-[10px] text-zinc-500">
                {t.artist_name}
              </p>
            </div>

            <button onClick={() => play(t)}>
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
          </div>
        ))}
      </div>

      {/* MINI PLAYER */}
      {current && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t p-3 flex items-center gap-3">

          <img
            src={current.image}
            className="w-10 h-10 rounded-lg"
          />

          <div className="flex-1">
            <p className="text-xs font-black">{current.name}</p>
            <p className="text-[10px] text-zinc-500">
              {current.artist_name}
            </p>
          </div>

          <audio
            src={current.audio}
            controls
            autoPlay={playing}
          />
        </div>
      )}
    </div>
  );
}
