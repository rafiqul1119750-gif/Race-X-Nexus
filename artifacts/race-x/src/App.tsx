import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { SplashScreen } from "@/components/common/SplashScreen";

// Pages
import Home from "@/pages/home";
import Studio from "@/pages/studio";
import StudioEditor from "@/pages/studio-editor";
import Social from "@/pages/social";
import Chat from "@/pages/chat";
import Music from "@/pages/music";
import Shop from "@/pages/shop";
import Events from "@/pages/events";
import Leaderboard from "@/pages/leaderboard";
import Admin from "@/pages/admin";
import Profile from "@/pages/profile";
import CreatorPortal from "@/pages/portal-creator";
import UserPortal from "@/pages/portal-user";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/studio" component={Studio} />
        <Route path="/studio/editor" component={StudioEditor} />
        <Route path="/social" component={Social} />
        <Route path="/chat" component={Chat} />
        <Route path="/music" component={Music} />
        <Route path="/shop" component={Shop} />
        <Route path="/events" component={Events} />
        <Route path="/leaderboard" component={Leaderboard} />
        {/* Admin route — God Mode guard is enforced inside Admin component */}
        <Route path="/admin" component={Admin} />
        <Route path="/profile" component={Profile} />
        {/* Dual Portal System */}
        <Route path="/portal/creator" component={CreatorPortal} />
        <Route path="/portal/user" component={UserPortal} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function MainAppContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return showSplash ? (
    <SplashScreen onComplete={() => setShowSplash(false)} />
  ) : (
    <MainAppContainer />
  );
}

export default App;
