import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { ECONOMY_RULES } from "../../lib/economy";

export const NexusPulse = () => {
  const { user, diamonds, gems, setDiamonds } = useAppContext();

  useEffect(() => {
    // 🛡️ 1. INACTIVITY TRACKER (30/45/90 Days Logic)
    const checkInactivity = () => {
      const lastLogin = localStorage.getItem("rx-last-login");
      const daysDiff = (Date.now() - Number(lastLogin)) / (1000 * 60 * 60 * 24);

      if (daysDiff >= ECONOMY_RULES.INACTIVITY_TIMERS.AUTO_DELETE) {
        console.error("⛔ PROTOCOL 90: AUTO-DELETING ACCOUNT");
        // Trigger Logout & Cleanup
      } else if (daysDiff >= ECONOMY_RULES.INACTIVITY_TIMERS.FREEZE_ACCOUNT) {
        console.warn("⚠️ PROTOCOL 45: ACCOUNT FROZEN");
      }
    };

    // 👻 2. GHOST PROTOCOL (Shadow Ban Check)
    if (user?.isShadowBanned) {
      console.log("👻 GHOST MODE ACTIVE: Reach limited, Gems disabled.");
    }

    checkInactivity();
    localStorage.setItem("rx-last-login", Date.now().toString());
  }, [user]);

  return null;
};
