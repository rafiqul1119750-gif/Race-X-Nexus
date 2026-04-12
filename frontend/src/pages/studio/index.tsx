import { Switch, Route, Redirect } from "wouter";
import Dashboard from "./dashboard";
import Editor from "./editor";

export default function StudioIndex() {
  return (
    <Switch>
      {/* Pura Production Flow Dashboard ke andar hi chalega */}
      <Route path="/studio" component={Dashboard} />
      
      {/* Jab user Edit dabaye tab Editor khulega */}
      <Route path="/studio/editor" component={Editor} />

      <Route><Redirect to="/studio" /></Route>
    </Switch>
  );
}
