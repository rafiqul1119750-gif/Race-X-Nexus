import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./context/ThemeContext";

// AUTH & HUB
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";

// MODULES (Create these files as shown below)
import SocialFeed from "./pages/social/feed";
import StudioDashboard from "./pages/studio/dashboard";
import MagicAI from "./pages/magic/main";
import ChatList from "./pages/chat/list";
import MusicPlayer from "./pages/music/main";
import ShopMain from "./pages/shop/main";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="rx-theme">
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Switch>
            <Route path="/" component={SplashScreen} />
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />
            
            {/* CORE ENTRY */}
            <Route path="/hub" component={MainHub} />
            
            {/* FEATURE PAGES */}
            <Route path="/social/feed" component={SocialFeed} />
            <Route path="/studio" component={StudioDashboard} />
            <Route path="/magic" component={MagicAI} />
            <Route path="/chat" component={ChatList} />
            <Route path="/music" component={MusicPlayer} />
            <Route path="/shop" component={ShopMain} />

            <Route><Redirect to="/hub" /></Route>
          </Switch>
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
