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

// 2. SOCIAL MODULE
import SocialFeed from "./pages/social/feed";
import ExplorePage from "./pages/social/explore";
import CreatePost from "./pages/social/create";
import ActivityPage from "./pages/social/activity";
import UserProfile from "./pages/social/profile";
import SearchPage from "./pages/social/search";
import CommentsPage from "./pages/social/comments";

// 3. AI & CREATIVE MODULES (Ab real components connect ho rahe hain)
import RXStudio from "./pages/studio/index";
import MagicMain from "./pages/magic/main";
import NeuralChat from "./pages/magic/ai-chat";
import ImageGen from "./pages/magic/image-gen";

// 4. OTHER MODULES
import ShopMain from "./pages/shop/main";

// 5. 👑 ADMIN COMMAND CENTER
import AdminDashboard from "./pages/admin/dashboard";
import ApiManager from "./pages/admin/api-manager";

// Placeholder sirf Music ke liye rakha hai jab tak library ready nahi hoti
const Placeholder = ({ title }: { title: string }) => (
  <div className="h-screen bg-black flex flex-col items-center justify-center text-cyan-400 font-black italic p-6 text-center">
    <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-6" />
    <h1 className="text-2xl mb-2 uppercase tracking-tighter">{title}</h1>
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
          
          {/* --- AI & CREATIVE ECOSYSTEM --- */}
          <Route path="/studio" component={RXStudio} />
          <Route path="/magic" component={MagicMain} />
          <Route path="/magic/ai-chat" component={NeuralChat} />
          <Route path="/magic/image-gen" component={ImageGen} />
          
          {/* --- OTHER SERVICES --- */}
          <Route path="/music"><Placeholder title="RX MUSIC LIBRARY" /></Route>
          <Route path="/shop" component={ShopMain} />

          {/* --- 👑 ADMIN & ENGINE INJECTION --- */}
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/api" component={ApiManager} />

          {/* Fallback: Redirect to Hub */}
          <Route><Redirect to="/hub" /></Route>
        </Switch>
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}
