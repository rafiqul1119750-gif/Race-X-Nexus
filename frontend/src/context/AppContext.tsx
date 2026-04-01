import React, { createContext, useContext, useState, useEffect } from "react";

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
  duration: number;
}

interface AppContextType {
  cartCount: number;
  setCartCount: (count: number | ((c: number) => number)) => void;
  currentTrack: MusicTrack | null;
  setCurrentTrack: (track: MusicTrack | null) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  violationCount: number;
  setViolationCount: (count: number) => void;
  showAiMentor: boolean;
  setShowAiMentor: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [showAiMentor, setShowAiMentor] = useState(false);

  return (
    <AppContext.Provider
      value={{
        cartCount,
        setCartCount,
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
        violationCount,
        setViolationCount,
        showAiMentor,
        setShowAiMentor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
