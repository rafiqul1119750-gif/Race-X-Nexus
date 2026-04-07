import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";

// --- CORE & AUTH ---
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";

// --- MODULES (Diagram Based) ---
import Feed from "./pages/social/feed";
import StudioDashboard from "./pages/studio/dashboard";
import MagicAI from "./pages/magic/main";
import ChatList from "./pages/chat/list";
import MusicPlayer from "./pages/music/main";
import ShopMain from "./pages/shop/main";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
        <Switch>
          {/* 🟢 Splash & Auth System */}
          <Route path="/" component={SplashScreen} />
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />

          {/* 🏠 Main Nexus Hub (Core Entry) */}
          <Route path="/hub" component={MainHub} />
          
          {/* 🌐 Social App (Reels/Feed) */}
          <Route path="/social/feed" component={Feed} />

          {/* 🎬 RX Studio (Creator Tools) */}
          <Route path="/studio" component={StudioDashboard} />

          {/* 🤖 RX Magic (AI Tools) */}
          <Route path="/magic" component={MagicAI} />

          {/* 💬 RX Chat (Messaging) */}
          <Route path="/chat" component={ChatList} />

          {/* 🎵 RX Music (Audio System) */}
          <Route path="/music" component={MusicPlayer} />

          {/* 🛒 RX Shop (Commerce) */}
          <Route path="/shop" component={ShopMain} />

          {/* 🔄 Global Redirect to Hub */}
          <Route>
            <Redirect to="/hub" />
          </Route>
        </Switch>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
