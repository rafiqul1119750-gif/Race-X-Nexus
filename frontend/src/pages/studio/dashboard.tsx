import { Switch, Route } from "wouter";
import Dashboard from "./dashboard";
import Editor from "./editor";
import VideoGen from "./video-gen";
import VoiceLab from "./voice-lab";
import Analytics from "./analytics";

export default function StudioIndex() {
  return (
    <Switch>
      <Route path="/studio" component={Dashboard} />
      <Route path="/studio/editor" component={Editor} />
      <Route path="/studio/video" component={VideoGen} />
      <Route path="/studio/voice" component={VoiceLab} />
      <Route path="/studio/analytics" component={Analytics} />
    </Switch>
  );
}
