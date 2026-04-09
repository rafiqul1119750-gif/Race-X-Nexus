import { BarChart3, Users, Diamond, AlertTriangle } from "lucide-react";
// ✅ Sahi import path agar aapne file move kar li hai
import { NexusDailyTasks } from "../../components/dashboard/DailyTasks"; 

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-900 p-6 rounded-[35px] border border-white/5">
          <h4 className="text-2xl font-black italic text-cyan-400">4,205</h4>
          <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Total Diamonds</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-[35px] border border-white/5">
          <h4 className="text-2xl font-black italic text-purple-500">12.5M</h4>
          <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Nexus Gems</p>
        </div>
      </div>

      {/* --- 🔥 DAILY & WEEKLY MODULE --- */}
      <div className="bg-zinc-900/30 border border-white/5 rounded-[40px] overflow-hidden mb-8">
        <NexusDailyTasks /> 
      </div>

      {/* Account Health Section */}
      <div className="bg-zinc-900/50 border border-red-900/20 p-6 rounded-[35px]">
         <p className="text-[10px] font-black uppercase text-red-500 mb-2">Nexus Health Protocol</p>
         <div className="w-full bg-zinc-800 h-1.5 rounded-full">
            <div className="bg-green-500 h-full w-full" />
         </div>
         <p className="text-[7px] text-zinc-600 mt-2 uppercase font-bold italic">No active strikes detected.</p>
      </div>

    </div>
  );
}
