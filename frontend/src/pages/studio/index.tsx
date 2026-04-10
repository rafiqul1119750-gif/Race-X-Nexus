import { useEffect } from "react";
import { useLocation } from "wouter";

export default function RXStudio() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Studio open hote hi Pro Editor par bhej do
    setLocation("/studio/editor");
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6" />
      <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500 animate-pulse">Syncing Nexus Node...</h2>
    </div>
  );
}
