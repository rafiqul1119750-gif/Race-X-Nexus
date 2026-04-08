import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./context/AppContext";

// --- CORE ENGINE ---
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";

// --- STUDIO MODULE ---
import RXStudio from "./pages/studio/index"; 

// --- SOCIAL NEXUS MODULE (pages/social/ folder) ---
import SocialFeed from "./pages/social/feed";
import SearchPage from "./pages/social/search";
import CommentsPage from "./pages/social/comments";
import UserProfile from "./pages/social/profile";
import ExplorePage from "./pages/social/explore";
import ActivityPage from "./pages/social/activity";
import CreatePost from "./pages/social/create";

// --- MAGIC & CHAT PLACEHOLDERS ---
const Placeholder = ({ name }: { name: string }) => (
  <div className="h-screen flex flex-col items-center justify-center bg-black text-white font-black italic uppercase text-center px-10">
    <div className="w-20 h-20 border-t-2 border-cyan-400 rounded-full animate-spin mb-6" />
    {name} <br/> 
    <span className="text-cyan-400 text-[10px] mt-2 block tracking-[0.5em] animate-pulse">Initializing Node...</span>
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> 
          <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            <Switch>
              {/* 🔐 AUTHENTICATION */}
              <Route path="/" component={SplashScreen} />
              <Route path="/auth/signin" component={SignIn} />
              <Route path="/auth/signup" component={SignUp} />
              
              {/* 🚀 MAIN HUB */}
              <Route path="/hub" component={MainHub} />
              
              {/* 📱 SOCIAL ECOSYSTEM (Full Interactive) */}
              <Route path="/social/feed" component={SocialFeed} />
              <Route path="/social/explore" component={ExplorePage} />
              <Route path="/social/search" component={SearchPage} />
              <Route path="/social/activity" component={ActivityPage} />
              <Route path="/social/create" component={CreatePost} />
              <Route path="/social/comments/:id" component={CommentsPage} />
              
              {/* 👤 PROFILE & SETTINGS */}
              <Route path="/profile" component={UserProfile} /> 
              <Route path="/social/profile/:user" component={UserProfile} />

              {/* 🎨 CREATIVE STUDIO */}
              <Route path="/studio" component={RXStudio} />

              {/* ⚡ OTHER AI MODULES */}
              <Route path="/magic"><Placeholder name="Magic AI" /></Route>
              <Route path="/chat"><Placeholder name="RX Chat" /></Route>
              <Route path="/music"><Placeholder name="RX Music" /></Route>
              <Route path="/shop"><Placeholder name="RX Shop" /></Route>

              {/* 🔄 FALLBACK / ERROR HANDLING */}
              <Route><Redirect to="/hub" /></Route>
            </Switch>
            <Toaster />
          </div>
      </AppProvider>
    </QueryClientProvider>
  );
}
