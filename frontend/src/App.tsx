import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./context/AppContext";

import SplashScreen from "./pages/splash";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import MainHub from "./pages/hub";
import RXStudio from "./pages/studio/index"; 

import SocialFeed from "./pages/social/feed";
import SearchPage from "./pages/social/search";
import CommentsPage from "./pages/social/comments";
import UserProfile from "./pages/social/profile";
import ExplorePage from "./pages/social/explore";
import ActivityPage from "./pages/social/activity";
import CreatePost from "./pages/social/create";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> 
        <Switch>
          <Route path="/" component={SplashScreen} />
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
          <Route path="/hub" component={MainHub} />
          <Route path="/social/feed" component={SocialFeed} />
          <Route path="/social/explore" component={ExplorePage} />
          <Route path="/social/search" component={SearchPage} />
          <Route path="/social/activity" component={ActivityPage} />
          <Route path="/social/create" component={CreatePost} />
          <Route path="/social/comments/:id" component={CommentsPage} />
          <Route path="/profile" component={UserProfile} /> 
          <Route path="/studio" component={RXStudio} />
          <Route><Redirect to="/hub" /></Route>
        </Switch>
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}
