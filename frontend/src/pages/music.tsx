const tracks = [
  { id: 1, title: "Kesariya (AI Remix)", artist: "Arijit Singh x RX", duration: "3:42" },
  { id: 2, title: "Zaalima (Lofi Edit)", artist: "Pritam x AI", duration: "4:15" },
  { id: 3, title: "Desi Kalakaar 2.0", artist: "Honey Singh AI", duration: "3:10" }
];

export default function Music() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold italic text-purple-400">RX MUSIC LIBRARY</h1>
      <div className="space-y-3">
        {tracks.map(track => (
          <div key={track.id} className="flex items-center justify-between p-3 bg-[#111] rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-900 rounded flex items-center justify-center">🎵</div>
              <div>
                <p className="font-bold text-sm">{track.title}</p>
                <p className="text-[10px] text-zinc-500">{track.artist}</p>
              </div>
            </div>
            <span className="text-xs text-zinc-500">{track.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
