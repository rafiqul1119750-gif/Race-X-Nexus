import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";

// DHAYAN SE: Folder 'context' hai aur file 'AppContext' hai
import { AppProvider } from "./context/AppContext"; 

import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";
import Feed from "./pages/social/feed";

const Placeholder = ({ name }: { name: string }) => (
  <div className="h-screen flex items-center justify-center bg-black text-white font-black italic uppercase tracking-[0.3em]">
    {name} _ NODE _ ACTIVE
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
              <Route path="/social/feed" component={Feed} />
              
              <Route path="/studio"><Placeholder name="Studio" /></Route>
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
