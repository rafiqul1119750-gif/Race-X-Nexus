import { useEffect } from "react";
import { useLocation } from "wouter";

export default function RXStudio() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Studio khulte hi seedha Editor page par shift
    setLocation("/studio/editor");
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[8px] font-black uppercase tracking-[0.4em] text-cyan-500">Connecting Studio Node...</p>
    </div>
  );
}
