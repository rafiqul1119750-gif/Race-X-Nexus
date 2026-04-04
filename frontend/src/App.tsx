import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AppLayout } from "@/components/layout/AppLayout"; 
import Home from "@/pages/home";

// Race-X Nexus Master Entry Point
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* AppLayout pure app ka background aur global style handle karta hai */}
      <AppLayout>
        <Switch>
          {/* Main Entry: Home.tsx hi check karega ki user login hai ya nahi */}
          <Route path="/" component={Home} />

          {/* 404: Nexus Lost Page (Jab koi galat link par jaye) */}
          <Route>
            <div className="h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6 border border-red-500/30">
                 <span className="text-red-500 font-black italic">!</span>
              </div>
              <h1 className="text-2xl font-black italic uppercase text-zinc-300 tracking-tighter">
                404 | Nexus Lost
              </h1>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mt-4">
                Connection to reality failed
              </p>
              <a href="/" className="mt-8 px-8 py-3 bg-zinc-900 border border-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-500 hover:bg-zinc-800 transition-all">
                Re-Sync Nexus
              </a>
            </div>
          </Route>
        </Switch>
      </AppLayout>

      {/* Toaster: Jab login ya koi action error dega, toh popup yahan se aayega */}
      <Toaster />
    </QueryClientProvider>
  );
}
