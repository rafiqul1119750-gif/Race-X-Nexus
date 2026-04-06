import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Video, Music, Wand2, Zap } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToaster } from '@/components/ui/use-toast';
import ProgressBar from '@/components/ui/ProgressBar';

const Studio = () => {
  const { diamonds, setDiamonds } = useAppContext();
  const { toast } = useToaster();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'music'>('image');

  const handleGenerate = async () => {
    if (!prompt) {
      toast({ title: "Prompt khali hai!", description: "Kuch likho bhai pehle.", variant: "destructive" });
      return;
    }

    if (diamonds < 5) {
      toast({ title: "Diamonds kam hain!", description: "Shop se recharge karo.", variant: "destructive" });
      return;
    }

    // Logic: AI Generation Start
    setIsGenerating(true);
    
    // Fake Delay (Yahan aapka AI API call aayega)
    setTimeout(() => {
      setIsGenerating(false);
      setDiamonds(prev => prev - 5); // 5 Diamonds deduct ho gaye
      toast({ title: "Success!", description: "Aapka AI creation taiyaar hai!" });
      setPrompt('');
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
          Rx-Studio <Sparkles className="text-primary w-5 h-5" />
        </h1>
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <Zap className="w-4 h-4 text-primary fill-primary" />
          <span className="font-bold text-sm">{diamonds}</span>
        </div>
      </div>

      {/* --- Tabs (Image/Video/Music) --- */}
      <div className="flex bg-secondary/30 p-1 rounded-2xl border border-white/5">
        <TabButton active={activeTab === 'image'} onClick={() => setActiveTab('image')} icon={<ImageIcon size={18}/>} label="Image" />
        <TabButton active={activeTab === 'video'} onClick={() => setActiveTab('video')} icon={<Video size={18}/>} label="Video" />
        <TabButton active={activeTab === 'music'} onClick={() => setActiveTab('music')} icon={<Music size={18}/>} label="Music" />
      </div>

      {/* --- Input Area --- */}
      <Card className="p-4 bg-secondary/20 border-white/10 backdrop-blur-xl">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Describe your ${activeTab}...`}
          className="w-full h-32 bg-transparent border-none focus:ring-0 text-lg resize-none placeholder:text-gray-600"
          disabled={isGenerating}
        />
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Cost: <span className="text-primary font-bold">5 Diamonds</span>
          </p>
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`rounded-xl px-6 font-bold shadow-lg shadow-primary/20 transition-all ${isGenerating ? 'bg-gray-600' : 'bg-primary'}`}
          >
            {isGenerating ? 'Generating...' : 'Create'} <Wand2 className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* --- Generation Status / Result Area --- */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <Sparkles className="absolute inset-0 m-auto text-primary animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold">AI is thinking...</h3>
                <p className="text-xs text-gray-500">Hamara super-engine aapke liye magic create kar raha hai.</p>
              </div>
              <ProgressBar /> {/* Custom Component */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Sub-component for Tabs
const TabButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
  >
    {icon} {label}
  </button>
);

export default Studio;
