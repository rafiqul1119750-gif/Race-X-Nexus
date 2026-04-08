import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // 💎 DIAMONDS LOGIC
  const [diamonds, setDiamonds] = useState(() => {
    return Number(localStorage.getItem("rx-diamonds")) || 0;
  });

  // 🌓 THEME LOGIC
  const [theme, setTheme] = useState(() => localStorage.getItem("rx-theme") || "dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("rx-theme", theme);
  }, [theme]);

  // 🎁 WELCOME REWARD (10 Diamonds)
  const claimWelcomeGift = () => {
    if (!localStorage.getItem("rx-claimed-welcome")) {
      const bonus = 10;
      const total = diamonds + bonus;
      setDiamonds(total);
      localStorage.setItem("rx-diamonds", total.toString());
      localStorage.setItem("rx-claimed-welcome", "true");
      return true;
    }
    return false;
  };

  // 🔗 REFERRAL REWARD (5 Diamonds)
  const addReferralBonus = () => {
    const total = diamonds + 5;
    setDiamonds(total);
    localStorage.setItem("rx-diamonds", total.toString());
  };

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  return (
    <AppContext.Provider value={{ 
      user, setUser, diamonds, setDiamonds, 
      loading, theme, toggleTheme, 
      claimWelcomeGift, addReferralBonus 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
