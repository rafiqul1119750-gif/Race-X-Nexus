const templates = [
  { id: 1, name: "Bollywood Glow", desc: "High-end cinematic lighting", price: "Free" },
  { id: 2, name: "Cyberpunk Mumbai", desc: "Neon lights & rain effects", price: "Premium" },
  { id: 3, name: "Indian Wedding AI", desc: "Perfect for traditional videos", price: "Free" }
];

export default function Studio() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold italic text-cyan-400">RX STUDIO TEMPLATES</h1>
      <div className="grid grid-cols-1 gap-4">
        {templates.map(t => (
          <div key={t.id} className="glass-card p-4 border-l-4 border-cyan-500">
            <h3 className="font-bold text-lg">{t.name}</h3>
            <p className="text-xs text-zinc-400">{t.desc}</p>
            <button className="mt-3 text-[10px] bg-cyan-500 text-black px-3 py-1 rounded-full font-bold uppercase">Use Template</button>
          </div>
        ))}
      </div>
    </div>
  );
}
