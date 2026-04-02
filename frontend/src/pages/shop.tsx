const products = [
  { id: 1, name: "Gold Creator Pack", price: "₹499", icon: "👑" },
  { id: 2, name: "1000 RX Diamonds", price: "₹199", icon: "💎" },
  { id: 3, name: "Premium Voice Pack", price: "₹99", icon: "🎙️" }
];

export default function Shop() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold italic text-yellow-500">RX PREMIUM SHOP</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-[#111] p-4 rounded-2xl border border-yellow-500/20 flex flex-col items-center text-center">
            <span className="text-4xl mb-2">{p.icon}</span>
            <h3 className="font-bold text-sm mb-1">{p.name}</h3>
            <p className="text-yellow-500 font-black mb-3">{p.price}</p>
            <button className="w-full bg-yellow-500 text-black py-2 rounded-xl text-[10px] font-bold uppercase">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
