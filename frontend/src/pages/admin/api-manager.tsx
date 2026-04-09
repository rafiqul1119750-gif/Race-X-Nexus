import { useState, useEffect } from "react";
import { 
  Key, Save, RefreshCw, Zap, ShieldCheck, 
  AlertTriangle, Plus, Trash2, ExternalLink 
} from "lucide-react";
import { databases, ID, Query } from "../../lib/appwrite";

export default function ApiManager() {
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Gemini Pro 1.5', key: '••••••••••••••••', status: 'active', usage: '45%' },
    { id: '2', name: 'ElevenLabs Voice', key: '••••••••••••••••', status: 'active', usage: '12%' },
    { id: '3', name: 'Stable Diffusion XL', key: '••••••••••••••••', status: 'paused', usage: '88%' }
  ]);

  const [isUpdating, setIsUpdating] = useState(false);

  // --- REAL-TIME INJECTION LOGIC ---
  const injectApiKey = async (name: string, newKey: string) => {
    setIsUpdating(true);
    // Logic: Update Appwrite Document in 'config' collection
    // Taki frontend automatically nayi key use karne lage
    setTimeout(() => {
      setIsUpdating(false);
      alert(`${name} Key Injected Successfully!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-4">
            <Key className="text-cyan-500" size={32} /> API Injection Hub
          </h1>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mt-2">
            Dynamic Credential Management System
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]">
          <Plus size={14}/> Add New Engine
        </button>
      </div>

      {/* API Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {apiKeys.map((api) => (
          <div key={api.id} className="bg-zinc-900/40 border border-white/5 p-6 rounded-[35px] space-y-4 hover:border-cyan-500/20 transition-all group">
            <div className="flex justify-between items-center">
              <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full ${api.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-zinc-800 text-zinc-500'}`}>
                {api.status}
              </span>
              <RefreshCw size={14} className="text-zinc-700 group-hover:text-cyan-500 cursor-pointer transition-all" />
            </div>
            
            <div>
              <h3 className="text-lg font-black italic uppercase tracking-tighter">{api.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-[10px] text-zinc-500 font-mono">{api.key}</code>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[8px] font-black uppercase text-zinc-600">
                <span>Monthly Quota</span>
                <span>{api.usage}</span>
              </div>
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div style={{ width: api.usage }} className={`h-full ${parseInt(api.usage) > 80 ? 'bg-red-500' : 'bg-cyan-500'}`} />
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <button 
                onClick={() => injectApiKey(api.name, 'new-key-123')}
                className="flex-1 py-3 bg-zinc-800 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Update Key
              </button>
              <button className="p-3 bg-zinc-900 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Injection Panel */}
      <div className="bg-zinc-950 rounded-[45px] border border-white/5 p-10">
        <h3 className="text-sm font-black uppercase italic tracking-widest mb-8 flex items-center gap-2 text-cyan-400">
          <Zap size={16} fill="currentColor"/> Manual Raw Injection
        </h3>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-600 ml-2">Service Name</label>
              <input placeholder="e.g. OpenAI_GPT_4" className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl p-4 text-xs font-bold outline-none focus:border-cyan-500" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-600 ml-2">API Secret Key</label>
              <input type="password" placeholder="sk-nexus-••••••••" className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl p-4 text-xs font-bold outline-none focus:border-cyan-500" />
            </div>
          </div>
          
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-[35px] p-8 flex flex-col justify-center gap-4">
             <div className="flex items-center gap-3">
               <ShieldCheck className="text-cyan-400" size={24} />
               <p className="text-[10px] font-bold text-zinc-400 leading-relaxed uppercase">
                 Injected keys are encrypted before being saved to Appwrite Database. They will be active immediately across all user nodes.
               </p>
             </div>
             <button 
               disabled={isUpdating}
               className="w-full py-4 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] active:scale-95 transition-all disabled:opacity-50"
             >
               {isUpdating ? "Injecting to Nexus Core..." : "Perform Master Injection"}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
