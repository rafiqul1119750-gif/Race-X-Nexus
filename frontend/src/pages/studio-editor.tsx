import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Type, Layers, Square, Palette, 
  Play, Download, Smartphone, Monitor, LayoutGrid, X
} from "lucide-react";

type Ratio = "9/16" | "1/1" | "16/9";
type Tool = "text" | "layers" | "shapes" | "color" | null;

export default function StudioEditor() {
  const [ratio, setRatio] = useState<Ratio>("16/9");
  const [activeTool, setActiveTool] = useState<Tool>(null);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background overflow-hidden relative">
      
      {/* Left Toolbar */}
      <div className="w-16 glass-panel border-r border-y-0 border-l-0 rounded-none z-20 flex flex-col items-center py-4 gap-4">
        {[
          { id: "text", icon: Type, label: "Text" },
          { id: "layers", icon: Layers, label: "Layers" },
          { id: "shapes", icon: Square, label: "Shapes" },
          { id: "color", icon: Palette, label: "Color" },
        ].map((tool) => (
          <button 
            key={tool.id}
            onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id as Tool)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all btn-ripple ${activeTool === tool.id ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,212,255,0.5)]' : 'text-muted-foreground hover:bg-white/10 hover:text-white'}`}
            title={tool.label}
          >
            <tool.icon className="w-5 h-5" />
          </button>
        ))}
      </div>

      {/* Slide-out Tool Panel */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -250, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="w-64 glass-panel border-r border-y-0 border-l-0 rounded-none z-10 flex flex-col absolute left-16 top-0 h-full"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-display font-bold text-glow capitalize">{activeTool}</h3>
              <button onClick={() => setActiveTool(null)} className="text-muted-foreground hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              {activeTool === 'text' && (
                <div className="space-y-3">
                  <button className="w-full p-3 border border-white/10 rounded-xl text-2xl font-bold hover:bg-white/5 transition-colors">Add Heading</button>
                  <button className="w-full p-3 border border-white/10 rounded-xl text-lg font-semibold hover:bg-white/5 transition-colors">Add Subheading</button>
                  <button className="w-full p-3 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition-colors">Add Body Text</button>
                  <div className="mt-6">
                    <p className="text-xs font-bold text-muted-foreground mb-2 uppercase">Neon Styles</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-12 rounded-lg bg-black border border-primary/50 flex items-center justify-center text-primary text-glow cursor-pointer">Neon</div>
                      <div className="h-12 rounded-lg bg-black border border-secondary/50 flex items-center justify-center text-secondary text-glow-purple cursor-pointer">Cyber</div>
                    </div>
                  </div>
                </div>
              )}
              {activeTool === 'layers' && (
                <div className="space-y-2">
                  <div className="p-2 bg-primary/20 border border-primary/50 rounded-lg flex items-center justify-between text-sm">
                    <span>Text: "CYBER"</span>
                    <Layers className="w-3 h-3 text-primary" />
                  </div>
                  <div className="p-2 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between text-sm">
                    <span>Background Video</span>
                    <Video className="w-3 h-3" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Top bar controls */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm z-20">
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
            <button onClick={() => setRatio("9/16")} className={`p-1.5 rounded transition-colors btn-ripple ${ratio === "9/16" ? 'bg-primary text-background' : 'text-muted-foreground hover:text-white'}`}><Smartphone className="w-4 h-4" /></button>
            <button onClick={() => setRatio("1/1")} className={`p-1.5 rounded transition-colors btn-ripple ${ratio === "1/1" ? 'bg-primary text-background' : 'text-muted-foreground hover:text-white'}`}><LayoutGrid className="w-4 h-4" /></button>
            <button onClick={() => setRatio("16/9")} className={`p-1.5 rounded transition-colors btn-ripple ${ratio === "16/9" ? 'bg-primary text-background' : 'text-muted-foreground hover:text-white'}`}><Monitor className="w-4 h-4" /></button>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors btn-ripple">
              <Play className="w-4 h-4 fill-current" />
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-primary-foreground font-bold rounded text-sm hover:opacity-90 btn-ripple shadow-[0_0_15px_rgba(0,212,255,0.4)]">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        {/* The Canvas Background */}
        <div className="flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] flex items-center justify-center p-8 overflow-hidden">
          
          {/* THE RESIZING CANVAS */}
          <motion.div 
            layout
            initial={false}
            animate={{ aspectRatio: ratio }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-black border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex items-center justify-center max-h-full max-w-full"
            style={{ 
              height: ratio === "16/9" ? 'auto' : '100%',
              width: ratio === "9/16" ? 'auto' : '100%',
            }}
          >
            {/* Mock content inside canvas */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-black pointer-events-none" />
            <h1 className="text-4xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow drop-shadow-[0_0_15px_rgba(0,212,255,0.8)] z-10 select-none">
              CYBER
            </h1>
            <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 backdrop-blur border border-white/20 rounded z-10" />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
