import React from "react";
import { ArrowLeft, Mic2 } from "lucide-react";
import { useLocation } from "wouter";

export default function VoiceLab() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <header className="flex justify-between items-center mb-10">
        <button onClick={() => setLocation("/studio")}><ArrowLeft /></button>
        <span className="text-xs font-bold tracking-widest text-pink-500">VOICE LAB</span>
        <div className="w-6" />
      </header>
      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-[40px]">
        <Mic2 size={48} className="text-pink-500 mb-4 animate-bounce" />
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-tighter">Vocal Processor Ready</p>
      </div>
    </div>
  );
}
