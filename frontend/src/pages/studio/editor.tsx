import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Home, FileVideo, ImageIcon, Type, Sparkles, Mic2, Plus, Trash2, 
  Layers, Volume2, VolumeX, Scissors, Wand2, Palette, Zap, Ghost,
  Copy, RotateCw, MonitorPlay, Music, Download, LayoutTemplate, 
  Settings, MoveUp, MoveDown, RefreshCcw
} from 'lucide-react';

export default function AntiBlackScreenStudio() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState<any>(null);
  const [isEngineReady, setIsEngineReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!canvasRef.current) return;

      // @ts-ignore
      const fCanvas = new window.fabric.Canvas(canvasRef.current, {
        width: 360,
        height: 600,
        backgroundColor: '#0a0a0a', // Solid deep black (not transparent/empty)
        preserveObjectStacking: true,
        renderOnAddRemove: true
      });

      setCanvas(fCanvas);
      setIsEngineReady(true);

      // --- ⚡ CRITICAL FIX: The Render Loop ---
      // @ts-ignore
      window.fabric.util.requestAnimFrame(function render() {
        fCanvas.renderAll();
        // @ts-ignore
        window.fabric.util.requestAnimFrame(render);
      });

      fCanvas.on('selection:created', (e: any) => setActiveLayer(e.selected[0]));
      fCanvas.on('selection:cleared', () => setActiveLayer(null));
    };
    
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  // --- 🎥 REAL POWER: IMPORT WITHOUT BLACK SCREEN ---
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;
    const url = URL.createObjectURL(file);

    if (type === 'video') {
      const videoEl = document.createElement('video');
      videoEl.src = url;
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.crossOrigin = "anonymous";
      videoEl.setAttribute('webkit-playsinline', 'true');
      videoEl.setAttribute('playsinline', 'true');
      
      videoEl.play().then(() => {
        // Video jab chalu ho jaye, tabhi canvas par dikhao
        // @ts-ignore
        const v = new window.fabric.Image(videoEl, { 
            left: 50, 
            top: 50, 
            objectCaching: false,
            originX: 'center',
            originY: 'center'
        });
        v.scaleToWidth(280);
        canvas.add(v);
        canvas.setActiveObject(v);
        canvas.requestRenderAll();
      });
    } else {
      // @ts-ignore
      window.fabric.Image.fromURL(url, (img: any) => {
        img.scaleToWidth(200);
        canvas.add(img).setActiveObject(img);
        canvas.requestRenderAll();
      }, { crossOrigin: 'anonymous' });
    }
  };

  return (
    <div className="h-screen w-screen bg-[#020202] text-white flex flex-col overflow-hidden">
      
      {/* 🔝 HEADER */}
      <header className="h-14 border-b border-white/5 bg-zinc-950/90 flex items-center justify-between px-4 z-50">
        <button onClick={() => setLocation("/hub")} className="p-2 bg-zinc-900 rounded-lg text-cyan-400"><Home size={18}/></button>
        <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-cyan-500 tracking-[0.3em]">RX STUDIO PRO</span>
            <span className="text-[6px] text-zinc-600 font-bold uppercase">Engine: Stable v4.1</span>
        </div>
        <button onClick={() => canvas && window.open(canvas.toDataURL())} className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black">EXPORT</button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* 📂 LEFT: SOURCE PANEL */}
        <aside className="w-20 bg-black border-r border-white/5 flex flex-col py-6 items-center gap-7 z-40">
           <SidebarBtn icon={<MonitorPlay size={22}/>} label="Video" onClick={() => videoInputRef.current?.click()} />
           <SidebarBtn icon={<ImageIcon size={22}/>} label="Photo" onClick={() => imageInputRef.current?.click()} />
           <SidebarBtn icon={<Type size={22}/>} label="Text" onClick={() => {
              // @ts-ignore
              const t = new window.fabric.IText('Double Tap', { left: 100, top: 100, fill: '#fff', fontSize: 30, fontFamily: 'sans-serif' });
              canvas.add(t).setActiveObject(t);
           }} />
           <SidebarBtn icon={<Music size={22}/>} label="Audio" onClick={() => {}} />
           <div className="mt-auto">
              <SidebarBtn icon={<Sparkles size={24}/>} label="Magic" onClick={() => setLocation("/magic/ai-chat")} special />
           </div>
        </aside>

        {/* 🖼️ CENTER: THE LIVE CANVAS */}
        <main className="flex-1 relative flex flex-col items-center justify-center p-2 bg-[#050505]">
           
           {!isEngineReady && (
             <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-[100] gap-4">
                <RefreshCcw className="text-cyan-500 animate-spin" size={30} />
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Starting Engine...</span>
             </div>
           )}

           <div className="relative rounded-2xl border-[1px] border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)] bg-[#0a0a0a]">
              <canvas ref={canvasRef} />
           </div>

           {/* Quick Layer Controls */}
           {activeLayer && (
             <div className="absolute bottom-24 bg-zinc-900/95 border border-white/10 p-2 rounded-2xl flex items-center gap-5 shadow-2xl scale-90">
                <button onClick={() => canvas.bringForward(activeLayer)} className="p-2 hover:bg-white/10 rounded-lg text-cyan-400"><MoveUp size={18}/></button>
                <button onClick={() => canvas.sendBackwards(activeLayer)} className="p-2 hover:bg-white/10 rounded-lg text-zinc-400"><MoveDown size={18}/></button>
                <div className="w-[1px] h-4 bg-white/10" />
                <button onClick={() => {
                   activeLayer.clone((cloned:any) => {
                      cloned.set({left: activeLayer.left+20, top: activeLayer.top+20});
                      canvas.add(cloned);
                   });
                }} className="p-2 hover:bg-white/10 rounded-lg text-zinc-400"><Copy size={18}/></button>
                <button onClick={() => { canvas.remove(activeLayer); setActiveLayer(null); }} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={18}/></button>
             </div>
           )}

           <div className="absolute bottom-6">
              <button onClick={() => videoInputRef.current?.click()} className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl active:scale-75 transition-all">
                <Plus size={35}/>
              </button>
           </div>
        </main>

        {/* 🧠 RIGHT: FX PANEL */}
        <aside className="w-18 bg-black border-l border-white/5 flex flex-col py-8 items-center gap-6 z-40">
           <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">Filters</span>
           <EditBtn icon={<Zap size={18}/>} label="B&W" onClick={() => applyRealFilter('gray')} />
           <EditBtn icon={<Palette size={18}/>} label="Sepia" onClick={() => applyRealFilter('sepia')} />
           <EditBtn icon={<Ghost size={18}/>} label="Invert" onClick={() => applyRealFilter('invert')} />
           <div className="w-10 h-[1px] bg-white/5 my-2" />
           <EditBtn icon={<RotateCw size={18}/>} label="Reset" onClick={() => { if(activeLayer){ activeLayer.filters = []; activeLayer.applyFilters(); canvas.renderAll(); }}} />
        </aside>
      </div>

      <input type="file" ref={videoInputRef} hidden accept="video/*" onChange={(e) => handleImport(e, 'video')} />
      <input type="file" ref={imageInputRef} hidden accept="image/*" onChange={(e) => handleImport(e, 'image')} />

      <footer className="h-8 bg-black border-t border-white/5 flex items-center justify-center px-6">
         <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.6em]">Neural Engine v4.1 - 0% Lag Policy</span>
      </footer>
    </div>
  );

  function applyRealFilter(type: string) {
    if (!activeLayer) return;
    // @ts-ignore
    const f = window.fabric.Image.filters;
    activeLayer.filters = [];
    if (type === 'gray') activeLayer.filters.push(new f.Grayscale());
    if (type === 'sepia') activeLayer.filters.push(new f.Sepia());
    if (type === 'invert') activeLayer.filters.push(new f.Invert());
    activeLayer.applyFilters();
    canvas.requestRenderAll();
  }
}

function SidebarBtn({ icon, label, onClick, special }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 group active:scale-75 transition-all w-full px-2">
      <div className={`p-3.5 rounded-2xl transition-all ${special ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'bg-zinc-900 text-zinc-500 hover:text-cyan-400'}`}>
        {icon}
      </div>
      <span className="text-[6px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 text-center">{label}</span>
    </button>
  );
}

function EditBtn({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 group active:scale-75 transition-all">
      <div className="p-3 bg-zinc-900/50 text-zinc-600 rounded-xl hover:text-white border border-transparent hover:border-white/10 transition-all">
        {icon}
      </div>
      <span className="text-[6px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">{label}</span>
    </button>
  );
}
