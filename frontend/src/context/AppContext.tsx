import React, { createContext, useContext, useState, useEffect } from 'react';
import { ECONOMY_RULES } from '../lib/economy';

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // 💎 DIAMONDS & GEMS LOGIC (Bina kuch kate)
  const [diamonds, setDiamonds] = useState(() => {
    return Number(localStorage.getItem("rx-diamonds")) || 0;
  });

  const [gems, setGems] = useState(() => {
    return Number(localStorage.getItem("rx-gems")) || 0;
  });

  // 🌓 THEME LOGIC
  const [theme, setTheme] = useState(() => localStorage.getItem("rx-theme") || "dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("rx-theme", theme);
  }, [theme]);

  // 🔄 AUTO-CONVERSION (1000 Gems = 1 Diamond)
  useEffect(() => {
    if (gems >= ECONOMY_RULES.CONVERSION_RATE.GEMS_TO_DIAMOND) {
      const convertedDiamonds = Math.floor(gems / ECONOMY_RULES.CONVERSION_RATE.GEMS_TO_DIAMOND);
      const remainingGems = gems % ECONOMY_RULES.CONVERSION_RATE.GEMS_TO_DIAMOND;
      
      const newDiamondTotal = diamonds + convertedDiamonds;
      setDiamonds(newDiamondTotal);
      setGems(remainingGems);
      
      localStorage.setItem("rx-diamonds", newDiamondTotal.toString());
      localStorage.setItem("rx-gems", remainingGems.toString());
    }
  }, [gems, diamonds]);

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

  // 🔗 REFERRAL REWARD (50 Diamonds - Linked to Economy Rules)
  const addReferralBonus = () => {
    const total = diamonds + ECONOMY_RULES.REWARD_NODES.REFERRAL;
    setDiamonds(total);
    localStorage.setItem("rx-diamonds", total.toString());
  };

  // 📺 AD REWARD LOGIC (Adds 1 Diamond)
  const watchAdReward = () => {
    const total = diamonds + ECONOMY_RULES.REWARD_NODES.WATCH_AD;
    setDiamonds(total);
    localStorage.setItem("rx-diamonds", total.toString());
    return total;
  };

  // ⌨️ INTERACTION REWARD (Adds Gems for Likes/Comments)
  const addInteractionGems = () => {
    const totalGems = gems + ECONOMY_RULES.REWARD_NODES.LIKE_COMMENT_GEM;
    setGems(totalGems);
    localStorage.setItem("rx-gems", totalGems.toString());
  };

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  return (
    <AppContext.Provider value={{ 
      user, setUser, 
      diamonds, setDiamonds, 
      gems, setGems,
      loading, theme, toggleTheme, 
      claimWelcomeGift, addReferralBonus, 
      watchAdReward, addInteractionGems 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
