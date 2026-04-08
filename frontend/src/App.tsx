import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./context/AppContext";

// --- CORE SCREENS (Preserved) ---
import SplashScreen from "./pages/splash";
import MainHub from "./pages/hub";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";

// --- SOCIAL MODULES (Connecting Dead Icons) ---
import SocialFeed from "./pages/social/feed";
import SearchPage from "./pages/social/search";
import CommentsPage from "./pages/social/comments";
import UserProfile from "./pages/social/profile";
import ExplorePage from "./pages/social/explore";
import ActivityPage from "./pages/social/activity";
import CreatePost from "./pages/social/create";

// --- STUDIO ---
import RXStudio from "./pages/studio/index";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> 
        <div className="min-h-screen bg-black text-white">
          <Switch>
            {/* 1. Splash Screen Pehle Ayegi */}
            <Route path="/" component={SplashScreen} />
            
            {/* 2. Auth & Main Hub */}
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />
            <Route path="/hub" component={MainHub} />
            
            {/* 3. Social Engine (Ab Saare Dead Icons Live Honge) */}
            <Route path="/social/feed" component={SocialFeed} />
            <Route path="/social/explore" component={ExplorePage} />
            <Route path="/social/search" component={SearchPage} />
            <Route path="/social/activity" component={ActivityPage} />
            <Route path="/social/create" component={CreatePost} />
            <Route path="/social/comments/:id" component={CommentsPage} />
            <Route path="/profile" component={UserProfile} /> 
            
            {/* 4. Studio Module */}
            <Route path="/studio" component={RXStudio} />

            {/* Default Redirect */}
            <Route><Redirect to="/hub" /></Route>
          </Switch>
          <Toaster />
        </div>
      </AppProvider>
    </QueryClientProvider>
  );
}
