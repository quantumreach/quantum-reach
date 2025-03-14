
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  loading: boolean;
  adminAccess: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    setData();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Error signing out",
        variant: "destructive"
      });
    }
  };

  // New function to access admin panel without login
  const adminAccess = async () => {
    try {
      // Using a special access token for the admin panel
      // This bypasses the normal login flow
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@quantumreach.com',
        password: 'admin123'  // This should be a secure password in production
      });
      
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Admin access error:', error);
      return { error: error as Error };
    }
  };

  const value = {
    session,
    user,
    signIn,
    signOut,
    loading,
    adminAccess
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
