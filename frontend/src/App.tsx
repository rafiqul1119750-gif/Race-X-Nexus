import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./context/AppContext";

// CORE PAGES
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";

// STUDIO PAGES (As per your screenshot: pages/studio/)
import RXStudio from "./pages/studio/index"; 

// SOCIAL PAGES (As per your screenshot: pages/social/)
import SocialFeed from "./pages/social/feed";
import SearchPage from "./pages/social/search";
import CommentsPage from "./pages/social/comments";
import UserProfile from "./pages/social/profile";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> 
          <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            <Switch>
              {/* AUTH & CORE */}
              <Route path="/" component={SplashScreen} />
              <Route path="/auth/signin" component={SignIn} />
              <Route path="/auth/signup" component={SignUp} />
              <Route path="/hub" component={MainHub} />
              
              {/* SOCIAL ENGINE */}
              <Route path="/social/feed" component={SocialFeed} />
              <Route path="/social/search" component={SearchPage} />
              <Route path="/social/comments/:id" component={CommentsPage} />
              <Route path="/profile" component={UserProfile} /> 
              <Route path="/social/profile/:user" component={UserProfile} />

              {/* STUDIO */}
              <Route path="/studio" component={RXStudio} />

              {/* FALLBACK */}
              <Route><Redirect to="/hub" /></Route>
            </Switch>
            <Toaster />
          </div>
      </AppProvider>
    </QueryClientProvider>
  );
}
