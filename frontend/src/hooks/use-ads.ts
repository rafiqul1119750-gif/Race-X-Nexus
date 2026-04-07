import { useState } from 'react';

export const useAds = () => {
  const [isAdLoading, setIsAdLoading] = useState(false);

  const showInterstitial = async () => {
    setIsAdLoading(true);
    console.log("🚀 Triggering Race-X Ad Network...");
    
    // Simulate Ad Watch (3 seconds)
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAdLoading(false);
        resolve(true); // User gets reward
      }, 3000);
    });
  };

  return { showInterstitial, isAdLoading };
};
