import { Switch, Route, Redirect } from "wouter";
import Dashboard from "./dashboard";
import Editor from "./editor";
import VideoGen from "./video-gen";
import VoiceLab from "./voice-lab";
import Analytics from "./analytics";

export default function StudioIndex() {
  return (
    <Switch>
      {/* Base Path */}
      <Route path="/studio" component={Dashboard} />
      
      {/* Sub-paths (Yahan se click hoke jayega) */}
      <Route path="/studio/editor" component={Editor} />
      <Route path="/studio/video" component={VideoGen} />
      <Route path="/studio/voice" component={VoiceLab} />
      <Route path="/studio/analytics" component={Analytics} />

      {/* Agar kuch galat ho toh wapas Dashboard */}
      <Route>
        <Redirect to="/studio" />
      </Route>
    </Switch>
  );
}
