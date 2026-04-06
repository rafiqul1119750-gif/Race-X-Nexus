import React from 'react';
import { useToast } from "../components/ui/use-toast"; // Sahi path aur naam
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Repeat, 
  MoreHorizontal,
  UserPlus
} from 'lucide-react';

const Social = () => {
  const { toast } = useToast(); // useToaster ki jagah useToast

  const handleLike = () => {
    toast({
      title: "Liked!",
      description: "Post added to your favorites.",
    });
  };

  return (
    <div className="space-y-6 pb-24">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Race-X Feed</h1>
        <Button size="sm" variant="outline" className="border-zinc-800">
          <UserPlus className="w-4 h-4 mr-2" /> Follow
        </Button>
      </header>

      {/* Post Example */}
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
            <div>
              <p className="font-bold text-sm">Race-X Official</p>
              <p className="text-zinc-500 text-xs">2 hours ago</p>
            </div>
          </div>
          <p className="text-sm text-zinc-300">
            Welcome to the future of social networking. Race-X Nexus is now live! 🚀
          </p>
          <div className="aspect-video bg-zinc-800 rounded-lg" />
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
            <Button variant="ghost" size="sm" onClick={handleLike} className="text-zinc-400">
              <Heart className="w-4 h-4 mr-2" /> 1.2k
            </Button>
            <Button variant="ghost" size="sm" className="text-zinc-400">
              <MessageSquare className="w-4 h-4 mr-2" /> 84
            </Button>
            <Button variant="ghost" size="sm" className="text-zinc-400">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Social;
