import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// 🟢 Following Your Diagram Nodes (Pages)
import SplashScreen from "./pages/splash";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Terms from "./pages/auth/terms";
import MainHub from "./pages/hub";

// 🌐 Social Module
import Feed from "./pages/social/feed";
import Profile from "./pages/social/profile";

// 🎬 Studio Module
import RaceXEditor from "./pages/studio/editor";
import StudioAnalytics from "./pages/studio/analytics";

// 🛒 Shop & Music
import ExternalShop from "./pages/shop/products";
import MusicLibrary from "./pages/music/library";

function App() {
  return (
    // 🚀 Injecting the Realtime Engine from src/lib
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 font-sans">
        
        <Switch>
          {/* 1. 🟢 SPLASH SCREEN (Entry Point) */}
          <Route path="/" component={SplashScreen} />

          {/* 2. 🔐 AUTH SYSTEM */}
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
          <Route path="/auth/terms" component={Terms} />

          {/* 3. 🏠 RX MAIN HUB (Core Hub) */}
          <Route path="/hub" component={MainHub} />

          {/* 4. 🌐 SOCIAL APP */}
          <Route path="/social/feed" component={Feed} />
          <Route path="/social/profile" component={Profile} />

          {/* 5. 🎬 STUDIO */}
          <Route path="/studio/editor" component={RaceXEditor} />
          <Route path="/studio/analytics" component={StudioAnalytics} />

          {/* 6. 🛒 SHOP (External Redirect) */}
          <Route path="/shop/products" component={ExternalShop} />

          {/* 7. 🎵 MUSIC */}
          <Route path="/music/library" component={MusicLibrary} />

          {/* 🚫 404 Node: Lost in Nexus */}
          <Route>
            <div className="h-screen flex flex-col items-center justify-center bg-black">
              <h1 className="text-4xl font-black italic text-zinc-900 tracking-[0.5em] uppercase">404</h1>
              <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest mt-4">Node Not Found in Race-X</p>
            </div>
          </Route>
        </Switch>

      </div>
    </QueryClientProvider>
  );
}

export default App;
