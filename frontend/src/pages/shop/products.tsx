export default function ProductDetails() {
  return (
    <div className="min-h-screen bg-black text-white pb-10">
      {/* Dynamic Trust Features (Amazon style) */}
      <div className="grid grid-cols-3 gap-1 p-6 border-b border-white/5 bg-zinc-950/50">
        <TrustItem icon={<Truck size={16}/>} label="Fast Delivery" />
        <TrustItem icon={<ShieldCheck size={16}/>} label="Nexus Warranty" />
        <TrustItem icon={<RotateCcw size={16}/>} label="7 Day Return" />
      </div>

      <div className="p-6 space-y-8">
        {/* Gallery Placeholder */}
        <div className="aspect-square w-full rounded-[40px] bg-zinc-900 border border-white/5 relative overflow-hidden">
          <img src="https://picsum.photos/800/800?random=510" className="w-full h-full object-cover" alt="Product" />
        </div>

        {/* Info Area */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Nexus Buds Pro Max</h1>
            <Share2 className="text-zinc-500" />
          </div>
          <p className="text-xs text-zinc-500 font-bold leading-relaxed uppercase tracking-widest opacity-70">
            Active Noise Cancellation with Neural Processing Unit. Experience 60H battery life.
          </p>
        </div>

        {/* Selection Logic */}
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Select Variant</p>
          <div className="flex gap-3">
            {['Space Black', 'Neon Blue', 'Titanium'].map(color => (
              <button key={color} className="px-5 py-3 rounded-2xl border border-white/10 bg-zinc-900 text-[9px] font-black uppercase tracking-widest active:scale-90 transition-all">
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustItem({ icon, label }: any) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="text-cyan-400">{icon}</div>
      <span className="text-[8px] font-black uppercase tracking-tighter text-zinc-500">{label}</span>
    </div>
  );
}
