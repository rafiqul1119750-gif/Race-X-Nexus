import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Shuffle } from "lucide-react";

export default function NexusLibrary() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const baseSongs = [
      { name: "Indian Lofi 1", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { name: "Indian Lofi 2", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { name: "Chill India 3", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { name: "Relax Beat 4", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { name: "Night Lofi 5", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { name: "Focus Beat 6", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
      { name: "Tabla Chill 7", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
      { name: "Peace Music 8", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
      { name: "Study Lofi 9", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
      { name: "Deep Chill 10", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
    ];

    // 🔥 AUTO EXPAND → 200+ songs feel
    let expanded: any[] = [];
    for (let i = 0; i < 20; i++) {
      expanded = [...expanded, ...baseSongs.map((s, idx) => ({
        id: `${i}-${idx}`,
        name: s.name + " #" + (i + 1),
        url: s.url
      }))];
    }

    setTracks(expanded);
  }, []);

  useEffect(() => {
    if (audioRef.current && tracks.length) {
      audioRef.current.src = tracks[current]?.url;
      if (playing) audioRef.current.play();
    }
  }, [current, tracks]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) audioRef.current.pause();
    else audioRef.current.play();

    setPlaying(!playing);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % tracks.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const shuffle = () => {
    setTracks((p) => [...p].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col justify-between">

      {/* LIST */}
      <div className="p-4 overflow-y-scroll flex-1 space-y-3">
        {tracks.map((t, i) => (
          <div
            key={t.id}
            onClick={() => setCurrent(i)}
            className={`p-3 rounded-xl ${
              current === i ? "bg-green-500 text-black" : "bg-zinc-900"
            }`}
          >
            {t.name}
          </div>
        ))}
      </div>

      {/* PLAYER */}
      <div className="p-4 bg-zinc-900 flex items-center justify-between">

        <button onClick={prev}>
          <SkipBack />
        </button>

        <button onClick={togglePlay}>
          {playing ? <Pause /> : <Play />}
        </button>

        <button onClick={next}>
          <SkipForward />
        </button>

        <button onClick={shuffle}>
          <Shuffle />
        </button>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
