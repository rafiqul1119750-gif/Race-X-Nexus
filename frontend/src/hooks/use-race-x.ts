import { create } from 'zustand';

interface RaceXState {
  gems: number;
  diamonds: number;
  adCount: number;
  addGems: (amount: number) => void;
  showRewardAd: () => void;
  processGift: (diamondCost: number) => boolean;
}

export const useRaceX = create<RaceXState>((set) => ({
  gems: 0,
  diamonds: 0,
  adCount: 0,
  
  addGems: (amount) => set((state) => ({ gems: state.gems + amount })),
  
  showRewardAd: () => {
    // Real logic for 30s Ad playback here
    console.log("Playing Reward Ad...");
    setTimeout(() => {
      set((state) => ({ gems: state.gems + 5 }));
      alert("Reward Claimed: 5 Gems added!");
    }, 5000); // Dummy timer for example
  },

  processGift: (cost) => {
    let success = false;
    set((state) => {
      if (state.diamonds >= cost) {
        success = true;
        return { diamonds: state.diamonds - cost };
      }
      return state;
    });
    return success;
  }
}));
