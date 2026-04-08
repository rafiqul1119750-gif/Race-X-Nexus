export default function CommentsPage() {
  return (
    <div className="h-screen bg-zinc-950 text-white p-6 rounded-t-[40px] mt-20 border-t border-white/10">
      <h2 className="text-sm font-black uppercase mb-6 tracking-widest text-cyan-400">Comments</h2>
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800" />
          <div>
            <p className="text-[10px] font-black italic">@Hacker_X</p>
            <p className="text-xs text-zinc-400">This UI is fire! 🔥</p>
          </div>
        </div>
      </div>
      {/* Input Box */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-black border-t border-white/5">
        <input type="text" placeholder="Add a comment..." className="w-full bg-zinc-900 p-4 rounded-2xl text-xs outline-none focus:border-cyan-500 border border-transparent" />
      </div>
    </div>
  );
}
