export default function SearchPage() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="flex items-center gap-4 bg-zinc-900 p-4 rounded-2xl border border-white/10">
        <Search size={18} className="text-zinc-500" />
        <input type="text" placeholder="Search Creators or Effects..." className="bg-transparent outline-none text-xs w-full font-bold" />
      </div>
      <div className="grid grid-cols-3 gap-1 mt-6">
        {/* Fake Search Results Grid */}
        {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-zinc-900 animate-pulse rounded-lg" />)}
      </div>
    </div>
  );
}
