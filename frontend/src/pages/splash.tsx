import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = () => {
  const [, setLocation] = useLocation();
  const [loadingText, setLoadingText] = useState("Initializing Core");

  useEffect(() => {
    // Logic: 1.5s baad text badlega, 4s baad redirect
    const textTimer = setTimeout(() => setLoadingText("Syncing Nexus Hub"), 1800);
    
    const redirectTimer = setTimeout(() => {
      // Diagram Logic: Auto Redirect → SIGN IN
      // Future mein yahan Auth Check lagayenge (if user then /hub else /auth/signin)
      setLocation('/auth/signin'); 
    }, 4000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(redirectTimer);
    };
  }, [setLocation]);

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* Background Cinematic Glow */}
      <div className="absolute w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />

      {/* 🟢 RX 3D Logo Animation Node */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 mb-12"
      >
        {/* Glow Effect behind logo */}
        <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full scale-150" />
        
        <img 
          src="/images/rx-logo.png" 
          alt="Race-X Logo" 
          className="w-44 h-44 object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          // Error handling agar logo missing ho toh
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/400x400/000000/00e1ff?text=RX";
          }}
        />
      </motion.div>

      {/* 🟢 Loading Indicator Node */}
      <div className="flex flex-col items-center gap-6 z-10">
        <div className="w-64 h-[2px] bg-zinc-900 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.p 
            key={loadingText}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[10px] font-black text-cyan-400 tracking-[0.5em] uppercase italic"
          >
            {loadingText}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-10 opacity-20">
        <p className="text-[8px] font-bold tracking-[1em] text-white uppercase">
          Powered by Race-X Engine
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
