import { useState, useEffect } from "react";
import { 
  Key, Save, RefreshCw, Zap, ShieldCheck, 
  Trash2, Plus, Eye, EyeOff, AlertCircle
} from "lucide-react";
import { databases, ID, Query } from "../../lib/appwrite";

// DATABASE CONSTANTS (Aapne Appwrite console mein ye banaye honge)
const DATABASE_ID = 'nexus_core'; 
const COLLECTION_ID = 'api_configs';

export default function ApiManager() {
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH ACTUAL KEYS FROM APPWRITE ---
  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setApiKeys(response.documents);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKeys();
  }, []);

  // --- 2. REAL INJECTION LOGIC (Update Appwrite Doc) ---
  const handleUpdateKey = async (docId: string, serviceName: string, newKeyValue: string) => {
    if (!newKeyValue) return;
    setIsUpdating(docId);
    
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, docId, {
        key_value: newKeyValue,
        last_updated: new Date().toISOString()
      });
      
      // Update local state
      setApiKeys(prev => prev.map(item => 
        item.$id === docId ? { ...item, key_value: newKeyValue } : item
      ));
      
      alert(`${serviceName} Injected into Core!`);
    } catch (error) {
      alert("Injection Failed: Database Connection Error");
    } finally {
      setIsUpdating(null);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-black text-cyan-400 font-black tracking-widest animate-pulse">BOOTING API HUB...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-4">
            <Key className="text-cyan-500" size={36} /> API Injection Hub
          </h1>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mt-2">
            Secure Dynamic Credential Management
          </p>
        </div>
        <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                <RefreshCw size={14}/> Sync Cloud
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-105 transition-all">
                <Plus size={14}/> New Engine
            </button>
        </div>
      </div>

      {/* API Grid - Actual Data from Appwrite */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {apiKeys.map((api) => (
          <div key={api.$id} className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[35px] space-y-5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-center">
              <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full ${api.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {api.status || 'active'}
              </span>
              <div className="flex gap-2">
                 <button onClick={() => setShowKey(showKey === api.$id ? null : api.$id)} className="text-zinc-600 hover:text-white transition-colors">
                    {showKey === api.$id ? <EyeOff size={16}/> : <Eye size={16}/>}
                 </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-zinc-100">{api.service_name}</h3>
              <div className="mt-2 bg-black/50 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <code className="text-[10px] text-cyan-500/80 font-mono truncate mr-2">
                  {showKey === api.$id ? api.key_value : '••••••••••••••••••••'}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[8px] font-black uppercase text-zinc-600">
                <span>Usage Load</span>
                <span className={parseInt(api.usage_percent) > 80 ? 'text-red-500' : 'text-cyan-500'}>{api.usage_percent || '0'}%</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${api.usage_percent || 0}%` }} 
                  className={`h-full transition-all duration-1000 ${parseInt(api.usage_percent) > 80 ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-cyan-500'}`} 
                />
              </div>
            </div>

            <button 
              onClick={() => handleUpdateKey(api.$id, api.service_name, 'prompt-for-new-key')}
              disabled={isUpdating === api.$id}
              className="w-full py-4 bg-zinc-900 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all flex items-center justify-center gap-2"
            >
              {isUpdating === api.$id ? <RefreshCw size={14} className="animate-spin"/> : <Zap size={14}/>}
              {isUpdating === api.$id ? "Injecting..." : "Update Engine Key"}
            </button>
          </div>
        ))}
      </div>

      {/* Advanced Raw Injection Control */}
      <div className="bg-gradient-to-br from-[#0A0A0A] to-black rounded-[45px] border border-white/5 p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <ShieldCheck size={200} />
        </div>
        
        <h3 className="text-sm font-black uppercase italic tracking-[0.2em] mb-10 flex items-center gap-3 text-cyan-400">
          <AlertCircle size={18}/> Emergency Master Injection
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest ml-1">Core Service Target</label>
              <select className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl p-4 text-xs font-bold outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer">
                <option>SELECT ENGINE...</option>
                {apiKeys.map(k => <option key={k.$id} value={k.$id}>{k.service_name}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest ml-1">New Secret Payload</label>
              <input type="password" placeholder="Paste encrypted key here..." className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl p-4 text-xs font-bold outline-none focus:border-cyan-500 transition-all" />
            </div>
          </div>
          
          <div className="flex flex-col justify-center bg-cyan-500/5 rounded-[40px] p-8 border border-cyan-500/10">
             <div className="flex items-start gap-4 mb-8">
               <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400"><ShieldCheck size={24}/></div>
               <div>
                 <p className="text-[10px] font-black uppercase text-zinc-300 tracking-tight">System-Wide Propagation</p>
                 <p className="text-[9px] font-medium text-zinc-500 mt-1 leading-relaxed">Injection will update all active nodes across Race-X Nexus instantly. Key encryption is handled server-side.</p>
               </div>
             </div>
             <button className="w-full py-5 bg-white text-black rounded-[22px] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
               Execute Master Sync
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
