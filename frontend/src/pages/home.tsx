import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button'; // @ ki jagah relative path for safety
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge'; // Fixed: Added curly brackets
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-10 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-10">
        <Badge variant="outline" className="border-blue-500 text-blue-400 mb-4">
          Race-X Nexus v1.0
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          The Future of <br /> AI Social Networking
        </h1>
        <p className="text-zinc-400 max-w-[600px] mx-auto text-lg">
          Connect, create, and earn in the most advanced AI-integrated ecosystem.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link to="/social">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link to="/studio">
            <Button size="lg" variant="outline" className="border-zinc-800">
              AI Studio <Sparkles className="ml-2 w-4 h-4 text-purple-400" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 space-y-2">
          <TrendingUp className="text-blue-500 w-8 h-8 mb-2" />
          <h3 className="font-bold text-xl">Real-time Analytics</h3>
          <p className="text-zinc-400 text-sm">Track your content growth with precision.</p>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 space-y-2">
          <Users className="text-purple-500 w-8 h-8 mb-2" />
          <h3 className="font-bold text-xl">Global Community</h3>
          <p className="text-zinc-400 text-sm">Connect with creators around the world.</p>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 space-y-2">
          <Shield className="text-green-500 w-8 h-8 mb-2" />
          <h3 className="font-bold text-xl">Secure & Private</h3>
          <p className="text-zinc-400 text-sm">Your data is protected by Race-X encryption.</p>
        </Card>
      </section>
    </div>
  );
};

export default Home;
