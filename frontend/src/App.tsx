Appcontexttexttext Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";

// SIRF YE WALA CONTEXT USE HOGA (Diamonds + Theme dono isi mein hain)
import { AppProvider } from "./connect/AppContext";

// CORE PAGES
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";
import Feed from "./pages/social/feed";

// DIAGRAM MODULES (Internal components taaki build fail na ho)
const Studio = () => <div className="h-screen flex items-center justify-center bg-black text-cyan-400 font-black tracking-widest uppercase">Studio Node Active</div>;
const Magic = () => <div className="h-screen flex items-center justify-center bg-black text-amber-500 font-black tracking-widest uppercase">Magic AI Active</div>;
const Chat = () => <div className="h-screen flex items-center justify-center bg-black text-green-500 font-black tracking-widest uppercase">Chat System Active</div>;
const Music = () => <div className="h-screen flex items-center justify-center bg-black text-red-500 font-black tracking-widest uppercase">Music Engine Active</div>;
const Shop = () => <div className="h-screen flex items-center justify-center bg-black text-pink-500 font-black tracking-widest uppercase">Shop Node Active</div>;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> 
          <div className="min-h-screen transition-colors duration-300 font-sans">
            <Switch>
              <Route path="/" component={SplashScreen} />
              <Route path="/auth/signin" component={SignIn} />
              <Route path="/auth/signup" component={SignUp} />
              <Route path="/hub" component={MainHub} />
              <Route path="/social/feed" component={Feed} />
              
              {/* Modules as per your strict diagram */}
              <Route path="/studio" component={Studio} />
              <Route path="/magic" component={Magic} />
              <Route path="/chat" component={Chat} />
              <Route path="/music" component={Music} />
              <Route path="/shop" component={Shop} />

              <Route><Redirect to="/hub" /></Route>
            </Switch>
            <Toaster />
          </div>
      </AppProvider>
    </QueryClientProvider>
  );
}
