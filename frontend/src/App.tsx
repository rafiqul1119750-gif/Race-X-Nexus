import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { useAuth } from "./hooks/use-auth";

// 📄 Strict Case Sensitive Imports
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin"; // 'Auth' with Capital A
import SignUp from "./pages/Auth/signup";
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
          <Route path="/" component={SplashScreen} />
          
          <Route path="/auth/signin">
            {user ? <Redirect to="/hub" /> : <SignIn />}
          </Route>
          <Route path="/auth/signup">
            {user ? <Redirect to="/hub" /> : <SignUp />}
          </Route>

          <Route path="/hub">
            {!user ? <Redirect to="/auth/signin" /> : <MainHub />}
          </Route>
          
          <Route path="/social/feed">
            {!user ? <Redirect to="/auth/signin" /> : <Feed />}
          </Route>

          <Route path="/studio/editor">
            {!user ? <Redirect to="/auth/signin" /> : <StudioEditor />}
          </Route>

          <Route>
            <div className="h-screen flex items-center justify-center bg-black font-black italic text-zinc-800">
              404 // NEXUS_ERROR
            </div>
          </Route>
        </Switch>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
