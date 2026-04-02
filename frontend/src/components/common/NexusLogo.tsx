import React from "react";

interface NexusLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export function NexusLogo({ size = "md", showText = true }: NexusLogoProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24",
    xl: "w-40 h-40"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* The Neon RX Logo Container */}
      <div className={`${sizes[size]} relative group`}>
        {/* Outer Glow Effect */}
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-purple-500/30 transition-all duration-500"></div>
        
        {/* The Main Image */}
        <img 
          src="/images/rx-logo.png" 
          alt="RX Nexus Logo" 
          className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(0,212,255,0.8)]"
        />
      </div>

      {/* Brand Text (Optional) */}
      {showText && (
        <div className="text-center">
          <h1 className="text-white font-black italic tracking-tighter uppercase" 
              style={{ fontSize: size === 'xl' ? '2.5rem' : '1.2rem' }}>
            RACE-<span className="text-blue-400">X</span>
          </h1>
          {size === 'xl' && (
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] mt-1">
              The Future of Creation
            </p>
          )}
        </div>
      )}
    </div>
  );
}
