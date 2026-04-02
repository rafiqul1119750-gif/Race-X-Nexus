import { useState } from "react";
import { SplashScreen } from "./SplashScreen";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <SplashScreen onFinish={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen bg-[#050505] text-white">
          {/* Aapka baaki layout code (Sidebar, Header etc.) yahan rahega */}
          <main>{children}</main>
        </div>
      )}
    </>
  );
}
