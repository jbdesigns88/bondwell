import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // initially true

  const LoginUser = async ({ email, password }) => {
    try {
      if (!email || !password) throw new Error('Missing credentials');

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      setUser(data.user);
      setIsLoggedIn(true);
    } catch (err) {
      console.log('LoginUser error:', err.message);
    }
  };

  const Logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setIsLoggedIn(true);
      }
      setIsLoading(false);  
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, isLoading, LoginUser, Logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ this line was missing or misplaced
export const useUser = () => useContext(UserContext);
