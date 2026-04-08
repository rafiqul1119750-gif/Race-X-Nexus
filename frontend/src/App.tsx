import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./context/AppContext";

// ALL PAGES
import SplashScreen from "./pages/splash";
import MainHub from "./pages/hub";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import SocialFeed from "./pages/social/feed";
import ExplorePage from "./pages/social/explore";
import CreatePost from "./pages/social/create";
import ActivityPage from "./pages/social/activity";
import UserProfile from "./pages/social/profile";
import SearchPage from "./pages/social/search";
import CommentsPage from "./pages/social/comments";
import RXStudio from "./pages/studio/index";

// NEW DEDICATED PAGES (No Dead Links)
const Page = ({ name }: { name: string }) => (
  <div className="h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
    <h1 className="text-2xl font-black italic text-cyan-400 mb-4">{name}</h1>
    <p className="text-[10px] tracking-widest text-zinc-500 uppercase">Nexus Node Active</p>
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> 
        <Switch>
          <Route path="/" component={SplashScreen} />
          <Route path="/hub" component={MainHub} />
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
          <Route path="/social/feed" component={SocialFeed} />
          <Route path="/social/explore" component={ExplorePage} />
          <Route path="/social/create" component={CreatePost} />
          <Route path="/social/activity" component={ActivityPage} />
          <Route path="/social/comments/:id" component={CommentsPage} />
          <Route path="/social/search" component={SearchPage} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/studio" component={RXStudio} />
          
          {/* Dedicated Routes for Story & Stats */}
          <Route path="/social/story/:id"><Page name="STORY VIEWER" /></Route>
          <Route path="/social/followers"><Page name="FOLLOWERS LIST" /></Route>
          <Route path="/social/following"><Page name="FOLLOWING LIST" /></Route>
          
          <Route><Redirect to="/hub" /></Route>
        </Switch>
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}
