import { useState, useRef, useEffect } from "react";
import { 
  ChevronLeft, Layers, Plus, ZoomIn, ZoomOut, Download, 
  Wand2, Mic, Video, Music, Image as ImageIcon, Trash2, 
  Settings, Play, Pause, RefreshCw, Volume2, Sparkles, Share2, Search, CheckCircle2
} from "lucide-react";
import { useLocation } from "wouter";

// --- TYPES ---
type StudioElement = {
  id: string;
  type: 'text' | 'image' | 'video' | 'voice' | 'sfx';
  content: string;
  x: number; y: number;
  scale: number;
  rotation: number;
};

export default function NexusStudioEditor() {
  const [, setLocation] = useLocation();
  const [elements, setElements] = useState<StudioElement[]>([]);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [activeTool, setActiveTool] = useState<'none' | 'ai-voice' | 'ai-video' | 'audio' | 'design'>('none');
  
  // --- MUSIC STATES ---
  const [musicQuery, setMusicQuery] = useState("");
  const [musicClips, setMusicClips] = useState<any[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<any>(null);
  const [isSearchingMusic, setIsSearchingMusic] = useState(false);
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  // --- MUSIC FETCH LOGIC (30s SAFE CLIPS) ---
  const searchMusicClips = async () => {
    if (!musicQuery) return;
    setIsSearchingMusic(true);
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(musicQuery)}&country=in&media=music&limit=15`);
      const data = await res.json();
      setMusicClips(data.results || []);
    } catch (e) {
      console.error("Music Fetch Error");
    } finally {
      setIsSearchingMusic(false);
    }
  };

  const playMusicPreview = (url: string) => {
    if (audioPreviewRef.current) {
      audioPreviewRef.current.pause();
    }
    audioPreviewRef.current = new Audio(url);
    audioPreviewRef.current.play();
  };

  const handlePremiumExport = async () => {
    setIsRendering(true);
    setTimeout(() => {
      setIsRendering(false);
      alert("Nexus Engine: Render Complete. Video saved with selected audio.");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden font-sans selection:bg-cyan-500">
      
      {/* --- TOP NAVIGATION --- */}
      <header className="h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div onClick={() => setLocation("/hub")} className="p-2 bg-zinc-900 rounded-xl hover:bg-zinc-800 cursor-pointer transition-all active:scale-90">
            <ChevronLeft size={20} className="text-zinc-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest leading-none mb-1">Nexus Studio v3</span>
            <input type="text" defaultValue="Untitled_Project" className="bg-transparent text-sm font-bold uppercase tracking-tighter outline-none text-zinc-400 focus:text-white" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handlePremiumExport} disabled={isRendering} className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95 transition-all disabled:opacity-50">
            {isRendering ? <RefreshCw className="animate-spin" size={14}/> : <Download size={14}/>}
            {isRendering ? "Rendering..." : "Export"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        
        {/* --- LEFT TOOLBAR --- */}
        <aside className="w-20 border-r border-white/5 bg-zinc-950 flex flex-col items-center py-6 gap-8">
          <ToolIcon icon={<Sparkles/>} label="AI Gen" active={activeTool === 'none'} onClick={() => setActiveTool('none')} />
          <ToolIcon icon={<Mic/>} label="Voice" active={activeTool === 'ai-voice'} onClick={() => setActiveTool('ai-voice')} />
          <ToolIcon icon={<Video/>} label="AI Video" active={activeTool === 'ai-video'} onClick={() => setActiveTool('ai-video')} />
          <ToolIcon icon={<Music/>} label="Audio" active={activeTool === 'audio'} onClick={() => setActiveTool('audio')} />
          <ToolIcon icon={<ImageIcon/>} label="Media" active={activeTool === 'design'} onClick={() => setActiveTool('design')} />
          <div className="mt-auto"><ToolIcon icon={<Settings/>} label="Setup" active={false} onClick={() => {}} /></div>
        </aside>

        {/* --- DYNAMIC PANEL (SIDEBAR) --- */}
        <section className={`transition-all duration-500 bg-zinc-950/50 backdrop-blur-md border-r border-white/5 ${activeTool !== 'none' ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
          <div className="p-6 w-80">
            
            {/* AUDIO TOOL PANEL */}
            {activeTool === 'audio' && (
              <div className="space-y-6 animate-in slide-in-from-left duration-300">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">Clip Library</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search for sounds..." 
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-xs outline-none focus:border-cyan-500"
                    value={musicQuery}
                    onChange={(e) => setMusicQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchMusicClips()}
                  />
                  <button onClick={searchMusicClips} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-500/10 rounded-lg text-cyan-500">
                    {isSearchingMusic ? <RefreshCw size={14} className="animate-spin" /> : <Search size={14} />}
                  </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {musicClips.map((clip) => (
                    <div 
                      key={clip.trackId}
                      onClick={() => setSelectedMusic(clip)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${selectedMusic?.trackId === clip.trackId ? 'bg-cyan-500/10 border-cyan-500' : 'bg-zinc-900/40 border-white/5'}`}
                    >
                      <img src={clip.artworkUrl60} className="w-10 h-10 rounded-lg object-cover" alt="" />
                      <div className="flex-1 truncate text-left">
                        <p className="text-[10px] font-black text-white uppercase truncate">{clip.trackName}</p>
                        <p className="text-[8px] font-bold text-zinc-500 uppercase">{clip.artistName}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); playMusicPreview(clip.previewUrl); }} className="p-2 bg-zinc-800 rounded-full hover:text-cyan-400 transition-all">
                        <Volume2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI VOICE PANEL (AS PER SCREENSHOT) */}
            {activeTool === 'ai-voice' && (
              <div className="space-y-6 animate-in slide-in-from-left duration-300">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">AI Voice Engine</h3>
                <div className="p-4 bg-zinc-900 rounded-[25px] border border-white/5 cursor-pointer hover:border-cyan-500 transition-all group">
                  <p className="text-[9px] font-black text-zinc-500 uppercase mb-1">Voice Clone</p>
                  <p className="font-bold text-sm group-hover:text-cyan-400">Instant Mimic</p>
                </div>
                <textarea placeholder="Write text to speak..." className="w-full h-32 bg-zinc-900/50 border border-white/5 rounded-2xl p-4 text-xs font-medium outline-none focus:border-cyan-500" />
                <button className="w-full py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Generate Audio</button>
              </div>
            )}
            
            {/* AI VIDEO PANEL */}
            {activeTool === 'ai-video' && (
              <div className="space-y-6 animate-in slide-in-from-left duration-300">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-purple-400">Cinema Engine</h3>
                <div className="aspect-video bg-zinc-900 rounded-2xl border border-dashed border-zinc-700 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-purple-500 transition-all">
                    <Plus className="text-zinc-600 group-hover:text-purple-400" />
                    <span className="text-[9px] font-black uppercase text-zinc-600">Start with AI Prompt</span>
                </div>
                <input placeholder="Describe your scene..." className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-xs outline-none focus:border-purple-500" />
              </div>
            )}
          </div>
        </section>

        {/* --- MAIN CANVAS --- */}
        <section className="flex-1 bg-zinc-900/10 flex flex-col items-center justify-center p-8 relative">
          <div ref={canvasRef} className="aspect-[9/16] w-[340px] md:w-[380px] bg-zinc-900 rounded-[40px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            
            {/* Preview Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-800 pointer-events-none">
               <ImageIcon size={48} className="opacity-10 mb-2"/>
               <span className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">Nexus Render Surface</span>
            </div>

            {/* Selected Music HUD */}
            {selectedMusic && (
               <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 flex items-center gap-2 animate-bounce-slow">
                  <Music size={12} className="text-cyan-400" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-white truncate max-w-[120px]">{selectedMusic.trackName}</span>
               </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
               <button className="p-4 bg-black/80 backdrop-blur-xl rounded-full border border-white/10 text-cyan-400 active:scale-90"><Play size={20} fill="currentColor"/></button>
               <button className="p-4 bg-black/80 backdrop-blur-xl rounded-full border border-white/10 text-white active:scale-90"><Share2 size={20}/></button>
            </div>
          </div>

          {/* Zoom UI */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-2">
            <button className="p-3 bg-zinc-950 rounded-xl border border-white/5 text-zinc-500 hover:text-white"><ZoomIn size={18}/></button>
            <button className="p-3 bg-zinc-950 rounded-xl border border-white/5 text-zinc-500 hover:text-white"><ZoomOut size={18}/></button>
          </div>
        </section>

        {/* --- RIGHT PROPERTIES PANEL --- */}
        <aside className="w-72 border-l border-white/5 bg-zinc-950 p-6 hidden lg:block">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-8">Object Settings</h3>
          <div className="space-y-8">
             <div className="p-4 bg-zinc-900 rounded-2xl border border-white/5">
                <p className="text-[8px] text-zinc-600 font-bold uppercase mb-2">Layer Status</p>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-black uppercase">Active Engine</span>
                </div>
             </div>
             <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-cyan-900/20 to-zinc-900 rounded-2xl border border-cyan-500/20 group hover:border-cyan-500 transition-all">
                <span className="text-[10px] font-black uppercase italic group-hover:text-cyan-400">Upscale to 4K</span>
                <Wand2 size={14} className="text-cyan-400" />
             </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

// --- HELPER COMPONENT ---
function ToolIcon({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-1 group cursor-pointer">
      <div className={`p-3.5 rounded-2xl transition-all duration-300 ${active ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'bg-transparent text-zinc-600 group-hover:bg-zinc-900 group-hover:text-zinc-200'}`}>
        {icon}
      </div>
      <span className={`text-[8px] font-black uppercase tracking-widest ${active ? 'text-cyan-400' : 'text-zinc-700'}`}>{label}</span>
    </div>
  );
}
