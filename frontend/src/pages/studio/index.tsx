import { Switch, Route, Redirect } from "wouter";
import Dashboard from "./dashboard";
import Editor from "./editor";
import VideoGen from "./video-gen";
import VoiceLab from "./voice-lab";
import Analytics from "./analytics";

export default function StudioIndex() {
  return (
    <Switch>
      {/* Dashboard - The Hub */}
      <Route path="/studio" component={Dashboard} />
      
      {/* Ye paths Dashboard ke handleNav se match karne chahiye */}
      <Route path="/studio/editor" component={Editor} />
      <Route path="/studio/video" component={VideoGen} />
      <Route path="/studio/voice" component={VoiceLab} />
      <Route path="/studio/analytics" component={Analytics} />

      {/* Agar path galat ho toh redirect back to /studio */}
      <Route>
        <Redirect to="/studio" />
      </Route>
    </Switch>
  );
}
