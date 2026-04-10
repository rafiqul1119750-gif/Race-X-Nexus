import { ArrowLeft, Play, Mic2, Sparkles, BarChart3, ChevronRight, RefreshCw, Cpu } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { databases } from "../../lib/appwrite"; // ✅ Appwrite Connection

// ✅ Nexus Config
const DATABASE_ID = 'Race-X-Nexus';
const COLLECTION_ID = 'api_configs';

export default function RXStudio() {
  const [, setLocation] = useLocation();
  const [engineStatus, setEngineStatus] = useState<string>("Initializing...");
  const [activeServices, setActiveServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🛡️ 1. DYNAMIC API STATUS CHECK (Nexus Integration)
  useEffect(() => {
    const checkStudioEngine = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        // Checking which services are live in Nexus
        const liveServices = response.documents.map(doc => doc.service_name);
        setActiveServices(liveServices);
        setEngineStatus("Protocol v4.0 Active");
      } catch (error) {
        console.error("Nexus Studio Link Failed:", error);
        setEngineStatus("Emergency Mode");
      } finally {
        setIsLoading(false);
      }
    };

    checkStudioEngine();
  }, []);

  const studioTools = [
    {
      title: "Cinema AI",
      desc: "Text to Cinematic Video",
      icon: <Play className="text-cyan-400" fill="currentColor" size={24} />,
      path: "/magic/video-gen",
      color: "from-blue-600/20 to-transparent",
      service_key: "RX_VIDEO" // Linked to Appwrite service_name
    },
    {
      title: "Voice Lab",
      desc: "AI Voice Cloning & Dub",
      icon: <Mic2 className="text-purple-400" size={24} />,
      path: "/studio/voice-lab",
      color: "from-purple-600/20 to-transparent",
      service_key: "RX_VOICE"
    },
    {
      title: "Magic Fix",
      desc: "AI Photo Upscale & Edit",
      icon: <Sparkles className="text-yellow-400" size={24} />,
      path: "/magic/image-gen",
      color: "from-yellow-600/20 to-transparent",
      service_key: "RX_IMAGE"
    },
    {
      title: "Creator Stats",
      desc: "Engagement & Revenue",
      icon: <BarChart3 className="text-emerald-400" size={24} />,
      path: "/profile",
      color: "from-emerald-600/20 to-transparent",
      service_key: "RX_STATS"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans">
      
      {/* Header */}
      <header className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => setLocation("/hub")} 
          className="p-4 bg-zinc-900/80 rounded-2xl active:scale-75 transition-all border border-white/5 shadow-2xl"
        >
          <ArrowLeft size={20}/>
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">RX Studio</h2>
            {isLoading ? (
              <RefreshCw size={14} className="animate-spin text-zinc-600" />
            ) : (
              <Cpu size={18} className="text-cyan-500 animate-pulse" />
            )}
          </div>
          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">
            {isLoading ? "Syncing Neural Nodes..." : engineStatus}
          </p>
        </div>
      </header>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 gap-4">
        {studioTools.map((tool) => {
          // Check if service exists in Nexus
          const isLive = activeServices.includes(tool.service_key);

          return (
            <button
              key={tool.title}
              onClick={() => setLocation(tool.path)}
              className={`relative overflow-hidden w-full bg-zinc-900/30 border border-white/5 p-8 rounded-[40px] flex items-center justify-between active:scale-[0.98] transition-all group hover:border-white/10`}
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="relative p-5 bg-black rounded-[24px] border border-white/5 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                  {/* Status Indicator Dot */}
                  <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${isLive ? 'bg-green-500' : 'bg-zinc-700 animate-pulse'}`} />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-black italic uppercase tracking-widest leading-none mb-2">{tool.title}</h4>
                  </div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{tool.desc}</p>
                </div>
              </div>

              <div className="relative z-10 p-3 bg-white/5 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                <ChevronRight size={20} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-10 p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-[35px] text-center backdrop-blur-md">
        <p className="text-[8px] font-black text-cyan-500/60 uppercase tracking-[0.4em]">
          All AI Nodes Powered by RX Protocol v4.0
        </p>
        <p className="text-[6px] text-zinc-700 uppercase mt-2 tracking-widest font-black">
          Nexus Engine ID: {isLoading ? "Scanning..." : "Active_Node_Z-11"}
        </p>
      </div>
    </div>
  );
}
