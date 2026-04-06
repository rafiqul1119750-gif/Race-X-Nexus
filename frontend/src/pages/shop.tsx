import React from 'react';
import { useToast } from "../components/ui/use-toast";
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge'; // FIXED: Added curly brackets
import { 
  ShoppingBag, 
  Diamond, 
  Zap, 
  Star, 
  Clock,
  ArrowUpRight
} from 'lucide-react';

const Shop = () => {
  const { toast } = useToast();

  const handlePurchase = (item: string) => {
    toast({
      title: "Processing Request",
      description: `Initiating purchase for ${item}...`,
    });
  };

  return (
    <div className="space-y-8 pb-24">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Race-X Shop</h1>
          <p className="text-zinc-500 text-sm">Upgrade your digital arsenal</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1 flex items-center gap-2">
          <Diamond className="w-4 h-4 text-blue-500" />
          <span className="font-bold">1,250</span>
        </div>
      </header>

      {/* Featured Items */}
      <div className="grid grid-cols-1 gap-4">
        {[
          { name: "Pro Creator Pack", price: "500", desc: "Unlock advanced AI Studio tools", tag: "Hot" },
          { name: "Neon Profile Aura", price: "200", desc: "Exclusive profile glow effect", tag: "Limited" }
        ].map((item) => (
          <Card key={item.name} className="bg-zinc-900 border-zinc-800 p-5 space-y-4">
            <div className="flex justify-between items-start">
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">
                {item.tag}
              </Badge>
              <span className="text-2xl font-bold flex items-center gap-1">
                <Diamond className="w-5 h-5 text-blue-500" /> {item.price}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
            <Button 
              onClick={() => handlePurchase(item.name)}
              className="w-full bg-white text-black hover:bg-zinc-200 font-bold"
            >
              Purchase Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
