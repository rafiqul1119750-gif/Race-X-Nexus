import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster"; // Shadcn Toast for alerts
import { useAuth } from "./hooks/use-auth";

// 📄 Pages Import
import SplashScreen from "./pages/splash";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import MainHub from "./pages/hub";
import Feed from "./pages/social/feed";
import StudioEditor from "./pages/studio/editor";
import MusicLibrary from "./pages/music/library";
import ExternalShop from "./pages/shop/products";

function App() {
  const { user, loading } = useAuth();

  // 🌀 Initial Loading State (Appwrite Session Check)
  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 font-sans">
        
        <Switch>
          {/* --- 🔓 PUBLIC ROUTES --- */}
          <Route path="/" component={SplashScreen} />
          
          <Route path="/auth/signin">
            {user ? <Redirect to="/hub" /> : <SignIn />}
          </Route>
          
          <Route path="/auth/signup">
            {user ? <Redirect to="/hub" /> : <SignUp />}
          </Route>

          {/* --- 🔐 PROTECTED ROUTES (Login Required) --- */}
          <Route path="/hub">
            {!user ? <Redirect to="/auth/signin" /> : <MainHub />}
          </Route>

          <Route path="/social/feed">
            {!user ? <Redirect to="/auth/signin" /> : <Feed />}
          </Route>

          <Route path="/studio/editor">
            {!user ? <Redirect to="/auth/signin" /> : <StudioEditor />}
          </Route>

          {/* --- 🛒 OTHER NODES --- */}
          <Route path="/music/library" component={MusicLibrary} />
          <Route path="/shop/products" component={ExternalShop} />

          {/* --- 🚫 404 PAGE --- */}
          <Route>
            <div className="h-screen flex flex-col items-center justify-center bg-black">
              <h1 className="text-6xl font-black italic text-zinc-900 tracking-tighter">404</h1>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.5em] mt-4">Node Not Found</p>
              <button 
                onClick={() => window.location.href = '/hub'}
                className="mt-8 px-6 py-2 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Return to Nexus
              </button>
            </div>
          </Route>
        </Switch>

        {/* 🔔 Global Toast Notifications */}
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
