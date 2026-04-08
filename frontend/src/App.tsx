import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./context/AppContext";

// 1. CORE & AUTH (Diagram: SPLASH -> AUTH -> HUB)
import SplashScreen from "./pages/splash";
import MainHub from "./pages/hub";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";

// 2. SOCIAL MODULE (Diagram: SOCIAL APP)
import SocialFeed from "./pages/social/feed";
import ExplorePage from "./pages/social/explore";
import CreatePost from "./pages/social/create";
import ActivityPage from "./pages/social/activity";
import UserProfile from "./pages/social/profile";
import SearchPage from "./pages/social/search";
import CommentsPage from "./pages/social/comments";

// 3. OTHER MODULES (Diagram: STUDIO, MAGIC, CHAT, MUSIC, SHOP)
import RXStudio from "./pages/studio/index";
// Inke liye agar files nahi hain, toh main placeholder de raha hoon taaki app crash na ho
const Placeholder = ({ title }: { title: string }) => (
  <div className="h-screen bg-black flex items-center justify-center text-cyan-400 font-black italic">{title} COMING SOON</div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> 
        <Switch>
          {/* --- CORE FLOW --- */}
          <Route path="/" component={SplashScreen} />
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
          <Route path="/hub" component={MainHub} />
          
          {/* --- SOCIAL SYSTEM (All Buttons Live) --- */}
          <Route path="/social/feed" component={SocialFeed} />
          <Route path="/social/explore" component={ExplorePage} />
          <Route path="/social/search" component={SearchPage} />
          <Route path="/social/create" component={CreatePost} />
          <Route path="/social/activity" component={ActivityPage} />
          <Route path="/social/comments/:id" component={CommentsPage} />
          <Route path="/profile" component={UserProfile} />
          
          {/* --- MODULES --- */}
          <Route path="/studio" component={RXStudio} />
          <Route path="/magic"><Placeholder title="RX MAGIC AI" /></Route>
          <Route path="/chat"><Placeholder title="RX CHAT SYSTEM" /></Route>
          <Route path="/music"><Placeholder title="RX MUSIC LIBRARY" /></Route>
          <Route path="/shop"><Placeholder title="RX SHOP" /></Route>

          {/* Fallback */}
          <Route><Redirect to="/hub" /></Route>
        </Switch>
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}
