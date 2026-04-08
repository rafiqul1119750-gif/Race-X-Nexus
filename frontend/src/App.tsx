import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./context/AppContext";

// PAGES IMPORT
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";
import SocialFeed from "./pages/social/feed";
import RXStudio from "./pages/studio/index";
import Profile from "./pages/profile";

// DEDICATED SOCIAL PAGES (Placeholders for now)
const Placeholder = ({ name }: { name: string }) => (
  <div className="h-screen flex items-center justify-center bg-black text-white font-black italic uppercase tracking-widest text-center px-10">
    {name} <br/> <span className="text-cyan-400 text-[10px] mt-2 block tracking-[0.5em]">Node _ Active</span>
  </div>
);

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
              
              {/* MAIN HUB */}
              <Route path="/hub" component={MainHub} />
              
              {/* SOCIAL ENGINE & DEDICATED PAGES */}
              <Route path="/social/feed" component={SocialFeed} />
              <Route path="/social/search"><Placeholder name="Explore Nexus" /></Route>
              <Route path="/social/comments/:id"><Placeholder name="Nexus Comments" /></Route>
              <Route path="/social/profile/:user"><Placeholder name="User Profile" /></Route>
              
              {/* CREATIVE STUDIO */}
              <Route path="/studio" component={RXStudio} />

              {/* USER SETTINGS */}
              <Route path="/profile" component={Profile} />
              
              {/* OTHER MODULES */}
              <Route path="/magic"><Placeholder name="Magic AI" /></Route>
              <Route path="/chat"><Placeholder name="RX Chat" /></Route>
              <Route path="/music"><Placeholder name="RX Music" /></Route>
              <Route path="/shop"><Placeholder name="RX Shop" /></Route>

              {/* FALLBACK */}
              <Route><Redirect to="/hub" /></Route>
            </Switch>
            <Toaster />
          </div>
      </AppProvider>
    </QueryClientProvider>
  );
}
