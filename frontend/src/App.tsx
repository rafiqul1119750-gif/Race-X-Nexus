import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";

// 📄 Strict Case Sensitive Imports
import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";
import Feed from "./pages/social/feed";
import StudioDashboard from "./pages/studio/dashboard";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white">
        <Switch>
          {/* 🟢 Splash & Auth */}
          <Route path="/" component={SplashScreen} />
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />

          {/* 🏠 Main Nexus Hub */}
          <Route path="/hub" component={MainHub} />
          
          {/* 🌐 Social Module */}
          <Route path="/social/feed" component={Feed} />
          <Route path="/social/explore" component={() => <Placeholder title="Explore" />} />
          <Route path="/social/create" component={() => <Placeholder title="Create" />} />

          {/* 🎬 Studio Module */}
          <Route path="/studio" component={StudioDashboard} />

          {/* 🤖 Magic AI Module */}
          <Route path="/magic" component={() => <Placeholder title="AI Magic" />} />

          {/* 💬 Chat Module */}
          <Route path="/chat" component={() => <Placeholder title="RX Chat" />} />

          {/* 🎵 Music & 🛒 Shop */}
          <Route path="/music" component={() => <Placeholder title="RX Music" />} />
          <Route path="/shop" component={() => <Placeholder title="RX Shop" />} />

          <Route>
            <div className="h-screen flex items-center justify-center bg-black font-black italic text-zinc-800">
              404 // NEXUS_ERROR
            </div>
          </Route>
        </Switch>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

// Choti si help ke liye jab tak saare pages nahi bante
function Placeholder({ title }: { title: string }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black p-6 text-center">
      <h1 className="text-xl font-black italic text-cyan-400 tracking-widest uppercase">{title}</h1>
      <p className="text-[10px] text-zinc-500 mt-2">MODULE INITIALIZING...</p>
      <button onClick={() => window.history.back()} className="mt-8 text-white text-[10px] underline">GO BACK</button>
    </div>
  );
}

export default App;
