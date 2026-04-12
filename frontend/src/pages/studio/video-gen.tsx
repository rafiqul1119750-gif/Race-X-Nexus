import React from "react";
import { ArrowLeft, Wand2 } from "lucide-react";
import { useLocation } from "wouter";

export default function VideoGen() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <header className="flex justify-between items-center mb-10">
        <button onClick={() => setLocation("/studio")}><ArrowLeft /></button>
        <span className="text-xs font-bold tracking-widest text-purple-500">AI CINEMA</span>
        <div className="w-6" />
      </header>
      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-[40px]">
        <Wand2 size={48} className="text-purple-500 mb-4 animate-pulse" />
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-tighter">Engine Loading...</p>
      </div>
    </div>
  );
}
