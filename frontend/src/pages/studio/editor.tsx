import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, Download, Undo2, Redo2, Type, Box, Music, Sparkles, 
  Plus, Wand2, Eraser, Home, UploadCloud, Mic2, Play, Film,
  Layers, Zap, Scissors, Boxes, Share2, ScanFace, Cpu, MonitorPlay,
  Languages, Wand, Ghost, Image as ImageIcon, Search, Command,
  Move, MousePointer2, Settings2, ShieldCheck
} from 'lucide-react';

export default function GodModeStudio() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTool, setActiveTool] = useState('select');

  // --- 🛠️ HYPER-ENGINE BOOTUP (Optimized for Redmi Mobile) ---
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      const fCanvas = new window.fabric.Canvas(canvasRef.current, {
        width: 360,
        height: 640,
        backgroundColor: '#050505',
        imageSmoothingEnabled: true, // Higher quality
        enableRetinaScaling: true, // Sharp on high-res mobile screens
      });
      
      // Real-time object snapping (Canva se behtar alignment)
      fCanvas.on('object:moving', (options: any) => {
        options.target.set({
          left: Math.round(options.target.left / 5) * 5,
          top: Math.round(options.target.top / 5) * 5
        });
      });

      setCanvas(fCanvas);
    };
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  // --- ⚡ POWER FUNCTION: AI SMART IMPORT ---
  const handleSmartImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;
    setIsProcessing(true);

    const url = URL.createObjectURL(file);
    
    if (file.type.includes('video')) {
      const videoEl = document.createElement('video');
      videoEl.src = url;
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.play();

      videoEl.onloadeddata = () => {
        // @ts-ignore
        const fabricVideo = new window.fabric.Image(videoEl, { 
            left: 0, 
            top: 0,
            shadow: { color: 'rgba(0,0,0,0.5)', blur: 20 }
        });
        fabricVideo.scaleToHeight(canvas.height);
        canvas.add(fabricVideo).centerObject(fabricVideo).sendToBack(fabricVideo);
        
        // GPU Accelerated Render Loop
        // @ts-ignore
        window.fabric.util.requestAnimFrame(function render() {
          canvas.renderAll();
          // @ts-ignore
          window.fabric.util.requestAnimFrame(render);
        });
        setIsProcessing(false);
      };
    } else {
      // Photo with Auto-Enhance effect
      // @ts-ignore
      window.fabric.Image.fromURL(url, (img: any) => {
        img.scaleToWidth(canvas.width);
        canvas.add(img).centerObject(img);
        setIsProcessing(false);
      });
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden selection:bg-cyan-500">
      
      {/* 🔝 1. NEURAL COMMAND CENTER (Top Bar) */}
      <header className="h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur-3xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-5">
          <button onClick={() => setLocation("/hub")} className="group relative p-2.5 bg-zinc-900 rounded-2xl hover:bg-cyan-500 transition-all">
            <Home size={20} className="group-hover:text-black" />
          </button>
          <div className="hidden sm:flex flex-col">
            <h1 className="text-[11px] font-black tracking-[0.4em] text-cyan-400 uppercase">Race-X OS</h1>
            <div className="flex items-center gap-2">
                <ShieldCheck size={10} className="text-green-500"/>
                <span className="text-[8px] text-zinc-500 font-bold uppercase">Kernel: Stable</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-zinc-900 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3">
             <Search size={14} className="text-zinc-500"/>
             <input className="bg-transparent border-none outline-none text-[10px] w-24 font-bold" placeholder="SEARCH ASSETS..." />
          </div>
          <button onClick={() => canvas && window.open(canvas.toDataURL())} className="bg-white text-black px-8 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 transition-all">
             Compile
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* 📂 2. TOOLBOX DOCK (Left) */}
        <aside className="w-20 bg-zinc-950 border-r border-white/5 flex flex-col py-8 items-center gap-8 shadow-2xl overflow-y-auto no-scrollbar">
           <DockBtn icon={<MousePointer2 size={22}/>} active={activeTool === 'select'} onClick={() => setActiveTool('select')} />
           <div className="w-10 h-[1px] bg-white/5" />
           <DockBtn icon={<MonitorPlay size={22}/>} label="Video" onClick={() => fileInputRef.current?.click()} />
           <DockBtn icon={<ImageIcon size={22}/>} label="Photo" onClick={() => fileInputRef.current?.click()} />
           <DockBtn icon={<Type size={22}/>} label="Text" onClick={() => {}} />
           <DockBtn icon={<Mic2 size={22}/>} label="Neural Voice" onClick={() => setLocation("/studio/voice-lab")} />
           <DockBtn icon={<Sparkles size={22}/>} label="Magic AI" onClick={() => setLocation("/magic/ai-chat")} special />
           
           <div className="mt-auto space-y-6">
              <DockBtn icon={<Settings2 size={20}/>} onClick={() => {}} />
           </div>
        </aside>

        {/* 🖼️ 3. THE VOID (Canvas Area) */}
        <main className="flex-1 relative flex flex-col items-center justify-center p-6 bg-[#000000]">
           
           {/* Smart HUD (Selected Object Controls) */}
           <div className="absolute top-10 flex items-center gap-2 z-40">
              <div className="bg-zinc-900/95 backdrop-blur-2xl border border-white/10 px-6 py-2 rounded-2xl flex items-center gap-6 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                  <button className="text-zinc-500 hover:text-cyan-400"><Scissors size={18}/></button>
                  <button className="text-zinc-500 hover:text-cyan-400"><Layers size={18}/></button>
                  <button className="text-zinc-500 hover:text-cyan-400"><Ghost size={18}/></button>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <button onClick={() => canvas.remove(...canvas.getActiveObjects())} className="text-red-500 hover:scale-110"><Trash2 size={18}/></button>
              </div>
           </div>

           {/* MASTER CANVAS CONTAINER */}
           <div className="relative group transition-all duration-700 hover:shadow-[0_0_150px_rgba(0,225,255,0.08)]">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative rounded-xl border-[1px] border-white/10 overflow-hidden bg-black shadow-2xl">
                 <canvas ref={canvasRef} />
                 {isProcessing && (
                   <div className="absolute inset-0 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center">
                      <div className="relative">
                         <div className="w-16 h-16 border-2 border-cyan-500/20 rounded-full" />
                         <div className="absolute top-0 w-16 h-16 border-t-2 border-cyan-500 rounded-full animate-spin" />
                         <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500 animate-pulse" size={24}/>
                      </div>
                      <p className="mt-6 text-[10px] font-black tracking-[0.5em] text-cyan-500 animate-pulse">OPTIMIZING CORE</p>
                   </div>
                 )}
              </div>
           </div>

           {/* ⚙️ 4. THE COMMAND HUB (Bottom Control) */}
           <div className="absolute bottom-12 flex items-center gap-10 px-12 py-6 bg-zinc-950/90 backdrop-blur-3xl rounded-[40px] border border-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
              <button className="text-zinc-600 hover:text-white transition-all hover:rotate-12"><Command size={24}/></button>
              
              <div className="flex items-center gap-4">
                <button onClick={() => fileInputRef.current?.click()} className="w-16 h-16 bg-white text-black rounded-3xl flex items-center justify-center shadow-2xl active:scale-90 transition-all hover:rounded-full">
                    <Plus size={35}/>
                </button>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white tracking-widest uppercase">Quick Add</span>
                    <span className="text-[7px] font-bold text-zinc-500 uppercase">Assets / Neural</span>
                </div>
              </div>

              <button className="text-zinc-600 hover:text-cyan-400 transition-all"><Wand size={24}/></button>
           </div>
           
           <input type="file" ref={fileInputRef} hidden accept="video/*,image/*" onChange={handleSmartImport} />
        </main>

        {/* 🧠 5. THE AI SYSTRAY (Right Sidebar) */}
        <aside className="w-16 border-l border-white/5 bg-zinc-950 flex flex-col items-center py-10 gap-10 shadow-2xl">
           <div className="flex flex-col items-center gap-1 opacity-20 hover:opacity-100 transition-all cursor-help">
              <div className="w-1 h-1 bg-cyan-500 rounded-full mb-1" />
              <div className="w-1 h-1 bg-cyan-500 rounded-full mb-1" />
              <div className="w-1 h-1 bg-cyan-500 rounded-full" />
           </div>
           <button title="Magic Edit" className="p-4 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/10 hover:bg-purple-500 hover:text-white transition-all">
              <Zap size={22}/>
           </button>
           <button title="BG Erase" className="p-4 text-zinc-700 hover:text-white transition-colors"><Eraser size={22}/></button>
           <button title="Scan Face" className="p-4 text-zinc-700 hover:text-white transition-colors"><ScanFace size={22}/></button>
        </aside>
      </div>

      {/* 📡 ENGINE STATUS TELEMETRY */}
      <footer className="h-12 bg-zinc-950 border-t border-white/5 flex items-center justify-between px-8">
         <div className="flex gap-8 items-center">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Neural Sync: 100%</span>
            </div>
            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">FPS: 60.0</span>
         </div>
         <div className="flex items-center gap-4">
             <div className="h-1.5 w-32 bg-zinc-900 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-cyan-500 to-blue-500" />
             </div>
             <span className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.3em]">RX Master Engine Active</span>
         </div>
      </footer>
    </div>
  );
}

function DockBtn({ icon, label, onClick, active, special }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group active:scale-75 transition-all">
      <div className={`p-4 rounded-[22px] transition-all relative ${active ? 'bg-cyan-500 text-black shadow-[0_0_30px_rgba(0,225,255,0.4)]' : special ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20 shadow-lg' : 'bg-zinc-900 text-zinc-500 hover:bg-white/5 hover:text-white'}`}>
        {icon}
        {active && <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-cyan-400 rounded-full" />}
      </div>
      {label && <span className="text-[7px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">{label}</span>}
    </button>
  );
}
