import { useState, useEffect } from "react";
import { 
  Key, Save, RefreshCw, Zap, ShieldCheck, 
  Plus, Eye, EyeOff, AlertCircle, X, Terminal, ChevronRight,
  ShieldAlert, Ghost, Diamond, UserX
} from "lucide-react";
import { databases, ID } from "../../lib/appwrite"; // Paths confirmed

const DATABASE_ID = 'nexus_core'; 
const COLLECTION_ID = 'api_configs';

export default function ApiManager() {
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal State for Real Injection
  const [editModal, setEditModal] = useState<{id: string, name: string} | null>(null);
  const [newKeyValue, setNewKeyValue] = useState("");

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setApiKeys(response.documents);
    } catch (error) {
      console.error("Nexus Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchKeys(); }, []);

  const handleUpdateKey = async () => {
    if (!editModal || !newKeyValue) return;
    setIsUpdating(editModal.id);
    
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, editModal.id, {
        key_value: newKeyValue,
        last_updated: new Date().toISOString()
      });
      
      setApiKeys(prev => prev.map(item => 
        item.$id === editModal.id ? { ...item, key_value: newKeyValue } : item
      ));
      
      setEditModal(null);
      setNewKeyValue("");
      alert(`${editModal.name} Node Re-Injected! 🚀`);
    } catch (error) {
      alert("Injection Blocked: Database Link Failed");
    } finally {
      setIsUpdating(null);
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-cyan-400">
      <Terminal size={40} className="mb-4 animate-bounce" />
      <div className="font-black tracking-[0.5em] animate-pulse uppercase">Booting Nexus API Hub...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* 1. Launch Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Live Production Node</span>
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none flex items-center gap-4">
            Injection Hub
          </h1>
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em] mt-3">Race-X Nexus Core Management</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
            <button onClick={fetchKeys} className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
                <RefreshCw size={14} className={loading ? "animate-spin" : ""}/> Sync Cloud
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                <Plus size={14}/> New Engine
            </button>
        </div>
      </div>

      {/* 2. Responsive API Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {apiKeys.map((api) => (
          <div key={api.$id} className="group relative bg-zinc-900/10 border border-white/5 p-8 rounded-[45px] hover:border-cyan-500/40 transition-all duration-500 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/5 blur-[100px] group-hover:bg-cyan-500/10 transition-all" />
            
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                 <div className={`w-1.5 h-1.5 rounded-full ${api.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                 <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{api.service_name}</span>
              </div>
              <button onClick={() => setShowKey(showKey === api.$id ? null : api.$id)} className="p-2 bg-black rounded-lg text-zinc-600 hover:text-white transition-all">
                {showKey === api.$id ? <EyeOff size={14}/> : <Eye size={14}/>}
              </button>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">{api.service_name}</h3>
              <div className="bg-black/80 p-5 rounded-2xl border border-white/5 font-mono text-[10px] text-cyan-500/60 truncate">
                {showKey === api.$id ? api.key_value : '••••••••••••••••••••••••'}
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                <span className="text-zinc-600">Load Factor</span>
                <span className="text-cyan-500">{api.usage_percent || '0'}%</span>
              </div>
              <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                <div style={{ width: `${api.usage_percent || 0}%` }} className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-1000" />
              </div>
            </div>

            <button 
              onClick={() => setEditModal({id: api.$id, name: api.service_name})}
              className="w-full py-5 bg-zinc-900 hover:bg-white hover:text-black rounded-[25px] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border border-white/5"
            >
              <Zap size={14} className="group-hover:fill-current"/> Re-Inject Key
            </button>
          </div>
        ))}
      </div>

      {/* 3. Injection Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-lg rounded-[50px] p-10 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black italic uppercase tracking-widest">Injecting: {editModal.name}</h2>
              <button onClick={() => setEditModal(null)} className="p-2 hover:bg-white/10 rounded-full"><X/></button>
            </div>
            <div className="space-y-6">
              <input 
                type="password"
                value={newKeyValue}
                onChange={(e) => setNewKeyValue(e.target.value)}
                placeholder="Paste Encrypted API Key..."
                className="w-full bg-black border border-white/5 rounded-3xl p-6 text-sm font-bold outline-none focus:border-cyan-500 transition-all"
              />
              <button 
                onClick={handleUpdateKey}
                disabled={isUpdating === editModal.id}
                className="w-full py-6 bg-cyan-500 text-black rounded-3xl font-black uppercase italic tracking-widest active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isUpdating === editModal.id ? <RefreshCw className="animate-spin" /> : <ShieldCheck />}
                {isUpdating === editModal.id ? "PROCESSING..." : "CONFIRM INJECTION"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Emergency Master Sync */}
      <div className="bg-gradient-to-r from-zinc-900/50 to-black p-10 md:p-16 rounded-[60px] border border-white/5 relative overflow-hidden group mb-12">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4 text-cyan-400">Master Sync</h3>
              <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest leading-relaxed">
                Execute a system-wide propagation to all nodes. Use only for emergency key rotations.
              </p>
            </div>
            <button className="h-20 bg-white text-black rounded-[30px] font-black uppercase italic tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl">
              Execute Propagation <ChevronRight size={20}/>
            </button>
         </div>
         <AlertCircle size={300} className="absolute right-[-100px] top-[-100px] text-white/5 rotate-12 pointer-events-none group-hover:rotate-45 transition-transform duration-1000" />
      </div>
    </div>
  );
}
