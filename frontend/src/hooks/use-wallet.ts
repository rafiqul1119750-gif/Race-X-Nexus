import { useState } from 'react';

export const useWallet = () => {
  // 💎 Logic: Initial state can be fetched from Appwrite DB later
  const [diamonds, setDiamonds] = useState(0);
  const [gems, setGems] = useState(0);

  const addDiamonds = (amount: number) => setDiamonds(prev => prev + amount);
  const spendDiamonds = (amount: number) => {
    if(diamonds >= amount) {
      setDiamonds(prev => prev - amount);
      return true;
    }
    return false;
  };

  return { diamonds, gems, addDiamonds, spendDiamonds };
};
