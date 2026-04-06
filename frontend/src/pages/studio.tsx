import React, { useState } from 'react';
import { useToast } from "../components/ui/use-toast"; 
import { Progress } from "../components/ui/progress"; // Fixed path
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Sparkles, 
  Video, 
  Mic, 
  Image as ImageIcon, 
  Wand2,
  Play,
  Download,
  Share2
} from 'lucide-react';

const Studio = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(20);
    
    // Simulating Generation
    setTimeout(() => setProgress(60), 1000);
    setTimeout(() => {
      setProgress(100);
      setIsGenerating(false);
      toast({
        title: "Generation Complete!",
        description: "Your AI masterpiece is ready for Race-X.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-24">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Studio
          </h1>
          <p className="text-gray-400 text-sm">Create futuristic content</p>
        </div>
        <Sparkles className="text-blue-500 w-6 h-6 animate-pulse" />
      </header>

      <Tabs defaultValue="image" className="w-full">
        <TabsList className="grid grid-cols-3 bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="mt-4">
          <Card className="bg-zinc-900 border-zinc-800 p-4 space-y-4">
            <textarea 
              placeholder="Describe your vision (e.g., Neon city in 2080...)"
              className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 min-h-[100px]"
            />
            
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Generating...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1 bg-zinc-800" />
              </div>
            )}

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Generate with AI
            </Button>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Creations Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-400">Recent Creations</h3>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="aspect-square bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-white"><Download className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-white"><Share2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Studio;
