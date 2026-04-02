import { useState } from "react";
import { SplashScreen } from "./SplashScreen";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <SplashScreen onFinish={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
          {/* Main App Content Starts Here */}
          <div className="animate-in fade-in duration-1000">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
