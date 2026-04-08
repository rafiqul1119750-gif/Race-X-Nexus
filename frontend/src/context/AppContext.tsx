import React, { createContext, useContext, useState, useEffect } from 'react';
// import { account, databases } from '@/lib/appwrite'; // Backend setup ke waqt uncomment karein

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [diamonds, setDiamonds] = useState(500); // Default balance
  const [loading, setLoading] = useState(false);
  
  // 🌓 THEME STATE
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("rx-theme") || "dark";
    }
    return "dark";
  });

  // 🔄 THEME SIDE EFFECT
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("rx-theme", theme);
  }, [theme]);

  // 🛠️ THEME TOGGLE FUNCTION
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  /* // APPWRITE INITIALIZATION LOGIC (Saved for later)
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        // const session = await account.get();
        // setUser(session);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);
  */

  return (
    <AppContext.Provider 
      value={{ 
        user, 
        setUser, 
        diamonds, 
        setDiamonds, 
        loading, 
        theme, 
        setTheme, 
        toggleTheme 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
