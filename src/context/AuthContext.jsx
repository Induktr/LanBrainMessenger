import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize session
  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
          if (mounted) {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);

            // Handle specific auth events
            switch (event) {
              case 'SIGNED_OUT':
                // Clear local storage and state
                localStorage.removeItem('supabase.auth.token');
                setUser(null);
                setSession(null);
                break;
              case 'TOKEN_REFRESHED':
                // Update session with new token
                setSession(currentSession);
                break;
              case 'USER_DELETED':
                // Clean up user data
                setUser(null);
                setSession(null);
                localStorage.clear();
                break;
            }
          }
        });

        return () => {
          mounted = false;
          subscription?.unsubscribe();
        };
      } catch (err) {
        console.error('Session initialization error:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initSession();
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const { data: { session: refreshedSession }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      setSession(refreshedSession);
      setUser(refreshedSession?.user ?? null);
      return { session: refreshedSession, error: null };
    } catch (err) {
      console.error('Session refresh error:', err);
      return { session: null, error: err };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      // First try to refresh the session if needed
      if (!session?.access_token) {
        const { session: refreshedSession, error: refreshError } = await refreshSession();
        if (refreshError) {
          // If refresh fails, clear local state and storage
          setUser(null);
          setSession(null);
          localStorage.removeItem('supabase.auth.token');
          return { error: null }; // Return success as we've cleared the state
        }
      }

      // Attempt to sign out
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        if (error.status === 403) {
          // Handle forbidden error by clearing local state
          console.warn('Sign out failed with 403, clearing local state');
          setUser(null);
          setSession(null);
          localStorage.removeItem('supabase.auth.token');
          return { error: null }; // Return success as we've cleared the state
        }
        throw error;
      }

      return { error: null };
    } catch (err) {
      console.error('Sign out error:', err);
      return { error: err };
    }
  }, [session, refreshSession]);

  const deleteAccount = useCallback(async () => {
    try {
      // Ensure we have a valid session
      if (!session?.access_token) {
        const { session: refreshedSession, error: refreshError } = await refreshSession();
        if (refreshError) throw refreshError;
      }

      // Delete user data first
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      // Delete auth user
      const { error } = await supabase.rpc('delete_user');
      if (error) throw error;

      // Sign out and clear state
      await signOut();

      return { error: null };
    } catch (err) {
      console.error('Account deletion error:', err);
      return { error: err };
    }
  }, [user, session, refreshSession, signOut]);

  const value = {
    user,
    session,
    loading,
    error,
    signOut,
    deleteAccount,
    refreshSession
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;