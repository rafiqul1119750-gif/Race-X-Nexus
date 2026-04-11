import { ArrowLeft, Music, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";

export default function RXMusic() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-6">

      <header className="flex justify-between items-center mb-16">
        <button
          onClick={() => setLocation("/hub")}
          className="p-3 bg-zinc-900 rounded-2xl"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
          <ShieldCheck size={10} className="text-green-500" />
          <span className="text-[8px] font-black text-green-500 uppercase">
            INDIAN MUSIC MODE
          </span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        <Music size={80} className="text-green-500 animate-bounce" />

        <h1 className="text-4xl font-black italic mt-6">
          RX <span className="text-green-500">Music</span>
        </h1>

        <button
          onClick={() => setLocation("/music/library")}
          className="mt-10 bg-green-500 text-black px-6 py-3 rounded-2xl font-black"
        >
          Enter Indian Collection
        </button>
      </div>
    </div>
  );
}
