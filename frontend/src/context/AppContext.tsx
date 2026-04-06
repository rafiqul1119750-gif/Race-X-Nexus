import React, { createContext, useContext, useEffect, useState } from 'react';
import { account, databases } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';

// Data structure define kar rahe hain
interface AppContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  diamonds: number;
  setDiamonds: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  refreshUserData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [diamonds, setDiamonds] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // User ka data aur Diamonds load karne ka function
  const refreshUserData = async () => {
    try {
      const session = await account.get();
      setUser(session);

      // Appwrite Database se Diamonds fetch karna (Replace YOUR_DATABASE_ID & YOUR_COLLECTION_ID)
      const response = await databases.listDocuments(
        'YOUR_DATABASE_ID', 
        'YOUR_COLLECTION_ID',
        [Query.equal('userId', session.$id)]
      );

      if (response.documents.length > 0) {
        setDiamonds(response.documents[0].diamonds);
      }
    } catch (error) {
      setUser(null);
      setDiamonds(0);
      console.log("User not logged in or error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, diamonds, setDiamonds, loading, refreshUserData }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook taaki har file mein use kar sakein
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
