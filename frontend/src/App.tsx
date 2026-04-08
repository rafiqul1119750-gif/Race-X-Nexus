import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./context/AppContext";

// ALL PAGES
import SplashScreen from "./pages/splash";
import MainHub from "./pages/hub";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import SocialFeed from "./pages/social/feed";
import ExplorePage from "./pages/social/explore";
import CreatePost from "./pages/social/create";
import ActivityPage from "./pages/social/activity";
import UserProfile from "./pages/social/profile";
import SearchPage from "./pages/social/search";
import CommentsPage from "./pages/social/comments";
import RXStudio from "./pages/studio/index";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> 
        <Switch>
          {/* 1. Splash Screen Pehle */}
          <Route path="/" component={SplashScreen} />
          
          {/* 2. CORE ENTRY: Main Hub (Splash ke baad yahan aayega user) */}
          <Route path="/hub" component={MainHub} />
          
          {/* 3. Auth System */}
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
          
          {/* 4. Social Ecosystem */}
          <Route path="/social/feed" component={SocialFeed} />
          <Route path="/social/explore" component={ExplorePage} />
          <Route path="/social/create" component={CreatePost} />
          <Route path="/social/activity" component={ActivityPage} />
          <Route path="/social/comments/:id" component={CommentsPage} />
          <Route path="/social/search" component={SearchPage} />
          
          {/* 5. Profile & Studio */}
          <Route path="/profile" component={UserProfile} />
          <Route path="/studio" component={RXStudio} />
          
          {/* Default Path: Hamesha Hub par bhejega */}
          <Route><Redirect to="/hub" /></Route>
        </Switch>
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}
