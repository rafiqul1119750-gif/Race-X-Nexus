import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function SignIn() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-black italic tracking-tighter text-white">RACE-X</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] mt-2">Nexus Terminal Login</p>
        </div>

        <div className="space-y-4">
          <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:border-cyan-500" />
          <input type="password" placeholder="PASSCODE" className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:border-cyan-500" />
        </div>

        <button 
          onClick={() => setLocation("/hub")} 
          className="w-full bg-cyan-500 text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-cyan-500/20"
        >
          Initialize Nexus
        </button>

        <p className="text-center text-[10px] text-zinc-500">
          NEW USER? <span onClick={() => setLocation("/auth/signup")} className="text-cyan-400 cursor-pointer">CREATE NODE</span>
        </p>
      </motion.div>
    </div>
  );
}
