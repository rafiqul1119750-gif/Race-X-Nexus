const reels = [
  { id: 1, user: "Deepak_AI", likes: "12k", title: "Testing RX Studio Glow" },
  { id: 2, user: "Rohan_Nexus", likes: "5k", title: "New AI Voice is fire!" }
];

export default function Social() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold italic text-pink-500">RX SOCIAL FEED</h1>
      {reels.map(reel => (
        <div key={reel.id} className="relative aspect-[9/16] w-full glass-card overflow-hidden rounded-3xl mb-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
          <div className="absolute bottom-6 left-6 z-20">
            <p className="font-bold text-white">@{reel.user}</p>
            <p className="text-sm text-zinc-300">{reel.title}</p>
            <div className="flex gap-4 mt-3 text-xs text-pink-500 font-bold">
              <span>❤️ {reel.likes}</span> <span>💬 450</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
