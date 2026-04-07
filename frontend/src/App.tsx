import { Switch, Route, Redirect, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { 
  Sparkles, Globe, Wand2, MessageSquare, Music, 
  ShoppingBag, Zap, ArrowLeft, Play, Heart, Send 
} from "lucide-react";

// --- CORE COMPONENTS ---
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";
import Feed from "./pages/social/feed";

// --- DYNAMIC MODULE RENDERING (Bypasses Missing File Errors) ---
const ModuleWrapper = ({ title, icon: Icon, color }: any) => {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="flex items-center justify-between mb-10">
        <ArrowLeft onClick={() => setLocation("/hub")} className="cursor-pointer" />
        <h1 className={`text-xl font-black italic tracking-widest uppercase ${color}`}>{title}</h1>
        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5" />
      </div>
      <div className="flex flex-col items-center justify-center mt-20 opacity-40">
        <Icon size={80} className={`${color} mb-6 animate-pulse`} />
        <p className="text-[10px] font-black tracking-[0.5em] uppercase">Initializing {title} Node...</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
        <Switch>
          {/* 🟢 Splash & Auth */}
          <Route path="/" component={SplashScreen} />
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />

          {/* 🏠 Main Entry */}
          <Route path="/hub" component={MainHub} />
          
          {/* 🌐 Social */}
          <Route path="/social/feed" component={Feed} />

          {/* 🎬 Studio */}
          <Route path="/studio">
            <ModuleWrapper title="RX Studio" icon={Sparkles} color="text-cyan-400" />
          </Route>

          {/* 🤖 Magic AI */}
          <Route path="/magic">
            <ModuleWrapper title="RX Magic" icon={Wand2} color="text-amber-400" />
          </Route>

          {/* 💬 Chat */}
          <Route path="/chat">
            <ModuleWrapper title="RX Chat" icon={MessageSquare} color="text-green-400" />
          </Route>

          {/* 🎵 Music */}
          <Route path="/music">
            <ModuleWrapper title="RX Music" icon={Music} color="text-red-500" />
          </Route>

          {/* 🛒 Shop */}
          <Route path="/shop">
            <ModuleWrapper title="RX Shop" icon={ShoppingBag} color="text-pink-500" />
          </Route>

          <Route><Redirect to="/hub" /></Route>
        </Switch>
      </div>
    </QueryClientProvider>
  );
}
