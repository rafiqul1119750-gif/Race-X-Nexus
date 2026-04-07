import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";

// --- CORE PAGES ---
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";
import Feed from "./pages/social/feed";

// --- MODULES (Ensure these files exist) ---
import StudioDashboard from "./pages/studio/dashboard";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
        <Switch>
          {/* 🟢 Splash Screen */}
          <Route path="/" component={SplashScreen} />

          {/* 🔐 Auth System */}
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />

          {/* 🏠 Main Nexus Hub */}
          <Route path="/hub" component={MainHub} />
          
          {/* 🌐 Social App Module */}
          <Route path="/social/feed" component={Feed} />

          {/* 🎬 Studio Module */}
          <Route path="/studio" component={StudioDashboard} />

          {/* ⚡ DYNAMIC ROUTE HANDLER (No More Build Failures) */}
          <Route path="/:module/:page?">
            {(params) => (
              <div className="h-screen flex flex-col items-center justify-center bg-black p-8 text-center">
                <div className="w-16 h-16 border-t-2 border-cyan-500 rounded-full animate-spin mb-6" />
                <h1 className="text-xl font-black italic text-white tracking-[0.3em] uppercase">
                  {params.module} {params.page || ""}
                </h1>
                <p className="text-[10px] text-zinc-500 mt-4 tracking-[0.2em] leading-relaxed">
                  PROTOCOL: INITIALIZING_INTERFACE... <br />
                  NODE: RX_NEXUS_V1
                </p>
                <button 
                  onClick={() => window.location.href = '/hub'}
                  className="mt-12 text-cyan-400 text-[10px] font-black border border-cyan-500/20 px-6 py-3 rounded-full uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all"
                >
                  Return to Hub
                </button>
              </div>
            )}
          </Route>

          {/* Default 404 */}
          <Route>
            <Redirect to="/hub" />
          </Route>
        </Switch>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
