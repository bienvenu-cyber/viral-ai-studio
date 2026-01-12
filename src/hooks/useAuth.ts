import { useState, useEffect, useCallback } from 'react';
import {
  login as pbLogin,
  logout as pbLogout,
  register as pbRegister,
  loginWithOAuth,
  getCurrentUser,
  isAuthenticated,
  onAuthStateChange,
  requestPasswordReset as pbRequestPasswordReset,
  confirmPasswordReset as pbConfirmPasswordReset,
  updateProfile as pbUpdateProfile,
  type User,
} from '@/services/pocketbase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check initial auth state
    setUser(getCurrentUser());
    setLoading(false);

    // Subscribe to auth changes
    const unsubscribe = onAuthStateChange((newUser) => {
      setUser(newUser);
    });

    return unsubscribe;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await pbLogin(email, password);
      setUser(user);
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await pbRegister(email, password, name);
      setUser(user);
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithGitHub = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await loginWithOAuth('github');
      setUser(user);
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'GitHub login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await pbRequestPasswordReset(email);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset request failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmPasswordReset = useCallback(async (token: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await pbConfirmPasswordReset(token, password, password);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: { name?: string; avatar?: File }) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await pbUpdateProfile(data);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Profile update failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    pbLogout();
    setUser(null);
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: isAuthenticated(),
    login,
    register,
    loginWithGitHub,
    requestPasswordReset,
    confirmPasswordReset,
    updateProfile,
    logout,
  };
}
