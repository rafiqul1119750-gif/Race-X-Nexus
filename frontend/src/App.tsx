import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./context/AppContext";

// --- 💎 ECONOMY CONFIG ---
import { ECONOMY_RULES } from "./lib/economy"; 

// 1. CORE & AUTH
import SplashScreen from "./pages/splash";
import MainHub from "./pages/hub/index";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";

// 2. SOCIAL MODULE
import SocialIndex from "./pages/social/index";
import SocialFeed from "./pages/social/feed";
import ExplorePage from "./pages/social/explore";
import CreatePost from "./pages/social/create";
import ActivityPage from "./pages/social/activity";
import UserProfile from "./pages/social/profile";
import SearchPage from "./pages/social/search";
import CommentsPage from "./pages/social/comments";

// 3. MUSIC & SHOP
import MusicIndex from "./pages/music/index";
import ShopIndex from "./pages/shop/index";

// 4. STUDIO & CREATIVE
import RXStudio from "./pages/studio/index";
import VoiceLab from "./pages/studio/voice-lab"; // ✅ Added under Studio
import CinemaAI from "./pages/studio/video-gen"; // ✅ Added under Studio

// --- 👑 ADMIN & API ---
import AdminDashboard from "./pages/dashboard"; 
import ApiManager from "./pages/admin/api-manager";

// --- 🌌 MAGIC ---
import MagicMain from "./pages/magic/index";
import NeuralChat from "./pages/magic/ai-chat";
import ImageGen from "./pages/magic/image-gen";

export default function App() {
  console.log(`🛡️ Nexus Protocol: ${ECONOMY_RULES.CURRENCY_NAME} System Active`);

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
          <Route path="/social" component={SocialIndex} />
          <Route path="/social/feed" component={SocialFeed} />
          <Route path="/social/explore" component={ExplorePage} />
          <Route path="/social/search" component={SearchPage} />
          <Route path="/social/create" component={CreatePost} />
          <Route path="/social/activity" component={ActivityPage} />
          <Route path="/social/comments/:id" component={CommentsPage} />
          <Route path="/profile" component={UserProfile} />
          
          {/* --- AI & CREATIVE MODULES --- */}
          <Route path="/studio" component={RXStudio} />
          <Route path="/studio/voice-lab" component={VoiceLab} /> {/* ✅ Full Function Route */}
          <Route path="/magic/video-gen" component={CinemaAI} />  {/* ✅ Full Function Route */}
          
          <Route path="/magic" component={MagicMain} />
          <Route path="/magic/ai-chat" component={NeuralChat} />
          <Route path="/magic/image-gen" component={ImageGen} />
          
          {/* --- NEW MODULES --- */}
          <Route path="/music" component={MusicIndex} />
          <Route path="/shop" component={ShopIndex} />

          {/* --- 🔥 ADMIN ROUTES --- */}
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/api" component={ApiManager} />

          {/* Fallback to Hub */}
          <Route><Redirect to="/hub" /></Route>
        </Switch>
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}
