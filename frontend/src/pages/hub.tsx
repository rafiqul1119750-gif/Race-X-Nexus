// Isme visibility ke liye "Contrast Borders" add kiye hain
<div className={`grid grid-cols-2 gap-4`}>
  {modules.map((mod, i) => (
    <motion.div
      key={i}
      whileTap={{ scale: 0.92 }}
      onClick={mod.action}
      className={`aspect-square bg-zinc-900/60 backdrop-blur-2xl border-[1.5px] ${mod.border} rounded-[38px] flex flex-col items-center justify-center gap-4 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
    >
      {/* Ye white glow dhoop mein visibility badhayega */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      <div className={`p-4 rounded-2xl bg-black border border-white/10 shadow-2xl relative z-10`}>
        <mod.icon className={`w-8 h-8 ${mod.color} drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]`} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white drop-shadow-md">
        {mod.label}
      </span>
    </motion.div>
  ))}
</div>
