import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./context/AppContext";

// PAGES IMPORT (Sahi Folder Paths)
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";
import RXStudio from "./pages/studio/index"; // Studio folder ke andar index.tsx

// SOCIAL PAGES (Jo 'social' folder ke andar hain)
import SocialFeed from "./pages/social/feed";
import SearchPage from "./pages/social/search";
import CommentsPage from "./pages/social/comments";
import UserProfile from "./pages/social/profile"; // Ye wala import theek kiya hai

// Placeholder for missing components
const Placeholder = ({ name }: { name: string }) => (
  <div className="h-screen flex items-center justify-center bg-black text-white font-black italic uppercase text-center px-10">
    {name} <br/> <span className="text-cyan-400 text-[10px] mt-2 block tracking-[0.5em]">System _ Online</span>
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> 
          <div className="min-h-screen bg-black text-white">
            <Switch>
              <Route path="/" component={SplashScreen} />
              <Route path="/auth/signin" component={SignIn} />
              <Route path="/auth/signup" component={SignUp} />
              <Route path="/hub" component={MainHub} />
              
              {/* SOCIAL ROUTES */}
              <Route path="/social/feed" component={SocialFeed} />
              <Route path="/social/search" component={SearchPage} />
              <Route path="/social/comments/:id" component={CommentsPage} />
              <Route path="/profile" component={UserProfile} /> {/* Main profile path */}
              <Route path="/social/profile/:user" component={UserProfile} />

              {/* STUDIO ROUTE */}
              <Route path="/studio" component={RXStudio} />

              {/* OTHERS */}
              <Route path="/magic"><Placeholder name="Magic AI" /></Route>
              <Route path="/chat"><Placeholder name="RX Chat" /></Route>
              <Route path="/music"><Placeholder name="RX Music" /></Route>
              <Route path="/shop"><Placeholder name="RX Shop" /></Route>

              <Route><Redirect to="/hub" /></Route>
            </Switch>
            <Toaster />
          </div>
      </AppProvider>
    </QueryClientProvider>
  );
}
