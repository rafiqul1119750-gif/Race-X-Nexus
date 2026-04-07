import { useState, useEffect } from 'react';
import { account, ID } from '../lib/appwrite';
import { useLocation } from 'wouter';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  // 🔐 Check Session on Mount
  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, pass: string) => {
    try {
      await account.createEmailPasswordSession(email, pass);
      await checkUserStatus();
      setLocation('/hub'); // Success -> Go to Hub
    } catch (error) {
      alert("Race-X Auth Failed: " + error);
    }
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
    setLocation('/auth/signin');
  };

  return { user, loading, login, logout };
};
