import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { useAuth } from "./hooks/use-auth"; // 👈 Your new Hook

// Pages
import SplashScreen from "./pages/splash";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import MainHub from "./pages/hub";
import ExternalShop from "./pages/shop/products";
import MusicLibrary from "./pages/music/library";
import Feed from "./pages/social/feed";

function App() {
  const { user, loading } = useAuth();

  // 🌀 Loading state jab tak Appwrite check kar raha hai
  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 font-sans">
        
        <Switch>
          {/* 1. Public Routes */}
          <Route path="/" component={SplashScreen} />
          <Route path="/auth/signin">
             {user ? <Redirect to="/hub" /> : <SignIn />}
          </Route>
          <Route path="/auth/signup" component={SignUp} />

          {/* 2. Protected Routes (Only for Logged-in Users) */}
          <Route path="/hub">
            {!user ? <Redirect to="/auth/signin" /> : <MainHub />}
          </Route>
          
          <Route path="/social/feed">
            {!user ? <Redirect to="/auth/signin" /> : <Feed />}
          </Route>

          <Route path="/shop/products" component={ExternalShop} />
          <Route path="/music/library" component={MusicLibrary} />

          {/* 🚫 404 Node */}
          <Route>
            <div className="h-screen flex flex-col items-center justify-center bg-black">
              <h1 className="text-4xl font-black italic text-zinc-900 tracking-[0.5em] uppercase">404</h1>
              <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest mt-4">Node Not Found</p>
            </div>
          </Route>
        </Switch>

      </div>
    </QueryClientProvider>
  );
}

export default App;
