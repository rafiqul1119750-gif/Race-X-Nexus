import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function SignIn() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-black italic tracking-tighter text-neon">RACE-X</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] mt-2">Access Nexus Node</p>
        </div>

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="NEXUS ID (EMAIL)" 
            className="w-full bg-zinc-900/50 border border-white/10 p-4 rounded-2xl text-xs focus:border-cyan-500 outline-none transition-all"
          />
          <input 
            type="password" 
            placeholder="PASSCODE" 
            className="w-full bg-zinc-900/50 border border-white/10 p-4 rounded-2xl text-xs focus:border-cyan-500 outline-none transition-all"
          />
        </div>

        <button 
          onClick={() => setLocation("/hub")}
          className="w-full bg-cyan-500 text-black font-black py-4 rounded-2xl text-[10px] tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          Initialize Login
        </button>

        <p className="text-center text-[10px] text-zinc-500">
          NEW CREATOR?{" "}
          <span 
            onClick={() => setLocation("/auth/signup")}
            className="text-cyan-400 cursor-pointer underline underline-offset-4"
          >
            CREATE ACCOUNT
          </span>
        </p>
      </motion.div>
    </div>
  );
}
