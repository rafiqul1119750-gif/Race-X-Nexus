import { Switch, Route, Redirect, useLocation } from "wouter";
import { ArrowLeft, Wand2, Mic2, BarChart3, Zap } from "lucide-react";

// --- COMPONENTS ---
import Dashboard from "./dashboard";
import Editor from "./editor";

const VideoGen = () => {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <button onClick={() => setLocation("/studio")} className="absolute top-6 left-6"><ArrowLeft /></button>
      <Wand2 size={60} className="text-purple-500 mb-4 animate-pulse" />
      <h2 className="text-xl font-black italic">AI CINEMA ENGINE</h2>
      <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mt-2">Initializing Neural Core...</p>
    </div>
  );
};

const VoiceLab = () => {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <button onClick={() => setLocation("/studio")} className="absolute top-6 left-6"><ArrowLeft /></button>
      <Mic2 size={60} className="text-pink-500 mb-4 animate-bounce" />
      <h2 className="text-xl font-black italic">VOICE LAB PRO</h2>
      <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mt-2">Vocal Synthesis Active</p>
    </div>
  );
};

const Analytics = () => {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <button onClick={() => setLocation("/studio")} className="absolute top-6 left-6"><ArrowLeft /></button>
      <BarChart3 size={60} className="text-zinc-500 mb-4" />
      <h2 className="text-xl font-black italic">RX ANALYTICS</h2>
      <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mt-2">Syncing Real-time Data...</p>
    </div>
  );
};

// --- MAIN ROUTER ---
export default function StudioIndex() {
  return (
    <Switch>
      <Route path="/studio/editor" component={Editor} />
      <Route path="/studio/video" component={VideoGen} />
      <Route path="/studio/voice" component={VoiceLab} />
      <Route path="/studio/analytics" component={Analytics} />
      <Route path="/studio" component={Dashboard} />
      <Route><Redirect to="/studio" /></Route>
    </Switch>
  );
}
