import { ArrowLeft, Activity, Zap, HardDrive, BarChart3, Clock, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { databases } from "../../lib/appwrite";

const DATABASE_ID = 'Race-X-Nexus';
const COLLECTION_ID = 'api_configs';

export default function Analytics() {
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setStats(response.documents);
      } catch (error) {
        console.error("Analytics Sync Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-12">
        <button onClick={() => setLocation("/hub")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20}/>
        </button>
        <div className="text-center">
          <h2 className="text-[10px] font-black italic uppercase tracking-[0.4em] text-cyan-400">Nexus Analytics</h2>
          <p className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Real-time Resource Monitoring</p>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Main Usage Grid */}
      <div className="grid grid-cols-1 gap-6 mb-12">
        {stats.map((node) => (
          <div key={node.$id} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-1">{node.service_name} Node</p>
                <h3 className="text-xl font-black italic uppercase tracking-tighter">{node.service_name}</h3>
              </div>
              <div className={`p-3 rounded-2xl ${node.usage_percent > 80 ? 'bg-red-500/10 text-red-500' : 'bg-cyan-500/10 text-cyan-500'}`}>
                <Zap size={18} fill="currentColor" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Bandwidth / Limit</span>
                <span className={`text-sm font-black italic ${node.usage_percent > 80 ? 'text-red-500' : 'text-white'}`}>
                  {node.usage_percent}%
                </span>
              </div>
              <div className="h-2 bg-black rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full transition-all duration-1000 ${node.usage_percent > 80 ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'}`}
                  style={{ width: `${node.usage_percent}%` }}
                />
              </div>
            </div>

            {node.usage_percent > 80 && (
              <div className="mt-4 flex items-center gap-2 text-[8px] font-black text-red-500 uppercase tracking-widest animate-pulse">
                <AlertTriangle size={12} /> Limit Critical: Re-Inject Key Soon
              </div>
            )}
          </div>
        ))}
      </div>

      {/* System Health Summary */}
      <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-[50px] p-10 relative overflow-hidden">
        <BarChart3 className="absolute -right-10 -bottom-10 text-white/5" size={200} />
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-8">System Health</h4>
        
        <div className="grid grid-cols-2 gap-8">
           <div className="space-y-1">
              <p className="text-2xl font-black italic">Active</p>
              <p className="text-[8px] font-bold text-green-500 uppercase tracking-widest">Nexus Core Link</p>
           </div>
           <div className="space-y-1">
              <p className="text-2xl font-black italic">0.4ms</p>
              <p className="text-[8px] font-bold text-cyan-500 uppercase tracking-widest">Sync Latency</p>
           </div>
        </div>
      </div>

    </div>
  );
}
