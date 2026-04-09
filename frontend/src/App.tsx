import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./context/AppContext";

// 1. CORE & AUTH
import SplashScreen from "./pages/splash";
import MainHub from "./pages/hub";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";

// 2. SOCIAL MODULE (All paths synced with your folder)
import SocialFeed from "./pages/social/feed";
import ExplorePage from "./pages/social/explore";
import CreatePost from "./pages/social/create";
import ActivityPage from "./pages/social/activity";
import UserProfile from "./pages/social/profile";
import SearchPage from "./pages/social/search";
import CommentsPage from "./pages/social/comments";

// 3. OTHER MODULES
import RXStudio from "./pages/studio/index";

// --- 👑 ADMIN & API MODULES (NEW ADDED) ---
import AdminDashboard from "./pages/admin/dashboard";
import ApiManager from "./pages/admin/api-manager";

// Placeholder: Taki app crash na ho agar file abhi tak nahi bani
const Placeholder = ({ title }: { title: string }) => (
  <div className="h-screen bg-black flex flex-col items-center justify-center text-cyan-400 font-black italic p-6 text-center">
    <h1 className="text-2xl mb-2">{title}</h1>
    <p className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">System Node Online</p>
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> 
        <Switch>
          {/* --- CORE FLOW --- */}
          <Route path="/" component={SplashScreen} />
          <Route path="/hub" component={MainHub} />
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
          
          {/* --- SOCIAL SYSTEM --- */}
          <Route path="/social/feed" component={SocialFeed} />
          <Route path="/social/explore" component={ExplorePage} />
          <Route path="/social/search" component={SearchPage} />
          <Route path="/social/create" component={CreatePost} />
          <Route path="/social/activity" component={ActivityPage} />
          <Route path="/social/comments/:id" component={CommentsPage} />
          <Route path="/profile" component={UserProfile} />
          
          {/* --- AI & CREATIVE MODULES --- */}
          <Route path="/studio" component={RXStudio} />
          <Route path="/magic"><Placeholder title="RX MAGIC AI" /></Route>
          {/* Yahan aap AI Chat page import karke connect kar sakte hain */}
          <Route path="/chat"><Placeholder title="RX CHAT SYSTEM" /></Route>
          <Route path="/music"><Placeholder title="RX MUSIC LIBRARY" /></Route>
          <Route path="/shop"><Placeholder title="RX SHOP" /></Route>

          {/* --- 🔥 ADMIN COMMAND CENTER ROUTES (NEW ADDED) --- */}
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/api" component={ApiManager} />

          {/* Fallback: Agar kuch galat ho toh hamesha Hub par bheje */}
          <Route><Redirect to="/hub" /></Route>
        </Switch>
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}
