import React from "react";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useLocation } from "wouter";

export default function Analytics() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <header className="flex justify-between items-center mb-10">
        <button onClick={() => setLocation("/studio")}><ArrowLeft /></button>
        <span className="text-xs font-bold tracking-widest text-zinc-500">ANALYTICS</span>
        <div className="w-6" />
      </header>
      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-[40px]">
        <BarChart3 size={48} className="text-zinc-600 mb-4" />
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-tighter">Data Syncing...</p>
      </div>
    </div>
  );
}
