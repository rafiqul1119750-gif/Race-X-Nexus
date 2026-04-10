import { Switch, Route, Redirect } from "wouter";
import RXMusic from "./main";
import NexusLibrary from "./library";

export default function MusicIndex() {
  return (
    <Switch>
      <Route path="/music/main" component={RXMusic} />
      <Route path="/music/library" component={NexusLibrary} />
      <Route path="/music">
        <Redirect to="/music/main" />
      </Route>
    </Switch>
  );
}
