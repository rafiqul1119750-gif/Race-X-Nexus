// frontend/src/pages/dashboard.tsx
import { RxBadge } from '../components/RxBadge'; // Agar badge banaya hai toh

export default function Dashboard() {
  const cards = [
    { title: 'AI STUDIO', path: '/studio', icon: '🎨', glow: 'shadow-[#00F2FF]/20' },
    { title: 'MAGIC CHAT', path: '/magic', icon: '✨', glow: 'shadow-purple-500/20' },
    { title: 'SOCIAL HUB', path: '/social', icon: '🌐', glow: 'shadow-green-500/20' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] p-5 pb-24 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-black italic text-[#00F2FF]">DASHBOARD</h2>
        <div className="bg-white/5 p-2 rounded-xl border border-white/10">🔔</div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-5">
        {cards.map((card) => (
          <div key={card.title} className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 shadow-2xl ${card.glow}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold italic tracking-tighter">{card.title}</h3>
                <p className="text-[10px] text-[#00F2FF] font-bold tracking-widest mt-1">ACCESS GRANTED</p>
              </div>
              <span className="text-4xl opacity-80">{card.icon}</span>
            </div>
            
            <button className="mt-6 w-full py-3 bg-white text-black font-black text-xs rounded-xl uppercase tracking-widest hover:bg-[#00F2FF] transition-all">
              Launch Module
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Nav (Floating) */}
      <nav className="fixed bottom-6 left-5 right-5 h-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl flex justify-around items-center px-4">
        <button className="text-[#00F2FF]">🏠</button>
        <button className="opacity-40">🔍</button>
        <button className="opacity-40">💎</button>
        <button className="opacity-40">⚙️</button>
      </nav>
    </div>
  );
}
