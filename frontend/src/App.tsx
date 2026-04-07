import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// Core Pages
import SplashScreen from "@/pages/splash";
import RXMainHub from "@/pages/hub";
import TermsConditions from "@/pages/auth/terms";
import SignIn from "@/pages/auth/signin";
import SignUp from "@/pages/auth/signup";

// Module Pages
import SocialFeed from "@/pages/social/feed";
import StudioDashboard from "@/pages/studio/dashboard";
import MagicAI from "@/pages/magic/ai-tools";
import ChatList from "@/pages/chat/list";
import MusicSystem from "@/pages/music/player";
import ShopCommerce from "@/pages/shop/products";
import WalletPage from "@/pages/profile/wallet";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SplashScreen} />
      
      {/* Auth Group */}
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/auth/signup" component={SignUp} />
      <Route path="/terms" component={TermsConditions} />
      
      {/* Main Entry */}
      <Route path="/hub" component={RXMainHub} />
      
      {/* Feature Modules */}
      <Route path="/social" component={SocialFeed} />
      <Route path="/studio" component={StudioDashboard} />
      <Route path="/magic" component={MagicAI} />
      <Route path="/chat" component={ChatList} />
      <Route path="/music" component={MusicPlayer} />
      <Route path="/shop" component={ShopCommerce} />
      <Route path="/wallet" component={WalletPage} />
      
      <Route path="/:rest*" component={() => <div className="text-white">404 - Race-X Portal Not Found</div>} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
