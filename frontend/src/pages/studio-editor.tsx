import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, Save, RotateCcw, Sliders, 
  Layers, Download, Share2, Sparkles,
  Maximize, Crop, Palette
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const StudioEditor = () => {
  const { diamonds } = useAppContext();
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [activeTool, setActiveTool] = useState('adjust');

  return (
    <div className="flex flex-col h-[90vh] -mt-4 -mx-4 overflow-hidden bg-[#050505]">
      {/* --- Top Navbar --- */}
      <header className="p-4 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md">
        <Button variant="ghost" size="icon" className="text-gray-400">
          <RotateCcw size={20} />
        </Button>
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          <Sparkles size={14} className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">AI Upscaling</span>
        </div>
        <Button className="bg-primary text-black font-black rounded-xl h-9 px-4">
          <Save size={16} className="mr-2" /> Export
        </Button>
      </header>

      {/* --- Main Preview Canvas --- */}
      <div className="flex-1 relative flex items-center justify-center p-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-black to-black">
        <motion.div 
          style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
          className="relative aspect-square w-full max-w-sm rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
        >
          {/* Main Image (Real app mein current editing image aayegi) */}
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" 
            className="w-full h-full object-cover"
            alt="AI Preview"
          />
          
          {/* Comparison Slider (Optional) */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 active:scale-95 transition-transform">
            <Maximize size={16} className="text-white" />
          </div>
        </motion.div>
      </div>

      {/* --- Editor Controls (Bottom Sheet Style) --- */}
      <footer className="bg-secondary/20 border-t border-white/10 rounded-t-[2.5rem] p-6 space-y-6 pb-28">
        
        {/* Tool Tabs */}
        <div className="flex justify-between px-2">
          {[
            { id: 'adjust', icon: <Sliders size={20}/>, label: 'Adjust' },
            { id: 'filter', icon: <Palette size={20}/>, label: 'Filters' },
            { id: 'crop', icon: <Crop size={20}/>, label: 'Crop' },
            { id: 'ai', icon: <Wand2 size={20}/>, label: 'Magic' }
          ].map((tool) => (
            <button 
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`flex flex-col items-center gap-1 transition-all ${activeTool === tool.id ? 'text-primary scale-110' : 'text-gray-500'}`}
            >
              {tool.icon}
              <span className="text-[8px] font-bold uppercase tracking-widest">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Controls based on Tool */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-500">
            <span>Brightness</span>
            <span className="text-primary">{brightness}%</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="150" 
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-primary cursor-pointer"
          />

          <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-500 pt-2">
            <span>Contrast</span>
            <span className="text-primary">{contrast}%</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="150" 
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-primary cursor-pointer"
          />
        </div>

        {/* Action Row */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 border-white/10 rounded-2xl h-12 font-bold text-gray-400">
            <Download size={18} className="mr-2" /> Save Draft
          </Button>
          <Button className="flex-1 bg-white text-black hover:bg-gray-200 rounded-2xl h-12 font-black">
            <Share2 size={18} className="mr-2" /> Share Feed
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default StudioEditor;
