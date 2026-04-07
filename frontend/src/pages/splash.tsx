import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation('/auth/signin'); // Diagram: Auto Redirect
    }, 4000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* RX 3D Logo Animation Effect */}
      <motion.div 
        initial={{ scale: 0.5, rotateY: 0, opacity: 0 }}
        animate={{ scale: 1, rotateY: 360, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative mb-10"
      >
        <div className="absolute inset-0 bg-cyan-500/30 blur-[80px] rounded-full animate-pulse" />
        <img src="/images/rx-logo.png" alt="RX Logo" className="w-40 h-40 relative z-10 drop-shadow-[0_0_20px_rgba(0,225,255,0.8)]" />
      </motion.div>

      {/* Loading Indicator */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>
        <p className="text-[10px] font-black text-cyan-400 tracking-[0.5em] uppercase animate-pulse">
          Initializing Race-X Engine
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
