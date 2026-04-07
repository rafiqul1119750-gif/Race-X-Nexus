import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// --- 🟢 ENTRY & AUTH NODES (As per Diagram) ---
import SplashScreen from "@/pages/splash";
import SignIn from "@/pages/auth/signin";
import SignUp from "@/pages/auth/signup";
import TermsConditions from "@/pages/auth/terms";

// --- 🏠 CORE HUB NODE ---
import RXMainHub from "@/pages/hub";

// --- 🌐 SOCIAL APP NODES ---
import SocialFeed from "@/pages/social/feed";
// Note: Future mein explore, create, profile yahan add honge

// --- 🤖 MODULE PLACEHOLDERS (To prevent crashes) ---
const Placeholder = ({ name }: { name: string }) => (
  <div className="h-screen bg-black flex items-center justify-center text-zinc-500 uppercase tracking-widest font-black italic">
    {name} Coming Soon
  </div>
);

function Router() {
  return (
    <Switch>
      {/* 1. Entry Point */}
      <Route path="/" component={SplashScreen} />

      {/* 2. Auth System Group */}
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/auth/signup" component={SignUp} />
      <Route path="/auth/terms" component={TermsConditions} />

      {/* 3. Main Hub (The Control Center) */}
      <Route path="/hub" component={RXMainHub} />

      {/* 4. Social App Group */}
      <Route path="/social" component={SocialFeed} />
      <Route path="/social/explore" component={() => <Placeholder name="RX Explore" />} />
      <Route path="/social/create" component={() => <Placeholder name="RX Studio Create" />} />
      
      {/* 5. Other Modules from Diagram */}
      <Route path="/magic" component={() => <Placeholder name="RX Magic AI" />} />
      <Route path="/chat" component={() => <Placeholder name="RX Chat" />} />
      <Route path="/music" component={() => <Placeholder name="RX Music" />} />
      <Route path="/shop" component={() => <Placeholder name="RX Shop" />} />

      {/* 6. Admin Panel (Hidden Node) */}
      <Route path="/admin-rx-portal" component={() => <Placeholder name="Admin Control" />} />

      {/* 404 Fallback */}
      <Route>
        <div className="h-screen bg-black flex items-center justify-center text-red-500 font-bold uppercase tracking-tighter">
          404 | Nexus Connection Lost
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Global Wrapper for Cinematic Aesthetic */}
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
        <Router />
        {/* Real-time Notifications for Likes/Ads/Gifts */}
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
