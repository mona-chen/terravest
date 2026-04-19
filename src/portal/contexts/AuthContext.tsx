import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { authApi } from '@/lib/api';
import type { User, ProfileUpdate } from '@/lib/api/types';

import type { RegisterData } from '@/lib/api/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: ProfileUpdate) => Promise<{ success: boolean; error?: string }>;
  changePassword: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('terravest_access_token');
      if (token) {
        try {
          const response = await authApi.getMe();
          setUser(response.user);
        } catch {
          localStorage.removeItem('terravest_access_token');
          localStorage.removeItem('terravest_refresh_token');
        }
      }
      setIsLoading(false);
    };
    init();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const response = await authApi.login({ email, password });
      
      localStorage.setItem('terravest_access_token', response.accessToken);
      localStorage.setItem('terravest_refresh_token', response.refreshToken);
      
      setUser(response.user);
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return { 
        success: false, 
        error: error.response?.data?.error?.message || 'Login failed. Please try again.' 
      };
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      const response = await authApi.register(data);

      localStorage.setItem('terravest_access_token', response.accessToken);
      localStorage.setItem('terravest_refresh_token', response.refreshToken);

      setUser(response.user);
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Registration failed. Please try again.',
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
    } finally {
      localStorage.removeItem('terravest_access_token');
      localStorage.removeItem('terravest_refresh_token');
      setUser(null);
    }
  }, []);

  const updateProfile = useCallback(async (_updates: ProfileUpdate): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    setIsLoading(true);
    
    try {
      const response = await authApi.getMe();
      setUser(response.user);
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return { 
        success: false, 
        error: error.response?.data?.error?.message || 'Update failed' 
      };
    }
  }, [user]);

  const changePassword = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    return { success: true };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
