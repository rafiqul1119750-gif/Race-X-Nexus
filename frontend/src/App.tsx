import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";

// CONTEXTS
import { AppProvider } from "./connect/Appcontext"; // Aapka Diamonds wala context
import { ThemeProvider } from "./context/ThemeContext"; // Naya Dark/Light mode context

// CORE PAGES
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";
import Feed from "./pages/social/feed";

// DIAGRAM MODULES (Internal components)
const Studio = () => <div className="p-10 text-cyan-400 font-black tracking-widest">STUDIO_NODE_ACTIVE</div>;
const Magic = () => <div className="p-10 text-amber-500 font-black tracking-widest">MAGIC_AI_ACTIVE</div>;
const Chat = () => <div className="p-10 text-green-500 font-black tracking-widest">CHAT_SYSTEM_ACTIVE</div>;
const Music = () => <div className="p-10 text-red-500 font-black tracking-widest">MUSIC_ENGINE_ACTIVE</div>;
const Shop = () => <div className="p-10 text-pink-500 font-black tracking-widest">COMMERCE_SHOP_ACTIVE</div>;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> 
        <ThemeProvider defaultTheme="dark" storageKey="rx-theme">
          <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
            <Switch>
              <Route path="/" component={SplashScreen} />
              <Route path="/auth/signin" component={SignIn} />
              <Route path="/auth/signup" component={SignUp} />
              <Route path="/hub" component={MainHub} />
              <Route path="/social/feed" component={Feed} />
              
              {/* Har icon click hone par ye khulenge */}
              <Route path="/studio" component={Studio} />
              <Route path="/magic" component={Magic} />
              <Route path="/chat" component={Chat} />
              <Route path="/music" component={Music} />
              <Route path="/shop" component={Shop} />

              <Route><Redirect to="/hub" /></Route>
            </Switch>
            <Toaster />
          </div>
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}
