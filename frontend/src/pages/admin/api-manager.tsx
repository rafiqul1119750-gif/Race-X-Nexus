import { useState, useEffect } from "react";
import { 
  Key, Save, RefreshCw, Zap, ShieldCheck, 
  Plus, Eye, EyeOff, AlertCircle, X, Terminal, ChevronRight,
  ArrowLeft, Music, Image as ImageIcon, Ghost, Diamond
} from "lucide-react";
import { useLocation } from "wouter";
import { databases, ID } from "../../lib/appwrite"; 

const DATABASE_ID = 'Race-X-Nexus'; 
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

  const NEXUS_SERVICES = [
    { id: "OPEN_ROUTER", name: "Open Router (AI Engine)" },
    { id: "JAMENDO_MUSIC", name: "Jamendo (Audio Engine)" },
    { id: "IMGBB_HOST", name: "ImgBB (Media Hosting)" },
    { id: "ELEVEN_LABS", name: "ElevenLabs (Voice-X)" },
    { id: "HUGGING_FACE", name: "Hugging Face (Visual AI)" },
    { id: "GEMINI_AI", name: "Google Gemini (Core)" },
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
    // 🚨 Emergency Guard: 4 second baad loading screen hata do
    const emergencyTimer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(emergencyTimer);
  }, []);

  const executePropagation = async () => {
    setLoading(true);
    await fetchKeys();
    alert("Nexus Propagation Finished! 🌐");
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
      alert("Key Re-Injected! ⚡");
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
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans overflow-x-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <button onClick={() => setLocation("/hub")} className="p-4 bg-zinc-900 rounded-2xl border border-white/5 active:scale-90 transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="flex gap-4">
          <button onClick={fetchKeys} className="p-4 bg-zinc-900 rounded-2xl border border-white/5 text-cyan-400">
            <RefreshCw size={20} className={isCreating ? "animate-spin" : ""} />
          </button>
          <button onClick={() => setIsNewEngineModalOpen(true)} className="px-6 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest">
            New Engine
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-10">Injection Hub</h1>

      {/* API Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {apiKeys.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[40px]">
             <p className="text-zinc-600 font-black uppercase text-[10px] tracking-widest">No Active Nodes Detected</p>
          </div>
        )}
        {apiKeys.map((api) => (
          <div key={api.$id} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[40px] hover:border-cyan-500/50 transition-all">
            <div className="flex justify-between items-center mb-6">
               <span className="text-[10px] font-black text-cyan-500 uppercase">{api.service_name}</span>
               <button onClick={() => setShowKey(showKey === api.$id ? null : api.$id)} className="text-zinc-600">
                {showKey === api.$id ? <EyeOff size={16}/> : <Eye size={16}/>}
               </button>
            </div>
            <div className="bg-black/60 p-5 rounded-2xl font-mono text-[10px] text-zinc-400 truncate mb-6 border border-white/5">
              {showKey === api.$id ? api.key_value : '••••••••••••••••'}
            </div>
            <button 
              onClick={() => setEditModal({id: api.$id, name: api.service_name})}
              className="w-full py-4 bg-zinc-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Re-Inject Key
            </button>
          </div>
        ))}
      </div>

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-md rounded-[40px] p-8">
            <h2 className="text-xl font-black uppercase italic mb-6">Injecting: {editModal.name}</h2>
            <input 
              type="password" 
              placeholder="Paste Key..." 
              className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white mb-6 outline-none focus:border-cyan-500"
              value={newKeyValue}
              onChange={(e) => setNewKeyValue(e.target.value)}
            />
            <button onClick={handleUpdateKey} disabled={isUpdating === editModal.id} className="w-full py-5 bg-cyan-500 text-black rounded-2xl font-black uppercase">
              {isUpdating === editModal.id ? "Syncing..." : "Confirm Injection"}
            </button>
            <button onClick={() => setEditModal(null)} className="w-full mt-4 text-[10px] uppercase font-black text-zinc-500">Cancel</button>
          </div>
        </div>
      )}

      {isNewEngineModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-md rounded-[40px] p-8">
            <h2 className="text-xl font-black uppercase italic mb-6 text-cyan-400">Deploy New Node</h2>
            <div className="space-y-4">
              <select 
                value={newEngineData.service_name}
                onChange={(e) => setNewEngineData({...newEngineData, service_name: e.target.value})}
                className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white outline-none"
              >
                <option value="">Select Service...</option>
                {NEXUS_SERVICES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                <option value="CUSTOM">Custom Node</option>
              </select>
              <input 
                type="password" 
                placeholder="API Secret Key" 
                className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white outline-none"
                value={newEngineData.key_value}
                onChange={(e) => setNewEngineData({...newEngineData, key_value: e.target.value})}
              />
              <button onClick={handleCreateEngine} disabled={isCreating} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest">
                {isCreating ? "Deploying..." : "Deploy"}
              </button>
              <button onClick={() => setIsNewEngineModalOpen(false)} className="w-full text-[10px] uppercase font-black text-zinc-500">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 p-10 bg-zinc-900/30 border border-white/5 rounded-[50px] flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Master Propagation System</p>
        <button onClick={executePropagation} className="px-10 py-5 bg-white text-black rounded-3xl font-black uppercase italic tracking-widest active:scale-95 transition-all">
          Execute Sync
        </button>
      </div>
    </div>
  );
}
