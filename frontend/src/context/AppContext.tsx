import React, { createContext, useContext, useState, useEffect } from 'react';
import { account, databases } from '@/lib/appwrite';

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [diamonds, setDiamonds] = useState(0);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on Refresh
  useEffect(() => {
    const init = async () => {
      try {
        const session = await account.get();
        setUser(session);
        // Fetch Diamonds from Database
        const stats = await databases.getDocument('YOUR_DB', 'USER_STATS', session.$id);
        setDiamonds(stats.diamonds);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, diamonds, setDiamonds, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
