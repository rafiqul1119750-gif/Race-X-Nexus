import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function SignUp() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-black italic tracking-tighter text-cyan-400">JOIN NEXUS</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] mt-2">Become a Race-X Creator</p>
        </div>

        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="CREATOR NAME" 
            className="w-full bg-zinc-900/50 border border-white/10 p-4 rounded-2xl text-xs focus:border-cyan-500 outline-none transition-all"
          />
          <input 
            type="email" 
            placeholder="EMAIL ADDRESS" 
            className="w-full bg-zinc-900/50 border border-white/10 p-4 rounded-2xl text-xs focus:border-cyan-500 outline-none transition-all"
          />
          <input 
            type="password" 
            placeholder="CREATE PASSCODE" 
            className="w-full bg-zinc-900/50 border border-white/10 p-4 rounded-2xl text-xs focus:border-cyan-500 outline-none transition-all"
          />
        </div>

        <button 
          onClick={() => setLocation("/hub")}
          className="w-full border border-cyan-500/50 text-cyan-400 font-black py-4 rounded-2xl text-[10px] tracking-[0.2em] uppercase hover:bg-cyan-500 hover:text-black transition-all"
        >
          Register Identity
        </button>

        <p className="text-center text-[10px] text-zinc-500">
          ALREADY REGISTERED?{" "}
          <span 
            onClick={() => setLocation("/auth/signin")}
            className="text-white cursor-pointer underline underline-offset-4"
          >
            SIGN IN
          </span>
        </p>
      </motion.div>
    </div>
  );
}
