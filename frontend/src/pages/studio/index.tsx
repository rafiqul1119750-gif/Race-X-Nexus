import { Switch, Route, Redirect } from "wouter";
import Dashboard from "./dashboard";
import Editor from "./editor";
import VideoGen from "./video-gen";
import VoiceLab from "./voice-lab";
import Analytics from "./analytics";

export default function StudioIndex() {
  return (
    <div className="w-full h-full bg-black">
      <Switch>
        {/* /studio pe Dashboard load hoga */}
        <Route path="/studio">
          <Dashboard />
        </Route>

        {/* Individual Routes - Inhe alag se define karo bina /studio base ke confusion ke */}
        <Route path="/studio/editor" component={Editor} />
        <Route path="/studio/video" component={VideoGen} />
        <Route path="/studio/voice" component={VoiceLab} />
        <Route path="/studio/analytics" component={Analytics} />

        {/* Default fallback: Agar kuch match na kare toh seedha /studio */}
        <Route>
          <Redirect to="/studio" />
        </Route>
      </Switch>
    </div>
  );
}
