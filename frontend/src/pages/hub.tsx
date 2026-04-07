import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/auth/signin"); // 3 second baad login par bhej dega
    }, 3000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Animated Logo Container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-40 h-40"
      >
        <img 
          src="/images/rx-logo.png" 
          alt="Race-X Logo" 
          className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]"
        />
      </motion.div>

      {/* Brand Name with Neon Glow */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-8 font-cyber text-4xl tracking-[0.2em] text-white text-neon"
      >
        RACE-X
      </motion.h1>

      <p className="mt-2 text-[10px] text-zinc-500 uppercase tracking-[0.5em] font-bold">
        The Creative Nexus
      </p>

      {/* Loading Bar Animation */}
      <div className="absolute bottom-20 w-48 h-[2px] bg-zinc-900 overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-full h-full bg-cyan-500"
        />
      </div>
    </div>
  );
}
