import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AppLayout } from "@/components/layout/AppLayout"; 
import Home from "@/pages/home";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Switch>
          <Route path="/" component={Home} />
          <Route>
             <div className="flex items-center justify-center h-screen text-zinc-500 italic uppercase font-black">404 | Nexus Lost</div>
          </Route>
        </Switch>
      </AppLayout>
      <Toaster />
    </QueryClientProvider>
  );
}
