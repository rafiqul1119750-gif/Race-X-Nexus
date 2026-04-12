import { Switch, Route, Redirect } from "wouter";
import Dashboard from "./dashboard";
import Editor from "./editor";
import VideoGen from "./video-gen";
import VoiceLab from "./voice-lab";
import Analytics from "./analytics";

export default function StudioIndex() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Switch>
        {/* /studio pe Dashboard dikhega */}
        <Route path="/studio" component={Dashboard} />
        
        {/* Full Power Features */}
        <Route path="/studio/editor" component={Editor} />
        <Route path="/studio/video" component={VideoGen} />
        <Route path="/studio/voice" component={VoiceLab} />
        <Route path="/studio/analytics" component={Analytics} />

        {/* Galat path pe wapas Home */}
        <Route>
          <Redirect to="/studio" />
        </Route>
      </Switch>
    </div>
  );
}
