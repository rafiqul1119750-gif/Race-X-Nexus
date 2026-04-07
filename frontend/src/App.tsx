import { Switch, Route, Redirect, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { 
  Sparkles, Globe, Wand2, MessageSquare, Music, 
  ShoppingBag, Zap, ArrowLeft, Play, Heart, Send, Search, Plus
} from "lucide-react";

// --- EXISTING IMPORTS (Ensure these 4 exist) ---
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";
import Feed from "./pages/social/feed";

// --- INTERNAL MODULE COMPONENTS (Bypasses missing file errors) ---

const StudioModule = () => (
  <div className="min-h-screen bg-black p-6 text-white">
    <div className="flex items-center gap-4 mb-8">
      <ArrowLeft onClick={() => window.location.href='/hub'} className="cursor-pointer" />
      <h1 className="text-xl font-black italic text-cyan-400 uppercase tracking-widest">RX Studio</h1>
    </div>
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-[32px] text-center">
        <Sparkles className="mx-auto mb-4 text-cyan-400" size={40} />
        <p className="text-[10px] font-black uppercase tracking-widest">Creator Dashboard</p>
        <h2 className="text-2xl font-bold mt-2 text-zinc-500 italic uppercase">Coming Soon</h2>
      </div>
    </div>
  </div>
);

const MagicAIModule = () => (
  <div className="min-h-screen bg-black p-6 text-white">
    <div className="flex items-center gap-4 mb-8">
      <ArrowLeft onClick={() => window.location.href='/hub'} className="cursor-pointer" />
      <h1 className="text-xl font-black italic text-amber-500 uppercase tracking-widest">RX Magic</h1>
    </div>
    <div className="flex flex-col items-center justify-center mt-20 opacity-40">
      <Wand2 size={80} className="text-amber-500 mb-6 animate-pulse" />
      <p className="text-[10px] font-black tracking-[0.5em] uppercase text-center">Neural Engine Initializing...</p>
    </div>
  </div>
);

const ChatModule = () => (
  <div className="min-h-screen bg-black p-6 text-white">
    <div className="flex items-center justify-between mb-8">
      <ArrowLeft onClick={() => window.location.href='/hub'} className="cursor-pointer" />
      <h1 className="text-xl font-black italic text-green-400 uppercase tracking-widest">RX Chat</h1>
      <Plus size={20} />
    </div>
    <div className="p-4 bg-zinc-900/30 border border-white/5 rounded-2xl flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center font-black">AI</div>
      <div>
        <h4 className="text-xs font-bold">Nexus Support</h4>
        <p className="text-[10px] text-zinc-500">System is online.</p>
      </div>
    </div>
  </div>
);

// --- MAIN APP ROUTER ---

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
        <Switch>
          {/* 🟢 Core Pages */}
          <Route path="/" component={SplashScreen} />
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
          <Route path="/hub" component={MainHub} />
          <Route path="/social/feed" component={Feed} />

          {/* 🎬 Integrated Modules */}
          <Route path="/studio" component={StudioModule} />
          <Route path="/magic" component={MagicAIModule} />
          <Route path="/chat" component={ChatModule} />
          
          {/* 🎵 Music Placeholder */}
          <Route path="/music">
            <div className="h-screen flex flex-col items-center justify-center bg-black">
              <Music className="text-red-500 mb-4 animate-bounce" size={48} />
              <button onClick={() => window.location.href='/hub'} className="text-[10px] underline uppercase tracking-widest">Back to Hub</button>
            </div>
          </Route>

          {/* 🛒 Shop Placeholder */}
          <Route path="/shop">
            <div className="h-screen flex flex-col items-center justify-center bg-black">
              <ShoppingBag className="text-pink-500 mb-4 animate-pulse" size={48} />
              <button onClick={() => window.location.href='/hub'} className="text-[10px] underline uppercase tracking-widest">Back to Hub</button>
            </div>
          </Route>

          {/* 🔄 Global Fallback */}
          <Route>
            <Redirect to="/hub" />
          </Route>
        </Switch>
      </div>
    </QueryClientProvider>
  );
}
