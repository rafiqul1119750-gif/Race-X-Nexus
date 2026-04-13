import { useState, useEffect } from "react";
import { 
  Key, Save, RefreshCw, Zap, ShieldCheck, 
  Plus, Eye, EyeOff, AlertCircle, X, Terminal, ChevronRight,
  ArrowLeft, Music, Image as ImageIcon, Ghost, Diamond, Database, Activity
} from "lucide-react";
import { useLocation } from "wouter";
import { databases, ID } from "../../lib/appwrite"; 
import { Query } from "appwrite"; // Query import zaroori hai filtering ke liye

// ✅ APKE APPWRITE CONSOLE SE UPDATED IDs
const DATABASE_ID = 'racex_db'; 
const COLLECTION_ID = 'api_configs';

export default function ApiManager() {
  const [, setLocation] = useLocation();
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [editModal, setEditModal] = useState<{id: string, name: string} | null>(null);
  const [newKeyValue, setNewKeyValue] = useState("");

  const [isNewEngineModalOpen, setIsNewEngineModalOpen] = useState(false);
  const [newEngineData, setNewEngineData] = useState({ service_name: "", key_value: "" });
  const [isCreating, setIsCreating] = useState(false);

  // ✅ UPDATED SERVICES: Added Cinema & Video Engines
  const NEXUS_SERVICES = [
    { id: "FAL_KEY", name: "Fal.ai (Cinema/Seedance 2.0)" },
    { id: "REPLICATE_TOKEN", name: "Replicate (Video/FaceSwap)" },
    { id: "OPEN_ROUTER", name: "Open Router (AI Engine)" },
    { id: "ELEVEN_LABS", name: "ElevenLabs (Voice-X)" },
    { id: "HUGGING_FACE", name: "Hugging Face (Visual AI)" },
    { id: "GEMINI_AI", name: "Google Gemini (Core)" },
    { id: "JAMENDO_MUSIC", name: "Jamendo (Audio Engine)" },
    { id: "IMGBB_HOST", name: "ImgBB (Media Hosting)" },
  ];

  const fetchKeys = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setApiKeys(response.documents || []);
    } catch (error) {
      console.error("Nexus Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
    const emergencyTimer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(emergencyTimer);
  }, []);

  const executePropagation = async () => {
    setLoading(true);
    await fetchKeys();
    alert("Nexus Propagation Finished! 🌐 All nodes are in sync.");
  };

  const handleCreateEngine = async () => {
    if (!newEngineData.service_name || !newEngineData.key_value) return alert("System Error: Empty Fields!");
    setIsCreating(true);
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        service_name: newEngineData.service_name,
        key_value: newEngineData.key_value,
        status: "active",
        usage_percent: 0, 
        last_updated: new Date().toISOString()
      });
      setIsNewEngineModalOpen(false);
      setNewEngineData({ service_name: "", key_value: "" });
      fetchKeys();
      alert("Node Deployed Successfully! 🚀");
    } catch (error: any) {
      console.error("Creation Error:", error);
      alert(`Deployment Blocked: ${error.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateKey = async () => {
    if (!editModal || !newKeyValue) return;
    setIsUpdating(editModal.id);
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, editModal.id, {
        key_value: newKeyValue,
        last_updated: new Date().toISOString() 
      });
      setEditModal(null);
      setNewKeyValue("");
      fetchKeys();
      alert("Key Re-Injected! ⚡ Nexus Core updated.");
    } catch (error: any) {
      console.error("Update Error:", error);
      alert("Injection Blocked!");
    } finally {
      setIsUpdating(null);
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-cyan-400 font-sans">
      <Terminal size={40} className="mb-4 animate-bounce" />
      <div className="font-black tracking-[0.3em] uppercase text-[10px]">Booting Nexus Hub...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans overflow-x-hidden italic">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-12">
        <button onClick={() => setLocation("/hub")} className="p-4 bg-zinc-900 rounded-2xl border border-white/5 active:scale-90 transition-all shadow-lg shadow-cyan-500/5">
          <ArrowLeft size={24} />
        </button>
        <div className="flex gap-4">
          <button onClick={fetchKeys} className="p-4 bg-zinc-900 rounded-2xl border border-white/5 text-cyan-400 active:rotate-180 transition-all">
            <RefreshCw size={20} className={isCreating ? "animate-spin" : ""} />
          </button>
          <button onClick={() => setIsNewEngineModalOpen(true)} className="px-6 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-all">
            + New Engine
          </button>
        </div>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white">Injection Hub</h1>
        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-2">Race-X Nexus API Core</p>
      </div>

      {/* API Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {apiKeys.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[40px] bg-zinc-900/10">
             <p className="text-zinc-600 font-black uppercase text-[10px] tracking-widest text-white">No Active Nodes Detected. Deploy one now.</p>
          </div>
        )}
        {apiKeys.map((api) => (
          <div key={api.$id} className="group bg-zinc-900/40 border border-white/5 p-8 rounded-[40px] hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-3xl rounded-full" />
            
            <div className="flex justify-between items-center mb-6">
               <span className="text-[10px] font-black text-cyan-500 uppercase italic tracking-widest">{api.service_name}</span>
               <div className="flex gap-3">
                 <Activity size={14} className="text-cyan-500 animate-pulse" />
                 <button onClick={() => setShowKey(showKey === api.$id ? null : api.$id)} className="text-zinc-600 hover:text-white transition-colors">
                  {showKey === api.$id ? <EyeOff size={16}/> : <Eye size={16}/>}
                 </button>
               </div>
            </div>

            {/* Usage Bar Visual */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-[8px] font-bold text-zinc-600 uppercase">Engine Load</span>
              <span className="text-[8px] font-bold text-cyan-500">{api.usage_percent || 0}%</span>
            </div>
            <div className="w-full bg-black/40 h-1 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] transition-all duration-1000" 
                style={{ width: `${api.usage_percent || 0}%` }} 
              />
            </div>

            <div className="bg-black/60 p-5 rounded-2xl font-mono text-[10px] text-zinc-400 truncate mb-6 border border-white/5 group-hover:border-cyan-500/20 transition-all">
              {showKey === api.$id ? api.key_value : '••••••••••••••••••••••••'}
            </div>
            
            <button 
              onClick={() => setEditModal({id: api.$id, name: api.service_name})}
              className="w-full py-4 bg-zinc-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/5 active:scale-95"
            >
              Re-Inject Key
            </button>
          </div>
        ))}
      </div>

      {/* MODALS: Same as before but with added flair */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-md rounded-[40px] p-8 shadow-2xl">
            <h2 className="text-xl font-black uppercase italic mb-6 text-white">Injecting: {editModal.name}</h2>
            <input 
              type="password" 
              placeholder="Paste Encrypted Key..." 
              className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white mb-6 outline-none focus:border-cyan-500 transition-all"
              value={newKeyValue}
              onChange={(e) => setNewKeyValue(e.target.value)}
            />
            <div className="space-y-3">
                <button onClick={handleUpdateKey} disabled={isUpdating === editModal.id} className="w-full py-5 bg-cyan-500 text-black rounded-2xl font-black uppercase italic tracking-widest active:scale-95 transition-all">
                {isUpdating === editModal.id ? "SYNCING CORE..." : "CONFIRM INJECTION"}
                </button>
                <button onClick={() => setEditModal(null)} className="w-full py-3 text-[10px] uppercase font-black text-zinc-500 hover:text-white transition-colors">Cancel Operation</button>
            </div>
          </div>
        </div>
      )}

      {isNewEngineModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-md rounded-[40px] p-8 shadow-2xl">
            <h2 className="text-xl font-black uppercase italic mb-6 text-cyan-400">Deploy New Node</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-zinc-600 uppercase ml-4">Interface Selection</p>
                <select 
                    value={newEngineData.service_name}
                    onChange={(e) => setNewEngineData({...newEngineData, service_name: e.target.value})}
                    className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-cyan-500 uppercase text-xs font-bold"
                >
                    <option value="">Select Service...</option>
                    {NEXUS_SERVICES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    <option value="CUSTOM">Custom Node</option>
                </select>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-zinc-600 uppercase ml-4">Master API Secret</p>
                <input 
                    type="password" 
                    placeholder="sk-...." 
                    className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-cyan-500"
                    value={newEngineData.key_value}
                    onChange={(e) => setNewEngineData({...newEngineData, key_value: e.target.value})}
                />
              </div>
              <button onClick={handleCreateEngine} disabled={isCreating} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all mt-4">
                {isCreating ? "INITIALIZING..." : "DEPLOY TO NEXUS"}
              </button>
              <button onClick={() => setIsNewEngineModalOpen(false)} className="w-full py-2 text-[10px] uppercase font-black text-zinc-500 hover:text-white transition-colors">Abort Deployment</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer System Sync */}
      <div className="mt-12 p-10 bg-gradient-to-br from-zinc-900/50 to-black border border-white/5 rounded-[50px] flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 pointer-events-none" />
        <div className="relative z-10 text-center md:text-left">
            <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">Master Propagation System</p>
            <p className="text-[9px] text-zinc-500 uppercase font-bold mt-1">Sync all API nodes across Race-X network</p>
        </div>
        <button onClick={executePropagation} className="relative z-10 px-10 py-5 bg-white text-black rounded-3xl font-black uppercase italic tracking-widest hover:bg-cyan-400 active:scale-90 transition-all shadow-xl">
          Execute Global Sync
        </button>
      </div>
    </div>
  );
}
