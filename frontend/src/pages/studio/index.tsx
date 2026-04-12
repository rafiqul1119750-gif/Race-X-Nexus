import { Switch, Route, Redirect } from "wouter";
// Direct Imports
import Dashboard from "./dashboard";
import Editor from "./editor";
import VideoGen from "./video-gen";
import VoiceLab from "./voice-lab";
import Analytics from "./analytics";

export default function StudioIndex() {
  return (
    <div className="w-full h-full bg-black">
      <Switch>
        {/* Sabse pehle static routes check honge */}
        <Route path="/studio/editor" component={Editor} />
        <Route path="/studio/video" component={VideoGen} />
        <Route path="/studio/voice" component={VoiceLab} />
        <Route path="/studio/analytics" component={Analytics} />
        
        {/* Dashboard hamesha niche rahega fallback se pehle */}
        <Route path="/studio" component={Dashboard} />

        {/* Catch-all: Agar upar kuch match na ho */}
        <Route>
          <Redirect to="/studio" />
        </Route>
      </Switch>
    </div>
  );
}
