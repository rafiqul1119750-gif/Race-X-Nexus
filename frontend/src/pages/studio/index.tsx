import { Switch, Route, Redirect, useLocation } from "wouter";
import { ArrowLeft, Wand2, Mic2, BarChart3, Zap } from "lucide-react";

// Existing Imports
import Dashboard from "./dashboard";
import Editor from "./editor";

// --- INLINE COMPONENTS (No Imports Needed) ---

const VideoGen = () => {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <button onClick={() => setLocation("/studio")} className="absolute top-8 left-6 p-2 bg-zinc-900 rounded-full">
        <ArrowLeft size={20} />
      </button>
      <div className="w-20 h-20 bg-purple-600/20 rounded-3xl flex items-center justify-center mb-6 border border-purple-500/30">
        <Wand2 size={40} className="text-purple-500 animate-pulse" />
      </div>
      <h2 className="text-2xl font-black italic tracking-tighter">AI CINEMA</h2>
      <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mt-2">Neural Engine Initializing...</p>
    </div>
  );
};

const VoiceLab = () => {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <button onClick={() => setLocation("/studio")} className="absolute top-8 left-6 p-2 bg-zinc-900 rounded-full">
        <ArrowLeft size={20} />
      </button>
      <div className="w-20 h-20 bg-pink-600/20 rounded-3xl flex items-center justify-center mb-6 border border-pink-500/30">
        <Mic2 size={40} className="text-pink-500 animate-bounce" />
      </div>
      <h2 className="text-2xl font-black italic tracking-tighter">VOICE LAB</h2>
      <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mt-2">Vocal Synthesis Ready</p>
    </div>
  );
};

const Analytics = () => {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <button onClick={() => setLocation("/studio")} className="absolute top-8 left-6 p-2 bg-zinc-900 rounded-full">
        <ArrowLeft size={20} />
      </button>
      <div className="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center mb-6 border border-zinc-700">
        <BarChart3 size={40} className="text-zinc-400" />
      </div>
      <h2 className="text-2xl font-black italic tracking-tighter">ANALYTICS</h2>
      <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mt-2">Syncing Data Nodes...</p>
    </div>
  );
};

// --- MAIN ROUTER ---
export default function StudioIndex() {
  return (
    <Switch>
      {/* Specific Routes First */}
      <Route path="/studio/editor" component={Editor} />
      <Route path="/studio/video" component={VideoGen} />
      <Route path="/studio/voice" component={VoiceLab} />
      <Route path="/studio/analytics" component={Analytics} />
      
      {/* Dashboard Home */}
      <Route path="/studio" component={Dashboard} />
      
      {/* Catch-all Fallback */}
      <Route>
        <Redirect to="/studio" />
      </Route>
    </Switch>
  );
}
