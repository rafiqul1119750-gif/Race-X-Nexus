import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";

// PAGES
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";
import Feed from "./pages/social/feed";
import StudioDashboard from "./pages/studio/dashboard";

export default function App() {
  // Temporary: Inhein true rakhein taaki login ke baad Hub dikhe
  const loading = false;
  const user = true; 

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
        <Switch>
          <Route path="/" component={SplashScreen} />
          
          {/* Auth Routes */}
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />

          {/* Core App Routes */}
          <Route path="/hub" component={MainHub} />
          <Route path="/social/feed" component={Feed} />
          <Route path="/studio" component={StudioDashboard} />

          {/* Module Redirects (For missing pages) */}
          <Route path="/:module/:page?">
            {(params) => (
              <div className="h-screen flex flex-col items-center justify-center bg-black p-10 text-center">
                <div className="w-12 h-12 border-t-2 border-cyan-500 rounded-full animate-spin mb-6" />
                <h1 className="text-xl font-black italic tracking-widest uppercase text-white">
                  {params.module} INITIALIZING...
                </h1>
                <button 
                  onClick={() => window.location.href = '/hub'}
                  className="mt-8 text-cyan-400 text-[10px] border border-cyan-500/20 px-6 py-2 rounded-full uppercase"
                >
                  Back to Hub
                </button>
              </div>
            )}
          </Route>

          <Route><Redirect to="/hub" /></Route>
        </Switch>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
