import { useState, useRef, useEffect } from "react";
import { 
  ChevronLeft, Zap, Layers, Plus, ZoomIn, ZoomOut, Save, Download, 
  Wand2, Mic, Video, Music, Type, Image as ImageIcon, Trash2, 
  Settings, Play, Pause, RefreshCw, Volume2, Sparkles, Share2
} from "lucide-react";

// --- TYPES FOR MULTIMEDIA ELEMENTS ---
type StudioElement = {
  id: string;
  type: 'text' | 'image' | 'video' | 'voice' | 'sfx';
  content: string; // URL for media or string for text
  x: number; y: number;
  scale: number;
  rotation: number;
  metadata?: {
    voiceModel?: string; // For Celebrity/Clone Voice
    volume?: number;
    duration?: number;
  };
};

export default function NexusStudioEditor() {
  const [elements, setElements] = useState<StudioElement[]>([]);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [activeTool, setActiveTool] = useState<'none' | 'ai-voice' | 'ai-video' | 'design'>('none');
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // --- THE "ZERO-LOAD" EXPORT LOGIC ---
  const handlePremiumExport = async () => {
    setIsRendering(true);
    // 1. Send elements JSON to Appwrite Function
    // 2. Cloud GPU renders the MP4/PNG
    // 3. Direct Browser Stream to Gallery
    setTimeout(() => {
      setIsRendering(false);
      alert("Nexus Engine: Render Complete. File streamed to Gallery.");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden font-sans selection:bg-cyan-500">
      
      {/* --- TOP PREMIUM NAVIGATION --- */}
      <header className="h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-zinc-900 rounded-xl hover:bg-zinc-800 cursor-pointer transition-all active:scale-90">
            <ChevronLeft size={20} className="text-zinc-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Nexus Studio v3</span>
            <input 
              type="text" 
              defaultValue="Untitled_Masterpiece" 
              className="bg-transparent text-sm font-bold uppercase tracking-tighter outline-none focus:text-white text-zinc-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5">
            <Layers size={14}/> Timeline
          </button>
          <button 
            onClick={handlePremiumExport}
            disabled={isRendering}
            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95 transition-all disabled:opacity-50"
          >
            {isRendering ? <RefreshCw className="animate-spin" size={14}/> : <Download size={14}/>}
            {isRendering ? "Rendering..." : "Export to Gallery"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        
        {/* --- LEFT AI TOOLBOX (THE CORE FEATURES) --- */}
        <aside className="w-20 border-r border-white/5 bg-zinc-950 flex flex-col items-center py-6 gap-8">
          <ToolIcon 
            icon={<Sparkles/>} label="AI Gen" active={activeTool === 'none'} 
            onClick={() => setActiveTool('none')}
          />
          <ToolIcon 
            icon={<Mic/>} label="Voice" active={activeTool === 'ai-voice'} 
            onClick={() => setActiveTool('ai-voice')}
          />
          <ToolIcon 
            icon={<Video/>} label="AI Video" active={activeTool === 'ai-video'} 
            onClick={() => setActiveTool('ai-video')}
          />
          <ToolIcon 
            icon={<Music/>} label="Audio" active={activeTool === 'none'} 
            onClick={() => setActiveTool('none')}
          />
          <ToolIcon 
            icon={<ImageIcon/>} label="Media" active={activeTool === 'design'} 
            onClick={() => setActiveTool('design')}
          />
          <div className="mt-auto">
            <ToolIcon icon={<Settings/>} label="Setup" active={false} onClick={() => {}} />
          </div>
        </aside>

        {/* --- DYNAMIC AI PANEL --- */}
        <section className={`transition-all duration-500 bg-zinc-950/50 backdrop-blur-md border-r border-white/5 ${activeTool !== 'none' ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
          <div className="p-6 w-80">
            {activeTool === 'ai-voice' && (
              <div className="space-y-6 animate-in slide-in-from-left duration-300">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">AI Voice Engine</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-900 rounded-[25px] border border-white/5 cursor-pointer hover:border-cyan-500/50 transition-all group">
                    <p className="text-[10px] font-black text-zinc-500 uppercase">Pro Feature</p>
                    <p className="font-bold text-sm group-hover:text-cyan-400 transition-all">Clone My Voice</p>
                    <span className="text-[9px] text-zinc-600">Upload 30s audio for instant cloning</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-zinc-500">Celebrity Models</label>
                    <select className="w-full bg-zinc-900 p-3 rounded-xl border border-white/5 text-xs font-bold outline-none appearance-none">
                      <option>Elon Nexus</option>
                      <option>Morgan Master</option>
                      <option>Scarlett AI</option>
                    </select>
                  </div>

                  <textarea 
                    placeholder="Type what they should say..."
                    className="w-full h-32 bg-zinc-900/50 border border-white/5 rounded-2xl p-4 text-xs font-medium outline-none focus:border-cyan-500/50"
                  />
                  <button className="w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Generate Audio</button>
                </div>
              </div>
            )}

            {activeTool === 'ai-video' && (
              <div className="space-y-6 animate-in slide-in-from-left duration-300">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-purple-400">Cinema Engine</h3>
                <div className="space-y-4">
                   <div className="aspect-video bg-zinc-900 rounded-2xl border border-dashed border-zinc-700 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-purple-500 transition-all">
                      <Plus className="text-zinc-600 group-hover:text-purple-400" />
                      <span className="text-[9px] font-black uppercase text-zinc-600">Start with AI Prompt</span>
                   </div>
                   <input 
                    placeholder="Describe your scene..."
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-xs outline-none focus:border-purple-500"
                   />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* --- MAIN DESIGN CANVAS --- */}
        <section className="flex-1 bg-zinc-900/10 flex flex-col items-center justify-center p-8 relative">
          
          {/* Canvas Wrapper (9:16 Tiktok/Shorts Ratio) */}
          <div 
            ref={canvasRef}
            className="aspect-[9/16] w-[340px] md:w-[380px] bg-zinc-900 rounded-[40px] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group"
          >
            {/* Real-time Render Surface */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-800 select-none">
               <ImageIcon size={48} className="opacity-10 mb-2"/>
               <span className="text-[9px] font-black uppercase tracking-widest opacity-20">Nexus Preview Engine</span>
            </div>

            {/* Elements Layer */}
            {elements.map(el => (
              <div 
                key={el.id} 
                className={`absolute cursor-move transition-all ${activeLayer === el.id ? 'ring-2 ring-cyan-500 ring-offset-4 ring-offset-black' : ''}`}
                style={{ left: el.x, top: el.y, transform: `scale(${el.scale}) rotate(${el.rotation}deg)` }}
                onClick={() => setActiveLayer(el.id)}
              >
                {el.type === 'text' && <h1 className="font-black italic uppercase text-2xl">{el.content}</h1>}
              </div>
            ))}

            {/* Canvas Overlay Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <button className="p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 hover:text-cyan-400 transition-all"><Play size={18} fill="currentColor"/></button>
               <button className="p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 hover:text-cyan-400 transition-all"><RefreshCw size={18}/></button>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-2">
            <button className="p-3 bg-zinc-950 rounded-xl border border-white/5 text-zinc-500 hover:text-white"><ZoomIn size={18}/></button>
            <button className="p-3 bg-zinc-950 rounded-xl border border-white/5 text-zinc-500 hover:text-white"><ZoomOut size={18}/></button>
          </div>
        </section>

        {/* --- RIGHT PROPERTIES PANEL --- */}
        <aside className="w-72 border-l border-white/5 bg-zinc-950 p-6 hidden lg:block">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Object Settings</h3>
            <button className="text-zinc-600 hover:text-red-500 transition-all"><Trash2 size={14}/></button>
          </div>

          <div className="space-y-8">
             <div className="space-y-3">
               <p className="text-[9px] font-black uppercase text-zinc-600">Transform</p>
               <div className="grid grid-cols-2 gap-2">
                 <div className="p-3 bg-zinc-900 rounded-xl border border-white/5">
                    <p className="text-[8px] text-zinc-600 font-bold uppercase mb-1">Scale</p>
                    <p className="text-xs font-black italic tracking-tighter">1.0x</p>
                 </div>
                 <div className="p-3 bg-zinc-900 rounded-xl border border-white/5">
                    <p className="text-[8px] text-zinc-600 font-bold uppercase mb-1">Rotation</p>
                    <p className="text-xs font-black italic tracking-tighter">0°</p>
                 </div>
               </div>
             </div>

             <div className="space-y-3">
               <p className="text-[9px] font-black uppercase text-zinc-600">AI Enhancement</p>
               <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-cyan-900/20 to-zinc-900 rounded-2xl border border-cyan-500/20 group">
                  <span className="text-[10px] font-black uppercase italic group-hover:text-cyan-400">Upscale to 4K</span>
                  <Wand2 size={14} className="text-cyan-400" />
               </button>
             </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function ToolIcon({ icon, label, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center gap-1 group cursor-pointer"
    >
      <div className={`p-3.5 rounded-2xl transition-all duration-300 ${active ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'bg-transparent text-zinc-600 group-hover:bg-zinc-900 group-hover:text-zinc-200'}`}>
        {icon}
      </div>
      <span className={`text-[8px] font-black uppercase tracking-widest transition-all ${active ? 'text-cyan-400' : 'text-zinc-700 group-hover:text-zinc-400'}`}>{label}</span>
    </div>
  );
}
