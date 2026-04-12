import { Switch, Route, Redirect } from "wouter";
import Dashboard from "./dashboard";
import Editor from "./editor";
import VideoGen from "./video-gen"; // Agar ye file bani hui hai toh

export default function StudioIndex() {
  return (
    <Switch>
      {/* 1. Dashboard (Main Landing) */}
      <Route path="/studio" component={Dashboard} />
      
      {/* 2. Editor (Specific Path) */}
      {/* Yahan path ko /studio/editor hi rehne do, 
          lekin Switch ise upar se niche check karega */}
      <Route path="/studio/editor">
        <Editor />
      </Route>

      {/* 3. Video Gen (Specific Path) */}
      <Route path="/studio/video">
        <VideoGen />
      </Route>

      {/* Default Redirect */}
      <Route>
        <Redirect to="/studio" />
      </Route>
    </Switch>
  );
}
