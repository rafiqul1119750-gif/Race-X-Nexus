import { Link } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="glass-panel p-10 rounded-3xl max-w-md w-full text-center relative z-10 border-primary/30">
        <AlertCircle className="w-20 h-20 text-primary mx-auto mb-6 drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]" />
        <h1 className="text-5xl font-display font-black text-glow mb-2">404</h1>
        <p className="text-xl font-bold text-white mb-4">Signal Lost</p>
        <p className="text-sm text-muted-foreground mb-8">
          The quadrant you are looking for does not exist or has been archived in the mainframe.
        </p>
        
        <Link href="/">
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors btn-ripple shadow-[0_0_20px_rgba(0,212,255,0.4)]">
            <ArrowLeft className="w-4 h-4" />
            Return to Hub
          </button>
        </Link>
      </div>
    </div>
  );
}
