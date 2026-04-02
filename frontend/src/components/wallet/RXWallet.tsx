// File: frontend/src/components/wallet/RXWallet.tsx

export function RXWallet({ diamonds, gems }: RXWalletProps) {
  // Logic: 10 Diamonds = 1 Credit (Value 1 INR)
  const creditBalance = (diamonds / 10).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  });

  return (
    <div className="w-full space-y-4 animate-in slide-in-from-right-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-zinc-900 to-black p-6 border border-white/10 shadow-2xl">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">NEXUS ASSETS</span>
            </div>
          </div>

          <p className="text-xs font-bold text-zinc-500 uppercase italic">Current Credits</p>
          <h2 className="text-5xl font-black italic tracking-tighter text-white mt-1 mb-6">
             {creditBalance} <span className="text-xl not-italic text-zinc-500">RX</span>
          </h2>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-yellow-500">Diamonds</span>
              <p className="text-xl font-bold text-white">{diamonds.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-purple-500">Nexus Gems</span>
              <p className="text-xl font-bold text-white">{gems.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* No "Withdraw" button, instead use "Redeem Assets" */}
      <div className="flex gap-3">
        <button className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-xs uppercase italic flex items-center justify-center gap-2">
          Redeem Assets <ArrowUpRight size={16} />
        </button>
        <button className="px-6 bg-zinc-900 text-white border border-white/10 rounded-2xl font-black text-xs uppercase italic">
          Top-Up
        </button>
      </div>
    </div>
  );
}
