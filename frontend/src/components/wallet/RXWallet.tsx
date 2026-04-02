import { Coins, TrendingUp, ArrowUpRight, Wallet } from "lucide-react";

interface RXWalletProps {
  diamonds: number;
  gems: number;
}

export function RXWallet({ diamonds, gems }: RXWalletProps) {
  // Conversion: 10 Diamonds = ₹1
  const inrBalance = (diamonds / 10).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  });

  return (
    <div className="w-full space-y-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-zinc-900 to-black p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <Wallet size={12} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">RX-NEXUS WALLET</span>
          </div>
        </div>

        <p className="text-xs font-bold text-zinc-500 uppercase italic">Estimated Balance</p>
        <h2 className="text-5xl font-black italic tracking-tighter text-white mt-1 mb-6">
          {inrBalance}
        </h2>

        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-yellow-500">
              <Coins size={14} />
              <span className="text-[10px] font-black uppercase">Diamonds</span>
            </div>
            <p className="text-xl font-bold text-white">{diamonds.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-purple-500">
              <TrendingUp size={14} />
              <span className="text-[10px] font-black uppercase">Gems</span>
            </div>
            <p className="text-xl font-bold text-white">{gems.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase italic flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-95">
        Withdraw Cash <ArrowUpRight size={16} />
      </button>
    </div>
  );
}
