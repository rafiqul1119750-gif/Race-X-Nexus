import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { useAuth } from "./hooks/use-auth";

// 📄 Race-X New Folder Structure Imports
import SplashScreen from "./pages/splash";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import MainHub from "./pages/hub";
import Feed from "./pages/social/feed";
import StudioEditor from "./pages/studio/editor";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white">
        <Switch>
          {/* Public Route */}
          <Route path="/" component={SplashScreen} />
          
          {/* Auth Routes inside 📁auth/ folder */}
          <Route path="/auth/signin">
            {user ? <Redirect to="/hub" /> : <SignIn />}
          </Route>
          <Route path="/auth/signup">
            {user ? <Redirect to="/hub" /> : <SignUp />}
          </Route>

          {/* Protected Routes */}
          <Route path="/hub">
            {!user ? <Redirect to="/auth/signin" /> : <MainHub />}
          </Route>
          
          {/* Social Feed inside 📁social/ folder */}
          <Route path="/social/feed">
            {!user ? <Redirect to="/auth/signin" /> : <Feed />}
          </Route>

          {/* Studio inside 📁studio/ folder */}
          <Route path="/studio/editor">
            {!user ? <Redirect to="/auth/signin" /> : <StudioEditor />}
          </Route>

          {/* Fallback 404 */}
          <Route>
            <div className="h-screen flex items-center justify-center bg-black">
              <p className="text-zinc-700 font-black italic tracking-tighter uppercase">Nexus 404</p>
            </div>
          </Route>
        </Switch>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
